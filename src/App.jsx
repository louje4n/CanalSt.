import { useState } from "react";
import { M } from './styles/theme';
import { LISTINGS, HERO, ROTATION, GRID } from './data/listings';

import { Archive } from './views/Archive';
import { Curator } from './views/Curator';
import { Sell } from './views/Sell';
import { Profile } from './views/Profile';
import { PDV } from './views/PDV';

export default function App() {
  const [tab, setTab] = useState("archive");
  const [pdv, setPdv] = useState(null);
  const [pdvPhoto, setPdvPhoto] = useState(0);
  const [query, setQuery] = useState("");
  const [lin, setLin] = useState([]);
  const [era, setEra] = useState([]);
  const [sizeF, setSizeF] = useState([]);
  const [priceMax, setPriceMax] = useState(5000);
  const [sellStep, setSellStep] = useState(0);

  const goTab = t => { setPdv(null); setSellStep(0); setTab(t); };
  const openPdv = l => { setPdv(l); setPdvPhoto(0); };
  const toggle = (arr, set, v) => set(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);

  const filtered = LISTINGS.filter(l =>
    (!query || [l.brand, l.item].some(s => s.toLowerCase().includes(query.toLowerCase()))) &&
    (!lin.length || lin.includes(l.sig)) &&
    (!era.length || era.includes(l.era)) &&
    (!sizeF.length || sizeF.includes(l.size)) &&
    l.price <= priceMax
  );

  const NAV = [
    { key:"archive", label:"ARCHIVE", svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg> },
    { key:"search",  label:"SEARCH",  svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
    { key:"sell",    label:"SELL",    svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
    { key:"profile", label:"PROFILE", svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px 16px" }}>
      <div style={{ width:393, height:852, background:"#fff", position:"relative", overflow:"hidden", borderRadius:52, boxShadow:"0 0 0 11px #1a1a1a, 0 0 0 13px #282828, 0 48px 120px rgba(0,0,0,.95)", flexShrink:0 }}>
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:124, height:34, background:"#0c0c0c", borderRadius:"0 0 22px 22px", zIndex:200 }}/>
        <div style={{ height:50, display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"0 28px 8px", position:"relative", zIndex:100, background:"#fff" }}>
          <span style={{ ...M, fontSize:13, fontWeight:700, letterSpacing:".02em", color:"#111" }}>9:41</span>
          <div style={{ display:"flex", gap:5, alignItems:"center" }}>
            <svg width="16" height="11" viewBox="0 0 16 11"><rect x="0" y="7" width="3" height="4" rx=".5" fill="#111"/><rect x="4.5" y="4.5" width="3" height="6.5" rx=".5" fill="#111"/><rect x="9" y="2" width="3" height="9" rx=".5" fill="#111"/><rect x="13.5" y="0" width="2.5" height="11" rx=".5" fill="#111"/></svg>
            <svg width="15" height="11" viewBox="0 0 15 11"><circle cx="7.5" cy="9.5" r="1.5" fill="#111"/><path d="M4.2 6.5a4.7 4.7 0 0 1 6.6 0" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M1 3.5a10 10 0 0 1 13 0" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12"><rect x=".5" y="1" width="21" height="10" rx="2.5" stroke="#111" strokeWidth="1" fill="none"/><rect x="1.5" y="2" width="18" height="8" rx="1.5" fill="#111"/><path d="M22.5 4.5v3a1.5 1.5 0 0 0 0-3z" fill="#111"/></svg>
          </div>
        </div>
        <div className="scroll" style={{ height:"calc(852px - 50px - 84px)", background:"#fff" }}>
          {pdv
            ? <PDV l={pdv} pdvPhoto={pdvPhoto} setPdvPhoto={setPdvPhoto} setPdv={setPdv} LISTINGS={LISTINGS} openPdv={openPdv} />
            : tab==="archive" ? <Archive openPdv={openPdv} HERO={HERO} ROTATION={ROTATION} GRID={GRID} />
            : tab==="search"  ? <Curator filtered={filtered} query={query} setQuery={setQuery} lin={lin} setLin={setLin} era={era} setEra={setEra} sizeF={sizeF} setSizeF={setSizeF} priceMax={priceMax} setPriceMax={setPriceMax} openPdv={openPdv} toggle={toggle} />
            : tab==="sell"    ? <Sell sellStep={sellStep} setSellStep={setSellStep} />
            : <Profile />
          }
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:84, background:"#fff", borderTop:"1px solid #f0f0f0", display:"flex", alignItems:"flex-start", paddingTop:12, zIndex:100 }}>
          {NAV.map(({ key, label, svg }) => {
            const active = tab===key && !pdv;
            return (
              <button key={key} onClick={() => goTab(key)}
                style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", padding:0, color: active ? "#111" : "#ccc", transition:"color .2s", position:"relative" }}>
                {svg}
                <span style={{ ...M, fontSize:7, letterSpacing:".1em" }}>{label}</span>
                {active && <div style={{ position:"absolute", bottom:-4, width:4, height:4, borderRadius:"50%", background:"#111" }}/>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
