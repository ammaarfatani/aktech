'use client';

import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
} from 'firebase/auth';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { AppUser } from '@/types/user.types';

const auth = getAuth();

/**
 * Resolve a login identifier (email OR username) to a Firebase email.
 * Delegates to backend API /api/auth/resolve-username to bypass unauthenticated client Firestore rules.
 */
export async function resolveLoginIdentifier(
  identifier: string,
): Promise<string> {
  const trimmed = identifier.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return trimmed;
  }

  const res = await fetch('/api/auth/resolve-username', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: trimmed }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'User not found or inactive');
  }

  return data.email;
}

/**
 * Sign in with email+password or username+password.
 * `rememberMe` = true → persistent login, else session storage.
 */
export async function signIn(
  identifier: string,
  password: string,
  rememberMe: boolean,
): Promise<AppUser> {
  const email = await resolveLoginIdentifier(identifier);
  await setPersistence(
    auth,
    rememberMe ? browserLocalPersistence : browserSessionPersistence,
  );

  const cred = await signInWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;

  // Fetch user profile from Firestore (user is now authenticated so rules pass)
  const userSnap = await getDoc(doc(db, 'users', uid));

  if (!userSnap.exists()) {
    await signOut(auth);
    throw new Error('User profile missing');
  }

  const user = userSnap.data() as AppUser;

  // Block inactive accounts
  if (!user.active) {
    await signOut(auth);
    throw new Error('Account disabled');
  }

  return user;
}

/**
 * Sign out – also removes the server-side session cookie.
 */
export async function signOutUser() {
  await signOut(auth);
  await fetch('/api/auth/session', { method: 'DELETE' });
}
