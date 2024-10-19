// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQZy57KYv-0DwjkKnXND6YAb_hIqIA4m8",
  authDomain: "impactdetection.firebaseapp.com",
  projectId: "impactdetection",
  storageBucket: "impactdetection.appspot.com",
  messagingSenderId: "737299997694",
  appId: "1:737299997694:web:ee5a2673eb5a488f84d6af",
  measurementId: "G-7R9R2LJJRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Export Firestore and necessary functions
export { db, doc, setDoc };
