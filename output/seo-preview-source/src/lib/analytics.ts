type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };
export function analyticsAllowed() { try { return localStorage.getItem("aktech_analytics_consent") === "granted"; } catch { return false; } }
export function trackConversion(event: "generate_lead" | "whatsapp_click" | "phone_click" | "consultation_request", service?: string) {
 if (!analyticsAllowed()) return;
 (window as AnalyticsWindow).gtag?.("event",event,{page_location:window.location.origin+window.location.pathname,page_referrer:"",landing_path:window.location.pathname,...(service ? {service} : {})});
}
