/*
 ** Plugins to load before mounting the App
 */
export default [
  '~/plugins/vue-youtube',
  '~/plugins/axios',
  '~/plugins/apollo',
  { src: '~/plugins/houdini', mode: 'client' },
  { src: '~/plugins/vuex-persist', mode: 'client' },
]
