<template>
  <app-loader v-if="loading" />
  <div v-else-if="page">
    <h1 class="sr-only">{{ page.title }}</h1>
    <latest-posts-section />
    <related-posters-section :related-posters="page.relatedPosters" />
    <app-stores-section />
    <related-products-section
      :related-products="page.relatedProducts"
      :title="page.relatedPosters.title"
    />
    <!-- <block-instagram /> -->
    <groups />
  </div>
</template>

<script>
import { homePageId } from '~/data/pages'
import { usePageById } from '~/compositions/page'

export default {
  setup() {
    const { page, loading, error } = usePageById(homePageId)

    return {
      page,
      loading,
      error,
    }
  },
}
</script>
