<template>
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
        class="w-[20%] min-w-[20%] sm:w-[16.7%] sm:min-w-[16.7%] flex flex-col items-center first:border-0 border-l border-gray/50"
      >
        <p
          class="text-gray text-[10px]/[10px] sm:text-base font-bold uppercase whitespace-nowrap"
        >
          {{ hour.time ? hour.time : "NOW" }}
        </p>
        <img
          class="w-12 sm:w-[75px] h-12 sm:h-[75px] p-1"
          :src="hour.condition.icon"
          alt=""
        />
        <p class="text-lg sm:text-[22px]/[22px] font-bold uppercase">
          {{ Math.floor(degree === "c" ? hour.temp_c : hour.temp_f) }}&#176;
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ForecastHuor } from "~/types/types";
const prop = defineProps<{
  hours: ForecastHuor[];
  degree: string;
}>();

const scroller = ref();

prop.hours.map(
  (el) =>
    (el.time = new Date(el.time!)
      .toLocaleTimeString("en-US")
      .match(/[\d]+:\d{2}|[AP]M+/g)
      ?.join(" "))
);

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
