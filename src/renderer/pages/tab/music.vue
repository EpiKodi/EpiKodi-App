<template>
  <v-layout column>
    <div>
      <h1 class="my-title">Musiques</h1>
    </div>
    <v-container fluid>
      <v-row dense>
        <v-layout column class="my-card-music" v-for="card in cards" :key="card.title">
          <v-card hover :to="getLink(card.title, card.file, card.author, card.src)">
            <v-img :src="card.src" class="movie-img white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="150px" />
          </v-card>
          <span class="music-title">{{ card.title }}</span>
          <span class="music-author">{{ card.author }}</span>
        </v-layout>
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
      cards: [{ title: 'Pretty Pimpin', author: 'Kurt Vile', file: 'kurt-vile-pretty-pimpin.mp3', src: 'https://www.lacoccinelle.net/1156930-1.jpg' }],
    }
  },
  methods: {
    getLink(title, file, author, src) {
      var replaced = title.split(' ').join('-');
      return {name: 'music-id', params: { title: title, author: author, file: file, image: src } }
    }
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

.my-card-music {
  width: 150px;
  height: 150px;
  flex: none;
  margin: 10px;
}

.movie-img {
  border: 1px solid #242424;
}

.movie-img:hover {
  border: 1px solid #ecab09;
}

.music-title {
  font-weight: 500;
  margin-top: 10px;
}

.music-author {
  margin-top: 5px;
  color: #959693;
}
</style>
