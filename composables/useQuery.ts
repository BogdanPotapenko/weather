export function useQuery<TData>(queryFn: () => Promise<{ data: TData }>) {
  const isLoading = ref(true);
  const data = ref<TData>();
  const error = ref(undefined);

  // onMounted(() => setTimeout(() => fetchData(), 1));
  onMounted(() => fetchData());

  const fetchData = async () => {
    if (!isLoading.value) {
      isLoading.value = true;
    }
    try {
      await nextTick(async () => {
        const result = await queryFn();
        data.value = result.data;
      });
    } catch {
      console.log("no results");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    data,
    error,
    refetch: fetchData,
  };
}
