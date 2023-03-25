<template>
  <div class="nav__bar">
    <div class="head">
      <div class="nav__items">
        <router-link to="/" class="nav__logo nav__link"
          >GeekTwitter</router-link
        >
        <router-link to="/japan-page" class="nav__item nav__link"
          ><img class="img img_1" src="../assets/Group_2.png" />
        </router-link>

        <router-link to="/about" class="nav__item nav__link"
          ><img class="img img_2" src="../assets/Group_15.png" />
        </router-link>

        <router-link to="/listOfPosts" class="nav__item nav__link">
          <img class="img img_3" src="../assets/Group_5.png"
        /></router-link>
        <router-link to="/addPostsView" class="nav__item nav__link">
          <img class="img img_4" src="../assets/Group_4.png" />
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
  padding-left: 30px;
}

.img_1 {
  width: 250px;
  height: 200px;
  display: inline-block;
}

.img_2 {
  width: 230px;
  height: 200px;
  display: inline-block;
}

.img_3 {
  width: 200px;
  height: 200px;
  display: inline-block;
}

.img_4 {
  width: 230px;
  height: 200px;
  display: inline-block;
}

.head_img {
  text-align: center;
}
</style>
