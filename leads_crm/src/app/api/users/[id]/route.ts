import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/firebase/admin';
import { Timestamp } from 'firebase-admin/firestore';

async function checkAdmin(req: NextRequest): Promise<boolean> {
  const session = req.cookies.get('ak_session')?.value;
  if (!session) return false;
  try {
    const sessionData = JSON.parse(Buffer.from(session, 'base64').toString('utf-8'));
    return sessionData.role === 'admin' && sessionData.active === true;
  } catch {
    return false;
  }
}

// PATCH update user details
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: uid } = await params;

  try {
    const body = await req.json();
    const { name, phone, commissionPercentage, active, role, resetPassword } = body;

    // Handle password reset separately
    if (resetPassword) {
      const newPassword = resetPassword as string;
      if (newPassword.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
      }
      await adminAuth.updateUser(uid, { password: newPassword });

      // Log activity
      await adminDb.collection('activityLog').add({
        action: 'user_updated',
        userId: 'system-admin',
        userName: 'Administrator',
        targetUserId: uid,
        metadata: { passwordReset: true },
        createdAt: Timestamp.now(),
      });

      return NextResponse.json({ success: true, message: 'Password reset successfully' });
    }

    const updateData: Record<string, any> = {
      updatedAt: Timestamp.now(),
    };

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (commissionPercentage !== undefined) updateData.commissionPercentage = Number(commissionPercentage);
    if (active !== undefined) updateData.active = active;
    if (role !== undefined) updateData.role = role;

    // Update in Firestore
    await adminDb.collection('users').doc(uid).update(updateData);

    // Sync Auth status if active/disabled changed
    if (active !== undefined) {
      await adminAuth.updateUser(uid, {
        disabled: !active,
      });

      // If disabled, revoke refresh tokens to immediately boot them out
      if (!active) {
        await adminAuth.revokeRefreshTokens(uid);
      }
    }

    // Create activity log
    await adminDb.collection('activityLog').add({
      action: 'user_updated',
      userId: 'system-admin',
      userName: 'Administrator',
      targetUserId: uid,
      metadata: {
        updatedFields: Object.keys(body),
      },
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: uid } = await params;

  try {
    // Get user info before deletion for logging
    const userDoc = await adminDb.collection('users').doc(uid).get();
    const userData = userDoc.data();

    // Delete Auth record
    await adminAuth.deleteUser(uid);

    // Delete Firestore record
    await adminDb.collection('users').doc(uid).delete();

    // Log activity
    await adminDb.collection('activityLog').add({
      action: 'user_deleted',
      userId: 'system-admin',
      userName: 'Administrator',
      targetUserId: uid,
      metadata: {
        deletedUserName: userData?.name || 'Unknown',
        deletedUsername: userData?.username || 'Unknown',
      },
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
