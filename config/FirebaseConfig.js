// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVumdgsTrno7b0re5DmPcIQA6-6bNl8r8",
  authDomain: "business-5e45e.firebaseapp.com",
  projectId: "business-5e45e",
  storageBucket: "business-5e45e.appspot.com",
  messagingSenderId: "87612937968",
  appId: "1:87612937968:web:c60e2c5b91d744e1541435",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
