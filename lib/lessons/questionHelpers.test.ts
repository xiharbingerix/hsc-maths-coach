import assert from "node:assert/strict";
import test from "node:test";

import {
  formatChoiceText,
  isGenericMcqInstructionLatex,
} from "./questionHelpers";

test("recognises generic MCQ selection instructions", () => {
  assert.equal(isGenericMcqInstructionLatex("\\text{Select A, B, C, or D.}"), true);
  assert.equal(isGenericMcqInstructionLatex("\\text{Select A, B, C or D.}"), true);
  assert.equal(isGenericMcqInstructionLatex("\\text{select A B C or D}"), true);
});

test("preserves meaningful MCQ latex", () => {
  assert.equal(isGenericMcqInstructionLatex("x^2+3x+2"), false);
  assert.equal(isGenericMcqInstructionLatex("\\text{Choose the equivalent expression.}"), false);
  assert.equal(isGenericMcqInstructionLatex(""), false);
  assert.equal(isGenericMcqInstructionLatex(null), false);
});

test("formatChoiceText preserves authored LaTeX spacing commands", () => {
  assert.equal(formatChoiceText("x=-2,\\ y=-4"), "$x=-2,\\,y=-4$");
});

test("formatChoiceText keeps a spaced negative fraction valid", () => {
  assert.equal(
    formatChoiceText("x=2,\\ -\\frac12"),
    "$x=2,\\,-\\frac12$",
  );
});
