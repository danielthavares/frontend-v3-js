<script setup>
import VSelect from "../components/core/VSelect.vue";
import VInput from "../components/core/VInput.vue";
import VButton from "../components/core/VButton.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAsyncState } from "@vueuse/core";
import { useAppStore } from "../stores/app";
import { useLoginService } from "../services/LoginService";
import { useNotificationStore } from "../stores/notification";

const router = useRouter();
const appStore = useAppStore();
const notification = useNotificationStore();
const { logar } = useLoginService();
const model = reactive({
  idCompanhia: appStore.cias[0]["id"],
  login: "",
  senha: "",
});

const { isLoading, execute } = useAsyncState(
  logar,
  {},
  {
    immediate: false,
    onError: (e) => {
      notification.alertDanger(e.errors);
      notification.addFailures(e.failures);
    },
    onSuccess: () => {
      router.push({ name: "home" });
    },
  }
);
notification.loader = isLoading;
</script>
<template>
  <div class="container">
    <div class="mt-5 shadow-lg p-3 mb-5 bg-body rounded form-signin">
      <div class="text-center">
        <img
          v-if="false"
          src="@/assets/logo.svg"
          alt="logo"
          class="mb-4"
          width="152"
          height="79"
        />
        <h1 class="h3 mb-3 fw-normal">{{ appStore.sistema.sigla }}</h1>
        <p class="text-center">
          {{ appStore.sistema.descricao }}
        </p>
      </div>
      <form action autocomplete="off" @submit.prevent="execute(0, model)">
        <v-select
          v-model="model.idCompanhia"
          label="Companhia"
          required
          disabled
          value-id="id"
          description="sigla"
          :single="true"
          :options="appStore.cias"
          :value-no-selected="0"
        />
        <v-input
          v-model="model.login"
          label="Login"
          required
          :failures="notification.failures['Login']"
        />
        <v-input
          v-model="model.senha"
          label="Senha"
          required
          password
          :failures="notification.failures['Senha']"
        />
        <v-button
          :size="100"
          color="primary"
          label="Acessar"
          icon="bi bi-box-arrow-in-right"
        />
      </form>
      <p class="mt-3 text-muted text-center">
        &copy; {{ new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 340px;
  padding: 15px;
  margin: auto;
}
</style>
