import { HiSquares2X2 } from "react-icons/hi2";
import { IoNotifications } from "react-icons/io5";

interface QuickLink {
  aria: string;
  icon: React.ComponentType;
}

const quickLinks: QuickLink[] = [
  {
    aria: "dash",
    icon: HiSquares2X2,
  },
  {
    aria: "notification",
    icon: IoNotifications,
  },
];

export default quickLinks;
