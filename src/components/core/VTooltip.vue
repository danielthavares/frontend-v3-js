<script setup>
defineProps(["message"]);
</script>
<template>
  <div class="vtooltip">
    <slot></slot>
    <span class="tooltiptext">{{ message }}</span>
  </div>
</template>
<style scoped>
.vtooltip {
  cursor: pointer;
  position: relative;
  display: inline-block;
}

.vtooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #000;
  color: #fff;
  text-align: center;
  border-radius: 0px;
  padding: 5px 0;
  position: absolute;
  z-index: 10;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.vtooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #000 transparent transparent transparent;
}

.vtooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
