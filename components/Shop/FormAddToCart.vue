<template>
  <form class="form" @submit.prevent="addToCart">
    <form-fieldset title="In winkelmandje">
      <form-input-text
        id="quantity"
        v-model="quantity"
        title="Aantal"
        type="number"
        class="quantity"
        name="quantity"
      />

      <div v-if="product.attributes && product.attributes.edges.length">
        <div
          v-for="attribute in product.attributes.edges"
          :key="attribute.node.attributeId"
        >
          <form-select
            :id="attribute.node.name"
            v-model="selectedAttribute"
            :name="attribute.node.name"
            :title="attribute.node.name"
          >
            <option
              v-for="option in attribute.node.options"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </form-select>
        </div>
      </div>
    </form-fieldset>
    <app-button type="submit">In winkelmandje</app-button>
  </form>
</template>

<script>
import FormSelect from '~/components/Forms/FormSelect.vue'
import FormFieldset from '~/components/Forms/FormFieldset.vue'
import FormInputText from '~/components/Forms/FormInputText.vue'
import AppButton from '~/components/Shared/AppButton.vue'
import AddToCartQuery from '~/graphql/Shop/Cart/AddToCart.gql'
import CartQuery from '~/graphql/Shop/Cart/Cart.gql'

export default {
  components: {
    AppButton,
    FormFieldset,
    FormInputText,
    FormSelect,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedAttribute: null,
      quantity: 1,
    }
  },
  methods: {
    async addToCart() {
      await this.$apollo.mutate({
        mutation: AddToCartQuery,
        variables: {
          input: {
            databaseId: this.product.databaseId,
            clientMutationId: 'AddToCart',
            quantity: this.quantity,
          },
        },
        update: (store, { data: { addToCart } }) => {
          store.writeQuery({
            query: CartQuery,
            data: addToCart,
          })
        },
      })
    },
  },
}
</script>

<style lang="postcss" scoped>
.form {
  & >>> .fields {
    grid-template-columns: repeat(2, 1fr);
  }
}

.wrapper {
  @mixin center;
}
</style>
