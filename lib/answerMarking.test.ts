import { describe, expect, it } from "vitest";
import { markTypedAnswer } from "./answerMarking";

function mark(userAnswer: string, correctAnswer: string, acceptedAnswers: string[] = []) {
  return markTypedAnswer({ userAnswer, correctAnswer, acceptedAnswers }).correct;
}

describe("markTypedAnswer — derivative prefix stripping", () => {
  it("bare expression matches itself", () => {
    expect(mark("2x", "2x")).toBe(true);
  });

  it("y' = expr matches bare expr", () => {
    expect(mark("y' = 2x", "2x")).toBe(true);
  });

  it("y'' = expr matches bare expr", () => {
    expect(mark("y'' = 6x", "6x")).toBe(true);
  });

  it("f'(x) = expr matches bare expr", () => {
    expect(mark("f'(x) = 2x", "2x")).toBe(true);
  });

  it("dy/dx = expr matches bare expr", () => {
    expect(mark("dy/dx = 2x", "2x")).toBe(true);
  });

  it("y = expr matches bare expr", () => {
    expect(mark("y = 2x", "2x")).toBe(true);
  });

  it("Unicode prime ′ is treated same as ASCII apostrophe", () => {
    expect(mark("y′ = 2x", "2x")).toBe(true);
  });

  it("wrong expression is still wrong even with prefix", () => {
    expect(mark("y' = 3x", "2x")).toBe(false);
  });
});

describe("markTypedAnswer — inequality/symbol normalisation", () => {
  it("≠ matches !=", () => {
    expect(mark("x≠0", "x!=0")).toBe(true);
  });

  it("≤ matches <=", () => {
    expect(mark("x≤5", "x<=5")).toBe(true);
  });

  it("≥ matches >=", () => {
    expect(mark("x≥0", "x>=0")).toBe(true);
  });

  it("\\neq matches !=", () => {
    expect(mark("x\\neq0", "x!=0")).toBe(true);
  });
});

describe("markTypedAnswer — existing behaviour preserved", () => {
  it("exact match", () => {
    expect(mark("42", "42")).toBe(true);
  });

  it("acceptedAnswers match", () => {
    expect(mark("1/2", "0.5", ["1/2"])).toBe(true);
  });

  it("normalised numeric match", () => {
    expect(mark("0.5 ", "0.5")).toBe(true);
  });

  it("coordinate match", () => {
    expect(mark("(3, -1)", "(3, -1)")).toBe(true);
  });

  it("solution set — order independent", () => {
    expect(mark("x = -4 or x = 1", "x = 1 or x = -4")).toBe(true);
  });

  it("pi normalisation", () => {
    expect(mark("π", "pi")).toBe(true);
  });
});
