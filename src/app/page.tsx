"use client"
import ForecastFilter from "@/components/ui/ForecastFilter";
import Segments from "@/components/ui/Segments";
import Widget from "@/components/ui/Widget";
// import clearDay from "@meteocons/svg/fill/mostly-clear-day-sleet.svg";

import useThemeStore from "@/store/useTheme";
import clsx from "clsx";

export default function WeatherDashboard() {

  const {theme} = useThemeStore();

  return (
    <div
      className={clsx("flex-1 font-sans", {
        "bg-white": theme === "light",
        "bg-[#111015]": theme === "dark",
      })}
    >
      <main className="grid grid-cols-4 gap-10 p-4">
        <section className="col-span-3 flex flex-col">
          <div className="flex justify-between">
            <ForecastFilter />
            <Segments />
          </div>

          {/* Contents */}
          <div className="flex-1 mt-6">
            <Widget/>
          </div>
        </section>

        <section className="">sec</section>
        {/* <Image src={clearDay} alt="clear day" width={100} height={10} /> */}
      </main>
    </div>
  );
}
