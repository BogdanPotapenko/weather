<template>
  <div
    class="grid grid-cols-[auto_1fr] justify-self-start self-start gap-x-2 items-center rounded-2xl transition-all duration-700"
  >
    <img class="min-w-[24px] min-h-[24px] w-6 h-6" :src="icon" alt="" />
    <p class="text-text-lg sm:text-xl text-gray font-semibold">
      {{ title }}
    </p>
    <p class="col-start-2 text-base sm:text-3xl font-bold whitespace-nowrap">
      {{ value }}{{ unit }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  icon: string;
  unit?: string;
  value: string | number;
}>();
</script>
