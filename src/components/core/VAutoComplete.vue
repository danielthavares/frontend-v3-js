<script setup>
import VLabel from "./VLabel.vue";
import VFailures from "./VFailures.vue";
import { ref, onMounted, computed, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: [Object, null],
    default: null,
  },
  id: {
    type: String,
    default: "id",
    note: "Chave do item da seleção.",
  },
  description: {
    type: String,
    default: "description",
    note: "Descrição da seleção.",
  },
  label: {
    type: String,
    default: "Label",
  },
  maxlength: {
    type: Number,
    default: 50,
  },
  failures: {
    type: Array,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 250,
    note: "Largura mínina da lista suspensa de opções.",
  },
  searchFn: {
    type: Function,
    default: () => {},
    required: true,
    note: "Promise de busca. Obrigatoriamente deve receber um parâmetro.",
  },
  successFn: {
    type: Function,
    default: (res) => {
      return res;
    },
    note: "Função padrão de retorno de sucesso.",
  },
  errorFn: {
    type: Function,
    default: (err) => {
      return err;
    },
    note: "Função padrão de retorno de erro.",
  },
  interval: {
    type: Number,
    default: 2,
    note: "A cada 'x' caracteres do termo, acionará a promise de busca.",
  },
});

const termo = ref();
const local = computed(() =>
  props.modelValue ? props.modelValue[props.description] : null
);
const items = ref([]);
const isBusy = ref(false);
const error = ref(null);
const emit = defineEmits(["update:modelValue"]);

watch(local, (nValue) => {
  termo.value = nValue;
});

function _pesquisando(value) {
  termo.value = value;
  error.value = null;

  if (!value) {
    items.value = [];
    return;
  }

  if (value.length >= props.interval && value.length % props.interval === 0) {
    items.value = [];
    isBusy.value = true;
    props
      .searchFn(value)
      .then((res) => {
        items.value = props.successFn(res);
      })
      .catch((err) => {
        items.value = [];
        error.value = props.errorFn(err) || "Erro ao pesquisar.";
      })
      .finally(() => {
        isBusy.value = false;
      });
  }
}

function _selecionado(item) {
  termo.value = item[props.description];
  items.value = [];
  emit("update:modelValue", item);
}

function _limpando() {
  termo.value = null;
  items.value = [];
  error.value = null;
  emit("update:modelValue", null);
}

function _init() {
  termo.value = local.value;
}

onMounted(_init);
</script>
<template>
  <div class="mb-3">
    <v-label :required="required" :label="label" />
    <div class="input-group">
      <input
        class="form-control form-control-sm"
        :class="{ 'is-invalid': failures.length > 0 }"
        type="text"
        :value="termo"
        :maxlength="maxlength"
        :disabled="disabled"
        @input="_pesquisando($event.target.value)"
        @keyup.esc="_limpando()"
      />
      <button
        v-if="termo"
        class="btn btn-outline-secondary"
        type="button"
        :disabled="disabled"
        @click="_limpando()"
      >
        <em class="bi bi-x-lg me-1"></em>
      </button>
      <span v-else class="input-group-text">
        <em class="bi bi-search me-1"></em>
      </span>
    </div>
    <p v-if="isBusy" class="text-sm-start msg-font">Pesquisando...</p>
    <p v-if="error" class="text-sm-start text-danger msg-font">{{ error }}</p>
    <transition name="autocompletefade">
      <ul
        v-if="items.length > 0"
        class="autocomplete"
        :style="{ 'min-width': `${width}px` }"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          @click="_selecionado(item)"
        >
          <span class="item">{{ item[description] }}</span>
        </li>
      </ul>
    </transition>
    <v-failures :failures="failures" />
  </div>
</template>
<style scoped>
.autocomplete {
  list-style-type: none;
  border: 1px solid #ccc;
  z-index: 99;
  background-color: white;
  position: absolute;
}

li {
  margin-top: 0.1rem;
  cursor: pointer;
  padding: 1px;
}

li:hover {
  background-color: #1e90ff;
  color: white;
}

ul {
  padding: 0;
  margin-left: 0;
  text-indent: 1rem;
  max-height: 20rem;
  overflow: auto;
}

.autocompletefade-enter-active,
.autocompletefade-leave-active {
  transition: opacity 0.5s;
}

.autocompletefade-enter,
.autocompletefade-leave-to {
  opacity: 0;
}

.form-control {
  border-right: none !important;
}

.btn {
  border-left: none !important;
}

.btn-outline-secondary {
  border-color: #ced4da !important;
}

.item {
  margin-top: 1px;
  padding: 1px;
}

.msg-font {
  font-size: 14px;
}
</style>
