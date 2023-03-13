<<<<<<< HEAD
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
=======
// 必要な関数を import
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

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

// ストレージサービスへの参照を取得し、ストレージバケットの参照を作成するために使用
export const storage = getStorage(app)

>>>>>>> 4462685315c0a1f13532b851cf306cae6ab6ac0a
// Firestoreを読み込み、db(databaseの略)として export
export const db = getFirestore(app)
