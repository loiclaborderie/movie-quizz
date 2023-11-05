<script setup lang="ts">
import { useMovieApiStore } from '@/stores/movieApi'
import { ref } from 'vue'

const store = useMovieApiStore()
const test = ref('test')
let response = await store.getRandomMovie()
console.log(response.data)

if (response.error.value) {
  console.log(response.error.value)
}

const pickNumber = Math.floor(Math.random() * 20)
console.log(pickNumber)
const movieSelected = response.data.value.results[pickNumber]
let detailedMovieResponse = await store.getMovieById(movieSelected.id)
console.log(detailedMovieResponse)
</script>

<template>
  <h1>TETS 2</h1>
  <div class="test" v-if="detailedMovieResponse.data.value">
    <h4>{{ detailedMovieResponse.data.value.title }}</h4>
    <p>{{ detailedMovieResponse.data.value.overview }}</p>
  </div>
</template>

<style scoped></style>
