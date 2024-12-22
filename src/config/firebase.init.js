// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7D8L6J6eq5S83fuFR0eVXB2FldlBxft8",
  authDomain: "stay-rooms-bd.firebaseapp.com",
  projectId: "stay-rooms-bd",
  storageBucket: "stay-rooms-bd.firebasestorage.app",
  messagingSenderId: "206405241406",
  appId: "1:206405241406:web:e4febee1b0ed58754cdf6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;