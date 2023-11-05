<script setup lang="ts">
import { RouterView } from 'vue-router'
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
