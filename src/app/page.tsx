"use client";
import { ChartBarMultiple } from "@/components/ui/ChartBarMultiple";
import ForecastFilter from "@/components/ui/ForecastFilter";
import Segments from "@/components/ui/Segments";
import Widget from "@/components/ui/Widget";
// import clearDay from "@meteocons/svg/fill/mostly-clear-day-sleet.svg";

import useThemeStore from "@/store/useThemeStore";
import clsx from "clsx";

export default function WeatherDashboard() {
  const { theme } = useThemeStore();

  return (
    <div
      className={clsx("flex-1 font-sans", {
        "bg-white": theme === "light",
        "bg-[#111015]": theme === "dark",
      })}
    >
      <main className="p-4 flex flex-col gap-10">
        <section className="flex flex-col gap-4">
          <div className="flex gap-4 items-center justify-between">
            <ForecastFilter />
            <Segments />
          </div>

          {/* Contents */}
          <div className="flex-1 mt-4">
            <Widget />
          </div>
        </section>

        <aside className="w-full">
          <ChartBarMultiple />
        </aside>
      </main>
    </div>
  );
}
