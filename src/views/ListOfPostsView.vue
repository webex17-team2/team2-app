<template>
  <div class="my-page">
    <h1>投稿一覧</h1>
    <ul>
      <li v-for="(postObj, postObjs) in postObjs" :key="postObjs">
        {{ postObj.postTitle }},
        <div v-for="(path, index) in postObj.imgPath" :key="index">
          <img
            v-if="postObj.imagePath !== null"
            v-bind:src="path"
            width="500"
            height="300"
          />
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
export default {
  data() {
    return {
      userName: "",
      postTitle: "",
      postContent: "",
      postObjs: [],
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
          this.postObjs.push(postdata)
        } else {
          const postdata = doc.data()
          postdata.imgPath = null
          this.postObjs.push(postdata)
        }
      })
      console.log("posrObjs")
      console.log(this.postObjs)
      console.log(this.postObj)
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
