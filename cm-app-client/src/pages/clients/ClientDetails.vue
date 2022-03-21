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
            <img
              @click="editService"
              src="@/assets/svg/edit-black.svg"
              alt="edit"
              class="w-4 h-4 cursor-pointer mr-2"
            />
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
      <AddService
        v-else
        :clientService="client.service"
        @set="setService"
        class="mt-8"
      />
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
import { useRoute, useRouter } from 'vue-router'

import useGlobalHelpers from '@/mixins/useGlobalHelpers.js'

import Table from '@/components/Table.vue'
import Back from '@/components/Back.vue'
import AddService from '@/components/AddService.vue'

export default {
  components: {
    Table,
    Back,
    AddService
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { dateTimeFormatting, personTable, serviceTable } = useGlobalHelpers()

    onBeforeMount(async () => {
      await store.dispatch('fetchClient', route.params.id)
    })

    const client = computed(() => {
      return store.state.clients.client
    })

    const editService = async () => {
      if (!client.value.service)
        await store.dispatch('fetchClient', route.params.id)
      router.push('/services/edit/' + client.value.service._id)
    }

    const setService = async (newService) => {
      await store.dispatch('addService', {
        clientId: route.params.id,
        service: newService
      })
      await store.dispatch('fetchClient', route.params.id)
    }

    return {
      client,
      dateTimeFormatting,
      personTable,
      serviceTable,
      editService,
      setService
    }
  }
}
</script>

<style lang="scss" scoped></style>
