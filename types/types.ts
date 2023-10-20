export interface Weather {
  location: Location;
  current: WeatherCurrent;
  forecast: WeatherForecast;
}
export interface Location {
  name: string;
}
export interface WeatherCurrent {
  last_updated: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  wind_kph: number;
  wind_mph: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  humidity: number;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  condition: WeatherCondition;
}
export interface WeatherCondition {
  icon: string;
}
export interface WeatherForecast {
  forecastday: WeatherForecastday[];
}
export interface WeatherForecastday {
  date: Date;
  day: Day;
  astro: Astro;
  hour: ForecastHuor[];
}
export interface Day {
  maxtemp_c: number;
  mintemp_c: number;
  maxtemp_f: number;
  mintemp_f: number;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  condition: ForecastDayCondition;
}
export interface Astro {
  sunrise: string;
  sunset: string;
}
export interface ForecastDayCondition {
  text: string;
  icon: string;
}
export interface ForecastHuor {
  time: string;
  condition: HourCondition;
  temp_c: number;
  temp_f: number;
}
export interface HourCondition {
  icon: string;
}

export interface Search {
  id: number;
  name: string;
}
