<template>
  <select
    :id="label"
    :value="modelValue"
    @change="changeValue"
    name="select"
    class="border border-gray text-black text-lg rounded-lg block w-full p-2.5"
  >
    <option
      v-for="(option, index) in options"
      :key="index"
      :for="label"
      :value="option"
      selected
    >
      {{ label }}: {{ option }}
    </option>
  </select>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "change:", value?: string): void;
}>();

defineProps<{
  label: string;
  modelValue: string | number;
  options: string[];
}>();

const changeValue = (e: Event) => {
  emit("change:", (e.target as HTMLInputElement).value);
};
</script>
