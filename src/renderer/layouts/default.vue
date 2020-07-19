<template>
  <v-container fluid fill-height class="my-container">
    <v-snackbar top right rounded shaped v-model="notification" timeout=3000>
      {{notification_text}}
    </v-snackbar>
    <v-layout row style="min-height: 997px;">
      <v-card min-height="100%" width="256">
        <v-navigation-drawer class="deep-purple accent-4" dark permanent>
          <v-list>
            <h1 class="title">Epi<span style="color: #ECAB09;">Kodi</span></h1>
            <v-list-item class="my-item" v-for="item in items" :key="item.title" link :to="item.link">
              <v-list-item-icon>
                <v-icon class="my-icon">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
      <nuxt />
    </v-layout>
  </v-container>
</template>

<script>
import io from "socket.io-client"

export default {
  components: {},
  data() {
    return {
      items: [
        { title: 'Videos', icon: 'mdi-video', link: '/tab/video' },
        { title: 'Musiques', icon: 'mdi-music', link: '/tab/music' },
        { title: 'Diffusions', icon: 'mdi-access-point', link: '/tab/live' },
        { title: 'Youtube', icon: 'mdi-youtube', link: '/tab/youtube' },
        { title: 'Envoyer', icon: 'mdi-upload', link: '/tab/upload' },
        { title: 'Déconnexion', icon: 'mdi-logout', link: '/' },
      ],
      notification: false,
      notification_text: ""
    }
  },
  mounted() {
    this.socket = io('https://epi-kodi.herokuapp.com/')
    // Join dedicated room
    this.socket.emit("join", {
      token: this.$store.state.token
    });
    this.socket.on("stream", (data) => {
      this.notification = true
      this.notification_text = data.user + " is now streaming."
    })
  },
  beforeDestroy() {
    // this.socket.emit("left", {
    //   token: this.$store.state.token
    // });
  }
}
</script>

<style>
body {
  margin: 0 !important;
  font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, Arial,
    sans-serif;
  color: #dfdfdf;
  background-color: #242424;
}

.my-container {
  min-height: 997px;
  align-items: inherit !important;
  padding: 0;
}

.title {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}

.v-list-item__icon {
  margin-top: 13px !important;
  margin-bottom: 13px !important;
}

.v-list {
  padding: 0 !important;
}

.v-sheet.v-card {
  border-radius: 0 !important;
}

.my-icon {
  margin-left: 15px;
  margin-right: 15px;
}

.my-item {
  height: 40px;
}

.my-item .v-list-item__title,
.my-item .v-list-item__icon {
  color: #dfdfdf;
}
</style>
