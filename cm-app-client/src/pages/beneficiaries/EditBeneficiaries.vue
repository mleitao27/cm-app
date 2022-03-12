<template>
  <div class="page">
    <div class="content" v-if="beneficiaries && data">
      <Back handler="Edit beneficiários" :to="-1" class="mb-8" />
      <div class="flex flex-col">
        <div
          v-for="(beneficiary, index) in beneficiaries"
          :key="index"
          :class="{ 'order-first': beneficiary.isClient }"
        >
          <Table
            v-if="beneficiary.isClient"
            :data="personTable(beneficiary)"
            class="mb-4"
          />
          <PersonForm v-else v-model:data="data[index]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import useGlobalHelpers from '@/mixins/useGlobalHelpers.js'

import Back from '@/components/Back.vue'
import PersonForm from '@/components/PersonForm.vue'
import Table from '@/components/Table.vue'
export default {
  components: {
    Back,
    PersonForm,
    Table
  },
  setup() {
    const route = useRoute()
    // const router = useRouter()
    const store = useStore()
    const data = ref(null)
    const { personTable } = useGlobalHelpers()

    onBeforeMount(async () => {
      if (!store.state.clients.client)
        await store.dispatch('fetchClient', route.params.id)
      data.value = beneficiaries.value
    })

    const beneficiaries = computed(() => {
      return store.state.clients.client
        ? store.state.clients.client.beneficiaries
        : null
    })

    return {
      beneficiaries,
      data,
      personTable
    }
  }
}
</script>

<style lang="scss" scoped></style>
