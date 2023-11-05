import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'

const { isFetching, error, data } = await useFetch(url)

export const useMovieApiStore = defineStore('movieApi', () => {
  function searchMovie(movieName: string) {
    let url: string = 'https://api.themoviedb.org/3/search/movie?query=machine&api_key='
    url = url + apikey
  }
  function getMovieById(movieId: number) {
    const url: string = `https://api.themoviedb.org/3/movie/${movieId}?api_key=`
    return url
    // url = url + apikey
  }
  function getRandomMovie() {
    const page = Math.floor(Math.random() * 50)
    console.log(page)
    const url = `https://api.themoviedb.org/3/discover/movie?&language=fr_FR&include_adult=false&page=${page}&sort_by=popularity.desc&api_key=`
    return url
    // url = url + apikey
  }

  return { searchMovie, getRandomMovie, getMovieById }
})
