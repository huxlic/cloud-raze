import { Theme } from "@/store/useThemeStore";
import { BsMoonStarsFill } from "react-icons/bs";
import { MdSunny } from "react-icons/md";

interface ThemeButtonProps {
  aria: string;
  mode: Theme;
  icon: React.ComponentType;
}

const buttons: ThemeButtonProps[] = [
  {
    aria: "light-theme",
    mode: "light",
    icon: MdSunny,
  },
  {
    aria: "dark-theme",
    mode: "dark",
    icon: BsMoonStarsFill,
  },
];

export default buttons;
