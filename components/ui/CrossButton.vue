<template>
  <button class="absolute m-5 top-0 right-0 cursor-pointer z-50">
    <svg
      class="w-[40px] h-[40px]"
      :class="color === 'dark' ? 'fill-black' : 'fill-white'"
      viewBox="0 0 18 18"
    >
      <path
        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
      ></path>
    </svg>
  </button>
</template>
<script lang="ts" setup>
defineProps<{
  color: string | undefined;
}>();
</script>
