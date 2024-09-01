// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD58_ly3wt0sY9iNs7AcUwAhRyF9Bv91ZQ",
//   authDomain: "intelly-ai-flashcards-saas.firebaseapp.com",
//   projectId: "intelly-ai-flashcards-saas",
//   storageBucket: "intelly-ai-flashcards-saas.appspot.com",
//   messagingSenderId: "321210671320",
//   appId: "1:321210671320:web:f42a0c6df7cd2a09eef7ad"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export default db;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALBHn5XwvBC4xcx4ix8vmtYQbvlYmOcew",
  authDomain: "intelly-37c1c.firebaseapp.com",
  projectId: "intelly-37c1c",
  storageBucket: "intelly-37c1c.appspot.com",
  messagingSenderId: "978759888729",
  appId: "1:978759888729:web:96716772e44199d9aae648"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db; // export the db object