<script setup lang="ts">
import type MovieOverview from '@/types/MovieOverview'
interface SuggestionProp {
  movie: MovieOverview
}
defineProps<SuggestionProp>()
const emit = defineEmits(['select'])
</script>

<template>
  <div @click="emit('select', movie.id)" class="suggestion-container">
    <div class="movie-poster">
      <img
        v-if="movie.poster_path"
        :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
        :alt="movie.original_title"
      />
      <img
        v-else-if="movie.backdrop_path"
        :src="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path"
        :alt="movie.original_title"
      />
      <img v-else src="../../public/placeholder.jfif" alt="movie.original_title" />
    </div>
    <div class="movie-details">
      <h5>{{ `${movie.title.substring(0, 30)}${movie.title.length > 30 ? '...' : ''}` }}</h5>
      <p v-if="movie.release_date !== ''">{{ movie.release_date.substring(0, 4) }}</p>
      <p v-else>Unknown year</p>
    </div>
  </div>
</template>

<style scoped>
.suggestion-container {
  border-bottom: 1px solid #b5a2a2ad;
  padding: 0.5rem 1rem;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-block: 0.45rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.suggestion-container:hover {
  background: rgb(0, 0, 0, 0.03);
}

.movie-poster {
  min-width: 64px;
  max-width: 64px;
  aspect-ratio: 2/3;
  border-radius: 6px;
  border: 2px solid #0000008c;
  overflow: hidden;
}
.movie-poster img {
  width: 100%;
  height: 100%;
}

.movie-details {
  font-family: 'Orbitron', sans-serif;
}

h5 {
  font-size: 1.3rem;
  font-weight: 700;
  padding-bottom: 0.5rem;
}

p {
  padding-left: 0.3rem;
  font-size: 1.1rem;
}
</style>
