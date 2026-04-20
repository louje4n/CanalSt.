import { Listing } from '../../types';

export const Silhouette = ({ type, color }: { type: string, color: string }) => {
  const s = { stroke:color, strokeWidth:1, fill:"none", strokeLinejoin:"round" as const, strokeLinecap:"round" as const, opacity:.5 };
  if (type === "jacket") return (
    <svg viewBox="0 0 100 130" style={{ width:"100%", height:"100%" }}>
      <path {...s} d="M35 18 L50 12 L65 18 L80 32 L78 48 L72 50 L72 112 L28 112 L28 50 L22 48 L20 32 Z"/>
      <path {...s} d="M50 12 L50 112"/>
      <path {...s} d="M72 62 L82 68 L82 100"/>
      <path {...s} d="M28 62 L18 68 L18 100"/>
      <circle {...s} cx="46" cy="26" r="1"/><circle {...s} cx="46" cy="46" r="1"/><circle {...s} cx="46" cy="66" r="1"/>
    </svg>
  );
  if (type === "puffer") return (
    <svg viewBox="0 0 100 130" style={{ width:"100%", height:"100%" }}>
      <path {...s} d="M30 16 L50 10 L70 16 L86 28 L84 50 L78 54 L78 108 L22 108 L22 54 L16 50 L14 28 Z"/>
      <path {...s} d="M26 42 L74 42"/><path {...s} d="M26 60 L74 60"/><path {...s} d="M26 78 L74 78"/><path {...s} d="M26 96 L74 96"/>
      <path {...s} d="M50 10 L50 108"/>
    </svg>
  );
  if (type === "blazer") return (
    <svg viewBox="0 0 100 130" style={{ width:"100%", height:"100%" }}>
      <path {...s} d="M36 20 L50 14 L64 20 L80 34 L76 110 L24 110 L20 34 Z"/>
      <path {...s} d="M50 14 L42 40 L50 48 L58 40 Z"/>
      <path {...s} d="M42 40 L42 100"/><path {...s} d="M58 40 L58 100"/>
    </svg>
  );
  if (type === "trouser") return (
    <svg viewBox="0 0 100 130" style={{ width:"100%", height:"100%" }}>
      <path {...s} d="M32 16 L68 16 L70 20 L66 118 L54 118 L50 64 L46 118 L34 118 L30 20 Z"/>
      <path {...s} d="M50 20 L50 64"/>
      <path {...s} d="M32 22 L68 22"/>
    </svg>
  );
  if (type === "cargo") return (
    <svg viewBox="0 0 100 130" style={{ width:"100%", height:"100%" }}>
      <path {...s} d="M30 16 L70 16 L72 22 L68 118 L54 118 L50 68 L46 118 L32 118 L28 22 Z"/>
      <path {...s} d="M50 22 L50 68"/>
      <rect {...s} x="34" y="52" width="12" height="18"/><rect {...s} x="54" y="52" width="12" height="18"/>
      <path {...s} d="M30 22 L70 22"/>
    </svg>
  );
  return null;
};

// STUDIO PLATE — reads like an editorial lay-flat, not decorative cover art
export const StudioPlate = ({ l, size="full" }: { l: Listing, size?: "full"|"hero" }) => (
  <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
    <div style={{ position:"absolute", inset:0, background: `radial-gradient(ellipse 110% 70% at 50% 35%, ${l.accent} 0%, ${l.bg} 75%)` }}/>
    <div style={{ position:"absolute", left:0, right:0, bottom:0, height:"32%", background:`linear-gradient(to top, ${l.bg} 0%, ${l.bg}00 100%)` }}/>
    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width: size === "hero" ? 180 : 118, height: size === "hero" ? 234 : 152, position:"relative" }}>
        <Silhouette type={l.type} color={l.txt}/>
        <div style={{ position:"absolute", left:"10%", right:"10%", bottom:"-4px", height:8, background: `radial-gradient(ellipse, ${l.txt}22, transparent 70%)` }}/>
      </div>
    </div>
    {["top left","top right","bottom left","bottom right"].map(pos => {
      const [v, h] = pos.split(" ");
      return <div key={pos} style={{ position:"absolute", [v]:8, [h]:8, width:7, height:7, borderTop: v==="top" ? `1px solid ${l.txt}25` : "none", borderBottom: v==="bottom" ? `1px solid ${l.txt}25` : "none", borderLeft: h==="left" ? `1px solid ${l.txt}25` : "none", borderRight: h==="right" ? `1px solid ${l.txt}25` : "none" }}/>;
    })}
  </div>
);
