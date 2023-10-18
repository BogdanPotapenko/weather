<template>
  <section
    class="flex flex-col lg:col-span-4 gap-y-[2px] p-5 sm:pt-7 xl:px-[35px] lg:pt-[35px] lg:mt-16 bg-primary rounded-3xl"
  >
    <titles title="7-day forecast" />
    <div class="flex flex-col h-full">
      <div
        v-for="day in week"
        class="grid grid-cols-[25%_auto_1fr_25%] grow gap-x-1 items-center first:border-0 border-t border-gray/50"
      >
        <p class="text-gray text-[14px]/[14px] font-bold">
          {{
            new Date(day.date) <= new Date()
              ? "Today"
              : new Date(day.date).toString().slice(0, 3)
          }}
        </p>

        <img
          class="max-w-[50px] sm:max-w-[60px] h-auto"
          :src="day.day.condition.icon"
          alt=""
        />
        <p class="text-[14px] font-semibold">
          {{ day.day.condition.text }}
        </p>

        <div
          class="justify-self-end text-[14px]/[14px] whitespace-nowrap font-bold ml-2"
        >
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
<script setup land="ts">
defineProps(["week", "degree"]);
</script>
