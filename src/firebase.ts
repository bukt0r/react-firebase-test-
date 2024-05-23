import {initializeApp} from "firebase/app";
import {getFirestore, connectFirestoreEmulator} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOOfikDQPBNBb_zaSJOVbwjaCbLOH7dWc",
  authDomain: "fir-react-spa.firebaseapp.com",
  projectId: "fir-react-spa",
  storageBucket: "fir-react-spa.appspot.com",
  messagingSenderId: "710012435486",
  appId: "1:710012435486:web:64347cdecb0fce5bf0820f",
  measurementId: "G-R4GFJB4TEZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

if (window.location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export {db};
