import { test } from "node:test";
import assert from "node:assert/strict";
import { isWordedConceptualAnswer } from "./conceptualAnswer";

test("worded/phrase answers qualify for the AI fallback", () => {
  assert.equal(isWordedConceptualAnswer("the principal"), true);
  assert.equal(isWordedConceptualAnswer("compound"), true);
  assert.equal(isWordedConceptualAnswer("strong positive linear association"), true);
  assert.equal(
    isWordedConceptualAnswer(
      "The savings account (compound interest) — interest accumulates on the growing balance."
    ),
    true
  );
  assert.equal(isWordedConceptualAnswer("inverse variation"), true);
});

test("numeric / symbolic answers do NOT qualify (local matcher handles them)", () => {
  assert.equal(isWordedConceptualAnswer("9903"), false);
  assert.equal(isWordedConceptualAnswer("$1200"), false);
  assert.equal(isWordedConceptualAnswer("2.4 ha"), false);
  assert.equal(isWordedConceptualAnswer("y=2x+3"), false);
  assert.equal(isWordedConceptualAnswer("\\tan 22^\\circ = 80/d"), false);
  assert.equal(isWordedConceptualAnswer("36\\pi"), false);
  assert.equal(isWordedConceptualAnswer("2300"), false);
});

test("empty / non-word answers do NOT qualify", () => {
  assert.equal(isWordedConceptualAnswer(""), false);
  assert.equal(isWordedConceptualAnswer("   "), false);
  assert.equal(isWordedConceptualAnswer("A"), false);
  assert.equal(isWordedConceptualAnswer("42"), false);
});
