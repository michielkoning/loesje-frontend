<template>
  <nuxt-link
    :to="to"
    :class="$style['read-more']"
    class="read-more"
    aria-hidden="true"
  >
    {{ $t('readMore') }}
    <app-icon
      icon="chevron-right"
      :class="$style.icon"
      class="icon"
      width="16"
      height="16"
    />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" module>
.icon {
  transition: margin 0.2s ease-out;
  transform: translate3d(2px, 2px, 0);
}

.read-more {
  color: inherit;
  text-decoration: none;
  box-shadow: 0 2px 0 0 currentColor;
  transition: box-shadow 0.2s ease-out;

  &:hover {
    box-shadow: 0 3px 0 0 currentColor;

    & .icon {
      margin-left: 0.25em;
    }
  }
}
</style>

<i18n>
{
  "nl": {
    "readMore": "Lees verder"
  }
}
</i18n>
