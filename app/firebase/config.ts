import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBkNZnU8K_UywMmfRwI312Emg8T97O7ruM",
  authDomain: "aitraffic-728d2.firebaseapp.com",
  projectId: "aitraffic-728d2",
  storageBucket: "aitraffic-728d2.appspot.com",
  messagingSenderId: "1058859967015",
  appId: "1:1058859967015:web:bc6b1d323434ebf0eea402",
  measurementId: "G-15QBESP5RJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);