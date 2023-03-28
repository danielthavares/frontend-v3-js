<script setup>
import { onMounted } from "vue";
import { useAccountStore } from "../stores/account";
const account = useAccountStore();
onMounted(account.clear);
</script>
<template>
  <div class="container">
    <div class="card border-info mt-3">
      <div class="card-body">
        <h5 class="card-title">
          Seu acesso ao sistema expirou. Efetue o login.
        </h5>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </div>
    </div>
  </div>
</template>
