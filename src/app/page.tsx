"use client"

import useThemeStore from "@/store/useTheme";
import clsx from "clsx";

export default function WeatherDashboard() {

  const {theme} = useThemeStore();

  return (
    <div
      className={clsx(
        "flex flex-col flex-1 items-center justify-center font-sans",
        {
          "bg-white": theme === "light",
          "bg-[#111015]": theme === "dark",
        },
      )}
    >
      <main>
        <h2>WeatherDashboard </h2>
      </main>
    </div>
  );
}
