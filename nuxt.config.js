const isDev = process.env.NODE_ENV !== 'production'
const colors = require('vuetify/es5/util/colors')

const settings = {
  apiKey: '706cf26a-1ad9-433c-98d9-788371b97012',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}

module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  telemetry: false,
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  head: {
    titleTemplate: '%s',
    title: 'epd',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/global', ssr: true },
    { src: '~/plugins/axios', ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/recaptcha',
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '78259789',
        webvisor: true,
        clickmap:true,
        // useCDN:false,
        trackLinks:true,
        accurateTrackBounce:true,
      }
    ],
  ],
  recaptcha: {
    /* reCAPTCHA options */
    siteKey: '6LckzcgaAAAAAJcqJzv63zPjQPWt3n6vzPc8kJuB', //6LckzcgaAAAAAHf2PCgYcUHypHlMWPgXKuOj2bnc
    language : 'Ru-ru',
    version: 2,
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      fallbackLocale: 'ru'
    },
    locales: [
      {
        name: 'Русский',
        code: 'ru',
        iso: 'ru-Ru',
        file: 'ru-RU.js'
      },
      {
        name: 'Чувашский',
        code: 'ch',
        iso: 'ch-Ch',
        file: 'ch-CH.js'
      },
    ],
    defaultLocale: 'ru',
    lazy: true,
    langDir: 'lang/',
    vueI18nLoader: true
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#0079FE",
          accent: colors.default.grey.darken3,
          secondary: colors.default.amber.darken3,
          info: colors.default.teal.lighten1,
          warning: colors.default.amber.base,
          error: colors.default.deepOrange.accent4,
          success: colors.default.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  env:{
    baseUrl: !isDev ? 'https://portaljkh.ru/api' : 'http://localhost:3000/api', //process.env.baseUrl
    apiJWT: 'portralJkh super site',
  }
}
