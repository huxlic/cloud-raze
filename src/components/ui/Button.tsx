"use client";

import buttons from "@/shared/themeButtons";
import useThemeStore from "@/store/useThemeStore";
import clsx from "clsx";

const Button = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="rounded-full flex bg-[#1B1A1D] border border-[#201F24] text-white">
      {buttons.map(({ aria, mode, icon: IconType }) => (
        <button
          key={aria}
          className={clsx(
            " rounded-full p-2 transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out hover:shadow-lg active:translate-y-0 active:shadow-md",
            {
              "bg-[#D7E9F8] text-black": theme === mode,
            },
          )}
          aria-label={aria}
          onClick={() => setTheme(mode)}
        >
          <IconType />
        </button>
      ))}
    </div>
  );
};

export default Button;
