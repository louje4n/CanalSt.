import { useState, useEffect } from "react";
import { M } from './styles/theme';

import { Archive } from './views/Archive';
import { Curator } from './views/Curator';
import { Sell } from './views/Sell';
import { Profile } from './views/Profile';
import { PDV } from './views/PDV';
import { Messages } from './views/Messages';
import { SavedSearches } from './views/SavedSearches';
import { Preferences } from './views/Preferences';
import { Identity } from './views/Identity';
import { History } from './views/History';
import { Shipping } from './views/Shipping';
import { Settings } from './views/Settings';
import { useStore } from './store/useStore';
import { supabase } from './lib/supabase';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

export default function App() {
  const { activeProduct, setActiveProduct, showIndexInfo, setShowIndexInfo, fetchListings, isLoading, setSession, setProfile } = useStore();
  const [pdvPhoto, setPdvPhoto] = useState(0);

  const location = useLocation();

  useEffect(() => {
    fetchListings();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      
      if (event === 'PASSWORD_RECOVERY') {
        useStore.getState().setAuthView('reset');
      }

      if (session) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, [fetchListings, setSession, setProfile]);

  const fetchProfile = async (id: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (data) setProfile(data);
  };

  if (isLoading) {
    return (
      <div style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ ...M, fontSize:11, color:"#fff", letterSpacing:".1em", animation:"pulse 1.5s infinite" }}>
          CONNECTING TO ARCHIVE...
        </div>
        <style>{`@keyframes pulse { 0% {opacity:1} 50% {opacity:.3} 100% {opacity:1} }`}</style>
      </div>
    );
  }

  const NAV = [
    { key:"archive", path:"/", label:"ARCHIVE", svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg> },
    { key:"search", path:"/curator", label:"SEARCH",  svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
    { key:"sell", path:"/sell", label:"SELL",    svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
    { key:"profile", path:"/profile", label:"PROFILE", svg:<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
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
          <Routes>
            <Route path="/" element={<Archive />} />
            <Route path="/curator" element={<Curator />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/messages" element={<Messages />} />
            <Route path="/profile/searches" element={<SavedSearches />} />
            <Route path="/profile/preferences" element={<Preferences />} />
            <Route path="/profile/identity" element={<Identity />} />
            <Route path="/profile/history" element={<History />} />
            <Route path="/profile/shipping" element={<Shipping />} />
            <Route path="/profile/settings" element={<Settings />} />
          </Routes>
        </div>

        {activeProduct && (
          <div className="scroll" style={{ position:"absolute", top:50, left:0, right:0, bottom:84, background:"#fff", zIndex:50 }}>
            <PDV pdvPhoto={pdvPhoto} setPdvPhoto={setPdvPhoto} />
          </div>
        )}

        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:84, background:"#fff", borderTop:"1px solid #f0f0f0", display:"flex", alignItems:"flex-start", paddingTop:12, zIndex:100 }}>
          {NAV.map(({ key, path, label, svg }) => {
            const active = location.pathname === path && !activeProduct;
            return (
              <Link key={key} to={path} onClick={() => { setActiveProduct(null); }}
                style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, background:"none", border:"none", cursor:"pointer", padding:0, color: active ? "#111" : "#ccc", transition:"color .2s", position:"relative", textDecoration:"none" }}>
                {svg}
                <span style={{ ...M, fontSize:7, letterSpacing:".1em" }}>{label}</span>
                {active && <div style={{ position:"absolute", bottom:-4, width:4, height:4, borderRadius:"50%", background:"#111" }}/>}
              </Link>
            );
          })}
        </div>

        {showIndexInfo && (
          <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,.85)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }} onClick={() => setShowIndexInfo(false)}>
            <div style={{ background:"#111", padding:"30px 24px", width:"100%", border:"1px solid #333", position:"relative", borderRadius:12 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowIndexInfo(false)} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", color:"#fff", cursor:"pointer" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
              <div style={{ ...import('./styles/theme').then(m => m.D).catch(()=>({})), fontSize:22, fontFamily:"Helvetica", fontWeight:700, color:"#fff", letterSpacing:".03em", marginBottom:12 }}>THE VISUAL PROXIMITY INDEX</div>
              <div style={{ ...import('./styles/theme').then(m => m.B).catch(()=>({})), fontSize:13, fontFamily:"Helvetica", color:"#aaa", lineHeight:1.5, marginBottom:24 }}>Our proprietary scoring model discreetly evaluates structural fidelity, material weight, and aesthetic alignment to the original reference artifact.</div>
              
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div>
                  <div style={{ fontSize:10, fontFamily:"monospace", color:"#fff", fontWeight:700, letterSpacing:".1em", marginBottom:4 }}>TIER-1 (98-100%)</div>
                  <div style={{ fontSize:12, fontFamily:"Helvetica", color:"#bbb", lineHeight:1.4 }}>Uncompromised batch. Architecturally indistinguishable from the reference model.</div>
                </div>
                <div style={{ width:20, height:1, background:"#333" }}/>
                <div>
                  <div style={{ fontSize:10, fontFamily:"monospace", color:"#fff", fontWeight:700, letterSpacing:".1em", marginBottom:4 }}>TIER-2 (90-97%)</div>
                  <div style={{ fontSize:12, fontFamily:"Helvetica", color:"#bbb", lineHeight:1.4 }}>High precision. Minor deviances in internal tags or concealed stitching.</div>
                </div>
                <div style={{ width:20, height:1, background:"#333" }}/>
                <div>
                  <div style={{ fontSize:10, fontFamily:"monospace", color:"#fff", fontWeight:700, letterSpacing:".1em", marginBottom:4 }}>TIER-3 (&lt;90%)</div>
                  <div style={{ fontSize:12, fontFamily:"Helvetica", color:"#bbb", lineHeight:1.4 }}>Aesthetic match. Recognizable silhouette but structural deviations are present.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
