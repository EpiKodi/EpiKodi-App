<template>
  <v-container fill-height fluid style="min-height: 900px;">
    <v-row align="center" justify="center">
      <v-col>
        <h3 style="text-align: center;">Connexion</h3>
        <Alert style="text-align: center;" :message="alert.message" :type="alert.type" v-if="alert.message" />
        <v-layout column class="login-box">
          <v-text-field dark v-model="username" placeholder="Identifiant" color="success"></v-text-field>
          <v-text-field dark v-model="password" placeholder="Mot de passe"></v-text-field>
          <v-btn @click="sendForm()">Connexion</v-btn>
          <span style="text-align: center;margin-top: 15px;">Première connexion ? <n-link to="/register">Inscrivez-vous</n-link></span>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Alert from '~/components/Alert'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  components: {
    Alert,
  },
  layout: 'player',
  data() {
    return {
      username: 'username_test',
      password: 'password_test',
      alert: {
        message: null,
        type: null,
      },
    }
  },
  methods: {
    async sendForm() {
      this.alert.message = 'Connexion en cours'
      this.alert.type = 'is-warning'
      fetch('https://epi-kodi.herokuapp.com/auth/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.token === undefined) {
            this.alert.message = data.message
            this.alert.type = 'is-danger'
          } else {
            this.$store.commit('addtoken', data.token)
            this.$store.commit('addusername', this.username)
            console.log(this.$store.state.token + ' token ' + this.$store.state.username + ' username')
            this.alert.message = 'Connexion réussie'
            this.alert.type = 'is-success'
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
            this.$router.push({ path: '/tab/video' })
          }
        })
    },
  },
}
</script>

<style>
.login-box {
  max-width: 350px;
  max-height: 225px;
  margin: auto;
  align-content: center;
  vertical-align: middle;
}
</style>
