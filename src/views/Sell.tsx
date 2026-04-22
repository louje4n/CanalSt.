import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { D, B, M } from '../styles/theme';

export const Sell = () => {
  const { session } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    brand: '', item: '', price: '', size: '', fit: '', condition: '', lineage: '', batchSupplier: ''
  });

  const CATEGORY_FITS: Record<string, string[]> = {
    'Jackets & Coats':   ['Oversized', 'Regular', 'Slim', 'Cropped', 'Boxy', 'Relaxed'],
    'Blazers':           ['Oversized', 'Regular', 'Slim', 'Relaxed', 'Boxy'],
    'Hoodies & Sweats':  ['Oversized', 'Regular', 'Slim', 'Cropped', 'Boxy', 'Relaxed'],
    'Knitwear':          ['Oversized', 'Regular', 'Slim', 'Cropped', 'Relaxed'],
    'Shirts':            ['Oversized', 'Regular', 'Slim', 'Cropped', 'Boxy', 'Relaxed'],
    'T-Shirts':          ['Oversized', 'Regular', 'Slim', 'Cropped', 'Boxy', 'Relaxed'],
    'Polos':             ['Regular', 'Slim', 'Oversized', 'Relaxed'],
    'Vests & Tanks':     ['Oversized', 'Regular', 'Slim', 'Cropped'],
    'Jeans':             ['Straight', 'Slim', 'Skinny', 'Relaxed', 'Wide Leg', 'Bootcut', 'Tapered', 'Baggy'],
    'Trousers':          ['Straight', 'Slim', 'Wide Leg', 'Tapered', 'Relaxed', 'Cropped', 'Regular'],
    'Shorts':            ['Regular', 'Slim', 'Relaxed', 'Wide Leg', 'Boxy'],
    'Cargos':            ['Straight', 'Relaxed', 'Wide Leg', 'Tapered', 'Slim', 'Baggy'],
    'Dresses':           ['Oversized', 'Regular', 'Slim', 'A-Line', 'Relaxed'],
    'Skirts':            ['Regular', 'A-Line', 'Slim', 'Relaxed'],
    'Footwear':          ['True to Size', 'Runs Small', 'Runs Large'],
    'Accessories':       ['One Size'],
    'Bags':              ['One Size'],
  };

  const CATEGORIES = Object.keys(CATEGORY_FITS);
  const fitOptions = category ? CATEGORY_FITS[category] || [] : [];

  const selectStyle: React.CSSProperties = { width:"100%", padding:"10px 12px", border:"1px solid #ddd", background:"#f5f5f5", ...M, fontSize:11, appearance:"none" as const, cursor:"pointer" };

  if (!session) {
    return (
      <div style={{ padding:"60px 20px", textAlign:"center" }}>
        <div style={{ ...D, fontSize:28, letterSpacing:".03em", color:"#111", marginBottom:12 }}>RESTRICTED ACCESS</div>
        <div style={{ ...B, fontSize:12, color:"#888", marginBottom:24 }}>You must be authenticated to index an item on the archive.</div>
        <button className="btn-p" onClick={() => navigate('/profile')}>GO TO AUTHENTICATION</button>
      </div>
    );
  }

  const handleList = async () => {
    setLoading(true);

    // Upload all images and collect public URLs
    const imageUrls: string[] = [];
    for (const file of imageFiles) {
      const ext = file.name.split('.').pop();
      const path = `${session!.user.id}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from('listing-images').upload(path, file);
      if (!upErr) {
        const { data } = supabase.storage.from('listing-images').getPublicUrl(path);
        imageUrls.push(data.publicUrl);
      }
    }
    const typeMap: Record<string, string> = {
      'Jackets & Coats': 'jacket', 'Blazers': 'blazer', 'Hoodies & Sweats': 'hoodie',
      'Knitwear': 'knitwear', 'Shirts': 'shirt', 'T-Shirts': 'tshirt', 'Polos': 'polo',
      'Vests & Tanks': 'vest', 'Jeans': 'jeans', 'Trousers': 'trousers', 'Shorts': 'shorts',
      'Cargos': 'cargos', 'Dresses': 'dress', 'Skirts': 'skirt', 'Footwear': 'footwear',
      'Accessories': 'accessory', 'Bags': 'bag',
    };
    const silMap: Record<string, string> = {
      'Jackets & Coats': 'jacket', 'Blazers': 'jacket', 'Hoodies & Sweats': 'hoodie',
      'Knitwear': 'sweater', 'Shirts': 'shirt', 'T-Shirts': 'tshirt', 'Polos': 'shirt',
      'Vests & Tanks': 'vest', 'Jeans': 'trousers', 'Trousers': 'trousers', 'Shorts': 'shorts',
      'Cargos': 'trousers', 'Dresses': 'dress', 'Skirts': 'skirt', 'Footwear': 'shoe',
      'Accessories': 'accessory', 'Bags': 'bag',
    };

    const { error } = await supabase.from('listings').insert({
      brand: formData.brand,
      item: formData.item,
      price: Number(formData.price),
      size: formData.size,
      fit: formData.fit,
      condition: formData.condition,
      lineage: formData.lineage,
      batch_supplier: formData.batchSupplier,
      seller_id: session.user.id,
      matchScore: 92,
      auth: false,
      seller: session.user.email?.split('@')[0].toUpperCase(),
      images: imageUrls,
      type: typeMap[category] || 'other',
      sil: silMap[category] || 'other',
      bg: '#f5f5f5', txt: '#111', accent: '#ddd'
    });

    setLoading(false);
    if (error) alert("Error: " + error.message);
    else {
      alert("Successfully Indexed!");
      navigate('/');
    }
  };

  const Input = ({ label, field }: { label: string, field: keyof typeof formData }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ ...B, display:"block", fontSize:10, marginBottom:4, color:"#111" }}>{label}</label>
      <input 
        style={{ width:"100%", padding:"10px 12px", border:"1px solid #ddd", background:"#f5f5f5", ...M, fontSize:11 }}
        value={formData[field]} onChange={e => setFormData({...formData, [field]: e.target.value})}
      />
    </div>
  );

  return (
    <div style={{ padding:"22px 20px 100px" }}>
      <div style={{ ...D, fontSize:28, letterSpacing:".03em", color:"#111", marginBottom:4 }}>LIST AN ITEM</div>
      <div style={{ ...M, fontSize:9, color:"#aaa", letterSpacing:".1em", marginBottom:24 }}>MANUAL INDEX ENTRY</div>

      <div style={{ ...M, fontSize:8, letterSpacing:".12em", color:"#aaa", marginBottom:9 }}>PHOTOGRAPHS · MAX 9</div>
      <input
        id="img-upload"
        type="file"
        accept="image/*"
        multiple
        style={{ display:"none" }}
        onChange={e => {
          const incoming = Array.from(e.target.files || []);
          setImageFiles(prev => {
            const combined = [...prev, ...incoming];
            return combined.slice(0, 9);
          });
          e.target.value = '';
        }}
      />
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:6, marginBottom:24 }}>
        {imageFiles.map((f, i) => (
          <div key={i} style={{ aspectRatio:"1/1", position:"relative", overflow:"hidden", border:"1px solid #ddd" }}>
            <img src={URL.createObjectURL(f)} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            <div
              onClick={() => setImageFiles(prev => prev.filter((_, j) => j !== i))}
              style={{ position:"absolute", top:4, right:4, width:18, height:18, background:"rgba(0,0,0,.65)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}
            >
              <span style={{ color:"#fff", fontSize:10, lineHeight:1 }}>✕</span>
            </div>
            {i === 0 && <span style={{ position:"absolute", bottom:3, left:3, ...M, fontSize:6, color:"#fff", background:"#111", padding:"2px 5px", letterSpacing:".1em" }}>PRIMARY</span>}
          </div>
        ))}
        {imageFiles.length < 9 && (
          <div
            onClick={() => document.getElementById('img-upload')?.click()}
            style={{ aspectRatio:"1/1", border:"1px dashed #ccc", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", gap:4 }}
          >
            <span style={{ ...M, fontSize:20, color:"#ccc" }}>+</span>
            <span style={{ ...M, fontSize:7, color:"#bbb", letterSpacing:".08em" }}>{imageFiles.length}/9</span>
          </div>
        )}
      </div>

      <Input label="BRAND" field="brand" />
      <Input label="ITEM NAME" field="item" />
      <Input label="PRICE (USD)" field="price" />

      <div style={{ marginBottom: 14 }}>
        <label style={{ ...B, display:"block", fontSize:10, marginBottom:4, color:"#111" }}>CATEGORY</label>
        <select style={selectStyle} value={category} onChange={e => { setCategory(e.target.value); setFormData({...formData, fit: ''}); }}>
          <option value="">SELECT CATEGORY</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <Input label="SIZE" field="size" />

      <div style={{ marginBottom: 14 }}>
        <label style={{ ...B, display:"block", fontSize:10, marginBottom:4, color:"#111" }}>FIT</label>
        <select style={{ ...selectStyle, opacity: category ? 1 : 0.4 }} value={formData.fit} onChange={e => setFormData({...formData, fit: e.target.value})} disabled={!category}>
          <option value="">{category ? 'SELECT FIT' : 'SELECT CATEGORY FIRST'}</option>
          {fitOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <Input label="CONDITION (e.g., Pristine, Archive)" field="condition" />
      <Input label="LINEAGE / AESTHETIC" field="lineage" />
      
      <div style={{ marginBottom: 24, padding: "12px", border: "1px solid #111", background:"#fafafa" }}>
        <label style={{ ...B, display:"block", fontSize:10, marginBottom:4, color:"#111" }}>BATCH / SUPPLIER (e.g., MVT, PK, LJR)</label>
        <div style={{ ...M, fontSize:8, color:"#888", letterSpacing:".05em", marginBottom:10 }}>Required for Visual Proximity indexing.</div>
        <input 
          style={{ width:"100%", padding:"10px 12px", border:"1px solid #111", background:"#fff", ...M, fontSize:11 }}
          value={formData.batchSupplier} onChange={e => setFormData({...formData, batchSupplier: e.target.value})}
        />
      </div>

      <button className="btn-p" onClick={handleList} disabled={loading}>{loading ? "INDEXING..." : "SUBMIT LISTING"}</button>
    </div>
  );
};
