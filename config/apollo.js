import { apiUrl } from './../data/siteDetails'

export default {
  clientConfigs: {
    default: {
      // required
      httpEndpoint: `${apiUrl}graphql`,
      httpLinkOptions: {
        credentials: 'include',
      },
      wsEndpoint: null,
      tokenName: 'apollo-token',
      persisting: false,
      websocketsOnly: false,
    },
  },
}
