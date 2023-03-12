<template>
  <div class="my-page">
    <h1>投稿一覧</h1>
    <ul>
      <li v-for="(postObj, postObjs) in postObjs" :key="postObjs">
        {{ postObj.postTitle }},

        <img
          v-if="postObj.imgPath !== null"
          v-bind:src="postObj.imgPath"
          width="300"
          height="300"
        />
      </li>
    </ul>
  </div>
</template>
<script>
import {
  collection,
  // addDoc,
  query,
  getDocs,
} from "firebase/firestore"
import {
  ref,
  // uploadBytes,
  getDownloadURL,
} from "firebase/storage"
import { db, storage } from "../firebase.js"
export default {
  data() {
    return {
      userName: "",
      postTitle: "",
      postContent: "",
      postObjs: [],
      imgPath: "",
    }
  },
  //いる？
  created() {
    //postObj
    this.Read()
  },
  methods: {
    //画像の表示
    //投稿を１回読み込む関数 posts.dbRef.id/ref.id
    async Read() {
      console.log("l")
      const q = query(collection(db, "posts"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (doc) => {
        if (doc.data().imgPath !== "") {
          const imgUrl = await getDownloadURL(
            ref(storage, `files/${doc.data().imgPath}`)
          ).then((url) => {
            return url
          })

          const postdata = doc.data()
          postdata.imgPath = imgUrl
          console.log(postdata)
          this.postObjs.push(postdata)
        } else {
          const postdata = doc.data()
          postdata.imgPath = null
          console.log(postdata)
          this.postObjs.push(postdata)
        }
      })
      console.log(this.postObjs)
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
