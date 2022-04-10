<template>
  <div class="page">
    <div class="content">
      <Back handler="Adicionar employee" to="/employees" class="mb-8" />
      <!-- Employee -->
      <div class="mb-8">
        <p>Dados do employee</p>
        <PersonForm v-model:data="data" />
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
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import PersonForm from '@/components/PersonForm.vue'
import Back from '@/components/Back.vue'
export default {
  components: {
    PersonForm,
    Back
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const data = ref({
      name: null,
      address: null,
      fiscalNumber: null
    })

    const add = () => {
      store.dispatch('addEmployee', {
        name: data.value.name,
        address: data.value.address,
        fiscalNumber: data.value.fiscalNumber
      })
      router.push('/employees')
    }

    const employeeFilled = computed(() => {
      return data.value.name && data.value.address && data.value.fiscalNumber
    })

    return {
      add,
      data,
      employeeFilled
    }
  }
}
</script>

<style lang="scss" scoped></style>
