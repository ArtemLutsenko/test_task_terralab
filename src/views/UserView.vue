<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

import { getUserById } from '@/api/user'

import ProgressSpinner from 'primevue/progressspinner'
import Card from 'primevue/card'
import Divider from 'primevue/divider'

const route = useRoute()
const loading = ref(true)
const error = ref('')
const userId = route.params.id as string
const user = ref<any>(null)

const fetchUser = async () => {
  loading.value = true
  try {
    user.value = await getUserById(userId)
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

onMounted(() => {
  fetchUser()
})
</script>

<template>
  <div class="user">
    <router-link to="/users" class="user__link">Back to users</router-link>

    <ProgressSpinner v-if="loading" />

    <div v-if="user" class="user__info">
      <div>
        <img :src="user.image" alt="" />
      </div>

      <Card class="user-card">
        <template #title>
          <span class="pi pi-user"></span>

          {{ user.firstName }} {{ user.lastName }}
        </template>

        <template #content>
          <p class="m-0">
            <span class="pi-bold">
              <i class="pi pi-check"></i>
              Date of birth:
            </span>
            {{ user.birthDate }}
          </p>

          <p><span class="pi pi-phone"> Phone:</span> {{ user.phone }}</p>
        </template>
      </Card>
    </div>
  </div>

  <Divider />
</template>

<style scoped lang="scss">
.user {
  &__link {
    color: #dedede;
  }

  &__info {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    gap: 30px;

    @media (max-width: 576px) {
      flex-direction: column;
      align-items: center;
    }
  }

  &-card {
    display: flex;
    flex-grow: 1;
    border-radius: 20px;

    @media (max-width: 576px) {
      width: 100%;
    }
  }
}
</style>
