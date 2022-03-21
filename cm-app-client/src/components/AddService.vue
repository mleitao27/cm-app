<template>
  <div class="mb-8">
    <div class="w-full flex items-center justify-between">
      <p>Serviço</p>
      <img
        v-if="serviceEmpty"
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
        class="w-6 h-6 cursor-pointer"
        @click="confirmService"
      />
    </div>
    <div
      v-else-if="serviceFilled"
      class="w-full flex items-center justify-between"
    >
      <div class="bg-blue-100 p-4 mb-4 rounded-2xl">
        {{ service }}
      </div>
      <img
        src="@/assets/svg/trash-black.svg"
        alt="remove service"
        class="w-8 h-8 cursor-pointer"
        @click="removeService"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

import ServiceForm from '@/components/ServiceForm.vue'

export default {
  components: {
    ServiceForm
  },
  props: {
    clientService: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['set'],
  setup(props, { emit }) {
    const showServiceForm = ref(false)
    const service = ref(
      props.clientService ?? {
        type: null,
        regime: null,
        shifts: null,
        beginning: null,
        duration: null
      }
    )

    const serviceFilled = computed(() => {
      return (
        service.value.type &&
        service.value.regime &&
        service.value.shifts &&
        service.value.beginning &&
        service.value.duration
      )
    })

    const serviceEmpty = computed(() => {
      return (
        !service.value.type &&
        !service.value.regime &&
        !service.value.shifts &&
        !service.value.beginning &&
        !service.value.duration
      )
    })

    const confirmService = () => {
      emit('set', service.value)
      showServiceForm.value = false
    }

    const removeService = () => {
      emit('set', null)
      service.value = {
        type: null,
        regime: null,
        shifts: null,
        beginning: null,
        duration: null
      }
    }

    return {
      service,
      showServiceForm,
      serviceFilled,
      confirmService,
      removeService,
      serviceEmpty
    }
  }
}
</script>

<style lang="scss" scoped></style>
