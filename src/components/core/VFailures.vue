<script setup>
defineProps({
  failures: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <div v-if="failures.length > 0" class="text-danger">
    <ul>
      <li v-for="failure in failures" :key="failure">{{ failure }}</li>
    </ul>
  </div>
</template>
<style scoped>
ul {
  list-style-type: none;
  padding-left: 1rem;
}

li {
  font-size: 14px;
}
</style>
