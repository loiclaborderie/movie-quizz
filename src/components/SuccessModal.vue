<template>
  <AppModal>
    <template #title>{{ congrats }}</template>
    <template #content>
      <div class="tries">
        Tu as réussi en {{ attempts.length }} {{ attempts.length > 1 ? 'essais' : 'essai' }}. Le
        film était bien :
      </div>
      <div class="movieFound">
        <MovieCard :movie="movie" />
      </div>
    </template>
    <template #actions>
      <div class="buttons">
        <button @click="emit('reset')" class="action-btn black">
          <span>
            New Game  
          </span>
         <font-awesome-icon icon="fa-solid fa-rotate-right" />
        </button>
      </div>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import type MovieDetails from '@/types/MovieDetails'
import AppModal from '@/components/shared/AppModal.vue'
import { computed } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import { movieGuessFinderStore } from '@/stores/movieGuessFinder'
interface SuccessModal {
  attempts: MovieDetails[]
  movie: MovieDetails
}
const props = defineProps<SuccessModal>()
const store = movieGuessFinderStore()
const emit = defineEmits(['reset'])

const congrats = computed(() => {
  const numberTries = props.attempts.length
  if (numberTries === 0) {
    return 'WOW, quel génie !'
  } else if (numberTries < 5) {
    return 'Bravo, quelle performance !'
  } else if (numberTries < 10) {
    return 'Pas mal !'
  } else if (numberTries < 15) {
    return 'Tu peux mieux faire...'
  } else {
    return 'Bel effort mais insuffisant'
  }
})
</script>

<style scoped>
.tries {
  text-align: center;
}

.movieFound {
  max-width: 600px;
  padding-block: clamp(.75rem, 1vw + .75rem, 1.5rem);
}

:deep(.movie-card) {
  width: 100%;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
}

.action-btn {
  padding: 0.75rem 1.2rem;
  border: 1px solid #e7e7e7;
  background: transparent;
  border-radius: 7px;
  cursor: pointer;
  transition: 0.3s ease;
}
.action-btn span {
  padding-right: 0.75rem;
}
.action-btn:hover {
  background: rgb(238, 238, 238);
}
.action-btn.black:hover {
  background: rgb(41, 41, 41);
}
.action-btn.black {
  border: 1px solid #e7e7e7;
  background: rgb(25, 25, 25);
  color: #f1f1f1;
}
</style>
