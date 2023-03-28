<script setup>
import VView from "./VView.vue";
import VButton from "./VButton.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    default: "Registro",
  },
  action: {
    type: String,
    default: "create", // update ou read
  },
  salvar: { type: Function, default: () => {} },
  cancelar: { type: Function, default: () => {} },
  voltar: {
    type: Function,
    default: () => {
      useRouter().push({ name: "home" });
    },
  },
});

const dynamicTitle = computed(() => {
  if (props.action === "create") return `Adicionando ${props.title}`;

  if (props.action === "update") return `Atualizando ${props.title}`;

  return props.action === "read" ? `Visualizando ${props.title}` : "";
});
</script>
<template>
  <v-view :title="dynamicTitle">
    <fieldset>
      <legend>Dados</legend>
      <slot name="dados" />
    </fieldset>
    <div class="row mb-2">
      <div class="col">
        <div class="float-end">
          <v-button
            v-if="action !== 'read'"
            icon="bi bi-save"
            color="primary"
            label="Salvar"
            class="me-1"
            @click="salvar"
          />
          <v-button
            v-if="action !== 'read'"
            icon="bi bi-x-square"
            color="danger"
            class="me-1"
            label="Cancelar"
            @click="cancelar"
          />
          <v-button
            v-if="action === 'read'"
            icon="bi bi-arrow-counterclockwise"
            color="secondary"
            label="Voltar"
            @click="voltar"
          />
        </div>
      </div>
    </div>
  </v-view>
</template>
