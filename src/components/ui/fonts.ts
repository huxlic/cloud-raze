import { Nova_Square, Outfit } from "next/font/google";

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const nova = Nova_Square({
    subsets: ["latin"],
    weight: ["400"]
})
