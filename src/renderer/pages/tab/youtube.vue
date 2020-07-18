<template>
  <v-layout column>
    <div>
      <h1 class="my-title">Youtube</h1>
    </div>
    <v-container fluid>
      <v-row align="center" justify="center" class="search-bar">
        <v-text-field
          id="ysrc"
          dark
          label="Youtube URL"
          clearable
          persistent-hint
          hint="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        ></v-text-field>
        <v-btn color="#ecab09" style="margin-top: 10px" @click="submit">LOAD</v-btn>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row dense>
        <v-layout column class="my-card-youtube" v-for="card in cards" :key="card.title">
          <v-card hover :to="getLink(card.title, card.src, cards.img)">
            <v-img
              :src="card.img"
              class="movie-img white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="150px"
            ></v-img>
          </v-card>
          <span class="music-title">{{ card.title }}</span>
        </v-layout>
      </v-row>
    </v-container>
    <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
      <iframe
        class="embed-responsive-item"
        src="https://www.youtube.com/embed/v64KOxKVLVg"
        allowfullscreen
        style="display: none"
      ></iframe>
    </div>
  </v-layout>
</template>

<script>
import { remote } from "electron";

export default {
  components: {},
  data() {
    return {
      cards: [
        {
          title: "Apashe ft. Panther - Battle Royale",
          src: "https://www.youtube.com/embed/IZkDimhNQpU",
          img: "https://img.youtube.com/vi/IZkDimhNQpU/0.jpg"
        },
        {
          title: "LunchMoney Lewis - Bills",
          src: "https://www.youtube.com/embed/_IrQHeDcMi8",
          img: "https://img.youtube.com/vi/_IrQHeDcMi8/0.jpg"
        }
      ]
    };
  },
  methods: {
    getImg(src) {
      let id = src.split("v=");
      if (id.length === 2) id = id[1].split("&");
      else id = id[0].split("/");
      id = id[id.length - 1].split("&");
      id = id[0];
      return {
        title: title,
        src: "https://www.youtube.com/embed/" + id,
        img: "https://img.youtube.com/vi/" + id + "0.jpg"
      };
    },
    getLink(title, src, img) {
      return {
        name: "youtube-id",
        params: { title: title, src: src, img: img }
      };
    },
    getDirectLink() {
      let src = document.getElementById("ysrc").value;
      console.log(src);
      let id = src.split("v=");
      if (id.length === 2) id = id[1].split("&");
      else id = id[0].split("/");
      id = id[id.length - 1].split("&");
      id = id[0];
      return {
        name: "youtube-id",
        params: {
          title: title,
          src: "https://www.youtube.com/embed/" + id,
          img: "https://img.youtube.com/vi/" + id + "0.jpg"
        }
      };
    },
    submit() {
      const src = document.getElementById("ysrc").value;
      let id = src.split("v=");
      if (id.length === 2) id = id[1].split("&");
      else id = id[0].split("/");
      id = id[id.length - 1].split("&");
      id = id[0];
      this.$router.push({
        name: "youtube-id",
        params: {
          title: "title",
          src: "https://www.youtube.com/embed/" + id,
          img: "https://img.youtube.com/vi/" + id + "0.jpg"
        }
      });
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

.my-card-youtube {
  width: 250px;
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

.search-bar {
  width: 80%;
  margin-left: 10%;
}
</style>
