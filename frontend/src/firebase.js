import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDWy4g32A51a3srrZ13cgTfwJlBocVKcl8",
  authDomain: "smarthire-77d77.firebaseapp.com",
  projectId: "smarthire-77d77",
  storageBucket: "smarthire-77d77.firebasestorage.app",
  messagingSenderId: "1031680499153",
  appId: "1:1031680499153:web:cbcc7e275bdfebae56d4f0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
  }
};
