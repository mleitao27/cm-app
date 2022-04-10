<template>
  <div class="page">
    <div class="content" v-if="client && data">
      <Back
        handler="Editar cliente"
        :to="'/clients/details/' + client._id"
        class="mb-8"
      />
      <PersonForm v-model:data="data" />
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
import { computed, onBeforeMount, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import PersonForm from '@/components/PersonForm.vue'
import Back from '@/components/Back.vue'
export default {
  components: { PersonForm, Back },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = ref(null)

    onBeforeMount(async () => {
      if (!store.state.clients.client)
        await store.dispatch('fetchClient', route.params.id)
      data.value = client.value
    })

    const client = computed(() => {
      return store.state.clients.client
    })

    const update = async () => {
      await store.dispatch('updateClient', data.value)
      router.push('/clients/details/' + route.params.id)
    }

    return {
      client,
      data,
      update
    }
  }
}
</script>

<style lang="scss" scoped></style>
