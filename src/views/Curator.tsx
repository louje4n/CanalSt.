import { D, B, M } from '../styles/theme';
import { StudioPlate } from '../components/branding/StudioPlate';
import { useStore } from '../store/useStore';
import { LISTINGS } from '../data/listings';

const LINS = ["Technical","Archival","Deconstruct","Minimalist","Avant-Garde"];
const ERAS = ["90s","00s","10s","20s"];
const SIZES = ["S","M","L","32","46","3"];

export const Curator = () => {
  const { searchQuery, setSearchQuery, activeFilters, setActiveFilters, setActiveProduct } = useStore();
  const { lineage: lin, era, size: sizeF, maxPrice: priceMax } = activeFilters;

  const toggle = (category: 'lineage' | 'era' | 'size', v: string) => {
    const list = activeFilters[category];
    const newList = list.includes(v) ? list.filter(x => x !== v) : [...list, v];
    setActiveFilters({ ...activeFilters, [category]: newList });
  };

  const filtered = LISTINGS.filter(l =>
    (!searchQuery || [l.brand, l.item].some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (!lin.length || lin.includes(l.sig)) &&
    (!era.length || era.includes(l.era)) &&
    (!sizeF.length || sizeF.includes(l.size)) &&
    l.price <= priceMax
  );

  return (
    <div>
      <div style={{ padding:"20px 20px 0", borderBottom:"1px solid #f0f0f0", position:"sticky", top:0, background:"#fff", zIndex:10 }}>
        <div style={{ ...D, fontSize:28, letterSpacing:".03em", marginBottom:16, color:"#111" }}>CURATOR</div>
        <div style={{ display:"flex", alignItems:"center", gap:12, borderBottom:"2px solid #111", paddingBottom:10, marginBottom:18 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input placeholder="Brand, lineage, reference…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex:1 }}/>
          {searchQuery && <button onClick={() => setSearchQuery("")} style={{ background:"none", border:"none", cursor:"pointer", ...M, fontSize:10, color:"#bbb" }}>✕</button>}
        </div>
        <div style={{ paddingBottom:14 }}>
          <div style={{ ...M, fontSize:8, letterSpacing:".12em", color:"#aaa", marginBottom:9 }}>AESTHETIC LINEAGE</div>
          <div className="hscroll" style={{ paddingBottom:10, marginBottom:12 }}>
            {LINS.map(v => <button key={v} className={`chip${lin.includes(v)?" on":""}`} onClick={() => toggle('lineage', v)}>{v}</button>)}
          </div>
          <div style={{ marginBottom:12 }}>
            <div style={{ ...M, fontSize:8, letterSpacing:".12em", color:"#aaa", marginBottom:9 }}>ERA</div>
            <div className="hscroll">
              {ERAS.map(v => <button key={v} className={`chip${era.includes(v)?" on":""}`} onClick={() => toggle('era', v)}>{v}</button>)}
            </div>
          </div>
          <div style={{ marginBottom:12 }}>
            <div style={{ ...M, fontSize:8, letterSpacing:".12em", color:"#aaa", marginBottom:9 }}>SIZE</div>
            <div className="hscroll">
              {SIZES.map(v => <button key={v} className={`chip${sizeF.includes(v)?" on":""}`} onClick={() => toggle('size', v)}>{v}</button>)}
            </div>
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <span style={{ ...M, fontSize:8, letterSpacing:".12em", color:"#aaa" }}>MAX PRICE</span>
              <span style={{ ...M, fontSize:10, color:"#111", fontWeight:700 }}>${priceMax.toLocaleString()}</span>
            </div>
            <input type="range" min="100" max="5000" step="100" value={priceMax} onChange={e => setActiveFilters({ ...activeFilters, maxPrice: +e.target.value })} style={{ width:"100%", accentColor:"#111" }}/>
          </div>
        </div>
      </div>
      <div style={{ padding:"12px 20px 6px", display:"flex", justifyContent:"space-between" }}>
        <span style={{ ...M, fontSize:9, color:"#aaa", letterSpacing:".1em" }}>{filtered.length} RESULT{filtered.length !== 1 ? "S" : ""}</span>
        <span style={{ ...M, fontSize:9, color:"#aaa", letterSpacing:".08em", cursor:"pointer" }}>SORT: PRICE ↓</span>
      </div>
      {filtered.map(l => (
        <div key={l.id} onClick={() => setActiveProduct(l)} className="row-hover"
          style={{ display:"flex", gap:14, padding:"14px 20px", borderBottom:"1px solid #f5f5f5", cursor:"pointer", alignItems:"center" }}>
          <div style={{ width:52, height:52, background:l.bg, flexShrink:0, position:"relative", overflow:"hidden" }}>
            <StudioPlate l={l}/>
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ ...B, fontSize:9, fontWeight:500, letterSpacing:".12em", color:"#aaa", marginBottom:2 }}>{l.brand.toUpperCase()}</div>
            <div style={{ ...B, fontSize:13, fontWeight:500, color:"#111", marginBottom:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l.item}</div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <span style={{ ...M, fontSize:10, color:"#555" }}>${l.price.toLocaleString()}</span>
              <span style={{ color:"#e0e0e0" }}>·</span>
              <span style={{ ...M, fontSize:10, color:"#555" }}>SZ {l.size}</span>
              <span style={{ color:"#e0e0e0" }}>·</span>
              <span style={{ ...M, fontSize:9, color:"#555" }}>{l.watchers} watching</span>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      ))}
      {!filtered.length && (
        <div style={{ padding:"60px 20px", textAlign:"center" }}>
          <div style={{ ...M, fontSize:10, color:"#ccc", letterSpacing:".1em" }}>NO RESULTS FOUND</div>
        </div>
      )}
      <div style={{ height:22 }}/>
    </div>
  );
};
