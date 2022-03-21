<template>
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
      v-for="beneficiary in dataState.beneficiaries"
      :key="beneficiary._id"
      class="w-full flex items-center justify-between"
    >
      <div class="bg-blue-100 p-4 mb-4 rounded-2xl">
        {{ beneficiary }}
      </div>
      <img
        src="@/assets/svg/trash-black.svg"
        alt="remove beneficiary"
        class="w-8 h-8 cursor-pointer"
        @click="removeBeneficiary(beneficiary.fiscalNumber)"
      />
    </div>
    <!-- Include client as beneficiary checkbox -->
    <div
      v-if="
        dataState.beneficiaries &&
        dataState.beneficiaries.length &&
        !clientAlreadyBeneficiary &&
        clientFilled
      "
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
        class="w-6 h-6 cursor-pointer"
        @click="confirmBeneficiary"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useVModel } from 'vue-composable'

import PersonForm from '@/components/PersonForm.vue'

export default {
  components: {
    PersonForm
  },
  props: {
    client: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const dataState = useVModel(props, 'client')
    const showBeneficiaryForm = ref(false)
    const currentBeneficiary = ref({
      name: null,
      address: null,
      fiscalNumber: null,
      isClient: false
    })

    const nextBeneficiary = () => {
      if (!showBeneficiaryForm.value) showBeneficiaryForm.value = true
    }

    const confirmBeneficiary = () => {
      if (dataState.value.beneficiaries) {
        // Search for beneficiary with same fiscal number
        const found = dataState.value.beneficiaries.find(
          (b) => b.fiscalNumber === currentBeneficiary.value.fiscalNumber
        )
        if (found) {
          console.log(
            'ERROR: Already exist a beneficiary with this fiscal number'
          )
          return
        }
        // Add beneficiary
        dataState.value.beneficiaries.push(currentBeneficiary.value)
      } else dataState.value.beneficiaries = [currentBeneficiary.value]

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
      dataState.value.beneficiaries = dataState.value.beneficiaries.filter(
        (beneficiary) => {
          return beneficiary.fiscalNumber !== fiscalNumber
        }
      )
      if (fiscalNumber === dataState.value.fiscalNumber)
        clientAsBeneficiary.value = false
    }

    // Client as beneficiary
    const clientAsBeneficiary = ref(false)

    const addClientAsBeneficiary = () => {
      dataState.value.beneficiaries.push({
        name: dataState.value.name,
        address: dataState.value.address,
        fiscalNumber: dataState.value.fiscalNumber,
        isClient: true
      })
      clientAsBeneficiary.value = true
    }

    const removeClientAsBeneficiary = () => {
      dataState.value.beneficiaries = dataState.value.beneficiaries.filter(
        (b) => {
          return b.fiscalNumber !== dataState.value.fiscalNumber
        }
      )
      clientAsBeneficiary.value = false
    }

    const clientFilled = computed(() => {
      return (
        dataState.value.name &&
        dataState.value.address &&
        dataState.value.fiscalNumber
      )
    })

    const beneficiaryFilled = computed(() => {
      return (
        currentBeneficiary.value.name &&
        currentBeneficiary.value.address &&
        currentBeneficiary.value.fiscalNumber
      )
    })

    const clientAlreadyBeneficiary = computed(() => {
      return dataState.value.beneficiaries.find(
        (b) => b.fiscalNumber === dataState.value.fiscalNumber
      )
    })

    return {
      nextBeneficiary,
      currentBeneficiary,
      showBeneficiaryForm,
      confirmBeneficiary,
      removeBeneficiary,
      clientAsBeneficiary,
      addClientAsBeneficiary,
      removeClientAsBeneficiary,
      clientFilled,
      beneficiaryFilled,
      dataState,
      clientAlreadyBeneficiary
    }
  }
}
</script>

<style lang="scss" scoped></style>
