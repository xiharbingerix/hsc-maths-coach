import { diagnosticData as y7Data } from "./year-7-mathematics";
import { diagnosticData as y8Data } from "./year-8-mathematics";
import { diagnosticData as y9AdvData } from "./year-9-mathematics-advanced";
import { diagnosticData as y9CoreData } from "./year-9-mathematics-core";
import { diagnosticData as y10AdvData } from "./year-10-mathematics-advanced";
import { diagnosticData as y10CoreData } from "./year-10-mathematics-core";
import { diagnosticData as y11StdData } from "./year-11-standard";
import { diagnosticData as y11AdvData } from "./year-11-advanced";
import { diagnosticData as y11ExtData } from "./year-11-extension";
import { diagnosticData as y12AdvancedData } from "./year-12-advanced";
import { diagnosticData as y12Std1Data } from "./year-12-standard-1";
import { diagnosticData as y12Std2Data } from "./year-12-standard-2";
import { diagnosticData as y12Ext1Data } from "./year-12-extension-1";
import { diagnosticData as y12Ext2Data } from "./year-12-extension-2";
import type { DiagnosticData } from "./types";

export const diagnosticDataByCourseSlug: Record<string, DiagnosticData> = {
  "year-7-mathematics": y7Data,
  "year-8-mathematics": y8Data,
  "year-9-mathematics-advanced": y9AdvData,
  "year-9-mathematics-core": y9CoreData,
  "year-10-mathematics-advanced": y10AdvData,
  "year-10-mathematics-core": y10CoreData,
  "year-11-standard": y11StdData,
  "year-11-advanced": y11AdvData,
  "year-11-extension": y11ExtData,
  "year-12-standard-2": y12Std2Data,
  "year-12-standard-1": y12Std1Data,
  "year-12-advanced": y12AdvancedData,
  "year-12-extension-1": y12Ext1Data,
  "year-12-extension-2": y12Ext2Data,
};

export const visibleDiagnosticCourseSlugs = [
  "year-7-mathematics",
  "year-8-mathematics",
  "year-9-mathematics-core",
  "year-9-mathematics-advanced",
  "year-10-mathematics-core",
  "year-10-mathematics-advanced",
  "year-11-standard",
  "year-11-advanced",
  "year-11-extension",
  "year-12-standard-1",
  "year-12-standard-2",
  "year-12-advanced",
  "year-12-extension-1",
  "year-12-extension-2",
] as const;

export const visibleDiagnostics = visibleDiagnosticCourseSlugs.map((slug) => ({
  slug,
  label: diagnosticDataByCourseSlug[slug].yearLevelTitle,
}));
