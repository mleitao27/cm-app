<template>
  <div class="page">
    <div class="content">
      <p class="pt-24 text-2xl text-center">Bem-vindo!</p>
      <div class="pt-24 flex flex-col items-center justify-center">
        <router-link class="flex items-center" to="/clients">
          <p>Ver clientes</p>
          <img
            src="@/assets/svg/up-arrow-black.svg"
            alt="see client"
            class="w-4 h-3 transform rotate-90 ml-4"
          />
        </router-link>
        <router-link class="flex items-center mt-4" to="/employees">
          <p>Ver Funcionárixs</p>
          <img
            src="@/assets/svg/up-arrow-black.svg"
            alt="see employee"
            class="w-4 h-3 transform rotate-90 ml-4"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss" scoped></style>
