<template>
  <div class="app">
    <h2>気になる地域を選んで下さい！</h2>
    <div class="container">
      <!-- <div class="container-one"> -->
      <p>カテゴリーを選んでください。</p>
      <div class="container-one">
        <div class="container-two">
          <div class="box">
            <button class="btn btn-primary" v-on:click="basyo">レジャー</button>
          </div>
          <div class="box">
            <button class="btn btn-primary" v-on:click="mesi">グルメ</button>
          </div>
          <div class="box">
            <button class="btn btn-primary" v-on:click="asobi">その他</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bar">
    <div class="app">
      <h2>気になる地域を選んで下さい！</h2>
      <div class="container-one">カテゴリーを選んでください。</div>
      <div class="container-two">
        <div class="box">
          <button class="btn btn-primary" v-on:click="basyo">場所</button>
        </div>
        <div class="box">
          <button class="btn btn-primary" v-on:click="mesi">飯</button>
        </div>
        <div class="box">
          <button class="btn btn-primary" v-on:click="asobi">遊び</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    basyo() {
      this.$router.push({
        name: "CategoryList",
        params: {
          choice: "レジャー",
        },
      })
    },
    mesi() {
      this.$router.push({
        name: "CategoryList",
        params: {
          choice: "グルメ",
        },
      })
    },
    asobi() {
      this.$router.push({
        name: "CategoryList",
        params: {
          choice: "その他",
        },
      })
    },
  },
}
</script>

<style scoped>
.bar {
  width: 100%;
  height: 100%;
  border: solid 18px #a8d7ba;
  position: absolute;
  top: 0;
  z-index: -2;
  background-color: rgba(242, 245, 212, 0.49);
}
.app {
  display: flex;
  width: 100%;
  height: 500px;
  flex-direction: column;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fffcf2;
  padding: 50px 100px 0px 100px;
  position: absolute;
  top: 280px;
}
.container {
  background-color: #fdfdfd;
  /* display: flex; */
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 300px;
  padding: 0.5em;
  justify-content: space-around;
  align-content: center;

  border-radius: 10px;
  animation-name: color;
  animation-duration: 20s;
  animation-delay: 0s;
  animation-iteration-count: 1;
  text-align: center;
  border: 1px #9a9999bf solid;
}
.container p {
  font-size: 20px;
}
.container-one {
  display: flex;
  text-align: center;
}
.container-two {
  display: flex;
  text-align: center;
}
.box {
  text-align: center;
  margin-top: 20px;
  margin-left: 33%;
}
.box button {
  background-color: #a8d7ba;
  border: #a8d7ba 0.5px solid;
  font-size: 16px;
}
/* .container-two {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 300px;
  padding: 2em;
  justify-content: space-around;
  align-content: center;
  background-color: rgb(196, 196, 196);
  border-radius: 0 0 10px 10px;
  animation-name: color;
  animation-duration: 20s;
  animation-delay: 0s;
  animation-iteration-count: 1;
} */

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

.box {
  padding: 30px;
}

button {
  height: 50px;
  width: 100px;
}

.num {
  color: black;
  font-size: 30px;
  font-weight: bold;
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

h2 {
  padding: 30px;
}
.app h2 {
  color: #333;
}
p {
  padding-top: 30px;
  color: #333;
}
/* ドロップアウトメニュー */
</style>
<!-- push -->
