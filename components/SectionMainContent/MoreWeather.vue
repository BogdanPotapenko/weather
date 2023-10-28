<template>
  <div
    class="absolute w-full bottom-0 grid grid-cols-2 grid-rows-[auto_auto] gap-y-4 p-5 lg:px-7 bg-primary rounded-2xl overflow-hidden transition-all duration-700"
    :class="seeMore ? 'h-full' : 'h-[210px] sm:h-[224px] '"
  >
    <titles title="air conditions" class="self-center" />
    <main-button
      class="justify-self-end self-center"
      @click="seeMore = !seeMore"
      :value="seeMore ? 'See less' : 'See more'"
    />
    <div class="grid grid-cols-2 col-span-2 gap-y-5 gap-x-5 sm:gap-x-10">
      <weather-card
        :class="seeMore ? 'py-4 sm:p-5' : 'p-0'"
        title="Real feel"
        icon="/weather/temperature.svg"
        unit="&#176;"
        :value="
          Math.floor(
            degree === 'c' ? data.current.feelslike_c : data.current.feelslike_f
          )
        "
      />
      <weather-card
        :class="seeMore ? 'py-4 sm:p-5' : 'p-0'"
        title="Wind"
        icon="/weather/wind.svg"
        :unit="' ' + speed"
        :value="
          speed === 'km/h' ? data.current.wind_kph : data.current.wind_mph
        "
      />
      <weather-card
        v-if="
          data.forecast.forecastday[0].day.daily_chance_of_rain >=
          data.forecast.forecastday[0].day.daily_chance_of_snow
        "
        :class="seeMore ? 'py-4 sm:p-5' : 'p-0'"
        title="Chance of rain"
        icon="/weather/rain.svg"
        unit="%"
        :value="data.forecast.forecastday[0].day.daily_chance_of_rain"
      />
      <weather-card
        v-else
        :class="seeMore ? 'py-4 sm:p-5' : 'p-0'"
        title="Chance of snow"
        icon="/weather/snow.svg"
        unit="%"
        :value="data.forecast.forecastday[0].day.daily_chance_of_snow"
      />
      <weather-card
        :class="seeMore ? 'py-4 sm:p-5' : 'p-0'"
        title="UV Index"
        icon="/weather/uv.svg"
        :value="data.current.uv"
      />
      <weather-card
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title="Precip"
        icon="/weather/precip.svg"
        :unit="' ' + precip"
        :value="
          precip === 'mm' ? data.current.precip_mm : data.current.precip_in
        "
      />

      <weather-card
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title="Pressure"
        icon="/weather/pressure.svg"
        :unit="' ' + pressure"
        :value="
          pressure === 'mbar'
            ? data.current.pressure_mb
            : data.current.pressure_in
        "
      />

      <weather-card
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title="Visibility"
        icon="/weather/visibility.svg"
        :unit="' ' + speed"
        :value="speed === 'km/h' ? data.current.vis_km : data.current.vis_miles"
      />
      <weather-card
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title="Humidity"
        icon="/weather/humidity.svg"
        unit="%"
        :value="data.current.humidity"
      />
      <weather-card
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title=" Sunrise"
        icon="/weather/sunrise.svg"
        :value="data.forecast.forecastday[0].astro.sunrise"
      />
      <weather-card
        :class="
          seeMore
            ? 'py-4 sm:p-5 visible opacity-100'
            : 'p-0 invisible opacity-0'
        "
        title="Sunset"
        icon="/weather/sunset.svg"
        :value="data.forecast.forecastday[0].astro.sunset"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Weather } from "~/types/types";
defineProps<{
  data: Weather;
  degree: string;
  speed: string;
  precip: string;
  pressure: string;
}>();

const seeMore = ref(false);
</script>
