// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAzR5eCi2WJ5CMwjKuLz6shSrk_P8xebUs',
  authDomain: 'my-first-project-93b69.firebaseapp.com',
  projectId: 'my-first-project-93b69',
  storageBucket: 'my-first-project-93b69.appspot.com',
  messagingSenderId: '948067488298',
  appId: '1:948067488298:web:8f3a316365e71e78ede953',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
