import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import MyPageView from "../views/MyPageView.vue"
import JapanView from "../views/JapanView.vue"
import ListOfPostsView from "../views/ListOfPostsView.vue"
import AddPostsView from "../views/AddPostsView.vue"
import DetailView from "../components/DetailView.vue"
import CategoryList from "../views/CategoryList.vue"
import AreaListView from "../components/AreaListView.vue"
import JapanMap from "../components/JapanMap.vue"

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
  { path: "/listOfPosts", name: "ListOfPosts", component: ListOfPostsView },
  { path: "/addPostsView", name: "AddPostsView", component: AddPostsView },
  { path: "/japanMap", name: "JapanMap", component: JapanMap },
  {
    path: "/detailView:timestamp",
    name: "DetailView",
    component: DetailView,
    props: (route) => ({
      //postTitle: route.params.postTitle,
      // postTitle: route.params.postTitle,
      //imgPath: route.params.imgPath,
      // index: route.params.index,
      timestamp: route.params.timestamp,
    }),
  },
  {
    path: "/aboutView:choice",
    name: "CategoryList",
    component: CategoryList,
    props: (router) => ({
      choice: router.params.choice,
    }),
  },
  {
    path: "/areaListView:selectedArea",
    name: "AreaListView",
    component: AreaListView,
    props: (route) => ({
      //postTitle: route.params.postTitle,
      // postTitle: route.params.postTitle,
      //imgPath: route.params.imgPath,
      // index: route.params.index,
      selectedArea: route.params.selectedArea,
    }),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
export default router
