<script setup>
import VView from "../components/core/VView.vue";
import VCard from "../components/core/VCard.vue";
import VAccordion from "../components/core/VAccordion.vue";
import VTab from "../components/core/VTab.vue";
import VTable from "../components/core/VTable.vue";
import VTooltip from "../components/core/VTooltip.vue";
import { useCounterStore } from "../stores/counter";
import { reactive } from "vue";

const userStore = useCounterStore();

const columns = [
  { field: "nome", header: "Nome", size: 4 },
  { field: "descricao", header: "Descrição", size: 4 },
  { field: "categoriaNome", header: "Categoria", size: 3 },
];

const actions = [
  {
    icon: "bi bi-binoculars-fill",
    click: visualizar,
    label: "Visualizar",
  },
  {
    icon: "bi bi-pencil-fill",
    click: editar,
    label: "Editar",
  },
  {
    icon: "bi bi-trash-fill",
    click: antesDeExcluir,
    label: "Excluir",
  },
];

const values = reactive([
  {
    id: 1,
    nome: "Nome 01",
    descricao: "descrição",
    categoriaNome: "Categoria 1",
  },
  {
    id: 2,
    nome: "Nome 02",
    descricao: "descrição",
    categoriaNome: "Categoria 2",
  },
  {
    id: 3,
    nome: "Nome 03",
    descricao: "descrição",
    categoriaNome: "Categoria 3",
  },
  {
    id: 4,
    nome: "Nome 04",
    descricao: "descrição",
    categoriaNome: "Categoria 4",
  },
  {
    id: 5,
    nome: "Nome 05",
    descricao: "descrição",
    categoriaNome: "Categoria 5",
  },
]);

const tabs = [
  { id: "tab1", label: "Tab 1" },
  { id: "tab2", label: "Tab2" },
  { id: "tab3", label: "Tab3" },
];

const accordions = [
  { id: "acc1", label: "Item 1" },
  { id: "acc2", label: "Item 2" },
  { id: "acc3", label: "Item 3" },
];

const pagination = reactive({
  pageNumber: 1,
  nextPage: "http://page?id=0",
  previousPage: "http://page?id=1",
  totalPages: 3,
});

function pesquisar(event) {
  console.log("pesquisando", { event });
}

function visualizar(item) {
  console.log("visualizar", { item });
}

function editar(item) {
  console.log("editar", { item });
}

function antesDeExcluir(item) {
  console.log("antesDeExcluir", { item });
}
</script>

<template>
  <v-view title="About">
    <h2 class="mb-4">This is an about page</h2>
    <v-card
      header="Header"
      title="Card Title"
      text="Card text"
      :white="true"
      color="success"
    />
    <v-accordion class="mb-4" :accordions="accordions" initial="acc1">
      <template #acc1>
        <p>accordion 1</p>
      </template>
      <template #acc2>
        <p>accordion 2</p>
      </template>
      <template #acc3>
        <p>accordion 3</p>
      </template>
    </v-accordion>
    <v-tab class="mb-4" :tabs="tabs" initial="tab2">
      <template #tab1>
        <p>TAB 1</p>
      </template>
      <template #tab2>
        <p>TAB 2</p>
      </template>
      <template #tab3>
        <p>TAB 3</p>
      </template>
    </v-tab>
    <v-tooltip message="Teste do tooltip" class="col-3">
      <p>Teste de exemplo do tooltip</p>
    </v-tooltip>
    <pre>
      <a href="https://bootswatch.com/yeti/" target="_blank">Boostrap Theme</a>
      <a href="https://icons.getbootstrap.com/font/" target="_blank">Boostrap Icons Font</a>
    </pre>
    <div class="row">
      {{ userStore.count }} {{ userStore.doubleCount }}
      <button @click="userStore.increment()">Increment</button>
    </div>
    <h3>Exemplos</h3>
    <ul>
      <li>
        <RouterLink :to="{ name: 'example_modal' }">Modal</RouterLink>
      </li>
    </ul>
    <v-table
      :columns="columns"
      :values="values"
      :actions="actions"
      :pagination="pagination"
      @click-pagination="pesquisar($event)"
    />
  </v-view>
</template>
