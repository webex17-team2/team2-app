import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import MyPageView from "../views/MyPageView.vue"
import JapanView from "../views/JapanView.vue"

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
  {
    path: "/japan-page",
    name: "Japan",
    component: JapanView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
