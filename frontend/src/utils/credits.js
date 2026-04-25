import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Get user credits from Firestore
export const getUserCredits = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return userDoc.data().credits;
    } else {
      // New user - give 2 free credits
      await setDoc(userRef, {
        credits: 2,
        totalAnalyses: 0,
        createdAt: new Date().toISOString()
      });
      return 2;
    }
  } catch (error) {
    console.error('Error getting credits:', error);
    return 0;
  }
};

// Deduct one credit after analysis
export const deductCredit = async (userId) => {
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

// Add credits after payment
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
