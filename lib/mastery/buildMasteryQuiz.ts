import type {
  ExplicitLesson,
  PracticeQuestion,
} from "../lessons/differentialCalculus";

/**
 * Mastery-quiz selection.
 *
 * A lesson may carry a large `masteryQuizPool` (~30–40 difficulty-tagged
 * questions). Each quiz attempt draws a fresh set of `length` questions, one per
 * slot, with the target difficulty ramping easy→hard across the slots. The draw
 * is seeded so it's stable within an attempt but varies between attempts (so
 * retakes differ and answers are harder to memorise).
 *
 * If the lesson has no pool, the fixed `masteryQuiz` array is returned unchanged
 * — so every existing lesson keeps its current behaviour.
 */

const DEFAULT_QUIZ_LENGTH = 10;
const DEFAULT_DIFFICULTY = 3;

type QuizLesson = Pick<ExplicitLesson, "masteryQuiz" | "masteryQuizPool">;

export function questionDifficulty(question: PracticeQuestion): number {
  return typeof question.difficulty === "number"
    ? question.difficulty
    : DEFAULT_DIFFICULTY;
}

// Small deterministic PRNG (mulberry32) so a given seed always yields the same
// quiz, while different seeds shuffle the pool differently.
function makeRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace<T>(items: T[], rng: () => number): void {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
}

export type BuildMasteryQuizOptions = {
  /** Seed for the per-attempt draw. Same seed → same quiz. */
  seed?: number;
  /** How many questions to draw. Defaults to the fixed quiz length, else 10. */
  length?: number;
};

export function buildMasteryQuiz(
  lesson: QuizLesson,
  options: BuildMasteryQuizOptions = {}
): PracticeQuestion[] {
  const pool = lesson.masteryQuizPool;
  const fixed = lesson.masteryQuiz ?? [];

  // No pool → keep the existing fixed quiz exactly as authored.
  if (!pool || pool.length === 0) {
    return fixed;
  }

  const targetLength = options.length ?? (fixed.length || DEFAULT_QUIZ_LENGTH);
  const length = Math.min(targetLength, pool.length);
  const rng = makeRng((options.seed ?? 1) >>> 0);

  const difficulties = pool.map(questionDifficulty);
  const minDifficulty = Math.min(...difficulties);
  const maxDifficulty = Math.max(...difficulties);

  // Bucket the pool by difficulty and shuffle each bucket so the draw varies.
  const buckets = new Map<number, PracticeQuestion[]>();
  for (const question of pool) {
    const d = questionDifficulty(question);
    const bucket = buckets.get(d);
    if (bucket) bucket.push(question);
    else buckets.set(d, [question]);
  }
  for (const bucket of buckets.values()) shuffleInPlace(bucket, rng);

  // Take an unused question at (or nearest to) the target difficulty.
  const takeNearest = (target: number): PracticeQuestion | undefined => {
    const span = maxDifficulty - minDifficulty;
    for (let radius = 0; radius <= span; radius++) {
      for (const candidate of radius === 0 ? [target] : [target - radius, target + radius]) {
        if (candidate < minDifficulty || candidate > maxDifficulty) continue;
        const bucket = buckets.get(candidate);
        if (bucket && bucket.length > 0) return bucket.pop();
      }
    }
    return undefined;
  };

  const chosen: PracticeQuestion[] = [];
  for (let slot = 0; slot < length; slot++) {
    // Ramp the target difficulty linearly from min (first slot) to max (last).
    const t = length === 1 ? 0 : slot / (length - 1);
    const target = Math.round(minDifficulty + t * (maxDifficulty - minDifficulty));
    const question = takeNearest(target);
    if (question) chosen.push(question);
  }

  return chosen;
}
