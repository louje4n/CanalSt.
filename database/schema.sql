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
