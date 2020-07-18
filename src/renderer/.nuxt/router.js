import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1ec53ef6 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _e684131e = () => interopDefault(import('../pages/form/login.vue' /* webpackChunkName: "pages/form/login" */))
const _0c7ac0cb = () => interopDefault(import('../pages/form/register.vue' /* webpackChunkName: "pages/form/register" */))
const _7ce3cdf9 = () => interopDefault(import('../pages/tab/live.vue' /* webpackChunkName: "pages/tab/live" */))
const _05595730 = () => interopDefault(import('../pages/tab/music.vue' /* webpackChunkName: "pages/tab/music" */))
const _608f6164 = () => interopDefault(import('../pages/tab/upload.vue' /* webpackChunkName: "pages/tab/upload" */))
const _35855fbe = () => interopDefault(import('../pages/tab/video.vue' /* webpackChunkName: "pages/tab/video" */))
const _343bf8b4 = () => interopDefault(import('../pages/tab/youtube.vue' /* webpackChunkName: "pages/tab/youtube" */))
const _3682cf8c = () => interopDefault(import('../pages/video/import.vue' /* webpackChunkName: "pages/video/import" */))
const _0d7524e6 = () => interopDefault(import('../pages/music/_id.vue' /* webpackChunkName: "pages/music/_id" */))
const _6835dde3 = () => interopDefault(import('../pages/video/_id.vue' /* webpackChunkName: "pages/video/_id" */))
const _48bc574b = () => interopDefault(import('../pages/youtube/_id.vue' /* webpackChunkName: "pages/youtube/_id" */))
const _0be17d0f = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'hash',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/register",
    component: _1ec53ef6,
    name: "register"
  }, {
    path: "/form/login",
    component: _e684131e,
    name: "form-login"
  }, {
    path: "/form/register",
    component: _0c7ac0cb,
    name: "form-register"
  }, {
    path: "/tab/live",
    component: _7ce3cdf9,
    name: "tab-live"
  }, {
    path: "/tab/music",
    component: _05595730,
    name: "tab-music"
  }, {
    path: "/tab/upload",
    component: _608f6164,
    name: "tab-upload"
  }, {
    path: "/tab/video",
    component: _35855fbe,
    name: "tab-video"
  }, {
    path: "/tab/youtube",
    component: _343bf8b4,
    name: "tab-youtube"
  }, {
    path: "/video/import",
    component: _3682cf8c,
    name: "video-import"
  }, {
    path: "/music/:id?",
    component: _0d7524e6,
    name: "music-id"
  }, {
    path: "/video/:id?",
    component: _6835dde3,
    name: "video-id"
  }, {
    path: "/youtube/:id?",
    component: _48bc574b,
    name: "youtube-id"
  }, {
    path: "/",
    component: _0be17d0f,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
