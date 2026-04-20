import { D, B, M } from '../styles/theme';
import { AuthBadge } from '../components/ui/AuthBadge';
import { MarketSignals } from '../components/ui/MarketSignals';
import { StudioPlate } from '../components/branding/StudioPlate';

export const Archive = ({ openPdv, HERO, ROTATION, GRID }) => (
  <div>
    <div style={{ padding:"20px 20px 13px", position:"sticky", top:0, background:"#fff", zIndex:10, borderBottom:"1px solid #f0f0f0" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div style={{ ...D, fontSize:44, lineHeight:1, letterSpacing:".02em", color:"#111" }}>CANAL ST.</div>
        <div style={{ display:"flex", flexDirection:"column", gap:5, paddingTop:10 }}>
          <div style={{ width:22, height:1, background:"#111" }}/><div style={{ width:14, height:1, background:"#111" }}/>
        </div>
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", marginTop:10 }}>
        <span style={{ ...M, fontSize:9, color:"#aaa", letterSpacing:".1em" }}>ISSUE 047 / APR 2026</span>
        <span style={{ ...M, fontSize:9, color:"#aaa", letterSpacing:".08em" }}>ALL AUTHENTICATED ✓</span>
      </div>
    </div>

    <div className="fu" onClick={() => openPdv(HERO)} style={{ cursor:"pointer", borderBottom:"1px solid #f0f0f0" }}>
      <div style={{ padding:"26px 20px 10px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
          <span style={{ ...M, fontSize:9, color:"#111", letterSpacing:".18em", fontWeight:700 }}>THIS WEEK IN THE ARCHIVE</span>
          <span style={{ ...M, fontSize:8, color:"#c0c0c0", letterSpacing:".1em" }}>Nº 047</span>
        </div>
        <div style={{ height:1, background:"#111", width:"100%" }}/>
      </div>
      <div style={{ height:380, background:HERO.bg, position:"relative", overflow:"hidden" }}>
        <StudioPlate l={HERO} size="hero"/>
        <div style={{ position:"absolute", top:16, left:16 }}>
          <AuthBadge dark/>
        </div>
        <div style={{ position:"absolute", top:16, right:16 }}>
          <span style={{ ...M, fontSize:9, color:HERO.txt, opacity:.55, letterSpacing:".08em" }}>{HERO.year}</span>
        </div>
        <div style={{ position:"absolute", bottom:20, left:20, right:20 }}>
          <div style={{ ...B, fontSize:9, fontWeight:500, letterSpacing:".14em", color:HERO.txt, opacity:.7, marginBottom:6 }}>{HERO.brand.toUpperCase()}</div>
          <div style={{ ...D, fontSize:26, letterSpacing:".02em", lineHeight:1.1, color:HERO.txt, marginBottom:12 }}>{HERO.item.toUpperCase()}</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ ...D, fontSize:22, color:HERO.txt, letterSpacing:".03em" }}>${HERO.price.toLocaleString()}</span>
            <MarketSignals l={HERO} inv/>
          </div>
        </div>
      </div>
    </div>

    <div style={{ padding:"22px 20px 12px", display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
      <span style={{ ...M, fontSize:9, color:"#111", letterSpacing:".18em", fontWeight:700 }}>CURRENT ROTATION</span>
      <span style={{ ...M, fontSize:9, color:"#bbb", letterSpacing:".08em" }}>02</span>
    </div>
    {ROTATION.map((l, i) => (
      <div key={l.id} onClick={() => openPdv(l)} className="fu" style={{ borderBottom:"1px solid #f0f0f0", cursor:"pointer", animationDelay:`${i*.065}s` }}>
        <div style={{ height:260, background:l.bg, position:"relative", overflow:"hidden" }}>
          <StudioPlate l={l}/>
          <div style={{ position:"absolute", top:14, left:14 }}>
            <span style={{ ...M, fontSize:8, color:l.txt, letterSpacing:".12em", border:`1px solid ${l.txt}28`, padding:"3px 9px", opacity:.85 }}>{l.sig.toUpperCase()}</span>
          </div>
          <div style={{ position:"absolute", top:14, right:14 }}>
            <span style={{ ...M, fontSize:9, color:l.txt, opacity:.45, letterSpacing:".06em" }}>{l.year}</span>
          </div>
          <div style={{ position:"absolute", bottom:14, left:14 }}>
            <AuthBadge dark={l.txt === "#fff"} small/>
          </div>
        </div>
        <div style={{ padding:"15px 20px 18px", background:"#fff" }}>
          <div style={{ ...B, fontSize:9, fontWeight:500, letterSpacing:".14em", color:"#999", marginBottom:5 }}>{l.brand.toUpperCase()}</div>
          <div style={{ ...B, fontSize:14, fontWeight:500, color:"#111", marginBottom:11, lineHeight:1.3 }}>{l.item}</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
              <span style={{ ...D, fontSize:24, letterSpacing:".02em", color:"#111" }}>${l.price.toLocaleString()}</span>
              {l.wasPrice && <span style={{ ...M, fontSize:10, color:"#bbb", textDecoration:"line-through" }}>${l.wasPrice.toLocaleString()}</span>}
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <span style={{ ...M, fontSize:9, color:"#666", background:"#f5f5f5", padding:"3px 8px", letterSpacing:".05em" }}>SZ {l.size}</span>
              <span style={{ ...M, fontSize:9, color:"#666", background:"#f5f5f5", padding:"3px 8px", letterSpacing:".05em" }}>{l.condition.toUpperCase()}</span>
            </div>
          </div>
          <MarketSignals l={l}/>
        </div>
      </div>
    ))}

    <div style={{ padding:"22px 20px 12px", display:"flex", justifyContent:"space-between", alignItems:"baseline" }}>
      <span style={{ ...M, fontSize:9, color:"#111", letterSpacing:".18em", fontWeight:700 }}>RECENT ADDITIONS</span>
      <span style={{ ...M, fontSize:9, color:"#bbb", letterSpacing:".08em" }}>VIEW ALL →</span>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"#f0f0f0", borderTop:"1px solid #f0f0f0", borderBottom:"1px solid #f0f0f0" }}>
      {GRID.map((l, i) => (
        <div key={`g${i}`} onClick={() => openPdv(l)} className="fu" style={{ background:"#fff", cursor:"pointer", animationDelay:`${i*.05}s` }}>
          <div style={{ height:172, background:l.bg, position:"relative", overflow:"hidden" }}>
            <StudioPlate l={l}/>
            {l.hot && (
              <div style={{ position:"absolute", top:8, right:8, display:"flex", alignItems:"center", gap:3, background:"rgba(0,0,0,.6)", padding:"2px 5px" }}>
                <span className="hot-dot"/>
                <span style={{ ...M, fontSize:7, color:"#fff", letterSpacing:".08em", fontWeight:700 }}>HOT</span>
              </div>
            )}
          </div>
          <div style={{ padding:"11px 12px 14px" }}>
            <div style={{ ...B, fontSize:8, fontWeight:500, letterSpacing:".13em", color:"#aaa", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{l.brand.toUpperCase()}</div>
            <div style={{ ...B, fontSize:11, fontWeight:500, color:"#111", marginBottom:7, lineHeight:1.25, height:27, overflow:"hidden" }}>{l.item}</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ ...D, fontSize:16, letterSpacing:".02em", color:"#111" }}>${l.price.toLocaleString()}</span>
              <span style={{ ...M, fontSize:8, color:"#999" }}>SZ {l.size}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div style={{ padding:"26px 20px", textAlign:"center" }}>
      <span style={{ ...M, fontSize:8, color:"#ccc", letterSpacing:".15em" }}>── END OF ISSUE 047 ──</span>
    </div>
  </div>
);
