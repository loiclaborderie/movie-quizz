<script setup lang="ts">
import { useMovieApiStore } from '@/stores/movieApi'
import { ref } from 'vue'
import type MovieDetails from '@/types/MovieDetails'
import SearchMovie from '@/components/SearchMovie.vue'
import MovieCard from './MovieCard.vue'
import { movieGuessFinderStore } from '@/stores/movieGuessFinder'
import IncompleteMovieCard from './IncompleteMovieCard.vue'

const store = useMovieApiStore()
const movieFinderStore = movieGuessFinderStore()
const found = ref(false)
const gameStarted = ref(false)

function gameStart() {
  if (gameStarted.value === false) {
    gameStarted.value = true
  }
}

function gameEnd() {
  found.value = true
}

let response = await store.getRandomMovie()
console.log(response.data.value)

const pickNumber = Math.floor(Math.random() * 20)
const movieSelected = response.data.value.results[pickNumber]

let detailedMovieResponse = await store.getMovieById(movieSelected.id)
let movieDetails: MovieDetails = detailedMovieResponse.data.value
movieFinderStore.movieToFind = movieDetails

const cheat = ref(false)

console.log(movieDetails, detailedMovieResponse)
</script>

<template>
  <button @click="cheat = !cheat">CHEAT</button>
  <div class="searchGuess">
    <SearchMovie @search="gameStart" @found="gameEnd" />
  </div>
  <div class="test" v-if="detailedMovieResponse.data.value">
    <div class="display-answer" v-show="cheat || found">
      <MovieCard :movie="detailedMovieResponse.data.value" />
    </div>
  </div>
  <template v-if="!found && gameStarted"><IncompleteMovieCard /></template>
  <template v-if="movieFinderStore.failedAttempts.length && movieFinderStore.movieToFind">
    <template v-for="movieTried in movieFinderStore.failedAttempts" :key="movieTried">
      <MovieCard :movie="movieTried" :movie-to-find="movieFinderStore.movieToFind" />
    </template>
  </template>
</template>

<style scoped>
.searchGuess {
  padding: 3rem 0 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
