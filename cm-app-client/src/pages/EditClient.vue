<template>
  <div class="pt-4 px-4" v-if="client && data">
    <router-link
      class="flex items-center mb-8"
      :to="'/clients/details/' + client._id"
    >
      <img
        src="@/assets/svg/up-arrow-black.svg"
        alt="see client"
        class="w-4 h-3 transform -rotate-90 mr-4"
      />
      <p>Editar cliente</p>
    </router-link>
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
</template>

<script>
import { computed, onBeforeMount, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import PersonForm from '@/components/PersonForm.vue'
export default {
  components: { PersonForm },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = ref(null)

    onBeforeMount(async () => {
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
