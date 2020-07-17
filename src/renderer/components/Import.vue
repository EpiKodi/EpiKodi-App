<template>
  <v-layout column>
    <div>
      <h1 class="my-title">Importer une nouvelle vidéo</h1>
    </div>
    <v-container fluid>
      <v-row>
        <v-col style="max-width: 400px;padding: 30px;">
          <v-text-field dark label="Nom de la vidéo" color="white" v-model="name" dense></v-text-field>
          <v-file-input
            prepend-icon="mdi-image"
            dark
            v-model="image"
            accept="image/png, image/jpeg, image/bmp"
            label="Choisissez une couverture"
          ></v-file-input>
          <v-file-input prepend-icon="mdi-camera" dark v-model="video" accept="video/mp4" label="Choisissez une vidéo"></v-file-input>
          <!-- <v-btn @click="test()">test</v-btn> -->
          <v-row style="justify-content: space-between;">
            <v-btn @click="cancelbtn()">Annuler</v-btn>
            <v-btn @click="send()">Envoyer</v-btn>
          </v-row>
        </v-col>
        <v-col>
          <v-img v-if="image != undefined" :src="getImgPath()" max-height="500" max-width="700" contain></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'Import',
  props: ['message', 'type'],
  data() {
    return {
      name: '',
      image: undefined,
      video: undefined,
    }
  },
  methods: {
    send() {
      this.$emit('add', this.name, this.image.path, this.video.path)
    },
    cancelbtn() {
      this.$emit('switch');
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

<style></style>
