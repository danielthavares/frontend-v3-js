<script setup>
import VLabel from "./VLabel.vue";
import VFailures from "./VFailures.vue";

defineProps({
  modelValue: {
    type: [String, null],
    required: true,
    default: null,
  },
  label: {
    type: String,
    default: "Label",
  },
  maxlength: {
    type: Number,
    default: 50,
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
  password: {
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
    <input
      class="form-control"
      :class="{ 'is-invalid': failures.length > 0 }"
      :value="modelValue"
      :type="password ? 'password' : 'text'"
      :maxlength="maxlength"
      :disabled="disabled"
      @input="_onInput"
    />
    <v-failures :failures="failures" />
  </div>
</template>
