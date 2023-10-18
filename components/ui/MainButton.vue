<template>
  <button
    class="px-3 py-1.5 rounded-2xl bg-[#173351] hover:bg-[#123963] text-[12px]/[12px] font-bold"
  >
    {{ value }}
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  value: string;
}>();
</script>
