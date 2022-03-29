<template>
  <div>
    <div v-if="type === 'dropdown'">
      <div @click="() => (showDropdown = !showDropdown)" class="cursor-pointer">
        <p>{{ holder + ' ' + (dataState ? selected : '-') }}</p>
      </div>
      <div v-if="showDropdown" class="relative">
        <div class="absolute bg-white left-0 top-0 border">
          <div
            v-for="(value, key) in options"
            :key="key"
            class="cursor-pointer hover:bg-blue-100 px-4"
            @click="
              () => {
                dataState = key
                selected = value
                showDropdown = false
              }
            "
          >
            {{ value }}
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="type === 'radio'">
      <p>{{ holder }}</p>
      <div
        v-for="(value, key) in options"
        :key="key"
        class="flex"
        :class="{ 'cursor-pointer': dataState === key }"
        @click="() => (dataState = key)"
      >
        <img
          v-if="dataState === key"
          src="@/assets/svg/radio-on.svg"
          alt="on"
        />
        <img v-else src="@/assets/svg/radio-off.svg" alt="off" />
        <p>{{ value }}</p>
      </div>
    </div>
    <div v-else>
      <label for="" class="mr-4">{{ holder }}</label>
      <input v-model="dataState" :type="type" class="border rounded" />
    </div>
  </div>
</template>

<script>
import { useVModel } from 'vue-composable'
import { ref } from 'vue'
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
      default: 'Valor:'
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const dataState = useVModel(props, 'data')
    const showDropdown = ref(false)
    const selected = ref(null)
    return { dataState, showDropdown, selected }
  }
}
</script>

<style lang="scss" scoped></style>
