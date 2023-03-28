<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
    required: true,
    note: "Array de objetos: [{ id: 'home', label: 'Home'}, { id: 'home2', label: 'Home 2'}]",
  },
  initial: {
    type: String,
    default: null,
    note: "Identificador da tab inicial",
  },
});

const active = ref("home");

function _toggle(id) {
  active.value = id;
}

function _init() {
  if (props.initial) {
    active.value = props.initial;
  } else {
    if (props.tabs && props.tabs.length > 0) {
      active.value = props.tabs[0]["id"];
    }
  }
}

onMounted(_init);
</script>
<template>
  <div>
    <ul class="nav nav-tabs" role="tablist">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        class="nav-item"
        role="presentation"
      >
        <a
          class="nav-link"
          :class="{ active: tab.id === active }"
          data-bs-toggle="tab"
          :href="`#${tab.id}`"
          aria-selected="false"
          role="tab"
          tabindex="-1"
          @click.prevent="_toggle(tab.id)"
          >{{ tab.label }}</a
        >
      </li>
    </ul>
    <div id="myTabContent" class="tab-content">
      <div
        v-for="(tab, index) in tabs"
        :id="tab.id"
        :key="index"
        class="tab-pane fade"
        :class="{ 'active show': active === tab.id }"
        role="tabpanel"
      >
        <slot :name="tab.id"> </slot>
      </div>
    </div>
  </div>
</template>
