<template>
  <!-- リスト入れる -->
  <div class="bar">
    <div class="my-page">
      <ul class="sakura">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <router-link to="/about" class="MyRouter" data-replace="⬅︎もどる"
        ><span>⬅︎もどる</span></router-link
      >

      <ul class="row">
        <li v-for="(postObj, postObjs) in postArray" :key="postObjs">
          <p>{{ postObj.postTitle }}</p>
          <div>
            <img
              v-if="postObj.imagePath !== null"
              v-bind:src="postObj.imgPath[0]"
              width="300"
              height="250"
            />
            <!-- 詳細リンクえお押された時、postArrayの何番目か(index)を取得する -->
          </div>
          <button class="btn btn-primary" @click="routerBtn(postObjs)">
            詳細へ
          </button>
          <div class="drop-shaped"></div>
          <div class="ripple"></div>
          <div class="ripple delay1"></div>
          <div class="ripple delay2"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { collection, query, getDocs, where } from "firebase/firestore"
import { db } from "../firebase.js" //const db = getDatabase()
export default {
  data() {
    return {
      userName: "",
      postTitle: "",
      postContent: "",
      postArray: [],
      imgPath: [],
      changeProps: "",
    }
  },
  props: {
    choice: {
      type: String,
      required: true,
    },
  },
  async created() {
    this.Read()
  },
  computed: {
    newProps() {
      return { result: this.$route.params.choice }
    },
  },
  watch: {
    newProps() {
      this.Read()
    },
  },
  methods: {
    async Read() {
      this.postArray = []
      const q = query(
        collection(db, "posts-test"),
        where("category", "==", this.choice)
      )
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (doc) => {
        let postdata = doc.data()
        postdata.timestamp = doc.data().timestamp
        this.postArray.unshift(postdata)
      })
    },
    routerBtn(postObjs) {
      this.$router.push({
        name: "DetailView",
        params: {
          timestamp: this.postArray[postObjs].timestamp,
        },
      })
      console.log("ボタンが押されました")
    },
  },
}
</script>
<style scoped>
.sakura {
  position: absolute;
  padding: 0;
  /* margin: 0; */
  margin-top: -500px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -4;
}

.sakura li {
  width: 50%;
  height: 50px;
  position: absolute;
  list-style: none;
  top: -50px;
  background: #ffdbed;
  border-radius: 0% 70%;
  animation: fall 4s linear infinite, sway 2s ease-in-out infinite alternate;
}

@keyframes fall {
  to {
    top: 120%;
  }
}

@keyframes sway1 {
  from {
    transform: translateX(0px) rotate(0deg);
  }
  to {
    transform: translateX(200px) rotate(-45deg);
  }
}

@keyframes sway2 {
  from {
    transform: translateX(200px) rotate(-45deg);
  }
  to {
    transform: translateX(0px) rotate(0deg);
  }
}

.sakura li:nth-child(1) {
  left: 0%;
  width: 24px;
  height: 15px;
  animation: fall 10s linear infinite, sway1 3s ease-in-out infinite alternate;
  animation-delay: 2s;
}

.sakura li:nth-child(2) {
  left: 5%;
  width: 13px;
  height: 9px;
  animation: fall 15s linear infinite, sway1 2s ease-in-out infinite alternate;
  animation-delay: 8s;
}

.sakura li:nth-child(3) {
  left: 15%;
  width: 16px;
  height: 10px;
  animation: fall 9s linear infinite, sway1 3.5s ease-in-out infinite alternate;
  animation-delay: 13s;
}

.sakura li:nth-child(4) {
  left: 30%;
  width: 16px;
  height: 10px;
  animation: fall 8s linear infinite, sway2 4s ease-in-out infinite alternate;
  animation-delay: 7s;
}
.sakura li:nth-child(5) {
  left: 40%;
  width: 16px;
  height: 10px;
  animation: fall 10s linear infinite, sway1 4s ease-in-out infinite alternate;
  animation-delay: 0s;
}
.sakura li:nth-child(6) {
  left: 55%;
  width: 24px;
  height: 15px;
  animation: fall 11s linear infinite, sway2 3s ease-in-out infinite alternate;
  animation-delay: 3s;
}
.sakura li:nth-child(7) {
  left: 65%;
  width: 16px;
  height: 10px;
  animation: fall 7s linear infinite, sway2 3.5s ease-in-out infinite alternate;
  animation-delay: 7s;
}
.sakura li:nth-child(8) {
  left: 50%;
  width: 13px;
  height: 9px;
  animation: fall 7s linear infinite, sway1 3s ease-in-out infinite alternate;
  animation-delay: 3s;
}
.sakura li:nth-child(9) {
  left: 80%;
  width: 16px;
  height: 10px;
  animation: fall 10s linear infinite, sway2 4s ease-in-out infinite alternate;
  animation-delay: 4s;
}

