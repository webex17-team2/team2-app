<template>
  <div class="nav__bar">
    <router-link to="/" class="nav__logo nav__link">GeekTwitter</router-link>
    <div class="nav__items">
      <router-link to="/about" class="nav__item nav__link">Map</router-link>
      <router-link to="/my-page" class="nav__item nav__link">
        MyPage
      </router-link>
<<<<<<< HEAD
      <router-link to="/japan-page" class="nav__item nav__link"
        >Map Chose</router-link
=======
      <router-link to="/listOfPosts" class="nav__item nav__link">
        一覧画面</router-link
      >
      <router-link to="/addPostsView" class="nav__item nav__link">
        投稿追加</router-link
>>>>>>> 4462685315c0a1f13532b851cf306cae6ab6ac0a
      >
    </div>
  </div>
</template>

<style scoped>
.nav__bar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: black;
}
.nav__link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #eee;
  text-decoration: none;
}
.nav__link:visited {
  color: #eee;
}
.nav__link:hover {
  font-weight: bold;
  color: #fff;
}
.nav__logo {
  width: 130px;
}
.nav__items {
  display: flex;
}
.nav__item {
  width: 100px;
  border-left: 1px solid #eee;
}
</style>
