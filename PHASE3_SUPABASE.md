# Phase 3: Supabase Backend Integration

## Objective
Migrate CanalSt. from static mock data to a live Supabase PostgreSQL database. We will establish the database client, define the schema, wire the frontend (via our Zustand store) to fetch real inventory, and clean up the old mock data.
**Constraint:** The brutalist aesthetic, exact hex colors, and component structures must remain 100% visually identical. Zero UI changes are permitted.

## Step 1: Client Setup & Dependencies
1. Install the Supabase client:
   `npm install @supabase/supabase-js`
2. Create an environment file `.env.local` at the root with placeholder variables:
   `VITE_SUPABASE_URL=YOUR_SUPABASE_URL`
   `VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY`
3. Create a new file `src/lib/supabase.ts` and initialize the standard Supabase client using the environment variables. Export the `supabase` instance.

## Step 2: Database Schema Definition
Create a new file at the root called `database/schema.sql`. Paste the following exact PostgreSQL script into it to create the `listings` table and enable initial Row Level Security (RLS). 

```sql
-- Create the listings table
CREATE TABLE public.listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand TEXT NOT NULL,
    item TEXT NOT NULL,
    price NUMERIC NOT NULL,
    was_price NUMERIC,
    size TEXT NOT NULL,
    condition TEXT NOT NULL,
    cond_score TEXT NOT NULL,
    sig TEXT NOT NULL,
    seller TEXT NOT NULL,
    rating NUMERIC NOT NULL,
    sales INTEGER NOT NULL,
    material TEXT NOT NULL,
    fit TEXT NOT NULL,
    lineage TEXT NOT NULL,
    year TEXT NOT NULL,
    era TEXT NOT NULL,
    bg TEXT NOT NULL,
    txt TEXT NOT NULL,
    accent TEXT NOT NULL,
    sil TEXT NOT NULL,
    auth BOOLEAN DEFAULT false,
    watchers INTEGER DEFAULT 0,
    hot BOOLEAN DEFAULT false,
    type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read active listings
CREATE POLICY "Enable read access for all users" ON public.listings
    FOR SELECT
    USING (true);
```

## Step 3: Global Data Fetching (Zustand)
Update `src/store/useStore.ts` to handle asynchronous data fetching:
1. Add `listings: Listing[]` and `isLoading: boolean` to the store state interface. Initialize `listings` to an empty array `[]` and `isLoading` to `true`.
2. Create an async action `fetchListings()` that queries the `listings` table from Supabase, ordering by `created_at` descending.
3. **CRITICAL Data Mapping:** The database uses `snake_case` (e.g., `was_price`, `cond_score`), but our TypeScript UI components expect `camelCase` (`wasPrice`, `condScore`). You MUST map these database fields back to camelCase inside `fetchListings()` before setting the `listings` state. Do not alter the `Listing` interface to match the database. Ensure `isLoading` is set to `false` in a `finally` block.

## Step 4: Application Wiring & Loading State
Refactor `src/App.tsx` to initiate the data pipeline:
1. Import `useEffect` and trigger `fetchListings()` on the initial component mount.
2. **Loading State:** While `isLoading` is true (pulled from the Zustand store), display a minimalist, brutalist loading state inside the main scroll view. Example: A simple pulsing "CONNECTING TO ARCHIVE..." text in the `Space Mono` font, vertically and horizontally centered. Do not render the `<Routes>` until `isLoading` is false.

## Step 5: View Integration & Mock Data Removal
Refactor `<Archive />` and `<Curator />` to use the live data:
1. Remove all import references to the static `src/data/listings.ts` file across the entire application.
2. Inside `src/views/Archive.tsx`, pull `listings` from the Zustand store. Derive the feed sections dynamically:
   - `HERO`: `listings[0]` (Ensure it safely falls back to `null` if the array is empty)
   - `ROTATION`: `listings.slice(1, 3)`
   - `GRID`: `listings.slice(3)`
3. Inside `src/views/Curator.tsx`, remove the `LISTINGS` prop. Pull `listings` directly from the Zustand store and apply the existing filtering logic to it.

## Step 6: Verification Checklist for AI Agent
Before reporting completion, verify the following:
- [ ] `src/lib/supabase.ts` exports a valid client.
- [ ] `useStore.ts` successfully maps `snake_case` database rows to the `camelCase` TypeScript `Listing` interface.
- [ ] Static data imports have been completely removed from all files.
- [ ] The application correctly handles an empty `listings` array without crashing (e.g., if the database has zero rows).
- [ ] The application compiles with zero TypeScript errors.