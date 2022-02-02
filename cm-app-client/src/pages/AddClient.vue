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
    <div class="mb-8">
      <p>Dados do cliente</p>
      <div>
        <label for="" class="mr-4">Nome:</label>
        <input v-model="name" type="text" class="border rounded" />
      </div>
      <div>
        <label for="" class="mr-4">Morada:</label>
        <input v-model="address" type="text" class="border rounded" />
      </div>
      <div>
        <label for="" class="mr-4">NIF:</label>
        <input v-model="fiscalNumber" type="text" class="border rounded" />
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
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = ref(null)
    const address = ref(null)
    const fiscalNumber = ref(null)
    const add = () => {
      store.dispatch('addClient', {
        name: name.value,
        address: address.value,
        fiscalNumber: fiscalNumber.value
      })
      router.push('/clients')
    }
    return {
      name,
      add,
      address,
      fiscalNumber
    }
  }
}
</script>

<style lang="scss" scoped></style>
