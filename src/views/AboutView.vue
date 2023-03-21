<template>
  <div class="app">
    <div v-if="zero" class="num">0</div>
    <div v-if="one" class="num">1</div>
    <div v-if="two" class="num">2</div>
    <div class="container" v-if="seen">
      <div class="box">
        <button v-on:click="first">場所</button>
      </div>
      <div class="box">
        <button v-on:click="second">飯</button>
      </div>
      <div class="box">
        <button v-on:click="third">遊び</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      seen: true,
      zero: false,
      one: false,
      two: false,
    }
  },
  methods: {
    first: function () {
      this.seen = false
      this.zero = true
    },
    second: function () {
      this.seen = false
      this.one = true
    },
    third: function () {
      this.seen = false
      this.two = true
    },
  },
}
</script>

<style>
.app {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  display: flex;
  height: 2em;
  width: 300px;
  padding: 1em;
  justify-content: space-around;
}

.box {
  padding: 20px;
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
</style>
