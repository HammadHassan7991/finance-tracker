import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD1VQA2irNmsvcTeLhGPraA5l5MoJdtHvg",
    authDomain: "mymoney-70a31.firebaseapp.com",
    projectId: "mymoney-70a31",
    storageBucket: "mymoney-70a31.appspot.com",
    messagingSenderId: "1050958884852",
    appId: "1:1050958884852:web:0314bb9e5ff6d4d6b1d3a1"
};
firebase.initializeApp(firebaseConfig)
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timeStamp = firebase.firestore.Timestamp
export { projectFirestore, projectAuth, timeStamp }