<template>
  <div>
    <p class="text-pink-400">CLIENTES</p>
    <router-link to="/">HOME</router-link>
    <div>
      <button @click="fetchClients">FETCH</button>
    </div>
    <div v-if="clients">
      <p v-for="(client, index) of clients" :key="index">
        {{ client.name }}
      </p>
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
