<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MovieTest from '@/components/MovieTest.vue'
</script>

<template>
  <h1>TETS</h1>
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<style scoped>
.movieDetails {
  background: white;
  color: red;
  min-height: 100vh;
}
</style>
