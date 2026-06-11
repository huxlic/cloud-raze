import { StaticImageData } from "next/image";

type UI = {
  icon: string | StaticImageData;
  alt: string;
};

interface ForecastCardProps {
  index: number;
  time: string[];
  country: string;
  UI: UI;
  temperature_2m: number[];
  temperature_2m_max: number[];
}

export default ForecastCardProps;