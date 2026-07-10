import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8YaXaB5UeUwPMMs17ph7O4pbQg489oFg",
  authDomain: "dsa-tracker-dd9ca.firebaseapp.com",
  projectId: "dsa-tracker-dd9ca",
  storageBucket: "dsa-tracker-dd9ca.firebasestorage.app",
  messagingSenderId: "313964373196",
  appId: "1:313964373196:web:53f46ec9ca9f2c914c4e69",
  measurementId: "G-HZ4C6F0DE9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
