// Firebase Configuration for PIDDZ Pizza Delivery App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, set, remove, onValue, child, get, update, push, serverTimestamp} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCkINLqzwllGDnEYTjK3TA4STSgwgs438c",
    authDomain: "piddz-5de75.firebaseapp.com",
    databaseURL: "https://piddz-5de75-default-rtdb.firebaseio.com",
    projectId: "piddz-5de75",
    storageBucket: "piddz-5de75.firebasestorage.app",
    messagingSenderId: "1006827305493",
    appId: "1:1006827305493:web:064d16ab5f5bb80e16ec1c",
    measurementId: "G-9YM8L6TS3X"
};

// Initializes Firebase
let app;
let database;

function initializeFirebase() {
    try {
        app = initializeApp(firebaseConfig);
        database = getDatabase();
        console.log("Firebase initialized successfully");
        return true;
    } catch (error) {
        console.error("Firebase initialization error:", error);
        return false;
    }
}

// Export for use in other modules
export { firebaseConfig, initializeFirebase, database, push, set, ref, get, onValue, serverTimestamp};