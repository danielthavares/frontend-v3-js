<script setup>
import { ref } from "vue";
import VDropDownMenu from "./VDropDownMenu.vue";
import VModal from "./VModal.vue";
import VButton from "./VButton.vue";

defineProps({
  sistema: {
    type: String,
    default: "Nm. Sistema",
  },
  informacao: {
    type: String,
    default: "Informação do Sistema",
  },
  usuario: {
    type: String,
    default: "Nm. Usuário",
  },
  menus: {
    type: Array,
    default: () => [],
  },
  logoff: {
    type: Function,
    default: () => {},
  },
});

const infoSystem = ref(false);
const collapse = ref(false);
const visible = ref(-1);

function closeMenu() {
  visible.value = -1;
}

function changeCollapse() {
  closeMenu();
  collapse.value = !collapse.value;
}

function changeVisibility(index) {
  visible.value = index;
}
</script>
<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-custom">
    <v-modal :show="infoSystem" title="Sobre">
      <template #body>
        <p class="text-justify">{{ informacao }}</p>
      </template>
      <template #footer>
        <v-button
          label="Fechar"
          color="secondary"
          @click="infoSystem = false"
        />
      </template>
    </v-modal>
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">{{ sistema }}</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="changeCollapse()"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
        :class="{ show: collapse }"
        @mouseleave="closeMenu()"
      >
        <ul class="nav navbar-nav me-auto mb-2 mb-lg-0">
          <v-drop-down-menu
            v-for="(item, index) in menus"
            :key="index"
            :label="item.descricao"
            :index="index"
            :open="visible == index"
            :itens="item.itens"
            @change-visibility="changeVisibility($event)"
          />
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <a class="btn btn-primary bg-custom me-3" @click="infoSystem = true">
            <em class="bi bi-info-circle"></em>
          </a>
          <span class="navbar-text me-3">
            <em class="bi bi-person-circle"></em>
            {{ usuario }}
          </span>
          <a class="btn btn-primary bg-custom" @click="logoff()">
            <em class="bi bi-power"></em>
          </a>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.navbar-dark .navbar-text {
  color: #fff;
}

.bg-custom {
  background-color: #008cba !important;
  border-color: #008cba !important;
}
</style>
