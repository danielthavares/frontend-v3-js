<script setup>
import VAlert from "./components/core/VAlert.vue";
import VLoader from "./components/core/VLoader.vue";
import VConfirmationModal from "./components/core/VConfirmationModal.vue";
import { RouterView, useRouter } from "vue-router";
import { useAccountStore } from "./stores/account";
import { useAppStore } from "./stores/app";
import { useNotificationStore } from "./stores/notification";

const router = useRouter();
const account = useAccountStore();
const app = useAppStore();
const notification = useNotificationStore();

function _display() {
  notification.confirmationDisplay(
    "Deseja realmente sair do sistema?",
    _confirmationLogoff
  );
}

function _confirmationLogoff() {
  account.clear();
  router.push({ name: "login" });
}
</script>

<template>
  <v-alert
    :color="notification.alert.color"
    :message="notification.alert.message"
    :show="notification.alert.show"
    @close="notification.alertHide"
  />
  <v-confirmation-modal
    :show="notification.confirmation.show"
    :message="notification.confirmation.message"
    @click="notification.confirmationHide"
  />
  <v-loader align="center" :show="notification.loader" />
  <header>
    <router-view
      name="header"
      :menus="account.account.menus"
      :sistema="app.sistema.sigla"
      :informacao="app.sistema.informacao"
      :usuario="account.account.nome"
      :logoff="_display"
    />
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <router-view
    name="footer"
    :sys-short-name="app.sistema.sigla"
    :sys-full-name="app.sistema.descricao"
    :sys-version="app.sistema.versao"
  />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
