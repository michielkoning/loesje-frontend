<template>
  <center-wrapper :class="$style.wrapper" size="md">
    <article :class="$style.post">
      <h1>{{ title }}</h1>
      <post-date v-if="date" :date="date" :class="$style.date" />
      <!-- eslint-disable-next-line -->
      <div class="text" v-html="content" />
    </article>
  </center-wrapper>
</template>

<script>
import PostDate from '~/components/Posts/Shared/PostDate.vue'
import CenterWrapper from '~/components/Wrappers/CenterWrapper.vue'

export default {
  components: {
    PostDate,
    CenterWrapper,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="postcss" module>
.post {
  @mixin block;

  display: flex;
  flex-direction: column;
}
</style>
