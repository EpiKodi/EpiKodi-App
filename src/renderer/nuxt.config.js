/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */


module.exports = {
  mode: 'spa', // or 'universal'
  head: {
    title: 'epikodi'
  },
  loading: false,
  plugins: [
    { ssr: true, src: '@/plugins/icons.js' }
  ],
  buildModules: [

  ],
  modules: [
    '@nuxtjs/vuetify',
    'nuxt-socket-io',
  ],
  io: {
    // module options
    sockets: [{
      name: 'default',
      url: 'https://epi-kodi.herokuapp.com',
      default: true
    }]
  },
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: '#1867c0',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
        },
      },
    }
  }
};
