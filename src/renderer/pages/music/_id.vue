<template>
  <v-container fluid fill-height class="my-container">
    <v-btn class="back-btn" to="/tab/music" color="#FFF"> <v-icon left>mdi-arrow-left-bold</v-icon> Retour </v-btn>
    <div class="center">
      <h1 class="music-title">{{title}} - {{author}}</h1>
      <v-img :src="image" class="my-cover center white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="400px" />
      <audio class="my_audio center" controls preload="none">
        <source src="https://www.musiquelibrededroit.com/previews/beadreamer-full-a-preview-mp3.mp3" type="audio/mp3" />
        <!-- <source src="/home/takoo/Music/kurt-vile-pretty-pimpin.mp3" type="audio/mp3" /> -->
      </audio>
    </div>
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
      author: this.$route.params.author,
      image: this.$route.params.image,
    }
  },
  mounted() {
  },
  methods: {},
  layout: 'player',
}
</script>

<style>
body {
  margin: 0 !important;
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  color: #dfdfdf;
  font-size: 16px;
}

.back-btn {
  margin-top: 10px;
  position: absolute;
  margin-left: 10px;
}

.center {
  margin: auto;
  width: 50%;
}

.music-title {
  margin-bottom: 15px;
  text-align: center;
}

.my_audio {
  width: 100%;
}

.my-cover {
  margin-bottom: 15px;
  width: 400px;
}
</style>
