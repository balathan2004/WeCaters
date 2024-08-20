
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase-admin/app";
const admin=require("firebase-admin");
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import {getAuth } from "firebase-admin/auth";
import { credential } from 'firebase-admin';


const service_account=require('./caters-a782b-firebase-adminsdk-jpayh-c1f431e1a9.json')



// Initialize Firebase
const app_admin = admin.initializeApp({credential:admin.credential.cert(service_account)})
//initializeApp(service_account,"admin1");
const firestore_admin = getFirestore(app_admin);
const storage_admin = getStorage(app_admin);
const auth_admin=getAuth(app_admin);





export { app_admin, firestore_admin, storage_admin,auth_admin};
