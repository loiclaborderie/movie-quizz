<script setup lang="ts">
import { useMovieApiStore } from '@/stores/movieApi'
import type MovieOverview from '@/types/MovieOverview'
import { ref } from 'vue'
interface SuggestionProp {
  movie: MovieOverview
}
const props = defineProps<SuggestionProp>()
const emit = defineEmits(['select'])
</script>

<template>
  <div @click="emit('select', movie.id)" class="suggestion-container">{{ movie.title }}</div>
</template>

<style scoped>
.suggestion-container {
  padding-block: 0.3rem;
}
.suggestion-container:hover {
  background: rgb(0, 0, 0, 0.1);
}
</style>
