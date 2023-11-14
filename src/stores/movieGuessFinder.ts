import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type MovieDetails from '@/types/MovieDetails'
import { useMovieApiStore } from '@/stores/movieApi'

interface foundHints {
  year: Interval
  movieLength: Interval
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
  const failedAttempts = ref<MovieDetails[]>([])

  const hintsFound = ref<foundHints>({
    year: { moreThan: null, lessThan: null },
    movieLength: { moreThan: null, lessThan: null }
  })
  const cluesFound = reactive<foundClues>({ year: null, genre: [], movieLength: null })

  function compareMovie(movieId: number) {
    if (!movieToFind.value) {
      console.error('there has been an error somewhere bro')
      return
    }

    console.log(movieId, movieToFind.value.id, movieId === movieToFind.value.id)
    if (movieId === movieToFind.value.id) {
      alert('you found the right movie')
      return true
    } else {
      alert('try again, youre getting closer')
      // getHints(movieId)
      return false
    }
  }

  function resetGame() {
    movieToFind.value = null
    failedAttempts.value = []
  }

  async function getHints(movieId: number) {
    const response = await tmdbStore.getMovieById(movieId)
    const comparedMovie: MovieDetails = response.data.value
    failedAttempts.value.unshift(comparedMovie)

    if (!movieToFind.value || !compareMovie) {
      console.error('there has been an error somewhere bro')
      return null
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

    genresFound.forEach((genre) => {
      if (genresToMatch.includes(genre) && !cluesFound.genre.includes(genre)) {
        cluesFound.genre.push(genre)
      }
    })

    return { cluesFound, hintsFound }
  }

  function guessNumber(numberTrial: number, numberToFind: number, interval: Interval) {
    const numberDiff = (number: number) => number - numberToFind
    const foundDiff = numberDiff(numberTrial)
    console.log('important', numberTrial, numberDiff)

    if (foundDiff > 0) {
      if (!interval.lessThan) {
        interval.lessThan = numberTrial
      } else {
        const numberToKeep = Math.min(interval.lessThan, numberTrial)
        interval.lessThan = numberToKeep
      }
    } else {
      if (!interval.moreThan) {
        interval.moreThan = numberTrial
      } else {
        const numberToKeep = Math.max(interval.moreThan, numberTrial)
        interval.moreThan = numberToKeep
      }
    }

    // if (!interval.moreThan && !interval.lessThan) {
    //   if (foundDiff > 0) {
    //     interval.lessThan = numberTrial
    //   }
    // } else if (interval.moreThan) {
    //   if (numberTrial < numberToFind) {
    //     interval.moreThan = numberTrial
    //   }
    // } else if (interval.lessThan) {
    //   if (numberTrial > numberToFind) {
    //     interval.lessThan = numberTrial
    //   }
    // } else {
    //   if (foundDiff > 0 && interval.lessThan) {
    //     console.log('condition truc bizarre1')
    //     const numberToKeep = Math.min(interval.lessThan, numberTrial)
    //     interval.lessThan = numberToKeep
    //   } else if (foundDiff < 0 && interval.moreThan) {
    //     console.log('condition truc bizarre2')
    //     const numberToKeep = Math.max(interval.moreThan, numberTrial)
    //     interval.moreThan = numberToKeep
    //   }
    // }

    console.log(interval)
  }

  return { movieToFind, compareMovie, getHints, hintsFound, cluesFound, failedAttempts, resetGame }
})
