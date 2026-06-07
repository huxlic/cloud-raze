"use client";

import {
  getCurrentTimeByCountry,
  getDayFromDate,
  getShortDayFromDate,
  getWeatherUIDetails,
} from "@/lib/helpers";
import useWeatherStore from "@/store/useWeather";
import { orbitron } from "./fonts";
import { useEffect, useState } from "react";
import Image from "next/image";
import { weatherDetails } from "@/shared/constants";
import getWeatherByCity from "@/lib/weather";

const Widget = () => {
  const { weather, setWeather } = useWeatherStore();
  const {
    country,
    weather_code,
    sunrise,
    sunset,
    temperature_2m,
    temperature_2m_max,
    time,
  } = weather ? weather : {};

  const [currentTime, setCurrentTime] = useState(() =>
    getCurrentTimeByCountry(country),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimeByCountry(country));
    }, 1000);

    return () => clearInterval(interval);
  }, [country]);

  useEffect(() => {
    const TEN_MINUTES = 5 * 60 * 1000;
    if (!weather?.name) return;

    const refreshWeather = async () => {
      const updatedWeather = await getWeatherByCity(weather.name);

      if (updatedWeather) {
        setWeather(updatedWeather);
      }
    };

    const interval = setInterval(refreshWeather, TEN_MINUTES);

    return () => clearInterval(interval);
  }, [weather?.name, setWeather]);

  return (
    <div className="sm:h-60 flex flex-col sm:grid sm:grid-cols-9 md:grid-cols-9 lg:grid-cols-9 gap-4">
      <div className="flex flex-col bg-[#BBD7EC] text-[#0F0F11] col-span-3 rounded-3xl overflow-hidden">
        <div
          className={`flex-1 flex px-4 justify-between box-border items-center bg-[#AECADF] `}
        >
          {time && (
            <>
              <h2 className="font-medium">
                {getDayFromDate(time[0], country)}
              </h2>
              <p className={`${orbitron.className} uppercase font-semibold`}>
                {currentTime}
              </p>
            </>
          )}
        </div>

        <div className="flex-4 p-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className={`${orbitron.className} font-bold text-4xl`}>
              {temperature_2m && `${temperature_2m}°`}
            </h3>

            {weather_code && (
              <Image
                src={getWeatherUIDetails(weather_code[0]).icon}
                alt={getWeatherUIDetails(weather_code[0]).alt}
                width={120}
                height={10}
                className="-my-6 -mx-6 target-icon"
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            {weather && (
              <ul className="text-[.8rem] flex flex-col gap-y-1">
                {weatherDetails.map(({ name, value, append }) => (
                  <li key={name}>
                    <span className="capitalize">{name}: </span>
                    <span
                      className={`uppercase ${orbitron.className} text-[.7rem] font-bold`}
                    >
                      {`${weather[value]}${append} `}
                    </span>{" "}
                  </li>
                ))}
              </ul>
            )}

            <ul className="text-[.8rem] flex flex-col gap-y-1">
              <li>
                Sunrise:{" "}
                <span
                  className={`uppercase ${orbitron.className} font-semibold`}
                >
                  {sunrise
                    ? getCurrentTimeByCountry(country, sunrise[0])
                    : "N/A"}
                </span>{" "}
              </li>
              <li>
                Sunset:{" "}
                <span
                  className={`uppercase ${orbitron.className} font-semibold`}
                >
                  {sunrise
                    ? getCurrentTimeByCountry(country, sunset[0])
                    : "N/A"}
                </span>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid-cols-3 sm:col-span-6 grid sm:grid-cols-6 gap-4">
        {time &&
          time.map((_: never, index: number) => {
            if (index === 0) return;
            const UI = getWeatherUIDetails(weather_code[index] || 0);

            return (
              <div
                key={index}
                className="flex flex-col bg-[#1B1B1D] rounded-3xl box-border h-40 sm:h-auto  "
              >
                <div className="flex-1 flex items-center justify-center border-b border-[#3b3941] mx-4">
                  <p>{getShortDayFromDate(time[index], country)}</p>
                </div>
                <div className="flex-4 flex flex-col justify-evenly items-center">
                  <div className="">
                    <Image
                      src={UI.icon}
                      alt={UI.alt}
                      width={90}
                      height={90}
                      className="-my-6 h-auto"
                    />
                  </div>
                  <div className="">
                    {temperature_2m && (
                      <p
                        className={`${orbitron.className} font-semibold text-2xl`}
                      >{`${Math.round(temperature_2m_max[index])}°`}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Widget;
