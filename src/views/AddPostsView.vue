<template>
  <div class="form__wrapper">
    <textarea
      class="form__textarea"
      v-model="text"
      placeholder="いまどうしてるの？"
    />
    <div class="form__buttons">
      <button v-on:click="Post" class="form__submit-button">投稿</button>
    </div>
  </div>
</template>

<script>
//import { collection, addDoc, getDatabase, ref, set } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "../firebase.js"
export default {
  data() {
    // return {
    //   text: "",
    // }
  },
  methods: {
    //postTweet(userName, postTitle, postContent, imageUrl) {
    Post() {
      //const db = getDatabase()
      const Post = {
        userName: "userNameだよ",
        postTitle: "postTitleだよ",
        postContent: "postContentだよ",
      }
      addDoc(collection(db, "posts"), Post).then((ref) => {
        this.posts.push({
          id: ref.id,
          ...Post,
        })
      })
      // set(ref(db, "users/" + userId), {
      //   username: name,
      //   email: email,
      //   profile_picture: imageUrl,
      // })
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
