import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const db = null;

export async function firestoreDB(){
  if (!firebase.apps.length) {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECTID,
      storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKETV,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
      appId: process.env.NEXT_PUBLIC_APPID,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    db = firebase.firestore();
    return db;
  }else{
    return null;
  }
}