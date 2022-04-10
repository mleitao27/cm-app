<template>
  <div class="page">
    <div class="content">
      <div class="flex items-center justify-between mb-8">
        <Back handler="Funcionárixs" to="/" />
        <router-link to="/employees/add" class="">
          <img
            src="@/assets/svg/add-black.svg"
            alt="see employee"
            class="w-6 h-6"
          />
        </router-link>
      </div>
      <div v-if="employees">
        <div
          v-for="(employee, index) of employees"
          :key="index"
          class="p-4 mb-4 bg-blue-100 rounded-2xl flex items-center justify-between cursor-pointer"
          @click="seeDetails(employee)"
        >
          <p>
            {{ employee.name }}
          </p>
          <img
            src="@/assets/svg/up-arrow-black.svg"
            alt="see employee"
            class="w-4 h-3 transform rotate-90"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

import Back from '@/components/Back.vue'
export default {
  components: { Back },
  setup() {
    const store = useStore()
    const router = useRouter()

    onBeforeMount(async () => {
      await store.dispatch('fetchEmployees')
    })

    const employees = computed(() => {
      return store.state.employees.employees
    })

    const seeDetails = async (employee) => {
      await store.dispatch('storeEmployee', employee)
      router.push('/employees/details/' + employee._id)
    }

    return {
      employees,
      seeDetails
    }
  }
}
</script>

<style lang="scss" scoped></style>
