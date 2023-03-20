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
import { collection, addDoc } from "firebase/firestore"
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
  created() {
    //いる？
    //postObj
    // this.Read()
  },
  methods: {
    // 投稿を追加する関数
    async Post() {
      // もしtextareaが空の状態で投稿ボタンが押されたら、この関数を抜けるという処理
      if (this.postTitle === "" && this.postContent === "") {
        console.log("postTitleが空でした")
        alert("タイトルと内容がありません。必ず記載してください")
        return
      }
      //投稿内容全てをまとめたPostオブジェクト
      // for (let i = 0; i < postdata.imgPath.length; i++) {
      //   const imgUrl = await getDownloadURL(
      //     ref(storage, `files/${doc.data().imgPath[i]}`)
      //   )
      //   postdata.imgPath[i] = imgUrl
      // }

      const now = new Date()
      const Post = {
        userName: this.userName,
        postTitle: this.postTitle,
        postContent: this.postContent,
        imgPath: this.imgPath,
        timestamp: now.getTime(),
      }
      //追加
      await addDoc(collection(db, "posts"), Post)
      this.imgPath = []
    },

    //写真読み込み関数 資料(https://qiita.com/ohanawb/items/14dd538007d74e773096)
    async fileUpload(props) {
      // let files = []
      // for (let i = 0; i < props.target.files.length; i++) {
      //   files[i] = props.target.files[i]
      //   this.imgPath.push(props.target.files[i].name)
      // }
      console.log(props)
      let file = props.target.files[0]
      // for (let i = 0; i < props.target.files.length; i++) {
      this.imgUrl = URL.createObjectURL(file)
      const storageRef = ref(storage, "files/" + file.name)
      // "files"はstorageに作成したフォルダ名
      // Firebaseにデータを適切に送るために必要なコード
      const snapshot = await uploadBytes(storageRef, file)
      console.log("追加画像情報" + snapshot)

      const getUrl = await getDownloadURL(ref(storage, `files/${file.name}`))
      this.imgPath.push(getUrl)
      // postdata.imgPath[i] = imgUrl
      // }
    },
    //画像の表示
    // async filedownload(imgPath) {
    //   const url = await getDownloadURL(ref(storage, imgPath))
    //   return url
    // },
    //投稿を１回読み込む関数 posts.dbRef.id/ref.id
    // async Read() {
    //   const q = query(collection(db, "posts"))
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
    //   console.log("read後")
    //   console.log(this.postArray)
    // },
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
