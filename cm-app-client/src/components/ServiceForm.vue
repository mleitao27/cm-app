<template>
  <div>
    <div>
      <label for="" class="mr-4">Tipo:</label>
      <input v-model="dataState.type" type="text" class="border rounded" />
    </div>
    <div>
      <label for="" class="mr-4">Regime:</label>
      <input v-model="dataState.regime" type="text" class="border rounded" />
    </div>
    <div>
      <label for="" class="mr-4">Turnos:</label>
      <input v-model="dataState.shifts" type="text" class="border rounded" />
    </div>
    <div>
      <label for="" class="mr-4">Inicio:</label>
      <input v-model="dataState.beginning" type="text" class="border rounded" />
    </div>
    <div>
      <label for="" class="mr-4">Duração:</label>
      <input v-model="dataState.duration" type="text" class="border rounded" />
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
