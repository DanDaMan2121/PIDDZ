
// import { parseSetCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, set, remove, onValue, child, get} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);

let _app = null;
let _cloudDb = null;
let _rtDb = null;



export async function readUserData(parentId, childId) { // a single snapshot of the data
  const dbRef = ref(getDatabase());
  let data = '';
  await get(child(dbRef, parentId + '/' + childId))
  .then((snapshot) => {
    if (snapshot.exists()){
      data = snapshot.val();
    } else {
      console.log('No data available');
    }
  })
  .catch((error) => {
    console.error(error);
  });
  return data;
}


export async function initFirebase(config = null) {
  if (_app ) return { app: _app, db: _cloudDb, dbr: _rtDb};

  const firebaseConfig = config || {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  const appModule = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js');
  const firestoreModule = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js');

  _app = appModule.initializeApp(firebaseConfig);
  _db = firestoreModule.getFirestore(_app);

  // expose db on the init function for other modules
  initFirebase.db = _db;
  return { app: _app, db: _db };
}

export async function saveOrder(orderObject, config = null) {
  try {
    await initFirebase(config);
    const db = initFirebase.db;
    const firestoreModule = await import('https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js');
    const ordersCol = firestoreModule.collection ? firestoreModule.collection(db, 'orders') : firestoreModule.collection(db, 'orders');
    if (firestoreModule.addDoc) {
      const { addDoc, serverTimestamp, collection } = firestoreModule;
      const docRef = await addDoc(collection(db, 'orders'), {
        ...orderObject,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    }

    throw new Error('Firestore addDoc not available');
  } catch (err) {
    console.error('saveOrder error', err);
    throw err;
  }
}
