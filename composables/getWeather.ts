import { Weather } from "~/types/types";

export const getWeather = (params: any, key: any) => {
  const runtimeConfig = useRuntimeConfig();
  const result = useAsyncData(key, () =>
    $fetch<Weather>("/forecast.json", {
      method: "GET",
      baseURL: runtimeConfig.public.apiBase,
      params: params,
      headers: {
        "X-RapidAPI-Key": runtimeConfig.public.weatherKey,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    })
  );
  return result;
};
