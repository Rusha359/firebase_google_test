import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB8cltSUmOcweiwFXhUaF7AybdL9JevHcg',
  authDomain: 'myproject-cdaa2.firebaseapp.com',
  projectId: 'myproject-cdaa2',
  storageBucket: 'myproject-cdaa2.appspot.com',
  messagingSenderId: '840673828451',
  appId: '1:840673828451:web:85ac05118d7b377b4aa256',
  measurementId: 'G-CLLQX3CF2J',
};

export const Context = createContext();
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider
    value={{
      app,
      analytics,
      auth,
      db,
    }}
  >
    <App />
  </Context.Provider>
);
