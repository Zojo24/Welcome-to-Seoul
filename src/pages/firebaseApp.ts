// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO7hmoy3_fnfZar7-cVOPZoLoeIo3v4fI",
  authDomain: "welcome-to-seoul.firebaseapp.com",
  projectId: "welcome-to-seoul",
  storageBucket: "welcome-to-seoul.appspot.com",
  messagingSenderId: "1096052679605",
  appId: "1:1096052679605:web:d5a90b27b7728f7e67affc",
  measurementId: "G-ZW6YYBTTGY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
