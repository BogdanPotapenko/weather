import { getSearch } from "~/server/api/getSearch";

export function useSearch() {
  const searchParams = ref("");

  const result = useQuery(() => {
    return searchParams.value
      ? getSearch({ q: searchParams.value })
      : new Promise(() => {});
  });
  watch(searchParams, () => (searchParams.value ? result?.refetch() : ""));

  return {
    ...result,
    searchParams,
  };
}
