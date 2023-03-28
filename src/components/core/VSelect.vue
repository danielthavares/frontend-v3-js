<script setup>
import VLabel from "./VLabel.vue";
import VFailures from "./VFailures.vue";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, null],
    required: true,
  },
  valueNoSelected: {
    type: [String, Number, Object, null],
    required: true,
  },
  label: {
    type: String,
    default: "Label",
  },
  msgNoSelected: {
    type: String,
    default: "Selecione...",
  },
  options: {
    type: Array,
    required: true,
    default: () => [],
    note: "Array com os objetos que aparecerão na lista.",
  },
  valueId: {
    type: String,
    default: "value",
    note: "Seta a chave do item da seleção",
  },
  description: {
    type: String,
    default: "description",
    note: "Seta a descrição da seleção",
  },
  single: {
    type: Boolean,
    default: true,
    note: "Seta o tipo de retorno: 'valueId' ou 'objeto'. True retorna 'valueId'.",
  },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  failures: {
    type: Array,
    default: () => [],
  },
});

const local = computed({
  get() {
    return props.single === true
      ? props.modelValue
      : props.modelValue[props.valueId];
  },
  set(nValue) {
    _change(nValue);
  },
});

const emit = defineEmits(["update:modelValue"]);

function _change(value) {
  let changeValue =
    props.single === true
      ? value
      : props.options.find((x) => x[props.valueId] === value);

  if (!changeValue) {
    if (props.single === true) {
      changeValue = value;
    } else {
      let obj = {};
      obj[props.valueId] = props.valueNoSelected;
      obj[props.description] = props.msgNoSelected;
      changeValue = obj;
    }
  }

  emit("update:modelValue", changeValue);
}
</script>
<template>
  <div class="mb-3">
    <v-label :required="required" :label="label" />
    <select
      v-model="local"
      class="form-select"
      :class="{ 'is-invalid': failures.length > 0 }"
      :disabled="disabled"
    >
      <option :value="valueNoSelected">{{ msgNoSelected }}</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option[valueId]"
      >
        {{ option[description] }}
      </option>
    </select>
    <v-failures :failures="failures" />
  </div>
</template>
