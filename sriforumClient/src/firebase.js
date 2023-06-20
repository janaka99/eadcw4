// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYqKtUWH_mHV2AR-n7UFxux0uG5GcGV-k",
  authDomain: "srihub-936c1.firebaseapp.com",
  projectId: "srihub-936c1",
  storageBucket: "srihub-936c1.appspot.com",
  messagingSenderId: "544155586260",
  appId: "1:544155586260:web:028653c0dd70ad57a8f541",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
