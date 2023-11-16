<script setup lang="ts">
import { useMovieApi } from '@/composables/useMovieApi'
import { movieGuessFinderStore } from '@/stores/movieGuessFinder'
import type MovieOverview from '@/types/MovieOverview'
import { ref } from 'vue'
import SearchSuggestions from '@/components/SearchSuggestions.vue'
import { debounce } from '@/helpers/debounce'
import { onClickOutside } from '@vueuse/core'

const {searchMovie} = useMovieApi()
const movieFinderStore = movieGuessFinderStore()
const emit = defineEmits(['search', 'found'])

const searchTerm = ref('')
const searching = ref(false)
let searchResults = ref<null | MovieOverview[]>(null)
const searchBar = ref(null)

onClickOutside(searchBar, () => {
  searching.value = false
})

function showResultsIfExist() {
  if (searchResults.value) {
    searching.value = true
  }
}

async function fireSearch() {
  searching.value = true
  const foundData = await searchMovie(searchTerm.value)
  searchResults.value = foundData.data.value.results
  console.log(searchResults.value)
}

const debouncedFireSearch = debounce(fireSearch, 800)

async function compareMovies(movieId: number) {
  searching.value = false
  searchResults.value = null
  searchTerm.value = ''
  const movieMatch = movieFinderStore.compareMovie(movieId)
  if (!movieMatch) {
    const result = await movieFinderStore.getHints(movieId)
    if (result) {
      emit('search')
    }
  } else {
    emit('found')
  }
}
</script>

<template>
  <div class="searchAndResults" ref="searchBar" @click="showResultsIfExist">
    <div class="search-bar">
      <input
        placeholder="Guess the movie"
        type="search"
        name="search"
        autocomplete="off"
        required
        @input="debouncedFireSearch"
        v-model="searchTerm"
      />
      <button class="search-btn" @click="fireSearch">
        <span>Search</span>
      </button>
    </div>
    <Suspense v-if="searching">
      <template #default>
        <div class="resultsSuggested" v-if="searching && searchResults?.length">
          <SearchSuggestions
            v-for="searchResult in searchResults"
            :key="searchResult.id"
            :movie="searchResult"
            @select="compareMovies"
          />
        </div>
        <div
          class="resultsSuggested"
          v-else-if="searching && searchResults && searchResults.length == 0 && searchTerm.length"
        >
          <div class="suggested empty">No result found...</div>
        </div>
      </template>
      <template #fallback>
        <div class="resultsSuggested">
          <div class="suggested empty">Loading...</div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
:root {
  font-size: calc(16px + (24 - 16) * (100vw - 320px) / (1920 - 320));
}
body,
button,
input {
  font:
    1em Hind,
    sans-serif;
  line-height: 1.5em;
}
body,
input {
  color: #171717;
}
body,
.search-bar {
  display: flex;
}
body {
  background: #f1f1f1;
  height: 100vh;
}
.search-bar input,
.search-btn,
.search-btn:before,
.search-btn:after {
  transition: all 0.25s ease-out;
}
.resultsSuggested {
  background: white;
  width: calc(100% - 3em);
  margin-inline: 2px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  overflow: hidden;
  position: absolute;
  z-index: 10;
}

.searchAndResults {
  width: min(80%, 32em);
  position: relative;
}
.search-bar input,
.search-btn {
  width: 3em;
  height: 3em;
}
.search-bar input:invalid:not(:focus),
.search-btn {
  cursor: pointer;
}
.search-bar,
.search-bar input:focus,
.search-bar input:valid {
  width: 100%;
}
.search-bar input:focus,
.search-bar input:not(:focus) + .search-btn:focus {
  outline: transparent;
}
.search-bar {
  margin: auto;
  justify-content: center;
}
.search-bar input {
  background: transparent;
  border-radius: 1.5em;
  box-shadow: 0 0 0 0.4em #171717 inset;
  padding: 0.75em;
  transform: translate(0.5em, 0.5em) scale(0.5);
  transform-origin: 100% 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.search-bar input::-webkit-search-decoration {
  -webkit-appearance: none;
}
.search-bar input:focus,
.search-bar input:valid {
  background: #fff;
  border-radius: 0.375em 0 0 0.375em;
  box-shadow: 0 0 0 0.1em #d9d9d9 inset;
  transform: scale(1);
}
.search-btn {
  background: #171717;
  border-radius: 0 0.75em 0.75em 0 / 0 1.5em 1.5em 0;
  padding: 0.75em;
  position: relative;
  transform: translate(0.25em, 0.25em) rotate(45deg) scale(0.25, 0.125);
  transform-origin: 0 50%;
}
.search-btn:before,
.search-btn:after {
  content: '';
  display: block;
  opacity: 0;
  position: absolute;
}
.search-btn:before {
  border-radius: 50%;
  box-shadow: 0 0 0 0.2em #f1f1f1 inset;
  top: 0.75em;
  left: 0.75em;
  width: 1.2em;
  height: 1.2em;
}

.suggested {
  border-bottom: 1px solid #b5a2a2ad;
  padding: 0.5rem 1rem;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.suggested:hover {
  background: rgb(0, 0, 0, 0.03);
}
.empty {
  padding-block: 0.5rem;
}
.search-btn:after {
  background: #f1f1f1;
  border-radius: 0 0.25em 0.25em 0;
  top: 51%;
  left: 51%;
  width: 0.75em;
  height: 0.25em;
  transform: translate(0.2em, 0) rotate(45deg);
  transform-origin: 0 50%;
}
.search-btn span {
  display: inline-block;
  overflow: hidden;
  width: 1px;
  height: 1px;
}

/* Active state */
.search-bar input:focus + .search-btn,
.search-bar input:valid + .search-btn {
  background: #2762f3;
  border-radius: 0 0.375em 0.375em 0;
  transform: scale(1);
}
.search-bar input:focus + .search-btn:before,
.search-bar input:focus + .search-btn:after,
.search-bar input:valid + .search-btn:before,
.search-bar input:valid + .search-btn:after {
  opacity: 1;
}
.search-bar input:focus + .search-btn:hover,
.search-bar input:valid + .search-btn:hover,
.search-bar input:valid:not(:focus) + .search-btn:focus {
  background: #0c48db;
}
.search-bar input:focus + .search-btn:active,
.search-bar input:valid + .search-btn:active {
  transform: translateY(1px);
}

@media screen and (prefers-color-scheme: dark) {
  body,
  input {
    color: #f1f1f1;
  }
  body {
    background: #171717;
  }
  .search-bar input {
    box-shadow: 0 0 0 0.4em #f1f1f1 inset;
  }
  .search-bar input:focus,
  .search-bar input:valid {
    background: #3d3d3d;
    box-shadow: 0 0 0 0.1em #3d3d3d inset;
  }
  .search-btn {
    background: #f1f1f1;
  }
}
</style>
