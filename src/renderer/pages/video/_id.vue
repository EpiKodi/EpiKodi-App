<template>
  <v-container fluid fill-height class="my-container">
    <video
      id="video"
      class="video-js my-video"
      :controls="controls"
      :autoplay="autoplay"
      preload="auto"
      height="997px"
      data-setup="{}"
    >
      <source :src="media" type="video/mp4" />
    </video>
    <v-row style="position: absolute; margin-top: 10px; margin-left: 10px;">
      <v-btn to="/tab/video" color="#FFF">
        <v-icon left>mdi-arrow-left-bold</v-icon>Retour
      </v-btn>
      <h1 class="video-title">{{ title }}</h1>
    </v-row>
  </v-container>
</template>

<script>
import { remote } from "electron";
import io from "socket.io-client";

export default {
  components: {
    VuetifyAudio: () => import("vuetify-audio")
  },
  validate({ params }) {
    // Check if id exist
    return true;
  },
  data() {
    return {
      title: this.$route.params.title,
      image: this.$route.params.image,
      media: this.$route.params.media,
      controls: "controls",
      autoplay: true,
      stream: false,
      watcher: false
    };
  },
  created() {
    // Set media url
    if (this.$route.params.id != undefined) {
      this.media =
        "https://epi-kodi.herokuapp.com/file/" +
        this.$route.params.id +
        "?token=" +
        this.$store.state.token;
    }
  },

  mounted() {
    // Create persistant socket
    this.socket = io("https://epi-kodi.herokuapp.com");

    // Join dedicated room
    this.socket.emit("join", {
      token: this.$store.state.token
    });

    if (this.$route.params.stream == true) {
      // Start stream
      this.stream = true;
      this.startStream();
    }

    if (this.$route.params.watcher == true) {
      // Disable controls
      this.controls = false;
      this.autoplay = false;
    }

    if (this.$route.params.watcher == true) {
      // WebSocket callback
      this.socket.on("media_update", data => {
        const v = document.querySelector("#video");
        console.log(data);
        v.currentTime = data.timer;
        if (data.play) v.play();
        else v.pause();
      });
    }
  },
  beforeDestroy() {
    if (this.stream == true) {
      // Stop stream
      this.stopStream();
    }
    this.socket.emit("left", {
      token: this.$store.state.token
    });
  },
  layout: "player",
  methods: {
    startStream() {
      const v = document.querySelector("#video");
      v.onplay = this.mediaUpdate;
      v.onpause = this.mediaUpdate;
      fetch("https://epi-kodi.herokuapp.com/stream/" + this.$route.params.id, {
        method: "post",
        headers: {
          Authorization: this.$store.state.token
        }
      });
      // Should catch error
    },
    stopStream() {
      fetch("https://epi-kodi.herokuapp.com/stream", {
        method: "delete",
        headers: {
          Authorization: this.$store.state.token
        }
      });
      // Should catch error
    },
    mediaUpdate() {
      const v = document.querySelector("#video");
      if (!v) return;
      const timer = v.currentTime;
      const play = !v.paused;
      this.socket.emit("media_update", {
        token: this.$store.state.token,
        timer: timer,
        play: play,
        id: this.$route.params.id
      });
    }
  }
};
</script>

<style>
:focus {
  outline: none;
}
body {
  margin: 0 !important;
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial,
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
