<script setup>
import { computed } from "vue";

const props = defineProps({
  header: {
    type: String,
    default: "Header",
  },
  title: {
    type: String,
    default: "Title",
  },
  text: {
    type: String,
    default: "text",
  },
  white: {
    type: Boolean,
    default: false,
    note: "cor da fonte branco ou não",
  },
  color: {
    type: String,
    default: "secondary",
    note: "primary, secondary, success, danger, warning, info, light, dark",
  },
});

const classColor = computed(() =>
  props.color ? `bg-${props.color}` : "bg-secondary"
);
const classTextWhite = computed(() =>
  props.white === true ? "text-white" : ""
);
</script>
<template>
  <div class="card custom-card mb-3" :class="[classColor, classTextWhite]">
    <div class="card-header">{{ header }}</div>
    <div class="card-body">
      <h4 class="card-title">{{ title }}</h4>
      <p class="card-text">{{ text }}</p>
    </div>
  </div>
</template>
<style>
.row > .card {
  padding-left: 0px;
  padding-right: 0px;
}

.custom-card {
  width: 20rem;
}
</style>
