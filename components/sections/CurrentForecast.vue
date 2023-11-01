<template>
  <section
    class="relative h-[650px] sm:h-[730px] lg:h-[736px] flex flex-col lg:col-span-7 gap-y-4 transition-all duration-700"
  >
    <current-search v-model:newLocation="newLocation" />
    <current-base-information
      :day="data.forecast.forecastday[0].day"
      :current="data.current"
      :location="data.location"
      :degree="degree"
    />
    <current-todays-forecast :hours="hours" :degree="degree" />
    <current-air-conditions
      :forecast="data.forecast.forecastday[0]"
      :current="data.current"
      :degree="degree"
      :speed="speed"
      :precip="precip"
      :pressure="pressure"
    />
  </section>
</template>

<script setup lang="ts">
import { Weather, ForecastHuor } from "~/types/types";

const emit = defineEmits<{
  (e: "update:location", value?: string): void;
}>();

const prop = defineProps<{
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
