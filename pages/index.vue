<template>
  <div v-if="isLoading"><Loader" /></div>

  <template v-else-if="hasNoResultsState">
    <h1 class="pt-5 text-center text-white">No results</h1>
  </template>

  <template v-else-if="!isLoading && data">
    <div class="p-5">
      <div class="max-w-[1200px] mx-auto text-white">
        <div
          v-if="data"
          class="max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-12 gap-5"
        >
          <navigation
            :cities="cities"
            v-model:degree="degree"
            v-model:measure="measure"
            v-model:location="location"
          />

          <main-content
            :data="data"
            :hours="hours"
            :degree="degree"
            :measure="measure"
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
const { isLoading, data, location, date, hours, lang } = useWeather();

const cities: any = ref(["Kyiv"]);
const degree = ref("c");
const measure = ref("km/h");

watch(location, () => {
  setTimeout(() => {
    if (!cities.value.includes(data.value?.value?.location.name)) {
      cities.value.push(data.value?.value?.location.name);
    }
  }, 500);
});

const hasNoResultsState = computed(
  () => !isLoading.value && !data.value?.value
);
</script>
