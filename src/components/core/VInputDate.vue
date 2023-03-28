<script setup>
import VLabel from "./VLabel.vue";
import VFailures from "./VFailures.vue";
import IMask from "imask/esm/imask";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
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
  i18n: {
    type: Object,
    default: () => {
      return {
        pattern: "DD/MM/YYYY",
        blocks: {
          YYYY: {
            mask: IMask.MaskedRange,
            from: 1900,
            to: 2999,
          },
          MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
          },
          DD: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 31,
          },
        },
        format: (f) => f,
        parse: (p) => p,
      };
    },
    note: "Padrão pt-br",
  },
});

const el = ref();
const mask = ref();
const emit = defineEmits(["update:modelValue"]);

const local = computed(() =>
  dayjs(props.modelValue).format(props.i18n.pattern)
);
const isValid = ref(true);

watch(local, (nValue) => {
  if (nValue !== null) mask.value.value = nValue ? nValue : "";
});

function _valid(date) {
  return dayjs(date, props.i18n.pattern, true).isValid();
}

function _toJson(date) {
  return dayjs(date, props.i18n.pattern, true).toJSON();
}

function _onAccept() {
  if (!mask.value.unmaskedValue) {
    isValid.value = true;
    emit("update:modelValue", null);
  }
}

function _onComplete() {
  let result = null;
  if (_valid(mask.value.value)) {
    result = _toJson(mask.value.value);
    isValid.value = true;
  } else {
    isValid.value = false;
  }
  emit("update:modelValue", result);
}

function _init() {
  if (!el.value) return;

  //https://day.js.org/en/
  dayjs.extend(customParseFormat);

  mask.value = IMask(el.value, {
    mask: Date,
    pattern: props.i18n.pattern,
    lazy: false,
    format: props.i18n.format,
    parse: props.i18n.parse,
    blocks: props.i18n.blocks,
  })
    .on("complete", _onComplete)
    .on("accept", _onAccept);

  mask.value.value = local.value ? local.value : "";
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
      :class="{ 'is-invalid': failures.length > 0 || !isValid }"
      :disabled="disabled"
    />
    <v-failures :failures="failures" />
  </div>
</template>
