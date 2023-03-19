<template>
  <h1>詳細</h1>
  <p>ニックネーム</p>
  <p>"userName"</p>
  <p>おすすめの場所</p>
  <p>"postTitle"</p>
  <P>感想や押しポイント</P>
  <p>〜〜〜〜〜〜＾</p>
  <p>画像</p>
  <!-- <p>{{ this.$router.params.postTitle }}</p> -->
  <img :src="imgPathContent" />

  <div>{{ index }}</div>
  <img />

  <h2>コメント機能</h2>
  <textarea
    class="form__textarea"
    v-model="postContent"
    placeholder="コメントする"
  ></textarea>
</template>

<script>
export default {
  //ListOfView.vueから受け取り
  props: {
    postTitle: {
      type: String,
      required: true,
    },
    imgPath: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {}
  },
  created() {
    console.log(typeof this.imgPath)
    // const data = this.$router
  },
}
</script>
