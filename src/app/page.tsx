"use client"
// import clearDay from "@meteocons/svg/fill/mostly-clear-day-sleet.svg";

import useThemeStore from "@/store/useTheme";
import clsx from "clsx";

export default function WeatherDashboard() {

  const {theme} = useThemeStore();

  return (
    <div
      className={clsx(
        "flex-1 font-sans",
        {
          "bg-white": theme === "light",
          "bg-[#111015]": theme === "dark",
        },
      )}
    >
      <main>
        <h2>WeatherDashboard</h2>
        {/* <Image src={clearDay} alt="clear day" width={100} height={10} /> */}
      </main>
    </div>
  );
}
