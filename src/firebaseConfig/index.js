// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHAXMPxhPkuJ46Ri6QS1hb2uC92THe9cA",
  authDomain: "major-project-e7b3a.firebaseapp.com",
  projectId: "major-project-e7b3a",
  storageBucket: "major-project-e7b3a.appspot.com",
  messagingSenderId: "686986962496",
  appId: "1:686986962496:web:3f1adefa4b2c4103aa21a5",
  measurementId: "G-KMWXY8GJYX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

