import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { D, B, M } from '../styles/theme';

export const Sell = () => {
  const { session } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brand: '', item: '', price: '', size: '', condition: '', lineage: '', batchSupplier: ''
  });

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
    const { error } = await supabase.from('listings').insert({
      brand: formData.brand,
      item: formData.item,
      price: Number(formData.price),
      size: formData.size,
      condition: formData.condition,
      lineage: formData.lineage,
      batch_supplier: formData.batchSupplier,
      seller_id: session.user.id,
      matchScore: 92,
      auth: false,
      seller: session.user.email?.split('@')[0].toUpperCase(),
      sil: 'jacket', type: 'jacket', bg: '#f5f5f5', txt: '#111', accent: '#ddd'
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

      <div style={{ ...M, fontSize:8, letterSpacing:".12em", color:"#aaa", marginBottom:9 }}>PHOTOGRAPHS · REQUIRED</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:6, marginBottom:24 }}>
        {[0,1,2,3].map(i => {
          const primary = i === 0;
          return (
            <div key={i} style={{ aspectRatio:"1/1.2", border: primary ? "1px solid #111" : "1px dashed #d4d4d4", display:"flex", alignItems:"center", justifyContent:"center", background: "transparent", position:"relative", cursor: "pointer" }}>
              <span style={{ ...M, fontSize:16, color:"#d0d0d0" }}>+</span>
              {primary && <span style={{ position:"absolute", bottom:3, ...M, fontSize:6, color:"#111", letterSpacing:".12em", fontWeight:700 }}>PRIMARY</span>}
            </div>
          );
        })}
      </div>

      <Input label="BRAND" field="brand" />
      <Input label="ITEM NAME" field="item" />
      <Input label="PRICE (USD)" field="price" />
      <Input label="SIZE" field="size" />
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
