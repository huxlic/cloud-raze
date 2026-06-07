import { countryTimeZones } from "@/shared/constants";

import clearDay from "@meteocons/svg/fill/clear-day.svg";
import partlyCloudyDay from "@meteocons/svg/fill/partly-cloudy-day.svg";
import partlyCloudyDaySmoke from "@meteocons/svg/fill/partly-cloudy-day-smoke.svg"; // or haze / mist
import mist from "@meteocons/svg/fill/mist.svg";
import fog from "@meteocons/svg/fill/fog.svg";
import drizzle from "@meteocons/svg/fill/drizzle.svg";
import rain from "@meteocons/svg/fill/rain.svg";
import partlyCloudyDayRain from "@meteocons/svg/fill/partly-cloudy-day-rain.svg"; // Replaces "showers-day"
import partlyCloudyDaySnow from "@meteocons/svg/fill/partly-cloudy-day-snow.svg"; // Replaces "snow-showers"
import snow from "@meteocons/svg/fill/snow.svg";
import thunderstormsDay from "@meteocons/svg/fill/thunderstorms-day.svg";
import thunderstormsDayRain from "@meteocons/svg/fill/thunderstorms-day-rain.svg";
import fallbackIcon from "@meteocons/svg/fill/not-available.svg";

export const getTimeZoneByCountry = (country: string): string | null => {
  if (!country) return null;
  const key = country.trim().toLowerCase().replace(/\s+/g, "_");

  return countryTimeZones[key] ?? null;
}

// Returns the day of the week
export const getDayFromDate = (
  dateString: string,
  country: string,
): string | null => {
  const timeZone = getTimeZoneByCountry(country);

  if (!timeZone) return null;

  const date = new Date(`${dateString}`);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone,
  });
}

// Returns the short day of the week
export const getShortDayFromDate = (
  dateString: string,
  country: string,
): string | null => {
  const timeZone = getTimeZoneByCountry(country);

  if (!timeZone) return null;

  const date = new Date(`${dateString}`);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone,
  });
}

// Returns the current time
export const getCurrentTimeByTimeZone = (country: string): string => {
  const timeZone = getTimeZoneByCountry(country);
  if (!timeZone) return "";
  return new Date()
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    })
}

// Returns the weather icon
export const getWeatherUIDetails = (code: number) => {
  if (code === 0) {
    return { icon: clearDay, alt: "Clear sky" };
  }
  // Clouds
  if (code >= 1 && code <= 3) {
    return {
      icon: partlyCloudyDay,
      alt: "Mainly clear with partly cloudy skies",
    };
  }
  // Smoke / Haze
  if (code >= 4 && code <= 9) {
    return {
      icon: partlyCloudyDaySmoke,
      alt: "Reduced visibility due to smoke, haze, or dust",
    };
  }
  // Mist & Shallow Fog
  if (code >= 10 && code <= 12) {
    return { icon: mist, alt: "Shallow mist or ice fog" };
  }
  // Atmospheric phenomena / Distant weather
  if (code >= 13 && code <= 39) {
    return { icon: fog, alt: "Atmospheric dust or drifting weather phenomena" };
  }
  // Active Fog
  if (code >= 40 && code <= 49) {
    return { icon: fog, alt: "Dense fog or freezing fog conditions" };
  }
  // Drizzle
  if (code >= 50 && code <= 55) {
    return { icon: drizzle, alt: "Light to heavy continuous drizzle" };
  }
  // Freezing Drizzle
  if (code >= 56 && code <= 59) {
    return { icon: snow, alt: "Freezing drizzle or mixed precipitation" };
  }
  // Continuous Rain
  if (code >= 60 && code <= 65) {
    return { icon: rain, alt: "Intermittent or heavy continuous rain" };
  }
  // Freezing Rain / Sleet
  if (code >= 66 && code <= 69) {
    return { icon: snow, alt: "Freezing rain or mixed sleet" };
  }
  // Snow Fall
  if (code >= 70 && code <= 79) {
    return { icon: snow, alt: "Continuous snowfall or ice crystals" };
  }
  // Rain Showers (Mapped to valid partly-cloudy-day-rain file)
  if (code >= 80 && code <= 82) {
    return { icon: partlyCloudyDayRain, alt: "Violent or heavy rain showers" };
  }
  // Snow or Hail Showers (Mapped to valid partly-cloudy-day-snow file)
  if (code >= 83 && code <= 89) {
    return {
      icon: partlyCloudyDaySnow,
      alt: "Heavy snow or convective hail showers",
    };
  }
  // Thunderstorms (No rain active yet)
  if (code >= 90 && code <= 94) {
    return {
      icon: thunderstormsDay,
      alt: "Recent thunderstorm or nearby severe weather",
    };
  }
  // Severe Thunderstorms with Precipitation
  if (code >= 95 && code <= 99) {
    return {
      icon: thunderstormsDayRain,
      alt: "Active severe thunderstorm with heavy rain or hail",
    };
  }

  // Fallback
  return { icon: fallbackIcon, alt: "Weather status unavailable" };
}
