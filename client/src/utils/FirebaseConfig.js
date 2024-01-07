import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAVmxij48K-HI0FKsmJeNgJ791jtpxIidg",
  authDomain: "express-api-storage-50e7b.firebaseapp.com",
  projectId: "express-api-storage-50e7b",
  storageBucket: "express-api-storage-50e7b.appspot.com",
  messagingSenderId: "885846464709",
  appId: "1:885846464709:web:baffe898cdff92361138ac"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);