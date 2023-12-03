import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "unsplash-next-app.firebaseapp.com",
  projectId: "unsplash-next-app",
  storageBucket: "unsplash-next-app.appspot.com",
  messagingSenderId: "585683457750",
  appId: "1:585683457750:web:58b85254686c2bf2761b77",
  measurementId: "G-Z9KSV9PH9D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
