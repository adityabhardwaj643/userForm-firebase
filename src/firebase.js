import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBQMCnoSs09TOq4zX45ZTQQVMJIX0JAhH8",
  authDomain: "app223-2fa99.firebaseapp.com",
  projectId: "app223-2fa99",
  storageBucket: "app223-2fa99.appspot.com",
  messagingSenderId: "638284654746",
  appId: "1:638284654746:web:c85ab945634c961bee5723"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);