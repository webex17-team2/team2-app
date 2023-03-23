<template>
  <div class="form__wrapper">
    <h2 class="titleTag_icon">
      <span
        ><img
          src="@/assets/logo.png"
          alt="Logo"
          class="header__logo"
        />必須</span
      >場所の名前
    </h2>

    <input type="text" v-model="postTitle" />
    <h2 class="titleTag_icon">
      <span
        ><img
          src="@/assets/logo.png"
          alt="Logo"
          class="header__logo"
        />必須</span
      >感想や推しポイント
    </h2>
    <textarea
      class="form__textarea"
      v-model="postContent"
      placeholder="ここが素敵！"
    />
    <h2 class="titleTag_icon">
      <span
        ><img
          src="@/assets/logo.png"
          alt="Logo"
          class="header__logo"
        />必須</span
      >写真を追加
    </h2>
    <input type="file" multiple @change="fileUpload" />
    <!-- アップロードされた画像が以下に表示される -->
    <img v-if="img_url" :src="img_url" />

    <h2 class="titleTag_icon">
      <span
        ><img
          src="@/assets/logo.png"
          alt="Logo"
          class="header__logo"
        />必須</span
      >エリア
    </h2>
    <input type="radio" id="tag1" v-model="radio" value="place" />
    <label for="good">北海道</label>
    <input type="radio" id="tag2" v-model="radio" value="food" />
    <label for="good">東北</label>
    <input type="radio" id="tag3" v-model="radio" value="eat" />
    <label for="good">関東</label>
    <input type="radio" id="tag1" v-model="radio" value="place" />
    <label for="good">中部</label>
    <input type="radio" id="tag1" v-model="radio" value="place" />
    <label for="good">関西</label>
    <input type="radio" id="tag1" v-model="radio" value="place" />
    <label for="good">中国</label>
    <input type="radio" id="tag1" v-model="radio" value="place" />
    <label for="good">四国</label>
    <input type="radio" id="tag1" v-model="radio" value="place" />
    <label for="good">九州</label>
    <input type="radio" id="tag1" v-model="radio" value="place" />
    <label for="good">沖縄</label>
    <h2 class="titleTag_icon">
      <span
        ><img
          src="@/assets/logo.png"
          alt="Logo"
          class="header__logo"
        />必須</span
      >カテゴリー
    </h2>
    <input type="radio" id="tag1" v-model="radio" value="place" />
    <label for="good">場所</label>
    <input type="radio" id="tag2" v-model="radio" value="food" />
    <label for="good">食べもの</label>
    <input type="radio" id="tag3" v-model="radio" value="eat" />
    <label for="good">遊び</label>

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
  <div class="form__buttons">
    <button v-on:click="Post" class="form__submit-button">
      <router-link to="/listOfPosts" class="nav__item nav__link"
        >投稿</router-link
      >
    </button>
  </div>
</template>

<script>
// s
//import { collection, addDoc } from "firebase/firestore"

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
      //ラジオボタン
      category: "",
    }
  },
  // created() {
  //   //いる？
  //   //postObj
  //   // this.Read()
  // },
  methods: {
    // 投稿を追加する関数
    async Post() {
      // もしtextareaが空の状態で投稿ボタンが押されたら、この関数を抜けるという処理
      if (
        this.postTitle === "" &&
        this.postContent === "" &&
        this.imgPath === ""
        // this.radio === ""
      ) {
        console.log("postTitleが空でした")
        alert("タイトル/写真/感想/は必ず記載してください")
        return
      }
      //投稿内容全てをまとめたPostオブジェクト
      // for (let i = 0; i < postdata.imgPath.length; i++) {
      //   const imgUrl = await getDownloadURL(
      //     ref(storage, `files/${doc.data().imgPath[i]}`)
      //   )
      //   postdata.imgPath[i] = imgUrl
      // }

      // const now = new Date()
      // const Post = {
      //   userName: this.userName,
      //   postTitle: this.postTitle,
      //   postContent: this.postContent,
      //   imgPath: this.imgPath,
      //   timestamp: now.getTime(),
      // }
      //追加
      // await addDoc(collection(db, "posts"), Post)
      // this.imgPath = []
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
        //いらないuserName: this.userName,
        userName: this.userName,
        postTitle: this.postTitle,
        postContent: this.postContent,
        imgPath: this.imgPath,
        timestamp: now.getTime(),
        category: this.radio,
        ID: randomString,
      }
      const overvieRef = doc(db, "posts-test", randomString)
      await setDoc(overvieRef, Post)
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

    //写真読み込み＋imgPathにURL名を入れる関数 資料(https://qiita.com/ohanawb/items/14dd538007d74e773096)
    async fileUpload(props) {
      // let files = []
      // for (let i = 0; i < props.target.files.length; i++) {
      //   files[i] = props.target.files[i]
      //   this.imgPath.push(props.target.files[i].name)
      // }
      console.log(props)
      let file = props.target.files[0]
      // for (let i = 0; i < props.target.files.length; i++) {
      //URL作成
      this.imgUrl = URL.createObjectURL(file)
      //storageのfilesフォルダに入れたデータの名前を指定
      const storageRef = ref(storage, "files/" + file.name)
      // "files"はstorageに作成したフォルダ名
      // Firebaseにデータを適切に送るために必要なコード
      //storageRefでどの場所に入れるのか指定
      //const snapshot = await uploadBytes(storageRef, file)
      //console.log("追加画像情報" + snapshot)
      //storageの中にあるデータを参照してimgPathにURLとして入れる
      await uploadBytes(storageRef, file)
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
h2 {
  position: relative;
  padding-left: 6em;
}

h2 span {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 1rem;
  color: #fff;
  border-radius: 10px;
  background: #319dcb;
}

h2 span i {
  margin-right: 1rem;
}

h2 span:after {
  position: absolute;
  top: calc(50% - 7px);
  right: -11px;
  width: 0;
  height: 0;
  content: "";
  border-width: 7px 0 7px 12px;
  border-style: solid;
  border-color: transparent transparent transparent #319dcb;
}
.header__logo {
  padding-top: 8px;
  /* weight: 30px; */
  height: 30px;
}
</style>
