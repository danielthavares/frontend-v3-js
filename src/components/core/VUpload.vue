<script setup>
import VLabel from "./VLabel.vue";
import VFailures from "./VFailures.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
  accept: {
    type: String,
    default: "*",
  },
  labelArquivo: {
    type: String,
    default: "Selecionar",
  },
  cssClass: {
    type: String,
    default: "primary",
  },
  label: {
    type: String,
    default: "Label",
  },
  code: {
    type: String,
    default: "id",
    note: "Código identificador do arquivo",
  },
  name: {
    type: String,
    default: "name",
    note: "Nome do arquivo",
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
  max: {
    type: Number,
    default: 1,
    note: "Quantidade máxima de arquivos",
  },
  modelValue: {
    type: Array,
    default: () => [],
    note: "Representação do arquivo em objeto. Ex.: { id: 'abcd789456', name: 'arquivo.pdf' }",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 20 * 1024 * 1024,
    note: "Tamanho máximo de cada arquivo em MB",
  },
  itensFormData: {
    type: Object,
    default: () => {},
    note: "Itens adicionais do form data. Ex.: { pathFolder: '/FileStore/Documentos', className: 'Documentos', documentTitle: 'arquivo' }",
  },
  uploadFn: {
    type: Function,
    default: (file, form_data) =>
      Promise.resolve({
        id: Math.random().toString().replace(".", "_"),
        file,
        form_data,
      }),
    note: "Função para realizar o upload do arquivo",
  },
  downloadFn: {
    type: Function,
    default: (identificador, nome) =>
      Promise.reject({
        msg: "Erro! Passar função implementada como propriedade!",
        identificador,
        nome,
      }),
    note: "Função para realizar o download do arquivo",
  },
  removeFn: {
    type: Function,
    default: (identificador) => Promise.resolve(identificador),
    note: "Função para realizar a remoção do arquivo",
  },
});

const id = ref();
const isBusy = ref(false);
const error = ref(null);

const emit = defineEmits(["update:modelValue"]);

function _init() {
  id.value = `up_${Math.random().toString().replace(".", "_")}`;
}

function _clear() {
  error.value = null;
  isBusy.value = false;
}

function _uploadFiles(e) {
  _clear();
  let updatedlist = [];
  const files = [];
  files.push(...e.target.files);

  let maximo = props.modelValue
    ? props.modelValue.length + files.length
    : files.length;
  if (maximo > props.max) {
    error.value = `Máximo de ${props.max} arquivos.`;
    return;
  }

  files.forEach((file) => {
    isBusy.value = true;

    if (
      props.modelValue &&
      props.modelValue.find((x) => x[props.name] === file.name)
    ) {
      error.value = `Arquivo "${file.name}" já adicionado.`;
      isBusy.value = false;
      return;
    }

    if (file.size > props.size) {
      error.value = `O tamanho do arquivo "${file.name}" é maior que o máximo permitido.`;
      isBusy.value = false;
      return;
    }

    props
      .uploadFn(file, props.itensFormData)
      .then((response) => {
        updatedlist.push({
          id: response.id,
          name: file.name,
        });
      })
      .catch((err) => {
        error.value = err;
      })
      .finally(() => {
        emit("update:modelValue", [
          ...(props.modelValue ? props.modelValue : []),
          ...updatedlist,
        ]);
        isBusy.value = false;
      });
  });

  e.target.value = null;
}

function _downloadFile(identificador, name) {
  _clear();
  isBusy.value = true;
  props
    .downloadFn(identificador, name)
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      isBusy.value = false;
    });
}

function _removeFile(identificador) {
  _clear();
  isBusy.value = true;
  props
    .removeFn(identificador)
    .then(() => {
      const list = props.modelValue.filter((x) => x.id !== identificador);
      emit("update:modelValue", [...list]);
    })
    .catch((err) => {
      error.value = err;
    })
    .finally(() => {
      isBusy.value = false;
    });
}

onMounted(_init);
</script>
<template>
  <div class="mb-3">
    <v-label :required="required" :label="label" />
    <br />
    <label
      :class="['btn', `btn-${cssClass}`, disabled ? 'label-disabled' : '']"
      :disabled="disabled"
      :for="id"
    >
      <div v-if="isBusy" class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <em v-else class="bi bi-upload"></em>
      {{ labelArquivo }}
    </label>
    <input
      :id="id"
      :accept="accept"
      type="file"
      :multiple="multiple"
      :disabled="disabled || isBusy"
      @change="_uploadFiles($event)"
    />
    <p v-if="error" class="text-sm-start text-danger msg-font">{{ error }}</p>
    <v-failures :failures="failures" />
    <ul>
      <li v-for="(file, index) in modelValue" :key="index">
        <a
          class="me-2 link-primary"
          href="#"
          @click.prevent="_downloadFile(file[code], file[name])"
        >
          {{ file[name] }}
        </a>
        <span
          v-if="!disabled"
          class="delete-file"
          @click="_removeFile(file[code])"
        >
          <em class="bi bi-x-lg me-1"></em>
        </span>
      </li>
    </ul>
  </div>
</template>
<style scoped>
input[type="file"] {
  display: none;
}

.delete-file {
  color: red;
  cursor: pointer;
}

.label-disabled {
  cursor: not-allowed;
  opacity: 0.65;
}
</style>
