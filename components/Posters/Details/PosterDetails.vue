<template>
  <div :class="$style['poster-details']">
    <article class="content">
      <h1 class="sr-only">{{ poster.title }}</h1>
      <app-image
        v-if="poster.featuredImage"
        :alt="poster.title"
        :src="poster.featuredImage.node.large"
        :class="$style.image"
      />
    </article>
    <div :class="$style['meta-data']">
      <app-date :date="poster.PosterMetaGroup.date" />

      <dl>
        <template v-if="poster.subjects.edges.length">
          <dt :class="$style['taxonomy-title']">Onderwerpen:</dt>
          <dd :class="$style['taxonomy-list']">
            <poster-filter-tags
              :list="poster.subjects.edges"
              :class="$style['tags-list']"
            />
          </dd>
        </template>

        <template v-if="poster.sources.edges.length">
          <dt :class="$style['taxonomy-title']">Bronnen:</dt>
          <dd :class="$style['taxonomy-list']">
            <poster-filter-tags
              :list="poster.sources.edges"
              :class="$style['tags-list']"
            />
          </dd>
        </template>
      </dl>

      <poster-favorites :poster="poster" />

      <div :class="$style['social-media']">
        <share-this
          :title="poster.title"
          :link="poster.link"
          :image="poster.featuredImage.node.large"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppDate from '~/components/Shared/AppDate.vue'
import AppImage from '~/components/Shared/AppImage.vue'
import PosterFavorites from '~/components/Posters/Details/PosterFavorites.vue'
import PosterFilterTags from '~/components/Posters/Tags/PosterTagsList.vue'
import ShareThis from '~/components/Posters/Shared/ShareThis.vue'

export default {
  components: {
    AppDate,
    AppImage,
    ShareThis,
    PosterFavorites,
    PosterFilterTags,
  },

  props: {
    poster: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="postcss" module>
.poster-details {
  display: grid;
  grid-gap: 1em;
  margin-bottom: 2em;

  @media (--viewport-sm) {
    grid-template-columns: 1fr 1fr;
  }
}

.image {
  --rough-stroke-width: 3px;
  --rough-roughness: 1.5;

  border: var(--rough-stroke-width) solid var(--rough-stroke);

  @nest .is-loaded & {
    @supports (border-image-source: paint(rough-boxes)) {
      border-image-source: paint(rough-boxes);
      border-image-slice: 0 fill;
      border-image-outset: 1em;
    }
  }
}

.meta-data {
  display: flex;
  flex-direction: column;
}

.taxonomy-title {
  font-weight: var(--font-weight-bold);
}

.taxonomy-list {
  margin-left: 0;
}

.tags-list {
  margin-bottom: 0;
}

.social-media {
  margin-top: auto;
}
</style>
