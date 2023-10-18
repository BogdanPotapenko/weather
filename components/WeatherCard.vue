<template>
  <div
    class="grid grid-cols-[auto_1fr] gap-y-1.5 gap-x-2 items-center rounded-2xl transition-all duration-700"
  >
    <img class="w-[25px] h-[25px]" :src="icon" alt="" />
    <p class="text-[18px]/[18px] sm:text-[20px]/[20px] text-gray font-semibold">
      {{ title }}
    </p>
    <p class="col-start-2 text-[17px]/[17px] sm:text-[30px]/[30px] font-bold">
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
