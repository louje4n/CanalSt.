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

-- Phase 4 Extensions
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    bio TEXT,
    avatar_initials TEXT,
    rating NUMERIC DEFAULT 5.0,
    sales INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.listings ADD COLUMN batch_supplier TEXT DEFAULT 'Unknown Batch';
ALTER TABLE public.listings ADD COLUMN seller_id UUID REFERENCES public.profiles(id);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Authenticated users can create listings." ON public.listings FOR INSERT WITH CHECK (auth.uid() = seller_id);
