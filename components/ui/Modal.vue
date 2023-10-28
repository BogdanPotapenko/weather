<template>
  <div
    id="modal"
    class="fixed w-full h-full inset-0 z-30 flex overflow-hidden justify-center items-center transition-all duration-700"
    :class="isModal ? 'visible opacity-100' : 'invisible opacity-0'"
    style="background: rgba(0, 0, 0, 0.7)"
    @click="modalClose()"
  >
    <div
      class="relative w-4/5 h-4/5 max-w-5xl bg-primary mx-auto rounded-2xl shadow-lg z-40 overflow-hidden"
      @click.stop
    >
      <CrossButton @click="modalClose()" :color="color" />
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: "close", value?: string): void;
}>();
defineProps<{
  isModal: boolean | undefined;
  color?: string;
}>();

const modalClose = () => {
  emit("close");
};
</script>
