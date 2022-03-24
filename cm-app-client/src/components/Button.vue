<template>
  <div class="rounded-md shadow">
    <a
      href="#"
      class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
    >
      {{ handler }}
    </a>
  </div>
</template>
<script>
export default {
  props: {
    handler: { type: String, default: '' }
  },
  setup() {}
}
</script>

<style lang="scss" scoped></style>
