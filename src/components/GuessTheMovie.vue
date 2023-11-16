<script setup lang="ts">
import { useMovieApi } from '@/composables/useMovieApi'
import { movieGuessFinderStore } from '@/stores/movieGuessFinder'
import { ref } from 'vue'
import type MovieDetails from '@/types/MovieDetails'
import SuccessModal from './SuccessModal.vue'
import MovieCard from './MovieCard.vue'
import SearchMovie from './SearchMovie.vue'
import IncompleteMovieCard from './IncompleteMovieCard.vue'

const { getRandomMovie, getMovieById } = useMovieApi()
const movieFinderStore = movieGuessFinderStore()
const found = ref(false)
const gameStarted = ref(false)

function gameStart() {
  if (!gameStarted.value) {
    gameStarted.value = true
  }
}

function resetGame() {
  alert('reset game')
  movieFinderStore.resetGame()
  found.value = false
  gameStarted.value = false
  affectRandomMovie()
}

function gameEnd() {
  found.value = true
}

async function affectRandomMovie() {
  const response = await getRandomMovie()
  console.log(response.data.value)

  const pickNumber = Math.floor(Math.random() * 20)
  const movieSelected = response.data.value.results[pickNumber]

  const detailedMovieResponse = await getMovieById(movieSelected.id)
  const movieDetails: MovieDetails = detailedMovieResponse.data.value
  movieFinderStore.movieToFind = movieDetails
  console.log(movieDetails, detailedMovieResponse)
}

affectRandomMovie()
</script>

<template>
  <div>
    <SuccessModal
      v-if="found && movieFinderStore.movieToFind"
      :attempts="movieFinderStore.failedAttempts"
      :movie="movieFinderStore.movieToFind"
      @reset="resetGame"
    />
    <div class="searchGuess">
      <SearchMovie @search="gameStart" @found="gameEnd" />
    </div>
    <div class="test" v-if="movieFinderStore.movieToFind">
      <div class="display-answer" v-show="found">
        <MovieCard :movie="movieFinderStore.movieToFind" />
      </div>
    </div>
    <template v-if="!found && gameStarted">
      <IncompleteMovieCard />
    </template>
    <template v-if="movieFinderStore.failedAttempts.length && movieFinderStore.movieToFind">
      <template v-for="movieTried in movieFinderStore.failedAttempts" :key="movieTried">
        <MovieCard :movie="movieTried" :movie-to-find="movieFinderStore.movieToFind" />
      </template>
    </template>
  </div>
</template>

<style scoped>
.searchGuess {
  padding: 3rem 0 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
