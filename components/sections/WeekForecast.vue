<template>
  <section
    class="flex flex-col lg:col-span-4 gap-y-0.5 p-5 sm:pt-7 xl:px-9 lg:pt-9 lg:mt-16 bg-primary rounded-3xl"
  >
    <titles title="7-day forecast" />
    <div class="flex flex-col h-full">
      <div
        v-for="day in week"
        :key="day.date_epoch"
        class="grid grid-cols-[20%_auto_1fr_20%] sm:grid-cols-[25%_auto_1fr_25%] grow gap-x-1 items-center first:border-0 border-t border-gray/50"
      >
        <p class="text-gray text-sm font-bold">
          {{ day.date }}
        </p>

        <img
          class="max-w-[50px] sm:max-w-15 w-full h-auto"
          :src="day.day.condition.icon"
          alt=""
        />
        <p class="text-sm font-semibold">
          {{ day.day.condition.text }}
        </p>

        <div class="justify-self-end text-sm whitespace-nowrap font-bold ml-2">
          {{
            Math.floor(degree === "c" ? day.day.maxtemp_c : day.day.maxtemp_f)
          }}
          <span class="text-gray">
            {{
              "/" +
              Math.floor(degree === "c" ? day.day.mintemp_c : day.day.maxtemp_f)
            }}</span
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { WeatherForecastday } from "~/types/types";

const prop = defineProps<{
  week: WeatherForecastday[];
  degree: string;
}>();

prop.week.map(
  (el, i) =>
    (el.date = i === 0 ? "Today" : new Date(el.date).toString().slice(0, 3))
);
</script>
