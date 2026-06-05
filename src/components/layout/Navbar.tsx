"use client"

import { FiSearch } from "react-icons/fi";
import { TiLocation } from "react-icons/ti";
import Button from "../ui/Button";
import bgWeather from "@/assets/images/weather.jpg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import useThemeStore from "@/store/useTheme";
import quickLinks from "@/shared/quickLinks";

const Navbar = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className={clsx("", {
        "bg-white text-black": theme === "light",
        "bg-[#111015] text-white": theme === "dark",
      })}
    >
      <nav className="flex flex-col-reverse gap-4 p-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8 border-b border-[#3b3941] rounded-b-3xl">
        {/* Top/mobile row */}
        <div className="flex items-center justify-between gap-4 lg:justify-start lg:gap-6">
          <div className="flex gap-3">
            {quickLinks.map(({ aria, icon: IconType }) => (
              <button
                key={aria}
                aria-label={aria}
                className="cursor-pointer rounded-full p-2 transition hover:bg-[#2f2e35] hover:text-white"
              >
                <IconType />
              </button>
            ))}
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
