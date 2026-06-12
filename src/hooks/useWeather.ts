"use client";

import { getWeather } from "@/lib/weather";
import useLoadingStore from "@/store/useLoadingStore";
import useSearchParamsStore from "@/store/useSearchParamsStore";
import useWeatherStore from "@/store/useWeatherStore";
import UseWeatherOptions from "@/types/useWeatherOptions";
import { useCallback, useEffect, useState } from "react";

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
const DEFAULT_CITY = {
  name: "New York",
  country: "United States",
  latitude: 40.7128,
  longitude: -74.006,
};

interface SearchResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

const useWeather = ({ refresh = false }: UseWeatherOptions) => {
  const { weather, setWeather } = useWeatherStore();
  const { searchParams, setSearchParams } = useSearchParamsStore();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { isLoading, setIsLoading } = useLoadingStore();
  const [error, setError] = useState<string | null>(null);

  const searchWeather = useCallback(
    async (
      name: string,
      country: string,
      latitude: number,
      longitude: number,
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const weather = await getWeather(name, country, latitude, longitude);

        if (!weather) {
          setError("City not found");
          return;
        }
        console.log(weather);
        setWeather(weather);
        setSearchParams("");
      } catch {
        setError("City not found");
      } finally {
        setIsLoading(false);
      }
    },
    [setWeather, setSearchParams, setIsLoading],
  );

  const refreshWeather = useCallback(async () => {
    if (!weather) return;

    try {
      if (!weather) return;
      const { name, country, lat, lon } = weather;
      const updatedWeather = await getWeather(name, country, lat, lon);

      if (updatedWeather) {
        setWeather(updatedWeather);
      }
    } catch (error) {
      console.error("error:", error);
    }
  }, [setWeather, weather]);

  useEffect(() => {
    if (!weather) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void searchWeather(
        DEFAULT_CITY.name,
        DEFAULT_CITY.country,
        DEFAULT_CITY.latitude,
        DEFAULT_CITY.longitude,
      );
    }
  }, [searchWeather, weather]);

  useEffect(() => {
    if (!weather) return;

    const interval = setInterval(refreshWeather, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [refresh, refreshWeather, weather]);

  return {
    weather,
    searchParams,
    setSearchParams,
    searchResults,
    setSearchResults,
    isLoading,
    setIsLoading,
    error,
    searchWeather,
    refreshWeather,
  };
};

export default useWeather;
