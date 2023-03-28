<script setup>
defineProps(["required", "label"]);
</script>
<template>
  <label class="form-label fw-bold">
    <span v-if="required" class="text-danger">*</span>{{ label }}
  </label>
</template>
