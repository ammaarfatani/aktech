import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/firebase/admin';
import { Timestamp } from 'firebase-admin/firestore';

// Helper to check if request is authenticated and admin
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

// GET all users
export async function GET(req: NextRequest) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const snap = await adminDb.collection('users').orderBy('createdAt', 'desc').get();
    const users = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate() : null,
        updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
      };
    });
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST create user
export async function POST(req: NextRequest) {
  if (!(await checkAdmin(req))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, email, username, password, phone, commissionPercentage, role } = body;

    if (!name || !email || !username || !password || commissionPercentage === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if username is already taken in Firestore
    const usernameSnap = await adminDb.collection('users').where('username', '==', username).get();
    if (!usernameSnap.empty) {
      return NextResponse.json({ error: `Username ${username} is already taken.` }, { status: 400 });
    }

    // Check if email is already taken
    const emailSnap = await adminDb.collection('users').where('email', '==', email).get();
    if (!emailSnap.empty) {
      return NextResponse.json({ error: `Email ${email} is already in use.` }, { status: 400 });
    }

    // Create Firebase Auth user
    const authUser = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    const uid = authUser.uid;

    const userProfile = {
      uid,
      name,
      email,
      username,
      phone: phone || '',
      role: role || 'sales',
      commissionPercentage: Number(commissionPercentage),
      active: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    // Save user profile in Firestore
    await adminDb.collection('users').doc(uid).set(userProfile);

    // Create activity log
    await adminDb.collection('activityLog').add({
      action: 'user_created',
      userId: 'system-admin',
      userName: 'Administrator',
      targetUserId: uid,
      metadata: {
        username,
        email,
        role: role || 'sales',
      },
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({ success: true, uid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
