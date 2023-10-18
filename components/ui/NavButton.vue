<template>
  <button
    class="h-[40px] lg:w-[55px] lg:h-[55px] flex flex-col justify-center items-center p-1 rounded-xl lg:hover:bg-[#123963]"
  >
    <img class="w-[25px] h-[25px]" :src="icon" alt="" />
    <p class="text-gray text-[13px]/[13px] font-semibold">{{ value }}</p>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  icon: string;
  value: string;
}>();
</script>
