<script setup>
import VLabel from "./VLabel.vue";
import VFailures from "./VFailures.vue";
import IMask from "imask/esm/imask";
import "imask/esm/masked/number";
import { ref, onMounted, onUnmounted, computed, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number, null],
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
  scale: {
    type: Number,
    default: 0,
  },
  signed: {
    type: Boolean,
    default: false,
  },
  padFractionalZeros: {
    type: Boolean,
    default: false,
  },
  normalizeZeros: {
    type: Boolean,
    default: false,
  },
  radix: {
    type: String,
    default: ",",
  },
  mapToRadix: {
    type: Array,
    default: () => ["."],
  },
  min: {
    type: Number,
    default: null,
  },
  max: {
    type: Number,
    default: null,
  },
});

const el = ref();
const mask = ref();
const emit = defineEmits(["update:modelValue"]);

const local = computed(() => props.modelValue);

watch(local, (nValue) => {
  mask.value.value = String(nValue);
});

function _onComplete() {
  emit("update:modelValue", Number(mask.value.unmaskedValue));
}

function _init() {
  if (!el.value) return;

  //https://imask.js.org/guide.html#masked-number
  mask.value = IMask(el.value, {
    mask: Number,
    scale: props.scale,
    signed: props.signed,
    thousandsSeparator: "",
    padFractionalZeros: props.padFractionalZeros,
    normalizeZeros: props.normalizeZeros,
    radix: props.radix,
    mapToRadix: props.mapToRadix,
    min: props.min,
    max: props.max,
  }).on("complete", _onComplete);

  mask.value.value = String(local.value);
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
