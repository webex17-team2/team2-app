<template>
  <div class="head">
    <div>
      <router-link class="routerLink" to="/" @click="resetImgSize"
        ><h1 class="logo">Hidden Treasure</h1></router-link
      >

      <router-link to="/japan-page">
        <img
          class="img img_1"
          :class="{ 'img-hover1': activeImg === 'img_1' }"
          @click="activeImg = 'img_1'"
          src="../assets/Group_2.png"
        />
      </router-link>
      <router-link to="/about">
        <img
          class="img img_2"
          :class="{ 'img-hover2': activeImg === 'img_2' }"
          @click="activeImg = 'img_2'"
          src="../assets/Group_15.png"
        />
      </router-link>
      <router-link to="/listOfPosts">
        <img
          class="img img_3"
          :class="{ 'img-hover3': activeImg === 'img_3' }"
          @click="activeImg = 'img_3'"
          src="../assets/Group_5.png"
        />
      </router-link>
      <router-link to="/addPostsView">
        <img
          class="img img_4"
          :class="{ 'img-hover4': activeImg === 'img_4' }"
          @click="activeImg = 'img_4'"
          src="../assets/Group_4.png"
        />
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Itim&display=swap");
.head {
  position: relative;
  top: 70px;
  bottom: 60px;
  text-align: center;
}
.routerLink {
  text-decoration: none;
}
h1 {
  font-family: "Itim", cursive;
  margin-top: -20px;
  margin-bottom: 30px;
  font-size: 50px;
  color: #e96241;
  text-decoration: none;
  position: relative;
  transition: transform 0.5s ease-in-out; /*変化のアニメーションを追加*/
}
h1::before {
  display: inline-block;
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 50%;
  background-color: #190b009b;
  transition: width 0.5s ease-in-out; /*変化のアニメーションを追加*/
  transform: translateX(-50%);
}
h1:hover::before {
  display: inline-block;
  width: 30%;
}

.img {
  padding-left: 40px;
  padding-right: 10px;
}

.img_1 {
  width: 250px;
  height: 170px;
  display: inline-block;
}

.img_2 {
  width: 230px;
  height: 170px;
  display: inline-block;
}

.img_3 {
  width: 230px;
  height: 170px;
  display: inline-block;
}

.img_4 {
  width: 230px;
  height: 180px;
  display: inline-block;
}

.img-hover1 {
  width: 260px;
  height: 170px;
  transform: scale(1.09);
  transition: all 0.3s ease-in-out;
  z-index: 2;
}
.img-hover2 {
  width: 240px;
  height: 180px;
  transform: scale(1.09);
  transition: all 0.3s ease-in-out;
  z-index: 2;
}
.img-hover3 {
  width: 240px;
  height: 180px;
  transform: scale(1.09);
  transition: all 0.3s ease-in-out;
  z-index: 2;
}
.img-hover4 {
  width: 240px;
  height: 190px;
  transform: scale(1.09);
  transition: all 0.3s ease-in-out;
  z-index: 2;
}

.head_img {
  text-align: center;
}
</style>

<script>
export default {
  data() {
    return {
      activeImg: "",
    }
  },
  methods: {
    resetImgSize() {
      this.activeImg = ""
    },
  },
}
</script>
