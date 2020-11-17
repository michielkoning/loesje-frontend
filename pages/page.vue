<template>
  <app-loader v-if="loading" />
  <div v-else-if="page" class="page">
    <app-content :title="page.title" :content="page.content" />
    <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <related-pages-section
      :not-in="page.databaseId"
      :parent-page-id="parentId"
    />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script>
import {
  useContext,
  computed,
  useMeta,
  defineComponent,
} from '@nuxtjs/composition-api'
import { usePageByUri } from '~/compositions/page'
export default defineComponent({
  setup() {
    const { error } = useContext()
    const { page, loading, onError } = usePageByUri()

    onError((err) => {
      error({ statusCode: 404, message: err.message })
    })

    const parentId = computed(() => {
      if (page.value.parent) {
        return page.value.parent.node.databaseId
      }
      return page.value.databaseId
    })

    useMeta({
      title: computed(() => page?.value?.title).value,
    })

    return {
      parentId,
      page,
      loading,
      error,
    }
  },
  head: {},

  nuxtI18n: {
    paths: {
      nl: '/*',
    },
  },
})
</script>
