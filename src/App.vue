<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <app-header />

  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<style scoped></style>
