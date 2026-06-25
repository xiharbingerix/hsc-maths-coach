import { test } from "node:test";
import assert from "node:assert/strict";
import { markTypedAnswer } from "./answerMarking";

function mark(userAnswer: string, correctAnswer: string, acceptedAnswers: string[] = []) {
  return markTypedAnswer({ userAnswer, correctAnswer, acceptedAnswers }).correct;
}

// derivative prefix stripping
test("bare expression matches itself", () => assert.equal(mark("2x", "2x"), true));
test("y' = expr matches bare expr", () => assert.equal(mark("y' = 2x", "2x"), true));
test("y'' = expr matches bare expr", () => assert.equal(mark("y'' = 6x", "6x"), true));
test("f'(x) = expr matches bare expr", () => assert.equal(mark("f'(x) = 2x", "2x"), true));
test("dy/dx = expr matches bare expr", () => assert.equal(mark("dy/dx = 2x", "2x"), true));
test("y = expr matches bare expr", () => assert.equal(mark("y = 2x", "2x"), true));
test("Unicode prime is treated same as ASCII apostrophe", () => assert.equal(mark("y′ = 2x", "2x"), true));
test("wrong expression is still wrong even with prefix", () => assert.equal(mark("y' = 3x", "2x"), false));

// LaTeX normalisation (MathLive output)
test("\\frac{1}{2} matches 1/2", () => assert.equal(mark("\\frac{1}{2}", "1/2"), true));
test("\\frac{3x}{4} matches 3x/4", () => assert.equal(mark("\\frac{3x}{4}", "3x/4"), true));
test("x^{2} matches x^2", () => assert.equal(mark("x^{2}", "x^2"), true));
test("\\sqrt{x} matches sqrt(x)", () => assert.equal(mark("\\sqrt{x}", "sqrt(x)"), true));
test("\\pi matches pi", () => assert.equal(mark("\\pi", "pi"), true));
test("\\theta matches theta", () => assert.equal(mark("\\theta", "theta"), true));
test("\\infty matches infinity", () => assert.equal(mark("\\infty", "infinity"), true));
test("\\left(x+1\\right) matches (x+1)", () => assert.equal(mark("\\left(x+1\\right)", "(x+1)"), true));

// inequality/symbol normalisation
test("not-equal matches !=", () => assert.equal(mark("x≠0", "x!=0"), true));
test("<= symbol matches <=", () => assert.equal(mark("x≤5", "x<=5"), true));
test(">= symbol matches >=", () => assert.equal(mark("x≥0", "x>=0"), true));
test("\\neq matches !=", () => assert.equal(mark("x\\neq0", "x!=0"), true));

// existing behaviour preserved
test("exact match", () => assert.equal(mark("42", "42"), true));
test("acceptedAnswers match", () => assert.equal(mark("1/2", "0.5", ["1/2"]), true));
test("normalised numeric match", () => assert.equal(mark("0.5 ", "0.5"), true));
test("coordinate match", () => assert.equal(mark("(3, -1)", "(3, -1)"), true));
test("solution set — order independent", () => assert.equal(mark("x = -4 or x = 1", "x = 1 or x = -4"), true));
test("pi normalisation", () => assert.equal(mark("π", "pi"), true));
