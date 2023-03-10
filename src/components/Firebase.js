import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "REACT_APP_FIREBASE_KEY",
    authDomain: "ecom-admin-215b0.firebaseapp.com",
    projectId: "ecom-admin-215b0",
    storageBucket: "ecom-admin-215b0.appspot.com",
    messagingSenderId: "REACT_APP_FIREBASE_MESSAGINGSENDERID",
    appId: "REACT_APP_FIREBASE_APIID"
  };

  const app = initializeApp(firebaseConfig);
  const auth= getAuth(app);
  const db =getFirestore(app);
  const storage = getStorage(app);

  export {auth ,db,storage};
  export default app;