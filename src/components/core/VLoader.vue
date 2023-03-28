<script setup>
import VOverlay from "./VOverlay.vue";
defineProps(["show"]);
</script>
<template>
  <v-overlay :show="show === true">
    <div class="container-fluid">
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
          style="width: 100%"
        ></div>
      </div>
    </div>
  </v-overlay>
</template>
<style scoped>
.container-fluid {
  background-color: #fff;
  margin-top: 30vh;
  margin-left: 8rem;
  margin-right: 8rem;
  padding: 0.8rem 2rem 2rem 2rem;
  min-width: 38vw;
  width: 38vw;
  border-radius: 0px;
}

.progress {
  margin-top: 1.5rem;
  margin-bottom: 0.15rem;
  border-radius: 0;
}
</style>
