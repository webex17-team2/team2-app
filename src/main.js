import { createApp } from "vue"
import App from "./App.vue"
import "./firebase.js" // これを追加
import router from "./router"

createApp(App).use(router).mount("#app")
