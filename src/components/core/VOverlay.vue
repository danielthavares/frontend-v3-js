<script setup>
import { watch } from "vue";

const props = defineProps({
  show: { type: Boolean, default: false },
});

watch(
  () => props.show,
  (newValue) => {
    document.body.style = newValue === true ? "overflow: hidden;" : "";
  }
);
</script>
<template>
  <transition name="fade">
    <div v-show="show" class="custom-overlay">
      <slot></slot>
    </div>
  </transition>
</template>
<style scoped>
.custom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
