import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCP0dv7KemdxiMS9ngetGJtwg1UAFMCBzU",
    authDomain: "linkedin-clone-7c48f.firebaseapp.com",
    projectId: "linkedin-clone-7c48f",
    storageBucket: "linkedin-clone-7c48f.appspot.com",
    messagingSenderId: "803363217151",
    appId: "1:803363217151:web:5e618e5956d782039636ca",
    measurementId: "G-6LFVT2RF5Z"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export {db, auth, storage};