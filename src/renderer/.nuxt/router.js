import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2de4d85a = () => interopDefault(import('../pages/tab/live.vue' /* webpackChunkName: "pages/tab/live" */))
const _6c739627 = () => interopDefault(import('../pages/tab/music.vue' /* webpackChunkName: "pages/tab/music" */))
const _44a0456f = () => interopDefault(import('../pages/tab/upload.vue' /* webpackChunkName: "pages/tab/upload" */))
const _6865af4c = () => interopDefault(import('../pages/music/_id.vue' /* webpackChunkName: "pages/music/_id" */))
const _5153c0bc = () => interopDefault(import('../pages/video/_id.vue' /* webpackChunkName: "pages/video/_id" */))
const _08ae764e = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/tab/live",
    component: _2de4d85a,
    name: "tab-live"
  }, {
    path: "/tab/music",
    component: _6c739627,
    name: "tab-music"
  }, {
    path: "/tab/upload",
    component: _44a0456f,
    name: "tab-upload"
  }, {
    path: "/music/:id?",
    component: _6865af4c,
    name: "music-id"
  }, {
    path: "/video/:id?",
    component: _5153c0bc,
    name: "video-id"
  }, {
    path: "/",
    component: _08ae764e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