.sakura li:nth-child(10) {
  left: 100%;
  width: 24px;
  height: 15px;
  animation: fall 10s linear infinite, sway1 3s ease-in-out infinite alternate;
  animation-delay: 1s;
}

.sakura li:nth-child(11) {
  left: 90%;
  width: 13px;
  height: 9px;
  animation: fall 15s linear infinite, sway1 2s ease-in-out infinite alternate;
  animation-delay: 6s;
}

.sakura li:nth-child(12) {
  left: 20%;
  width: 16px;
  height: 10px;
  animation: fall 9s linear infinite, sway1 3.5s ease-in-out infinite alternate;
  animation-delay: 6s;
}

.sakura li:nth-child(13) {
  left: 36%;
  width: 16px;
  height: 10px;
  animation: fall 8s linear infinite, sway2 4s ease-in-out infinite alternate;
  animation-delay: 3s;
}
.sakura li:nth-child(14) {
  left: 45%;
  width: 16px;
  height: 10px;
  animation: fall 10s linear infinite, sway1 4s ease-in-out infinite alternate;
  animation-delay: 10s;
}
.sakura li:nth-child(15) {
  left: 60%;
  width: 24px;
  height: 15px;
  animation: fall 11s linear infinite, sway2 3s ease-in-out infinite alternate;
  animation-delay: 0s;
}
.sakura li:nth-child(16) {
  left: 70%;
  width: 16px;
  height: 10px;
  animation: fall 7s linear infinite, sway2 3.5s ease-in-out infinite alternate;
  animation-delay: 7s;
}
.sakura li:nth-child(17) {
  left: 55%;
  width: 13px;
  height: 9px;
  animation: fall 7s linear infinite, sway1 3s ease-in-out infinite alternate;
  animation-delay: 2s;
}
.sakura li:nth-child(18) {
  left: 85%;
  width: 16px;
  height: 10px;
  animation: fall 10s linear infinite, sway2 4s ease-in-out infinite alternate;
  animation-delay: 8s;
}

.bar {
  width: 100%;
  /* height: 85vw; */
  border: solid 18px #a8d7ba;
  position: absolute;
  top: 0;
  z-index: -4;
  background-color: rgba(242, 245, 212, 0.49);
}
.my-page {
  padding: 0.5em 1em;
  margin: 2em 0;
  font-weight: bold;

  border-radius: 10px;
  margin-top: 340px;
}
.MyRouter {
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
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  padding: 0px;
}
.row p {
  margin-bottom: 50px;
  margin-top: -15px;
  margin-left: center;
  text-align: center;
  font-size: 20px;

  color: #333;
  text-decoration: 2.5px underline wavy #a8d7ba;
  text-underline-offset: 5px;

  font-weight: bold;
}
.row img {
  margin-left: center;
}
.row button {
  margin: 30px 0px 0px 220px;
  background-color: #a8d7ba;
  border: #a8d7ba 0.5px solid;
  font-size: 16px;
}
.row li {
  padding: 30px;
  margin: 20px;
  width: 30%;
  height: 500px;
  text-align: center;
  list-style: none;
  background-color: #fdfdfd;
  /* background-color: rgb(178, 174, 174); */
  border-radius: 10px;
  animation-name: color;
  animation-duration: 20s;
  animation-delay: 0s;
  animation-iteration-count: 1;
  border: 1px #9a9999bf solid;
}
@keyframes color {
  0% {
    background-color: rgba(242, 245, 212, 0.49);
    border: 1px #9a9999bf solid;
  }
  25% {
    background-color: #fdfdfd;
    border: 2px #403f3fbf solid;
  }
}
</style>
