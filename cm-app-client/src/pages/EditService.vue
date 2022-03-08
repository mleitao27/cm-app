<template>
  <div class="pt-4 px-4" v-if="service && data">
    <Back handler="Editar serviço" :to="-1" />
    <ServiceForm v-model:data="data" />
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
import { computed, onBeforeMount } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'
import ServiceForm from '@/components/ServiceForm.vue'
import Back from '@/components/Back.vue'
export default {
  components: {
    ServiceForm,
    Back
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const data = ref(null)

    onBeforeMount(async () => {
      if (!store.state.services.service)
        await store.dispatch('fetchService', route.params.id)
      data.value = service.value
    })

    const service = computed(() => {
      return store.state.services.service
    })

    const update = async () => {
      await store.dispatch('updateService', data.value)
      router.push('/clients/')
    }

    return {
      data,
      update,
      service
    }
  }
}
</script>

<style lang="scss" scoped></style>
