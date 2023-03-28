<script setup>
defineProps(["sysShortName", "sysFullName", "sysVersion"]);
</script>
<template>
  <footer class="fixed-bottom custom-footer">
    <div class="container">
      <div class="row row-custom">
        <div class="col-2">
          <img src="@/assets/logo_branco.png" alt="logo" />
        </div>
        <div class="col-10">
          <p class="text-end">{{ sysShortName }} - {{ sysFullName }}</p>
          <p class="small text-end">Versão: {{ sysVersion }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.custom-footer {
  background: #008cba;
  color: #fff;
  border-top: 1px solid #d2d6de;
  width: 100%;
  z-index: 100;
}

img {
  margin-top: 3px;
}

p {
  margin-bottom: 0px;
}

small {
  font-size: 12px;
}
</style>
