<template>
  <section aria-labelledby="posters-overview-title">
    <center-wrapper>
      <h1 id="posters-overview-title">
        {{ title }}
      </h1>
    </center-wrapper>
    <poster-list
      v-if="posters && posters.edges.length"
      :posters="posters.edges"
    />
    <center-wrapper>
      <load-more v-if="hasNextPage" :loading="loading" @load-more="loadMore" />
      <p v-if="posters && posters.edges.length === 0 && !loading">
        Geen posters gevonden
      </p>
    </center-wrapper>
  </section>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import PosterList from '~/components/Posters/Shared/PosterList.vue'
import { usePosters } from '~/compositions/posters'
import LoadMore from '~/components/LoadMore/LoadMoreByScroll.vue'

export default {
  components: {
    LoadMore,
    PosterList,
    CenterWrapper,
  },
  props: {
    search: {
      type: String,
      default: null,
    },
    dateBefore: {
      type: String,
      default: null,
    },
    dateAfter: {
      type: String,
      default: null,
    },
    notIn: {
      type: Number,
      default: 0,
    },
    subjects: {
      type: Array,
      default: () => [],
    },
    sources: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default() {
        return this.$t('title')
      },
    },
  },
  setup(props) {
    const sources = computed(() => props.sources)
    const search = computed(() => props.search)
    const dateBefore = computed(() => props.dateBefore)
    const dateAfter = computed(() => props.dateAfter)
    const subjects = computed(() => props.subjects)
    const { posters, loading, error, loadMore, hasNextPage } = usePosters({
      search,
      subjects,
      sources,
      dateBefore,
      dateAfter,
      notIn: props.notIn,
    })

    return {
      posters,
      loading,
      error,
      loadMore,
      hasNextPage,
    }
  },
}
</script>

<i18n>
{
  "nl": {
    "title": "Posters"
  }
}
</i18n>
