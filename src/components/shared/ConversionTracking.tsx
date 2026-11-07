"use client";
import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";
export function ConversionTracking() {
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const anchor = (event.target as Element)?.closest?.("a");
      if (!anchor) return;
      try {
        const href = anchor.href || "";
        if (anchor.dataset.conversion === "consultation_request") {
          trackConversion("consultation_request");
        } else if (href.includes("wa.me/") || href.includes("whatsapp.com/")) {
          trackConversion("whatsapp_click");
        } else if (href.startsWith("tel:")) {
          trackConversion("phone_click");
        }
      } catch {}
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
