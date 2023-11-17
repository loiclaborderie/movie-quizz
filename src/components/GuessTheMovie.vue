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

  const pickNumber = Math.floor(Math.random() * 20)
  const movieSelected = response.data.value.results[pickNumber]

  const detailedMovieResponse = await getMovieById(movieSelected.id)
  const movieDetails: MovieDetails = detailedMovieResponse.data.value
  movieFinderStore.movieToFind = movieDetails
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
      <div class="searchGuess__top">
        <div class="searchbar">
          <SearchMovie @search="gameStart" @found="gameEnd" />
        </div>
        <button class="searchGuess__new-game" v-if="gameStarted" @click="resetGame"><font-awesome-icon icon="fa-solid fa-rotate-right" /></button>
      </div>
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
  justify-content: center;
  flex-direction: column;
}

.searchbar {
   grid-column: 2;
   width: 100%;
    display: flex;
    justify-content: center;
}

.searchGuess__top {
  display: grid;
  grid-template-columns: 3fr 20fr 3fr;
  width: 100%;
  justify-items: center;
}

.searchGuess__new-game {
  background-color: #ba2c24;
  border: none;
  color: white;
  width: min(3rem, 100%);
  min-height: 3rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  grid-column: 3;
}


@media screen and (max-width: 600px) {
  .searchGuess__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
}
</style>
