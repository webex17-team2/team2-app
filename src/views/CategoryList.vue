<template>
  <!-- リスト入れる -->
  <router-link to="/about">⬅︎</router-link>
  <ul>
    <li v-for="(postObj, postObjs) in postArray" :key="postObjs">
      {{ postObj.postTitle }},
      <div v-for="(path, index) in postObj.imgPath" :key="index">
        <img
          v-if="postObj.imagePath !== null"
          v-bind:src="path"
          width="500"
          height="300"
        />
        <!-- 詳細リンクえお押された時、postArrayの何番目か(index)を取得する -->
        <p>{{ postObjs }}</p>
      </div>
      <button @click="routerBtn(postObjs)">詳細へ</button>
    </li>
  </ul>
</template>
<script>
import { collection, query, getDocs, where } from "firebase/firestore"
import { db } from "../firebase.js" //const db = getDatabase()
export default {
  data() {
    return {
      userName: "",
      postTitle: "",
      postContent: "",
      postArray: [],
      imgPath: [],
      changeProps: "",
    }
  },
  props: {
    choice: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.Read()
  },
  computed: {
    newProps() {
      return { result: this.$route.params.choice }
    },
  },
  watch: {
    newProps() {
      this.Read()
    },
  },
  methods: {
    async Read() {
      this.postArray = []
      const q = query(
        collection(db, "posts-test"),
        where("category", "==", this.choice)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (doc) => {
        let postdata = doc.data()
        postdata.timestamp = doc.data().timestamp
        this.postArray.unshift(postdata)
      })
    },
    routerBtn(postObjs) {
      this.$router.push({
        name: "DetailView",
        params: {
          timestamp: this.postArray[postObjs].timestamp,
        },
      })
      console.log("ボタンが押されました")
    },
  },
}
</script>
