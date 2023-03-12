import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBDNi6w0Ne_GRlZYi7Tr4EJ-N7hq4rFBsE",
    authDomain: "ecom-admin-215b0.firebaseapp.com",
    projectId: "ecom-admin-215b0",
    storageBucket: "ecom-admin-215b0.appspot.com",
    messagingSenderId: "194809778530",
    appId: "1:194809778530:web:63c290e0634eff25c5dc3b"
  };

  const app = initializeApp(firebaseConfig);
  const auth= getAuth(app);
  const db =getFirestore(app);
  const storage = getStorage(app);

  export {auth ,db,storage};
  export default app;