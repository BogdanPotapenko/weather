<template>
  <section
    class="relative h-[650px] sm:h-[730px] lg:h-[736px] flex flex-col lg:col-span-7 gap-y-4 transition-all duration-700"
  >
    <current-search v-model:newLocation="newLocation" />
    <current-base-information information :data="data" :degree="degree" />
    <current-todays-forecast :hours="hours" :degree="degree" />
    <current-air-conditions
      :data="data"
      :degree="degree"
      :speed="speed"
      :precip="precip"
      :pressure="pressure"
    />
  </section>
</template>

<script setup lang="ts">
import { ForecastHuor, Weather } from "~/types/types";

const emit = defineEmits<{
  (e: "update:location", value?: string): void;
}>();

defineProps<{
  data: Weather;
  hours: ForecastHuor[];
  degree: string;
  speed: string;
  precip: string;
  pressure: string;
  location: string;
}>();

const newLocation = ref("");

watch(newLocation, () => {
  emit("update:location", newLocation.value);
});
</script>
