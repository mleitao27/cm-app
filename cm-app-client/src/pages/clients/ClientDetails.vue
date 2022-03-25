<template>
  <div class="page">
    <div class="content" v-if="client">
      <div class="flex justify-between items-center mb-8">
        <Back handler="Detalhes do cliente" to="/clients" />
        <router-link :to="'/clients/edit/' + client._id"> Editar </router-link>
      </div>
      <Table :data="personTable(client)" />
      <!-- Service's details -->
      <div class="flex items-center justify-between my-4">
        <p>Serviço</p>
        <div class="flex items-center">
          <img
            @click="editService"
            src="@/assets/svg/edit-black.svg"
            alt="edit"
            class="w-4 h-4 cursor-pointer"
          />
          <img
            v-if="client.service && !showAddService"
            src="@/assets/svg/add-black.svg"
            alt="add"
            class="w-4 h-4 cursor-pointer ml-2"
            @click="() => (showAddService = true)"
          />
          <router-link
            v-if="client.service"
            class="ml-2 flex items-center"
            :to="'/clients/' + client._id + '/service-history'"
          >
            <p>Ver todos</p>
            <img
              src="@/assets/svg/up-arrow-black.svg"
              alt="go back"
              class="w-4 h-3 transform rotate-90 ml-2"
            />
          </router-link>
        </div>
      </div>
      <Table v-if="client.service" :data="serviceTable(client.service)" />
      <AddService
        v-if="!client.service || showAddService"
        :clientService="client.service"
        @set="setService"
        class="mt-8"
        addMore
      />
      <!-- Beneficiaries' details -->
      <div v-if="client.beneficiaries">
        <div class="flex items-center justify-between my-4">
          <p>Beneficiários</p>
          <div class="flex">
            <router-link :to="'/clients/edit/' + client._id + '/beneficiaries'">
              <img
                src="@/assets/svg/edit-black.svg"
                alt="edit"
                class="w-4 h-4 cursor-pointer mr-2"
              />
            </router-link>
            <img
              src="@/assets/svg/add-black.svg"
              alt="add"
              class="w-4 h-4 cursor-pointer"
              @click="() => (showAddBeneficiaries = true)"
            />
          </div>
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
        <AddBeneficiaries
          v-if="showAddBeneficiaries"
          :client="client"
          @set="setBeneficiaries"
          addMore
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import useGlobalHelpers from '@/mixins/useGlobalHelpers.js'

import Table from '@/components/Table.vue'
import Back from '@/components/Back.vue'
import AddService from '@/components/AddService.vue'
import AddBeneficiaries from '@/components/AddBeneficiaries.vue'

export default {
  components: {
    Table,
    Back,
    AddService,
    AddBeneficiaries
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { dateTimeFormatting, personTable, serviceTable } = useGlobalHelpers()
    const showAddBeneficiaries = ref(false)
    const showAddService = ref(false)

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
      showAddService.value = false
    }

    const setBeneficiaries = async (newBeneficiary) => {
      await store.dispatch('addBeneficiary', {
        clientId: route.params.id,
        beneficiary: newBeneficiary
      })
      await store.dispatch('fetchClient', route.params.id)
      showAddBeneficiaries.value = false
    }

    return {
      client,
      dateTimeFormatting,
      personTable,
      serviceTable,
      editService,
      setService,
      setBeneficiaries,
      showAddBeneficiaries,
      showAddService
    }
  }
}
</script>

<style lang="scss" scoped></style>
