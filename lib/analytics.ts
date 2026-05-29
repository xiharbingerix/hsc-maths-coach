/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function track(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
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

export function trackPaymentSuccess() {
  track("payment_success");
}

export function trackSignupCompleted() {
  track("signup_completed");
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
