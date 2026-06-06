"use client"

import { filters } from "@/shared/constants";
import clsx from "clsx";
import { useState } from "react";

const ForecastFilter = () => {
    const [isActive, setIsActive] = useState(2);


  return (
    <div className="flex text-[.85rem] gap-3">
      {filters.map((btn, index) => (
        <button
          key={btn}
          onClick={() => setIsActive(index)}
          className={clsx("text-[#818085] font-light", {
            "text-white font-normal": isActive === index,
          })}
        >
          {btn}
        </button>
      ))}
    </div>
  );
}

export default ForecastFilter