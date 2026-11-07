"use client";
import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { analyticsAllowed } from "@/lib/analytics";
const subscribe = () => () => {};
let lastPage = "";
function pageView() {
 const path = window.location.pathname;
 const gtag = (window as Window & {gtag?: (...args: unknown[])=>void}).gtag;
 if (analyticsAllowed() && gtag && lastPage !== path) { gtag("event","page_view",{page_location:window.location.origin+path,page_referrer:""}); lastPage=path; }
}
export function Analytics() {
 const consent=useSyncExternalStore(subscribe,analyticsAllowed,()=>false);
 const path=usePathname();
 const gaId=process.env.NEXT_PUBLIC_GA_ID;
 useEffect(()=>{pageView();},[path]);
 if(!gaId || !/^G-[A-Z0-9]+$/.test(gaId)) return null;
 const choose=(allow:boolean)=>{try {localStorage.setItem("aktech_analytics_consent",allow ? "granted" : "denied");}catch{} window.location.reload();};
 return <><div className="border-t border-white/20 bg-[#181818] px-6 py-4 text-center text-xs text-white"><span>Optional analytics: {consent ? "enabled" : "disabled"}. </span><button type="button" className="mx-3 underline" onClick={()=>choose(!consent)}>{consent ? "Disable analytics" : "Allow analytics"}</button></div>{consent && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive"/><Script id="google-analytics" strategy="afterInteractive" onReady={pageView}>{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{send_page_view:false,page_location:window.location.origin+window.location.pathname,page_referrer:''});`}</Script></>}</>;
}
