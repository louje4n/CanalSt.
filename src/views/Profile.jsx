import { D, B, M } from '../styles/theme';
import { AuthBadge } from '../components/ui/AuthBadge';

export const Profile = () => (
  <div style={{ padding:"22px 20px 100px" }}>
    <div style={{ ...D, fontSize:28, letterSpacing:".03em", color:"#111", marginBottom:22 }}>PROFILE</div>
    <div style={{ display:"flex", gap:16, alignItems:"center", paddingBottom:22, borderBottom:"1px solid #f0f0f0", marginBottom:22 }}>
      <div style={{ width:60, height:60, background:"#111", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        <span style={{ ...D, fontSize:18, color:"#fff", letterSpacing:".05em" }}>AC</span>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ ...M, fontSize:12, fontWeight:700, color:"#111", marginBottom:3 }}>ARCHV_CURATOR</div>
        <div style={{ ...B, fontSize:12, color:"#888", marginBottom:6 }}>Member since 2023</div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <span style={{ ...M, fontSize:9, color:"#555" }}>★ 4.9</span>
          <span style={{ color:"#e0e0e0" }}>·</span>
          <span style={{ ...M, fontSize:9, color:"#555" }}>23 SALES</span>
          <span style={{ color:"#e0e0e0" }}>·</span>
          <AuthBadge small/>
        </div>
      </div>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:1, background:"#ebebeb", marginBottom:24 }}>
      {[["12","ACTIVE"],["23","SOLD"],["7","SAVED"],["3","OFFERS"]].map(([n,l]) => (
        <div key={l} style={{ background:"#fff", padding:"16px 6px", textAlign:"center" }}>
          <div style={{ ...D, fontSize:26, color:"#111", letterSpacing:".03em" }}>{n}</div>
          <div style={{ ...M, fontSize:7, color:"#aaa", letterSpacing:".12em" }}>{l}</div>
        </div>
      ))}
    </div>
    {["Messages","Saved Searches","Aesthetic Preferences","Verified Identity","Transaction History","Shipping & Payment","Settings"].map(item => (
      <div key={item} className="menu-row">
        <span style={{ ...B, fontSize:13, fontWeight:500, color:"#111" }}>{item}</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><path d="m9 18 6-6-6-6"/></svg>
      </div>
    ))}
  </div>
);
