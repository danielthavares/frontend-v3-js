<script setup>
import VView from "../components/core/VView.vue";
import VInput from "../components/core/VInput.vue";
import VInputMask from "../components/core/VInputMask.vue";
import VInputNumber from "../components/core/VInputNumber.vue";
import VButton from "../components/core/VButton.vue";
import VCheckBox from "../components/core/VCheckBox.vue";
import VSwitch from "../components/core/VSwitch.vue";
import VRadio from "../components/core/VRadio.vue";
import VTextArea from "../components/core/VTextArea.vue";
import VSelect from "../components/core/VSelect.vue";
import VAutoComplete from "../components/core/VAutoComplete.vue";
import VInputDate from "../components/core/VInputDate.vue";
import VUpload from "../components/core/VUpload.vue";
import { ref } from "vue";
import { useNotificationStore } from "../stores/notification";
import { getNames } from "../infra/data-example";

const notification = useNotificationStore();

const failures = ["erro 1", "erro 2"];

const model = ref({
  input: "nome",
  mask: null,
  number: 589.66,
  check: true,
  radio: null,
  radioin: 1,
  text: "Informação de teste área",
  select: 1,
  autocomplete: {
    id: 5,
    name: "Arimatéia",
  },
  date: "2022-03-31T03:00:00.000Z",
  files: [
    {
      id: "abc123456",
      name: "arquivo01.pdf",
    },
    {
      id: "abc123987",
      name: "arquivo02.pdf",
    },
  ],
});

const rbItens = [
  { value: 1, label: "Um" },
  { value: 2, label: "Dois" },
  { value: 3, label: "Tres", disabled: true },
];

const options = [
  {
    id: 1,
    description: "teste 1",
  },
  {
    id: 2,
    description: "teste 2",
  },
  {
    id: 3,
    description: "teste 3",
  },
];

function fnCallBack() {
  console.log("confirmado...", import.meta.env.VITE_API_ROOT);
}

function loaderTest() {
  notification.loader = true;
  setTimeout(() => {
    notification.loader = false;
  }, 3000);
}

function _upload(file, data) {
  console.log("upload", { file, data });
  return new Promise((resolve, reject) => {
    try {
      setTimeout(
        () => resolve({ id: Math.random().toString().replace(".", "_") }),
        3000
      );
    } catch (error) {
      reject(error);
    }
  });
}

function _download(identificador, nome) {
  console.log("download", { identificador, nome });
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve(console.log("pronto")), 3000);
    } catch (error) {
      reject(error);
    }
  });
}

function _remove(identificador) {
  console.log("remove", identificador);
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => resolve("removido"), 3000);
    } catch (error) {
      reject(error);
    }
  });
}

const basicsMsgs = ["atenção", "pare", "siga"];
</script>

<template>
  <v-view title="Home">
    <v-input
      v-model="model.input"
      label="Input Simples"
      required
      :failures="failures"
      disabled
    />
    <v-input-mask
      v-model="model.mask"
      label="Input Mask"
      pattern="(00)0000-00000"
    />
    <v-input-number
      v-model="model.number"
      label="Input Number"
      :max="10000"
      :min="-1000"
      :scale="2"
    />
    <v-check-box
      v-model="model.check"
      label="CheckBox"
      description="Aceite"
      :inline="false"
      required
    />
    <v-switch
      v-model="model.check"
      label="Switch"
      description="Aceite"
      :inline="true"
      required
    />
    <v-radio v-model="model.radio" label="Radio" :options="rbItens" required />
    <v-radio
      v-model="model.radioin"
      label="Radio In Line"
      :options="rbItens"
      inline
    />
    <v-text-area v-model="model.text" label="Text Area" disabled />
    <v-select
      v-model="model.select"
      label="Select"
      :options="options"
      :value-no-selected="0"
      value-id="id"
      description="description"
    />
    <v-input-date v-model="model.date" label="Input date" />
    <v-auto-complete
      id="id"
      v-model="model.autocomplete"
      label="Auto Complete"
      description="name"
      :search-fn="getNames"
    />
    <v-upload
      v-model="model.files"
      label="Arquivos"
      :max="3"
      :upload-fn="_upload"
      :download-fn="_download"
      :remove-fn="_remove"
    />
    <pre>
      {{ model }}
    </pre>
    <v-button
      label="Modal de confirmação"
      @click="
        notification.confirmationDisplay(
          'Confirma a operação de sair da pagina?',
          fnCallBack
        )
      "
    />
    <v-button label="Loader" @click="loaderTest" />
    <div class="col">
      <v-button
        color="secondary"
        label="Alert basic"
        @click="notification.alertBasic(basicsMsgs)"
      />
      <v-button
        color="success"
        label="Alert success"
        @click="notification.alertSuccess('Sucesso!')"
      />
      <v-button
        color="warning"
        label="Alert warning"
        @click="notification.alertWarning('Atenção!')"
      />
      <v-button
        color="danger"
        label="Alert danger"
        @click="notification.alertDanger('Falha!')"
      />
      <v-button color="secondary" label="Teste 401" @click="execute(300)" />
    </div>
    <RouterLink :to="{ name: 'login' }">Login</RouterLink>
  </v-view>
</template>
