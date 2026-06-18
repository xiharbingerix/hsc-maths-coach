import type {
  ExplicitLesson,
  LessonOutlineItem,
} from "./lessons/differentialCalculus";
import { courseUnits } from "./courseUnits";
import {
  applicationsDifferentiationLessons,
} from "./lessons/applicationsDifferentiation";
import {
  applicationsOfCalculusGapsLessons,
} from "./lessons/applicationsOfCalculusGaps";
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
  ...applicationsOfCalculusGapsLessons,
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
];

function lessonsForModuleSlugs(
  moduleSlugs: string[],
  excludeLessonSlugs: string[] = []
): ExplicitLesson[] {
  const excluded = new Set(excludeLessonSlugs);

  return allAdvancedLessons.filter(
    (lesson) =>
      moduleSlugs.includes(lesson.moduleSlug) && !excluded.has(lesson.slug)
  );
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
    const lessons = lessonsForModuleSlugs(
      unit.lessonModuleSlugs ?? [slug],
      unit.excludeLessonSlugs
    );

    if (lessons.length === 0) {
      return [];
    }

    return [
      {
        slug,
        title: unit.title,
        description: unit.description,
        activeLessonCount: lessons.length,
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
