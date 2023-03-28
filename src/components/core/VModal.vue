<script setup>
import VOverlay from "./VOverlay.vue";

defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    default: "Título da Modal",
  },
});
</script>
<template>
  <v-overlay :show="show">
    <transition name="modal">
      <div class="modal">
        <div class="modal-dialog" role="document">
          <div id="modal" class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }}</h5>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </v-overlay>
</template>
<style scoped>
.slide-enter,
.slide-leave-to {
  transform: translateY(-10vh);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.modal {
  display: block !important;
}
</style>
