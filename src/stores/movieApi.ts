import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'
const apiKey = import.meta.env.VITE_TMDB_APIKEY

export const useMovieApiStore = defineStore('movieApi', () => {
  async function searchMovie(movieName: string) {
    console.log(apiKey)
    const url: string = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`
    const { isFetching, error, data } = await useFetch(url).get().json()
    return { isFetching, error, data }
  }
  async function getMovieById(movieId: number) {
    const url: string = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    const { isFetching, error, data } = await useFetch(url).get().json()
    return { isFetching, error, data }
  }
  async function getRandomMovie() {
    const page = Math.floor(Math.random() * 50)
    console.log(page, apiKey)
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr_FR&include_adult=false&page=${page}&sort_by=popularity.desc`
    const { isFetching, error, data } = await useFetch(url).get().json()
    return { isFetching, error, data }
  }

  return { searchMovie, getRandomMovie, getMovieById }
})
