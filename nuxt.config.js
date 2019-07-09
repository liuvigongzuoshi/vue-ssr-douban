export default {
  server: {
    port: 8080,
    host: 'localhost'
  },

  env: {
    baseUrl: 'https://douban.uieee.com'
  },

  srcDir: 'src/',

  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  router: {
    base: '/',
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/',
        redirect: 'book/tag'
      })
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/style.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-inject.js'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.baseUr,
    proxy: true // Can be also an object with default options
  },

  proxy: {
    '/v2': { target: 'https://douban.uieee.com' }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
