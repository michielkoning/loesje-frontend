import { InMemoryCache } from '@apollo/client/core'
import { apiUrl } from './../data/siteDetails'
import possibleTypes from './../data/possibleTypes.json'
const cache = new InMemoryCache({ possibleTypes })
export default {
  clientConfigs: {
    default: {
      // required
      cache,
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
