<template>
  <v-layout column>
    <div v-if="import_mode === false">
      <div>
        <h1 class="my-title">Vidéos</h1>
      </div>
      <v-container fluid>
        <v-row style="margin:0 5px;justify-content: space-between;display: flex;">
          <v-row class="my-section">
            <v-icon class="section-icon">mdi-folder</v-icon>
            <span class="section-title">LOCAL</span>
          </v-row>
          <v-row class="my-section">
            <div @click="switchMode()" style="text-decoration: none; color: inherit;">
              <span class="section-title nlink">AJOUTER</span>
              <v-icon class="section-icon" style="margin-top: -3px">mdi-plus</v-icon>
            </div>
          </v-row>
        </v-row>
        <v-row dense style="min-height: 300px;">
          <v-layout column class="my-card-movie" v-for="card in cards" :key="card.title">
            <v-card hover :to="getLink(card.title, card.image, card.media)">
              <v-img :src="card.image" class="movie-img white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" />
            </v-card>
            <span class="movie-title">{{ card.title }}</span>
            <v-btn style="margin-top: 15px" outlined small dark text color="indigo" @click="rmLocal(card.title)">
              Supprimer
            </v-btn>
          </v-layout>
        </v-row>
        <v-row style="margin:0 5px;justify-content: space-between;display: flex;">
          <v-row class="my-section">
            <v-icon class="section-icon">mdi-cloud</v-icon>
            <span class="section-title">UPLOAD</span>
          </v-row>
          <v-row class="my-section">
            <n-link to="/tab/upload" style="text-decoration: none; color: inherit;">
              <span class="section-title nlink">AJOUTER</span>
              <v-icon class="section-icon" style="margin-top: -3px">mdi-plus</v-icon>
            </n-link>
          </v-row>
        </v-row>
        <v-row dense style="min-height: 275px;">
          <v-layout column class="my-card-movie" v-for="file in uploads" :key="file.id">
            <n-link :to="getUploadLink(file.id, file.filename)" class="movie-title">{{ file.filename }}</n-link>
            <v-btn style="margin-top: 15px" outlined small dark text color="indigo" @click="rmUpload(file.id)">
              Supprimer
            </v-btn>
          </v-layout>
        </v-row>
      </v-container>
    </div>
    <Import v-else @switch="switchMode" @add="addVideo" />
  </v-layout>
</template>

<script>
import { remote } from 'electron'
import Import from '~/components/Import'

export default {
  components: { Import },
  data() {
    return {
      import_mode: false,
      cards: [],
      uploads: [],
    }
  },
  mounted: function() {
    this.getUploadVideo()
  },
  methods: {
    getUploadVideo() {
      fetch('https://epi-kodi.herokuapp.com/file', {
        method: 'get',
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.uploads = data
          this.$router.push({ path: '/tab/video' })
        })
    },
    rmLocal(title) {
      for (let i = 0; i < this.cards.length; i++) {
        if (title === this.cards[i].title) {
          this.cards.splice(i, 1)
        }
      }
    },
    rmUpload(id) {
      fetch('https://epi-kodi.herokuapp.com/file/' + id, {
        method: 'delete',
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.getUploadVideo()
        })
    },
    getLink(title, image, media) {
      var replaced = title.split(' ').join('-')
      return { name: 'video-id', params: { title: title, image: image, media: media } }
    },
    getUploadLink(id, filename) {
      if (filename === undefined) {
        return '/tab/video'
      }
      var replaced = filename.split(' ').join('-')
      return { name: 'video-id', params: { title: filename, id: id } }
    },
    switchMode() {
      if (this.import_mode) {
        this.import_mode = false
      } else {
        this.import_mode = true
      }
    },
    addVideo(name, image, video) {
      let carte = {
        title: name,
        image: 'file:///' + image,
        media: 'file:///' + video,
      }
      console.log(carte)
      this.cards.push(carte)
      this.switchMode()
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
