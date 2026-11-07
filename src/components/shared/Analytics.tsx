"use client";
import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { analyticsAllowed } from "@/lib/analytics";

const subscribe = () => () => {};
let lastPage = "";

function isDebug(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return (
      new URLSearchParams(window.location.search).get("debug_ga") === "true" ||
      new URLSearchParams(window.location.search).get("debug_mode") === "true"
    );
  } catch {
    return false;
  }
}

function pageView() {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (analyticsAllowed() && gtag && lastPage !== path) {
    const params: Record<string, unknown> = {
      page_location: window.location.origin + path,
      page_referrer: lastPage ? window.location.origin + lastPage : document.referrer || "",
      page_title: document.title,
    };
    if (isDebug()) params.debug_mode = true;
    gtag("event", "page_view", params);
    lastPage = path;
  }
}

export function Analytics() {
  const consent = useSyncExternalStore(subscribe, analyticsAllowed, () => false);
  const path = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-5LT8FGHRJ2";

  useEffect(() => {
    // Delay slightly to let Next.js update document.title
    const timer = setTimeout(() => {
      pageView();
    }, 50);
    return () => clearTimeout(timer);
  }, [path]);

  if (!gaId || !/^G-[A-Z0-9]+$/.test(gaId)) return null;

  const choose = (allow: boolean) => {
    try {
      localStorage.setItem("aktech_analytics_consent", allow ? "granted" : "denied");
    } catch {}
    window.location.reload();
  };

  const debug = isDebug();

  return (
    <>
      <div className="border-t border-white/20 bg-[#181818] px-6 py-4 text-center text-xs text-white">
        <span>Optional analytics: {consent ? "enabled" : "disabled"}. </span>
        <button
          type="button"
          className="mx-3 underline hover:text-[#E0000B] transition-colors cursor-pointer"
          onClick={() => choose(!consent)}
        >
          {consent ? "Disable analytics" : "Allow analytics"}
        </button>
      </div>
      {consent && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive" onReady={pageView}>
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{send_page_view:false,page_location:window.location.origin+window.location.pathname,page_referrer:''${debug ? ",debug_mode:true" : ""}});`}
          </Script>
        </>
      )}
    </>
  );
}
