/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function track(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return false;
  if (typeof window.gtag !== "function") return false;
  window.gtag("event", name, params);
  return true;
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  track(name, params);
}

export function trackSubscribeClicked() {
  track("subscribe_clicked");
}

export function trackCheckoutStarted() {
  track("checkout_started");
}

export function trackPaymentSuccess(params?: Record<string, unknown>) {
  track("payment_success", params);
}

export function trackGoogleAdsPurchaseConversion(transactionId?: string) {
  return track("conversion", {
    send_to: "AW-18195883998/o6pYCKXb0rYcEN7PvORD",
    transaction_id: transactionId ?? "",
  });
}

export function trackSignupCompleted() {
  track("signup_completed");
}

export function trackSignupCheckoutWallViewed() {
  track("signup_checkout_wall_viewed", { offer: "online-learning" });
}

export function trackDashboardViewed(params?: Record<string, unknown>) {
  track("dashboard_viewed", params);
}

export function trackCourseSelected(params?: Record<string, unknown>) {
  track("course_selected", params);
}

export function trackContinueLearningClicked(params?: Record<string, unknown>) {
  track("continue_learning_clicked", params);
}

export function trackLessonStarted(course: string, unit: string, lesson: string) {
  track("lesson_started", { course, unit, lesson });
}

export function trackLessonViewed(course: string, unit: string, lesson: string) {
  track("lesson_viewed", { course, unit, lesson });
}

export function trackMasteryStarted(course: string, unit: string, lesson: string) {
  track("mastery_started", { course, unit, lesson });
}

export function trackMasteryCompleted(
  course: string,
  unit: string,
  lesson: string,
  passed: boolean,
  score: number
) {
  track("mastery_completed", { course, unit, lesson, passed, score });
}

export function trackPreviewHscLessonClicked(source?: string) {
  track("preview_hsc_lesson_clicked", source ? { source } : undefined);
}

export function trackDiagnosticStarted(source?: string) {
  track("diagnostic_started", source ? { source } : undefined);
}
