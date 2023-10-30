// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-mapbox"],
  app: {
    baseURL: "/weather/",
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_URL,
      weatherKey: process.env.WEATHER_KEY,
    },
  },
  mapbox: {
    accessToken: process.env.MAP_KEY,
  },
  components: [
    "~/components",
    { path: "~/components/domains" },
    { path: "~/components/layouts" },
    { path: "~/components/sections" },
    { path: "~/components/ui" },
  ],
});
