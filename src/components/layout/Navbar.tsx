"use client";

import { FiSearch } from "react-icons/fi";
import { TiLocation } from "react-icons/ti";
import bgWeather from "@/assets/images/weather.jpg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import useThemeStore from "@/store/useThemeStore";
import quickLinks from "@/shared/quickLinks";
import { useEffect } from "react";
import { GiSpinningBlades } from "react-icons/gi";
import useWeather from "@/hooks/useWeather";
import ThemeButton from "../ui/ThemeButton";
import CitySuggestion from "../ui/CitySuggestion";
import { getCoordinates } from "@/lib/weather";

interface Result {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

const Navbar = () => {
  const { theme } = useThemeStore();
  const {
    weather,
    isLoading,
    setIsLoading,
    error,
    searchWeather,
    searchResults,
    setSearchResults,
    searchParams,
    setSearchParams,
  } = useWeather({
    refresh: true,
  });

  const handleSearch = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    await searchWeather(
      searchResults[0].name,
      searchResults[0].country,
      searchResults[0].latitude,
      searchResults[0].longitude,
    );
    setSearchParams("");
  };

  useEffect(() => {
    if (!searchParams.trim) return;

    (async () => {
      setIsLoading(true);
      const response = await getCoordinates(searchParams);
      setSearchResults(response);
      setIsLoading(false);
    })();
  }, [searchParams, setIsLoading, setSearchResults]);

  return (
    <div
      className={clsx("", {
        "bg-white text-black": theme === "light",
        "bg-[#111015] text-white": theme === "dark",
      })}
    >
      <nav className="flex flex-col-reverse gap-4 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-8 border-b border-[#3b3941]">
        {/* Top/mobile row */}
        <div className="flex lg:w-1/4 items-center justify-between gap-4 lg:justify-start lg:gap-6">
          <div className="flex gap-3">
            {quickLinks.map(({ aria, icon: IconType }) => (
              <button
                key={aria}
                aria-label={aria}
                className="cursor-pointer rounded-full p-2 transition hover:bg-[#2f2e35] hover:text-white"
              >
                <IconType />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <TiLocation size={15} />
            <p className="text-[.8rem]">
              {error ? (
                <span className="text-red-500">{error}</span>
              ) : weather?.name ? (
                <>
                  {weather.name},{" "}
                  <span className="font-extralight">{weather.country}</span>
                </>
              ) : (
                <span className="text-orange-300">Search for a city</span>
              )}
            </p>
          </div>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          action=""
          role="search"
          className={clsx(
            "relative flex w-full box-border items-center gap-2 rounded-full px-4 py-3 transition-colors lg:max-w-md lg:flex-1",
            {
              "bg-[#232227] text-white": theme === "dark",
              "bg-[#f2f4f7] text-[#171717]": theme === "light",
            },
          )}
        >
          <FiSearch className="shrink-0" />
          <input
            autoCorrect="false"
            spellCheck="false"
            type="search"
            aria-label="Search city..."
            placeholder="Search city..."
            className={clsx(
              "w-full bg-transparent text-[.8rem] outline-0 placeholder:text-[.7rem]",
              {
                "placeholder:text-white/50": theme === "dark",
                "placeholder:text-black/45": theme === "light",
              },
            )}
            onChange={(e) => setSearchParams(e.target.value)}
            value={searchParams}
          />
          <span className={`${isLoading && "animate-spin"}`}>
            <GiSpinningBlades />
          </span>

          {/* Search results */}
          {searchResults && (
            <div className="absolute suggestions top-[110%] left-0 right-0 z-10 bg-[#232227] rounded-xl overflow-hidden max-h-80 overflow-y-auto">
              {searchResults.map((result: Result) => (
                <CitySuggestion
                  {...result}
                  key={`${result.latitude}-${result.longitude}`}
                />
              ))}
            </div>
          )}
        </form>

        {/* Actions */}
        <div className="flex items-center gap-4 justify-end">
          <ThemeButton />

          <Link
            href="/"
            className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-white"
          >
            <Image
              src={bgWeather}
              alt="weather background image"
              fill
              sizes="32px"
              className="object-cover"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
