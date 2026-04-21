import { create } from 'zustand';
import { Listing } from '../types';

interface ActiveFilters {
  lineage: string[];
  era: string[];
  size: string[];
  maxPrice: number;
}

interface StoreState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilters: ActiveFilters;
  setActiveFilters: (filters: ActiveFilters | ((prev: ActiveFilters) => ActiveFilters)) => void;
  activeProduct: Listing | null;
  setActiveProduct: (product: Listing | null) => void;
  showIndexInfo: boolean;
  setShowIndexInfo: (v: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  activeFilters: { lineage: [], era: [], size: [], maxPrice: 5000 },
  setActiveFilters: (filters) => set((state) => ({ 
    activeFilters: typeof filters === 'function' ? filters(state.activeFilters) : filters 
  })),
  activeProduct: null,
  setActiveProduct: (product) => set({ activeProduct: product }),
  showIndexInfo: false,
  setShowIndexInfo: (v) => set({ showIndexInfo: v }),
}));
