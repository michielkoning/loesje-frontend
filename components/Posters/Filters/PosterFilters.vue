<template>
  <div class="filter">
    <div class="buttons">
      <posters-filter-toggle
        :is-active="showSources"
        class="filter-item"
        @toggle="toggleList('sources')"
      >
        Bronnen
      </posters-filter-toggle>
      <posters-filter-toggle
        :is-active="showSubjects"
        class="filter-item"
        @toggle="toggleList('subjects')"
      >
        Onderwerpen
      </posters-filter-toggle>
      <div class="filter-item">
        <div class="form-item-2">
          <label for="date-after">Van</label>
          <input
            id="date-after"
            v-model="dateAfter"
            type="date"
            name="date-after"
            placeholder="Datum tot"
            :min="dateBefore ? dateBefore : '1983-01-01'"
            :max="today"
          />
        </div>
      </div>

      <div class="filter-item">
        <div class="form-item-2">
          <label for="date-before">Voor</label>
          <input
            id="date-before"
            v-model="dateBefore"
            type="date"
            name="date-before"
            placeholder="Datum van"
            min="1983-01-01"
            :max="dateAfter ? dateAfter : today"
          />
        </div>
      </div>
    </div>

    <slide-in-animation mode="out-in">
      <div v-if="showSources" key="sources" class="tags" tabindex="-1">
        <center-wrapper>
          <poster-filter-tags :list="sources" />
        </center-wrapper>
      </div>

      <div v-if="showSubjects" key="subjects" class="tags" tabindex="-1">
        <center-wrapper>
          <poster-filter-tags :list="subjects" />
        </center-wrapper>
      </div>
    </slide-in-animation>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PostersFilterToggle from '~/components/Posters/Filters/PosterFilterToggle.vue'
import SlideInAnimation from '~/components/Animations/SlideInAnimation.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'
import PosterFilterTags from '~/components/Posters/Tags/PosterTagsList.vue'

export default {
  components: {
    PostersFilterToggle,
    SlideInAnimation,
    CenterWrapper,
    PosterFilterTags,
  },
  data() {
    return {
      showSubjects: false,
      showSources: false,
      selectedTags: [],
    }
  },
  computed: {
    ...mapGetters('tags', ['sources', 'subjects']),
    dateBefore: {
      get() {
        return this.$store.state.tags.dateBefore
      },
      set(value) {
        this.$store.commit('tags/updatedateBefore', value)
      },
    },
    dateAfter: {
      get() {
        return this.$store.state.tags.dateAfter
      },
      set(value) {
        this.$store.commit('tags/updatedateAfter', value)
      },
    },
    today() {
      const now = new Date()
      let month = now.getMonth() + 1
      let day = now.getDate()
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return now.getFullYear() + '-' + month + '-' + day
    },
  },

  methods: {
    toggleList(type) {
      if (type === 'subjects') {
        this.showSubjects = !this.showSubjects
        this.showSources = false
      } else {
        this.showSources = !this.showSources
        this.showSubjects = false
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.filter {
  position: relative;
}

.buttons {
  @mixin tile-border 1px, 1;

  display: flex;
  margin-bottom: 1em;
  flex-wrap: wrap;
}

.filter-item {
  border-bottom: 1px solid var(--color-black);
  flex: 0 0 auto;
  width: 100%;
  padding: 0 1em;

  &:last-child {
    border-bottom: 0;
  }

  @media (--viewport-sm) {
    width: 50%;

    &:nth-child(2n + 1) {
      border-right: 1px solid var(--color-black);
    }

    &:nth-child(3) {
      border-bottom: 0;
    }
  }

  @media (--viewport-md) {
    width: 25%;
    border-bottom: 0;

    &:nth-child(2) {
      border-right: 1px solid var(--color-black);
    }
  }
}

.tags {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  padding: 1em 0 0;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
}

.form-item-2 {
  display: flex;
  align-items: center;

  & label {
    margin: 0;
  }

  & input {
    flex: 1 1 auto;
    margin-left: 0.25em;
    border: 0;
  }
}
</style>
