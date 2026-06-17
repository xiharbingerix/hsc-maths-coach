import { buildMasteryQuiz, questionDifficulty } from "../lib/mastery/buildMasteryQuiz";
import type { PracticeQuestion } from "../lib/lessons/differentialCalculus";

// Deterministic, zero-dependency checks for the mastery-quiz pool selector.

let failures = 0;
function check(name: string, ok: boolean, detail = "") {
  console.log(`  ${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

function q(id: string, difficulty: number): PracticeQuestion {
  return { id, prompt: id, latex: id, answer: "0", difficulty };
}

// Pool: 8 questions per difficulty 1..5 = 40.
const pool: PracticeQuestion[] = [];
for (let d = 1; d <= 5; d++) {
  for (let i = 0; i < 8; i++) pool.push(q(`d${d}-${i}`, d));
}
const fixed: PracticeQuestion[] = Array.from({ length: 10 }, (_, i) =>
  q(`fixed-${i}`, 3)
);

console.log("Mastery quiz selector");

// 1. No pool → fixed quiz returned unchanged.
const noPool = buildMasteryQuiz({ masteryQuiz: fixed });
check(
  "no pool returns the fixed quiz unchanged",
  noPool === fixed && noPool.length === 10
);

// 2. With a pool → draws exactly the fixed length, all unique, all from pool.
const drawn = buildMasteryQuiz({ masteryQuiz: fixed, masteryQuizPool: pool }, { seed: 1 });
const ids = new Set(drawn.map((x) => x.id));
const poolIds = new Set(pool.map((x) => x.id));
check("draws the fixed quiz length (10)", drawn.length === 10, `got ${drawn.length}`);
check("no repeats within an attempt", ids.size === drawn.length);
check("every drawn question comes from the pool", drawn.every((x) => poolIds.has(x.id)));

// 3. Difficulty ramps easy→hard (non-decreasing across slots).
const diffs = drawn.map(questionDifficulty);
const ramped = diffs.every((d, i) => i === 0 || d >= diffs[i - 1]);
check("difficulty ramps easy→hard", ramped, `[${diffs.join(", ")}]`);
check("first slot easier than last", diffs[0] < diffs[diffs.length - 1]);

// 4. Different seeds vary the selection (not memorisable).
const a = buildMasteryQuiz({ masteryQuiz: fixed, masteryQuizPool: pool }, { seed: 1 });
const b = buildMasteryQuiz({ masteryQuiz: fixed, masteryQuizPool: pool }, { seed: 2 });
check(
  "different seeds produce a different draw",
  a.map((x) => x.id).join() !== b.map((x) => x.id).join()
);

// 5. Same seed is stable (deterministic within an attempt).
const a2 = buildMasteryQuiz({ masteryQuiz: fixed, masteryQuizPool: pool }, { seed: 1 });
check("same seed is deterministic", a.map((x) => x.id).join() === a2.map((x) => x.id).join());

// 6. Pool smaller than quiz length → uses the whole pool, still ramped.
const tiny = [q("a", 1), q("b", 2), q("c", 3)];
const tinyDraw = buildMasteryQuiz({ masteryQuiz: fixed, masteryQuizPool: tiny }, { seed: 5 });
check("pool smaller than length uses the whole pool", tinyDraw.length === 3);

if (failures > 0) {
  console.error(`\nFAIL: ${failures} mastery-quiz check(s) failed.`);
  process.exitCode = 1;
} else {
  console.log("\nPASS: mastery-quiz selector checks passed.");
}
