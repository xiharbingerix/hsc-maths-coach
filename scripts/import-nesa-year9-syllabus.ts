/**
 * Imports the official NESA Mathematics K–10 Syllabus (2022) Stage 5
 * outcomes and content points used by Years 9–10.
 *
 * Run with:
 *   node --import tsx scripts/import-nesa-year9-syllabus.ts
 *
 * NESA publishes Stage 5 as a Core–Paths continuum rather than as separate
 * Year 9 and Year 10 syllabuses. The planner maps this authoritative Stage 5
 * dataset to the app's Year 9 units in lib/syllabus/year9Nesa.ts.
 */
import { writeFile } from "node:fs/promises";
import path from "node:path";

const OUTCOMES_URL =
  "https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-k-10-2022/outcomes";
const CONTENT_BASE_URL =
  "https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-k-10-2022/content/stage-5";
const OUTPUT_PATH = path.resolve(
  "lib/syllabus/year9NesaSyllabus.json",
);

type NesaItem = {
  elements: Record<string, { value?: unknown }>;
  system: {
    codename: string;
    lastModified?: string;
    name: string;
    type: string;
  };
};

type NesaPageData = {
  syllabus: { item: NesaItem; linkedItems: Record<string, NesaItem> };
  focusArea?: { item: NesaItem; linkedItems: Record<string, NesaItem> };
};

function arrayValue(element: { value?: unknown } | undefined): string[] {
  return Array.isArray(element?.value)
    ? element.value.filter((value): value is string => typeof value === "string")
    : [];
}

function textValue(element: { value?: unknown } | undefined): string {
  return typeof element?.value === "string" ? element.value : "";
}

function taxonomyCodenames(element: { value?: unknown } | undefined): string[] {
  if (!Array.isArray(element?.value)) return [];
  return element.value.flatMap((value) =>
    value && typeof value === "object" && "codename" in value
      ? [String(value.codename)]
      : [],
  );
}

function decodeEntities(value: string): string {
  const named: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
    times: "×",
    minus: "−",
  };
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return named[entity.toLowerCase()] ?? match;
  });
}

type MarkupNode = { name: string; children: Array<MarkupNode | string> };

function parseMarkup(markup: string): MarkupNode {
  const root: MarkupNode = { name: "root", children: [] };
  const stack = [root];
  const tokens = markup.match(/<[^>]+>|[^<]+/g) ?? [];

  for (const token of tokens) {
    if (!token.startsWith("<")) {
      stack.at(-1)?.children.push(decodeEntities(token));
      continue;
    }
    if (/^<\//.test(token)) {
      if (stack.length > 1) stack.pop();
      continue;
    }
    if (/^<\?|^<!/.test(token)) continue;
    const name = token.match(/^<\s*([\w:-]+)/)?.[1]?.toLowerCase();
    if (!name) continue;
    const node: MarkupNode = { name, children: [] };
    stack.at(-1)?.children.push(node);
    if (!/\/\s*>$/.test(token)) stack.push(node);
  }
  return root;
}

function renderMarkup(node: MarkupNode | string): string {
  if (typeof node === "string") return node;
  const rendered = node.children.map(renderMarkup);
  const compact = rendered.join("");
  switch (node.name) {
    case "mfrac":
      return `(${rendered[0] ?? ""})/(${rendered[1] ?? ""})`;
    case "msqrt":
      return `√(${compact})`;
    case "mroot":
      return `root(${rendered[0] ?? ""}, ${rendered[1] ?? ""})`;
    case "msup":
      return `${rendered[0] ?? ""}^(${rendered[1] ?? ""})`;
    case "msub":
      return `${rendered[0] ?? ""}_(${rendered[1] ?? ""})`;
    case "msubsup":
      return `${rendered[0] ?? ""}_(${rendered[1] ?? ""})^(${rendered[2] ?? ""})`;
    case "mfenced":
      return `(${compact})`;
    case "mspace":
      return " ";
    case "annotation":
    case "annotation-xml":
      return "";
    default:
      return compact;
  }
}

function resolveEmbeddedComponents(
  html: string,
  linkedItems: Record<string, NesaItem>,
): string {
  return html.replace(
    /<object[^>]+data-codename="([^"]+)"[^>]*><\/object>/g,
    (_match, codename: string) =>
      textValue(linkedItems[codename]?.elements.content),
  );
}

