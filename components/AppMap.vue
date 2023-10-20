<template>
  <MapboxMap
    map-id="map1"
    class="absolute bottom-0 top-0 left-0 right-0"
    :options="{
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [30.523, 50.447],
      zoom: 5,
    }"
  >
    <MapboxDefaultMarker
      v-if="coordinates"
      marker-id="marker1"
      :options="{}"
      :lnglat="coordinates"
    >
    </MapboxDefaultMarker>
  </MapboxMap>
</template>
<script setup lang="ts">
import { LngLatLike } from "mapbox-gl";

const coordinates = ref<LngLatLike>();

useMapbox("map1", (map) => {
  map.on("click", (e) => {
    if (!coordinates.value) {
      coordinates.value = [e.lngLat.lng, e.lngLat.lat];
    } else {
      coordinates.value = undefined;
    }
  });
});

onMounted(() =>
  document.querySelector(".mapboxgl-control-container")?.remove()
);
</script>
