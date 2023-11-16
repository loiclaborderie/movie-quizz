<template>
  <Teleport to="#modal">
    <Transition name="modal">
      <div class="modal-bg" v-if="isModalOpen">
        <div ref="modal" class="modal">
          <button @click="isModalOpen = false" class="close-btn">x</button>
          <div class="modal-content">
            <h2 class="title">
              <slot name="title"></slot>
            </h2>
            <div class="text-content">
              <slot name="content"></slot>
            </div>
            <div class="actions">
              <slot name="actions"></slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isModalOpen = ref(true)
const modal = ref<HTMLElement | null>(null)
onClickOutside(modal, () => (isModalOpen.value = false))
</script>

<style scoped>
.modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  position: relative;
  background: white;
  border-radius: 5px;
  box-shadow: 0 10px 5px 2px rgba(0, 0, 0, 0.1);
  min-width: 40%;
  min-height: 30%;
  font-family: 'Noto Sans', Arial, Helvetica, sans-serif;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  border: 1px solid #898787ab;
  border-radius: 5px;
  background: #e7e7e7;
  transition: 0.3s ease-in;
}
.close-btn:hover {
  background: red;
  color: white;
}

.modal-content {
  padding: 20px;
  width: 100%;
  height: 100%;
}

.modal-enter-active {
  transition: all 0.25 ease;
}
.modal-enter-from,
.modal-leave-from {
  opacity: 0;
  transform: scale(1.1);
}

h2.title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
}

.text-content {
  padding: 1rem 1rem 0rem;
}
</style>
