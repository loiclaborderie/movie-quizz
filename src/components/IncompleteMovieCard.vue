<script setup lang="ts">
import { movieGuessFinderStore } from '@/stores/movieGuessFinder'
import CounterAnimated from './CounterAnimated.vue'
import { computed } from 'vue'
import ShowInformationFound from '@/components/showInformationFound.vue'

const store = movieGuessFinderStore()

const opacity = computed(() => {
  if (store.failedAttempts?.length) {
    if (store.failedAttempts.length > 15) {
      return '70%'
    } else {
      return `${100 - store.failedAttempts.length}%`
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
        'url(https://image.tmdb.org/t/p/original' + store.movieToFind?.backdrop_path + ')'
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
  height: 200px;
  position: relative;
  background-color: hsl(233, 8%, 19%);
  border-radius: 1.5rem;
  padding: .5rem clamp(1rem, 1vw + 1rem, 2rem);
  color: rgb(250 249 246);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  box-shadow:
    0 0 0.5px 1px hsla(0, 0%, 100%, 0.075),
    0 0 0 1px hsla(0, 0%, 0%, 0.05),
    0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
    0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
    0 3.5px 6px hsla(0, 0%, 0%, 0.09);

  border-radius: 12px;
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
  justify-content: space-evenly;
  z-index: 3;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-position: 50% 50%;
  background-size: 1.1rem 1.1rem;
  border-radius: 1.25rem;
  overflow: hidden;
  gap: 3rem;
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
  .card-content .card-title {
    font-size: 2.2rem;
  }
}
.card-labels {
  display: flex;
  gap: clamp(0.75rem, 0.6vw + 1rem, 2rem);
  flex-wrap: wrap;
  justify-content: center;
}
.label {
  font-size: 0.8rem;
  border: 1px solid #908b8ba3;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 1em;
  padding: clamp(0.2rem, 0.2vw + 0.2rem, 0.5rem) clamp(0.5rem, 0.5vw + 0.5rem, 1rem);
  background: #33313191;
  color: #e4d6d6;
}
</style>
