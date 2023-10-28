<template>
  <div v-if="isLoading"><Loader" /></div>

  <template v-else-if="hasNoResultsState">
    <h1 class="pt-5 text-center text-white">No results</h1>
  </template>

  <template v-else-if="!isLoading && data">
    <div class="p-5">
      <div class="max-w-screen-xl mx-auto text-white">
        <div
          v-if="data"
          class="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-12 gap-5"
        >
          <control-panel
            :cities="cities"
            v-model:degree="degree"
            v-model:speed="speed"
            v-model:precip="precip"
            v-model:pressure="pressure"
            v-model:location="location"
          />

          <main-content
            :data="data.value"
            :hours="hours"
            :degree="degree"
            :speed="speed"
            :precip="precip"
            :pressure="pressure"
            v-model:location="location"
          />
          <week-forecast
            :week="data.value!.forecast.forecastday"
            :degree="degree"
          />
        </div>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
const { isLoading, data, location, hours } = useWeather();

const cities = ref<string[]>([]);
const degree = ref("c");
const speed = ref("km/h");
const precip = ref("mm");
const pressure = ref("mbar");

onUpdated(() => {
  if (data.value && !cities.value.includes(data.value!.value!.location.name)) {
    cities.value.push(data.value!.value!.location.name);
  }
});

const hasNoResultsState = computed(
  () => !isLoading.value && !data.value?.value
);
</script>
