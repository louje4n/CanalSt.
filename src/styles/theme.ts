export const D = { fontFamily:"'Bebas Neue','Arial Narrow',sans-serif" };
export const B = { fontFamily:"'Barlow',-apple-system,sans-serif" };
export const M = { fontFamily:"'Space Mono','SF Mono','Courier New',monospace" };

export const sigColor = (s: string) => (({ Technical:"#1a5fa0", Archival:"#7a3d00", Deconstruct:"#6b0030", Minimalist:"#1f6320", "Avant-Garde":"#501070" } as Record<string, string>)[s] ?? "#888");
