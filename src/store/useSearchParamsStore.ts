import { create } from "zustand";

interface SearchParamsStore {
    searchParams: string;
    setSearchParams: (searchParams: string) => void
}

const useSearchParamsStore = create<SearchParamsStore>((set) => ({
    searchParams: "",
    setSearchParams: (searchParams) => set({ searchParams: searchParams }),
}))

export default useSearchParamsStore;