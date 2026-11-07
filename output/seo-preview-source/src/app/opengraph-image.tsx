import { ImageResponse } from "next/og";
export const alt = "AKTECH Digital Solutions — Web, Software & AI Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() { return new ImageResponse(<div style={{background:"#181818",color:"white",width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",padding:80}}><div style={{color:"#ff444e",fontSize:32,marginBottom:35}}>AKTECH DIGITAL SOLUTIONS</div><div style={{fontSize:72,fontWeight:700}}>Web. Software. AI.</div><div style={{fontSize:28,marginTop:35}}>Karachi, Pakistan · Remote collaboration</div></div>,size); }
