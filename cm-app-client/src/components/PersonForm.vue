<template>
  <div>
    <div>
      <label for="" class="mr-4">Nome:</label>
      <input v-model="dataState.name" type="text" class="border rounded" />
    </div>
    <div>
      <label for="" class="mr-4">Morada:</label>
      <input v-model="dataState.address" type="text" class="border rounded" />
    </div>
    <div>
      <label for="" class="mr-4">NIF:</label>
      <input
        v-model="dataState.fiscalNumber"
        type="text"
        class="border rounded"
      />
    </div>
  </div>
</template>

<script>
import { useVModel } from 'vue-composable'
export default {
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
