import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
  const app = initializeApp( environment.firebase);
export const auth = getAuth(app);