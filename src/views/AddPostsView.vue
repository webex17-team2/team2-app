<template>
  <body class="wrap">
    <div class="content top">
      <div class="contents left">
        <div class="text-center__left">
          <h2 class="titleTag_icon">
            <span>
              <img src="@/assets/logo.png" alt="Logo" class="header__logo" />
              必須 </span
            >場所の名前
          </h2>
        </div>
        <div class="text-center__left">
          <h2 class="titleTag_icon">
            <span>
              <img src="@/assets/logo.png" alt="Logo" class="header__logo" />
              必須 </span
            >感想や推しポイント
          </h2>
        </div>
        <div class="text-center__left">
          <h2 class="titleTag_icon">
            <span>
              <img src="@/assets/logo.png" alt="Logo" class="header__logo" />
              必須 </span
            >写真を追加
          </h2>
        </div>
        <div class="text-center__left">
          <h2 class="titleTag_icon">
            <span>
              <img src="@/assets/logo.png" alt="Logo" class="header__logo" />
              必須 </span
            >エリア
          </h2>
        </div>
        <div class="text-center__left">
          <h2 class="titleTag_icon">
            <span>
              <img src="@/assets/logo.png" alt="Logo" class="header__logo" />
              必須 </span
            >カテゴリー
          </h2>
        </div>
      </div>
      <div class="contents">
        <div class="text-center">
          <div class="cp_iptxt">
            <input class="ef" type="text" v-model="postTitle" placeholder="" />
            <label>お名前</label>
            <span class="focus_line"><i></i></span>
          </div>
        </div>
        <div class="text-center">
          <div class="cp_iptxt">
            <textarea
              class="form__textarea"
              type="text"
              v-model="postContent"
              placeholder="ここが素敵！"
            />
            <label>お名前</label>
            <span class="focus_line"><i></i></span>
          </div>
        </div>
        <div class="text-center">
          <input type="file" multiple @change="fileUpload" />
          <!-- アップロードされた画像が以下に表示される -->
          <img v-if="img_url" :src="img_url" />
        </div>
        <select v-model="selectedArea">
          <option
            v-for="Area in optionAreaName"
            v-bind:value="Area.name"
            v-bind:key="Area.id"
          >
            {{ Area.name }}
          </option>
        </select>
        <div class="text-center">
          <input type="radio" id="tag1" v-model="radioValue" value="レジャー" />
          <label for="good">レジャー</label>
          <input type="radio" id="tag2" v-model="radioValue" value="グルメ" />
          <label for="good">グルメ</label>
          <input type="radio" id="tag3" v-model="radiValue" value="その他" />
          <label for="good">その他</label>
        </div>
      </div>
    </div>
    <div class="content bottom">
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
      <div class="buttons-center">
        <div class="form__buttons">
          <button v-on:click="Post" class="form__submit-button">
            <router-link to="/listOfPosts" class="nav__item nav__link"
              >投稿</router-link
            >
          </button>
        </div>
      </div>
    </div>
  </body>
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
      selectedArea: "",
      optionAreaName: [
        { id: 1, name: "北海道" },
        { id: 2, name: "東北" },
        { id: 3, name: "関東" },
        { id: 4, name: "中部" },
        { id: 5, name: "関西" },
        { id: 6, name: "中国" },
        { id: 7, name: "四国" },
        { id: 8, name: "九州" },
        { id: 9, name: "沖縄" },
      ],
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
        category: this.radioValue,
        ID: randomString,
        selectedArea: this.selectedArea,
      }
      const overvieRef = doc(db, "posts-test", randomString)
      await setDoc(overvieRef, Post)
      // サブコレクションを作成
      // const postCommentsRef = doc(
      //   db,
      //   "posts-test",
      //   randomString,
      //   "postContent",
      //   randomString
      // )
      // //今後消す
      //  await setDoc(postCommentsRef, { name: "kuji" })
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
      let file = props.target.files
      // for (let i = 0; i < props.target.files.length; i++) {
      //URL作成
      for (let i = 0; i < file.length; i++) {
        this.imgUrl = URL.createObjectURL(file[i])
        //storageのfilesフォルダに入れたデータの名前を指定
        const storageRef = ref(storage, "files/" + file[i].name)
        // "files"はstorageに作成したフォルダ名
        // Firebaseにデータを適切に送るために必要なコード
        //storageRefでどの場所に入れるのか指定
        //const snapshot = await uploadBytes(storageRef, file)
        //console.log("追加画像情報" + snapshot)
        //storageの中にあるデータを参照してimgPathにURLとして入れる
        await uploadBytes(storageRef, file[i])
        const getUrl = await getDownloadURL(
          ref(storage, `files/${file[i].name}`)
        )
        this.imgPath.push(getUrl)
      }
      console.log(this.imgPath)
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  float: left;
}
.wrap {
  width: 100%;
  height: 100vh;
  padding: 32px 0 64px;
  background-color: #a8d7ba;
  display: flex;
  flex-flow: column;
}
.content {
  width: 95%;
  margin: 0 auto;
  padding: 150px 80px 0px;
  background-color: #fff;
  float: left;
}
.top {
  border-radius: 10px 10px 0px 0px;
}
.bottom {
  width: 95%;
  height: 0px;
  padding: 0;
  border-radius: 0px 0px 10px 10px;
}
.contents {
  width: 50%;
  float: left;
  background-color: #fffdf6;
  display: flex;
  flex-flow: column;
}
.text-center {
  text-align: center;
  margin-bottom: 50px;
}
.text-center__left {
  text-align: center;
  margin-bottom: 100px;
}
a {
  color: #3f82a8;
}
a:hover {
  text-decoration: none;
}
/* 全体デザイン変更後↑ */
.form__textarea {
  background-color: #319dcb;
  width: 100%;
  height: calc(1.3rem * 3 + 0.5rem * 2);
  padding: 0.5rem;
  line-height: 1.3rem;
  border: none;
  resize: none;
}
.form__textarea:focus {
  outline: none;
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
.buttons-center {
  width: 100%;
  display: flex;
  background-color: #a8d7ba;
}
.form__buttons {
  margin: auto;
}
/* 氏名記入フォーム */
.cp_iptxt {
  position: relative;
  width: 80%;
  margin: 40px 3%;
}
.cp_iptxt input[type="text"] {
  font: 15px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  letter-spacing: 1px;
  padding-left: 4em;
}
.cp_iptxt input[type="text"]:focus {
  outline: none;
}
.ef {
  padding: 7px 14px;
  transition: 0.4s;
  border: 1px solid #1b2538;
  background: transparent;
}
.ef ~ .focus_line:before,
.ef ~ .focus_line:after {
  position: absolute;
  top: -1px;
  left: 50%;
  width: 0;
  height: 2px;
  content: "";
  transition: 0.4s;
  background-color: #da3c41;
}
.ef ~ .focus_line:after {
  top: auto;
  bottom: 0;
}
.ef ~ .focus_line i:before,
.ef ~ .focus_line i:after {
  position: absolute;
  top: 50%;
  left: 0;
  width: 2px;
  height: 0;
  content: "";
  transition: 0.6s;
  background-color: #da3c41;
}
.ef ~ .focus_line i:after {
  right: 0;
  left: auto;
}
.ef:focus ~ .focus_line:before,
.ef:focus ~ .focus_line:after,
.cp_iptxt.ef ~ .focus_line:before,
.cp_iptxt.ef ~ .focus_line:after {
  left: 0;
  width: 100%;
  transition: 0.4s;
}
.ef:focus ~ .focus_line i:before,
.ef:focus ~ .focus_line i:after,
.cp_iptxt.ef ~ .focus_line i:before,
.cp_iptxt.ef ~ .focus_line i:after {
  top: -1px;
  height: 100%;
  transition: 0.6s;
}
.ef ~ label {
  position: absolute;
  z-index: -1;
  top: 10px;
  left: 14px;
  width: 100%;
  transition: 0.3s;
  letter-spacing: 0.5px;
  color: #aaaaaa;
}
.ef:focus ~ label,
.cp_iptxt.ef ~ label {
  font-size: 12px;
  top: -18px;
  left: 0;
  transition: 0.3s;
  color: #da3c41;
}
/* 記入フォーム用デザイン */
.cp_iptxt {
  position: relative;
  width: 80%;
  margin: 40px 3%;
}
.cp_iptxt input[type="text"] {
  font: 15px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  letter-spacing: 1px;
  padding-left: 4em;
}
.cp_iptxt input[type="text"]:focus {
  outline: none;
}
.form__textarea {
  padding: 7px 14px;
  transition: 0.4s;
  border: 1px solid #1b2538;
  background: transparent;
}
.form__textarea ~ .focus_line:before,
.form__textarea ~ .focus_line:after {
  position: absolute;
  top: -1px;
  left: 50%;
  width: 0;
  height: 2px;
  content: "";
  transition: 0.4s;
  background-color: #da3c41;
}
.form__textarea ~ .focus_line:after {
  top: auto;
  bottom: 0;
}
.form__textarea ~ .focus_line i:before,
.form__textarea ~ .focus_line i:after {
  position: absolute;
  top: 50%;
  left: 0;
  width: 2px;
  height: 0;
  content: "";
  transition: 0.6s;
  background-color: #da3c41;
}
.form__textarea ~ .focus_line i:after {
  right: 0;
  left: auto;
}
.form__textarea:focus ~ .focus_line:before,
.form__textarea:focus ~ .focus_line:after,
.cp_iptxt.form__textarea ~ .focus_line:before,
.cp_iptxt.form__textarea ~ .focus_line:after {
  left: 0;
  width: 100%;
  transition: 0.4s;
}
.form__textarea:focus ~ .focus_line i:before,
.form__textarea:focus ~ .focus_line i:after,
.cp_iptxt.ef ~ .focus_line i:before,
.cp_iptxt.ef ~ .focus_line i:after {
  top: -1px;
  height: 100%;
  transition: 0.6s;
}
.form__textarea ~ label {
  position: absolute;
  z-index: -1;
  top: 10px;
  left: 14px;
  width: 100%;
  transition: 0.3s;
  letter-spacing: 0.5px;
  color: #aaaaaa;
}
.form__textarea:focus ~ label,
.cp_iptxt.form__textarea ~ label {
  font-size: 12px;
  top: -18px;
  left: 0;
  transition: 0.3s;
  color: #da3c41;
}
</style>
