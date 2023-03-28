import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoriaStore = defineStore("categoria", () => {
  const categorias = ref([]);

  function addCategorias(itens) {
    categorias.value = itens;
  }

  return {
    categorias,
    addCategorias,
  };
});
