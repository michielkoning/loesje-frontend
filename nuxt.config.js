import pkg from './package'
const baseUrl = 'https://api.loesje.michielkoning.nl/'

export default {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | Loesje',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      {
        href:
          'https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap',
        rel: 'stylesheet'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/styles/base.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-youtube',
    '~/plugins/axios',
    '~/plugins/vuelidate',
    { src: '~/plugins/houdini', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    'nuxt-svg-loader',
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/auth',
    'nuxt-i18n'
  ],
  i18n: {
    defaultLocale: 'nl',
    locales: [
      {
        name: 'Nederlands',
        code: 'nl',
        iso: 'nl-NL',
        file: 'nl.json'
      }
    ],
    lazy: true,
    langDir: 'locales/'
  },
  loaders: {
    cssModules: {
      localIdentName: '[local]_[hash:base64:5]'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-mixins': {
          mixinsDir: './styles/mixins/'
        },
        'postcss-preset-env': {
          importFrom: ['./styles/media-queries/media-queries.css'],

          features: {
            'nesting-rules': true,
            'custom-media-queries': true,
            'media-query-ranges': true
          }
        }
      }
    }
  },
  apollo: {
    clientConfigs: {
      default: {
        // required
        httpEndpoint: `${baseUrl}graphql`
      }
    }
  },
  generate: {
    fallback: true
  }
}
