<script setup>
import VView from "../../components/core/VView.vue";
import VModal from "../../components/core/VModal.vue";
import VButton from "../../components/core/VButton.vue";

import { ref } from "vue";

const show = ref(false);

function fechar() {
  console.log("fechar");
  show.value = false;
}

const example = `
    <v-modal title="Modal de teste" :show="show" @click="show = false">
        <template #body>
            <p class="text-justify">Texto que será exibido no corpo da modal</p>
        </template>
        <template #footer>
            <v-button label="Fechar" color="secondary" @click="show = false" />
        </template>
    </v-modal>
    `;
</script>
<template>
  <v-view title="Modal">
    <h5>Código</h5>
    <v-modal title="Modal de teste" :show="show">
      <template #body>
        <p class="text-justify">Texto que será exibido no corpo da modal</p>
      </template>
      <template #footer>
        <v-button label="Fechar" color="primary" @click="fechar" />
      </template>
    </v-modal>

    <pre>
            <code>
                {{ example }}
            </code>
        </pre>

    <h5>Propriedades:</h5>
    <p class="text-primary">title:</p>
    <p>Título da modal</p>
    <button @click="show = true">Modal</button>
    <hr />
    <RouterLink to="/about">Voltar</RouterLink>
  </v-view>
</template>
