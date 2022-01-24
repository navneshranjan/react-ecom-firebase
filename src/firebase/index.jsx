// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeusQWD-MKEEwHAIwucS2S_xpSpz9zq5Q",
  authDomain: "food-shop-8e933.firebaseapp.com",
  projectId: "food-shop-8e933",
  storageBucket: "food-shop-8e933.appspot.com",
  messagingSenderId: "893407969221",
  appId: "1:893407969221:web:d19e5959994864ebae15ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initializw db
const db = getFirestore();

export default app;
export { db };
