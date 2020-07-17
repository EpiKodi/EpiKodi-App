<template>
  <v-container fill-height fluid style="min-height: 900px;">
    <v-row align="center" justify="center">
      <v-col>
        <h3 style="text-align: center;">Inscription</h3>
        <Alert style="text-align: center;" :message="alert.message" :type="alert.type" v-if="alert.message" />
        <v-layout column class="register-box">
          <v-text-field dark v-model="username" placeholder="Identifiant"></v-text-field>
          <v-text-field dark v-model="password" placeholder="Mot de passe"></v-text-field>
          <v-text-field dark v-model="passwordc" placeholder="Confirmez le mot de passe"></v-text-field>
          <v-btn @click="sendForm()">Inscription</v-btn>
          <span style="text-align: center;margin-top: 15px;">Déjà membre ? <n-link to="/">Connectez-vous</n-link></span>
        </v-layout>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Alert from '~/components/Alert'

export default {
  name: 'Register',
  layout: 'player',
  components: {
    Alert,
  },
  data() {
    return {
      username: 'test',
      password: 'test',
      passwordc: 'test',
      alert: {
        message: null,
        type: null,
      },
    }
  },
  methods: {
    async sendForm() {
      this.alert.message = 'Création de compte en cours'
      this.alert.type = 'is-warning'
      fetch('https://epi-kodi.herokuapp.com/auth/register', {
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
          console.log(data)
          if (data.id === undefined) {
            this.alert.message = data.message
            this.alert.type = 'is-danger'
          } else {
            this.alert.message = 'Création de compte réussie'
            this.alert.type = 'is-success'
            this.$router.push({ path: '/tab/video' })
          }
        })
      // TODO STORE THE DATA IN GLOBAL and redirect to default page
    },
  },
}
</script>

<style>
.register-box {
  max-width: 350px;
  max-height: 225px;
  margin: auto;
  align-content: center;
  vertical-align: middle;
}

.v-text-field__slot input,
.v-text-field__slot input::placeholder {
  color: white !important;
}

.v-input__control > .v-input__slot:before {
  border-color: white !important;
}

.v-text-field__slot {
  color: white !important;
}

.v-input {
  color: white !important;
}
</style>
