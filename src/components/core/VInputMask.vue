<script setup>
import VLabel from "./VLabel.vue";
import VFailures from "./VFailures.vue";
import IMask from "imask/esm/imask";
import { ref, onMounted, onUnmounted, computed, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, null],
    default: null,
  },
  label: {
    type: String,
    default: "Label",
  },
  pattern: {
    type: String,
    default: "00000",
  },
  failures: {
    type: Array,
    default: () => [],
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const el = ref();
const mask = ref();
const emit = defineEmits(["update:modelValue"]);

const local = computed(() => props.modelValue);

watch(local, (nValue) => {
  mask.value.value = nValue;
});

function _update() {
  emit("update:modelValue", mask.value.unmaskedValue);
}

function _init() {
  if (!el.value) return;

  mask.value = IMask(el.value, {
    mask: props.pattern,
    lazy: false,
  })
    .on("accept", _update)
    .on("complete", _update);

  if (local.value !== null) mask.value.value = local.value;
}

function _destroy() {
  if (mask.value) {
    mask.value.destroy();
    mask.value = null;
  }
}

onMounted(_init);
onUnmounted(_destroy);
</script>
<template>
  <div class="mb-3">
    <v-label :required="required" :label="label" />
    <input
      ref="el"
      class="form-control"
      :class="{ 'is-invalid': failures.length > 0 }"
      :disabled="disabled"
    />
    <v-failures :failures="failures" />
  </div>
</template>
