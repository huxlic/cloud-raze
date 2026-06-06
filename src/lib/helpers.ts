import { countryTimeZones } from "@/shared/constants";

export function getTimeZoneByCountry(country: string): string | null {
  if (!country) return null;
  const key = country.trim().toLowerCase().replace(/\s+/g, "_");

  return countryTimeZones[key] ?? null;
}

export function getDayFromDate(
  dateString: string,
  country: string,
): string | null {
  const timeZone = getTimeZoneByCountry(country);

  if (!timeZone) return null;

  const date = new Date(`${dateString}`);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone,
  });
}

export function getShortDayFromDate(
  dateString: string,
  country: string,
): string | null {
  const timeZone = getTimeZoneByCountry(country);

  if (!timeZone) return null;

  const date = new Date(`${dateString}`);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone,
  });
}

export function getCurrentTimeByTimeZone(country: string): string {
  const timeZone = getTimeZoneByCountry(country);
  if (!timeZone) return "";
  return new Date()
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    })
    .toLowerCase();
}