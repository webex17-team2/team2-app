<template>
  <div class="map" ref="googleMap"></div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader"

export default {
  name: "map-api",
  data() {
    return {
      google: null,
      mapConfig: {
        center: {
          lat: 35.68944,
          lng: 139.69167,
        },
        zoom: 5,
      },
    }
  },
  async mounted() {
    this.google = await GoogleMapsApiLoader({
      apiKey: "AIzaSyDOdM6gUe5vZRsEEuwMe8Iy6GApYrTerxg",
    })
    this.initializeMap()
  },
  methods: {
    initializeMap() {
      new this.google.maps.Map(this.$refs.googleMap, this.mapConfig)
    },
  },
}
</script>

<style scoped>
.map {
  width: 59vw;
  height: 60vh;
  margin: auto;
}
</style>
