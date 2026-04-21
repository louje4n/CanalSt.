import { create } from 'zustand';
import { Listing } from '../types';
import { supabase } from '../lib/supabase';

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
  listings: Listing[];
  isLoading: boolean;
  fetchListings: () => Promise<void>;
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
  listings: [],
  isLoading: true,
  fetchListings: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const mappedListings = (data || []).map((row: any) => ({
        id: row.id,
        brand: row.brand,
        item: row.item,
        price: row.price,
        wasPrice: row.was_price,
        size: row.size,
        condition: row.condition,
        condScore: row.cond_score,
        sig: row.sig,
        seller: row.seller,
        rating: row.rating,
        sales: row.sales,
        material: row.material,
        fit: row.fit,
        lineage: row.lineage,
        year: row.year,
        era: row.era,
        bg: row.bg,
        txt: row.txt,
        accent: row.accent,
        sil: row.sil,
        matchScore: row.matchScore ?? (row.auth ? 98 : 88),
        watchers: row.watchers,
        hot: row.hot,
        type: row.type
      }));
      set({ listings: mappedListings });
    } catch (err) {
      console.error("Error fetching listings:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
