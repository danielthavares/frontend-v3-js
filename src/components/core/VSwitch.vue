<script setup>
import VLabel from "./VLabel.vue";
import VFailures from "./VFailures.vue";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [Boolean, null],
    default: null,
  },
  label: {
    type: String,
    default: "Label",
  },
  description: {
    type: String,
    default: "Description",
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
  inline: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <div class="mb-3">
    <v-label
      :required="required"
      :label="label"
      :class="{ 'me-2': inline === true }"
    />
    <div
      class="form-check form-switch"
      :class="{ disabled: disabled, 'form-check-inline': inline === true }"
    >
      <input
        v-model="model"
        class="form-check-input"
        :class="{ 'is-invalid': failures.length > 0 }"
        type="checkbox"
        :disabled="disabled"
      />
      <label class="form-check-label">
        {{ description }}
      </label>
    </div>
    <v-failures :failures="failures" />
  </div>
</template>
