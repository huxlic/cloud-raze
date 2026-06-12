import WeatherStore from "@/types/WeatherStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      weather: {
        lat: "",
        lon: "",
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
