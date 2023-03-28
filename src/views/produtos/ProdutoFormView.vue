<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAsyncState } from "@vueuse/core";
import VForm from "../../components/core/VForm.vue";
import VInput from "../../components/core/VInput.vue";
import VSelect from "../../components/core/VSelect.vue";
import { useNotificationStore } from "../../stores/notification";
import { useCategoriaStore } from "../../stores/categoria";
import { useCategoriaService } from "../../services/CategoriaService";
import { useProdutoService } from "../../services/ProdutoService";

const router = useRouter();
const route = useRoute();
const notification = useNotificationStore();
const categoriaStore = useCategoriaStore();
const categoria = useCategoriaService();
const { novo, editar, carregar } = useProdutoService();

const action = ref();
const identificador = ref();
const model = ref({
  nome: null,
  descricao: null,
  idCategoria: 0,
});

const categoriaState = useAsyncState(
  categoria.carregar,
  {},
  { immediate: false }
);

function _voltar() {
  router.push({
    name: "produtos",
  });
}

function _cancelar() {
  notification.confirmationDisplay(
    "Qualquer alteração realizada e não salva será perdida. Deseja continuar?",
    _voltar,
    null
  );
}

const produtoPorId = useAsyncState(
  carregar,
  {},
  {
    immediate: false,
    onError: (e) => {
      notification.alertDanger(e.errors);
    },
    onSuccess: (state) => {
      model.value = state.data;
    },
  }
);

async function _onInit() {
  const { query, params } = route;

  if (!Object.prototype.hasOwnProperty.call(params, "action")) {
    _voltar();
    return;
  }
  action.value = params["action"];

  identificador.value = Object.prototype.hasOwnProperty.call(query, "id")
    ? query["id"]
    : null;

  if (action.value !== "create" && identificador.value === null) {
    _voltar();
    return;
  }

  if (action.value !== "create") {
    await produtoPorId.execute(0, identificador.value);
  }

  await categoriaState.execute(0);
}

async function _salvar() {
  if (action.value === "create") {
    return await novo(model.value);
  } else if (action.value === "update") {
    return await editar({ id: identificador.value, data: model.value });
  }
}

const salvarState = useAsyncState(
  _salvar,
  {},
  {
    immediate: false,
    onError: (e) => {
      notification.alertDanger(e.errors);
      notification.addFailures(e.failures);
    },
    onSuccess: (state) => {
      notification.alertSuccess(state.success);
      _voltar();
    },
  }
);

notification.loader = computed(() => {
  return (
    produtoPorId.isLoading.value ||
    salvarState.isLoading.value ||
    categoriaState.isLoading.value
  );
});

onMounted(_onInit);
</script>
<template>
  <v-form
    title="Produto"
    :action="action"
    :cancelar="_cancelar"
    :voltar="_voltar"
    :salvar="salvarState.execute"
  >
    <template #dados>
      <div class="row">
        <v-input
          v-model="model.nome"
          label="Nome"
          class="col"
          :maxlength="50"
          required
          :disabled="action === 'read'"
          :failures="notification.failures['Nome']"
        />
        <v-input
          v-model="model.descricao"
          label="Descrição"
          class="col"
          :maxlength="100"
          required
          :disabled="action === 'read'"
          :failures="notification.failures['Descricao']"
        />
        <v-select
          v-model="model.idCategoria"
          label="Categoria"
          class="col"
          :options="categoriaStore.categorias"
          :value-no-selected="0"
          required
          :disabled="action === 'read'"
          value-id="idCategoria"
          description="nome"
          :failures="notification.failures['Categoria']"
        />
      </div>
    </template>
  </v-form>
</template>
