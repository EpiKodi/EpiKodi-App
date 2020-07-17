<template>
  <v-container fluid fill-height class="my-container">
    <video id="my-video" class="video-js my-video" controls autoplay preload="auto" height="997px" data-setup="{}">
      <source :src="media" type="video/mp4" />
      <!-- <source src="https://epi-kodi.herokuapp.com/file/54190c00d4b543e1a6cefdede2bc91ab?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjZjOTFjNDFhNzRmZjQ2NzQ4ZjFmNGMyNDVhNzdjYjRjIn0.k66IxktjruNDGUE77GFaeRTjlRPVsNM1YleNQ0xZhcs" type="video/mp4" /> -->
    </video>
    <v-row style="position: absolute; margin-top: 10px; margin-left: 10px;">
      <v-btn to="/tab/video" color="#FFF"> <v-icon left>mdi-arrow-left-bold</v-icon> Retour </v-btn>
      <h1 class="video-title">{{ title }}</h1>
    </v-row>
  </v-container>
</template>

<script>
import { remote } from 'electron'

export default {
  components: {
    VuetifyAudio: () => import('vuetify-audio'),
  },
  validate({ params }) {
    // Check if id exist
    return true
  },
  data() {
    return {
      title: this.$route.params.title,
      image: this.$route.params.image,
      media: this.$route.params.media,
    }
  },
  beforeCreate() {
    if (this.$route.params.id != undefined) {
      fetch('https://epi-kodi.herokuapp.com/file/' + this.$route.params.id + '?token=' + this.$store.state.token, {
        method: 'get',
        headers: {
          Authorization: this.$store.state.token,
        },
      }).then(data => {
        console.log(data)
        this.media = data.url
        console.log(this.media)
      })
    }
  },
  methods: {},
  layout: 'player',
}
</script>

<style>
:focus {
  outline: none;
}
body {
  margin: 0 !important;
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  color: #dfdfdf;
  font-size: 16px;
}

.back-btn {
  margin-top: 10px;
  margin-left: 10px;
  flex-direction: row;
}

.my-video {
  margin: auto;
}

.center {
  margin: auto;
  width: 50%;
}

.video-title {
  margin-left: 15px;
  text-align: center;
}

.my-cover {
  margin-bottom: 15px;
  width: 400px;
}
</style>
