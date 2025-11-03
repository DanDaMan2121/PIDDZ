
let _app = null;
let _db = null;

export async function initFirebase(config = null) {
  if (_app) return { app: _app, db: _db };

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
