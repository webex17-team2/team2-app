<template>
  <div>
    <img class="home-img" src="../assets/Group_17.jpg" v-show="showHomeImg" />
    <JapanMap v-show="showJapanMap" />
  </div>
</template>
<script>
import JapanMap from "@/components/JapanMap.vue"

export default {
  components: {
    JapanMap,
  },
  data() {
    return {
      showHomeImg: true,
      showJapanMap: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.fadeOut()
    }, 2000)
  },
  methods: {
    fadeOut() {
      const el = document.querySelector(".home-img")
      let opacity = 1
      const timer = setInterval(() => {
        if (opacity <= 0.1) {
          clearInterval(timer)
          this.showHomeImg = false
          this.showJapanMap = true
        }
        el.style.opacity = opacity
        opacity -= opacity * 0.1
      }, 100)
    },
  },
}
</script>
<style scoped>
.home-img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  opacity: 1;
}

.form__wrapper {
  padding: 1rem;
}

.form__textarea {
  width: 100%;
  height: calc(1.3rem * 3 + 0.5rem * 2);
  padding: 0.5rem;
  line-height: 1.3rem;
  border-radius: 5px;
  border: none;
  resize: none;
}

.form__textarea:focus {
  outline: none;
}

.form__buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
