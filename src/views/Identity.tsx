import { useNavigate } from 'react-router-dom';
import { D, M } from '../styles/theme';

export const Identity = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding:"22px 20px" }}>
      <div style={{ ...M, fontSize:11, color:"#111", cursor:"pointer", marginBottom:26, letterSpacing:".1em", fontWeight:700 }} onClick={()=>navigate(-1)}>{'< BACK'}</div>
      <div style={{ ...D, fontSize:28, color:"#111", letterSpacing:".03em" }}>VERIFIED IDENTITY</div>
      <div style={{ ...M, fontSize:10, color:"#888", letterSpacing:".1em", marginTop:40, textAlign:"center" }}>IDENTITY MODULE LOCKED.</div>
    </div>
  );
};
