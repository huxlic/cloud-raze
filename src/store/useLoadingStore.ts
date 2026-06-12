import { create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (state) => set({ isLoading: state }),
}));

export default useLoadingStore;