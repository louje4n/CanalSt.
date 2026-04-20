import { D, B, M } from '../styles/theme';

const RESULT = [["Brand Detected","Helmut Lang"],["Category","Trousers / Cargo"],["Condition","Very Good"],["Suggested Price","$380 – $520"],["Aesthetic Signature","Deconstruct"],["Est. Market Demand","Medium-High"],["Confidence","94.2%"]];

export const Sell = ({ sellStep, setSellStep }) => {
  const analyze = () => { setSellStep(1); setTimeout(() => setSellStep(2), 3400); };
  return (
    <div style={{ padding:"22px 20px 100px" }}>
      <div style={{ ...D, fontSize:28, letterSpacing:".03em", color:"#111", marginBottom:4 }}>LIST AN ITEM</div>
      <div style={{ ...M, fontSize:9, color:"#aaa", letterSpacing:".1em", marginBottom:24 }}>AI-ASSISTED LISTING CREATION</div>

      <div style={{ ...M, fontSize:8, letterSpacing:".12em", color:"#aaa", marginBottom:9 }}>PHOTOGRAPHS · REQUIRED</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:6, marginBottom:18 }}>
        {[0,1,2,3].map(i => {
          const filled = sellStep >= 1;
          const primary = i === 0;
          return (
            <div key={i} style={{ aspectRatio:"1/1.2", border: primary ? "1px solid #111" : "1px dashed #d4d4d4", display:"flex", alignItems:"center", justifyContent:"center", background: filled ? "#f5f5f5" : "transparent", position:"relative", cursor: filled ? "default" : "pointer" }}>
              {filled ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <span style={{ ...M, fontSize:16, color:"#d0d0d0" }}>+</span>
              )}
              {primary && !filled && <span style={{ position:"absolute", bottom:3, ...M, fontSize:6, color:"#111", letterSpacing:".12em", fontWeight:700 }}>PRIMARY</span>}
            </div>
          );
        })}
      </div>

      {sellStep < 2 ? <>
        <button className="btn-p" onClick={analyze} disabled={sellStep === 1}>
          <span>{sellStep === 1 ? "ANALYZING…" : "AI AUTO-LIST"}</span>
          {!sellStep && <span style={{ ...M, fontSize:7, color:"rgba(255,255,255,.4)", border:"1px solid rgba(255,255,255,.18)", padding:"2px 7px", letterSpacing:".1em" }}>CLAUDE</span>}
        </button>
        {sellStep === 1 && (
          <div style={{ marginTop:18, textAlign:"center" }}>
            <div style={{ width:22, height:22, border:"1.5px solid #111", borderTopColor:"transparent", borderRadius:"50%", animation:"spin .9s linear infinite", margin:"0 auto 10px" }}/>
            <div style={{ ...M, fontSize:9, color:"#111", letterSpacing:".12em", animation:"pulse 1.5s infinite", marginBottom:4 }}>ANALYZING GARMENT</div>
            <div style={{ ...B, fontSize:11, color:"#bbb" }}>Identifying brand, lineage, and market demand</div>
          </div>
        )}
        {!sellStep && (
          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:18 }}>
            <div style={{ flex:1, height:1, background:"#ebebeb" }}/>
            <span style={{ ...M, fontSize:7, color:"#ccc", letterSpacing:".1em" }}>POWERED BY CLAUDE ANALYSIS</span>
            <div style={{ flex:1, height:1, background:"#ebebeb" }}/>
          </div>
        )}
      </> : <>
        <div style={{ ...M, fontSize:8, letterSpacing:".12em", color:"#aaa", marginBottom:14, marginTop:4 }}>ANALYSIS COMPLETE</div>
        {RESULT.map(([k,v]) => (
          <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:10, marginBottom:10, borderBottom:"1px solid #f5f5f5" }}>
            <span style={{ ...M, fontSize:9, color:"#c0c0c0", letterSpacing:".06em" }}>{k.toUpperCase()}</span>
            <span style={{ ...B, fontSize:12, fontWeight:500, color:"#111" }}>{v}</span>
          </div>
        ))}
        <div style={{ ...M, fontSize:8, color:"#bbb", letterSpacing:".06em", padding:"10px 0 18px" }}>All fields are editable prior to publishing.</div>
        <button className="btn-p">SUBMIT FOR AUTHENTICATION →</button>
        <button className="btn-s" style={{ marginTop:10 }} onClick={() => setSellStep(0)}>RE-ANALYZE</button>
        <div style={{ ...M, fontSize:7, color:"#ccc", letterSpacing:".1em", textAlign:"center", marginTop:14 }}>AUTHENTICATION TAKES 24–48 HOURS BEFORE LISTING GOES LIVE</div>
      </>}
    </div>
  );
};
