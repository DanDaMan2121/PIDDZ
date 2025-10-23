// Firebase Configuration for PIDDZ Pizza Delivery App

const firebaseConfig = {
apiKey: "AIzaSyDkL_k8v_Ww-jw7WLqfz_sVUsDx8ZmIKqA",
  authDomain: "piddz-pizza-app.firebaseapp.com",
  databaseURL: "https://piddz-pizza-app-default-rtdb.firebaseio.com",
  projectId: "piddz-pizza-app",
  storageBucket: "piddz-pizza-app.firebasestorage.app",
  messagingSenderId: "124385002957",
  appId: "1:124385002957:web:8664adec2ea060f30a3084",
  measurementId: "G-HS72NM5CFN"
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