<template>
  <button
    class="px-3 py-1.5 rounded-2xl bg-button hover:bg-hover text-xs font-bold"
  >
    {{ value }}
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  value: string;
}>();
</script>
