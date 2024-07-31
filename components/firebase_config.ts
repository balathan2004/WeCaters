// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAAtc_dWHH3VeiSvk2ZbPdT4YCziW5BAd4",
  authDomain: "caters-a782b.firebaseapp.com",
  projectId: "caters-a782b",
  storageBucket: "caters-a782b.appspot.com",
  messagingSenderId: "382243850264",
  appId: "1:382243850264:web:5a4b367750eb5f63889b6d",
  measurementId: "G-QSY607Z72J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
