<template>
  <section
    class="lg:col-span-1 flex lg:flex-col items-center max-lg:justify-between gap-y-10 p-2 lg:py-4 lg:px-2 rounded-2xl bg-primary"
  >
    <div
      class="w-10 h-10 lg:w-14 lg:h-14 bg-hover flex justify-center p-2 rounded-xl"
    >
      <img class="w-full h-wull" src="/weather.svg" alt="" />
    </div>
    <div class="flex lg:flex-col items-center gap-2 overflow-hidden">
      <nav-button
        @click="if (!isModal.cities) isModal.cities = true;"
        value="cities"
        icon="/weather/cities.svg"
      />
      <nav-button
        @click="if (!isModal.map) isModal.map = true;"
        value="map"
        icon="/weather/map.svg"
      />
      <nav-button
        @click="if (!isModal.settings) isModal.settings = true;"
        value="settings"
        icon="/weather/settings.svg"
      />
      <modal @close="isModal.cities = false" :is-modal="isModal.cities">
        <div class="h-full">
          <div class="border-b border-gray/50 p-6.5">
            <h3 class="text-gray text-2xl md:text-3xl font-extrabold uppercase">
              cities
            </h3>
          </div>
          <div v-if="cities.length === 0" class="flex justify-center">
            <main-button
              class="text-xl m-5"
              @click="selectCity()"
              value="Select a city"
            />
          </div>
          <div class="h-[calc(100%_-_80px)] px-10 pb-3">
            <div class="h-full flex flex-col overflow-auto">
              <div
                v-for="(city, index) in cities"
                :key="index"
                class="flex justify-between py-5 border-b border-gray/50"
              >
                <button
                  class="text-2xl font-extrabold capitalize"
                  @click="updateLocation(city)"
                >
                  {{ city }}
                </button>
                <main-button
                  @click="cities.splice(cities.indexOf(city), 1)"
                  value="delete"
                />
              </div>
            </div>
          </div>
        </div>
      </modal>
      <modal @close="isModal.map = false" :is-modal="isModal.map" color="dark">
        <div class="h-full p-5">
          <div class="relative h-full">
            <app-map class="rounded-xl" />
          </div>
        </div>
      </modal>
      <modal @close="isModal.settings = false" :is-modal="isModal.settings">
        <div class="h-full">
          <div class="border-b border-gray/50 p-6.5">
            <h3 class="text-gray text-2xl md:text-3xl font-extrabold uppercase">
              settings
            </h3>
          </div>
          <div class="h-[calc(100%_-_80px)] px-10 pb-3">
            <div class="h-full flex flex-col gap-5 pt-5">
              <my-select
                label="degree"
                :model-value="degree"
                :options="['c', 'f']"
                @change="updateDegree"
              />
              <my-select
                label="speed"
                :model-value="speed"
                :options="['km/h', 'm/h']"
                @change="updateSpeed"
              />
              <my-select
                label="precip"
                :model-value="precip"
                :options="['mm', 'in']"
                @change="updatePrecip"
              />
              <my-select
                label="pressure"
                :model-value="pressure"
                :options="['mbar', 'inHg']"
                @change="updatePressure"
              />
            </div>
          </div>
        </div>
      </modal>
    </div>
  </section>
</template>
<script setup lang="ts">
import { MyModal } from "~/types/types";

const emit = defineEmits<{
  (e: "update:degree", value?: string): void;
  (e: "update:speed", value?: string): void;
  (e: "update:precip", value?: string): void;
  (e: "update:pressure", value?: string): void;
  (e: "update:location", value?: string): void;
}>();

defineProps<{
  cities: string[];
  degree: string;
  speed: string;
  precip: string;
  pressure: string;
  location: string;
}>();

const markerRef = useMapboxMarkerRef("marker1");

const isModal = ref<MyModal>({});

const updateDegree = (e: Event) => {
  emit("update:degree", (e.target as HTMLInputElement).value);
};
const updateSpeed = (e: Event) => {
  emit("update:speed", (e.target as HTMLInputElement).value);
};
const updatePrecip = (e: Event) => {
  emit("update:precip", (e.target as HTMLInputElement).value);
};
const updatePressure = (e: Event) => {
  emit("update:pressure", (e.target as HTMLInputElement).value);
};
const updateLocation = (newLocation: string) => {
  emit("update:location", newLocation);
};

const selectCity = () => {
  isModal.value.map = true;
  setTimeout(() => {
    isModal.value.cities = false;
  }, 0);
};

watch(isModal.value, () => {
  Object.values(isModal.value).every((el: boolean) => {
    if (el) {
      document.body.style.overflow = "hidden";
      return false;
    } else {
      document.body.style.overflow = "auto";
    }
    return true;
  });
  if (!isModal.value.map && markerRef.value?.getLngLat()) {
    updateLocation(
      `${markerRef.value.getLngLat().lat},${markerRef.value.getLngLat().lng}`
    );
  }
});
</script>
