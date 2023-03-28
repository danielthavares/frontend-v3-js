<script setup>
import { computed, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAsyncState } from "@vueuse/core";
import VList from "../../components/core/VList.vue";
import VInput from "../../components/core/VInput.vue";
import VTable from "../../components/core/VTable.vue";
import VSelect from "../../components/core/VSelect.vue";
import { useNotificationStore } from "../../stores/notification";
import { useCategoriaStore } from "../../stores/categoria";
import { useProdutoService } from "../../services/ProdutoService";
import { useCategoriaService } from "../../services/CategoriaService";
import { useListView } from "../../composables/useListView";

const router = useRouter();
const notification = useNotificationStore();
const categoriaStore = useCategoriaStore();
const { pesquisar, excluir } = useProdutoService();
const { carregar } = useCategoriaService();

const { change, load, itens, pagination, filter } = useListView(
  "produto_list_view",
  {
    initialItens: [],
    initialFilter: {
      nome: "",
      descricao: "",
      idCategoria: 0,
    },
    initialPagination: {},
  }
);

const columns = [
  { field: "nome", header: "Nome", size: 3 },
  { field: "descricao", header: "Descrição", size: 5 },
  { field: "categoriaNome", header: "Categoria", size: 3 },
];

const actions = [
  {
    icon: "bi bi-binoculars-fill",
    click: _visualizar,
    label: "Visualizar",
  },
  {
    icon: "bi bi-pencil-fill",
    click: _editar,
    label: "Editar",
  },
  {
    icon: "bi bi-trash-fill",
    click: _antesDeExcluir,
    label: "Excluir",
  },
];

function _limpar() {
  filter.value["nome"] = "";
  filter.value["descricao"] = "";
  filter.value["idCategoria"] = 0;
}

function _novo() {
  router.push({
    name: "produtos_form",
    params: { action: "create" },
  });
}

function _visualizar(item) {
  router.push({
    name: "produtos_form",
    params: { action: "read" },
    query: { id: item["idProduto"] },
  });
}

function _editar(item) {
  router.push({
    name: "produtos_form",
    params: { action: "update" },
    query: { id: item["idProduto"] },
  });
}

const categoriaState = useAsyncState(carregar, {}, { immediate: false });

const excluirState = useAsyncState(
  excluir,
  {},
  {
    immediate: false,
    onError: (e) => {
      notification.alertDanger(e.errors);
    },
    onSuccess: (state) => {
      notification.alertSuccess(state.success);
      itens.value = itens.value.filter(
        (x) => x["idProduto"] !== state.data["idProduto"]
      );
    },
  }
);

function _excluir(id) {
  excluirState.execute(0, id);
}

function _antesDeExcluir(item) {
  notification.confirmationDisplay(
    "Deseja realmente excluir este registro?",
    _excluir,
    item["idProduto"]
  );
}

const pesquisarState = useAsyncState(
  pesquisar,
  {},
  {
    immediate: false,
    onError: (e) => {
      itens.value = [];
      notification.alertDanger(e.errors);
    },
    onSuccess: (state) => {
      itens.value = state.data;
      pagination.value["previousPage"] = state.previousPage;
      pagination.value["nextPage"] = state.nextPage;
      pagination.value["pageNumber"] = state.pageNumber;
      pagination.value["totalPages"] = state.totalPages;

      change();
    },
  }
);

function _pesquisar() {
  pesquisarState.execute(0, { params: filter.value });
}

function _pagina(page) {
  pesquisarState.execute(0, { page });
}

notification.loader = computed(() => {
  return (
    excluirState.isLoading.value ||
    pesquisarState.isLoading.value ||
    categoriaState.isLoading.value
  );
});

onBeforeMount(async () => {
  await categoriaState.execute();
});

onMounted(load);
</script>
<template>
  <v-list
    title="Listagem de produtos"
    :pesquisar="_pesquisar"
    :novo="_novo"
    :limpar="_limpar"
  >
    <template #filter>
      <div class="row">
        <v-input v-model="filter.nome" label="Nome" class="col" />
        <v-input v-model="filter.descricao" label="Descrição" class="col" />
        <v-select
          v-model="filter.idCategoria"
          label="Categorias"
          class="col"
          :options="categoriaStore.categorias"
          value-id="idCategoria"
          description="nome"
          :value-no-selected="0"
        />
      </div>
    </template>
    <template #result>
      <v-table
        :values="itens"
        :columns="columns"
        :actions="actions"
        :pagination="pagination"
        @click-pagination="_pagina"
      />
    </template>
  </v-list>
</template>
