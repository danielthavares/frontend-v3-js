import { ref } from "vue";
import { usePageStore } from "../stores/page";

export function useListView(
  key,
  { initialItens, initialFilter, initialPagination }
) {
  const pageStore = usePageStore();

  const itens = ref(initialItens);
  const filter = ref(initialFilter);
  const pagination = ref(initialPagination);

  function _deepClone(obj) {
    if (obj && typeof obj === "object") return JSON.parse(JSON.stringify(obj));
  }

  function change() {
    pageStore.add({
      key,
      body: {
        itens: _deepClone(itens.value),
        filter: _deepClone(filter.value),
        pagination: _deepClone(pagination.value),
      },
    });
  }

  function load() {
    const page = _deepClone(pageStore.page);

    if (Object.keys(page).length > 0) {
      if (page.key === key) {
        itens.value = page.body.itens;
        filter.value = page.body.filter;
        pagination.value = page.body.pagination;
      }
    }
  }

  return {
    itens,
    filter,
    pagination,
    clear: pageStore.clear,
    change,
    load,
  };
}
