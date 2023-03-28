<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  accordions: {
    type: Array,
    default: () => [],
    required: true,
    note: "Array de objetos: [{ id: 'home', label: 'Home'}, { id: 'home2', label: 'Home 2'}]",
  },
  initial: {
    type: String,
    default: null,
    note: "Identificador do accordion aberto inicialmente",
  },
});

const id = ref();
const collapse = ref();

function _init() {
  id.value = `acc_${Math.random().toString().replace(".", "_")}`;
  collapse.value = props.initial;
}

function _toggle(id) {
  if (collapse.value === id) collapse.value = null;
  else collapse.value = id;
}

onMounted(_init);
</script>
<template>
  <div :id="id" class="accordion">
    <div v-for="(acc, index) in accordions" :key="index" class="accordion-item">
      <h2 :id="`heading${index}_${acc.id}`" class="accordion-header">
        <button
          class="accordion-button"
          :class="{ collapsed: collapse !== acc.id }"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#${acc.id}`"
          aria-expanded="true"
          :aria-controls="acc.id"
          @click="_toggle(acc.id)"
        >
          {{ acc.label }}
        </button>
      </h2>
      <div
        :id="acc.id"
        class="accordion-collapse"
        :class="{ collapse: collapse !== acc.id }"
        :aria-labelledby="`heading${index}_${acc.id}`"
        :data-bs-parent="`#${id}`"
      >
        <div class="accordion-body">
          <slot :name="acc.id"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>
