<template>
  <time v-if="formattedDate" :datetime="dateTime">
    {{ $d(new Date(formattedDate), 'short') }}
  </time>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'

export default {
  props: {
    date: {
      type: String,
      default: null,
    },
  },

  setup(props) {
    const formattedDate = computed(() => {
      if (!props.date) return null

      const pattern = /(\d{2})\/(\d{2})\/(\d{4})/ // date via posters is 24/03/2010
      const regex = RegExp(pattern)
      if (regex.test(props.date)) {
        return new Date(props.date.replace(pattern, '$3-$2-$1'))
      }
      return new Date(props.date)
    })

    const dateTime = computed(() => {
      if (!(formattedDate.value instanceof Date)) return null
      return `${formattedDate.value.getFullYear()}-${
        formattedDate.value.getMonth() + 1
      }-${formattedDate.value.getDate()}`
    })

    return {
      dateTime,
      formattedDate,
    }
  },
}
</script>
