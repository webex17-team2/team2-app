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
        </div>
        <button @click="routerBtn(postObjs)">詳細へ</button>
      </li>
    </ul>
  </div>
</template>
<script>
import { collection, query, getDocs, orderBy } from "firebase/firestore"
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
  async created() {
    //いる？
    //postObj

    const a = query(collection(db, "posts"), orderBy("timestamp", "asc"))
    const querySnapshot = await getDocs(a)
    querySnapshot
      .forEach((doc) => {
        this.postArray.unshift({
          imgPath: doc.data().imgPath,
          postContent: doc.data().postContent,
          postTitle: doc.data().postTitle,
          timestamp: doc.data().timestamp,
          userName: doc.data().userName,
        })

        console.log("DOC")
        console.log(doc)
        console.log("Array")
        console.log(this.postArray)
      })
      .then(() => {
        this.read()
      })
  },
  methods: {
    async read() {
      for (let i = 0; i < 2; i++) {
        if (this.postArray[i].imgPath !== "") {
          const imgUrl = await getDownloadURL(
            ref(storage, `files/${this.postArray[i].imgPath}`)
          ).then((url) => {
            return url
          })
          this.postArray[i].imgPath = imgUrl
        }
      }
    },
    //画像の表示
    //投稿を１回読み込む関数 posts.dbRef.d/ref.id
    // async Read() {
    //   const q = query(collection(db, "posts"), orderBy("timestamp", "asc"))
    //   const querySnapshot = await getDocs(q)
    //   querySnapshot.forEach(async (doc) => {
    //     if (doc.data().imgPath !== "") {
    //       let postdata = doc.data()
    //       for (let i = 0; i < doc.data().imgPath.length; i++) {
    //         const imgUrl = await getDownloadURL(
    //           ref(storage, `files/${doc.data().imgPath[i]}`)
    //         ).then((url) => {
    //           return url
    //         })
    //         postdata.imgPath[i] = imgUrl
    //       }
    //       this.postArray.push(postdata)
    //     } else {
    //       const postdata = doc.data()
    //       postdata.imgPath = null
    //       this.postArray.push(postdata)
    //     }
    //   })

    //   console.log("postArrey")
    //   console.log(this.postArray)
    //   console.log(this.postObjs)
    // },
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
          postTitle: this.postArray[postObjs].postTitle,
          // postTitle: this.postArray[postObjs].postTitle,
          imgPath: this.postArray[postObjs].imgPath[0],
          index: postObjs,
          //タイムー>time: this.postArray[postObjs].
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
