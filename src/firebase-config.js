import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBS5WtxuaBO6G71D_Ehwtf-um5c2xCEK8U",
  authDomain: "pet-app-9663f.firebaseapp.com",
  databaseURL:
    "https://pet-app-9663f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pet-app-9663f",
  storageBucket: "pet-app-9663f.appspot.com",
  messagingSenderId: "914531445977",
  appId: "1:914531445977:web:7483d0374c17c1b65262c8",
  measurementId: "G-RHS6PFDF92",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
