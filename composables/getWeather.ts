import { Weather } from "~/types/types";

export const getWeather = (params: any, key: any) => {
  const runtimeConfig = useRuntimeConfig();
  const result = useAsyncData(key, () =>
    $fetch<Weather>("/forecast.json", {
      method: "GET",
      baseURL: runtimeConfig.public.apiBase,
      params: params,
      headers: {
        "X-RapidAPI-Key": "ef4cf19af2msh8d844dff0add749p161b55jsn0a004db3e86f",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    })
  );
  return result;
};
