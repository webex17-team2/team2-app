import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import MyPageView from "../views/MyPageView.vue"
import ListOfPostsView from "../views/ListOfPostsView.vue"
import AddPostsView from "../views/AddPostsView.vue"

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
  { path: "/listOfPosts", name: "ListOfPosts", component: ListOfPostsView },
  { path: "/addPosts", name: "AddPosts", component: AddPostsView },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
