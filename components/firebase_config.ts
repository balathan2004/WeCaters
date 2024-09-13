// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { Analytics, getAnalytics ,isSupported} from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyAAtc_dWHH3VeiSvk2ZbPdT4YCziW5BAd4",
  authDomain: "caters-a782b.firebaseapp.com",
  projectId: "caters-a782b",
  storageBucket: "caters-a782b.appspot.com",
  messagingSenderId: "382243850264",
  appId: "1:382243850264:web:5a4b367750eb5f63889b6d",
  measurementId: "G-QSY607Z72J",
};


const app = initializeApp(firebaseConfig,"client");
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider=new GoogleAuthProvider()
let analytics:Analytics|null=null;


isSupported().then((supported) => {
  if (supported) {
    console.log("Supported")
  return  analytics = getAnalytics(app);
  }else{
    console.log("Not supported " )
  }
});

export { app, firestore, storage ,auth,provider,analytics};
