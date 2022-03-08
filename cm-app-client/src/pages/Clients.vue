<template>
  <div class="pt-4 px-4">
    <Back handler="Clientes" :route="-1" />
    <div class="flex items-center mb-8">
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
        class="p-4 mb-4 bg-blue-100 rounded-2xl flex items-center justify-between"
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
