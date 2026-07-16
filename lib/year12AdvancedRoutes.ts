import type {
  ExplicitLesson,
  LessonOutlineItem,
} from "./lessons/differentialCalculus";
import { courseUnits } from "./courseUnits";
import {
  applicationsDifferentiationLessons,
} from "./lessons/applicationsDifferentiation";
import {
  differentialCalculusLessons,
} from "./lessons/differentialCalculus";
import {
  differentiationTechniquesLessons,
} from "./lessons/differentiationTechniques";
import {
  exponentialLogarithmicFunctionsLessons,
} from "./lessons/exponentialLogarithmicFunctions";
import {
  financialMathematicsLessons,
} from "./lessons/financialMathematics";
import {
  functionsGraphingTechniquesLessons,
} from "./lessons/functionsGraphingTechniques";
import {
  furtherIntegralCalculusLessons,
} from "./lessons/furtherIntegralCalculus";
import {
  furtherTrigonometryLessons,
} from "./lessons/furtherTrigonometry";
import {
  integralCalculusLessons,
} from "./lessons/integralCalculus";
import {
  sequencesSeriesFinancialMathsLessons,
} from "./lessons/sequencesSeriesFinancialMaths";
import {
  statisticalAnalysisLessons,
} from "./lessons/statisticalAnalysis";
import {
  probabilityLessons,
} from "./lessons/probability";
import {
  year12AdvancedRandomVariablesLessons,
} from "./lessons/year12AdvancedRandomVariables";
import {
  trigonometricFunctionsGraphsLessons,
} from "./lessons/trigonometricFunctionsGraphs";

export type Year12AdvancedRouteUnit = {
  slug: string;
  title: string;
  description: string;
  activeLessonCount: number;
  legacyHref: string;
  nestedHref: string;
  outline: LessonOutlineItem[];
  lessons: ExplicitLesson[];
};

const allAdvancedLessons: ExplicitLesson[] = [
  ...differentialCalculusLessons,
  ...differentiationTechniquesLessons,
  ...applicationsDifferentiationLessons,
  ...integralCalculusLessons,
  ...furtherIntegralCalculusLessons,
  ...functionsGraphingTechniquesLessons,
  ...trigonometricFunctionsGraphsLessons,
  ...furtherTrigonometryLessons,
  ...exponentialLogarithmicFunctionsLessons,
  ...sequencesSeriesFinancialMathsLessons,
  ...financialMathematicsLessons,
  ...statisticalAnalysisLessons,
  ...probabilityLessons,
  ...year12AdvancedRandomVariablesLessons,
];

function lessonsBySlug(slug: string): ExplicitLesson[] {
  return allAdvancedLessons.filter((l) => l.moduleSlug === slug);
}

function buildOutline(lessons: ExplicitLesson[]): LessonOutlineItem[] {
  return lessons.map((l) => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    description: l.description,
    status: l.status,
  }));
}

export function year12AdvancedNestedUnitHref(unitSlug: string) {
  return `/course/year-12-advanced/${unitSlug}`;
}

export function year12AdvancedNestedLessonHref(
  unitSlug: string,
  lessonSlug: string
) {
  return `${year12AdvancedNestedUnitHref(unitSlug)}/${lessonSlug}`;
}

export const year12AdvancedRouteUnits: Year12AdvancedRouteUnit[] =
  courseUnits.flatMap((unit) => {
    const slug = unit.href.replace("/course/", "");
    const lessons = lessonsBySlug(slug);

    if (lessons.length === 0) {
      return [];
    }

    return [
      {
        slug,
        title: unit.title,
        description: unit.description,
        activeLessonCount: unit.activeLessonCount,
        legacyHref: unit.href,
        nestedHref: year12AdvancedNestedUnitHref(slug),
        outline: buildOutline(lessons),
        lessons,
      },
    ];
  });

export function getYear12AdvancedRouteUnit(unitSlug: string) {
  return year12AdvancedRouteUnits.find((unit) => unit.slug === unitSlug);
}

export function getYear12AdvancedRouteLesson(
  unitSlug: string,
  lessonSlug: string
) {
  return getYear12AdvancedRouteUnit(unitSlug)?.lessons.find(
    (lesson) => lesson.slug === lessonSlug
  );
}
