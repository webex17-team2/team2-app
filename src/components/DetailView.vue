<template>
  <!-- <div class="Detail_title"> -->
  <h1>{{ postArray[0].postTitle }}</h1>
  <div class="img_box">
    <div
      class="img_collection"
      v-for="(post, postId) in postArray[0].imgPath"
      :key="postId"
    >
      <img :src="this.postArray[0].imgPath" class="img_content" />
    </div>
  </div>
  <!-- <P>感想や押しポイント</P> -->
  <p>{{ postArray[0].postContent }}</p>
  <!-- 何に使う？ -->
  <!-- <img :src="imgPathContent" /> -->
  <div>#{{ postArray[0].selectedArea }}</div>
  <div>#{{ postArray[0].category }}</div>

  <div>
    <h3>コメントを追加する</h3>
    <textarea
      class="form__textarea"
      v-model="commentContent"
      placeholder="コメントする"
    ></textarea>
    <div class="form__buttons">
      <button v-on:click="Comments" class="form__submit-button">送信</button>
    </div>
  </div>
  <!-- </div> -->
  <div>
    <h3>~みんなのコメント~</h3>
    <div v-for="(comment, index) in commentsArray" :key="index">
      <!-- <img class="randam_icon" /> -->
      <P>{{ comment.commentContent }}</P>
    </div>
  </div>
</template>
<script>
//import { collection, query, getDocs, where } from "firebase/firestore"
import {
  collection,
  query,
  getDocs,
  where,
  setDoc,
  doc,
  orderBy,
} from "firebase/firestore"
// import { ref, getDownloadURL } from "firebase/storage"
// import { db, storage } from "../firebase.js"
import { db } from "../firebase.js"
export default {
  //ListOfView.vueから受け取り
  props: {
    // postTitle: {
    //   type: String,
    //   required: true,
    // },
    // imgPath: {
    //   // type: String,
    //   type: Array,
    //   required: true,
    // },
    timestamp: {
      // type: String,
      type: String,
      required: true,
    },
    // index: {
    //   type: Number,
    //   required: true,
    // },
  },
  data() {
    return {
      userName: "",
      postTitle: "",
      postContent: "",
      postArray: [],
      imgPaths: [],
      imgPathContent: "",
      commentContent: "",
      commentsArray: [],
      userID: "",
    }
  },
  created() {
    this.Read()
    // const ID = this.postArray

    // console.log(ID)
    // const timestamp = this.timestamp
    // const list =
    // const data = this.$router
    // const nameQuery = query(citiesRef, where("タイムスタンプ", "==", "受け取った値"));
    //
  },
  mounted() {
    console.log("確認２")
    console.log(this.userID)
    this.readComments(this.userID)
  },
  methods: {
    // コメント追加機能
    async Comments() {
      if (this.commentContent === "") {
        console.log("コメントが空です")
        alert("コメントを入力してください")
        return
      }
      const now = new Date()
      const Comments = {
        commentContent: this.commentContent,
        timestamp: now.getTime(),
      }

      var randomID = String(this.generateRandomString(20))
      //IDを変数に入れる
      const randomString = this.postArray[0].ID
      const postCommentsRef = doc(
        db,
        "posts-test",
        randomString,
        "postContent",
        randomID
      )

      await setDoc(postCommentsRef, Comments)
      this.readComments(randomString)
    },
    //コメント(サブコレクション)だけを読み込む関数
    async readComments(randomString) {
      this.commentsArray = []
      const querySnapshot = await getDocs(
        query(
          collection(db, "posts-test", randomString, "postContent"),
          orderBy("timestamp", "desc")
        )
      )
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data())
        let commentsData = doc.data()
        commentsData.timestamp = doc.data().timestamp
        this.commentsArray.unshift(commentsData)
      })
    },
    generateRandomString(length) {
      var result = ""
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        )
      }
      return result
    },
    //   const overvieRef
    //   await setDoc()
    //   await addDoc(collection(db, "posts", cid1, "comments"), Coments)
    // },
    //投稿読み込み機能
    async Read() {
      // const timeQuery = query(
      const timestamp = Number(this.timestamp)
      const q = query(
        collection(db, "posts-test"),
        where("timestamp", "==", timestamp)
      )
      //const querySnapshot = await getDocs(timeQuery)
      //querySnapshot.forEach(async (doc) => {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        this.postArray.push(doc.data())
      })
      console.log("Array")
      // console.log(imgs)
      console.log("aaaaaaa")
      console.log(this.postArray)
      console.log(this.postArray)
      this.userID = this.postArray[0].ID
      console.log("確認")
      console.log(this.postArray[0].ID)
      //console.log(doc.id, " => ", doc.data())
      // //カテゴリーを日本語に変換
      // if (this.postArray[0].category == "eat") {
      //   const JpCategory = "食べもの"
      //   console.log(JpCategory)
      // } else if (this.postArray[0].category == "place") {
      //   const JpCategory = "場所"
      //   console.log(JpCategory)
      // } else if (this.postArray[0].category == "play") {
      //   const JpCategory = "自然"
      //   console.log(JpCategory)
      // }
      // console.log("日本語")
      // console.log(this.postArray[0].category)
    },
  },
}
</script>
<style scoped>
h1 {
  position: relative;
  padding: 1.5rem 5rem 0.8rem;
  font-size: 25px;
  display: inline-block;
}

h1:after {
  position: absolute;
  bottom: 0;
  left: 20%;
  width: 60%;
  height: 10px;
  content: "";
  background-image: -webkit-repeating-linear-gradient(
    135deg,
    #f45252,
    #f45252 2px,
    transparent 2px,
    transparent 5px
  );
  background-image: repeating-linear-gradient(
    -45deg,
    #f45252,
    #f45252 2px,
    transparent 2px,
    transparent 5px
  );
  background-size: 7px 7px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.img_box {
  border: 2px solid blue;
  display: flex;
  width: 820px;
}
.img_collection {
  border: 2px solid red;
  widows: 40%;
  height: 30%;
  word-wrap: break-word;

  /* padding: 1.5rem 5rem 0.8rem; */
}
.img_content {
  width: 400px;
  height: 300px;
}
h3 {
  font-size: 15px;
  position: relative;
  display: inline-block;
  height: 32px;
  margin-left: 15px;
  padding: 0.3rem 1.5rem 1rem 1.5rem;
  color: #fff;
  background: #fa4141;
}

h3:before {
  position: absolute;
  top: 0;
  left: -15px;
  content: "";
  border-width: 16px 15px 16px 0;
  border-style: solid;
  border-color: transparent #fa4141 transparent transparent;
}

h3:after {
  position: absolute;
  top: calc(60% - 7px);
  left: -5px;
  width: 7px;
  height: 7px;
  content: "";
  border-rasdius: 50%;
  background: #fff;
}
.randam_icon {
  /* 画像を丸くする */
}
</style>
