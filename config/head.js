// Global page headers: https://go.nuxtjs.dev/config-head
import { facebook, apiUrl } from './../data/siteDetails'

/*
 ** Headers of the page
 */
export default {
  titleTemplate: '%s',
  meta: [
    {
      hid: 'og:publisher',
      name: 'og:publisher',
      content: facebook,
    },
  ],
  link: [
    {
      hid: 'dns-prefetch:api',
      rel: 'dns-prefetch',
      href: apiUrl,
    },
    {
      hid: 'favicon:svg',
      rel: 'icon',
      href: '/favicon.svg',
      type: 'image/svg+xml',
    },
    {
      hid: 'rss:news',
      type: 'application/atom+xml',
      rel: 'alternate',
      href: `${apiUrl}feed/`,
      title: 'Nieuws - Loesje',
    },
    {
      hid: 'rss:posters',
      type: 'application/atom+xml',
      rel: 'alternate',
      href: `${apiUrl}feed/?post_type=poster&source=landelijke-serie`,
      title: 'Posters - Loesje',
    },
  ],
}
