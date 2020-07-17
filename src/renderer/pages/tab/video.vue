<template>
  <v-layout column>
    <div>
      <h1 class="my-title">Vidéos</h1>
    </div>
    <v-container fluid>
      <v-row dense>
        <v-layout column class="my-card-movie" v-for="card in cards" :key="card.title">
          <v-card hover :to="getLink(card.title, card.year, card.image, card.media)">
            <v-img :src="card.src" class="movie-img white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" />
          </v-card>
          <span class="movie-title">{{ card.title }}</span>
          <span class="movie-year">{{ card.year }}</span>
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
      cards: [
        {
          title: 'Fury',
          year: '2014',
          src:
            'https://media1.woopic.com/api/v1/images/174%2Fcinemovies%2F362%2Ffde%2F94f63bd384778c1cf5c02f5a06%2Fmovies-218759-21118663.jpg?format=822x700&quality=85',
          media: '',
        },
        { title: 'Road trips', year: '1999', image: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', media: '' },
        { title: 'Best airlines', year: '2042', image: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', media: '' },
        { title: 'test', year: '2042', image: '', media: '/home/takoo/Videos/fury.mp4' },
      ],
    }
  },
  methods: {
    getLink(title, year, image, media) {
      var replaced = title.split(' ').join('-')
      return { name: 'video-id', params: { title: title, year: year, image: image, media: media } }
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
