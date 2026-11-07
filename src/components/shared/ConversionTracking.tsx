"use client";
import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";
export function ConversionTracking() {
 useEffect(()=>{ const click=(event: MouseEvent)=>{ const anchor=(event.target as Element)?.closest?.("a"); if(!anchor) return; const url=new URL(anchor.href); if(anchor.dataset.conversion === "consultation_request") trackConversion("consultation_request"); else if(url.hostname === "wa.me") trackConversion("whatsapp_click"); else if(url.protocol === "tel:") trackConversion("phone_click"); }; document.addEventListener("click",click);return ()=>document.removeEventListener("click",click); },[]);
 return null;
}
