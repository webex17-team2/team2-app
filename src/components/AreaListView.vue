<template>
  <!-- to="変える" -->
  <router-link to="/japanMap">⬅︎</router-link>
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
    }
  },
  props: {
    selectedArea: {
      type: String,
      required: true,
    },
  },
  async created() {
    console.log(this.selectedArea)
    //いる？
    //postObj
    this.Read()
  },
  methods: {
    async Read() {
      const q = query(
        collection(db, "posts-test"),
        //変える
        where("selectedArea", "==", this.selectedArea)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (doc) => {
        let postdata = doc.data()
        postdata.timestamp = doc.data().timestamp
        this.postArray.unshift(postdata)
      })
    },
  },
}
</script>
