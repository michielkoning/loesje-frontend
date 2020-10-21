import { modules, buildModules } from './config/modules'
import apollo from './config/apollo'
import build from './config/build'
import css from './config/css'
import env from './config/env'
import generate from './config/generate'
import head from './config/head'
import i18n from './config/i18n'
import loaders from './config/loaders'
import loading from './config/loading'
import manifest from './config/manifest'
import plugins from './config/plugins'
import server from './config/server'

export default {
  apollo,
  build,
  buildModules,
  css,
  env,
  generate,
  head,
  i18n,
  loaders,
  loading,
  manifest,
  modules,
  plugins,
  server,
  ssr: true,
  modern: true,
  target: 'static',
}
