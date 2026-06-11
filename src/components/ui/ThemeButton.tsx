"use client";

import buttons from "@/shared/themeButtons";
import useThemeStore from "@/store/useThemeStore";
import clsx from "clsx";

const ThemeButton = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="inline-flex items-center rounded-full border border-[#2B2A31] bg-[#17161B] p-1 shadow-inner shadow-black/20">
      {buttons.map(({ aria, mode, label, icon: IconType }) => {
        const isActive = theme === mode;

        return (
          <button
            key={aria}
            type="button"
            aria-label={aria}
            onClick={() => setTheme(mode)}
            className={clsx(
              "flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.78rem] font-medium group transition-all duration-300 ease-out",
              "hover:scale-[1.02] hover:text-white hover:bg-white/6 active:scale-95",
              {
                "bg-[#D7E9F8] text-[#111015] shadow-md shadow-[#AECADF]/30":
                  isActive,
                "text-[#C7C6CC] ": !isActive,
              },
            )}
          >
            <IconType
              className={clsx("h-4 w-4 group-hover:text-white ", { "text-[#111015]": isActive })}
            />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeButton;
