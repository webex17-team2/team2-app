<template>
  <div class="form__wrapper">
    <textarea
      class="form__textarea"
      v-model="text"
      placeholder="いまどうしてる？"
    />
    <div class="form__buttons">
      <button v-on:click="postTweet" class="form__submit-button">投稿</button>
    </div>
  </div>
</template>

<script>
//import { addDoc } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore"
// firebase.js で db として export したものを import
import { db } from "./firebase"

export default {
  data() {
    return {
      text: "",
    }
  },
  methods: {
    postTweet() {
      addDoc(collection(db, "tweets"), {
        text: "こんにちは、ツイートの本文です。",
      })
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
