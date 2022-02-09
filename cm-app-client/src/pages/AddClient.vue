<template>
  <div class="pt-4 px-4">
    <router-link class="flex items-center mb-8" to="/clients">
      <img
        src="@/assets/svg/up-arrow-black.svg"
        alt="see client"
        class="w-4 h-3 transform -rotate-90 mr-4"
      />
      <p>Adicionar cliente</p>
    </router-link>
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
          class="w-8 h-8"
          @click="nextBeneficiary"
        />
      </div>
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
      <div
        v-if="showBeneficiaryForm"
        class="w-full flex items-center justify-between"
      >
        <PersonForm v-model:data="currentBeneficiary" />
        <img
          src="@/assets/svg/accept-black.svg"
          alt="add beneficiary"
          class="w-8 h-8"
          @click="confirmBeneficiary"
        />
      </div>
    </div>
    <div class="w-full flex justify-center">
      <button @click="add" class="px-4 py-2 rounded-2xl bg-blue-300 font-bold">
        Adicionar
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import PersonForm from '@/components/PersonForm.vue'
export default {
  components: {
    PersonForm
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const data = ref({
      name: null,
      address: null,
      fiscalNumber: null
    })

    const beneficiaries = ref([])
    const showBeneficiaryForm = ref(false)
    const currentBeneficiary = ref({
      name: null,
      address: null,
      fiscalNumber: null
    })

    const add = () => {
      store.dispatch('addClient', {
        name: data.value.name,
        address: data.value.address,
        fiscalNumber: data.value.fiscalNumber
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
        fiscalNumber: null
      }
    }

    const removeBeneficiary = (fiscalNumber) => {
      data.value.beneficiaries = data.value.beneficiaries.filter(
        (beneficiary) => {
          return beneficiary.fiscalNumber !== fiscalNumber
        }
      )
    }

    return {
      add,
      data,
      beneficiaries,
      nextBeneficiary,
      currentBeneficiary,
      showBeneficiaryForm,
      confirmBeneficiary,
      removeBeneficiary
    }
  }
}
</script>

<style lang="scss" scoped></style>
