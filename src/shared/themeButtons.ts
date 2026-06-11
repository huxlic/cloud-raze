import type { ComponentType, SVGProps } from "react";
import { Theme } from "@/store/useThemeStore";
import { BsMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";

interface ThemeButtonProps {
  aria: string;
  mode: Theme;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const buttons: ThemeButtonProps[] = [
  {
    aria: "light-theme",
    mode: "light",
    label: "Light",
    icon: MdSunny,
  },
  {
    aria: "dark-theme",
    mode: "dark",
    label: "Dark",
    icon: BsMoonStarsFill,
  },
];

export default buttons;
