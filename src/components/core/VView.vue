<script setup>
import { useTitle } from "@vueuse/core";
import { onMounted } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "Título",
  },
});

const usetitle = useTitle();

onMounted(
  () => (usetitle.value = `${import.meta.env.VITE_SIGLA} - ${props.title}`)
);
</script>
<template>
  <div class="container shadow-lg">
    <div class="row m-1 v-view">
      <h5>{{ title }}</h5>
      <slot />
    </div>
  </div>
</template>
<style scoped>
.v-view {
  height: auto;
  min-height: 250px;
}
</style>
