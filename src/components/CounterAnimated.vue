<template>
  <div class="tries-number-wrapper" v-if="count">
    <div class="number-wrap" style="text-align: center">
      <div class="tries">
        <div :style="{ transform: displayCurrentLevel }" class="currentLevel">
          <template v-for="n in 11" :key="n">
            <span>{{ n - 1 }}</span>
          </template>
        </div>
      </div>
    </div>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface Count {
  count: number
}
const props = defineProps<Count>()

const displayCurrentLevel = computed(() => {
  return `translate(0, -${props.count * 1.5}rem)`
})
</script>

<style scoped>
.tries {
  height: 1.5rem;
  overflow: hidden;
}

.currentLevel {
  color: white;
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  height: 1.5rem;
  align-items: center;
}

.currentLevel span,
.nextLevel span {
  font-weight: 900;
  font-family: 'Orbitron', sans-serif;
  font-size: 1.3rem;
  line-height: 1.5rem;
}

.tries-number-wrapper {
  text-align: center;
}
</style>
