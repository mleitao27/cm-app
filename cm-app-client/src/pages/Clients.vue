<template>
  <div class="pt-4 px-4">
    <router-link class="flex items-center mb-8" to="/">
      <img
        src="@/assets/svg/up-arrow-black.svg"
        alt="see client"
        class="w-4 h-3 transform -rotate-90 mr-4"
      />
      <p>Clientes</p>
    </router-link>
    <div class="flex justify-between items-center mb-8">
      <button
        @click="fetchClients"
        class="px-4 py-2 rounded-2xl bg-blue-300 font-bold"
      >
        Carregar clientes
      </button>
      <router-link to="/clients/add" class="">
        <img
          src="@/assets/svg/add-black.svg"
          alt="see client"
          class="w-8 h-8"
        />
      </router-link>
    </div>
    <div v-if="clients">
      <div
        v-for="(client, index) of clients"
        :key="index"
        class="p-4 mb-4 bg-blue-100 rounded-2xl"
      >
        <p>
          {{ client.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup() {
    const store = useStore()
    const fetchClients = () => {
      store.dispatch('fetchClients')
    }
    const clients = computed(() => {
      return store.state.clients.clients
    })
    return { fetchClients, clients }
  }
}
</script>

<style lang="scss" scoped></style>
