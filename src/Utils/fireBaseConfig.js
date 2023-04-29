// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiOoJMKMJf4FmrTOQNQOJLUSVwF_KhZ1o",
  authDomain: "registration-c558d.firebaseapp.com",
  projectId: "registration-c558d",
  storageBucket: "registration-c558d.appspot.com",
  messagingSenderId: "1047774771868",
  appId: "1:1047774771868:web:898d2c3accbf24317f4b59",
  measurementId: "G-Y0FL1PXZYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };