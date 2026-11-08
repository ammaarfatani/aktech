export type ConversionEvent =
  | "generate_lead"
  | "whatsapp_click"
  | "phone_click"
  | "consultation_request"
  | "contact_form_submission"
  | "consultation_booking_submission"
  | "project_estimator_submission";

export type ConsentStatus = "granted" | "denied" | "undecided";

type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };

export function getConsentStatus(): ConsentStatus {
  try {
    const val = localStorage.getItem("aktech_analytics_consent");
    if (val === "granted") return "granted";
    if (val === "denied") return "denied";
    return "undecided";
  } catch {
    return "denied";
  }
}

export function analyticsAllowed(): boolean {
  return getConsentStatus() === "granted";
}

export function setConsentStatus(status: "granted" | "denied"): void {
  try {
    localStorage.setItem("aktech_analytics_consent", status);
  } catch {}
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("aktech_consent_change", { detail: status }));
  }
}

export function openConsentPreferences(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("aktech_open_consent"));
  }
}

export function trackConversion(
  event: ConversionEvent,
  service?: string,
  extra?: Record<string, string>
) {
  if (!analyticsAllowed()) return;
  const payload: Record<string, unknown> = {
    page_location: window.location.origin + window.location.pathname,
    page_referrer: "",
    landing_path: window.location.pathname,
  };
  if (service) payload.service = service;
  if (extra) Object.assign(payload, extra);

  try {
    const search = window.location.search;
    if (
      search &&
      (new URLSearchParams(search).get("debug_ga") === "true" ||
        new URLSearchParams(search).get("debug_mode") === "true")
    ) {
      payload.debug_mode = true;
    }
  } catch {}

  (window as AnalyticsWindow).gtag?.("event", event, payload);
}
