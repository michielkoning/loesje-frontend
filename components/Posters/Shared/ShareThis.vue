<template>
  <div>
    <app-button v-if="supportsShareAPI" @click="share">share</app-button>
    <social-media-links
      v-else
      :title="$t('title')"
      :twitter="twitter"
      :facebook="facebook"
      :pinterest="pinterest"
    />
  </div>
</template>

<script>
import { onMounted, computed, ref, useContext } from '@nuxtjs/composition-api'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { $axios } = useContext()

    const supportsShareAPI = ref(false)

    onMounted(() => {
      supportsShareAPI.value = process.client && window?.navigator?.canShare
    })
    const twitter = computed(() => {
      return `https://twitter.com/share?text=${props.title}&url=${props.link}`
    })
    const facebook = computed(() => {
      return `https://www.facebook.com/sharer.php?u=${props.link}&p=${props.title}`
    })
    const pinterest = computed(() => {
      return `https://pinterest.com/pin/create/button/?url=${props.link}&media=${props.image}&description=${props.title}`
    })
    const toDataURL = async (url) => {
      try {
        const data = await $axios.$get(url, {
          responseType: 'blob',
        })

        return data

        // return new Promise((resolve, reject) => {
        //   const reader = new FileReader()
        //   reader.onloadend = () => resolve(reader.result)
        //   reader.onerror = reject
        //   reader.readAsDataURL(data)
        // })
      } catch (error) {
        return null
      }
    }

    // const dataUrlToFile = async (dataUrl, fileName) => {
    //   const res = await fetch(dataUrl)
    //   const blob = await res.blob()
    //   return new File([blob], fileName, { type: 'image/png' })
    // }

    const share = async () => {
      // const imageData = await toDataURL('http://localhost:3333/images/electriciteitskastje.png')
      const imageData = await toDataURL(
        'http://localhost:3333/_nuxt/components/Posts/LatestPosts/images/air-balloon.png',
      )
      // size = 26332

      // const file = await dataUrlToFile(imageData, 'poster.png')
      const file = new File([imageData], 'poster.png', { type: 'image/png' })

      try {
        await window.navigator.share({
          title: props.title,
          url: props.link,
          text: props.title,
          files: file ? [file] : [],
        })
      } catch (error) {
        window.console.error(error)
      }
    }
    return {
      supportsShareAPI,
      twitter,
      facebook,
      pinterest,
      share,
    }
  },
}
</script>

<i18n>
{
  "nl": {
    "title": "Deel de poster op"
  }
}
</i18n>
