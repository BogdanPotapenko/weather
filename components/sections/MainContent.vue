<template>
  <section
    class="relative h-[650px] sm:h-[730px] lg:h-[736px] flex flex-col lg:col-span-7 gap-y-4 transition-all duration-700"
  >
    <div
      class="relative bg-primary text-gray"
      :class="
        search?.value && search.value.length > 0 && q
          ? 'rounded-t-xl '
          : 'rounded-xl'
      "
    >
      <div
        class="flex gap-x-2 mx-2 py-2 text-gray"
        :class="
          search?.value && search.value.length > 0 && q
            ? 'border-b border-gray/50 '
            : ''
        "
      >
        <img class="w-6 h-6" src="/search.svg" alt="" />
        <input
          v-model="q"
          class="w-full bg-primary text-gray outline-none"
          type="search"
          placeholder="Search"
        />
      </div>
      <div
        class="absolute z-10 w-full rounded-b-xl bg-primary pt-1"
        v-if="search?.value && search?.value.length > 0 && q"
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
    <div
      class="flex flex-col gap-y-5 sm:gap-y-6 px-3 py-5 sm:py-7 lg:px-5 lg:py-6 bg-primary rounded-3xl"
    >
      <titles class="ml-2" title="today's forecast" />
      <div
        ref="scroller"
        class="flex flex-row flex-nowrap overflow-x-scroll overflow-y-hidden"
      >
        <div
          v-for="(hour, index) in hours"
          :key="index"
          class="min-w-[calc(100%_/_5_+_1px)] sm:min-w-[calc(100%_/_6_+_1px)] flex flex-col items-center first:border-0 border-l border-gray/50"
        >
          <p
            class="text-gray text-[10px]/[10px] sm:text-base font-bold uppercase whitespace-nowrap"
          >
            {{
              index === 0
                ? "NOW"
                : new Date(hour.time)
                    .toLocaleTimeString("en-US")
                    .match(/[\d]+:\d{2}|[AP]M+/g)
                    ?.join(" ")
            }}
          </p>
          <img class="w-12 sm:w-[75px] p-1" :src="hour.condition.icon" alt="" />
          <p class="text-lg sm:text-[22px]/[22px] font-bold uppercase">
            {{ Math.floor(degree === "c" ? hour?.temp_c : hour?.temp_f) }}&#176;
          </p>
        </div>
      </div>
    </div>
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
              degree === 'c'
                ? data.current.feelslike_c
                : data.current.feelslike_f
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
          :value="
            speed === 'km/h' ? data.current.vis_km : data.current.vis_miles
          "
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
}>();

const { data: search, q } = useSearch();

const scroller = ref();
const seeMore = ref(false);

const updateLocation = (newLocation: string) => {
  emit("update:location", newLocation);
};

onMounted(() => {
  scroller.value?.addEventListener("wheel", function (e: WheelEvent) {
    const modifier = ref(1);
    if (e.deltaMode == e.DOM_DELTA_PIXEL) {
      modifier.value = 1;
    } else if (e.deltaMode == e.DOM_DELTA_LINE) {
      modifier.value = parseInt(getComputedStyle(scroller.value).lineHeight);
    } else if (e.deltaMode == e.DOM_DELTA_PAGE) {
      modifier.value = scroller.value.clientHeight;
    }
    if (e.deltaY != 0) {
      scroller.value.scrollLeft += modifier.value * e.deltaY;
      e.preventDefault();
    }
  });
});
</script>
