import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BoxPlotView } from "../../../app/course/components/BoxPlotView";
import { DotPlotView } from "../../../app/course/components/DotPlotView";
import { StemAndLeafView } from "../../../app/course/components/StemAndLeafView";
import { collectAllQuestions } from "../../../scripts/seed-question-bank";
import { dataDisplayQuestionVisuals } from "./dataDisplayVisuals";

const expectedAnswers: Record<string, string> = {
  "y8-dat-stm-g2": "6",
  "y8-dat-stm-g3": "11",
  "y8-dat-stm-i2": "21.5",
  "y8-dat-stm-i4": "3",
  "y8-dat-stm-i5": "B",
  "y8-dat-stm-m7": "52",
  "y8-dat-stm-mp1": "7",
  "y8-dat-bxp-g4": "16",
  "y8-dat-bxp-i5": "8 and 16",
  "y8-dat-bxp-m1": "B",
  "y8-dat-bxp-m6": "16",
  "y8-dat-bxp-m7": "4",
  "y8-dat-cmpbxp-i5": "Group B",
  "y8-dat-cmpbxp-m9": "Group A",
  "y8-dat-cmpbxp-m10": "Group A by 10",
  "y8-dat-cmpbxp-mp1": "6",
  "y8-dat-cmp-mp1": "14",
  "y8-dai-sa-g1": "5",
  "y8-dai-sa-i3": "7",
  "y8-dai-sa-mp1": "3",
};

test("Year 8 data visuals contain valid complete datasets and render", () => {
  const visuals = Object.entries(dataDisplayQuestionVisuals);
  assert.equal(visuals.length, 20);

  for (const [questionId, visual] of visuals) {
    const diagrams = [
      visual.boxPlotDiagram,
      visual.dotPlotDiagram,
      visual.stemAndLeafDiagram,
    ].filter(Boolean);
    assert.equal(diagrams.length, 1, `${questionId} must have exactly one diagram type`);
    assert.ok(visual.prompt.length >= 35, `${questionId} needs a specific prompt`);

    const diagram = diagrams[0]!;
    assert.ok(
      diagram.description.length >= 45,
      `${questionId} needs a substantive accessible description`
    );
    assert.doesNotMatch(
      `${visual.prompt} ${diagram.description}`,
      /placeholder|sample question|generic diagram/i
    );

    if (visual.boxPlotDiagram) {
      for (const plot of visual.boxPlotDiagram.plots) {
        const ordered = [plot.min, plot.q1, plot.median, plot.q3, plot.max];
        assert.ok(ordered.every((value) => Number.isFinite(value)));
        assert.deepEqual(ordered, [...ordered].sort((a, b) => a! - b!));
      }
      const markup = renderToStaticMarkup(
        React.createElement(BoxPlotView, { diagram: visual.boxPlotDiagram })
      );
      assert.match(markup, /<svg/);
      assert.match(markup, /<desc/);
      assert.doesNotMatch(markup, /NaN|undefined/);
    }

    if (visual.dotPlotDiagram) {
      const { min, max, values = [] } = visual.dotPlotDiagram;
      assert.ok(values.length > 0, `${questionId} needs dot-plot values`);
      assert.ok(values.every((value) => value >= min && value <= max));
      const markup = renderToStaticMarkup(
        React.createElement(DotPlotView, { diagram: visual.dotPlotDiagram })
      );
      assert.match(markup, /<svg/);
      assert.match(markup, /<title/);
      assert.doesNotMatch(markup, /NaN|undefined/);
    }

    if (visual.stemAndLeafDiagram) {
      assert.ok(visual.stemAndLeafDiagram.rows.length > 0);
      for (const row of visual.stemAndLeafDiagram.rows) {
        for (const leaves of [row.leaves, row.leftLeaves ?? []]) {
          assert.ok(leaves.every((leaf) => Number.isInteger(leaf) && leaf >= 0 && leaf <= 9));
          assert.deepEqual(leaves, [...leaves].sort((a, b) => a - b));
        }
      }
      const markup = renderToStaticMarkup(
        React.createElement(StemAndLeafView, { diagram: visual.stemAndLeafDiagram })
      );
      assert.match(markup, /<table/);
      assert.match(markup, /<caption/);
      assert.doesNotMatch(markup, /undefined/);
    }
  }
});

test("Year 8 data visuals retain their authored answers through seeding", () => {
  const { rows, warnings } = collectAllQuestions(["year-8-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  assert.equal(warnings.length, 0);
  assert.equal(Object.keys(expectedAnswers).length, 20);

  for (const [questionId, expectedAnswer] of Object.entries(expectedAnswers)) {
    const visual = dataDisplayQuestionVisuals[questionId];
    const row = rowsById.get(questionId);
    assert.ok(row, `${questionId} was dropped by question-bank mapping`);
    assert.equal(row.answer, expectedAnswer, `${questionId} answer drifted from its dataset`);
    assert.ok(row.diagram_data, `${questionId} lost its diagram metadata`);

    const expectedType = visual.boxPlotDiagram
      ? "boxPlotDiagram"
      : visual.dotPlotDiagram
        ? "dotPlotDiagram"
        : "stemAndLeafDiagram";
    assert.equal(row.diagram_data.type, expectedType);
  }
});

test("Year 8 data visuals do not leak into shared Year 7 lessons", () => {
  const { rows } = collectAllQuestions(["year-7-mathematics"]);
  const rowsById = new Map(rows.map((row) => [row.source_id, row]));

  for (const questionId of Object.keys(expectedAnswers)) {
    const row = rowsById.get(questionId);
    if (!row) continue;
    assert.equal(row.diagram_data, null, `${questionId} leaked into Year 7`);
  }
});
