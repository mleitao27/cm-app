<template>
  <div @click="toggle">
    <div
      class="w-full lg:w-1/2 bg-blue-100 py-4"
      :class="minimized ? 'rounded-t-2xl' : 'rounded-2xl'"
    >
      <div v-for="(d, index) in data" :key="index">
        <div
          v-if="index === 0 || !minimized"
          class="w-full flex items-center justify-between px-4"
        >
          <p>{{ d.label }}</p>
          <p>{{ d.value }}</p>
        </div>
        <div
          v-if="!minimized && index !== data.length - 1"
          class="w-full h-px my-4 bg-white"
        />
      </div>
    </div>
    <div
      v-if="minimized"
      class="w-full flex justify-center rounded-b-2xl bg-blue-50 py-2"
    >
      <img
        src="@/assets/svg/up-arrow-black.svg"
        alt="down"
        class="transform rotate-180 w-4 h-3"
      />
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    minimizable: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const minimized = ref(props.minimizable ? true : false)

    const toggle = () => {
      if (props.minimizable) minimized.value = !minimized.value
    }

    return { minimized, toggle }
  }
}
</script>
<style lang="scss" scoped></style>
