import { getSearch } from "~/server/api/getSearch";

export function useSearch() {
  const q = ref("");

  const result = useQuery(() => {
    return q.value ? getSearch({ q: q.value }) : new Promise(() => {});
  });
  watch(q, () => (q.value ? result?.refetch() : ""));

  return {
    ...result,
    q,
  };
}
