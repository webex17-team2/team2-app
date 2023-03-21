import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import MyPageView from "../views/MyPageView.vue"
import ListOfPostsView from "../views/ListOfPostsView.vue"
import AddPostsView from "../views/AddPostsView.vue"
import DetailView from "../components/DetailView.vue"

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
  { path: "/addPostsView", name: "AddPostsView", component: AddPostsView },
  {
    path: "/detailView:index",
    name: "DetailView",
    component: DetailView,
    props: (route) => ({
      // postArray: route.params.postArray,
      // imgPath: route.params.imgPath,
      index: route.params.index,
    }),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
