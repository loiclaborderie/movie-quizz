<script setup lang="ts">
import { computed, ref } from 'vue'
import ShowInformationFound from '@/components/ShowInformationFound.vue'
import { movieGuessFinderStore } from '@/stores/movieGuessFinder'
import CounterAnimated from './CounterAnimated.vue'

const store = movieGuessFinderStore()

const opacity = computed(() => {
  if (store.failedAttempts?.length) {
    if (store.failedAttempts.length > 15) {
      return '70%'
    } else {
      return `${100 - store.failedAttempts.length * 2}%`
    }
  } else {
    return '100%'
  }
})
</script>

<template>
  <div
    :style="{
      'background-image':
        'url(https://image.tmdb.org/t/p/original/' + store.movieToFind?.backdrop_path + ')'
    }"
    class="movie-card"
  >
    <div class="image-darkener" :style="{ opacity: opacity }"></div>
    <div class="card-content">
      <CounterAnimated :count="store.failedAttempts.length">
        {{ store.failedAttempts.length > 1 ? 'tries' : 'try' }}
      </CounterAnimated>
      <div class="card-labels">
        <ShowInformationFound property="genre" />
        <ShowInformationFound property="movieLength" />
        <ShowInformationFound property="year" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  margin: 2rem auto;
  width: 80%;
  min-height: 150px;
  position: relative;
  background-color: rgb(16 16 16);
  border-radius: 1.5rem;
  padding: 1rem;
  color: rgb(250 249 246);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.movie-card .image-darkener {
  position: absolute;
  background-color: black;
  inset: 0;
  z-index: 2;
  opacity: 0.7;
}

.card-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 3;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-position: 50% 50%;
  background-size: 1.1rem 1.1rem;
  border-radius: 1.25rem;
  overflow: hidden;
  gap: 2rem;
}

.card-content .card-title,
.card-content .movie-overview {
  text-align: center;
}

.movie-card .card-title {
  text-align: center;
  color: rgb(250 249 246);
  font-size: 2.6rem;
  padding-bottom: 1rem;
}

.card-content .movie-overview {
  color: rgb(255 255 255 / 75%);
  line-height: 1.3rem;
  font-size: 0.9rem;
}

@media (max-width: 700px) {
  .movie-card {
    width: calc(100% - 2rem);
    margin: 0rem 1rem;
    padding: 0.75rem;
    border-radius: 1rem;
  }
}

@media (max-width: 600px) {
  .card-content {
    padding: 3rem;
  }

  .card-content .card-title {
    font-size: 2.2rem;
  }
}
.card-labels {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 1.5rem;
}
.label {
  font-size: 0.8rem;
  border: 1px solid #908b8ba3;
  display: inline-block;
  border-radius: 1em;
  padding: 0.3em 0.9em;
  background: #33313191;
  color: #e4d6d6;
}
</style>
