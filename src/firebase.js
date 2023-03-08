// 必要な関数を

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCEW4PHztDdaeNVjIb4tAC5zh0JCDthpMo",
  authDomain: "team2-app.firebaseapp.com",
  projectId: "team2-app",
  storageBucket: "team2-app.appspot.com",
  messagingSenderId: "1061567398770",
  appId: "1:1061567398770:web:fb1c5fdd29f832b63e13eb",
  measurementId: "G-S1T4B58DGR",
}

// Firebaseアプリオブジェクトを初期化
const app = initializeApp(firebaseConfig)
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)
