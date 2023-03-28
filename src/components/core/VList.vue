<script setup>
import VView from "./VView.vue";
import VButton from "./VButton.vue";
defineProps({
  title: { type: String, default: "Título da Página" },
  pesquisar: { type: Function, default: () => {} },
  limpar: { type: Function, default: () => {} },
  novo: { type: Function, default: () => {} },
});
</script>
<template>
  <v-view :title="title">
    <div class="col">
      <v-button
        v-if="novo"
        icon="bi bi-plus-square"
        color="primary"
        label="Adicionar"
        class="float-end"
        @click="novo()"
      />
    </div>

    <fieldset>
      <legend>Filtros</legend>
      <slot name="filter" />
      <div class="row">
        <div class="col">
          <div class="float-end">
            <v-button
              icon="bi bi-search"
              color="primary"
              label="Pesquisar"
              class="me-1"
              @click="pesquisar"
            />
            <v-button
              icon="bi bi-eraser"
              color="secondary"
              label="Limpar"
              @click="limpar"
            />
          </div>
        </div>
      </div>
    </fieldset>
    <fieldset>
      <legend>Resultados</legend>
      <slot name="result" />
    </fieldset>
  </v-view>
</template>
