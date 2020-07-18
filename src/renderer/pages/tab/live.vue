<template>
  <v-layout column>
    <div>
      <h1 class="my-title">Diffusions</h1>
    </div>
    <v-container fluid>
      <!-- <v-row dense style="min-height: 275px;"> -->
      <v-layout column class="my-card-movie" v-for="live in lives" :key="live.id">
        <v-flex style="display: flex; flex-direction: row">
          <nuxt-link :to="streamPath(live.id, live.filename)">{{live.filename}}</nuxt-link>
          <p style="padding-left: 7px">de</p>
          <p style="padding-left: 7px">{{live.user}}</p>
        </v-flex>
      </v-layout>
      <!-- </v-row> -->
    </v-container>
  </v-layout>
</template>

<script>
import { remote } from "electron";

export default {
  components: {},
  data() {
    return {
      lives: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch("https://epi-kodi.herokuapp.com/stream", {
        method: "get",
        headers: {
          Authorization: this.$store.state.token
        }
      })
        .then(response => response.json())
        .then(data => {
          this.lives = data;
        });
    },
    streamPath(id, filename) {
      return {
        name: "video-id",
        params: { title: filename, id: id, watcher: true }
      };
    }
  }
};
</script>

<style>
body {
  margin: 0 !important;
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial,
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
