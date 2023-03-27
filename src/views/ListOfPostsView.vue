<template>
  <div class="bar">
    <div class="my-page">
      <!-- <h1>投稿一覧</h1> -->
      <ul class="row">
        <li v-for="(postObj, postObjs) in postArray" :key="postObjs">
          <p>{{ postObj.postTitle }}</p>

          <div class="row_item2">
            <!-- <div v-for="(path, index) in postObj.imgPath" :key="index"> -->
            <img
              v-if="postObj.imgPath !== null"
              v-bind:src="postObj.imgPath[0]"
              width="300"
              height="250"
            />
            <!-- 詳細リンクえお押された時、postArrayの何番目か(index)を取得する -->
          </div>
          <button class="btn btn-primary" @click="routerBtn(postObjs)">
            詳細へ
          </button>
        </li>
      </ul>
      <!-- <li v-for="(postArray, index) in postArray" :key="index">
      {{ postArray.postTitle }}
    </li> -->
    </div>
  </div>
</template>
<script>
import { collection, query, getDocs, orderBy } from "firebase/firestore"
// import { ref, getDownloadURL } from "firebase/storage"
// firebase.js で db として export したものを import
import { db } from "../firebase.js" //const db = getDatabase()
// import DetailView from "../components/DetailView.vue"
export default {
  // components: { DetailView },
  data() {
    return {
      userName: "",
      postTitle: "",
      postContent: "",
      postArray: [],
      imgPath: [],
    }
  },
  async created() {
    //いる？
    //postObj
    this.Read()
    // const a = query(collection(db, "posts"), orderBy("timestamp", "asc"))
    // const querySnapshot = await getDocs(a)
    // querySnapshot
    //   .forEach((doc) => {
    //     this.postArray.unshift({
    //       imgPath: doc.data().imgPath,
    //       postContent: doc.data().postContent,
    //       postTitle: doc.data().postTitle,
    //       timestamp: doc.data().timestamp,
    //       userName: doc.data().userName,
    //     })
    //     console.log("DOC")
    //     console.log(doc)
    //     console.log("Array")
    //     console.log(this.postArray)
    //   })
    //   .then(() => {
    //     this.read()
    //   })
  },
  methods: {
    // async read() {
    //   for (let i = 0; i < 2; i++) {
    //     if (this.postArray[i].imgPath !== "") {
    //       const imgUrl = await getDownloadURL(
    //         ref(storage, `files/${this.postArray[i].imgPath}`)
    //       ).then((url) => {
    //         return url
    //       })
    //       this.postArray[i].imgPath = imgUrl
    //     }
    //   }
    // },
    //画像の表示
    //投稿を１回読み込む関数 posts.dbRef.d/ref.id
    // async Read() {
    //   const q = query(collection(db, "posts"), orderBy("timestamp", "asc"))
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
    //       postdata.timestamp = doc.data().timestamp
    //       this.postArray.unshift(postdata)
    //     } else {
    //       const postdata = doc.data()
    //       postdata.imgPath = null
    //       this.postArray.unshift(postdata)
    //     }
    //   })
    //   console.log("postArrey")
    //   console.log(this.postArray)
    // },
    async Read() {
      //const q = query(collection(db, "posts"), orderBy("timestamp", "asc"))
      const q = query(collection(db, "posts-test"), orderBy("timestamp", "asc"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (doc) => {
        let postdata = doc.data()
        postdata.timestamp = doc.data().timestamp
        this.postArray.unshift(postdata)
        //this.postArray.push(postdata)
      })
    },
    // async Read() {
    //   const q = query(collection(db, "posts"), orderBy("timestamp", "asc"))
    //   const querySnapshot = await getDocs(q)
    //   querySnapshot.forEach((doc) => {
    //     let data = doc.data()
    //     const postData = {
    //       postContent: data.postContent,
    //       postTitle: data.postTitle,
    //       timestamp: data.timestamp,
    //       userName: data.userName,
    //     }
    //     if (data.imgPath !== "") {
    //       for (let i = 0; i < data.imgPath.length; i++) {
    //         const imgUrl = getDownloadURL(
    //           ref(storage, `files/${doc.data().imgPath[i]}`)
    //         ).then((url) => {
    //           return url
    //         })
    //         postData.imgPath = imgUrl
    //         this.postArray.unshift(postData)
    //       }
    //     } else {
    //       postData.imgPath = null
    //       this.postArray.unshift(postData)
    //     }
    //   })
    //   console.log(this.postArray)
    // },
    routerBtn(postObjs) {
      this.$router.push({
        name: "DetailView",
        params: {
          // // postArray: this.postArray[index],
          // postTitle: this.postArray[postObjs].postTitle,
          // // postTitle: this.postArray[postObjs].postTitle,
          // imgPath: this.postArray[postObjs].imgPath[0],
          // index: postObjs,
          // //タイムー>time: this.postArray[postObjs].
          timestamp: this.postArray[postObjs].timestamp,
        },
      })
      console.log("ボタンが押されました")
    },
  },
}
//コミットするために加えました（消していいコメントです)
</script>

<style scoped>
.bar {
  border: solid 18px #a8d7ba;
  position: absolute;
  top: 0;
  z-index: -2;
  background-color: rgba(242, 245, 212, 0.49);
}
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
.my-page {
  padding: 0.5em 1em;
  padding-top: 200px;
  margin: 2em 0;
  font-weight: bold;
  /* border: solid 10px hsl(166, 98%, 55%); */
  border-radius: 10px;
  margin-top: 120px;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  padding: 0px;
}

/* @media screen and (min-width: 480px) {
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
} */

.row p {
  margin-bottom: 50px;
  margin-top: -15px;
  margin-left: center;
  text-align: center;
  font-size: 20px;

  color: #333;
  text-decoration: 4px underline wavy #a8d7ba;
  text-underline-offset: 5px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
}
.row button {
  margin: 30px 0px 0px 220px;
  background-color: #a8d7ba;
  border: #a8d7ba 0.5px solid;
}
li {
  padding: 30px;
  margin: 20px;
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
    background-color: #ffffffc8;
    border: 1px #9a999926 solid;
  }
  20% {
    background-color: #fdfdfd;
    border: 1px #9a9999bf solid;
  }
}
</style>
