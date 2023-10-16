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
              "X-RapidAPI-Key":
                "ef4cf19af2msh8d844dff0add749p161b55jsn0a004db3e86f",
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
