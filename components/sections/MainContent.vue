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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
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
          class="max-sm:max-h-[100px] h-full"
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
      <button
        @click="seeMore = !seeMore"
        class="justify-self-end px-3 py-1.5 rounded-2xl bg-[#123963] text-[12px]/[12px] font-bold"
      >
        {{ seeMore ? "See less" : "See more" }}
      </button>
      <div
        class="grid grid-cols-2 grid-rows-[auto_1fr] col-span-2 gap-y-5 gap-x-5 sm:gap-x-10"
      >
        <div
          class="grid grid-cols-[auto_1fr] gap-y-1.5 gap-x-2 items-center"
          :class="seeMore ? 'p-5' : 'p-0'"
        >
          <img class="w-[25px] h-[25px]" src="/temperature.svg" alt="" />
          <p
            class="text-[18px]/[18px] sm:text-[20px]/[20px] text-gray font-semibold"
          >
            Real Feel
          </p>
          <p
            class="col-start-2 text-[17px]/[17px] sm:text-[30px]/[30px] font-bold"
          >
            {{
              Math.floor(
                degree === "c"
                  ? data.value!.current.feelslike_c
                  : data.value!.current.feelslike_f
              )
            }}&#176;
          </p>
        </div>
        <div
          class="grid grid-cols-[auto_1fr] gap-y-1.5 gap-x-2 items-center"
          :class="seeMore ? 'p-5' : 'p-0'"
        >
          <img class="w-[25px] h-[25px]" src="/wind.svg" alt="" />
          <p
            class="text-[18px]/[18px] sm:text-[20px]/[20px] text-gray font-semibold"
          >
            Wind
          </p>
          <p
            class="col-start-2 text-[17px]/[17px] sm:text-[30px]/[30px] font-bold"
          >
            {{
              measure === "km/h"
                ? data.value!.current.wind_kph
                : data.value!.current.wind_mph
            }}
            {{ measure }}
          </p>
        </div>
        <div
          class="grid grid-cols-[auto_1fr] gap-y-1.5 gap-x-2 items-center"
          :class="seeMore ? 'p-5' : 'p-0'"
        >
          <img class="w-[25px] h-[25px]" src="/rain.svg" alt="" />
          <p
            class="text-[18px]/[18px] sm:text-[20px]/[20px] text-gray font-semibold"
          >
            Chance of rain
          </p>
          <p
            class="col-start-2 text-[17px]/[17px] sm:text-[30px]/[30px] font-bold"
          >
            {{ data.value!.forecast.forecastday[0].day.daily_chance_of_rain }}%
          </p>
        </div>
        <div
          class="grid grid-cols-[auto_1fr] gap-y-1.5 gap-x-2 items-center"
          :class="seeMore ? 'p-5' : 'p-0'"
        >
          <img class="w-[25px] h-[25px]" src="/uv.svg" alt="" />
          <p
            class="text-[18px]/[18px] sm:text-[20px]/[20px] text-gray font-semibold"
          >
            UV Index
          </p>

          <p
            class="col-start-2 text-[17px]/[17px] sm:text-[30px]/[30px] font-bold"
          >
            {{ data.value!.current.uv }}
          </p>
        </div>
        <div
          class="grid grid-cols-[auto_1fr] gap-y-1.5 gap-x-2 items-center p-5 transition-all duration-700"
          :class="seeMore ? 'visible opacity-100' : 'invisible opacity-0'"
        >
          <img class="w-[25px] h-[25px]" src="/precip.svg" alt="" />
          <p
            class="text-[18px]/[18px] sm:text-[20px]/[20px] text-gray font-semibold"
          >
            Precip
          </p>

          <p
            class="col-start-2 text-[17px]/[17px] sm:text-[30px]/[30px] font-bold"
          >
            {{ data.value!.forecast.forecastday[0].day.totalprecip_mm }}
            mm
          </p>
        </div>
        <div
          class="grid grid-cols-[auto_1fr] gap-y-1.5 gap-x-2 items-center p-5 transition-all duration-700"
          :class="seeMore ? 'visible opacity-100' : 'invisible opacity-0'"
        >
          <img class="w-[25px] h-[25px]" src="/pressure.svg" alt="" />
          <p
            class="text-[18px]/[18px] sm:text-[20px]/[20px] text-gray font-semibold"
          >
            Pressure
          </p>

          <p
            class="col-start-2 text-[17px]/[17px] sm:text-[30px]/[30px] font-bold"
          >
            {{ data.value!.current.pressure }} mb
          </p>
        </div>
        <div
          class="grid grid-cols-[auto_1fr] gap-y-1.5 gap-x-2 items-center p-5 transition-all duration-700"
          :class="seeMore ? 'visible opacity-100' : 'invisible opacity-0'"
        >
          <img class="w-[25px] h-[25px]" src="/visibility.svg" alt="" />
          <p
            class="text-[18px]/[18px] sm:text-[20px]/[20px] text-gray font-semibold"
          >
            Visibility
          </p>

          <p
            class="col-start-2 text-[17px]/[17px] sm:text-[30px]/[30px] font-bold"
          >
            {{ data.value!.current.vis_km }} km/h
          </p>
        </div>
        <div
          class="grid grid-cols-[auto_1fr] gap-y-1.5 gap-x-2 items-center p-5 transition-all duration-700"
          :class="seeMore ? 'visible opacity-100' : 'invisible opacity-0'"
        >
          <img class="w-[25px] h-[25px]" src="/humidity.svg" alt="" />
          <p
            class="text-[18px]/[18px] sm:text-[20px]/[20px] text-gray font-semibold"
          >
            Humidity
          </p>

          <p
            class="col-start-2 text-[17px]/[17px] sm:text-[30px]/[30px] font-bold"
          >
            {{ data.value!.current.humidity }}
          </p>
        </div>
        <div
          class="grid grid-cols-[auto_1fr] gap-y-1.5 gap-x-2 items-center p-5 transition-all duration-700"
          :class="seeMore ? 'visible opacity-100' : 'invisible opacity-0'"
        >
          <img class="w-[25px] h-[25px]" src="/sunrise.svg" alt="" />
          <p
            class="text-[18px]/[18px] sm:text-[20px]/[20px] text-gray font-semibold"
          >
            Sunrise
          </p>

          <p
            class="col-start-2 text-[17px]/[17px] sm:text-[30px]/[30px] font-bold"
          >
            {{ data.value!.forecast.forecastday[0].astro.sunrise }}
          </p>
        </div>
        <div
          class="grid grid-cols-[auto_1fr] gap-y-1.5 gap-x-2 items-center p-5 transition-all duration-700"
          :class="seeMore ? 'visible opacity-100' : 'invisible opacity-0'"
        >
          <img class="w-[25px] h-[25px]" src="/sunset.svg" alt="" />
          <p
            class="text-[18px]/[18px] sm:text-[20px]/[20px] text-gray font-semibold"
          >
            Sunset
          </p>

          <p
            class="col-start-2 text-[17px]/[17px] sm:text-[30px]/[30px] font-bold"
          >
            {{ data.value!.forecast.forecastday[0].astro.sunset }}
          </p>
        </div>
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
  measure: string;
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
