<template>
  <div class="flex items-center mb-8" @click="routerHandler(route)">
    <img
      src="@/assets/svg/up-arrow-black.svg"
      alt="go back"
      class="w-4 h-3 transform -rotate-90 mr-4"
    />
    <p>{{ handler }}</p>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    handler: { type: String, default: '' },
    route: [String, Number]
  },
  setup() {
    const router = useRouter()
    const routerHandler = async (route) => {
      if (typeof route === 'string') router.push(route)
      else if (typeof route == 'number') router.go(route)
    }
    return {
      routerHandler
    }
  }
}
</script>

<style lang="scss" scoped></style>
