import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBjq9F-7nJ98cr47T4pJo868st96fGCXzA",
  authDomain: "clon-27226.firebaseapp.com",
  projectId: "clon-27226",
  storageBucket: "clon-27226.appspot.com",
  messagingSenderId: "560821075692",
  appId: "1:560821075692:web:ff8ff03735797b745aafc9",
  measurementId: "G-0PXDP4119T"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);