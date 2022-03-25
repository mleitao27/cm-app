<template>
  <div class="page">
    <div class="content" v-if="services">
      <Back handler="Detalhes do cliente" :to="-1" class="mb-8" />
      <div
        v-for="service in services"
        :key="service._id"
        class="flex items-center mb-4"
      >
        <Table :data="serviceTable(service)" class="flex-grow" />
        <div>
          <img
            v-if="service.isActive"
            src="@/assets/svg/accepted-black.svg"
            alt="accepted beneficiary"
            class="w-6 h-6"
          />
          <img
            v-else
            src="@/assets/svg/accept-black.svg"
            alt="accept beneficiary"
            class="w-6 h-6 cursor-pointer"
            @click="activateService(service._id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import useGlobalHelpers from '@/mixins/useGlobalHelpers.js'

import Table from '@/components/Table.vue'
import Back from '@/components/Back.vue'

export default {
  components: {
    Table,
    Back
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const { serviceTable } = useGlobalHelpers()

    onBeforeMount(async () => {
      await store.dispatch('fetchClientServices', route.params.id)
    })

    const services = computed(() => {
      return store.state.clients.services
    })

    const activateService = async (serviceId) => {
      await store.dispatch('activateService', serviceId)
      await store.dispatch('fetchClientServices', route.params.id)
    }

    return {
      services,
      serviceTable,
      activateService
    }
  }
}
</script>

<style lang="scss" scoped></style>
