// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0ManhZikVTutnAntpr3ZrSyrih-zqVwc",
  authDomain: "fir-react-todo-s3-2023.firebaseapp.com",
  projectId: "fir-react-todo-s3-2023",
  storageBucket: "fir-react-todo-s3-2023.appspot.com",
  messagingSenderId: "63727198401",
  appId: "1:63727198401:web:e330f32cbf1eaaab69f440"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);