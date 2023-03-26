<template>
  <!-- to="変える" -->
  <router-link to="/japanMap">⬅︎</router-link>
  <div class="my-page">
    <ul class="row">
      <li v-for="(postObj, postObjs) in postArray" :key="postObjs">
        {{ postObj.postTitle }},
        <div v-for="(path, index) in postObj.imgPath" :key="index">
          <img
            v-if="postObj.imagePath !== null"
            v-bind:src="path"
            width="250"
            height="250"
          />
          <!-- 詳細リンクえお押された時、postArrayの何番目か(index)を取得する -->
          <p>{{ postObjs }}</p>
        </div>
        <button class="btn btn-primary" @click="routerBtn(postObjs)">
          詳細へ
        </button>
      </li>
    </ul>
  </div>
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

<style scoped>
.my-page {
  padding: 0.5em 1em;
  margin: 2em 0;
  font-weight: bold;
  border: solid 10px #1dfdc9;
  border-radius: 10px;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  padding: 10px;
}

li {
  padding: 60px;
  margin: 20px;
  list-style: none;
  background-color: rgb(178, 174, 174);
  border-radius: 10px;
  animation-name: color;
  animation-duration: 20s;
  animation-delay: 0s;
  animation-iteration-count: 1;
}

@keyframes color {
  0% {
    background-color: #fff;
  }
  100% {
    background-color: #adaaaa;
  }
}
</style>
