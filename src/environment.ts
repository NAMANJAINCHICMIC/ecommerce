import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

export const environment = {
    production: false,
    firebase: { 
  apiKey: "AIzaSyDPKym_YBLrMvi7RKNgBoUnlaztXMreskg",
  authDomain: "ecommerce-d831d.firebaseapp.com",
  projectId: "ecommerce-d831d",
  storageBucket: "ecommerce-d831d.appspot.com",
  messagingSenderId: "166331040427",
  appId: "1:166331040427:web:c8d58a1cb18aefe459edee"
    }
  };
  const firebaseConfig = {
    apiKey: "AIzaSyDPKym_YBLrMvi7RKNgBoUnlaztXMreskg",
    authDomain: "ecommerce-d831d.firebaseapp.com",
    projectId: "ecommerce-d831d",
    storageBucket: "ecommerce-d831d.appspot.com",
    messagingSenderId: "166331040427",
    appId: "1:166331040427:web:c8d58a1cb18aefe459edee"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
 export const app = initializeApp( firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const database = getDatabase(environment.app);
export const AUTH_URL = 'https://ecommerce-d831d-default-rtdb.asia-southeast1.firebasedatabase.app/'