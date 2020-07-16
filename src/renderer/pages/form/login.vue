<template>
    <div id="login">
        <h1>Login</h1>
        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
        <button type="button" v-on:click="login()">Login</button>
         <v-list-item class="red--text" v-for="item in items" :key="item.title" link :to="item.link">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                items: [
                    {title: "Don't you have an account? Register here", link: "./register"}
                ],
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
                    console.log(data.token)
                    this.$route.router.push('./register')
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