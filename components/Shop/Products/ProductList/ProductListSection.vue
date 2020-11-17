<template>
  <products-container :category="category" :product-ids="databaseIds">
    <template #default="data">
      <product-list v-if="data" :products="data.products" />
    </template>
  </products-container>
</template>

<script>
import ProductsContainer from '~/components/Shop/Products/Data/ProductsContainer.vue'
import ProductList from '~/components/Shop/Products/Shared/ProductList.vue'

export default {
  components: {
    ProductsContainer,
    ProductList,
  },
  props: {
    category: {
      type: Number,
      default: 0,
    },
    relatedProducts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    databaseIds() {
      if (this.relatedProducts.length) {
        return this.relatedProducts.map((product) => product.node.databaseId)
      }
      return []
    },
  },
}
</script>
