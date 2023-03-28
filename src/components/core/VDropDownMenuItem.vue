<script setup>
defineProps({
  divider: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "Menu Item",
  },
  icon: {
    type: [String, null],
    default: null,
  },
  link: {
    type: String,
    default: "/",
  },
  query: {
    type: Object,
    default: () => {},
  },
});
defineEmits(["click"]);
</script>
<template>
  <li v-if="name == null" role="separator" class="divider"></li>

  <li v-else @click="$emit('click')">
    <router-link :to="{ path: link, query: query }" class="dropdown-item">
      <span v-if="icon" :class="icon"></span>
      {{ name }}
    </router-link>
  </li>
</template>
