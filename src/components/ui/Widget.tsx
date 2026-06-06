"use client"

import useWeatherStore from "@/store/useWeather";

const Widget = () => {

    const { weather } = useWeatherStore();
    console.log(weather);

  return (
    <div className="h-60 grid grid-cols-9 gap-8">
      <div className="flex flex-col bg-[#BBD7EC] col-span-3 rounded-3xl overflow-hidden">
        <div className="flex-1 bg-[#AECADF]"></div>
        <div className="flex-4"></div>
      </div>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col bg-[#1B1B1D] rounded-3xl box-border ">
          <div className="flex-1 border-b border-[#3b3941] mx-4"></div>
          <div className="flex-4"></div>
        </div>
      ))}
    </div>
  );
}

export default Widget