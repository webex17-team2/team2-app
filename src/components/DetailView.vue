<template>
  <h1>詳細</h1>
  <p>ニックネーム</p>
  <p>"userName"</p>
  <p>おすすめの場所</p>
  <p>"postTitle"</p>
  <P>感想や押しポイント</P>
  <p>〜〜〜〜〜〜＾</p>
  <p>画像</p>
  <!-- <p>{{ this.$router.params.postTitle }}</p> -->
  <img :src="imgPath" />
  <!-- <p>{{ this.$router.params.postTitle }}</p> -->
  <img :src="imgPathContent" />

  <div>{{ timestamp }}</div>
  <img />

  <h2>コメント機能</h2>
  <textarea
    class="form__textarea"
    v-model="postContent"
    placeholder="コメントする"
  ></textarea>
</template>
<script>
// import { async } from "@firebase/util"
import { collection, query, where, getDocs } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"
import { db, storage } from "../firebase.js"
export default {
  //ListOfView.vueから受け取り
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      userName: "",
      postTitle: "",
      postContent: "",
      postArray: [],
      imgPath: [],
    }
  },
  created() {
    this.Read()
    console.log("タイムスタンプ")
    console.log(this.timestamp)
    // const data = this.$router

    // const nameQuery = query(citiesRef, where(timestamp, "==", timestamp))
    //
  },
  methods: {
    async Read() {
      const timeQuery = query(
        collection(db, "posts"),
        where("timestamp", "==", this.timestamp)
      )
      const querySnapshot = await getDocs(timeQuery)
      querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots
        let postdata = doc.data()
        for (let i = 0; i < doc.data().imgPath.length; i++) {
          const imgUrl = await getDownloadURL(
            ref(storage, `files/${doc.data().imgPath[i]}`)
          ).then((url) => {
            return url
          })
          postdata.imgPath[i] = imgUrl
        }
        this.postArray.push(postdata)
      })
      console.log("Array")
      console.log(this.postArray)
      console.log("aaaaaaa")
      //console.log(doc.id, " => ", doc.data())
    },
  },
}
</script>
