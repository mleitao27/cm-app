<template>
  <div class="flex items-center mb-8 cursor-pointer" @click="routerHandler">
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
    to: [String, Number]
  },
  setup(props) {
    const router = useRouter()
    const routerHandler = () => {
      if (typeof props.to === 'string') router.push(props.to)
      else if (typeof props.to == 'number') router.go(props.to)
    }
    return {
      routerHandler
    }
  }
}
</script>

<style lang="scss" scoped></style>
