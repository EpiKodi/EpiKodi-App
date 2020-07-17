<template>
  <v-layout column>
    <div>
      <h1 class="my-title">Importer une nouvelle vidéo</h1>
    </div>
    <v-container fluid>
      <v-row>
        <v-col style="max-width: 350px;padding: 30px;">
          <v-text-field dark label="Nom de la vidéo" color="white" v-model="first" dense></v-text-field>
          <v-file-input
            prepend-icon="mdi-image"
            dark
            v-model="image"
            accept="image/png, image/jpeg, image/bmp"
            label="Choisissez une couverture"
          ></v-file-input>
          <v-file-input prepend-icon="mdi-camera" dark v-model="video" accept="video/mp4" label="Choisissez une vidéo"></v-file-input>
          <!-- <v-btn @click="test()">test</v-btn> -->
          <v-row>
            <v-btn>Annuler</v-btn>
            <v-btn>Annuler</v-btn>
          </v-row>
        </v-col>
        <v-col>
          <v-img :src="getImgPath()" max-height="500" max-width="700" contain></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { remote } from 'electron'

export default {
  components: {},
  data() {
    return {
      image: '',
    }
  },
  methods: {
    getLink(title, image, media) {
      var replaced = title.split(' ').join('-')
      return { name: 'video-id', params: { title: title, image: image, media: media } }
    },
    test() {
      console.log(this.image)
    },
    getImgPath() {
      if (this.image === undefined) {
        return
      } else {
        return 'file:///' + this.image.path
      }
    },
  },
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

.my-section {
  max-width: 100px;
  margin: 0;
  padding: 0;
}

.nlink:hover {
  text-decoration: underline;
}

.section-title {
  font-size: 14px;
  font-weight: bold;
  height: 24px;
  line-height: 24px;
}

.section-icon {
  color: #dfdfdf !important;
  margin-right: 10px;
}

.my-title {
  font-size: 18px;
  margin-top: 5px;
  flex: 1;
  text-align: center;
}

.my-card-movie {
  width: 130px;
  height: 200px;
  flex: none;
  margin: 10px;
}

.movie-img {
  border: 1px solid #242424;
}
.movie-img:hover {
  border: 1px solid #ecab09;
}

.movie-title {
  font-weight: 500;
  margin-top: 10px;
}

.movie-year {
  margin-top: 5px;
  color: #959693;
}
</style>
