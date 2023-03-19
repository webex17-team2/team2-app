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
          <!-- 詳細リンクえお押された時、postArrayの何番目か(index)を取得する -->
          <p>{{ postObjs }}</p>
          <button @click="routerBtn(postObjs)">詳細へ</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { collection, query, getDocs } from "firebase/firestore"
import { ref, getDownloadURL } from "firebase/storage"
// firebase.js で db として export したものを import
import { db, storage } from "../firebase.js" //const db = getDatabase()
// import DetailView from "../components/DetailView.vue"
export default {
  // components: { DetailView },
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
    //いる？
    //postObj
    this.Read()
  },
  methods: {
    //画像の表示
    //投稿を１回読み込む関数 posts.dbRef.id/ref.id
    async Read() {
      const q = query(collection(db, "posts"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (doc) => {
        if (doc.data().imgPath !== "") {
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
        } else {
          const postdata = doc.data()
          postdata.imgPath = null
          this.postArray.push(postdata)
        }
      })
      console.log("postArrey")
      console.log(this.postArray)
      console.log(this.postObjs)
    },
    // ByValue() {
    //   const index = this.postObjs
    //   console.log("index番号")
    //   console.log(index)
    // },
    routerBtn(postObjs) {
      console.clear()
      // let box = []
      // const imgBoxNumber = this.postArray[postObjs].imgPath.length
      // for (let i = 0; i < imgBoxNumber; i++) {
      //   box.push(this.postArray[postObjs].imgPath.path)
      // }
      // console.log(box)
      this.$router.push({
        name: "DetailView",
        params: {
          // postArray: this.postArray[index],
          // postTitle: this.postArray[postObjs].postTitle,
          imgPath: this.postArray[postObjs].imgPath[0],
          index: postObjs,
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
