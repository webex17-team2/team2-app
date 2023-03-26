<template>
  <div>
    <router-link to="/listOfPosts" class="MyRouter" data-replace="⬅︎もどる"
      ><span>⬅︎もどる</span></router-link
    >
    <h1>{{ postArray[0].postTitle }}</h1>
  </div>
  <div class="img_box">
    <div class="img_collection">
      <Carousel
        id="gallery"
        :items-to-show="1"
        :wrap-around="false"
        v-model="currentSlide"
      >
        <Slide v-for="(slide, slideId) in postArray[0].imgPath" :key="slideId">
          <div class="carousel__item">
            <img :src="slide" width="500" height="400" />
          </div>
        </Slide>
      </Carousel>

      <Carousel
        class="img_collection2"
        id="thumbnails"
        :items-to-show="showNumber"
        :wrap-around="true"
        v-model="currentSlide"
        ref="carousel"
      >
        <Slide v-for="(slide, slideId) in postArray[0].imgPath" :key="slideId">
          <div class="carousel__item" v-on:click="slideTo(slideId)">
            <img :src="slide" width="120" height="100" />
          </div>
        </Slide>
      </Carousel>
    </div>
    <!-- <div
      class="img_collection"
      v-for="(post, postId) in postArray[0].imgPath"
      :key="postId"
    >
      <img :src="post" class="img_content" />
    </div> -->
  </div>
  <!-- <P>感想や押しポイント</P> -->
  <p>{{ postArray[0].postContent }}</p>
  <!-- 何に使う？ -->
  <!-- <img :src="imgPathContent" /> -->
  <div>#{{ postArray[0].selectedArea }}</div>
  <div>#{{ postArray[0].category }}</div>

  <div>
    <h3>コメントを追加する</h3>
    <!-- 入力後消えるようにする -->
    <textarea
      class="form__textarea"
      v-model="commentContent"
      placeholder="コメントする"
      @keydown.enter="Comments"
    ></textarea>
    <div class="form__buttons">
      <button v-on:click="Comments" class="form__submit-button">送信</button>
    </div>
  </div>
  <!-- </div> -->
  <div>
    <h3>~みんなのコメント~</h3>
    <div v-for="(comment, index) in commentsArray" :key="index">
      <!-- ここ -->
      <!-- <p>{{ randamImg }}</p> -->
      <img :src="comment.randamImg" class="randam_icon" />
      <P>{{ comment.commentContent }}</P>
    </div>
  </div>
