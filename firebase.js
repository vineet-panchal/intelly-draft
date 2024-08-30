// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD58_ly3wt0sY9iNs7AcUwAhRyF9Bv91ZQ",
  authDomain: "intelly-ai-flashcards-saas.firebaseapp.com",
  projectId: "intelly-ai-flashcards-saas",
  storageBucket: "intelly-ai-flashcards-saas.appspot.com",
  messagingSenderId: "321210671320",
  appId: "1:321210671320:web:f42a0c6df7cd2a09eef7ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;