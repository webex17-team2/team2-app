<template>
  <div class="nav__bar">
    <router-link to="/" class="nav__logo nav__link">GeekTwitter</router-link>
    <div class="nav__items">
      <router-link to="/japan-page" class="nav__item nav__link"
        >Map Chose</router-link
      >

      <ul class="menu">
        <li class="menu__single">
          <router-link to="/about" class="nav__item nav__link init-bottom"
            >カテゴリー</router-link
          >
          <ul class="menu__second-level">
            <li><a href="#" v-on:click="first">場所</a></li>
            <li><a href="#" v-on:click="second">飯</a></li>
            <li><a href="#" v-on:click="third">遊び</a></li>
          </ul>
        </li>
      </ul>

      <router-link to="/addPostsView" class="nav__item nav__link">
        投稿追加</router-link
      >
      <router-link to="/listOfPosts" class="nav__item nav__link">
        一覧画面
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    this.empty()
  },
  methods: {
    empty() {
      console.log(this.$router)
    },
    first() {
      // location.reload()
      this.$router.push({
        name: "CategoryList",
        params: {
          choice: "place",
        },
      })
    },
    second() {
      // location.reload()
      this.$router.push({
        name: "CategoryList",
        params: {
          choice: "eat",
        },
      })
    },
    third() {
      // location.reload()
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

/* ドロップダウンメニュー */

.menu {
  position: relative;
  height: 50px;
  margin: 0 auto;
}
.menu > li {
  float: left;
  height: 50px;
  line-height: 50px;
  background: black;
}

.menu > li a {
  display: block;
  color: #fff;
}

.menu > li a:hover {
  color: #999;
}

ul.menu__second-level {
  visibility: hidden;
  opacity: 0;
  z-index: 1;
}
.menu > li:hover {
  background: black;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

.menu__second-level li {
  border-top: 1px solid black;
}

.menu__second-level li a:hover {
  background: black;
}

/* 下矢印 */
.init-bottom:after {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 0 0 0 15px;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* floatクリア */
.menu:before,
.menu:after {
  content: " ";
  display: table;
}

.menu:after {
  clear: both;
}

li.menu__single ul.menu__second-level {
  position: absolute;
  top: 40px;
  width: 100%;
  background: black;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

li.menu__single:hover ul.menu__second-level {
  top: 50px;
  visibility: visible;
  opacity: 1;
}
</style>
