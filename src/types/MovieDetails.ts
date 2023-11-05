import type MovieOverview from './MovieOverview'

export default interface MovieDetails {
  adult: boolean
  backdrop_path: string
  id: number
  genres: {
    id: number
    name: string
  }[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
  }[]
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
