<script setup lang="ts">
import { movieGuessFinderStore } from '@/stores/movieGuessFinder'
import { computed } from 'vue'

const store = movieGuessFinderStore()

interface MovieInformationProps {
  property: 'movieLength' | 'genre' | 'year'
}

const moreThan = computed(() => {
  if (props.property === 'movieLength') {
    return `+ ${store.hintsFound[props.property].moreThan} min`
  } else if (props.property === 'year') {
    return `< ${store.hintsFound[props.property].moreThan}`
  } else {
    return ''
  }
})
const lessThan = computed(() => {
  if (props.property === 'movieLength') {
    return `- ${store.hintsFound[props.property].lessThan} min`
  } else if (props.property === 'year') {
    return `> ${store.hintsFound[props.property].lessThan}`
  } else {
    return ''
  }
})
const inBetween = computed(() => {
  if (props.property === 'movieLength') {
    return `${store.hintsFound[props.property].moreThan} - ${
      store.hintsFound[props.property].lessThan
    } min`
  } else if (props.property === 'year') {
    return `${store.hintsFound[props.property].moreThan} - ${
      store.hintsFound[props.property].lessThan
    }`
  } else {
    return ''
  }
})

const props = defineProps<MovieInformationProps>()
</script>

<template>
  <div
    v-if="
      (property !== 'genre' && store.cluesFound[property]) ||
      (property === 'genre' && store.cluesFound[property].length) ||
      (property !== 'genre' &&
        (store.hintsFound[property]?.moreThan || store.hintsFound[property]?.lessThan))
    "
    :class="property"
  >
    <div class="clue" v-if="store.cluesFound[property]">
      <template v-if="property === 'genre'">
        <ul>
          <li v-for="genreName in store.cluesFound[property]" :key="genreName">
            <div class="movie-label">
              {{ genreName }}
            </div>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="clue movie-label">{{ store.cluesFound[property] }}</div>
      </template>
    </div>
    <div class="hint movie-label" v-else-if="property !== 'genre'">
      <template v-if="store.hintsFound[property]?.lessThan && store.hintsFound[property]?.moreThan">
        {{ inBetween }}
      </template>
      <template v-else-if="store.hintsFound[property]?.lessThan">
        {{ lessThan }}
      </template>
      <template v-else-if="store.hintsFound[property]?.moreThan">
        {{ moreThan }}
      </template>
    </div>
  </div>
</template>

<style>
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  gap: 2rem;
}
.movie-label {
  font-size: 0.8rem;
  border: 1px solid #908b8ba3;
  display: inline-block;
  border-radius: 1em;
  padding: 0.3em 0.9em;
  background: #33313191;
  color: #e4d6d6;
}
</style>
