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
      v-if="coordinates.length === 2"
      marker-id="marker1"
      :options="{}"
      :lnglat="coordinates"
    >
    </MapboxDefaultMarker>
  </MapboxMap>
</template>
<script setup lang="ts">
const coordinates: any = ref([]);

useMapbox("map1", (map) => {
  map.on("click", (e) => {
    if (coordinates.value.length !== 2) {
      coordinates.value.push(e.lngLat.lng);
      coordinates.value.push(e.lngLat.lat);
    } else {
      coordinates.value = [];
    }
  });
});

onMounted(() =>
  document.querySelector(".mapboxgl-control-container")?.remove()
);
</script>
