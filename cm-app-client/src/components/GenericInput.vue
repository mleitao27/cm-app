<template>
  <div>
    <label for="" class="mr-4">{{ holder }}:</label>
    <input v-model="dataState" :type="type" class="border rounded" />
  </div>
</template>

<script>
import { useVModel } from 'vue-composable'
export default {
  props: {
    data: {
      type: String,
      default: () => {}
    },
    type: {
      type: String,
      default: 'text'
    },
    holder: {
      type: String,
      default: 'Value:'
    }
  },
  setup(props) {
    const dataState = useVModel(props, 'data')
    return { dataState }
  }
}
</script>

<style lang="scss" scoped></style>
