import useWeather from "@/hooks/useWeather";

const CitySuggestion = ({
  name,
  country,
  latitude,
  longitude,
}: {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}) => {
  const { searchWeather } = useWeather({ refresh: true });

  return (
    <button
      type="button"
      onClick={() => {
        searchWeather(name, country, latitude, longitude);
      }}
      className="w-full rounded-xl outline-none border border-transparent bg-transparent px-4 py-3 text-left transition-colors duration-150 hover:border-[#3b3941] hover:bg-[#232227] cursor-pointer"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-[.95rem] font-medium text-white">
            {name}
          </p>
          <p className="mt-1 text-[.72rem] text-[#A5A4AB]">{country}</p>
        </div>
        <span className="rounded-full bg-[#111015]/70 px-2 py-1 text-[.65rem] text-[#BBD7EC]">
          {latitude.toFixed(2)}, {longitude.toFixed(2)}
        </span>
      </div>
    </button>
  );
};

export default CitySuggestion;
