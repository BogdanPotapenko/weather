<template>
  <div
    id="modal"
    class="fixed w-full h-full inset-0 z-30 flex overflow-hidden justify-center items-center transition-all duration-700"
    :class="isModal ? 'visible opacity-100' : 'invisible opacity-0'"
    style="background: rgba(0, 0, 0, 0.7)"
    @click="behindModal"
  >
    <div
      class="relative w-4/5 h-4/5 max-w-5xl bg-primary mx-auto rounded-2xl shadow-lg z-40 overflow-hidden"
    >
      <button
        @click="modalClose()"
        class="absolute m-5 top-0 right-0 cursor-pointer z-50"
      >
        <close-button :class="color === 'dark' ? 'fill-black' : 'fill-white'" />
      </button>

      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["close"]);
defineProps(["isModal", "color"]);

const modalClose = () => {
  emit("close");
};
const behindModal = (e: MouseEvent) => {
  if ((e.target as HTMLInputElement).id === "modal") {
    modalClose();
  }
};
</script>
