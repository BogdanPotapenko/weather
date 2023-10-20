import {
  WeatherCurrent,
  ForecastHuor,
  WeatherForecastday,
} from "~/types/types";

export function useWeather() {
  const location = ref("50.447, 30.523");
  const date = ref(new Date());
  const lang = ref("en");
  const week = ref<string[]>([]);
  const hours = ref<ForecastHuor[]>([]);

  date.value.setDate(date.value.getDate() + 3);
  for (let i = 0; i < 4; i++, date.value.setDate(date.value.getDate() + 1)) {
    week.value.push(
      date.value.getFullYear() +
        "-" +
        (date.value.getMonth() + 1) +
        "-" +
        date.value.getDate()
    );
  }

  const result = useQuery(async () => {
    const res = await getWeather(
      {
        q: location.value,
        days: 3,
        lang: lang.value,
      },
      "weather"
    );

    for (const day of week.value) {
      const { data } = await getWeather(
        { q: location.value, dt: day, lang: lang.value },
        day
      );
      res.data.value?.forecast.forecastday.push(
        data.value!.forecast.forecastday[0]
      );
    }

    const h = ref<ForecastHuor[]>([]);
    h.value.push({
      time: res.data.value!.current.last_updated,
      temp_c: res.data.value!.current.temp_c,
      temp_f: res.data.value!.current.temp_f,
      condition: { icon: res.data.value!.current.condition.icon },
    });
    res.data.value?.forecast.forecastday.forEach((day: WeatherForecastday) => {
      day.hour.forEach((hour: ForecastHuor) => {
        if (h.value?.length < 25 && new Date() <= new Date(hour.time)) {
          h.value?.push(hour);
        }
      });
    });
    hours.value = h.value;
    console.log(hours.value);
    return res;
  });

  watch(date, () => result.refetch());
  watch(location, () => result.refetch());
  watch(lang, () => result.refetch());
  return {
    ...result,
    hours,
    date,
    location,
    lang,
  };
}
