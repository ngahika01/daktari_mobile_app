import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoA112wUYk3BN3jTgrvMLARGmbyw7Kb5c",
  authDomain: "daktari-17552.firebaseapp.com",
  projectId: "daktari-17552",
  storageBucket: "daktari-17552.appspot.com",
  messagingSenderId: "929242092788",
  appId: "1:929242092788:web:b90578c72f313f2ce7baa1",
  measurementId: "G-QNEFSG9N82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
