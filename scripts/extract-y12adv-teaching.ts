// Throwaway read-only extractor: dumps Year 12 Advanced per-lesson teaching content
// (teaching.paragraphs, teaching.latexBlocks, workedExamples, commonMistakes) to the
// scratchpad dir as a manifest + one JSON file per active lesson, for the AI-judge audit.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { year12AdvancedRouteUnits } from "../lib/year12AdvancedRoutes";

const OUT_DIR =
  process.argv[2] ??
  "C:/Users/joshu/AppData/Local/Temp/claude/c--Users-joshu-hsc-maths-coach/5b6c4804-de6b-4c1b-9792-e5beab215340/scratchpad/y12adv-teaching";

mkdirSync(OUT_DIR, { recursive: true });

type ManifestRow = {
  file: string;
  unitSlug: string;
  unitTitle: string;
  lessonSlug: string;
  id: string;
  title: string;
  status: string;
  paragraphs: number;
  latexBlocks: number;
  workedExamples: number;
  commonMistakes: number;
};

const manifest: ManifestRow[] = [];
const skipped: { unitSlug: string; lessonSlug: string; status: string }[] = [];
const usedNames = new Set<string>();
const collisions: { id: string; slug: string; unitSlug: string; titles: string[] }[] = [];

for (const unit of year12AdvancedRouteUnits) {
  for (const lesson of unit.lessons) {
    if (lesson.status !== "active") {
      skipped.push({ unitSlug: unit.slug, lessonSlug: lesson.slug, status: lesson.status });
      continue;
    }

    const payload = {
      course: "year-12-advanced",
      unitSlug: unit.slug,
      unitTitle: unit.title,
      lessonSlug: lesson.slug,
      id: lesson.id,
      title: lesson.title,
      status: lesson.status,
      syllabusArea: lesson.syllabusArea,
      learningIntention: lesson.learningIntention,
      successCriteria: lesson.successCriteria,
      teaching: lesson.teaching,
      workedExamples: lesson.workedExamples.map((w) => ({
        title: w.title,
        questionLatex: w.questionLatex,
        steps: w.steps,
        finalAnswerLatex: w.finalAnswerLatex,
      })),
      commonMistakes: lesson.commonMistakes,
    };

    let baseName = `${unit.slug}__${lesson.slug}`;
    if (usedNames.has(`${baseName}.json`)) {
      collisions.push({ id: lesson.id, slug: lesson.slug, unitSlug: unit.slug, titles: [lesson.title] });
      let n = 2;
      while (usedNames.has(`${baseName}--dup${n}.json`)) n++;
      baseName = `${baseName}--dup${n}`;
    }
    const fileName = `${baseName}.json`;
    usedNames.add(fileName);
    writeFileSync(join(OUT_DIR, fileName), JSON.stringify(payload, null, 2), "utf8");

    manifest.push({
      file: fileName,
      unitSlug: unit.slug,
      unitTitle: unit.title,
      lessonSlug: lesson.slug,
      id: lesson.id,
      title: lesson.title,
      status: lesson.status,
      paragraphs: lesson.teaching.paragraphs.length,
      latexBlocks: lesson.teaching.latexBlocks.length,
      workedExamples: lesson.workedExamples.length,
      commonMistakes: lesson.commonMistakes.length,
    });
  }
}

writeFileSync(
  join(OUT_DIR, "_manifest.json"),
  JSON.stringify({ outDir: OUT_DIR, count: manifest.length, skipped, collisions, lessons: manifest }, null, 2),
  "utf8"
);

const units = new Set(manifest.map((m) => m.unitSlug));
const emptyTeaching = manifest.filter((m) => m.paragraphs === 0 || m.workedExamples === 0);
console.log(`Active lessons extracted: ${manifest.length} across ${units.size} units`);
console.log(`Skipped (non-active): ${skipped.length}`);
console.log(`Lessons with empty paragraphs or workedExamples: ${emptyTeaching.length}`);
if (emptyTeaching.length) {
  console.log(emptyTeaching.map((m) => `  ${m.unitSlug}/${m.lessonSlug} (p=${m.paragraphs}, w=${m.workedExamples})`).join("\n"));
}
console.log(`Output dir: ${OUT_DIR}`);
