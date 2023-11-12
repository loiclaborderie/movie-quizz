<script setup lang="ts">
import type MovieOverview from '@/types/MovieOverview'
interface SuggestionProp {
  movie: MovieOverview
}
defineProps<SuggestionProp>()
const emit = defineEmits(['select'])
</script>

<template>
  <div @click="emit('select', movie.id)" class="suggestion-container">{{ movie.title }}</div>
</template>

<style scoped>
.suggestion-container {
  padding-block: 0.45rem;
}
</style>
