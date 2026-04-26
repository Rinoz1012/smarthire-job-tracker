import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ADMIN_EMAIL = 'fathimarinoz10@gmail.com';

export const getUserCredits = async (userId, userEmail) => {
  if (userEmail === ADMIN_EMAIL) return 9999;
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().credits;
    } else {
      await setDoc(userRef, {
        credits: 5,
        totalAnalyses: 0,
        createdAt: new Date().toISOString()
      });
      return 5;
    }
  } catch (error) {
    console.error('Error getting credits:', error);
    return 0;
  }
};

export const deductCredit = async (userId, userEmail) => {
  if (userEmail === ADMIN_EMAIL) return 9999;
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const currentCredits = userDoc.data().credits;
      const totalAnalyses = userDoc.data().totalAnalyses || 0;
      await updateDoc(userRef, {
        credits: currentCredits - 1,
        totalAnalyses: totalAnalyses + 1
      });
      return currentCredits - 1;
    }
  } catch (error) {
    console.error('Error deducting credit:', error);
  }
};

export const addCredits = async (userId, amount) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const currentCredits = userDoc.data().credits;
      await updateDoc(userRef, {
        credits: currentCredits + amount
      });
      return currentCredits + amount;
    }
  } catch (error) {
    console.error('Error adding credits:', error);
  }
};
