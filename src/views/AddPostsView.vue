<template>
  <div class="form__wrapper">
    <p>ニックネーム</p>
    <input type="text" v-model="userName" />
    <p>おすすめの場所</p>
    <input type="text" v-model="postTitle" />
    <P>感想や押しポイント</P>
    <textarea
      class="form__textarea"
      v-model="postContent"
      placeholder="ここが素敵！"
    />
    <p>写真を追加</p>
    <input type="file" multiple @change="fileUpload" />
    <!-- アップロードされた画像が以下に表示される -->
    <img v-if="img_url" :src="img_url" />
    <div class="form__buttons">
      <button v-on:click="Post" class="form__submit-button">
        <router-link to="/listOfPosts" class="nav__item nav__link"
          >投稿</router-link
        >
      </button>
    </div>
    <h3>表示</h3>
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
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// s
import { setDoc, doc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
// firebase.js で db として export したものを import
import { db, storage } from "../firebase.js" //const db = getDatabase()
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
  methods: {
    async Post() {
      if (
        this.postTitle === "" &&
        this.postContent === "" &&
        this.imgPath === ""
      ) {
        console.log("postTitleが空でした")
        alert("タイトル/写真/感想/は必ず記載してください")
        return
      }
      //追加
      function generateRandomString(length) {
        var result = ""
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length)
          )
        }
        return result
      }

      var randomString = String(generateRandomString(20))
      const now = new Date()
      const Post = {
        userName: this.userName,
        postTitle: this.postTitle,
        postContent: this.postContent,
        imgPath: this.imgPath,
        timestamp: now.getTime(),
        ID: randomString,
      }
      const overvieRef = doc(db, "posts-test", randomString)
      await setDoc(overvieRef, Post)

      // const overvieRef_res = doc(db, "posts-test", randomString)
      const postCommentsRef = doc(
        db,
        "posts-test",
        randomString,
        "postContent",
        randomString
      )

      await setDoc(postCommentsRef, { name: "kuji" })
      console.log(overvieRef)
      this.imgPath = []
    },

    //写真読み込み関数 資料(https://qiita.com/ohanawb/items/14dd538007d74e773096)
    async fileUpload(props) {
      console.log(props)
      let file = props.target.files[0]
      this.imgUrl = URL.createObjectURL(file)
      const storageRef = ref(storage, "files/" + file.name)
      await uploadBytes(storageRef, file)
      const getUrl = await getDownloadURL(ref(storage, `files/${file.name}`))
      this.imgPath.push(getUrl)
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
