import { M } from '../../styles/theme';
import { useStore } from '../../store/useStore';

export const DupeBadge = ({ matchScore, dark, small }: { matchScore: number, dark?: boolean, small?: boolean }) => {
  const setShowIndexInfo = useStore(state => state.setShowIndexInfo);
  let tier = "T-3";
  if (matchScore >= 98) tier = "T-1";
  else if (matchScore >= 90) tier = "T-2";

  return (
    <div onClick={(e) => { e.stopPropagation(); setShowIndexInfo(true); }} style={{ display:"inline-flex", alignItems:"center", gap: small ? 6 : 8, padding: small ? "3px 8px" : "4px 10px", border: `1px solid ${dark ? "rgba(255,255,255,.35)" : "#111"}`, ...M, fontSize: small ? 8 : 9, letterSpacing:".11em", color: dark ? "#fff" : "#111", cursor: "pointer" }}>
      <div style={{ display:"flex", alignItems:"center", gap:4 }}>
        <svg width={small?8:9} height={small?8:9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
        <span style={{ fontWeight:700 }}>{tier}</span>
      </div>
      <div style={{ width:1, height: small ? 8 : 10, background: dark ? "rgba(255,255,255,.35)" : "#111" }}/>
      <span>INDEX {matchScore || "--"}%</span>
    </div>
  );
};
