import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { D, B, M } from '../styles/theme';


export const Profile = () => {
  const { session, profile, setProfile, authView, setAuthView } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [initials, setInitials] = useState('');

  const handleAuth = async (type: 'in' | 'up') => {
    if (!email || !password) {
      alert("Please enter a valid email and password.");
      return;
    }
    setLoading(true);
    const { error } = type === 'up' 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });
    
    if (error) alert(error.message);
    else if (type === 'up') setAuthView('verify');
    setLoading(false);
  };

  const handleForgot = async () => {
    if (!email) { alert("Please enter your email."); return; }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/' });
    if (error) alert(error.message);
    else setAuthView('verify');
    setLoading(false);
  };

  const handleReset = async () => {
    if (!password) { alert("Please enter a new password."); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) alert(error.message);
    else {
      alert("Password successfully updated.");
      setAuthView('login');
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const resolvedUsername = username || profile?.username || session?.user?.email?.split('@')[0];
    const updates = { 
        id: session?.user?.id, 
        username: resolvedUsername, 
        bio, 
        avatar_initials: initials 
    };
    
    // Upsert gracefully handles INSERT or UPDATE
    const { error } = await supabase.from('profiles').upsert(updates);
    if (!error) {
      // Re-map the state natively
      setProfile({ ...(profile || {}), ...updates } as any);
      setEditMode(false);
    } else {
      if (error.code === '23505') {
        alert(`The username "${resolvedUsername}" is already taken. Please enter a different one.`);
      } else {
        alert("Error: " + error.message);
      }
    }
    setLoading(false);
  };

  if (authView === 'reset') {
    return (
      <div style={{ padding:"40px 20px" }}>
        <div style={{ ...D, fontSize:28, letterSpacing:".03em", color:"#111", marginBottom:22 }}>SET NEW PASSWORD</div>
        <div style={{ ...B, fontSize:12, color:"#888", marginBottom:20 }}>Please enter a secure replacement password.</div>
        <input style={{ width:"100%", padding:"12px 14px", border:"1px solid #ddd", background:"#f5f5f5", ...M, fontSize:11, letterSpacing:".05em", marginBottom:20 }} type="password" placeholder="NEW PASSWORD" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn-p" onClick={handleReset} disabled={loading}>{loading ? "PROCESSING..." : "UPDATE PASSWORD"}</button>
      </div>
    );
  }

  if (!session) {
    if (authView === 'verify') return (
      <div style={{ padding:"60px 20px", textAlign:"center" }}>
        <div style={{ ...D, fontSize:28, letterSpacing:".03em", color:"#111", marginBottom:12 }}>VERIFICATION REQUIRED</div>
        <div style={{ ...M, fontSize:10, color:"#888", letterSpacing:".1em", lineHeight:1.4, marginBottom:24 }}>CHECK YOUR INBOX FOR A SECURE LINK TO AUTHORIZE THIS DEVICE.</div>
        <button className="btn-s" onClick={() => setAuthView('login')}>RETURN TO LOGIN</button>
      </div>
    );

    if (authView === 'forgot') return (
      <div style={{ padding:"40px 20px" }}>
        <div style={{ ...D, fontSize:28, letterSpacing:".03em", color:"#111", marginBottom:22 }}>RECOVER ACCESS</div>
        <div style={{ ...B, fontSize:12, color:"#888", marginBottom:20 }}>Enter your registered email address to receive a secure reset link.</div>
        <input style={{ width:"100%", padding:"12px 14px", border:"1px solid #ddd", background:"#f5f5f5", ...M, fontSize:11, letterSpacing:".05em", marginBottom:20 }} type="email" placeholder="EMAIL ADDRESS" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="btn-p" onClick={handleForgot} disabled={loading} style={{ marginBottom:10 }}>{loading ? "PROCESSING..." : "SEND LINK"}</button>
        <button className="btn-s" onClick={() => setAuthView('login')} disabled={loading}>CANCEL</button>
      </div>
    );

    return (
      <div style={{ padding:"40px 20px" }}>
        <div style={{ ...D, fontSize:28, letterSpacing:".03em", color:"#111", marginBottom:22 }}>AUTHENTICATION</div>
        <div style={{ ...B, fontSize:12, color:"#888", marginBottom:20 }}>Log in to access the archive index.</div>
        
        <button className="btn-s" onClick={() => supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/' } })} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          CONTINUE WITH GOOGLE
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
          <span style={{ ...M, fontSize: 10, color: "#aaa", letterSpacing: ".1em" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "#ebebeb" }} />
        </div>
        
        <input style={{ width:"100%", padding:"12px 14px", border:"1px solid #ddd", background:"#f5f5f5", ...M, fontSize:11, letterSpacing:".05em", marginBottom:12 }} type="email" placeholder="EMAIL ADDRESS" value={email} onChange={e=>setEmail(e.target.value)} />
        <input style={{ width:"100%", padding:"12px 14px", border:"1px solid #ddd", background:"#f5f5f5", ...M, fontSize:11, letterSpacing:".05em", marginBottom:20 }} type="password" placeholder="PASSWORD" value={password} onChange={e=>setPassword(e.target.value)} />
        
        <button className="btn-p" onClick={() => handleAuth('in')} disabled={loading} style={{ marginBottom:10 }}>{loading ? "PROCESSING..." : "LOG IN"}</button>
        <button className="btn-s" onClick={() => handleAuth('up')} disabled={loading} style={{ marginBottom:14 }}>CREATE ACCOUNT</button>
        
        <div style={{ textAlign:"center" }}>
          <span style={{ ...M, fontSize:9, color:"#888", textDecoration:"underline", cursor:"pointer" }} onClick={() => setAuthView('forgot')}>FORGOT PASSWORD?</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding:"22px 20px 100px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:22 }}>
        <div style={{ ...D, fontSize:28, letterSpacing:".03em", color:"#111" }}>PROFILE</div>
        <div style={{ ...M, fontSize:9, color:"#888", cursor:"pointer", textDecoration:"underline" }} onClick={() => supabase.auth.signOut()}>SIGN OUT</div>
      </div>

      {!editMode ? (
        <div style={{ display:"flex", gap:16, alignItems:"center", paddingBottom:22, borderBottom:"1px solid #f0f0f0", marginBottom:22 }}>
          <div style={{ width:60, height:60, background:"#111", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ ...D, fontSize:18, color:"#fff", letterSpacing:".05em" }}>{profile?.avatar_initials || "AC"}</span>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div style={{ ...M, fontSize:12, fontWeight:700, color:"#111", marginBottom:3 }}>{profile?.username || session.user.email?.split('@')[0]}</div>
              <div style={{ ...M, fontSize:9, color:"#888", cursor:"pointer", textDecoration:"underline" }} onClick={() => { setUsername(profile?.username || session.user.email?.split('@')[0] || ''); setBio(profile?.bio||''); setInitials(profile?.avatar_initials||''); setEditMode(true); }}>EDIT</div>
            </div>
            <div style={{ ...B, fontSize:12, color:"#888", marginBottom:6 }}>{profile?.bio || "Member since 2023"}</div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <span style={{ ...M, fontSize:9, color:"#555" }}>★ {profile?.rating || "5.0"}</span>
              <span style={{ color:"#e0e0e0" }}>·</span>
              <span style={{ ...M, fontSize:9, color:"#555" }}>{profile?.sales || 0} SALES</span>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ paddingBottom:22, borderBottom:"1px solid #f0f0f0", marginBottom:22 }}>
          <label style={{ ...B, display:"block", fontSize:10, marginBottom:4, color:"#111" }}>USERNAME</label>
          <input style={{ width:"100%", padding:"10px 12px", border:"1px solid #111", background:"#fff", ...M, fontSize:11, marginBottom:12 }} value={username} onChange={e=>setUsername(e.target.value)} />

          <label style={{ ...B, display:"block", fontSize:10, marginBottom:4, color:"#111" }}>INITIALS</label>
          <input style={{ width:"100%", padding:"10px 12px", border:"1px solid #111", background:"#fff", ...M, fontSize:11, marginBottom:12 }} maxLength={2} value={initials} onChange={e=>setInitials(e.target.value)} />
          
          <label style={{ ...B, display:"block", fontSize:10, marginBottom:4, color:"#111" }}>BIO</label>
          <input style={{ width:"100%", padding:"10px 12px", border:"1px solid #111", background:"#fff", ...M, fontSize:11, marginBottom:16 }} value={bio} onChange={e=>setBio(e.target.value)} />

          <button className="btn-p" onClick={handleUpdate} disabled={loading} style={{ padding:"8px", marginBottom:8 }}>{loading ? "SAVING..." : "SAVE CHANGES"}</button>
          <button className="btn-s" onClick={() => setEditMode(false)} style={{ padding:"8px" }}>CANCEL</button>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:1, background:"#ebebeb", marginBottom:24 }}>
        {[["12","ACTIVE"],["23","SOLD"],["7","SAVED"],["3","OFFERS"]].map(([n,l]) => (
          <div key={l} style={{ background:"#fff", padding:"16px 6px", textAlign:"center" }}>
            <div style={{ ...D, fontSize:26, color:"#111", letterSpacing:".03em" }}>{n}</div>
            <div style={{ ...M, fontSize:7, color:"#aaa", letterSpacing:".12em" }}>{l}</div>
          </div>
        ))}
      </div>

      {[
        { name: "Messages", path: "/profile/messages" },
        { name: "Saved Searches", path: "/profile/searches" },
        { name: "Aesthetic Preferences", path: "/profile/preferences" },
        { name: "Verified Identity", path: "/profile/identity" },
        { name: "Transaction History", path: "/profile/history" },
        { name: "Shipping & Payment", path: "/profile/shipping" },
        { name: "Settings", path: "/profile/settings" }
      ].map(item => (
        <Link key={item.name} to={item.path} className="menu-row" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ ...B, fontSize:13, fontWeight:500, color:"#111" }}>{item.name}</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><path d="m9 18 6-6-6-6"/></svg>
        </Link>
      ))}
    </div>
  );
};
