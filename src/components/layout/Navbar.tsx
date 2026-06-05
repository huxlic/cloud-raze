"use client"

import { FiSearch } from "react-icons/fi";
import { HiSquares2X2 } from "react-icons/hi2";
import { IoNotifications } from "react-icons/io5";
import { TiLocation } from "react-icons/ti";
import Button from "../ui/Button";
import bgWeather from "@/assets/images/weather.jpg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import useThemeStore from "@/store/useTheme";

const Navbar = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className={clsx("", {
        "bg-white text-white": theme === "light",
        "bg-[#111015] text-white": theme === "dark",
      })}
    >
      <nav className="flex flex-col-reverse gap-4 p-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8 border-b border-[#3b3941] rounded-b-3xl">
        {/* Top/mobile row */}
        <div className="flex items-center justify-between gap-4 lg:justify-start lg:gap-6">
          <div className="flex gap-3">
            <button
              aria-label="dash"
              className="cursor-pointer rounded-full bg-[#232227] p-2 transition hover:bg-[#2f2e35]"
            >
              <HiSquares2X2 size={15} />
            </button>

            <button
              aria-label="notification"
              className="cursor-pointer rounded-full bg-[#232227] p-2 transition hover:bg-[#2f2e35]"
            >
              <IoNotifications size={15} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <TiLocation size={15} />
            <p className="text-[.8rem]">
              Seattle, <span className="font-extralight">Australia</span>
            </p>
          </div>
        </div>

        {/* Search */}
        <form
          action=""
          role="search"
          className={clsx(
            "flex w-full items-center gap-2 rounded-full px-4 py-3 transition-colors lg:max-w-md lg:flex-1",
            {
              "bg-[#232227] text-white": theme === "dark",
              "bg-[#f2f4f7] text-[#171717]": theme === "light",
            },
          )}
        >
          <FiSearch className="shrink-0" />
          <input
            type="search"
            aria-label="Search city..."
            placeholder="Search city..."
            className={clsx(
              "w-full bg-transparent text-[.8rem] outline-0 placeholder:text-[.7rem]",
              {
                "placeholder:text-white/50": theme === "dark",
                "placeholder:text-black/45": theme === "light",
              },
            )}
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-4 justify-end">
          <Button />

          <Link
            href="/"
            className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-white"
          >
            <Image
              src={bgWeather}
              alt="weather background image"
              fill
              sizes="32px"
              className="object-cover"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
