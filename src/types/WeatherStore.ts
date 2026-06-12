
import { getWeather } from "@/lib/weather";

type WeatherData = Awaited<ReturnType<typeof getWeather>>;

interface WeatherStore {
  weather: WeatherData | null;
  setWeather: (mode: WeatherData) => void;
}

export default WeatherStore