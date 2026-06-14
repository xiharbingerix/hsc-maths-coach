import type {
  ExplicitLesson,
  LessonOutlineItem,
} from "./lessons/differentialCalculus";
import { courseUnits } from "./courseUnits";
import {
  applicationsDifferentiationLessons,
  applicationsDifferentiationOutline,
} from "./lessons/applicationsDifferentiation";
import {
  differentialCalculusLessons,
  differentialCalculusOutline,
} from "./lessons/differentialCalculus";
import {
  differentiationTechniquesLessons,
  differentiationTechniquesOutline,
} from "./lessons/differentiationTechniques";
import {
  exponentialLogarithmicFunctionsLessons,
  exponentialLogarithmicFunctionsOutline,
} from "./lessons/exponentialLogarithmicFunctions";
import {
  financialMathematicsLessons,
  financialMathematicsOutline,
} from "./lessons/financialMathematics";
import {
  functionsGraphingTechniquesLessons,
  functionsGraphingTechniquesOutline,
} from "./lessons/functionsGraphingTechniques";
import {
  furtherIntegralCalculusLessons,
  furtherIntegralCalculusOutline,
} from "./lessons/furtherIntegralCalculus";
import {
  furtherTrigonometryLessons,
  furtherTrigonometryOutline,
} from "./lessons/furtherTrigonometry";
import {
  integralCalculusLessons,
  integralCalculusOutline,
} from "./lessons/integralCalculus";
import {
  sequencesSeriesFinancialMathsLessons,
  sequencesSeriesFinancialMathsOutline,
} from "./lessons/sequencesSeriesFinancialMaths";
import {
  statisticalAnalysisLessons,
  statisticalAnalysisOutline,
} from "./lessons/statisticalAnalysis";
import {
  probabilityLessons,
  probabilityOutline,
} from "./lessons/probability";
import {
  trigonometricFunctionsGraphsLessons,
  trigonometricFunctionsGraphsOutline,
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

const lessonContentByUnitSlug = new Map<
  string,
  { outline: LessonOutlineItem[]; lessons: ExplicitLesson[] }
>([
  [
    "differential-calculus",
    { outline: differentialCalculusOutline, lessons: differentialCalculusLessons },
  ],
  [
    "differentiation-techniques",
    {
      outline: differentiationTechniquesOutline,
      lessons: differentiationTechniquesLessons,
    },
  ],
  [
    "applications-differentiation",
    {
      outline: applicationsDifferentiationOutline,
      lessons: applicationsDifferentiationLessons,
    },
  ],
  ["integral-calculus", { outline: integralCalculusOutline, lessons: integralCalculusLessons }],
  [
    "further-integral-calculus",
    {
      outline: furtherIntegralCalculusOutline,
      lessons: furtherIntegralCalculusLessons,
    },
  ],
  [
    "functions-graphing-techniques",
    {
      outline: functionsGraphingTechniquesOutline,
      lessons: functionsGraphingTechniquesLessons,
    },
  ],
  [
    "trigonometric-functions-graphs",
    {
      outline: trigonometricFunctionsGraphsOutline,
      lessons: trigonometricFunctionsGraphsLessons,
    },
  ],
  [
    "further-trigonometry",
    { outline: furtherTrigonometryOutline, lessons: furtherTrigonometryLessons },
  ],
  [
    "exponential-logarithmic-functions",
    {
      outline: exponentialLogarithmicFunctionsOutline,
      lessons: exponentialLogarithmicFunctionsLessons,
    },
  ],
  [
    "sequences-series-financial-maths",
    {
      outline: sequencesSeriesFinancialMathsOutline,
      lessons: sequencesSeriesFinancialMathsLessons,
    },
  ],
  [
    "financial-mathematics",
    { outline: financialMathematicsOutline, lessons: financialMathematicsLessons },
  ],
  [
    "statistical-analysis",
    { outline: statisticalAnalysisOutline, lessons: statisticalAnalysisLessons },
  ],
  [
    "probability",
    { outline: probabilityOutline, lessons: probabilityLessons },
  ],
]);

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
    const content = lessonContentByUnitSlug.get(slug);

    if (!content) {
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
        outline: content.outline,
        lessons: content.lessons,
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
