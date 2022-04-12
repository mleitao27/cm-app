<template>
  <div class="rounded-md shadow">
    <div
      class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white md:py-4 md:text-lg md:px-10 cursor-pointer"
      :class="{
        'bg-indigo-600 hover:bg-indigo-700': color === 'blue',
        'bg-red-600 hover:bg-red-700': color === 'red'
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'blue'
    }
  },
  setup() {}
}
</script>

<style lang="scss" scoped></style>
