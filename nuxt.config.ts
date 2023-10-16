// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-mapbox"],
  app: {
    baseURL: "/weather/",
  },
  mapbox: {
    accessToken:
      "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g",
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
    },
  },
  components: [
    "~/components",
    { path: "~/components/layouts" },
    { path: "~/components/sections" },
    { path: "~/components/ui" },
    { path: "~/components/icons" },
  ],
});
