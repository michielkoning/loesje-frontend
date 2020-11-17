<template>
  <div :class="$style.posters">
    <center-wrapper>
      <poster-filters />
      <posters-auto-complete />
      <poster-tags-list :list="selectedTags" />
    </center-wrapper>
    <posters-overview-section
      :sources="selectedSourceIds"
      :subjects="selectedSubjectIds"
      :search="search"
      :date-before="dateBefore"
      :date-after="dateAfter"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('tags', ['selectedTags', 'search', 'dateBefore', 'dateAfter']),
    ...mapGetters('tags', ['selectedSourceIds', 'selectedSubjectIds']),
  },
  nuxtI18n: {
    paths: {
      nl: '/posters',
    },
  },
}
</script>

<style lang="postcss" module>
.posters {
  @mixin block;
}
</style>
