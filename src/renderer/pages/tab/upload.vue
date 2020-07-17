<template>
  <v-layout column>
    <div>
      <h1 class="my-title">Envoyer une nouvelle vidéo</h1>
    </div>
    <v-container fluid>
      <v-row>
        <v-col style="max-width: 400px;padding: 30px;">
          <v-text-field dark label="Nom de la vidéo" color="white" v-model="name" dense></v-text-field>
          <v-file-input prepend-icon="mdi-camera" dark v-model="video" accept="video/mp4" label="Choisissez une vidéo"></v-file-input>
          <!-- <v-btn @click="test()">test</v-btn> -->
          <v-row style="justify-content: space-between;">
            <v-btn @click="send()">Envoyer</v-btn>
          </v-row>
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
      name: 'test',
      video: undefined,
    }
  },
  methods: {
    send() {
      if (this.video === undefined || this.name === '') {
        return
      }
      let formData = new FormData()
      formData.append('file', this.video)
      console.log(formData.get('file'))
      console.log(this.$store.state.token)
      fetch('https://epi-kodi.herokuapp.com/file', {
        method: 'post',
        headers: {
          Authorization: this.$store.state.token,
        },
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.$router.push({ path: '/tab/video' })
        })
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

.my-title {
  font-size: 18px;
  margin-top: 5px;
  flex: 1;
  text-align: center;
}
</style>
