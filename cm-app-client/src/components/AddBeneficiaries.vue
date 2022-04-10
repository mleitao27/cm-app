<template>
  <div class="mb-8">
    <div
      class="w-full flex items-center"
      :class="addMore ? 'justify-center' : 'justify-between'"
    >
      <p v-if="!addMore">Beneficiários</p>
      <img
        src="@/assets/svg/add-black.svg"
        alt="add beneficiary"
        class="w-6 h-6 cursor-pointer"
        @click="nextBeneficiary"
      />
    </div>
    <!-- Beneficiaries list -->
    <div v-if="!addMore">
      <div
        v-for="beneficiary in beneficiaries"
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
    </div>
    <!-- Include client as beneficiary checkbox -->
    <div
      v-if="
        client.beneficiaries &&
        client.beneficiaries.length &&
        !clientAlreadyBeneficiary &&
        clientFilled
      "
      class="flex items-center"
    >
      <img
        v-if="!clientAsBeneficiary"
        src="@/assets/svg/accept-black.svg"
        alt="check"
        class="w-6 h-6 mr-2 cursor-pointer"
        @click="addClientAsBeneficiary"
      />
      <img
        v-else
        src="@/assets/svg/accepted-black.svg"
        alt="checked"
        class="w-6 h-6 mr-2 cursor-pointer"
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

import PersonForm from '@/components/PersonForm.vue'

export default {
  components: {
    PersonForm
  },
  props: {
    client: {
      type: Object,
      default: () => {}
    },
    addMore: {
      type: Boolean,
      default: false
    }
  },
  emits: ['set'],
  setup(props, { emit }) {
    const beneficiaries = ref(
      props.client.beneficiaries && props.client.beneficiaries.length
        ? props.client.beneficiaries
        : null
    )
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
      if (beneficiaries.value) {
        // Search for beneficiary with same fiscal number
        const found = beneficiaries.value.find(
          (b) => b.fiscalNumber === currentBeneficiary.value.fiscalNumber
        )
        if (found) {
          console.log(
            'ERROR: Already exist a beneficiary with this fiscal number'
          )
          return
        }
        // Add beneficiary
        beneficiaries.value.push(currentBeneficiary.value)
      } else beneficiaries.value = [currentBeneficiary.value]

      if (props.addMore)
        emit('set', { ...currentBeneficiary.value, isClient: false })
      else emit('set', beneficiaries)

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
      beneficiaries.value = beneficiaries.value.filter((beneficiary) => {
        return beneficiary.fiscalNumber !== fiscalNumber
      })
      emit('set', beneficiaries)
    }

    // Client as beneficiary
    const clientAsBeneficiary = computed(() => {
      return beneficiaries.value.find(
        (b) => b.fiscalNumber === props.client.fiscalNumber
      )
    })

    const addClientAsBeneficiary = () => {
      beneficiaries.value.push({
        name: props.client.name,
        address: props.client.address,
        fiscalNumber: props.client.fiscalNumber,
        isClient: true
      })
      if (props.addMore) emit('set', { ...props.client, isClient: true })
      else emit('set', beneficiaries)
    }

    const removeClientAsBeneficiary = () => {
      beneficiaries.value = beneficiaries.value.filter((b) => {
        return b.fiscalNumber !== props.client.fiscalNumber
      })
      emit('set', beneficiaries)
    }

    const clientFilled = computed(() => {
      return (
        props.client.name && props.client.address && props.client.fiscalNumber
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
      return beneficiaries.value.find(
        (b) => b.fiscalNumber === props.client.fiscalNumber
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
      clientAlreadyBeneficiary,
      beneficiaries
    }
  }
}
</script>

<style lang="scss" scoped></style>
