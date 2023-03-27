<template>
  <router-link to="/listOfPosts">⬅︎</router-link>
  <div class="row">
    <div class="post">
      <div>
        <h1>{{ postArray[0].postTitle }}</h1>
      </div>
      <div class="img-com">
        <div class="img_box">
          <div class="img_collection">
            <Carousel
              id="gallery"
              :items-to-show="1"
              :wrap-around="false"
              v-model="currentSlide"
            >
              <Slide
                v-for="(slide, slideId) in postArray[0].imgPath"
                :key="slideId"
              >
                <div class="carousel__item">
                  <img :src="slide" width="400" height="300" />
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
              <Slide
                v-for="(slide, slideId) in postArray[0].imgPath"
                :key="slideId"
              >
                <div class="carousel__item" v-on:click="slideTo(slideId)">
                  <img :src="slide" width="120" height="100" />
                </div>
              </Slide>
            </Carousel>
          </div>
        </div>
        <!-- <div
                    class="img_collection"
                    v-for="(post, postId) in postArray[0].imgPath"
                    :key="postId"
                    >
                    <img :src="post" class="img_content" />
                    </div> -->
        <div class="context">
          <h3>投稿内容</h3>
          <!-- <P>感想や押しポイント</P> -->
          <p>{{ postArray[0].postContent }}</p>
          <!-- 何に使う？ -->
          <!-- <img :src="imgPathContent" /> -->
          <div>#{{ postArray[0].selectedArea }}</div>
          <div>#{{ postArray[0].category }}</div>
        </div>
      </div>
    </div>
    <div class="comment">
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
          <button class="btn btn-primary" v-on:click="Comments">送信</button>
        </div>
      </div>
      <!-- </div> -->
      <div class="top">
        <h3>~みんなのコメント~</h3>
        <div
          v-for="(comment, index) in commentsArray"
          :key="index"
          class="all-comment"
        >
          <!-- ここ -->
          <!-- <p>{{ randamImg }}</p> -->
          <img :src="comment.randamImg" class="randam_icon" />
          <P>{{ comment.commentContent }}</P>
        </div>
      </div>
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
  margin: 0;
  padding: 0;
}
.img_content {
  width: 300px;
  height: 300px;
}
.carousel__track {
  width: 250px;
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

@media screen and (max-width: 480px) {
  h3 {
    height: 42px;
    border: 5px;
    border-color: #f45252;
    background-color: #f45252;
    display: inline-block;
  }
}

/* コメントアイコン*/
.randam_icon {
  /* 画像を丸くする */
  width: 10%;
  height: 10%;
  margin-right: 20px;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}

.post {
  width: 60%;
}

@media screen and (max-width: 480px) {
  .post {
    width: 100%;
  }
}

.comment {
  margin-top: 60px;
  margin-left: -50px;
  padding: 20px;
  width: 40%;
}

textarea {
  width: 70%;
}

.top {
  padding-top: 30px;
}

button {
  position: relative;
  left: 200px;
}

.context {
  padding: 10px;
  margin-top: 20px;
  font-size: 20px;
  border: solid 5px;
  border-radius: 10px;
  display: inline-block;
}

.all-comment {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-around;
  padding: 20px;
  margin: 20px;
  border: solid 2px;
  border-color: black;
  border-radius: 10px;
  width: 70%;
}

@media screen and (max-width: 480px) {
  .all-comment {
    width: 100%;
  }
}
.img-com {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}
</style>
