import { Search } from "~/types/types";

export const getSearch = (params?: object) => {
  const runtimeConfig = useRuntimeConfig();
  const result = useAsyncData("search", async () =>
    $fetch<Search[]>("/search.json", {
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
