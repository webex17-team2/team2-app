<template>
  <h1>詳細</h1>
  <p>ニックネーム</p>
  <p>"userName"</p>
  <p>おすすめの場所</p>
  <p>"postTitle"</p>
  <P>感想や押しポイント</P>
  <p>〜〜〜〜〜〜＾</p>
  <p>画像</p>
  <p>{{ ArrayIndex }}</p>
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
  props: ["ArrayIndex"],
  created() {
    console.log(this.ArrayIndex)
  },
}
</script>
