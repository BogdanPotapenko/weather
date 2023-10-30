import { getSearch } from "~/server/api/getSearch";

export function useSearch() {
  const searchParams = ref("");

  const result = useQuery(async () => {
    const res = searchParams.value
      ? await getSearch({ q: searchParams.value })
      : undefined;
    return { data: res?.data.value };
  });

  watch(searchParams, () => (searchParams.value ? result?.refetch() : ""));

  return {
    ...result,
    searchParams,
  };
}
