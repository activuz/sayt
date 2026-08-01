export type AnalyticsEvent =
  | "page_view"
  | "form_started"
  | "lead_submitted"
  | "survey_offered"
  | "survey_started"
  | "survey_question_answered"
  | "survey_completed"
  | "survey_dismissed"
  | "lang_switched";

export interface AnalyticsPayload {
  event: AnalyticsEvent;
  timestamp: number;
  meta?: Record<string, any>;
}

export function trackEvent(event: AnalyticsEvent, meta?: Record<string, any>) {
  if (typeof window === "undefined") return;

  const payload: AnalyticsPayload = {
    event,
    timestamp: Date.now(),
    meta,
  };

  // 1. LocalStorage log for audit
  try {
    const existingRaw = localStorage.getItem("zotdor_analytics_events") || "[]";
    const events: AnalyticsPayload[] = JSON.parse(existingRaw);
    events.push(payload);
    // Keep max 100 recent events
    if (events.length > 100) events.shift();
    localStorage.setItem("zotdor_analytics_events", JSON.stringify(events));
  } catch (err) {
    console.error("Analytics localStorage error:", err);
  }

  // 2. Beacon / fetch to API endpoint
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", JSON.stringify(payload));
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch (err) {
    // Ignore analytics network errors silently
  }
}
