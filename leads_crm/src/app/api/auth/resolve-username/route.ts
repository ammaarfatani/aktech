import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/firebase/admin';

/**
 * POST /api/auth/resolve-username
 * Allows unauthenticated login form to convert a username into an email address.
 * Uses Admin SDK to bypass client Firestore rules before authentication.
 */
export async function POST(req: NextRequest) {
  try {
    const { identifier } = await req.json();

    if (!identifier || typeof identifier !== 'string') {
      return NextResponse.json({ error: 'Identifier is required' }, { status: 400 });
    }

    const trimmed = identifier.trim();

    // If already an email, return directly
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return NextResponse.json({ email: trimmed });
    }

    // Lookup by username using Admin SDK
    const snap = await adminDb
      .collection('users')
      .where('username', '==', trimmed)
      .limit(1)
      .get();

    if (snap.empty) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userDoc = snap.docs[0].data();

    if (!userDoc.active) {
      return NextResponse.json({ error: 'Account is disabled' }, { status: 403 });
    }

    return NextResponse.json({ email: userDoc.email });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
