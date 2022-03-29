<template>
  <div>
    <GenericInput
      v-model:data="dataState.type"
      type="dropdown"
      holder="Tipo:"
      :options="{ sad: 'SAD', sd: 'SD', lp: 'LP', hd: 'HD' }"
    />
    <GenericInput
      v-model:data="dataState.regime"
      type="radio"
      holder="Regime:"
      :options="{ internal: 'Interno', external: 'Externo' }"
    />
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
import GenericInput from '@/components/GenericInput.vue'
export default {
  components: {
    GenericInput
  },
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
