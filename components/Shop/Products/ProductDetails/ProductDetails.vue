<template>
  <div>
    <div class="product-details">
      <product-gallery :images="gallery" />
      <div class="content">
        <h1>{{ product.name }}</h1>

        <!-- eslint-disable-next-line -->
        <div v-html="product.shortDescription"></div>
        <div class="prices">
          {{ product.regularPrice }} - {{ product.salesPrice }} -
          {{ product.stockStatus }}
          {{ product.price }}
          {{ product.databaseId }}
        </div>
        <form-add-to-cart :product="product" />
      </div>
    </div>
    <!-- eslint-disable-next-line -->
    <div class="description" v-html="product.description"></div>
  </div>
</template>

<script>
import FormAddToCart from '~/components/Shop/FormAddToCart.vue'
import ProductGallery from '~/components/Shop/Products/ProductDetails/ProductGallery.vue'

export default {
  components: {
    FormAddToCart,
    ProductGallery,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    gallery() {
      if (this.product.image) {
        if (this.product.galleryImages.nodes.length) {
          return [this.product.image, ...this.product.galleryImages.nodes]
        }
        return [this.product.image]
      }
      return []
    },
  },
}
</script>

<style scoped lang="postcss">
.product-details {
  margin: 0 0 1em;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  align-items: start;
}
</style>
