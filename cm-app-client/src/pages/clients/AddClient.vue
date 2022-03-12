<template>
  <div class="page">
    <div class="content">
      <Back handler="Adicionar cliente" to="/clients" class="mb-8" />
      <!-- Client -->
      <div class="mb-8">
        <p>Dados do cliente</p>
        <PersonForm v-model:data="data" />
      </div>
      <!-- Beneficiaries -->
      <div class="mb-8">
        <div class="w-full flex items-center justify-between">
          <p>Beneficiários</p>
          <img
            src="@/assets/svg/add-black.svg"
            alt="add beneficiary"
            class="w-6 h-6 cursor-pointer"
            @click="nextBeneficiary"
          />
        </div>
        <!-- Beneficiaries list -->
        <div
          v-for="beneficiary in data.beneficiaries"
          :key="beneficiary.fiscalNumber"
          class="w-full flex items-center justify-between"
        >
          <div class="bg-blue-100 p-4 mb-4 rounded-2xl">
            {{ beneficiary }}
          </div>
          <img
            src="@/assets/svg/trash-black.svg"
            alt="remove beneficiary"
            class="w-8 h-8"
            @click="removeBeneficiary(beneficiary.fiscalNumber)"
          />
        </div>
        <!-- Include client as beneficiary checkbox -->
        <div
          v-if="data.beneficiaries && data.beneficiaries.length && clientFilled"
          class="flex items-center"
        >
          <img
            v-if="!clientAsBeneficiary"
            src="@/assets/svg/accept-black.svg"
            alt="check"
            class="w-6 h-6 mr-2"
            @click="addClientAsBeneficiary"
          />
          <img
            v-else
            src="@/assets/svg/accepted-black.svg"
            alt="checked"
            class="w-6 h-6 mr-2"
            @click="removeClientAsBeneficiary"
          />
          <p>Adicionar cliente como beneficiário(a)</p>
        </div>
        <div
          v-if="showBeneficiaryForm"
          class="w-full flex items-center justify-between"
        >
          <PersonForm v-model:data="currentBeneficiary" />
          <img
            v-if="beneficiaryFilled"
            src="@/assets/svg/accept-black.svg"
            alt="add beneficiary"
            class="w-6 h-6"
            @click="confirmBeneficiary"
          />
        </div>
      </div>
      <!-- Add service -->
      <div class="mb-8">
        <div class="w-full flex items-center justify-between">
          <p>Serviço</p>
          <img
            v-if="!data.service"
            src="@/assets/svg/add-black.svg"
            alt="add beneficiary"
            class="w-6 h-6 cursor-pointer"
            @click="() => (showServiceForm = true)"
          />
        </div>
        <div
          v-if="showServiceForm"
          class="w-full flex items-center justify-between"
        >
          <ServiceForm v-model:data="service" />
          <img
            v-if="serviceFilled"
            src="@/assets/svg/accept-black.svg"
            alt="add beneficiary"
            class="w-6 h-6"
            @click="confirmService"
          />
        </div>
        <div
          v-else-if="data.service"
          class="w-full flex items-center justify-between"
        >
          <div class="bg-blue-100 p-4 mb-4 rounded-2xl">
            {{ data.service }}
          </div>
          <img
            src="@/assets/svg/trash-black.svg"
            alt="remove service"
            class="w-8 h-8"
            @click="removeService"
          />
        </div>
      </div>
      <div class="w-full flex justify-center">
        <button
          @click="add"
          class="px-4 py-2 rounded-2xl bg-blue-300 font-bold"
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
import ServiceForm from '@/components/ServiceForm.vue'
import Back from '@/components/Back.vue'
export default {
  components: {
    PersonForm,
    ServiceForm,
    Back
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const data = ref({
      name: null,
      address: null,
      fiscalNumber: null,
      beneficiaries: null,
      sevice: null
    })

    const showBeneficiaryForm = ref(false)
    const currentBeneficiary = ref({
      name: null,
      address: null,
      fiscalNumber: null,
      isClient: false
    })

    const add = () => {
      store.dispatch('addClient', {
        name: data.value.name,
        address: data.value.address,
        fiscalNumber: data.value.fiscalNumber,
        beneficiaries: data.value.beneficiaries,
        service: data.value.service
      })
      router.push('/clients')
    }

    const nextBeneficiary = () => {
      if (!showBeneficiaryForm.value) showBeneficiaryForm.value = true
    }

    const confirmBeneficiary = () => {
      if (data.value.beneficiaries) {
        // Search for beneficiary with same fiscal number
        const found = data.value.beneficiaries.find(
          (b) => b.fiscalNumber === currentBeneficiary.value.fiscalNumber
        )
        if (found) {
          console.log(
            'ERROR: Already exist a beneficiary with this fiscal number'
          )
          return
        }
        // Add beneficiary
        data.value.beneficiaries.push(currentBeneficiary.value)
      } else data.value.beneficiaries = [currentBeneficiary.value]

      // Hide form
      showBeneficiaryForm.value = false

      // Reset current beneficiary
      currentBeneficiary.value = {
        name: null,
        address: null,
        fiscalNumber: null,
        isClient: false
      }
    }

    const removeBeneficiary = (fiscalNumber) => {
      data.value.beneficiaries = data.value.beneficiaries.filter(
        (beneficiary) => {
          return beneficiary.fiscalNumber !== fiscalNumber
        }
      )
    }

    // Client as beneficiary
    const clientAsBeneficiary = ref(false)

    const addClientAsBeneficiary = () => {
      data.value.beneficiaries.push({
        name: data.value.name,
        address: data.value.address,
        fiscalNumber: data.value.fiscalNumber,
        isClient: true
      })
      clientAsBeneficiary.value = true
    }

    const removeClientAsBeneficiary = () => {
      data.value.beneficiaries = data.value.beneficiaries.filter((b) => {
        return b.fiscalNumber !== data.value.fiscalNumber
      })
      clientAsBeneficiary.value = false
    }

    const clientFilled = computed(() => {
      return data.value.name && data.value.address && data.value.fiscalNumber
    })

    const beneficiaryFilled = computed(() => {
      return (
        currentBeneficiary.value.name &&
        currentBeneficiary.value.address &&
        currentBeneficiary.value.fiscalNumber
      )
    })

    // Service form
    const service = ref({
      type: null,
      regime: null,
      shifts: null,
      beginning: null,
      duration: null
    })

    const showServiceForm = ref(false)

    const serviceFilled = computed(() => {
      return (
        service.value.type &&
        service.value.regime &&
        service.value.shifts &&
        service.value.beginning &&
        service.value.duration
      )
    })

    const confirmService = () => {
      data.value.service = service.value
      showServiceForm.value = false
    }

    const removeService = () => {
      data.value.service = null
    }

    return {
      add,
      data,
      nextBeneficiary,
      currentBeneficiary,
      showBeneficiaryForm,
      confirmBeneficiary,
      removeBeneficiary,
      clientAsBeneficiary,
      addClientAsBeneficiary,
      removeClientAsBeneficiary,
      clientFilled,
      service,
      showServiceForm,
      beneficiaryFilled,
      serviceFilled,
      confirmService,
      removeService
    }
  }
}
</script>

<style lang="scss" scoped></style>
