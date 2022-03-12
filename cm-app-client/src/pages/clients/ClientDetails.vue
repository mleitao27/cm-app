<template>
  <div class="page">
    <div class="content" v-if="client">
      <div class="flex justify-between items-center mb-8">
        <Back handler="Detalhes do cliente" to="/clients" />
        <router-link :to="'/clients/edit/' + client._id"> Editar </router-link>
      </div>
      <Table :data="personTable(client)" />
      <!-- Service's details -->
      <div v-if="client.service">
        <div class="flex items-center justify-between my-4">
          <p>Serviço</p>
          <div class="flex">
            <router-link
              :to="'/services/edit/' + client.service._id"
              class="mr-2"
            >
              <img
                src="@/assets/svg/edit-black.svg"
                alt="edit"
                class="w-4 h-4 cursor-pointer"
              />
            </router-link>
            <router-link to="/" class="flex items-center">
              <img
                src="@/assets/svg/add-black.svg"
                alt="add"
                class="w-4 h-4 cursor-pointer"
              />
            </router-link>
          </div>
        </div>
        <Table :data="serviceTable(client.service)" />
      </div>
      <!-- Beneficiaries' details -->
      <div v-if="client.beneficiaries">
        <div class="flex items-center justify-between my-4">
          <p>Beneficiários</p>
          <router-link :to="'/clients/edit/' + client._id + '/beneficiaries'">
            <img
              src="@/assets/svg/edit-black.svg"
              alt="edit"
              class="w-4 h-4 cursor-pointer"
            />
          </router-link>
        </div>
        <div class="flex flex-col">
          <Table
            v-for="(beneficiary, index) in client.beneficiaries"
            :key="index"
            :data="personTable(beneficiary)"
            minimizable
            class="mb-4"
            :class="{ 'order-first': beneficiary.isClient }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount } from '@vue/runtime-core'
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
