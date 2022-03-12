<template>
  <div class="page">
    <div class="content">
      <div class="flex items-center justify-between mb-8">
        <Back handler="Clientes" to="/" />
        <router-link to="/clients/add" class="">
          <img
            src="@/assets/svg/add-black.svg"
            alt="see client"
            class="w-6 h-6"
          />
        </router-link>
      </div>
      <div v-if="clients">
        <div
          v-for="(client, index) of clients"
          :key="index"
          class="p-4 mb-4 bg-blue-100 rounded-2xl flex items-center justify-between cursor-pointer"
          @click="seeDetails(client)"
        >
          <p>
            {{ client.name }}
          </p>
          <img
            src="@/assets/svg/up-arrow-black.svg"
            alt="see client"
            class="w-4 h-3 transform rotate-90"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import Back from '@/components/Back.vue'
export default {
  components: { Back },
  setup() {
    const store = useStore()
    const router = useRouter()

    onBeforeMount(async () => {
      await store.dispatch('fetchClients')
    })

    const clients = computed(() => {
      return store.state.clients.clients
    })

    const seeDetails = async (client) => {
      await store.dispatch('storeClient', client)
      router.push('/clients/details/' + client._id)
    }

    return {
      clients,
      seeDetails
    }
  }
}
</script>

<style lang="scss" scoped></style>
