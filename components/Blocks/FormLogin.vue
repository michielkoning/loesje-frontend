<template>
  <div>
    <form class="form" @submit.prevent="login">
      <div class="wrapper">
        <form-fieldset title="Factuurgegevens">
          <form-input-text
            id="userName"
            v-model="userName"
            title="Gebruikersnaam of e-mailadres"
            type="text"
            class="userName"
            name="userName"
          />
          <form-input-text
            id="password"
            v-model="password"
            title="Wachtwoord"
            type="password"
            class="password"
            name="password"
          />
        </form-fieldset>
        <app-button type="submit">Inloggen</app-button>
        <p>{{ error }}</p>
        <p>{{ user }}</p>
      </div>
    </form>
    <form v-if="loggedIn" class="form" @submit.prevent="update">
      <div class="wrapper">
        <button @click="logout">Uitloggen</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { v4 } from 'uuid'
import FormFieldset from '~/components/Forms/FormFieldset.vue'
import FormInputText from '~/components/Forms/FormInputText.vue'
import AppButton from '~/components/Shared/AppButton.vue'
import LoginQuery from '~/graphql/Customer/Login.gql'
import UpdateCustomerMutation from '~/graphql/Customer/Update.gql'

export default {
  components: {
    AppButton,
    FormFieldset,
    FormInputText,
  },
  data() {
    return {
      userName: 'michiel',
      password: '8GJYBIMBqF9s*2D#rS',
      error: null,
      user: null,
    }
  },
  computed: {
    loggedIn() {
      return !!this.$apolloHelpers.getToken()
    },
  },
  methods: {
    ...mapActions({
      add: 'customer/add',
    }),
    async login() {
      try {
        const res = await this.$apollo.mutate({
          mutation: LoginQuery,
          variables: {
            input: {
              username: this.userName,
              password: this.password,
              clientMutationId: v4(),
            },
          },
        })
        await this.$apolloHelpers.onLogin(res.data.login.authToken)
        // const customer = { ...res.data.login.customer }
        // this.add(customer)
        // this.user = res.data.login.customer
      } catch (error) {
        this.error = error
      }
    },
    async logout() {
      await this.$apolloHelpers.onLogout()
    },
    async update() {
      try {
        const res = await this.$apollo.mutate({
          mutation: UpdateCustomerMutation,
          variables: {
            input: {
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              username: this.user.userName,
              id: this.user.id,
              clientMutationId: 'update',
            },
          },
        })
        this.user = res.data.updateCustomer.customer
      } catch (error) {
        this.error = error
      }
    },
  },
}
</script>

<style lang="postcss" scoped>
.form {
  @mixin block;

  & >>> .fields {
    grid-template-columns: repeat(2, 1fr);
  }
}

.wrapper {
  @mixin center;
}
</style>
