export interface Weather {
  location: Location;
  current: WeatherCurrent;
  forecast: WeatherForecast;
}
export interface Location {
  name: string;
}
export interface WeatherCurrent {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  wind_kph: number;
  wind_mph: number;
  uv: number;
  humidity: number;
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
  totalprecip_mm: number;
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
  temp_c: number;
  temp_f: number;
}
