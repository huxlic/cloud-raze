import getWeatherByCity from "@/lib/weather";

type WeatherData = Awaited<ReturnType<typeof getWeatherByCity>>;

interface WeatherStore {
  weather: WeatherData | null;
  setWeather: (mode: WeatherData) => void;
}

export default WeatherStore