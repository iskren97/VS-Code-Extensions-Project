import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDfcUPJ5JbKzcDHMbRYuVt9Xc6LTAtjuKs',
  authDomain: 'addonis-1b4ce.firebaseapp.com',
  databaseURL:
    'https://addonis-1b4ce-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'addonis-1b4ce',
  storageBucket: 'addonis-1b4ce.appspot.com',
  messagingSenderId: '826167085409',
  appId: '1:826167085409:web:0b7df5ad90928b450c5d20',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
