<template>
  <v-layout column>
    <v-container fluid>
      <div class="my-content">
        <v-row class="my-social-section">
          <v-icon class="section-icon">mdi-account-multiple</v-icon>
          <span class="section-title">AMIS</span>
        </v-row>
        <v-list-item class="friend-item" v-for="item in friendlist[0].text" :key="item.username">
          <v-list-item-content>
            <v-row class="my-friend">
              <span class="friend-username">{{ item.username }}</span>
              <v-icon class="friend-icon" v-on:click="removeFriend(item.id)">mdi-close-thick</v-icon>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div class="my-content">
        <v-row class="my-social-section">
          <v-icon class="section-icon">mdi-account-arrow-left</v-icon>
          <span class="section-title">DEMANDES D'AMIS</span>
        </v-row>
        <v-list-item class="friend-item" v-for="item in pending_friend" :key="item.username">
          <v-list-item-content>
            <v-row class="my-friend">
              <span class="friend-username">{{ item.username }}</span>
              <v-icon class="accept-friend-icon" v-on:click="acceptFriendRequest(item.id)">mdi-check-bold</v-icon>
              <v-icon class="refuse-friend-icon" v-on:click="refuseFriendRequest(item.id)">mdi-close-thick</v-icon>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div class="my-content">
        <v-row class="my-social-section">
          <v-icon class="section-icon">mdi-account-plus</v-icon>
          <span class="section-title">AJOUTER UN AMI</span>
        </v-row>
        <v-row style="max-width: 400px; padding-left: 28px;">
          <v-text-field style="max-width: 250px;" dark placeholder="Nom de l'utilisateur" color="white" v-model="input.username" dense></v-text-field>
          <v-icon class="search-icon" v-on:click="searchUser()">mdi-magnify</v-icon>
        </v-row>
        <span style="padding-left: 16px;text-decoration: underline;">Résultats:</span>
        <br />
        <v-list-item class="friend-item" v-for="item in userList" :key="item.username">
          <v-list-item-content>
            <v-row class="my-friend">
              <span class="friend-username">{{ item.username }}</span>
              <v-icon class="accept-friend-icon" v-on:click="addFriend(item.id)">mdi-plus</v-icon>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      userList: [],
      pending_friend: [],
      input: {
        username: '',
      },
    }
  },
  computed: mapState(['friendlist']),
  mounted() {
    this.refresh()
  },
  methods: {
    refresh() {
      this.getPending()
      this.askfriendlist()
    },
    askfriendlist() {
      // ask for friendlist
      fetch('https://epi-kodi.herokuapp.com/friend', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.$store.state.token,
        },
      })
        .then(response => response.json())
        .then(data => {
          this.$store.commit('delFriendlist')
          this.$store.commit('addFriendlist', JSON.parse(JSON.stringify(data)))
        })
    },
    addFriend(id) {
      // send friend request
      fetch('https://epi-kodi.herokuapp.com/friend/' + id, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.$store.state.token,
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then(async function(response) {
          if (response.status != 200) {
            let data = await response.json()
            throw new Error(data.error)
          } else {
            return response
          }
        })
        .catch(error => {
          alert(error)
        })
    },
    searchUser() {
      // search users
      if (this.input.username != '') {
        fetch('https://epi-kodi.herokuapp.com/user/' + this.input.username, {
          method: 'get',
          headers: {
            Authorization: this.$store.state.token,
          },
        })
          .then(function(response) {
            if (response.status != 200) {
              throw new Error(response.status)
            } else {
              return response
            }
          })
          .then(response => response.json())
          .then(data => {
            this.userList = data
            console.log(this.$store.state.friendlist)
          })
          .catch(error => {
            alert(error)
          })
      }
    },
    getPending() {
      // get pending invitation
      fetch('https://epi-kodi.herokuapp.com/pending_friend', {
        method: 'get',
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then(function(response) {
          if (response.status != 200) {
            throw new Error(response.status)
          } else {
            return response
          }
        })
        .then(response => response.json())
        .then(data => {
          this.pending_friend = data
        })
        .catch(error => {
          alert(error)
        })
    },
    acceptFriendRequest(id) {
      // send friend request
      fetch('https://epi-kodi.herokuapp.com/pending_friend/' + id, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.$store.state.token,
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then(r => {
          if (r.status != 200) {
            throw new Error(r.json().error)
          }
          this.refresh()
        })
        .catch(error => {
          alert(error)
        })
    },
    refuseFriendRequest(id) {
      // refuse friendlist request
      fetch('https://epi-kodi.herokuapp.com/pending_friend/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then(async function(response) {
          if (response.status != 200) {
            let data = await response.json()
            throw new Error(data.error)
          } else {
            return response
          }
        })
        .catch(error => {
          alert(error)
        })
    },
    removeFriend(id) {
      // remove friend from friendlist
      fetch('https://epi-kodi.herokuapp.com/friend/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then(r => {
          if (r.status != 200) {
            throw new Error(r.json().error)
          }
          this.refresh()
        })
        .catch(error => {
          alert(error)
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
  color: #faeaea;
  font-size: 16px;
}

.my-content {
  min-height: 200px;
}

.my-social-section {
  max-width: 300px;
  margin: 0;
  margin-bottom: 5px;
  padding: 0;
}

.v-list-item__content {
  padding: 0;
}

.friend-item {
  display: inherit;
  max-height: 25px !important;
  min-height: 25px;
}

.my-friend {
  max-width: 300px;
  margin: 0;
  padding: 0;
}

.friend-username {
  font-size: 14px;
  font-weight: bold;
  height: 24px;
  line-height: 24px;
  color: #dfdfdf !important;
}

.search-icon {
  color: white !important;
  margin-left: 10px;
}

.friend-icon {
  color: red !important;
  margin-left: 10px;
}

.accept-friend-icon {
  color: greenyellow !important;
  margin-left: 10px;
}

.refuse-friend-icon {
  color: red !important;
  margin-left: 10px;
}

.button_validate {
  max-width: 15px;
}
.center {
  margin: auto;
}
button_accept {
  background-color: 'red';
}
</style>
