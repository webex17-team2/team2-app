<template>
  <div class="my-page">
    <h1>投稿一覧</h1>
    <ul>
      <li v-for="(postObj, postObjs) in postArray" :key="postObjs">
        {{ postObj.postTitle }},{{ postObjs }},
        <div v-for="(path, index) in postObj.imgPath" :key="index">
          <img
            v-if="postObj.imagePath !== null"
            v-bind:src="path"
            width="500"
            height="300"
          />
          <p>{{ postObjs }}</p>
        </div>
        <button @click="routerBtn(postObjs)">詳細へ</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { collection, query, getDocs, orderBy } from "firebase/firestore"
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
  async created() {
    this.Read()
  },
  methods: {
    async Read() {
      const q = query(collection(db, "posts-test"), orderBy("timestamp", "asc"))
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
    },
  },
}
</script>
<style scoped>
.form__wrapper {
  padding: 1rem;
}
.form__textarea {
  width: 100%;
  height: calc(1.3rem * 3 + 0.5rem * 2);
  padding: 0.5rem;
  line-height: 1.3rem;
  border-radius: 5px;
  border: none;
  resize: none;
}
.form__textarea:focus {
  outline: none;
}
.form__buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
