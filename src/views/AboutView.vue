<template>
  <div class="app">
    <h2>気になる地域を選んで下さい！</h2>
    <p>カテゴリーを選んでください。</p>
    <div class="container">
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
          choice: "place",
        },
      })
    },
    mesi() {
      this.$router.push({
        name: "CategoryList",
        params: {
          choice: "eat",
        },
      })
    },
    asobi() {
      this.$router.push({
        name: "CategoryList",
        params: {
          choice: "play",
        },
      })
    },
  },
}
</script>

<style scoped>
.app {
  display: flex;
  width: 100%;
  height: 500px;
  flex-direction: column;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  padding: 50px 100px 0px 100px;
}

.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 300px;
  padding: 1em;
  justify-content: space-around;
  align-content: center;
  background-color: rgb(196, 196, 196);
  border-radius: 10px;
  animation-name: color;
  animation-duration: 20s;
  animation-delay: 0s;
  animation-iteration-count: 1;
}

@keyframes color {
  0% {
    background-color: #fff;
  }
  100% {
    background-color: #adaaaa;
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

p {
  padding-top: 30px;
}
/* ドロップアウトメニュー */
</style>
<!-- push -->
