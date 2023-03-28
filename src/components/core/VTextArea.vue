<script setup>
import VLabel from "./VLabel.vue";
import VFailures from "./VFailures.vue";

defineProps({
  modelValue: {
    type: [String, null],
    default: null,
  },
  label: {
    type: String,
    default: "Label",
  },
  cols: {
    type: Number,
    default: 10,
  },
  rows: {
    type: Number,
    default: 5,
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

const emit = defineEmits(["update:modelValue"]);

function _onInput(e) {
  emit("update:modelValue", e.target.value);
}
</script>
<template>
  <div class="mb-3">
    <v-label :required="required" :label="label" />
    <textarea
      class="form-control"
      :class="{ 'is-invalid': failures.length > 0 }"
      :value="modelValue"
      :disabled="disabled"
      :rows="rows"
      :cols="cols"
      @input="_onInput"
    />
    <v-failures :failures="failures" />
  </div>
</template>
