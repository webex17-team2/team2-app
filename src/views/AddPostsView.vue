<template>
  <div class="wrap">
    <div class="content top">
      <div class="contentsLeft">
        <div class="contents left">
          <div class="text-center__left">
            <h2 class="titleTag_icon">
              <span class="span_text">
                <img
                  src="@/assets/icon/Mogura.png"
                  alt="Logo"
                  class="header__logo"
                />
                必須 </span
              >場所の名前
            </h2>
          </div>
          <div class="text-center__left">
            <h2 class="titleTag_icon">
              <span class="span_text">
                <img
                  src="@/assets/icon/Ari.png"
                  alt="Logo"
                  class="header__logo"
                  width="30px"
                />
                必須 </span
              >感想や推しポイント
            </h2>
          </div>
          <div class="text-center__left1">
            <h2 class="titleTag_icon">
              <span class="span_text">
                <img
                  src="@/assets/icon/tori.png"
                  alt="Logo"
                  class="header__logo"
                />
                必須 </span
              >写真を追加
            </h2>
          </div>
          <div class="text-center__left">
            <h2 class="titleTag_icon">
              <span class="span_text">
                <img
                  src="@/assets/icon/hiyo.png"
                  alt="Logo"
                  class="header__logo"
                />
                必須 </span
              >エリア
            </h2>
          </div>
          <div class="text-center__left">
            <h2 class="titleTag_icon">
              <span class="span_text">
                <img
                  src="@/assets/icon/tentou.png"
                  alt="Logo"
                  class="header__logo"
                />
                必須 </span
              >カテゴリー
            </h2>
          </div>
        </div>
        <div class="contents">
          <div class="text-center">
            <div class="cp_iptxt">
              <input
                class="ef"
                type="text"
                v-model="postTitle"
                placeholder="◯◯公園"
              />
              <label></label>
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
              <label></label>
              <span class="focus_line"><i></i></span>
            </div>
          </div>
          <div class="text-center">
            <input
              type="file"
              class="text-center-input"
              multiple
              @change="fileUpload"
            />
            <!-- アップロードされた画像が以下に表示される -->
            <img v-if="img_url" :src="img_url" />
          </div>
          <div class="text-center">
            <select v-model="selectedArea" class="text-center-select">
              <option
                v-for="Area in optionAreaName"
                v-bind:value="Area.name"
                v-bind:key="Area.id"
              >
                {{ Area.name }}
              </option>
            </select>
          </div>
          <div class="text-center">
            <div class="text-center-radio">
              <input
                type="radio"
                name="radios"
                id="tag1"
                v-model="radioValue"
                value="レジャー"
              />

              <label for="tag1">レジャー</label>

              <input
                type="radio"
                name="radios"
                id="tag2"
                v-model="radioValue"
                value="グルメ"
              />
              <label for="tag2">グルメ</label>
              <input
                type="radio"
                name="radios"
                id="tag3"
                v-model="radioValue"
                value="その他"
              />
              <label for="tag3">その他</label>
            </div>
          </div>
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
              width="250"
              height="250"
            />
          </div>
        </li>
      </ul>
      <div class="buttons-center">
        <div class="form__buttons">
          <button v-on:click="Post" class="form__submit-button">
            <router-link to="/listOfPosts" class="btn btn-primary"
              >投稿</router-link
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setDoc, doc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

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

  methods: {
    // 投稿を追加する関数
    async Post() {
      // もしtextareaが空の状態で投稿ボタンが押されたら、この関数を抜けるという処理
      if (
        this.postTitle === "" &&
        this.postContent === "" &&
        this.imgPath === "" &&
        this.category === "" &&
        this.selectedArea === ""
        // this.radio === ""
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

      console.log(overvieRef)
      this.imgPath = []
    },
    //写真読み込み＋imgPathにURL名を入れる関数 資料(https://qiita.com/ohanawb/items/14dd538007d74e773096)
    async fileUpload(props) {
      console.log(props)
      let file = props.target.files

      //URL作成
      for (let i = 0; i < file.length; i++) {
        this.imgUrl = URL.createObjectURL(file[i])
        //storageのfilesフォルダに入れたデータの名前を指定
        const storageRef = ref(storage, "files/" + file[i].name)

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
  padding: 100px 0 64px;
  background-color: rgba(242, 245, 212, 0.49);
  display: flex;
  flex-flow: column;
  position: absolute;
  top: 0;
  border: solid 18px #a8d7ba;
  z-index: -2;
}
.content {
  width: 95%;
  margin: 0 auto;
  padding: 150px 80px 0px;
  background-color: #fffcf2;

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
  display: flex;
  flex-flow: column;
  margin-top: 100px;
}
.contents left {
  margin-top: -20px;
}
/* 入力側(右) */
.text-center {
  position: relative;
  text-align: center;
  margin-bottom: 10px;
  height: 100px;
  margin-right: 8%;
}
/* タグ側(左) */
.contentsLeft {
  margin-top: 20px;
  margin-bottom: -10px;
  width: 100%;
}
.text-center__left {
  height: 0px;
  text-align: center;
  margin-top: 0px;
  margin-left: 25%;
  margin-bottom: 80px;
}
.text-center__left1 {
  height: 0px;
  text-align: center;
  margin-top: 25px;
  margin-left: 25%;
  margin-bottom: 80px;
}
.text-center textarea {
  margin-top: -65px;
}
.text-center-input {
  margin: -30px 20px;
}
.text-center-select {
  margin: -50px 20px;

  background-color: #fffcf2;
}
.text-center-select {
  width: 150px;
  height: 25px;
  border-radius: 5px;
  /* color: #cd6145; */
}
.text-center-radio {
  margin: -105px 20px;
  width: 90%;
  text-align: left;
}
@keyframes click-wave {
  0% {
    position: relative;
    width: 30px;
    height: 30px;
    opacity: 0.35;
  }
  100% {
    width: 200px;
    height: 200px;
    margin-top: -80px;
    margin-left: -80px;
    opacity: 0;
  }
}
.text-center-radio input {
  position: relative;
  position: relative;
  top: 13.33333px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 30px;
  /* margin-top: -20px; */
  margin-right: 0.5rem;
  cursor: pointer;
  transition: all 0.15s ease-out 0s;
  color: #ffffff;
  border: none;
  outline: none;
  background: #e8c7c4;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 50%;
}

.text-center-radio input:hover {
  background: #ebb4ad;
}
.text-center-radio input:checked {
  background: #ed6a5a;
}
.text-center-radio input:checked::before {
  font-size: 20px;
  line-height: 30px;
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 30px;
  content: "✔";
  text-align: center;
}
.text-center-radio input:checked::after {
  position: relative;
  display: block;
  content: "";
  -webkit-animation: click-wave 0.65s;
  animation: click-wave 0.65s;
  background: #da3c41;
  border-radius: 50%;
}
.text-center-radio label {
  margin-top: 15px;
  margin-left: 0px;
  padding-right: 15px;
  font-size: 18px;
}
.form__submit-button {
  margin-top: -100px;
  margin-left: -50px;
  border: none;
}

.btn {
  background-color: #a8d7ba;
  color: #fff;
  display: inline-block;
  border: none;
}
a {
  color: #fff;
}
a:hover {
  text-decoration: none;
}
/* 全体デザイン変更後↑ */
.form__textarea {
  margin-top: -0px;
  background-color: #319dcb;
  width: 100%;
  height: calc(1.3rem * 3 + 0.5rem * 2);
  padding: 0.5rem;
  line-height: 1.3rem;
  border: none;
  resize: none;
  border-radius: 5px;
}
.form__textarea:focus {
  outline: none;
}
.titleTag_icon {
  font-size: 23px;
  padding-top: 0px;
  padding-left: 130px;
}
h2 {
  position: relative;
  padding-left: 5em;
  font-size: 25px;
  color: #333;
}
.span_text {
  padding-top: 5px;
}
h2 span {
  position: absolute;
  top: 0;
  left: 0;
  padding-right: 1rem;

  padding-left: 15px;
  color: #fff;
  border-radius: 10px;
  background: #a8d7ba;
  font-size: 20px;
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
  border-color: transparent transparent transparent #a8d7ba;
}
.header__logo {
  padding-top: 2px;
  padding-right: 5px;
  /* weight: 30px; */
  height: 30px;
  margin-left: -10px;
}
.buttons-center {
  width: 100%;
  display: flex;
  background-color: #a8d7ba;
}

button :hover {
  background-color: #a8d7ba;
}
.form__buttons {
  margin: auto;
}
/* 氏名記入フォーム */
.cp_iptxt {
  position: relative;
  width: 80%;
  margin: 30px 3%;
}
.cp_iptxt input[type="text"] {
  font: 15px/24px sans-serif;
  box-sizing: border-box;
  width: 100%;
  letter-spacing: 1px;
  padding-left: 4em;
  border-radius: 5px;
}
.cp_iptxt input[type="text"]:focus {
  outline: none;
}
.ef {
  margin-top: -35px;
  padding: 7px 14px 7px 14px;
  transition: 0.4s;
  border: 1px solid #1b2538;
  background: transparent;
}
.ef ~ .focus_line:before,
.ef ~ .focus_line:after {
  position: absolute;
  top: -36px;
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
  font-size: 10px;
  top: -18px;
  left: 0;
  transition: 0.3s;
  color: #ed6a5a;
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
  padding-left: 1em;
}
.cp_iptxt input[type="text"]:focus {
  outline: none;
}
.form__textarea {
  margin-top: -45px;
  padding: 7px 14px;
  transition: 0.4s;
  border: 1px solid #1b2538;
  background: transparent;
}
.form__textarea ~ .focus_line:before,
.form__textarea ~ .focus_line:after {
  position: absolute;
  top: -66px;
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
  /* sss */
}
</style>
