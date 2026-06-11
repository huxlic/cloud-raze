import { getShortDayFromDate } from "@/lib/helpers";
import Image from "next/image";
import { orbitron } from "./fonts";
import ForecastCardProps from "@/types/ForecastCardProps";



const ForecastCard = ({
  index,
  time,
  country,
  UI,
  temperature_2m,
  temperature_2m_max,
}: ForecastCardProps) => {
  return (
    <div
      key={index}
      className="flex flex-col bg-[#1B1B1D] text-white rounded-3xl box-border h-40 sm:h-auto  "
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
};

export default ForecastCard;
