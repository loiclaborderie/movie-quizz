<script setup lang="ts">
import { useMovieApiStore } from '@/stores/movieApi'
import { ref } from 'vue'
import type MovieDetails from '@/types/MovieDetails'
import SearchMovie from '@/components/SearchMovie.vue'
import { movieGuessFinderStore } from '@/stores/movieGuessFinder'

const store = useMovieApiStore()
const movieFinderStore = movieGuessFinderStore()

let response = await store.getRandomMovie()
console.log(response.data.value)

const pickNumber = Math.floor(Math.random() * 20)
const movieSelected = response.data.value.results[pickNumber]

let detailedMovieResponse = await store.getMovieById(movieSelected.id)
let movieDetails: MovieDetails = detailedMovieResponse.data.value
movieFinderStore.movieToFind = movieDetails

console.log(movieDetails, detailedMovieResponse)
</script>

<template>
  <div class="searchGuess">
    <SearchMovie />
  </div>
  <h1>TETS 2</h1>
  <div class="test" v-if="detailedMovieResponse.data.value">
    <h4>{{ movieDetails.title }}</h4>
    <p>{{ movieDetails.overview }}</p>
    <p>{{ movieDetails.release_date }}</p>
    <p>{{ movieDetails.runtime }} min</p>
    <ul>
      <li v-for="genre in movieDetails.genres" :key="genre.id">
        {{ genre.name }}
      </li>
    </ul>
    <!-- <img
      :src="'https://image.tmdb.org/t/p/original/' + movieDetails.backdrop_path"
      :alt="movieDetails.title"
    /> -->
  </div>
</template>

<style scoped>
.searchGuess {
  padding: 3rem 0 2rem;
  background: black;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
