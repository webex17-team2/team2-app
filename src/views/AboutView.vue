<template>
  <div class="app">
    <div class="container">
      <!-- <div v-if="zero" class="num">0</div>
    <div v-if="one" class="num">1</div>
    <div v-if="two" class="num">2</div> -->
      <!-- <div class="container" v-if="seen"> -->
      <div class="box">
        <button v-on:click="first">レジャー</button>
      </div>
      <div class="box">
        <button v-on:click="second">グルメ</button>
      </div>
      <div class="box">
        <button v-on:click="third">その他</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //ラジオボタン ??
      //category: "",
      // seen: true,
      // zero: false,
      // one: false,
      // two: false,
    }
  },
  methods: {
    // first: function () {
    //   this.seen = false
    //   this.zero = true
    // },
    // second: function () {
    //   this.seen = false
    //   this.one = true
    // },
    // third: function () {
    //   this.seen = false
    //   this.two = true
    // },
    // ボタン押す→遷移＋値渡し(buttonのID)→firebaseのcategory==IDのものを表示
    first() {
      this.$router.push({
        name: "CategoryList",
        params: {
          choice: "place",
        },
      })
    },
    second() {
      this.$router.push({
        name: "CategoryList",
        params: {
          choice: "eat",
        },
      })
    },
    third() {
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
  width: 90%;
  height: 300px;
  padding: 1em;
  justify-content: space-around;
  background-color: aquamarine;
}

.box {
  padding: 100px 20px;
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
</style>
<!-- push -->