function richTextToPlainText(
  originalHtml: string,
  linkedItems: Record<string, NesaItem>,
): { sourceHtml: string; text: string } {
  const sourceHtml = resolveEmbeddedComponents(originalHtml, linkedItems);
  const withMath = sourceHtml.replace(/<math\b[\s\S]*?<\/math>/gi, (mathml) =>
    renderMarkup(parseMarkup(mathml)),
  );
  const text = decodeEntities(
    withMath
      .replace(/<br\s*\/?\s*>/gi, " ")
      .replace(/<\/p\s*>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/[\u00a0\t ]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
  return { sourceHtml, text };
}

async function readNesaPage(url: string): Promise<NesaPageData> {
  const response = await fetch(url, {
    headers: { "user-agent": "Nova Maths syllabus importer" },
  });
  if (!response.ok) {
    throw new Error(`NESA request failed (${response.status}): ${url}`);
  }
  const html = await response.text();
  const match = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
  );
  if (!match) throw new Error(`NESA data was missing from ${url}`);
  return (JSON.parse(match[1]) as { props: { pageProps: { data: NesaPageData } } })
    .props.pageProps.data;
}

async function main() {
  const outcomesPage = await readNesaPage(OUTCOMES_URL);
  const linked = outcomesPage.syllabus.linkedItems;
  const outcomeItems = Object.values(linked).filter(
    (item) =>
      item.system.type === "outcome" &&
      taxonomyCodenames(item.elements.stages__stages).includes("stage_5") &&
      taxonomyCodenames(item.elements.syllabus_type__items).includes("mainstream"),
  );
  const outcomesByCodename = new Map(outcomeItems.map((item) => [item.system.codename, item]));

  const focusAreaEntries = Object.entries(linked).filter(([, item]) => {
    const isStage5 = taxonomyCodenames(item.elements.stages__stages).includes("stage_5");
    const isMainstream = taxonomyCodenames(item.elements.syllabus_type__items).includes(
      "mainstream",
    );
    return item.system.type === "focusarea" && isStage5 && isMainstream;
  });

  const focusAreas = await Promise.all(
    focusAreaEntries.map(async ([focusAreaId]) => {
      const sourceUrl = `${CONTENT_BASE_URL}/${focusAreaId}`;
      const page = await readNesaPage(sourceUrl);
      if (!page.focusArea) throw new Error(`Focus area missing: ${focusAreaId}`);
      const focus = page.focusArea.item;
      const focusLinked = page.focusArea.linkedItems;
      const outcomeCodename = arrayValue(focus.elements.outcomes).find(
        (codename) => codename !== "mao_wm_01",
      );
      const outcome = outcomeCodename ? outcomesByCodename.get(outcomeCodename) : undefined;
      if (!outcome) throw new Error(`Outcome missing for ${focusAreaId}`);
      const outcomeDescription = richTextToPlainText(
        textValue(outcome.elements.description),
        focusLinked,
      );

      const groups = arrayValue(focus.elements.contentgroups).map((groupId) => {
        const group = focusLinked[groupId];
        if (!group) throw new Error(`Content group ${groupId} missing from ${focusAreaId}`);
        const contentPoints = arrayValue(group.elements.content_items).map((pointId) => {
          const point = focusLinked[pointId];
          if (!point) throw new Error(`Content point ${pointId} missing from ${focusAreaId}`);
          const title = richTextToPlainText(
            textValue(point.elements.title),
            focusLinked,
          );
          const including = richTextToPlainText(
            textValue(point.elements.including_statements),
            focusLinked,
          );
          return {
            id: pointId,
            code: textValue(point.elements.code),
            text: title.text,
            sourceHtml: title.sourceHtml,
            including: including.text || undefined,
            lastModified: point.system.lastModified ?? null,
          };
        });
        return {
          id: groupId,
          code: textValue(group.elements.code),
          title: textValue(group.elements.title),
          contentPoints,
        };
      });

      const outcomeCode = textValue(outcome.elements.code);
      return {
        id: focusAreaId,
        code: textValue(focus.elements.code),
        title: textValue(focus.elements.title),
        classification: outcomeCode.includes("-P-") ? "path" : "core",
        outcome: {
          code: outcomeCode,
          description: outcomeDescription.text,
          sourceHtml: outcomeDescription.sourceHtml,
        },
        groups,
        sourceUrl,
        lastModified: focus.system.lastModified ?? null,
      };
    }),
  );

  focusAreas.sort((a, b) => a.title.localeCompare(b.title));
  const data = {
    syllabus: "Mathematics K–10 Syllabus (2022)",
    authority: "NSW Education Standards Authority (NESA)",
    stage: "Stage 5",
    stageYears: [9, 10],
    structure: "Core–Paths",
    sourceUrl: OUTCOMES_URL,
    importedAt: new Date().toISOString(),
    workingMathematically: {
      code: "MAO-WM-01",
      description:
        richTextToPlainText(
          textValue(outcomesByCodename.get("mao_wm_01")?.elements.description),
          linked,
        ).text,
    },
    focusAreas,
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  const contentPointCount = focusAreas.reduce(
    (total, focus) =>
      total + focus.groups.reduce((subtotal, group) => subtotal + group.contentPoints.length, 0),
    0,
  );
  console.log(
    `Imported ${focusAreas.length} Stage 5 focus areas and ${contentPointCount} content points from NESA to ${OUTPUT_PATH}`,
  );
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
