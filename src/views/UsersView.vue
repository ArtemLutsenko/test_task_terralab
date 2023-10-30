<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getAllUsers, searchUsers } from '@/api/user'
import { useRouter } from 'vue-router'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider'

const loading = ref(true)
const error = ref('')
const users = ref<any>([])
const selectedUser = ref()

const total = ref(0)
const skip = ref(0)
const limit = ref(Number(localStorage.fetchLimit) || 10)
const search = ref('')

let timeout: NodeJS.Timeout | number

const fetchUsers = async () => {
  loading.value = true
  try {
    const response = await getAllUsers({
      skip: skip.value,
      limit: limit.value
    })

    users.value = response.users
    total.value = response.total
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error fetching user:', err)
      error.value = err.message
    } else {
      console.error('Error fetching user:', err)
      error.value = 'An unexpected error occurred'
    }
  } finally {
    loading.value = false
  }
}

const onPaginate = (e: any) => {
  if (limit.value !== e.rows) {
    limit.value = e.rows
    localStorage.fetchLimit = limit.value
  }

  skip.value = e.page * limit.value
  search.value === '' ? fetchUsers() : searchUsersHandler()
}

const router = useRouter()

const userSelectHandler = () => {
  if (selectedUser.value) {
    router.push(`users/${selectedUser.value.id}`)
  }
}

const searchUsersHandler = async () => {
  loading.value = true
  try {
    const response = await searchUsers({
      q: search.value,
      skip: skip.value,
      limit: limit.value
    })

    users.value = response.users
    total.value = response.total
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error fetching user:', err)
      error.value = err.message
    } else {
      console.error('Error fetching user:', err)
      error.value = 'An unexpected error occurred'
    }
  } finally {
    loading.value = false
  }
}

const debouncedSearch = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => searchUsersHandler(), 1000)
}

onMounted(() => {
  fetchUsers()
})

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>

<template>
  <div class="users">
    <div class="container">
      <h2 class="users__title">Users</h2>

      <Divider />

      <div class="card">
        <DataTable
          :value="users"
          :loading="loading"
          v-model:selection="selectedUser"
          selectionMode="single"
          @click="userSelectHandler"
        >
          <template #header>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="search" placeholder="Search user" @input="debouncedSearch" />
            </span>
          </template>

          <Column field="id" header="id"></Column>

          <Column field="firstName" header="First Name"></Column>

          <Column field="lastName" header="Last Name"></Column>

          <Column field="birthDate" header="Birth Date"></Column>

          <template #empty> No users found.</template>

          <template #loading> Loading customers data. Please wait.</template>
        </DataTable>

        <Paginator
          @page="onPaginate"
          :rows="limit"
          :totalRecords="total"
          :rowsPerPageOptions="[10, 20, 30]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.users {
  margin-bottom: 40px;

  &__title {
    margin-bottom: 20px;
  }
}
</style>
