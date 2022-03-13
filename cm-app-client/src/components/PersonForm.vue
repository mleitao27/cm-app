<template>
  <div>
    <GenericInput v-model:data="dataState.name" type="text" holder="Nome" />
    <GenericInput
      v-model:data="dataState.address"
      type="text"
      holder="Morada"
    />
    <GenericInput
      v-model:data="dataState.fiscalNumber"
      type="text"
      holder="NIF"
    />
  </div>
</template>

<script>
import { useVModel } from 'vue-composable'
import GenericInput from '@/components/GenericInput.vue'
export default {
  components: { GenericInput },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const dataState = useVModel(props, 'data')
    return { dataState }
  }
}
</script>

<style lang="scss" scoped></style>
