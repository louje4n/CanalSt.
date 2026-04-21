export interface Listing {
  id: number | string;
  brand: string;
  item: string;
  price: number;
  wasPrice?: number;
  size: string;
  condition: string;
  condScore: string;
  sig: string;
  seller: string;
  rating: number;
  sales: number;
  material: string;
  fit: string;
  lineage: string;
  year: string;
  era: string;
  bg: string;
  txt: string;
  accent: string;
  sil: 'jacket' | 'puffer' | 'blazer' | 'trouser' | 'cargo' | 'draped';
  matchScore: number;
  watchers: number;
  hot: boolean;
  type: string;
}
