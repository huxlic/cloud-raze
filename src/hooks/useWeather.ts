"use client";

import getWeatherByCity from "@/lib/weather";
import useWeatherStore from "@/store/useWeatherStore";
import UseWeatherOptions from "@/types/useWeatherOptions";
import { useCallback, useEffect, useState } from "react";

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
const DEFAULT_CITY = "Lagos";

const useWeather = ({ refresh = false }: UseWeatherOptions) => {
  const { weather, setWeather } = useWeatherStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchWeather = useCallback(
    async (city: string) => {
      const trimmedCity = city.trim();
      if (!trimmedCity) return;

      setIsLoading(true);
      setError(null);

      try {
        const weather = await getWeatherByCity(trimmedCity);

        if (!weather) {
          setError("City not found");
          return;
        }

        setWeather(weather);
      } catch {
        setError("City not found");
      } finally {
        setIsLoading(false);
      }
    },
    [setWeather],
  );

  const refreshWeather = useCallback(async () => {
    if (!weather?.name) return;

    try {
      const updatedWeather = await getWeatherByCity(weather.name);

      if (updatedWeather) {
        setWeather(updatedWeather);
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }, [setWeather, weather]);

  useEffect(() => {
    if (!weather?.name) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void searchWeather(DEFAULT_CITY);
    }
  }, [searchWeather, weather?.name]);

  useEffect(() => {
    if (!refresh || !weather?.name) return;

    const interval = setInterval(refreshWeather, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [refresh, refreshWeather, weather?.name]);

  return {
    weather,
    isLoading,
    error,
    searchWeather,
    refreshWeather,
  };
};

export default useWeather;
