(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{375:function(e,t,n){var content=n(406);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(12).default)("cdccd838",content,!0,{sourceMap:!1})},405:function(e,t,n){"use strict";var o=n(375);n.n(o).a},406:function(e,t,n){(t=n(11)(!1)).push([e.i,"#login[data-v-08a1a3e2]{width:500px;border:1px solid #ccc;background-color:#fff;margin:200px auto auto;padding:20px}",""]),e.exports=t},433:function(e,t,n){"use strict";n.r(t);n(64);var o=n(10),r={name:"Login",data:function(){return{input:{username:"",password:""}}},methods:{login:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:""!=e.input.username&&""!=e.input.password?fetch("https://epi-kodi.herokuapp.com/auth/login",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e.input.username,password:e.input.password})}).then((function(e){return e.json()})).then((function(data){e.$store.commit("addtoken",data.token),e.$store.commit("addusername",e.input.username),console.log(e.$store.state.token+" token "+e.$store.state.username+" username"),e.$router.push("/")})):alert("A username and password must be present");case 1:case"end":return t.stop()}}),t)})))()}}},c=(n(405),n(63)),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"login"}},[n("h1",[e._v("Login")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.input.username,expression:"input.username"}],attrs:{type:"text",name:"username",placeholder:"Username"},domProps:{value:e.input.username},on:{input:function(t){t.target.composing||e.$set(e.input,"username",t.target.value)}}}),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.input.password,expression:"input.password"}],attrs:{type:"password",name:"password",placeholder:"Password"},domProps:{value:e.input.password},on:{input:function(t){t.target.composing||e.$set(e.input,"password",t.target.value)}}}),e._v(" "),n("button",{attrs:{type:"button"},on:{click:function(t){return e.login()}}},[e._v("Login")]),e._v(" "),n("nuxt-link",{attrs:{to:"./register"}},[e._v("Don't you have an account? Register here")])],1)}),[],!1,null,"08a1a3e2",null);t.default=component.exports}}]);