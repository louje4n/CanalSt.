import { M } from '../../styles/theme';
import { Listing } from '../../types';

export const MarketSignals = ({ l, inv }: { l: Listing, inv?: boolean }) => {
  const c = inv ? "rgba(255,255,255,.7)" : "#777";
  const hot = inv ? "#ff7a5c" : "#c23616";
  return (
    <div style={{ display:"flex", gap:11, alignItems:"center" }}>
      <span style={{ display:"flex", alignItems:"center", gap:4, ...M, fontSize:9, color:c, letterSpacing:".04em" }}>
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        {l.watchers}
      </span>
      {l.hot && (
        <span style={{ display:"flex", alignItems:"center", gap:4, ...M, fontSize:9, color:hot, letterSpacing:".07em", fontWeight:700 }}>
          <span style={{ width:4, height:4, borderRadius:"50%", background:hot, animation:"pulseDot 1.6s ease-in-out infinite" }}/>HIGH DEMAND
        </span>
      )}
      {l.wasPrice && (
        <span style={{ display:"flex", alignItems:"center", gap:3, ...M, fontSize:9, color: inv ? "#a9d8a0" : "#1f6320", letterSpacing:".04em" }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="19 12 12 19 5 12"/></svg>
          ${(l.wasPrice - l.price).toLocaleString()}
        </span>
      )}
    </div>
  );
};
