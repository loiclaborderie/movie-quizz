import { useFetch } from '@vueuse/core'

const apiKey = import.meta.env.VITE_TMDB_APIKEY
const apiUrl = 'https://api.themoviedb.org/3'

async function fetchJson(url: string) {
  const { isFetching, error, data } = await useFetch(url).get().json()
  return { isFetching, error, data }
}

export function useMovieApi() {
  async function searchMovie(movieName: string) {
    const url = `${apiUrl}/search/movie?api_key=${apiKey}&query=${movieName}`
    return fetchJson(url)
  }

  async function getMovieById(movieId: number) {
    const url = `${apiUrl}/movie/${movieId}?api_key=${apiKey}`
    return fetchJson(url)
  }

  async function getRandomMovie() {
    const page = Math.floor(Math.random() * 50)
    const url = `${apiUrl}/discover/movie?api_key=${apiKey}&language=fr_FR&include_adult=false&page=${page}&sort_by=popularity.desc`
    return fetchJson(url)
  }

  return { searchMovie, getRandomMovie, getMovieById }
}
