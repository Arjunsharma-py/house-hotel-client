import { create } from "zustand";

interface HouseQuery {
  propertyType?: string;
  searchText?: string;
  sortOrder?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  maxRating?: number;
}

interface HouseQueryStore {
  houseQuery: HouseQuery;
  setSearchText: (searchText: string) => void;
  setPropertyType: (propertyType: string) => void;
  setSortOrder: (sortOrder: string) => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setMinRating: (minRating: number) => void;
  setMaxRating: (maxRating: number) => void;
}

const useHouseQuery = create<HouseQueryStore>((set) => ({
  houseQuery: {},
  setSearchText: (searchText) => set(() => ({ houseQuery: { searchText } })),
  setPropertyType: (propertyType) =>
    set((store) => ({ houseQuery: { ...store.houseQuery, propertyType } })),
  setSortOrder: (sortOrder) =>
    set((store) => ({ houseQuery: { ...store.houseQuery, sortOrder } })),
  setMinPrice: (minPrice) =>
    set((store) => ({ houseQuery: { ...store.houseQuery, minPrice } })),
  setMaxPrice: (maxPrice) =>
    set((store) => ({ houseQuery: { ...store.houseQuery, maxPrice } })),
  setMinRating: (minRating) =>
    set((store) => ({ houseQuery: { ...store.houseQuery, minRating } })),
  setMaxRating: (maxRating) =>
    set((store) => ({ houseQuery: { ...store.houseQuery, maxRating } })),
}));

export default useHouseQuery;
