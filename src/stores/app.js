import { readonly, reactive } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const _sistema = reactive({
    sigla: "Sigla",
    descricao: "Texto que descreve o sistema de forma bem resumida",
    informacao:
      "Parágrafo ou texto informativo de poucas palavras que descreve a importância do sistema.",
    versao: "v 1.0",
    unidades: [],
  });

  const _cias = reactive([
    {
      id: 1,
      sigla: "Sede",
    },
    {
      id: 2,
      sigla: "Filial",
    },
  ]);

  return { sistema: readonly(_sistema), cias: readonly(_cias) };
});
