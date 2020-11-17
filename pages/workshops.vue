<template>
  <app-loader v-if="loading" />
  <div v-else-if="page" class="page">
    <app-content :title="page.title" :content="page.content" />
    <form-workshop />
    <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script>
import { usePageById } from '~/compositions/page'
import { workshopsPageId } from '~/data/pages'

export default {
  setup() {
    const { page, loading, error } = usePageById(workshopsPageId)

    return {
      page,
      loading,
      error,
    }
  },
}
</script>
