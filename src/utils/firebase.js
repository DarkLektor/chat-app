import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4RHmK1t0VIhnt6jJs4XXmq7dPwjhHUsc",
  authDomain: "chat-b2aaf.firebaseapp.com",
  projectId: "chat-b2aaf",
  storageBucket: "chat-b2aaf.appspot.com",
  messagingSenderId: "796103503986",
  appId: "1:796103503986:web:0e2fe376cdee86478e92eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
