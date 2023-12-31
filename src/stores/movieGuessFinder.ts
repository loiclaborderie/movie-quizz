import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type MovieDetails from '@/types/MovieDetails'
import { useMovieApi } from '@/composables/useMovieApi'

interface Interval {
  moreThan: number | null
  lessThan: number | null
}

interface FoundHints {
  year: Interval
  movieLength: Interval
}

interface FoundClues {
  year: number | null
  movieLength: number | null
  genre: string[]
}

export const movieGuessFinderStore = defineStore('movieGuessFinder', () => {
  const movieToFind = ref<MovieDetails | null>(null)
  const failedAttempts = ref<MovieDetails[]>([])

  const hintsFound = ref<FoundHints>({
    year: { moreThan: null, lessThan: null },
    movieLength: { moreThan: null, lessThan: null }
  })

  const cluesFound = reactive<FoundClues>({ year: null, genre: [], movieLength: null })

  const { getMovieById } = useMovieApi()

  function compareMovie(movieId: number): boolean {
    if (!movieToFind.value) {
      console.error('There has been an error somewhere.')
      return false
    }

    const isMatch = movieId === movieToFind.value.id
    return isMatch
  }

  function resetGame() {
    movieToFind.value = null
    failedAttempts.value = []
    hintsFound.value = { year: { moreThan: null, lessThan: null }, movieLength: { moreThan: null, lessThan: null } }
    cluesFound.year = null
    cluesFound.genre = []
    cluesFound.movieLength = null
  }

  async function getHints(movieId: number) {
    const response = await getMovieById(movieId)
    const comparedMovie: MovieDetails = response.data.value
    failedAttempts.value.unshift(comparedMovie)

    if (!movieToFind.value || !compareMovie) {
      console.error('There has been an error somewhere.')
      return null
    }

    const yearFound = parseInt(comparedMovie.release_date.slice(0, 4))
    const yearToMatch = parseInt(movieToFind.value.release_date.slice(0, 4))
    const lengthFound = comparedMovie.runtime
    const lengthToMatch = movieToFind.value.runtime
    const genresFound = comparedMovie.genres.map((genre) => genre.name)
    const genresToMatch = movieToFind.value.genres.map((genre) => genre.name)

    const yearInterval = hintsFound.value.year
    const lengthInterval = hintsFound.value.movieLength

    if (!cluesFound.year) {
      if (yearFound === yearToMatch) {
        cluesFound.year = yearToMatch
      } else {
        guessNumber(yearFound, yearToMatch, yearInterval)
      }
    }

    if (!cluesFound.movieLength) {
      if (lengthFound === lengthToMatch) {
        cluesFound.movieLength = lengthToMatch
      } else {
        guessNumber(lengthFound, lengthToMatch, lengthInterval)
      }
    }

    genresFound.forEach((genre) => {
      if (genresToMatch.includes(genre) && !cluesFound.genre.includes(genre)) {
        cluesFound.genre.push(genre)
      }
    })

    return { cluesFound, hintsFound }
  }

  function guessNumber(numberTrial: number, numberToFind: number, interval: Interval) {
    const foundDiff = numberTrial - numberToFind

    if (foundDiff > 0) {
      interval.lessThan = !interval.lessThan ? numberTrial : Math.min(interval.lessThan, numberTrial)
    } else {
      interval.moreThan = !interval.moreThan ? numberTrial : Math.max(interval.moreThan, numberTrial)
    }
  }

  return { movieToFind, compareMovie, getHints, hintsFound, cluesFound, failedAttempts, resetGame }
})
