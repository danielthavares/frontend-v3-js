<script setup>
import { computed } from "vue";

const props = defineProps({
  icon: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    default: "Label",
  },
  size: {
    type: Number,
    default: null,
  },
  color: {
    type: String,
    default: "default",
    note: "Cores primarias do bootstrap",
  },
  disabled: { type: Boolean, default: false },
});

const classColor = computed(() => {
  return props.color ? `btn-${props.color}` : "btn-default";
});
const classSize = computed(() => {
  return props.size ? `w-${props.size}` : "";
});
</script>
<template>
  <button class="btn" :class="[classColor, classSize]" :disabled="disabled">
    <em v-if="icon" :class="icon"></em>
    {{ label }}
  </button>
</template>
