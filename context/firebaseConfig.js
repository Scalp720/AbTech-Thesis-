import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQZy57KYv-0DwjkKnXND6YAb_hIqIA4m8",
  authDomain: "impactdetection.firebaseapp.com",
  projectId: "impactdetection",
  storageBucket: "impactdetection.appspot.com",
  messagingSenderId: "737299997694",
  appId: "1:737299997694:web:ee5a2673eb5a488f84d6af",
  measurementId: "G-7R9R2LJJRR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };