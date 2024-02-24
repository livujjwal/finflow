// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCq6PYqG5KBHQ_-jbw1Orq_tHWI2vdAsGk",
  authDomain: "finflow-45b02.firebaseapp.com",
  projectId: "finflow-45b02",
  storageBucket: "finflow-45b02.appspot.com",
  messagingSenderId: "455330791614",
  appId: "1:455330791614:web:939ea30674cdf066d0deef",
  measurementId: "G-LJLSB0KT07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { db, doc, setDoc, getDoc, auth, provider };
