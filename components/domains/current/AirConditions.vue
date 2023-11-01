<template>
  <div
    class="absolute w-full bottom-0 grid grid-cols-2 grid-rows-[auto_auto] gap-y-4 p-5 lg:px-7 bg-primary rounded-3xl overflow-hidden transition-all duration-700"
    :class="seeMore ? 'h-full' : 'h-[210px] sm:h-[224px] '"
  >
    <titles title="air conditions" class="self-center" />
    <main-button
      class="justify-self-end self-center"
      @click="seeMore = !seeMore"
      :value="seeMore ? 'See less' : 'See more'"
    />
    <div class="grid grid-cols-2 col-span-2 gap-y-5 gap-x-5 sm:gap-x-10">
      <current-condition
        :class="seeMore ? 'py-4 sm:p-5' : 'p-0'"
        title="Real feel"
        icon="/weather/temperature.svg"
        unit="&#176;"
        :value="
          Math.floor(degree === 'c' ? current.feelslike_c : current.feelslike_f)
        "
      />
      <current-condition
        :class="seeMore ? 'py-4 sm:p-5' : 'p-0'"
        title="Wind"
        icon="/weather/wind.svg"
        :unit="' ' + speed"
        :value="speed === 'km/h' ? current.wind_kph : current.wind_mph"
      />
      <current-condition
        v-if="hasRain"
        :class="seeMore ? 'py-4 sm:p-5' : 'p-0'"
        title="Chance of rain"
        icon="/weather/rain.svg"
        unit="%"
        :value="forecast.day.daily_chance_of_rain"
      />
      <current-condition
        v-else
        :class="seeMore ? 'py-4 sm:p-5' : 'p-0'"
        title="Chance of snow"
        icon="/weather/snow.svg"
        unit="%"
        :value="forecast.day.daily_chance_of_snow"
      />
      <current-condition
        :class="seeMore ? 'py-4 sm:p-5' : 'p-0'"
        title="UV Index"
        icon="/weather/uv.svg"
        :value="current.uv"
      />
      <current-condition
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title="Precip"
        icon="/weather/precip.svg"
        :unit="' ' + precip"
        :value="precip === 'mm' ? current.precip_mm : current.precip_in"
      />
      <current-condition
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title="Pressure"
        icon="/weather/pressure.svg"
        :unit="' ' + pressure"
        :value="pressure === 'mbar' ? current.pressure_mb : current.pressure_in"
      />
      <current-condition
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title="Visibility"
        icon="/weather/visibility.svg"
        :unit="' ' + speed"
        :value="speed === 'km/h' ? current.vis_km : current.vis_miles"
      />
      <current-condition
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title="Humidity"
        icon="/weather/humidity.svg"
        unit="%"
        :value="current.humidity"
      />
      <current-condition
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title=" Sunrise"
        icon="/weather/sunrise.svg"
        :value="forecast.astro.sunrise"
      />
      <current-condition
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title="Sunset"
        icon="/weather/sunset.svg"
        :value="forecast.astro.sunset"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { WeatherForecastday, WeatherCurrent } from "~/types/types";
const prop = defineProps<{
  forecast: WeatherForecastday;
  current: WeatherCurrent;
  degree: string;
  speed: string;
  precip: string;
  pressure: string;
}>();

const seeMore = ref(false);

const hasRain = computed(
  () =>
    prop.forecast.day.daily_chance_of_rain >=
    prop.forecast.day.daily_chance_of_snow
);
</script>
