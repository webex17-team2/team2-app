<template>
  <div class="all">
    <div class="title"><h1>エリアを選んでね！</h1></div>

    <div class="Japan">
      <img src="../assets/Japan.png" />
      <div @mouseover="oneOver" @mouseleave="oneLeave" class="box-1">
        <img v-if="hoverFlag_1" class="pin-1" src="../assets/flag-1.png" />
      </div>
      <div @mouseover="twoOver" @mouseleave="twoLeave" class="box-2">
        <img v-if="hoverFlag_2" class="pin-2" src="../assets/flag-2.png" />
      </div>
      <div @mouseover="threeOver" @mouseleave="threeLeave" class="box-3">
        <img v-if="hoverFlag_3" class="pin-3" src="../assets/flag-3.png" />
      </div>
      <div @mouseover="fourOver" @mouseleave="fourLeave" class="box-4">
        <img v-if="hoverFlag_4" class="pin-4" src="../assets/flag-4.png" />
      </div>
      <div @mouseover="fiveOver" @mouseleave="fiveLeave" class="box-5">
        <img v-if="hoverFlag_5" class="pin-5" src="../assets/flag-5.png" />
      </div>
      <div @mouseover="sixOver" @mouseleave="sixLeave" class="box-6">
        <img v-if="hoverFlag_6" class="pin-6" src="../assets/flag-6.png" />
      </div>
      <div @mouseover="sevenOver" @mouseleave="sevenLeave" class="box-7">
        <img v-if="hoverFlag_7" class="pin-7" src="../assets/flag-7.png" />
      </div>
      <div @mouseover="eightOver" @mouseleave="eightLeave" class="box-8">
        <img v-if="hoverFlag_8" class="pin-8" src="../assets/flag-8.png" />
      </div>
      <div @mouseover="nineOver" @mouseleave="nineLeave" class="box-9">
        <img v-if="hoverFlag_9" class="pin-9" src="../assets/flag-9.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hoverFlag_1: false,
      hoverFlag_2: false,
      hoverFlag_3: false,
      hoverFlag_4: false,
      hoverFlag_5: false,
      hoverFlag_6: false,
      hoverFlag_7: false,
      hoverFlag_8: false,
      hoverFlag_9: false,
    }
  },
  methods: {
    oneOver() {
      this.hoverFlag_1 = true
    },
    oneLeave() {
      this.hoverFlag_1 = false
    },
    twoOver() {
      this.hoverFlag_2 = true
    },
    twoLeave() {
      this.hoverFlag_2 = false
    },
    threeOver() {
      this.hoverFlag_3 = true
    },
    threeLeave() {
      this.hoverFlag_3 = false
    },
    fourOver() {
      this.hoverFlag_4 = true
    },
    fourLeave() {
      this.hoverFlag_4 = false
    },
    fiveOver() {
      this.hoverFlag_5 = true
    },
    fiveLeave() {
      this.hoverFlag_5 = false
    },
    sixOver() {
      this.hoverFlag_6 = true
    },
    sixLeave() {
      this.hoverFlag_6 = false
    },
    sevenOver() {
      this.hoverFlag_7 = true
    },
    sevenLeave() {
      this.hoverFlag_7 = false
    },
    eightOver() {
      this.hoverFlag_8 = true
    },
    eightLeave() {
      this.hoverFlag_8 = false
    },
    nineOver() {
      this.hoverFlag_9 = true
    },
    nineLeave() {
      this.hoverFlag_9 = false
    },
  },
}
</script>
<style>
.all {
  margin-top: 6px;
  width: 100%;
  position: relative;
  background-color: beige;
}
.title {
  display: inline-block;
  margin-left: 45%;
  border: 1px solid black;
  border-radius: 10%;
}
img {
  width: 570px;
  height: 700px;
}
.Japan {
  margin-top: 8%;
  position: absolute;
  left: 33%;
  top: 5%;
}

.box-1 {
  width: 190px;
  height: 180px;
  border-radius: 50%;
  background-color: rgba(226, 16, 16, 0);
  position: absolute;
  left: 23em;
  top: 0.5em;
}
.pin-1 {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 40px;
  left: 40%;
}

.box-2 {
  width: 80px;
  height: 190px;
  background-color: rgba(16, 65, 226, 0);
  border-radius: 50%;
  position: absolute;
  left: 23.5em;
  top: 13em;
}
.pin-2 {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 55px;
  left: 34px;
}
.box-3 {
  width: 75px;
  height: 75px;
  background-color: rgba(226, 100, 16, 0);
  border-radius: 50%;
  position: absolute;
  left: 23em;
  top: 25em;
}

.pin-3 {
  width: 60px;
  height: 60px;
  position: absolute;
  top: -5px;
  left: 34px;
}
.box-4 {
  width: 120px;
  height: 120px;
  background-color: rgba(100, 16, 226, 0);
  border-radius: 50%;
  position: absolute;
  left: 16em;
  top: 25em;
}
.pin-4 {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 20px;
  left: 44%;
}
.box-5 {
  width: 100px;
  height: 100px;
  background-color: rgba(16, 226, 152, 0);
  border-radius: 60%;
  position: absolute;
  left: 12em;
  top: 30em;
}
.pin-5 {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0px;
  left: 45%;
}
.box-6 {
  width: 150px;
  height: 50px;
  background-color: rgba(131, 226, 16, 0);
  transform: rotate(-27deg);
  border-radius: 50%;
  position: absolute;
  left: 3.2em;
  top: 31.5em;
}
.pin-6 {
  width: 60px;
  height: 60px;
  transform: rotate(20deg);
  position: absolute;
  top: -17px;
  left: 57%;
}
.box-7 {
  width: 110px;
  height: 42px;
  background-color: rgba(226, 16, 58, 0);
  transform: rotate(-27deg);
  border-radius: 50%;
  position: absolute;
  left: 6.3em;
  top: 35em;
}
.pin-7 {
  width: 50px;
  height: 50px;
  transform: rotate(10deg);
  position: absolute;
  top: -17px;
  left: 50%;
}
.box-8 {
  width: 90px;
  height: 130px;
  background-color: rgba(255, 0, 221, 0);
  border-radius: 50%;
  position: absolute;
  left: 0.4em;
  top: 36em;
}
.pin-8 {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 10px;
  left: 39px;
}
.box-9 {
  width: 110px;
  height: 110px;
  background-color: rgba(249, 164, 6, 0);
  border-radius: 50%;
  position: absolute;
  left: 29em;
  top: 36em;
}
.pin-9 {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 6px;
  left: 45px;
}
</style>
