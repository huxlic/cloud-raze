"use client";

import mostlyClearDaySmoke from "@meteocons/svg/fill/mostly-clear-day-smoke.svg";

import {
  getCurrentTimeByTimeZone,
  getDayFromDate,
  getShortDayFromDate,
  getWeatherUIDetails,
} from "@/lib/helpers";
import useWeatherStore from "@/store/useWeather";
import { orbitron } from "./fonts";
import { useEffect, useState } from "react";
import Image from "next/image";

const Widget = () => {
  const { weather } = useWeatherStore();
  // if (!weather) return null;
  const {
    name,
    country,
    weather_code,
    apparent_temperature_max,
    apparent_temperature_min,
    sunrise,
    sunset,
    temperature_2m_max,
    temperature_2m_min,
    time,
  } = weather ? weather : {};

  // console.log(weather);

  const [currentTime, setCurrentTime] = useState(() =>
    getCurrentTimeByTimeZone(country),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimeByTimeZone(country));
    }, 1000);

    return () => clearInterval(interval);
  }, [country]);

  return (
    <div className="h-60 grid grid-cols-9 gap-8">
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
              {temperature_2m_max && `${temperature_2m_max[0]}°`}
            </h3>

            <Image
              src={getWeatherUIDetails(weather_code[0]).icon}
              alt={getWeatherUIDetails(weather_code[0]).alt}
              width={120}
              height={10}
              className="-my-8 -mx-6 target-icon"
            />
          </div>
        </div>
      </div>

      {time &&
        time.map((_: never, index: number) => {
          if (index === 0) return;
          const UI = getWeatherUIDetails(weather_code[index] || 0);

          return (
            <div
              key={index}
              className="flex flex-col bg-[#1B1B1D] rounded-3xl box-border "
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
                    className="-my-10 h-auto"
                  />
                </div>
                <div className="">
                  {temperature_2m_max && (
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
  );
};

export default Widget;
