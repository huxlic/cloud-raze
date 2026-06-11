import ChartData from "@/types/CharData";
import { getShortDayFromDate } from "./helpers";

const getChartData = (
    weatherData:
      | {
          country?: string;
          precipitation_probability_max?: number[];
          rain_sum?: number[];
          time?: string[];
        }
      | null
      | undefined,
  ): ChartData[] => {
    
    if (!weatherData?.precipitation_probability_max?.length) return [];

    const { country, precipitation_probability_max, rain_sum, time } =
      weatherData;

    return precipitation_probability_max.map((chance, index) => ({
      day: getShortDayFromDate(time?.[index] ?? "", country ?? ""),
      chance,
      rainfall: rain_sum?.[index] ?? 0,
    }));
  };

  export default getChartData;