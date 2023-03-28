import { defineStore /*skipHydrate,*/ } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { computed, readonly } from "vue";
import { remove } from "../infra/localStorage";

export const useAccountStore = defineStore("account", () => {
  const _account = useLocalStorage(`${import.meta.env.VITE_SIGLA}_account`, {
    login: null,
    nome: null,
    perfis: [],
    menus: [],
    token: null,
  });

  const token = computed(() => _account.value.token);

  function add({ login, nome, perfis, menus, token }) {
    _account.value.login = login;
    _account.value.nome = nome;
    _account.value.perfis = perfis;
    _account.value.menus = menus;
    _account.value.token = token;
  }

  function clear() {
    _account.value.login = null;
    _account.value.nome = null;
    _account.value.perfis = [];
    _account.value.menus = [];
    _account.value.token = null;
    remove(`${import.meta.env.VITE_SIGLA}_account`);
  }

  return { account: readonly(_account), token, add, clear };
});
