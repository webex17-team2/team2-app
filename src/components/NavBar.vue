<template>
  <div class="nav__bar">
    <div class="head">
      <div class="nav__items">
        <router-link to="/" class="nav__logo nav__link" @click="resetImgSize"
          >GeekTwitter</router-link
        >
        >

        <router-link to="/japan-page" class="nav__item nav__link">
          <img
            class="img img_1"
            :class="{ 'img-hover1': activeImg === 'img_1' }"
            @click="activeImg = 'img_1'"
            src="../assets/Group_2.png"
          />
        </router-link>
        <router-link to="/about" class="nav__item nav__link">
          <img
            class="img img_2"
            :class="{ 'img-hover2': activeImg === 'img_2' }"
            @click="activeImg = 'img_2'"
            src="../assets/Group_15.png"
          />
        </router-link>
        <router-link to="/listOfPosts" class="nav__item nav__link">
          <img
            class="img img_3"
            :class="{ 'img-hover3': activeImg === 'img_3' }"
            @click="activeImg = 'img_3'"
            src="../assets/Group_5.png"
          />
        </router-link>
        <router-link to="/addPostsView" class="nav__item nav__link">
          <img
            class="img img_4"
            :class="{ 'img-hover4': activeImg === 'img_4' }"
            @click="activeImg = 'img_4'"
            src="../assets/Group_4.png"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head {
  position: relative;
  top: 20px;
  text-align: center;
}

.img {
  padding-left: 40px;
  padding-right: 10px;
}

.img_1 {
  width: 260px;
  height: 180px;
  display: inline-block;
}

.img_2 {
  width: 240px;
  height: 180px;
  display: inline-block;
}

.img_3 {
  width: 240px;
  height: 180px;
  display: inline-block;
}

.img_4 {
  width: 230px;
  height: 200px;
  display: inline-block;
}

.img-hover1 {
  width: 270px;
  height: 190px;
  transform: scale(1.09);
  transition: all 0.3s ease-in-out;
  z-index: 2;
}
.img-hover2 {
  width: 250px;
  height: 190px;
  transform: scale(1.09);
  transition: all 0.3s ease-in-out;
  z-index: 2;
}
.img-hover3 {
  width: 250px;
  height: 190px;
  transform: scale(1.09);
  transition: all 0.3s ease-in-out;
  z-index: 2;
}
.img-hover4 {
  width: 240px;
  height: 210px;
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
