<template>
  <section
    :class="$style['related-posters']"
    aria-labelledby="related-posters-title"
  >
    <center-wrapper>
      <h1 id="related-posters-title" :class="$style.title">
        {{ title }}
      </h1>
    </center-wrapper>
    <center-wrapper size="full">
      <app-loader v-if="loading" />
      <related-posters-list
        v-if="posters && posters.edges.length"
        :posters="posters.edges"
      />
    </center-wrapper>
    <center-wrapper :class="$style['btn-wrapper']">
      <app-button to="/posters">{{ btnText }}</app-button>
    </center-wrapper>
  </section>
</template>

<script>
import AppButton from '~/components/Shared/AppButton.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import RelatedPostersList from '~/components/Posters/RelatedPosters/RelatedPostersList.vue'
import { usePosters } from '~/compositions/posters'

export default {
  components: {
    AppButton,
    CenterWrapper,
    RelatedPostersList,
  },
  props: {
    relatedPosters: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    let subjects = []
    if (props.relatedPosters.subjects?.length) {
      subjects = props.relatedPosters.subjects.map(
        (subject) => subject.databaseId,
      )
    }

    let posterIds = []
    if (props.relatedPosters.posters) {
      posterIds = props.relatedPosters.posters.map(
        (poster) => poster.poster.databaseId,
      )
    }

    const { posters, loading, error } = usePosters({
      first: 5,
      search: props.relatedPosters.search,
      subjects,
      posterIds,
    })

    return {
      posters,
      loading,
      error,
    }
  },
  computed: {
    title() {
      return this.relatedPosters.title || this.$t('title')
    },
    btnText() {
      let text = this.$t('btnText')
      if (this.relatedPosters.subjects?.length === 1) {
        const { name } = this.relatedPosters.subjects[0]
        text += this.$t('aboutSubject', { subject: name })
      }
      return text
    },
  },
}
</script>

<style lang="postcss" module>
.related-posters {
  padding: 3em 0;
  background: url('/images/backgrounds/wall.jpg');
}

.title {
  text-align: center;
}

.btn-wrapper {
  text-align: right;
}
</style>

<i18n>
{
  "nl": {
    "title": "Posters",
    "btnText": "Bekijk alle posters",
    "aboutSubject": " over {subject}"
  }
}
</i18n>
