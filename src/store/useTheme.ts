import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "dark" | "light";

interface ThemeStore {
  theme: Theme;
  setTheme: (mode: Theme) => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (mode) => set({ theme: mode }),
    }),
    {
      name: "theme",
    },
  ),
);

export default useThemeStore;
