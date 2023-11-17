<script setup lang="ts">
import { computed } from 'vue'
import type MovieDetails from '@/types/MovieDetails'

interface MovieCardProps {
  movie: MovieDetails
  movieToFind?: MovieDetails
}
const props = defineProps<MovieCardProps>()

const movieTime = computed(() => {
  const time = props.movie.runtime
  if (time < 60) {
    return `${time}${time >= 2 ? 'mins' : 'min'}`
  } else {
    const hours = Math.floor(time / 60)
    const minutesLeft = time % (hours * 60)
    return `${hours}h${minutesLeft >= 10 ? '' : '0'}${minutesLeft}`
  }
})

const imageLink = computed(() => {
  return `url(https://image.tmdb.org/t/p/original${
    props.movie.backdrop_path ? props.movie.backdrop_path : props.movie.poster_path
  })`
})
</script>

<template>
  <div class="movie-card">
    <div class="image-darkener"></div>
    <div class="dots-bg"></div>
    <div class="card-content">
      <div class="card-title">
        {{ `${movie.title.substring(0, 35)}${movie.title.length > 30 ? '...' : ''}` }}
      </div>
      <div class="movie-overview">
        {{ `${movie.overview.substring(0, 300)}${movie.overview.length > 300 ? '...' : ''}` }}
      </div>
      <div class="card-labels">
        <template v-if="movie.genres.length">
          <div class="label label-genre" v-for="genre in movie.genres" :key="genre.id">
            {{ genre.name }}
          </div>
        </template>
        <div v-if="movie.runtime" class="label label-length">{{ movieTime }}</div>
        <div v-if="movie.release_date" class="label label-year">
          {{ movie.release_date.substring(0, 4) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  margin: 2rem auto;
  width: 80%;
  min-height: 200px;
  position: relative;
  background-color: rgb(16 16 16);
  border-radius: 1.5rem;
  padding: clamp(.5rem, .5vw + .5rem, 1rem) clamp(1rem, 1vw + 1rem, 2rem);
  color: rgb(250 249 246);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  background-image: v-bind(imageLink);
  display: flex;
    justify-content: center;
    align-items: center;
}

.movie-card .image-darkener {
  position: absolute;
  background-color: black;
  inset: 0;
  z-index: 2;
  opacity: 0.75;
}
.movie-card .dots-bg {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-position: 50% 50%;
  background-size: 1.1rem 1.1rem;
  border-radius: 1.25rem;
  overflow: hidden;
}

.card-content {
  position: relative;
  z-index: 3;
}

.card-content .card-title,
.card-content .movie-overview {
  text-align: center;
}

.movie-card .card-title {
  text-align: center;
  color: rgb(250 249 246);
  font-size: 2.6rem;
  padding-bottom: 1rem;
}

.card-content .movie-overview {
  color: rgb(255 255 255 / 75%);
  line-height: 1.3rem;
  font-size: 0.9rem;
  padding-inline: 1rem;
}

@media (max-width: 700px) {
  .movie-card {
    width: calc(100% - 2rem);
    /* margin: 0rem 1rem; */
    padding: 0.75rem;
    border-radius: 1rem;
  }
}

@media (max-width: 600px) {
  .card-content .card-title {
    font-size: 2.2rem;
  }
}
.card-labels {
  display: flex;
  justify-content: center;
  gap: clamp(0.75rem, 0.6vw + 1rem, 2rem);
  padding-top: 1rem;
  flex-wrap: wrap;
}
.label {
  font-size: 0.8rem;
  border: 1px solid #908b8ba3;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1em;
  padding: clamp(0.2rem, 0.2vw + 0.2rem, 0.5rem) clamp(0.5rem, 0.5vw + 0.5rem, 1rem);
  background: #33313191;
  color: #e4d6d6;
  text-align: center;
}
</style>
