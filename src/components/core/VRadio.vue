<script setup>
import VLabel from "./VLabel.vue";
import VFailures from "./VFailures.vue";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: [Object, String, Number, null],
    default: null,
  },
  options: {
    type: Array,
    required: true,
    default: () => [],
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
  inline: {
    type: Boolean,
    default: false,
  },
});

const name = ref();

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

onMounted(() => {
  name.value = `rb_${Math.random().toString().replace(".", "_")}`;
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
      v-for="(o, index) in options"
      :key="index"
      class="form-check"
      :class="{
        disabled: o['disabled'] === true,
        'form-check-inline': inline === true,
      }"
    >
      <input
        v-model="model"
        class="form-check-input"
        :class="{ 'is-invalid': failures.length > 0 }"
        type="radio"
        :value="o.value"
        :disabled="disabled || o['disabled'] === true"
        :name="name"
      />
      <label class="form-check-label">
        {{ o.label }}
      </label>
    </div>
    <v-failures :failures="failures" />
  </div>
</template>
