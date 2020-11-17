<template>
  <div :class="$style.wrapper">
    <center-wrapper>
      <list-animation :class="$style.list">
        <li
          v-for="poster in posters"
          :key="poster.node.id"
          :class="$style['list-item']"
        >
          <poster-tile :poster="poster.node" />
        </li>
      </list-animation>
    </center-wrapper>
  </div>
</template>

<script>
import PosterTile from '~/components/Posters/Shared/PosterTile.vue'
import ListAnimation from '~/components/Animations/ListAnimation.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    CenterWrapper,
    PosterTile,
    ListAnimation,
  },
  props: {
    posters: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss" module>
.wrapper {
  background: url('/images/backgrounds/wall.jpg');
}

.list {
  @mixin list-reset;

  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);

  @media (--viewport-sm) {
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  }
}
</style>
