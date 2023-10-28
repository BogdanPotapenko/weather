<template>
  <div
    class="relative bg-primary text-gray"
    :class="
      search?.value && search.value.length > 0 && searchParams
        ? 'rounded-t-xl '
        : 'rounded-xl'
    "
  >
    <div
      class="flex gap-x-2 mx-2 py-2 text-gray"
      :class="
        search?.value && search.value.length > 0 && searchParams
          ? 'border-b border-gray/50 '
          : ''
      "
    >
      <img class="w-6 h-6" src="/search.svg" alt="" />
      <input
        class="w-full bg-primary text-gray outline-none"
        v-model="searchParams"
        type="search"
        placeholder="Search"
      />
    </div>
    <div
      class="absolute z-10 w-full rounded-b-xl bg-primary pt-1"
      v-if="search?.value && search?.value.length > 0 && searchParams"
    >
      <div
        v-for="locality in search.value"
        :key="locality.id"
        @click="updateLocation(locality.name)"
        class="flex gap-x-2 p-2 text-gray cursor-pointer hover:bg-hover last:rounded-b-xl"
      >
        <img class="w-6 h-6" src="/search.svg" alt="" />
        <p>
          {{ locality.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "update:newLocation", value?: string): void;
}>();

const { data: search, searchParams } = useSearch();

const updateLocation = (newLocation: string) => {
  emit("update:newLocation", newLocation);
};
</script>
