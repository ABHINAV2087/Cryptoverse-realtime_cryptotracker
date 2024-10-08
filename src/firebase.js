import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./config/firebaseConfig";

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(firebaseApp); // For Authentication
const db = getFirestore(firebaseApp); // For Firestore Database

export { auth, db };
