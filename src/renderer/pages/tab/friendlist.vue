<template>
  <div class="center">
    <v-list class="list">
    <input style="background-color : grey text-color: black" v-model="input.username" name="friendname" placeholder="Your friend username" />
    <v-btn type="button" v-on:click="searchUser()">search User</v-btn>
          <h1>userlist</h1>
            <v-list-item class="userlist" v-for="item in userList" :key="item.username">
              <v-list-item-content>
                <v-list-item-title>{{ item.username }}</v-list-item-title>
              </v-list-item-content>
                  <v-btn type="button" v-on:click="addFriend(item.id)">add friend</v-btn>
            </v-list-item>
          </v-list>
          <br>
          <v-list class="list">
          <h1>friendRequest</h1>
            <v-list-item class="friendrequest" v-for="item in pending_friend" :key="item.username">
              <v-list-item-content>
                <span>
                <v-list-item-title>{{item.username}}</v-list-item-title>
                <v-btn class="button_accept" style="background-color: green" v-on:click="acceptFriendRequest(item.id)">accept</v-btn>
                  <v-btn type="button_decline" style="background-color: red" v-on:click="refuseFriendRequest(item.id)">decline</v-btn>
                  </span>
              </v-list-item-content>
            </v-list-item>
            
          </v-list>
          <br>
          <v-list class="list">
      <h1>friendlist</h1>
            <v-list-item class="friendlist" v-for="item in friendlist[0].text" :key="item.username">
              <v-list-item-content>
                <v-list-item-title>{{item.username}}</v-list-item-title>
                <v-btn type="remove_friend" style="background-color: red" v-on:click="removeFriend(item.id)">remove from friendlist</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      userList: [],
      pending_friend: [],
      input: {
        username: "",
      },
    };
  },
  computed: mapState([
    'friendlist'
  ]),
  mounted(){
    this.getPending()
    this.askfriendlist()
  },
  methods: {
    askfriendlist() {
      // ask for friendlist
            fetch('https://epi-kodi.herokuapp.com/friend', {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': this.$store.state.token
              },
              }).then(response => response.json())
              .then(data=> {
                this.$store.commit('delFriendlist')
                this.$store.commit('addFriendlist', JSON.parse(JSON.stringify(data)))
              })
    },
    addFriend(id) {
      // send friend request
      fetch("https://epi-kodi.herokuapp.com/friend/" + id, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.$store.state.token,
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then(async function(response) {
          if (response.status != 200) {
            let data = await response.json();
            throw new Error(data.error);
          } else {
            return response;
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    searchUser() {
      // search users
      if (this.input.username != "") {
        fetch("https://epi-kodi.herokuapp.com/user/" + this.input.username, {
          method: "get",
          headers: {
            Authorization: this.$store.state.token,
          },
        })
          .then(function(response) {
            if (response.status != 200) {
              throw new Error(response.status);
            } else {
              return response;
            }
          })
          .then((response) => response.json())
          .then((data) => {
            this.userList = data;
            console.log(this.$store.state.friendlist)
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    getPending() {
      // get pending invitation
        fetch("https://epi-kodi.herokuapp.com/pending_friend", {
          method: "get",
          headers: {
            Authorization: this.$store.state.token,
          },
        })
          .then(function(response) {
            if (response.status != 200) {
              throw new Error(response.status);
            } else {
              return response;
            }
          })
          .then((response) => response.json())
          .then((data) => {
          this.pending_friend = data;
          })
          .catch((error) => {
            alert(error);
          });
    },
    acceptFriendRequest(id) {
      // send friend request
      fetch("https://epi-kodi.herokuapp.com/pending_friend/" + id, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.$store.state.token,
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then(async function(response) {
          if (response.status != 200) {
            let data = await response.json();
            throw new Error(data.error);
          } else {
            return response;
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    refuseFriendRequest(id) {
      // refuse friendlist request
      fetch("https://epi-kodi.herokuapp.com/pending_friend/" + id, {
        method: "DELETE",
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then(async function(response) {
          if (response.status != 200) {
            let data = await response.json();
            throw new Error(data.error);
          } else {
            return response;
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    removeFriend(id) {
      // remove friend from friendlist
      fetch("https://epi-kodi.herokuapp.com/friend/" + id, {
        method: "DELETE",
        headers: {
          Authorization: this.$store.state.token,
        },
      })
        .then(async function(response) {
          if (response.status != 200) {
            let data = await response.json();
            throw new Error(data.error);
          } else {
            return response;
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  },
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
},
button_validate {
  max-width: 15px;
}
.center {
  margin: auto;
}
button_accept {
  background-color: "red"
}
</style>
