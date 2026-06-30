import { test } from "node:test";
import assert from "node:assert/strict";
import {
  addDays,
  billingAnchorTimestamp,
  describeMonday,
  isMonday,
  mondayOfWeek,
  mondayOnOrAfter,
  nextBreakWithinDays,
  upcomingMondays,
} from "./nswTermDates";

test("mondayOfWeek returns the Monday of the containing week", () => {
  // 2026-07-21 is a Tuesday (Term 3 start) → Monday is 2026-07-20.
  assert.equal(mondayOfWeek("2026-07-21"), "2026-07-20");
  assert.equal(mondayOfWeek("2026-07-20"), "2026-07-20");
  // Sunday belongs to the week that started the previous Monday.
  assert.equal(mondayOfWeek("2026-07-26"), "2026-07-20");
});

test("mondayOnOrAfter returns same date when already Monday, else next Monday", () => {
  assert.equal(mondayOnOrAfter("2026-07-20"), "2026-07-20");
  assert.equal(mondayOnOrAfter("2026-07-21"), "2026-07-27");
  assert.ok(isMonday(mondayOnOrAfter("2026-06-29")));
});

test("describeMonday classifies term vs holiday Mondays", () => {
  // Mid Term 3 2026 (term runs 2026-07-21 .. 2026-09-25).
  const inTerm = describeMonday("2026-08-03");
  assert.equal(inTerm.inHoliday, false);
  assert.equal(inTerm.termLabel, "Term 3 2026");

  // Term-start week (Monday before the Tuesday start day).
  const startWeek = describeMonday("2026-07-20");
  assert.equal(startWeek.isTermStartWeek, true);

  // Winter break sits between Term 2 (ends 2026-07-03) and Term 3.
  const holiday = describeMonday("2026-07-13");
  assert.equal(holiday.inHoliday, true);
  assert.equal(holiday.note, "School holidays");
});

test("upcomingMondays yields consecutive future Mondays", () => {
  const mondays = upcomingMondays(4, "2026-06-29"); // a Monday
  assert.equal(mondays.length, 4);
  assert.deepEqual(
    mondays.map((m) => m.date),
    ["2026-06-29", "2026-07-06", "2026-07-13", "2026-07-20"],
  );
  assert.ok(mondays.every((m) => isMonday(m.date)));
});

test("billingAnchorTimestamp lands on Monday afternoon Sydney time", () => {
  const ts = billingAnchorTimestamp("2026-07-20");
  const d = new Date(ts * 1000);
  // 03:00 UTC → Monday in Sydney (UTC+10 in July, no DST).
  assert.equal(d.getUTCDay(), 1);
  const sydneyHour = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    hour: "2-digit",
    hour12: false,
  }).format(d);
  assert.equal(Number(sydneyHour), 13);
});

test("nextBreakWithinDays flags an approaching holiday only inside the window", () => {
  // Term 2 2026 ends 2026-07-03; the break starts 2026-07-04.
  const near = nextBreakWithinDays(10, "2026-06-29"); // 5 days before break
  assert.ok(near);
  assert.equal(near?.breakStart, "2026-07-04");

  const far = nextBreakWithinDays(3, "2026-06-29"); // break is 5 days away
  assert.equal(far, null);
});

test("addDays handles month boundaries", () => {
  assert.equal(addDays("2026-07-31", 1), "2026-08-01");
  assert.equal(addDays("2026-01-01", -1), "2025-12-31");
});
