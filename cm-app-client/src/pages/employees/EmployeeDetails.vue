<template>
  <div class="page">
    <div class="content" v-if="employee">
      <div class="flex justify-between items-center mb-8">
        <Back handler="Detalhes da Funcionária" to="/employees" />
        <router-link :to="'/employees/edit/' + employee._id">
          Editar
        </router-link>
      </div>
      <Table :data="personTable(employee)" />
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import useGlobalHelpers from '@/mixins/useGlobalHelpers.js'

import Table from '@/components/Table.vue'
import Back from '@/components/Back.vue'
export default {
  components: {
    Table,
    Back
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const { dateTimeFormatting, personTable, serviceTable } = useGlobalHelpers()

    onBeforeMount(async () => {
      await store.dispatch('fetchEmployee', route.params.id)
    })

    const employee = computed(() => {
      return store.state.employees.employee
    })

    return {
      employee,
      dateTimeFormatting,
      personTable,
      serviceTable
    }
  }
}
</script>

<style lang="scss" scoped></style>
