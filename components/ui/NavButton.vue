<template>
  <button
    class="h-10 lg:w-14 lg:h-14 flex flex-col justify-center items-center p-1 rounded-xl lg:hover:bg-hover"
  >
    <img class="w-6 h-6" :src="icon" alt="" />
    <p class="text-gray text-xs font-semibold">{{ value }}</p>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  icon: string;
  value: string;
}>();
</script>
