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
      <button v-on:click="Post" class="form__submit-button">投稿</button>
    </div>
    <h3>表示</h3>
    <ul>
      <li v-for="(postObj, postObjs) in postObjs" :key="postObjs">
        {{ postObj.postTitle }},
        <div v-for="(path, index) in postObj.imgPaths" :key="index">
          <img
            v-if="postObj.imgPath !== null"
            v-bind:src="path"
            width="300"
            height="300"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { collection, addDoc, query, getDocs } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "../firebase.js"
export default {
  data() {
    return {
      userName: "",
      postTitle: "",
      postContent: "",
      postObjs: [],
      imgPaths: [],
    }
  },

  created() {
    this.Read()
  },

  methods: {
    // 投稿を追加する関数
    // 変更点：{tomonori_tests} imgPathsの配列化に伴って変えた
    async Post() {
      if (this.postTitle === "" && this.postContent === "") {
        console.log("postTitleが空でした")
        return
      }
      const Post = {
        userName: this.userName,
        postTitle: this.postTitle,
        postContent: this.postContent,
        imgPaths: this.imgPaths,
      }
      await addDoc(collection(db, "posts"), Post)
      this.imgPaths = []
    },

    // 写真読み込み関数 資料(https://qiita.com/ohanawb/items/14dd538007d74e773096)
    async fileUpload(props) {
      // 変更点：{tomonori_tests} 一回しか動いてなかったのを、アップロードしたファイルの枚数分だけ動くように変更
      let files = []
      for (let i = 0; i < props.target.files.length; i++) {
        files[i] = props.target.files[i]
        this.imgPaths.push(props.target.files[i].name)
      }
      for (let i = 0; i < props.target.files.length; i++) {
        this.img_url = URL.createObjectURL(files[i])
        const storageRef = ref(storage, "files/" + files[i].name)
        await uploadBytes(storageRef, files[i]).then((snapshot) => {
          console.log("追加画像情報" + snapshot)
        })
      }
    },

    async Read() {
      const q = query(collection(db, "posts"))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (doc) => {
        if (doc.data().imgPaths !== "") {
          let postdata = doc.data()
          for (let i = 0; i < doc.data().imgPaths.length; i++) {
            const imgUrl = await getDownloadURL(
              ref(storage, `files/${doc.data().imgPaths[i]}`)
            ).then((url) => {
              return url
            })
            postdata.imgPaths[i] = imgUrl
          }
          this.postObjs.push(postdata)
        } else {
          const postdata = doc.data()
          postdata.imgPaths = null
          this.postObjs.push(postdata)
        }
      })
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
