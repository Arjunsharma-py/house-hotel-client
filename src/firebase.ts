import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFbn7bCISsn4WoXCFuN9Q80D0AuRLgZTQ",
  authDomain: "house-hotel-data.firebaseapp.com",
  projectId: "house-hotel-data",
  storageBucket: "house-hotel-data.appspot.com",
  messagingSenderId: "1090051291493",
  appId: "1:1090051291493:web:0df6775a330875181dc98c",
  measurementId: "G-2K0E9V9V0E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
