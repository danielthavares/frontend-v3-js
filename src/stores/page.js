import { defineStore } from "pinia";
import { ref } from "vue";

//Armazena state de uma página por vez.
export const usePageStore = defineStore("page", () => {
  const page = ref({
    key: null,
    body: {},
  });

  function add({ key, body }) {
    page.value.key = key;
    page.value.body = body;
  }

  function clear() {
    page.value.key = null;
    page.value.body = {};
  }

  return {
    page,
    add,
    clear,
  };
});
