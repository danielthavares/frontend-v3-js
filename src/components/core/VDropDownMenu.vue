<script setup>
import VDropDownMenuItem from "./VDropDownMenuItem.vue";

const props = defineProps(["index", "label", "open", "itens", "query"]);

const emit = defineEmits(["change-visibility"]);

function changeVisibility() {
  emit("change-visibility", props.open !== true ? props.index : -1);
}
</script>
<template>
  <li class="nav-item dropdown" :class="{ show: open }">
    <a
      class="nav-link dropdown-toggle"
      data-toggle="dropdown"
      role="button"
      @click.prevent="changeVisibility()"
    >
      {{ label }}
      <span class="caret"></span>
    </a>
    <ul class="dropdown-menu" :class="{ show: open }">
      <template v-for="(item, idx) in itens" :key="idx">
        <VDropDownMenuItem
          :link="item.recurso"
          :query="query"
          :name="item.descricao"
          @click="changeVisibility()"
        />
      </template>
    </ul>
  </li>
</template>
