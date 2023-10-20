<template>
  <select
    :id="label"
    :value="modelValue"
    @input="updateValue"
    name="select"
    class="border border-gray text-black text-lg rounded-lg block w-full p-2.5"
  >
    <option v-for="option in options" :for="label" :value="option" selected>
      {{ label }}: {{ option }}
    </option>
  </select>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "update:modelValue", value?: string): void;
}>();

defineProps<{
  label: string;
  modelValue: string | number;
  options: string[];
}>();

const updateValue = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>
