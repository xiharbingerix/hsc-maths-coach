import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import * as ts from "typescript";

const SOURCE_ROOTS = [
  "lib/lessons",
  "lib/challenges",
  "lib/diagnostics",
  "lib/exams",
];

function sourceFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) return sourceFiles(fullPath);
    if (!entry.name.endsWith(".ts") || entry.name.endsWith(".test.ts")) {
      return [];
    }
    return [fullPath];
  });
}

function malformedStringEscapes(file: string): string[] {
  const source = readFileSync(file, "utf8");
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
  );
  const findings: string[] = [];

  function visit(node: ts.Node) {
    if (
      ts.isStringLiteral(node) ||
      ts.isNoSubstitutionTemplateLiteral(node)
    ) {
      const raw = node.getText(sourceFile);
      for (const match of raw.matchAll(/\\+/g)) {
        if (match[0].length % 2 === 0) continue;
        const escapeEnd = (match.index ?? 0) + match[0].length;
        const remainder = raw.slice(escapeEnd);
        // Unicode escapes are intentional JavaScript escapes. LaTeX commands
        // must contain an even number of source backslashes so one survives at
        // runtime (for example, "\\\\text" becomes "\\text").
        if (/^u(?:[0-9a-f]{4}|\{[0-9a-f]+\})/i.test(remainder)) continue;

        const { line } = sourceFile.getLineAndCharacterOfPosition(
          node.getStart(sourceFile),
        );
        findings.push(
          `${path.relative(process.cwd(), file)}:${line + 1} contains a single-escaped backslash in ${raw.slice(0, 100)}`,
        );
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return findings;
}

test("question source strings preserve LaTeX backslashes", () => {
  const findings = SOURCE_ROOTS.flatMap((root) =>
    sourceFiles(path.join(process.cwd(), root)).flatMap(malformedStringEscapes),
  );

  assert.deepEqual(findings, []);
});
