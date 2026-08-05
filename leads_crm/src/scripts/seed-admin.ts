// src/scripts/seed-admin.ts
import "dotenv/config";
import { adminAuth, adminDb } from '@/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

// ---------------------------------------------------------------
// 1️⃣ Create Admin user and profile
// ---------------------------------------------------------------
async function createAdmin() {
  const email = 'admin@aktech.com';
  const password = 'Admin@123456';

  let user;
  try {
    user = await adminAuth.getUserByEmail(email);
  } catch {
    user = await adminAuth.createUser({
      email,
      password,
      displayName: 'AKTech Admin',
    });
  }

  await adminDb.collection('users').doc(user.uid).set({
    uid: user.uid,
    name: 'AKTech Admin',
    email,
    username: 'admin',
    role: 'admin',
    active: true,
    commissionPercentage: 0,
    createdAt: FieldValue.serverTimestamp(),
  });

  console.log('✅ Admin user created →', user.uid);
}

// ---------------------------------------------------------------
// 2️⃣ Create a sample sales user (useful for quick testing)
// ---------------------------------------------------------------
async function createSampleSales() {
  const email = 'sales1@aktech.com';
  const password = 'Sales@123456';

  let user;
  try {
    user = await adminAuth.getUserByEmail(email);
  } catch {
    user = await adminAuth.createUser({
      email,
      password,
      displayName: 'Sales User 1',
    });
  }

  await adminDb.collection('users').doc(user.uid).set({
    uid: user.uid,
    name: 'Sales User 1',
    email,
    username: 'sales1',
    role: 'sales',
    active: true,
    commissionPercentage: 35,
    createdAt: FieldValue.serverTimestamp(),
  });

  console.log('✅ Sample sales user created →', user.uid);
}

// ---------------------------------------------------------------
// 3️⃣ Default application settings (single document)
// ---------------------------------------------------------------
async function createSettings() {
  const settingsRef = adminDb.collection('settings').doc('app');
  const snap = await settingsRef.get();
  if (!snap.exists) {
    await settingsRef.set({
      createdAt: FieldValue.serverTimestamp(),
      version: '1.0.0',
      allowRegistrations: false,
    });
    console.log('✅ Default settings document created');
  }
}

// ---------------------------------------------------------------
// 4️⃣ Initialize a wallet document for every user
// ---------------------------------------------------------------
async function initWallets() {
  const usersSnap = await adminDb.collection('users').get();
  const batch = adminDb.batch();
  usersSnap.forEach((doc) => {
    const walletRef = adminDb.collection('wallets').doc(doc.id);
    batch.set(
      walletRef,
      {
        userId: doc.id,
        balance: 0,
        pending: 0,
        paid: 0,
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  });
  await batch.commit();
  console.log('✅ Wallet placeholders created for all users');
}

// ---------------------------------------------------------------
// 5️⃣ Ensure empty collections exist (sentinel docs)
// ---------------------------------------------------------------
async function createSentinelDocs() {
  const emptyCollections = ['activities', 'commissions', 'notifications'];
  const batch = adminDb.batch();
  emptyCollections.forEach((col) => {
    const ref = adminDb.collection(col).doc('_init');
    batch.set(ref, { createdAt: FieldValue.serverTimestamp() });
  });
  await batch.commit();
  console.log('✅ Sentinel docs created for empty collections');
}

// ---------------------------------------------------------------
// 6️⃣ Main entry – run everything sequentially
// ---------------------------------------------------------------
async function main() {
  await createAdmin();
  await createSampleSales();
  await createSettings();
  await initWallets();
  await createSentinelDocs();
  console.log('🚀 Database seeding complete');
  process.exit(0);
}

main();