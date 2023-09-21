// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABp5MU8YyoRBwoxy1QfhiD3047TXwGR6A",
  authDomain: "image-gallery-f9054.firebaseapp.com",
  projectId: "image-gallery-f9054",
  storageBucket: "image-gallery-f9054.appspot.com",
  messagingSenderId: "275127974669",
  appId: "1:275127974669:web:66c1454324570232458e44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
export const storage = getStorage(app);
export const db = getFirestore(app);