</template>
<script>
// import { defineComponent } from "vue"
import { Carousel, Slide } from "vue3-carousel"
import "vue3-carousel/dist/carousel.css"
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
  components: {
    Carousel,
    Slide,
    // Navigation,
  },
  //ListOfView.vueから受け取り
  props: {
    timestamp: {
      type: String,
      required: true,
    },
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
      randamImgArray: [
        "https://firebasestorage.googleapis.com/v0/b/team2-app.appspot.com/o/files%2FGroup%206.png?alt=media&token=9e705c0c-6de5-478e-a801-2ddcc6791d4e",
        "https://firebasestorage.googleapis.com/v0/b/team2-app.appspot.com/o/files%2FGroup%2014.png?alt=media&token=892f2331-d0e1-4aaf-b594-0d49244152d2",
        "https://firebasestorage.googleapis.com/v0/b/team2-app.appspot.com/o/files%2FGroup%207.png?alt=media&token=b6078c12-a5a3-4ce3-b048-fb09cb6a17af",
        "https://firebasestorage.googleapis.com/v0/b/team2-app.appspot.com/o/files%2FGroup%208.png?alt=media&token=1207e350-245b-440c-96af-e633904ac703",
        "https://firebasestorage.googleapis.com/v0/b/team2-app.appspot.com/o/files%2FGroup%209.png?alt=media&token=dde866af-0fed-4031-a041-82a8b93a2707",
        "https://firebasestorage.googleapis.com/v0/b/team2-app.appspot.com/o/files%2FGroup%2010.png?alt=media&token=3c2ce598-1ddb-4087-89cb-f788b0e591c6",
        "https://firebasestorage.googleapis.com/v0/b/team2-app.appspot.com/o/files%2FGroup%2013.png?alt=media&token=a1918504-376c-4a01-8153-9e0d40b71342",
        "https://firebasestorage.googleapis.com/v0/b/team2-app.appspot.com/o/files%2FGroup%2012.png?alt=media&token=320465fa-a7b8-42c8-b3f0-360a142b80a3",
        "https://firebasestorage.googleapis.com/v0/b/team2-app.appspot.com/o/files%2FGroup%2011.png?alt=media&token=d0607713-ec55-414d-a86b-7dafc7eeaf8f",
      ],
      randamImg: "",
      commentNumber: 0,
      currentSlide: 0,
      showNumber: 4,
    }
  },
  created() {
    this.Read()
  },
  mounted() {
    this.readComments(this.userID)
    console.log("カーソル")
    console.log(this)
  },
  methods: {
    slideTo(val) {
      this.currentSlide = val
    },
    choose_at_random() {
      console.log("aa")
      console.log(this.commentsArray.length)
      for (let i = 0; i < this.commentsArray.length; i++) {
        var randamImg =
          this.randamImgArray[
            Math.floor(Math.random() * this.randamImgArray.length)
          ]
        console.log("ランダム")
        console.log(randamImg)
        this.commentsArray[i].randamImg = randamImg
      }
      console.log("コメントアレイ")
      console.log(this.commentsArray)
    },
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

      this.commentContent = ""
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
        let commentsData = doc.data()
        commentsData.timestamp = doc.data().timestamp
        this.commentsArray.unshift(commentsData)
        this.commentNumber += 1
      })
      console.log("commentnum", this.commentNumber)
      this.choose_at_random()
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
      console.log(this.postArray)
      this.userID = this.postArray[0].ID
      if (this.postArray[0].imgPath.length < 3) {
        this.showNumber = this.postArray[0].imgPath.length
      }
      // Carousel.id("")

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
.MyRouter {
  margin: 50px 50px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  color: #18272f;
}

.MyRouter::before,
.MyRouter::after {
  content: "";
  position: absolute;
  width: 100%;
  left: 0;
}
.MyRouter::before {
  background-color: #ed6a5a;
  height: 2px;
  bottom: 0;
  transform-origin: 100% 50%;
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
}
.MyRouter::after {
  content: attr(data-replace);
  height: 100%;
  top: 0;
  transform-origin: 100% 50%;
  transform: translate3d(200%, 0, 0);
  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
  color: #54b3d6 2px;
}

.MyRouter:hover::before {
  transform-origin: 0% 50%;
  transform: scaleX(1);
}
.MyRouter:hover::after {
  transform: translate3d(0, 0, 0);
}

.MyRouter span {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
}

.MyRouter:hover span {
  transform: translate3d(-200%, 0, 0);
}

/* Presentational Styles */
body {
  display: grid;
  font-family: "Poppins", sans-serif;
  font-size: 27px;
  line-height: 1.5;
  height: 100vh;
  place-items: center;
}

.MyRouter {
  text-decoration: none;
  color: #18272f;
  font-weight: 700;
  vertical-align: top;
}

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

/* 写真関連 */

/* .img_box {
  border: 2px solid blue;
  display: flex;
  width: 820px;
} *
.img_collection {
  margin: 25px 50px 30px;
  /* border: 2px solid red; */
/* widows: 40%;
  width: 50%;
  height: 0%;
  word-wrap: break-word; */

/* padding: 1.5rem 5rem 0.8rem; */

.img_collection2 {
  margin: 20px 50px 0px 50px;
}
.img_content {
  width: 400px;
  height: 300px;
}
.carousel__track {
  width: 150px;
}
/* タグ型 */
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
  border-radius: 50%;
  background: #fff;
}

/* コメントアイコン*/
.randam_icon {
  /* 画像を丸くする */
  width: 20%;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}

.post {
  padding: 100px;
}

.comment {
  padding: 100px;
}
</style>
