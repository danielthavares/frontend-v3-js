<script setup>
import VModal from "./VModal.vue";
import VButton from "./VButton.vue";

defineProps({
  message: {
    type: String,
    default: "Confirmar a operação?",
  },
  show: {
    type: Boolean,
    default: false,
    required: true,
  },
});
defineEmits(["click"]);
</script>
<template>
  <v-modal :show="show">
    <template #body>
      <p class="text-justify">{{ message }}</p>
    </template>
    <template #footer>
      <v-button label="Sim" color="primary" @click="$emit('click', true)" />
      <v-button label="Não" @click="$emit('click', false)" />
    </template>
  </v-modal>
</template>
