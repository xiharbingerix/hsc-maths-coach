import assert from "node:assert/strict";
import test from "node:test";

import { CURRENCY_SENTINEL, tokenizeMathText } from "./mathText";

const mathSegments = (text: string) =>
  tokenizeMathText(text).filter((s) => s.type === "math");

const renderedText = (text: string) =>
  tokenizeMathText(text)
    .map((s) => (s.type === "math" ? `$${s.value}$` : s.value))
    .join("");

test("two currency signs never pair into a maths span", () => {
  const input = "A TV costs $960. A deposit of $160 is paid into 8 payments.";
  // The old bug rendered this as a maths span ("960.Adepositof160").
  assert.deepEqual(mathSegments(input), []);
  // Both dollar signs survive as literal currency in the text.
  assert.equal(renderedText(input), input);
});

test("three currency signs in a row stay as text", () => {
  const input = "Plan A costs $20 plus $0.50 per GB. Plan B is a flat $35.";
  assert.deepEqual(mathSegments(input), []);
  assert.equal(renderedText(input), input);
});

test("real inline maths is still rendered", () => {
  const segments = tokenizeMathText("The area is $x^2$ square units.");
  const maths = segments.filter((s) => s.type === "math");
  assert.equal(maths.length, 1);
  assert.equal(maths[0].value, "x^2");
});

test("currency mixed with real maths keeps both", () => {
  const input = "It costs $5 and the area is $x^2$.";
  const segments = tokenizeMathText(input);
  const maths = segments.filter((s) => s.type === "math");
  assert.equal(maths.length, 1);
  assert.equal(maths[0].value, "x^2");
  // The "$5" currency is preserved literally in the surrounding text.
  assert.ok(segments.some((s) => s.type === "text" && s.value.includes("$5")));
  assert.equal(renderedText(input), input);
});

test("a dollar sign opening a maths coefficient is treated as maths", () => {
  // "$21x^2$" is a maths span (coefficient), not "$21" currency.
  const maths = mathSegments("The expression $21x^2$ expands.");
  assert.equal(maths.length, 1);
  assert.equal(maths[0].value, "21x^2");
});

test("auto-wraps bare subscript/superscript notation", () => {
  const maths = mathSegments("The term T_2 = 18 in the sequence.");
  assert.equal(maths.length, 1);
  assert.match(maths[0].value, /T_2/);
});

test("over-wrapped currency ($25$) does not swallow later maths spans", () => {
  // AI-authored prose sometimes wraps currency in maths delimiters. The old
  // behaviour sentinel-ised the opener but left the closer dangling, which
  // then paired with the NEXT maths opener and rendered half the sentence as
  // one garbled maths span.
  const input =
    "$25$ is the SQUARE of the side, not the side. Always finish with $c = \\sqrt{a^2+b^2}$.";
  const maths = mathSegments(input);
  assert.equal(maths.length, 1);
  assert.equal(maths[0].value, "c = \\sqrt{a^2+b^2}");
  assert.ok(renderedText(input).startsWith("$25 is the SQUARE"));
});

test("over-wrapped decimal currency stays literal", () => {
  const input = "Ignoring the rounding instruction — writing $8.0622$ instead.";
  assert.deepEqual(mathSegments(input), []);
  assert.equal(
    renderedText(input),
    "Ignoring the rounding instruction — writing $8.0622 instead.",
  );
});

test("two over-wrapped currency amounts in one sentence", () => {
  const input = "A deposit of $160$ on a TV costing $960$ leaves the rest owing.";
  assert.deepEqual(mathSegments(input), []);
  assert.equal(
    renderedText(input),
    "A deposit of $160 on a TV costing $960 leaves the rest owing.",
  );
});

test("rendered text contains no leftover sentinel or backslash-dollar", () => {
  const input = "A phone costs $780; a plan is $250 deposit plus $65 each.";
  const text = renderedText(input);
  assert.ok(!text.includes(CURRENCY_SENTINEL), "sentinel leaked into rendered text");
  assert.doesNotMatch(text, /\\\$/);
  assert.equal(text, input);
});
