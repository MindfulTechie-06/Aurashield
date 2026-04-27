import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app;
let db;

try {
  if (firebaseConfig.projectId) {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    }
    db = getFirestore(app);
  }
} catch (error) {
  console.error("Firebase Client Initialization Error:", error);
}

// Fallback logic for demo mode if Firebase isn't configured
if (!db) {
  console.warn("⚠️ Firebase credentials missing. Using Mock Client Firestore logic for demo.");
  // Basic mock implementation for onSnapshot
  db = {
    isMock: true,
    collection: () => ({}),
  };
}

export { db };
