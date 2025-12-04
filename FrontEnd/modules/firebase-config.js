// Firebase Configuration for PIDDZ Pizza Delivery App

const firebaseConfig = {
  apiKey: "AIzaSyApqjyVL2JQkSMO_GqDArjbo19_h5RxP0g",
  authDomain: "piddz-pizza-application.firebaseapp.com",
  databaseURL: "https://piddz-pizza-application-default-rtdb.firebaseio.com",
  projectId: "piddz-pizza-application",
  storageBucket: "piddz-pizza-application.firebasestorage.app",
  messagingSenderId: "380795616409",
  appId: "1:380795616409:web:27a609a76c35d22076cc08"
};

// Initializes Firebase
let app;
let database;

function initializeFirebase() {
    try {
        app = firebase.initializeApp(firebaseConfig);
        database = firebase.database();
        console.log("Firebase initialized successfully");
        return true;
    } catch (error) {
        console.error("Firebase initialization error:", error);
        return false;
    }
}

// Export for use in other modules
export { firebaseConfig, initializeFirebase, database };