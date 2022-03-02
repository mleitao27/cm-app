<template>
  <div class="pt-4 px-4" v-if="client">
    <div class="flex justify-between items-center mb-8">
      <router-link class="flex items-center" to="/clients">
        <img
          src="@/assets/svg/up-arrow-black.svg"
          alt="see client"
          class="w-4 h-3 transform -rotate-90 mr-4"
        />
        <p>Detalhes do cliente</p>
      </router-link>
      <router-link :to="'/clients/edit/' + client._id"> Editar </router-link>
    </div>
    <Table :data="personTable(client)" />
    <!-- Beneficiaries' details -->
    <div v-if="client.beneficiaries">
      <p class="my-4">Beneficiários</p>
      <Table
        v-for="(beneficiary, index) in client.beneficiaries"
        :key="index"
        :data="personTable(beneficiary)"
        minimizable
        class="mb-4"
      />
    </div>
    <!-- Service's details -->
    <div v-if="client.service">
      <p class="mb-4">Serviço</p>
      <Table :data="serviceTable(client.service)" />
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import useGlobalHelpers from '@/mixins/useGlobalHelpers.js'
import Table from '@/components/Table.vue'
export default {
  components: {
    Table
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const { dateTimeFormatting, personTable, serviceTable } = useGlobalHelpers()

    onBeforeMount(async () => {
      await store.dispatch('fetchClient', route.params.id)
    })

    const client = computed(() => {
      return store.state.clients.client
    })

    return {
      client,
      dateTimeFormatting,
      personTable,
      serviceTable
    }
  }
}
</script>

<style lang="scss" scoped></style>
