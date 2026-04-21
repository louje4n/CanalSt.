import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the environment variables explicitly from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
  console.error("ERROR: Missing or placeholder Supabase credentials in .env.local.");
  console.error("Please place your actual Supabase URL and Anon Key in .env.local.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LISTINGS = [
  { brand:"Stone Island Shadow Project", item:"Tela Stella TC Membrana 3L Jacket", price:1240, was_price:1480, size:"L", condition:"Excellent", cond_score:"8.5", sig:"Technical", seller:"ARCHV_01", rating:4.9, sales:47, material:"Tela Stella TC 3L Membrana", fit:"Regular Drop Shoulder", lineage:"Stone Island / C.P. Company", year:"SS19", era:"10s", bg:"#131313", txt:"#fff", accent:"#1d1d1d", sil:"jacket", auth:true, watchers:47, hot:true, type:"jacket" },
  { brand:"Yohji Yamamoto", item:"Wool Gabardine Draped Trousers", price:680, was_price:null, size:"3", condition:"Archive", cond_score:"9.0", sig:"Archival", seller:"YMMT_0394", rating:5.0, sales:12, material:"100% Wool Gabardine", fit:"Draped Relaxed", lineage:"Yohji Yamamoto Pour Homme", year:"AW03", era:"00s", bg:"#eae6de", txt:"#0c0c0c", accent:"#ddd8cd", sil:"draped", auth:true, watchers:82, hot:true, type:"trouser" },
  { brand:"Raf Simons", item:"Sterling Ruby Collaboration Puffer", price:3400, was_price:null, size:"46", condition:"Pristine", cond_score:"9.5", sig:"Archival", seller:"RS_COL", rating:4.8, sales:31, material:"Nylon Shell / Down Fill", fit:"Oversized Cocoon", lineage:"Raf Simons × Sterling Ruby", year:"AW14", era:"10s", bg:"#1a0f09", txt:"#fff", accent:"#2a1912", sil:"puffer", auth:true, watchers:143, hot:true, type:"puffer" },
  { brand:"Helmut Lang", item:"Bondage Parachute Cargo Trousers", price:920, was_price:null, size:"32", condition:"Very Good", cond_score:"7.5", sig:"Deconstruct", seller:"HLMT_ARCH", rating:4.7, sales:88, material:"Nylon Ripstop", fit:"Slim Utility", lineage:"Helmut Lang Archive", year:"SS99", era:"90s", bg:"#dfd8cc", txt:"#111", accent:"#cfc6b7", sil:"cargo", auth:false, watchers:29, hot:false, type:"cargo" },
  { brand:"Issey Miyake", item:"Homme Plissé Technical Blazer", price:560, was_price:null, size:"3", condition:"Excellent", cond_score:"8.0", sig:"Minimalist", seller:"PLISSE_01", rating:5.0, sales:19, material:"Polyester Pleated Weave", fit:"Structured Relaxed", lineage:"Issey Miyake Homme Plissé", year:"SS22", era:"20s", bg:"#1c2a3e", txt:"#fff", accent:"#273651", sil:"blazer", auth:true, watchers:18, hot:false, type:"blazer" },
  { brand:"Comme des Garçons", item:"Lumps & Bumps Padded Jacket", price:2100, was_price:null, size:"S", condition:"Archive", cond_score:"8.0", sig:"Deconstruct", seller:"CDG_ARCH", rating:4.9, sales:55, material:"Wool / Structured Padding", fit:"Deconstructed Volume", lineage:"Comme des Garçons HOMME PLUS", year:"SS97", era:"90s", bg:"#f2ede2", txt:"#111", accent:"#e6dfd1", sil:"jacket", auth:true, watchers:201, hot:true, type:"jacket" }
];

async function seed() {
  console.log("== Initiating Data Sequence ==");
  const { data, error } = await supabase.from('listings').insert(LISTINGS).select();
  if (error) {
    console.error("== Fatal Error Encountered ==");
    console.error(error);
  } else {
    console.log(`== SUCCESS: Inserted ${data.length} listing artifacts. ==`);
  }
}

seed();
