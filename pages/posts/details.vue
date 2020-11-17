<template>
  <app-loader v-if="loading" />

  <div v-else-if="post">
    <app-content
      :title="post.title"
      :content="post.content"
      :date="post.date"
    />

    <related-posters-section
      v-if="post"
      :related-posters="post.relatedPosters"
    />
    <related-products-section :related-products="post.relatedProducts" />
    <posts-overview-section :not-in="post.databaseId" />
  </div>
</template>

<script>
import { useContext, computed } from '@nuxtjs/composition-api'
import { usePost } from '~/compositions/posts'

export default {
  setup() {
    const { params } = useContext()
    const uri = computed(() => params.value.slug)
    const { post, loading, error } = usePost(uri)

    return {
      post,
      loading,
      error,
    }
  },

  nuxtI18n: {
    paths: {
      nl: '/over-mij/nieuws/:slug',
    },
  },
}
</script>
