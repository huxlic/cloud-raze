import { segments } from "@/shared/constants";
import clsx from "clsx";
import { useState } from "react";

const Segments = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex rounded-full bg-[#1E1E1E]">
      {segments.map((tab, index) => (
        <button
          key={tab}
          onClick={() => setActiveTab(index)}
          className={clsx("text-[.8rem] px-3 py-1.5 rounded-full", {
            "bg-[#BBD7EC] text-[#1E1E1E] font-medium": activeTab === index,
            "text-[#818085]": activeTab !== index,
          })}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Segments;
