import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

let db;

try {
  if (process.env.FIREBASE_PROJECT_ID && !getApps().length) {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };
    
    initializeApp({
      credential: cert(serviceAccount)
    });
    console.log('Firebase Admin Initialized Successfully.');
  }
  
  // If initialized, get DB, else it will be undefined
  if (getApps().length) {
    db = getFirestore();
  }
} catch (error) {
  console.error('Firebase Admin Initialization Error:', error.message);
}

// Fallback mock if Firebase is not configured (for demo purposes without keys)
if (!db) {
  console.warn('⚠️ Firebase credentials missing. Using Mock Firestore logic for demo.');
  db = {
    collection: (colName) => ({
      add: async (data) => {
        console.log(`[Mock DB] Added to ${colName}:`, data);
        return { id: 'mock-id-' + Date.now() };
      },
      doc: (id) => ({
        update: async (data) => {
          console.log(`[Mock DB] Updated ${colName}/${id}:`, data);
          return true;
        }
      })
    })
  };
}

export { db };
