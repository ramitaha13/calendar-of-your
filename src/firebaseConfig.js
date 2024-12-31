// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9JCaS9ug6d4MmOGnOah4kkxIQKzUckpA",
  authDomain: "calendar-7e112.firebaseapp.com",
  projectId: "calendar-7e112",
  storageBucket: "calendar-7e112.firebasestorage.app",
  messagingSenderId: "527689077746",
  appId: "1:527689077746:web:9573d6d1fa5498474f116b",
  measurementId: "G-RJMLRW8Y7R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
