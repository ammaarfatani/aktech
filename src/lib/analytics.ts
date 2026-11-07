export type ConversionEvent =
  | "generate_lead"
  | "whatsapp_click"
  | "phone_click"
  | "consultation_request"
  | "contact_form_submission"
  | "consultation_booking_submission"
  | "project_estimator_submission";

type AnalyticsWindow = Window & { gtag?: (...args: unknown[]) => void };

export function analyticsAllowed(): boolean {
  try {
    return localStorage.getItem("aktech_analytics_consent") === "granted";
  } catch {
    return false;
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
