import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBaouAzLCimlDvHHGJ9KYPsVzfomFAxw_I",
  authDomain: "aktech-lead.firebaseapp.com",
  projectId: "aktech-lead",
  storageBucket: "aktech-lead.firebasestorage.app",
  messagingSenderId: "591525673723",
  appId: "1:591525673723:web:dce05bc7c9faed92dd0e5e"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
