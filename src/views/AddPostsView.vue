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
        <router-link to="/listOfPosts" class="nav__item nav__link">
          投稿
        </router-link>
      </button>
    </div>
    <h3>表示</h3>
    <ul>
      <li v-for="(postObj, postObjs) in postObjs" :key="postObjs">
        {{ postObj.postTitle }},
        <div v-for="(path, index) in postObj.imgPath" :key="index">
          <img
            v-if="postObj.imgPath !== null"
            v-bind:src="postObj.imgPath"
            width="300"
            height="300"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  collection,
  addDoc,
  //getDoc,
  //doc,
  // getDatabase,
  // child,
  // get,
  query,
  getDocs,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
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
  //いる？
  created() {
    //postObj
    this.Read()
  },
  methods: {
    //postTweet(userName, postTitle, postContent, imageUrl) {
    //投稿を追加する関数
    async Post() {
      //
      console.log(this)
      //もしtextareaが空の状態で投稿ボタンが押されたら、この関数を抜ける
      if (this.postTitle === "" && this.postContent === "") {
        alert("タイトルと内容がありません！")
        return
      }
      //投稿内容全てをまとめたPostオブジェクト
      const Post = {
        userName: this.userName,
        postTitle: this.postTitle,
        postContent: this.postContent,
        imgPath: this.imgPath,
      }
      //追加
      await addDoc(collection(db, "posts"), Post)

      // set(ref(db, "users/" + userId), {
      //   username: name,
      //   email: email,
      //   profile_picture: imageUrl,
      // })
    },

    //写真読み込み関数 資料(https://qiita.com/ohanawb/items/14dd538007d74e773096)
    async fileUpload(props) {
      let files = []
      for (let i = 0; i < props.target.files.length; i++) {
        files[i] = props.target.files[i]
        this.imgPath.push(props.target.files[i].name)
      }
      for (let i = 0; i < props.target.files.length; i++) {
        this.imgUrl = URL.createObjectURL(files[i])
        const storageRef = ref(storage, "files/" + files[i].name)
        // "files"はstorageに作成したフォルダ名
        // Firebaseにデータを適切に送るために必要なコード
        await uploadBytes(storageRef, files[i]).then((snapshot) => {
          console.log("追加画像情報" + snapshot)
        })
      }
    },
    //画像の表示
    // async filedownload(imgPath) {
    //   const url = await getDownloadURL(ref(storage, imgPath))
    //   return url
    // },
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
      console.log("read後")
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
