import getWeatherByCity from "@/lib/weather";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type WeatherData = Awaited<ReturnType<typeof getWeatherByCity>>;

interface WeatherStore {
  weather: WeatherData;
  setWeather: (mode: WeatherData) => void;
}

const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      weather: {
        latitude: "",
        longitude: "",
        name: "",
        country: "",
        temperature_2m: "",
        weather_code: "",
        pressure_msl: "",
        relative_humidity_2m: "",
        rain: "",
      },
      setWeather: (mode) => set({ weather: mode }),
    }),
    {
      name: "weather",
    },
  ),
);

export default useWeatherStore;
