import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCPXseM3KmosCOfG1q8AorbIYe79B6aoZ4",
    authDomain: "test-project-76062.firebaseapp.com",
    projectId: "test-project-76062",
    storageBucket: "test-project-76062.firebasestorage.app",
    messagingSenderId: "264320123491",
    appId: "1:264320123491:web:418ad4b6870600515d2e56",
    measurementId: "G-7SWPD8G1DG"
  };
// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
