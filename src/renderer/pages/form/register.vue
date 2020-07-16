<template>
    <div id="register">
        <h1 class="red--text">register</h1>

        <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password"  placeholder="Password" />
        <input type="password" name="password2" v-model="input.password2" placeholder="Confirm Password" />
        <button type="button" v-on:click="register()">register</button>
        <v-list-item  class="red--text" v-for="item in items" :key="item.title" link :to="item.link">
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
    </div>
</template>

<script>
export default {
    name: 'register',
    data() {
        return{
            items: [
                 { title: 'Registered already? Login here', link: './login' },
            ],
            input: {
                password:"",
                password2:"",
                username:"",
            }
        }
    },
        methods: {
            register() {
                    if(this.input.username != "" && this.input.password != "" && this.input.password2 != "") {
                            if (this.input.password === this.input.password2) {
                                    fetch("https://epi-kodi.herokuapp.com/auth/register", {
                                        method: "post",
                                        headers: {
                                        "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                        username: this.input.username,
                                        password: this.input.password,
                                        }),
                                    })
                                    .then((response) => response.json())
                                    .then((data) => {
                                    console.log(data)
                                    this.$route.router.go('./login')
                                    // TODO redirect to login page
                                    });
                            } else {
                                alert("not the same password")
                            }
                    } else {
                        alert("A username and password must be present");
                    }
                }
            }
        }
</script>

<style scoped>
    #register {
        width: 400px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>