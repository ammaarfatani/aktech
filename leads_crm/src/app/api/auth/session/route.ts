import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/firebase/admin';

/**
 * GET /api/auth/session
 * Verifies server-side session cookie and returns current AppUser profile.
 */
export async function GET(req: NextRequest) {
  const session = req.cookies.get('ak_session')?.value;

  if (!session) {
    return NextResponse.json({ user: null });
  }

  try {
    const payload = JSON.parse(Buffer.from(session, 'base64').toString('utf-8'));
    const uid = payload.uid;

    if (!uid) {
      return NextResponse.json({ user: null });
    }

    const userDoc = await adminDb.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return NextResponse.json({ user: null });
    }

    const data = userDoc.data()!;
    if (!data.active) {
      const res = NextResponse.json({ user: null });
      res.cookies.delete('ak_session');
      return res;
    }

    const userProfile = {
      uid: userDoc.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
      updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
    };

    return NextResponse.json({ user: userProfile });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}

/**
 * POST /api/auth/session
 * Called client-side after login to set an httpOnly session cookie.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, role, active } = body as { uid: string; role: string; active: boolean };

    if (!uid || !role) {
      return NextResponse.json({ error: 'Missing uid or role' }, { status: 400 });
    }

    const payload = Buffer.from(
      JSON.stringify({ uid, role, active: active ?? true })
    ).toString('base64');

    const response = NextResponse.json({ ok: true });
    response.cookies.set('ak_session', payload, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE /api/auth/session
 * Clears the session cookie on sign-out.
 */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete('ak_session');
  return response;
}
