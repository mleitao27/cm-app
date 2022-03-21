<template>
  <div class="page">
    <div class="content">
      <Back handler="Adicionar cliente" to="/clients" class="mb-8" />
      <!-- Client -->
      <div class="mb-8">
        <p>Dados do cliente</p>
        <PersonForm v-model:data="data" />
      </div>
      <!-- Add service -->
      <AddService v-if="clientFilled" v-model:clientService="data.service" />
      <!-- Beneficiaries -->
      <!-- Receives all data bc it needs beneficiaries and client details -->
      <AddBeneficiaries v-if="clientFilled" v-model:client="data" />
      <div class="w-full flex justify-center">
        <button
          @click="add"
          class="px-4 py-2 rounded-2xl bg-blue-300 font-bold"
          :disabled="!clientFilled"
        >
          Adicionar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import PersonForm from '@/components/PersonForm.vue'
import AddService from '@/components/AddService.vue'
import AddBeneficiaries from '@/components/AddBeneficiaries.vue'
import Back from '@/components/Back.vue'
export default {
  components: {
    PersonForm,
    AddService,
    Back,
    AddBeneficiaries
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const data = ref({
      name: null,
      address: null,
      fiscalNumber: null,
      beneficiaries: null,
      service: null
    })

    const add = async () => {
      await store.dispatch('addClient', {
        name: data.value.name,
        address: data.value.address,
        fiscalNumber: data.value.fiscalNumber,
        beneficiaries: data.value.beneficiaries,
        service: data.value.service
      })
      router.push('/clients')
    }

    const clientFilled = computed(() => {
      return data.value.name && data.value.address && data.value.fiscalNumber
    })

    return {
      add,
      data,
      clientFilled
    }
  }
}
</script>

<style lang="scss" scoped></style>
