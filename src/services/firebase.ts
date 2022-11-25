import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDLLf4xjPgdqrWORF8NMrG_uolVW4biXxA',
  authDomain: 'todo-list-cbe6b.firebaseapp.com',
  projectId: 'todo-list-cbe6b',
  storageBucket: 'todo-list-cbe6b.appspot.com',
  messagingSenderId: '263742865547',
  appId: '1:263742865547:web:dbe6479566402f5e4a548e',
  measurementId: 'G-BNYEE9Y3E6',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const fireStore = firebaseApp.firestore();
export const firebaseStorage = firebaseApp.storage();

export type FirebaseType = typeof firebaseApp;
