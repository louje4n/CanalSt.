import { M } from '../../styles/theme';

export const AuthBadge = ({ dark, small }) => (
  <div style={{ display:"inline-flex", alignItems:"center", gap:4, padding: small ? "2px 6px" : "3px 8px", border: `1px solid ${dark ? "rgba(255,255,255,.35)" : "#111"}`, ...M, fontSize: small ? 7 : 8, letterSpacing:".11em", color: dark ? "#fff" : "#111" }}>
    <svg width={small?7:8} height={small?7:8} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
    AUTHENTICATED
  </div>
);
