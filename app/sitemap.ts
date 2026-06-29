import type { MetadataRoute } from "next";
import { courseCatalogue } from "../lib/courseUnits";
import {
  getNewCourse,
  isVisibleCourseLesson,
} from "../lib/newCourseCatalog";
import { year12AdvancedRouteUnits } from "../lib/year12AdvancedRoutes";
import { SITE_ORIGIN } from "../lib/siteMetadata";

const marketingPaths = [
  "",
  "/hsc-maths",
  "/online-learning",
  "/course",
  "/free-year-7-algebra",
  "/sample-hsc-lesson",
  "/diagnostic/select",
  "/exam",
  "/enquire",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set(marketingPaths);

  for (const catalogueCourse of courseCatalogue) {
    const courseSlug = catalogueCourse.courseSlug;
    paths.add(`/course/${courseSlug}`);

    if (courseSlug === "year-12-advanced") {
      for (const unit of year12AdvancedRouteUnits) {
        paths.add(`/course/${courseSlug}/${unit.slug}`);
        for (const lesson of unit.lessons) {
          paths.add(`/course/${courseSlug}/${unit.slug}/${lesson.slug}`);
        }
      }
      continue;
    }

    const course = getNewCourse(courseSlug);
    if (!course) continue;

    for (const unit of course.units) {
      const lessons = unit.lessons.filter(isVisibleCourseLesson);
      if (lessons.length === 0) continue;

      paths.add(`/course/${courseSlug}/${unit.slug}`);
      for (const lesson of lessons) {
        paths.add(`/course/${courseSlug}/${unit.slug}/${lesson.slug}`);
      }
    }
  }

  return [...paths].map((path) => ({
    url: new URL(path || "/", SITE_ORIGIN).toString(),
  }));
}
