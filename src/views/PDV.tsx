import { D, B, M, sigColor } from '../styles/theme';
import { DupeBadge } from '../components/ui/DupeBadge';
import { MarketSignals } from '../components/ui/MarketSignals';
import { StudioPlate } from '../components/branding/StudioPlate';
import { useStore } from '../store/useStore';
import { Listing } from '../types';

export const PDV = ({ pdvPhoto, setPdvPhoto, LISTINGS }: { pdvPhoto: number, setPdvPhoto: (n: number) => void, LISTINGS: Listing[] }) => {
  const { activeProduct: l, setActiveProduct } = useStore();
  
  if (!l) return null;

  const similar = LISTINGS.filter(x => x.id !== l.id).slice(0, 4);
  return (
    <div style={{ background:"#fff" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 20px", position:"sticky", top:0, background:l.bg, zIndex:10 }}>
        <button onClick={() => setActiveProduct(null)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8, ...B, fontSize:12, fontWeight:500, letterSpacing:".08em", color:l.txt, padding:0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m15 18-6-6 6-6"/></svg>
          ARCHIVE
        </button>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={l.txt} strokeWidth="1.5" style={{ cursor:"pointer", opacity:.6 }}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </div>

      <div style={{ height:360, background:l.bg, position:"relative", overflow:"hidden" }}>
        <StudioPlate l={l} size="hero"/>
        <div style={{ position:"absolute", bottom:14, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6 }}>
          {[0,1,2,3].map(i => (
            <button key={i} onClick={e => { e.stopPropagation(); setPdvPhoto(i); }} style={{ width: i === pdvPhoto ? 18 : 5, height:5, background: i === pdvPhoto ? l.txt : `${l.txt}40`, border:"none", padding:0, cursor:"pointer", transition:"all .25s" }}/>
          ))}
        </div>
        <div style={{ position:"absolute", top:14, right:14, ...M, fontSize:9, color:l.txt, opacity:.5, letterSpacing:".06em" }}>{pdvPhoto + 1} / 4</div>
      </div>

      <div style={{ padding:"22px 20px 100px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
          <div style={{ ...B, fontSize:9, fontWeight:500, letterSpacing:".14em", color:"#999" }}>{l.brand.toUpperCase()}</div>
          <div style={{ ...M, fontSize:7, color: sigColor(l.sig), border:`1px solid ${sigColor(l.sig)}45`, padding:"2px 8px", letterSpacing:".1em" }}>{l.sig.toUpperCase()}</div>
        </div>
        <div style={{ ...D, fontSize:28, letterSpacing:".02em", lineHeight:1.1, color:"#111", marginBottom:12 }}>{l.item.toUpperCase()}</div>

        <div style={{ marginBottom:18 }}><DupeBadge matchScore={l.matchScore} dark={l.txt==="#fff"}/></div>

        <div style={{ paddingBottom:18, borderBottom:"1px solid #f0f0f0", marginBottom:20 }}>
          <div style={{ display:"flex", gap:10, alignItems:"baseline", marginBottom:10, flexWrap:"wrap" }}>
            <span style={{ ...D, fontSize:34, letterSpacing:".02em", color:"#111" }}>${l.price.toLocaleString()}</span>
            {l.wasPrice && (
              <>
                <span style={{ ...M, fontSize:12, color:"#bbb", textDecoration:"line-through" }}>${l.wasPrice.toLocaleString()}</span>
                <span style={{ ...M, fontSize:9, color:"#1f6320", letterSpacing:".06em", fontWeight:700 }}>-{Math.round((1 - l.price/l.wasPrice)*100)}%</span>
              </>
            )}
            <div style={{ flex:1 }}/>
            <span style={{ ...M, fontSize:9, color:"#666", background:"#f5f5f5", padding:"4px 10px", letterSpacing:".05em" }}>SZ {l.size}</span>
          </div>
          <MarketSignals l={l}/>
        </div>

        <div style={{ marginBottom:22, padding:"12px 14px", background:"#fafafa" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
            <span style={{ ...M, fontSize:8, letterSpacing:".12em", color:"#aaa" }}>PRICE HISTORY · 90D</span>
            <span style={{ ...M, fontSize:9, color:"#1f6320", fontWeight:700 }}>↓ 16.2%</span>
          </div>
          <svg width="100%" height="32" viewBox="0 0 300 32" preserveAspectRatio="none">
            <polyline points="0,10 30,8 60,14 90,12 120,18 150,15 180,22 210,20 240,25 270,24 300,28" stroke="#111" strokeWidth="1" fill="none"/>
            <polyline points="0,10 30,8 60,14 90,12 120,18 150,15 180,22 210,20 240,25 270,24 300,28 300,32 0,32" fill="#1115"/>
          </svg>
        </div>

        <div style={{ ...M, fontSize:8, letterSpacing:".13em", color:"#aaa", marginBottom:14 }}>TECHNICAL SPECIFICATIONS</div>
        {[["Material",l.material],["Fit",l.fit],["Lineage",l.lineage],["Season",l.year],["Condition Score",`${l.condScore} / 10`]].map(([k,v]) => (
          <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", paddingBottom:11, marginBottom:11, borderBottom:"1px solid #f5f5f5" }}>
            <span style={{ ...M, fontSize:9, color:"#c0c0c0", letterSpacing:".05em" }}>{k}</span>
            <span style={{ ...B, fontSize:12, fontWeight:500, color:"#111", textAlign:"right", maxWidth:"55%" }}>{v}</span>
          </div>
        ))}

        <div style={{ display:"flex", gap:16, padding:"6px 0 20px" }}>
          {["SIZE CHART","MEASUREMENTS","SHIPPING"].map(t => (
            <span key={t} style={{ ...M, fontSize:9, color:"#666", letterSpacing:".08em", borderBottom:"1px solid #666", paddingBottom:2, cursor:"pointer" }}>{t}</span>
          ))}
        </div>

        <div style={{ padding:"10px 14px", background:"#f8f8f8", marginBottom:18, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ ...M, fontSize:8, letterSpacing:".12em", color:"#aaa", marginBottom:3 }}>EST. DELIVERY</div>
            <div style={{ ...B, fontSize:11, fontWeight:500, color:"#111" }}>3–5 business days · $18 shipping</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        </div>

        <div style={{ padding:"14px 16px", background:"#f8f8f8", marginBottom:22 }}>
          <div style={{ ...M, fontSize:8, letterSpacing:".12em", color:"#aaa", marginBottom:10 }}>VERIFIED SELLER</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ ...M, fontSize:11, fontWeight:700, color:"#111", marginBottom:3 }}>{l.seller}</div>
              <div style={{ ...B, fontSize:11, color:"#888" }}>{l.sales} completed transactions</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ ...D, fontSize:20, color:"#111", letterSpacing:".03em" }}>★ {l.rating}</div>
              <div style={{ ...M, fontSize:7, color:"#bbb", letterSpacing:".1em" }}>SINCE 2023</div>
            </div>
          </div>
        </div>

        <button className="btn-s" style={{ marginBottom:10 }}>MAKE OFFER · {l.watchers} WATCHING</button>
        <button className="btn-p">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          SECURE CHECKOUT · ${l.price.toLocaleString()}
        </button>
        <div style={{ ...M, fontSize:7, color:"#ccc", letterSpacing:".1em", textAlign:"center", marginTop:14, marginBottom:26 }}>BUYER PROTECTION · ENCRYPTED · VERIFIED INDEX</div>

        <div style={{ margin:"0 -20px" }}>
          <div style={{ padding:"0 20px 12px", display:"flex", justifyContent:"space-between", alignItems:"baseline", borderTop:"1px solid #f0f0f0", paddingTop:22 }}>
            <span style={{ ...M, fontSize:9, color:"#111", letterSpacing:".18em", fontWeight:700 }}>SIMILAR IN THE ARCHIVE</span>
            <span style={{ ...M, fontSize:8, color:"#bbb", letterSpacing:".08em" }}>{similar.length}</span>
          </div>
          <div className="hscroll" style={{ padding:"0 20px 8px" }}>
            {similar.map(s => (
              <div key={s.id} onClick={() => setActiveProduct(s)} style={{ flexShrink:0, width:134, cursor:"pointer" }}>
                <div style={{ height:160, background:s.bg, position:"relative", overflow:"hidden", marginBottom:8 }}>
                  <StudioPlate l={s}/>
                </div>
                <div style={{ ...B, fontSize:8, fontWeight:500, letterSpacing:".12em", color:"#aaa", marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.brand.toUpperCase()}</div>
                <div style={{ ...B, fontSize:10, fontWeight:500, color:"#111", lineHeight:1.25, height:25, overflow:"hidden", marginBottom:4 }}>{s.item}</div>
                <div style={{ ...M, fontSize:10, color:"#111", fontWeight:700 }}>${s.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
