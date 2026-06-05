"use client"

import useThemeStore from "@/store/useTheme"
import clsx from "clsx"
import { BsMoonStarsFill } from "react-icons/bs"
import { MdSunny } from "react-icons/md"

const Button = () => {

    const {theme, setTheme} = useThemeStore();

  return (
    <div className="rounded-full flex bg-[#1B1A1D] border border-[#201F24]">
      <button
        className={clsx(
          " rounded-full p-2 transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out hover:shadow-lg active:translate-y-0 active:shadow-md",
          {
            "bg-[#D7E9F8] text-black": theme === "light",
          },
        )}
        aria-label="light-theme"
        onClick={() => setTheme("light")}
      >
        <MdSunny />
      </button>
      <button
        className={clsx(
          "rounded-full p-2 transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out hover:shadow-lg active:translate-y-0 active:shadow-md",
          {
            "bg-[#D7E9F8] text-black": theme === "dark",
          },
        )}
        aria-label="dark-theme"
        onClick={() => setTheme("dark")}
      >
        <BsMoonStarsFill />
      </button>
    </div>
  );
}

export default Button