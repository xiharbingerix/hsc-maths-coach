import type { PracticeQuestion } from "../differentialCalculus";
import { workingFunctionsQualityAdvanced } from "./workingFunctionsQualityAdvanced";
import { workingFunctionsQualityAlgebra } from "./workingFunctionsQualityAlgebra";
import { workingFunctionsQualityCore } from "./workingFunctionsQualityCore";
import { workingFunctionsQualityModels } from "./workingFunctionsQualityModels";

const masteryBySlug = {
  ...workingFunctionsQualityCore,
  ...workingFunctionsQualityAlgebra,
  ...workingFunctionsQualityModels,
  ...workingFunctionsQualityAdvanced,
};

export const WORKING_FUNCTIONS_QUALITY_SLUGS = Object.freeze(
  Object.keys(masteryBySlug),
);

export function getWorkingFunctionsQualityMastery(
  lessonSlug: string,
): PracticeQuestion[] | undefined {
  return masteryBySlug[lessonSlug];
}
