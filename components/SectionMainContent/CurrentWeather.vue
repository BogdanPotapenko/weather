<template>
  <div
    class="grid grid-cols-[1fr_100px] sm:grid-cols-2 p-4 lg:px-10 lg:pt-4 lg:pb-7"
  >
    <div class="justify-self-start">
      <div class="flex flex-col gap-y-1.5">
        <h3 class="text-3xl sm:text-4xl font-semibold">
          {{ data.location.name }}
        </h3>
        <p
          v-if="
            data.forecast.forecastday[0].day.daily_chance_of_rain >=
            data.forecast.forecastday[0].day.daily_chance_of_snow
          "
          class="whitespace-nowrap"
        >
          Chance of rain
          {{ data.forecast.forecastday[0].day.daily_chance_of_rain }}%
        </p>
        <p v-else class="whitespace-nowrap">
          Chance of snow
          {{ data.forecast.forecastday[0].day.daily_chance_of_snow }}%
        </p>
      </div>
      <h2 class="pt-12 text-4xl sm:text-5xl font-bold">
        {{
          Math.floor(
            degree === "c" ? data.current.temp_c : data.current.temp_f
          )
        }}&#176;
      </h2>
    </div>
    <div class="justify-self-end flex items-center lg:pr-7 h-full">
      <img
        class="max-sm:max-h-[100px] max-sm:max-w-[100px] max-sm:min-h-[100px] max-sm:min-w-[100px] w-full h-full"
        :src="data.current.condition.icon"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Weather } from "~/types/types";
defineProps<{
  data: Weather;
  degree: string;
}>();
</script>
