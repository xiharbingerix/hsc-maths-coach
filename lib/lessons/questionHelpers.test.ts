import assert from "node:assert/strict";
import test from "node:test";
import { isGenericMcqInstructionLatex } from "./questionHelpers";

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
