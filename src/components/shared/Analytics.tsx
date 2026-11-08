"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  analyticsAllowed,
  getConsentStatus,
  setConsentStatus,
  type ConsentStatus,
} from "@/lib/analytics";

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
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<ConsentStatus>("undecided");
  const [showBanner, setShowBanner] = useState(false);
  const path = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-5LT8FGHRJ2";

  useEffect(() => {
    setMounted(true);
    const initialStatus = getConsentStatus();
    setConsent(initialStatus);

    if (initialStatus === "undecided") {
      setShowBanner(true);
    }

    const handleConsentChange = (e: Event) => {
      const custom = e as CustomEvent<ConsentStatus>;
      const updated = custom.detail || getConsentStatus();
      setConsent(updated);
      if (updated !== "undecided") {
        setShowBanner(false);
      }
    };

    const handleOpenPreferences = () => {
      setShowBanner(true);
    };

    window.addEventListener("aktech_consent_change", handleConsentChange);
    window.addEventListener("aktech_open_consent", handleOpenPreferences);
    window.addEventListener("storage", handleConsentChange);

    return () => {
      window.removeEventListener("aktech_consent_change", handleConsentChange);
      window.removeEventListener("aktech_open_consent", handleOpenPreferences);
      window.removeEventListener("storage", handleConsentChange);
    };
  }, []);

  useEffect(() => {
    if (consent === "granted") {
      const timer = setTimeout(() => {
        pageView();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [path, consent]);

  if (!gaId || !/^G-[A-Z0-9]+$/.test(gaId)) return null;

  const handleConsent = (allow: boolean) => {
    const status: ConsentStatus = allow ? "granted" : "denied";
    setConsentStatus(status);
    setConsent(status);
    setShowBanner(false);
  };

  const debug = isDebug();

  return (
    <>
      {/* Floating Cookie & Analytics Consent Banner */}
      {mounted && showBanner && (
        <aside
          role="region"
          aria-label="Cookie & Privacy Preferences"
          className="fixed bottom-0 inset-x-0 z-[10005] border-t border-white/15 bg-[#141414]/98 backdrop-blur-md p-4 sm:px-8 sm:py-5 shadow-[0_-12px_40px_rgba(0,0,0,0.7)] text-white"
        >
          <div className="mx-auto flex max-w-[1300px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E0000B]/15 text-[#E0000B]">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <div className="text-xs leading-relaxed text-white/80">
                <p className="font-heading text-sm font-bold tracking-tight text-white">
                  Cookie &amp; Analytics Preferences
                </p>
                <p className="mt-1 text-[#9CA3AF]">
                  We use cookies and Google Analytics 4 to measure website traffic, analyze user journeys, and improve our services. No personal identifying information is stored.{" "}
                  <Link href="/privacy" className="underline hover:text-[#E0000B] transition-colors">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2.5 self-end sm:self-center">
              <button
                type="button"
                onClick={() => handleConsent(false)}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/80 hover:border-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => handleConsent(true)}
                className="rounded-full bg-[#E0000B] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#C00009] shadow-md shadow-[#E0000B]/30 transition-all cursor-pointer"
              >
                Accept Analytics
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Google Analytics 4 Scripts (Loaded Only When Consent is Granted) */}
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive" onReady={pageView}>
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{send_page_view:false,page_location:window.location.origin+window.location.pathname,page_referrer:''${debug ? ",debug_mode:true" : ""}});`}
          </Script>
        </>
      )}
    </>
  );
}
