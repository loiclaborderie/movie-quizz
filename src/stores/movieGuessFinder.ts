import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'
import type MovieDetails from '@/types/MovieDetails'
import { useMovieApiStore } from '@/stores/movieApi'
import test from 'node:test'

interface foundHints {
  year: Interval
  movieLength: Interval
  genre: string[]
}
interface foundClues {
  year: number | null
  movieLength: number | null
  genre: string[]
}
interface Interval {
  moreThan: null | number
  lessThan: null | number
}

export const movieGuessFinderStore = defineStore('movieGuessFinder', () => {
  const tmdbStore = useMovieApiStore()
  const movieToFind = ref<MovieDetails | null>(null)
  const hintsFound = ref<foundHints>({
    year: { moreThan: null, lessThan: null },
    movieLength: { moreThan: null, lessThan: null },
    genre: []
  })
  const cluesFound = reactive<foundClues>({ year: null, genre: [], movieLength: null })

  async function compareMovie(movieId: number) {
    if (!movieToFind.value) {
      console.error('there has been an error somewhere bro')
      return
    }
    const response = await tmdbStore.getMovieById(movieId)
    const movie: MovieDetails = response.data.value
    console.log('fetched details', movie)
    if (movie.id === movieToFind.value.id) {
      alert('you found the right movie')
    } else {
      alert('try again, youre getting closer')
    }
    console.log(movie, movieToFind, movie)
    console.log(movie.id, movieToFind.value.id, movie.id === movieToFind.value.id)

    getHints(movie)
  }

  function getHints(comparedMovie: MovieDetails) {
    if (!movieToFind.value) {
      console.error('there has been an error somewhere bro')
      return
    }
    const yearFound = parseInt(comparedMovie.release_date.slice(0, 4))
    const yearToMatch = parseInt(movieToFind.value.release_date.slice(0, 4))
    const lengthFound = comparedMovie.runtime
    const lengthToMatch = movieToFind.value.runtime
    const genresFound = comparedMovie.genres.map((genre) => genre.name)
    const genresToMatch = movieToFind.value.genres.map((genre) => genre.name)

    console.log(`year found: ${yearFound}, year to match : ${yearToMatch}`)

    if (!cluesFound.year) {
      if (yearFound === yearToMatch) {
        cluesFound.year = yearToMatch
        console.log('congrats, you found the right year !')
      } else {
        if (!isNaN(yearToMatch) && yearToMatch !== 0 && yearFound !== 0) {
          guessNumber(yearFound, yearToMatch, hintsFound.value.year)
        }
      }
      console.log(`hintsFound = `, hintsFound.value.year)
      console.log(`cluesFound = `, cluesFound.year)
    }

    if (!cluesFound.movieLength) {
      if (lengthFound === lengthToMatch) {
        cluesFound.movieLength = lengthToMatch
        console.log('congrats, you found the right length')
      } else {
        if (!isNaN(lengthToMatch) && lengthToMatch !== 0 && lengthFound !== 0) {
          guessNumber(lengthFound, lengthToMatch, hintsFound.value.movieLength)
        }
      }
      console.log(`hintsFound = `, hintsFound.value.movieLength)
      console.log(`cluesFound = `, cluesFound.movieLength)
    }
  }

  function guessNumber(numberTrial: number, numberToFind: number, interval: Interval) {
    const numberDiff = (number: number) => number - numberToFind
    const foundDiff = numberDiff(numberTrial)
    console.log('important', numberTrial, numberDiff)

    if (!interval.moreThan && numberTrial < numberToFind) {
      interval.moreThan = numberTrial
    } else if (!interval.lessThan && numberTrial > numberToFind) {
      interval.lessThan = numberTrial
    } else if (interval.lessThan && interval.moreThan) {
      if (foundDiff > 0 && interval.lessThan) {
        console.log('condition truc bizarre1')
        const numberToKeep = Math.min(interval.lessThan, numberTrial)
        interval.lessThan = numberToKeep
      } else if (foundDiff < 0 && interval.moreThan) {
        console.log('condition truc bizarre2')
        const numberToKeep = Math.max(interval.moreThan, numberTrial)
        interval.moreThan = numberToKeep
      }
    } else {
      console.log('condition truc bizarre3')
      if (foundDiff > 0) {
        interval.lessThan = numberTrial
      } else {
        interval.moreThan = numberTrial
      }
    }

    console.log(interval)
  }

  return { movieToFind, compareMovie }
})
