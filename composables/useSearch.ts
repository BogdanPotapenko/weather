export function useSearch() {
  const runtimeConfig = useRuntimeConfig();
  const q = ref("");

  const result = useQuery(() => {
    const res = useAsyncData<any>("search", async () =>
      q.value
        ? $fetch("/search.json", {
            method: "GET",
            baseURL: runtimeConfig.public.apiBase,
            params: { q: q.value },
            headers: {
              "X-RapidAPI-Key": runtimeConfig.public.weatherKey,
              "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
            },
          })
        : undefined
    );
    return res;
  });

  watch(q, () => (q.value ? result!.refetch() : ""));

  return {
    ...result,
    q,
  };
}
