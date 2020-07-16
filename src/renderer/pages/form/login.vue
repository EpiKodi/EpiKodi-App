<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
        <nuxt-link to="./register">Don't you have an account? Register here</nuxt-link>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            async login() {
                if(this.input.username != "" && this.input.password != "") {
                    fetch("https://epi-kodi.herokuapp.com/auth/login", {
                    method: 'post',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'username': this.input.username,
                        'password': this.input.password
                        })
                }).then(response => response.json())
                .then(data => {
                    this.$store.commit('addtoken', data.token)
                    this.$store.commit('addusername', this.input.username)
                    console.log(this.$store.state.token[0].text + " token " + this.$store.state.username[0].text + " username")
                    this.$router.push('/')
                    // TODO STORE THE DATA IN GLOBAL and redirect to default page
                })
                } else {
                    alert("A username and password must be present");
                }
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>