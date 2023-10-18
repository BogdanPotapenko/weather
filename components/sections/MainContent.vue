<template>
  <section
    class="relative h-[636px] sm:h-[726px] lg:h-[735px] flex flex-col lg:col-span-7 gap-y-4 transition-all duration-700"
  >
    <div
      class="relative bg-primary text-gray"
      :class="search?.value?.length > 0 && q ? 'rounded-t-xl ' : 'rounded-xl'"
    >
      <div
        class="flex gap-x-2 mx-2 py-2 text-gray"
        :class="
          search?.value?.length > 0 && q ? 'border-b border-gray/50 ' : ''
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
          @click="updateLocation(locality.name)"
          class="flex gap-x-2 p-2 text-gray cursor-pointer hover:bg-[#123963] last:rounded-b-xl"
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
          <h3 class="text-[30px]/[30px] sm:text-[40px]/[40px] font-semibold">
            {{ data.value?.location.name }}
          </h3>
          <p
            v-if="
                      data.value!.forecast.forecastday[0].day
                        .daily_chance_of_rain >=
                      data.value!.forecast.forecastday[0].day
                        .daily_chance_of_snow
                    "
          >
            Chance of rain
            {{ data.value!.forecast.forecastday[0].day.daily_chance_of_rain }}%
          </p>
          <p v-else>
            Chance of snow
            {{ data.value!.forecast.forecastday[0].day.daily_chance_of_snow }}%
          </p>
        </div>
        <h2 class="pt-12 text-[35px]/[35px] sm:text-[55px]/[55px] font-bold">
          {{
            Math.floor(
              degree === "c"
                ? data.value!.current.temp_c
                : data.value!.current.temp_f
            )
          }}&#176;
        </h2>
      </div>
      <div class="justify-self-end flex items-center lg:pr-7 h-full">
        <img
          class="max-sm:max-h-[100px] max-sm:max-w-[100px] max-sm:min-h-[100px] max-sm:min-w-[100px] w-full h-full"
          :src="data.value!.current.condition.icon"
          alt=""
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-y-5 sm:gap-y-6 px-3 py-5 sm:py-7 lg:px-[20px] lg:py-[25px] bg-primary rounded-3xl"
    >
      <titles class="ml-[8px]" title="today's forecast" />
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
            v-if="index === 0"
            class="text-gray text-[10px]/[10px] sm:text-[15px]/[20px] font-bold uppercase"
          >
            NOW
          </p>
          <p
            v-else
            class="text-gray text-[10px]/[10px] sm:text-[15px]/[20px] font-bold uppercase whitespace-nowrap"
          >
            {{
              new Date(hour.time)
                .toLocaleTimeString("en-US")
                .match(/[\d]+:\d{2}|[AP]M+/g)
                ?.join(" ")
            }}
          </p>
          <img
            class="w-[50px] sm:w-[75px] p-1"
            :src="hour.condition.icon"
            alt=""
          />
          <p class="text-[18px] sm:text-[22px]/[22px] font-bold uppercase">
            {{ Math.floor(degree === "c" ? hour?.temp_c : hour?.temp_f) }}&#176;
          </p>
        </div>
      </div>
    </div>
    <div
      class="absolute w-full bottom-0 grid grid-cols-2 grid-rows-[auto_auto_1fr] gap-y-4 p-5 lg:px-[27px] bg-primary rounded-2xl overflow-hidden transition-all duration-700"
      :class="seeMore ? 'h-full' : 'h-[210px] sm:h-[220px] '"
    >
      <titles title="air conditions" class="self-center" />
      <main-button
        class="justify-self-end"
        @click="seeMore = !seeMore"
        :value="seeMore ? 'See less' : 'See more'"
      />
      <div
        class="grid grid-cols-2 grid-rows-[auto_1fr] col-span-2 gap-y-5 gap-x-5 sm:gap-x-10"
      >
        <weather-card
          :class="seeMore ? 'p-5' : 'p-0'"
          title="Real feel"
          icon="/temperature.svg"
          unit="&#176;"
          :value="Math.floor(degree === 'c' ? data.value!.current.feelslike_c : data.value!.current.feelslike_f)"
        />
        <weather-card
          :class="seeMore ? 'p-5' : 'p-0'"
          title="Wind"
          icon="/wind.svg"
          :unit="' ' + speed"
          :value="speed === 'km/h'? data.value!.current.wind_kph: data.value!.current.wind_mph"
        />
        <weather-card
          v-if="data.value!.forecast.forecastday[0].day.daily_chance_of_rain >= data.value!.forecast.forecastday[0].day.daily_chance_of_snow"
          :class="seeMore ? 'p-5' : 'p-0'"
          title="Chance of rain"
          icon="/rain.svg"
          unit="%"
          :value="data.value!.forecast.forecastday[0].day.daily_chance_of_rain"
        />
        <weather-card
          v-else
          :class="seeMore ? 'p-5' : 'p-0'"
          title="Chance of snow"
          icon="/snow.svg"
          unit="%"
          :value="data.value!.forecast.forecastday[0].day.daily_chance_of_snow"
        />
        <weather-card
          :class="seeMore ? 'p-5' : 'p-0'"
          title="UV Index"
          icon="/uv.svg"
          :value="data.value!.current.uv"
        />
        <weather-card
          :class="
            seeMore ? 'p-5 visible opacity-100' : 'p-0 invisible opacity-0'
          "
          title="Precip"
          icon="/precip.svg"
          :unit="' ' + precip"
          :value="precip === 'mm' ? data.value!.current.precip_mm : data.value!.current.precip_in"
        />

        <weather-card
          :class="
            seeMore ? 'p-5 visible opacity-100' : 'p-0 invisible opacity-0'
          "
          title="Pressure"
          icon="/pressure.svg"
          :unit="' ' + pressure"
          :value="pressure === 'mbar' ? data.value!.current.pressure_mb : data.value!.current.pressure_in"
        />

        <weather-card
          :class="
            seeMore ? 'p-5 visible opacity-100' : 'p-0 invisible opacity-0'
          "
          title="Visibility"
          icon="/visibility.svg"
          :unit="' ' + speed"
          :value="speed === 'km/h' ? data.value!.current.vis_km : data.value!.current.vis_miles"
        />
        <weather-card
          :class="
            seeMore ? 'p-5 visible opacity-100' : 'p-0 invisible opacity-0'
          "
          title="Humidity"
          icon="/humidity.svg"
          unit="%"
          :value="data.value!.current.humidity"
        />
        <weather-card
          :class="
            seeMore ? 'p-5 visible opacity-100' : 'p-0 invisible opacity-0'
          "
          title=" Sunrise"
          icon="/sunrise.svg"
          :value="data.value!.forecast.forecastday[0].astro.sunrise"
        />
        <weather-card
          :class="
            seeMore ? 'p-5 visible opacity-100' : 'p-0 invisible opacity-0'
          "
          title="Sunset"
          icon="/sunset.svg"
          :value="data.value!.forecast.forecastday[0].astro.sunset"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "update:location", value?: string): void;
}>();

defineProps<{
  data: any;
  hours: any;
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
  scroller.value?.addEventListener("wheel", function (event: any) {
    const modifier = ref(1);
    if (event.deltaMode == event.DOM_DELTA_PIXEL) {
      modifier.value = 1;
    } else if (event.deltaMode == event.DOM_DELTA_LINE) {
      modifier.value = parseInt(getComputedStyle(scroller.value).lineHeight);
    } else if (event.deltaMode == event.DOM_DELTA_PAGE) {
      modifier.value = scroller.value.clientHeight;
    }
    if (event.deltaY != 0) {
      scroller.value.scrollLeft += modifier.value * event.deltaY;
      event.preventDefault();
    }
  });
});
</script>
