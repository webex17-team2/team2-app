import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import MyPageView from "../views/MyPageView.vue"
<<<<<<< HEAD
import JapanView from "../views/JapanView.vue"
=======
import ListOfPostsView from "../views/ListOfPostsView.vue"
import AddPostsView from "../views/AddPostsView.vue"
>>>>>>> 4462685315c0a1f13532b851cf306cae6ab6ac0a

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/my-page",
    name: "MyPage",
    component: MyPageView,
  },
<<<<<<< HEAD
  {
    path: "/japan-page",
    name: "Japan",
    component: JapanView,
  },
=======
  { path: "/listOfPosts", name: "ListOfPosts", component: ListOfPostsView },
  { path: "/addPostsView", name: "AddPostsView", component: AddPostsView },
>>>>>>> 4462685315c0a1f13532b851cf306cae6ab6ac0a
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
