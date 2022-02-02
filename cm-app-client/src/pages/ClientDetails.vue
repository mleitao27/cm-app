<template>
  <div class="pt-4 px-4">
    <router-link class="flex items-center mb-8" to="/clients">
      <img
        src="@/assets/svg/up-arrow-black.svg"
        alt="see client"
        class="w-4 h-3 transform -rotate-90 mr-4"
      />
      <p>Detalhes do clientes</p>
    </router-link>
    <div v-if="client" class="w-full bg-blue-100 rounded-2xl py-4">
      <div class="w-full flex itms-center justify-between px-4">
        <p>Nome</p>
        <p>{{ client.name }}</p>
      </div>
      <div class="w-full h-px my-4 bg-white" />
      <div class="w-full flex itms-center justify-between px-4">
        <p>Morada</p>
        <p>{{ client.address }}</p>
      </div>
      <div class="w-full h-px my-4 bg-white" />
      <div class="w-full flex itms-center justify-between px-4">
        <p>NIF</p>
        <p>{{ client.fiscalNumber }}</p>
      </div>
      <div class="w-full h-px my-4 bg-white" />
      <div class="w-full flex itms-center justify-between px-4">
        <p>Cliente desde</p>
        <p>{{ dateTimeFormatting(client.createdAt) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import useGlobalHelpers from '@/mixins/useGlobalHelpers.js'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const { dateTimeFormatting } = useGlobalHelpers()

    onBeforeMount(async () => {
      if (!client.value) await store.dispatch('fetchClient', route.params.id)
    })

    const client = computed(() => {
      return store.state.clients.client
    })

    return {
      client,
      dateTimeFormatting
    }
  }
}
</script>

<style lang="scss" scoped></style>
