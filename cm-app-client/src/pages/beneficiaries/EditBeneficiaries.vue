<template>
  <div class="page">
    <div class="content" v-if="beneficiaries && data">
      <Back handler="Edit beneficiários" :to="-1" class="mb-8" />
      <div class="flex flex-col">
        <div
          v-for="(beneficiary, index) in beneficiaries"
          :key="index"
          :class="{ 'order-first': beneficiary.isClient }"
        >
          <div class="flex justify-between" v-if="beneficiary.isClient">
            <Table :data="personTable(beneficiary)" class="mb-4 flex-grow" />
            <img
              src="@/assets/svg/trash-black.svg"
              alt="remove beneficiary"
              class="w-8 h-8 cursor-pointer"
              @click="deleteBeneficiary(beneficiary._id)"
            />
          </div>
          <PersonForm v-else v-model:data="data[index]" />
        </div>
      </div>
      <div class="w-full flex justify-center">
        <button
          @click="update"
          class="px-4 py-2 rounded-2xl bg-blue-300 font-bold"
        >
          Atualizar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import useGlobalHelpers from '@/mixins/useGlobalHelpers.js'

import Back from '@/components/Back.vue'
import PersonForm from '@/components/PersonForm.vue'
import Table from '@/components/Table.vue'
export default {
  components: {
    Back,
    PersonForm,
    Table
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const data = ref(null)
    const { personTable } = useGlobalHelpers()

    onBeforeMount(async () => {
      if (!store.state.clients.client)
        await store.dispatch('fetchClient', route.params.id)
      data.value = beneficiaries.value
    })

    const beneficiaries = computed(() => {
      return store.state.clients.client
        ? store.state.clients.client.beneficiaries
        : null
    })

    const update = async () => {
      await data.value.map(async (b) => {
        await store.dispatch('updateBeneficiary', b)
      })
      router.go(-1)
    }

    const deleteBeneficiary = async (beneficiaryId) => {
      await store.dispatch('deleteBeneficiary', beneficiaryId)
      router.go(-1)
    }

    return {
      beneficiaries,
      data,
      personTable,
      update,
      deleteBeneficiary
    }
  }
}
</script>

<style lang="scss" scoped></style>
