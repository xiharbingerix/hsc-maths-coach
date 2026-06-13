# Year 11 Advanced Trig Phase 2 Visual Tech Audit

Created: 2026-06-13  
Scope: visual and technical readiness for Phase 2 of `year-11-advanced / trigonometry-measure-angles`.  
Status: audit only. Do not implement Phase 2 lesson content from this document without a separate implementation task.

## Phase 2 Slots

Phase 1 is implemented:

- `degrees-and-radians-concept`
- `converting-degrees-radians`
- `converting-radians-degrees`
- `arc-length-radian-measure`
- `sector-area-radian-measure`

Legacy broad lessons remain route-resolvable but hidden/seed-skipped:

- `radians-exact-trigonometric-values`
- `unit-circle-trigonometric-graphs`

Remaining Phase 2 slots:

- `exact-trig-values-special-triangles`
- `exact-trig-values-unit-circle`
- `unit-circle-all-quadrants`
- `graphing-sin-cos-tan`

## Current Visual Payload Inventory

The source visual types are in `lib/lessons/types.ts`. The shared renderer is `app/components/VisualPayloadRenderer.tsx`, with view components in `app/course/components/`.

Currently supported rendered payloads:

| Payload field | Type | Renderer | Seed support | Audit support |
|---|---|---|---|---|
| `diagram` | `NetworkDiagram` | `NetworkDiagramView` | Yes, as `networkDiagram` | Yes |
| `triangleDiagram` | `TriangleDiagram` | `TriangleDiagramView` | Yes | Yes |
| `cartesianGraph` | `CartesianGraph` | `CartesianGraphView` | Yes | Yes |
| `argandDiagram` | `ArgandDiagram` | `ArgandDiagramView` | Yes | Yes |
| `vector3DDiagram` | `Vector3DDiagram` | `Vector3DDiagramView` | Yes | Yes |
| `trapezoidalRuleDiagram` | `TrapezoidalRuleDiagram` | `TrapezoidalRuleView` | Yes | Yes |
| `boxPlotDiagram` | `BoxPlotDiagram` | `BoxPlotView` | Yes | Yes |
| `normalDistributionDiagram` | `NormalDistributionDiagram` | `NormalDistributionView` | Yes | Yes |
| `probabilityTreeDiagram` | `ProbabilityTreeDiagram` | `ProbabilityTreeView` | Yes | Yes |
| `twoWayTableDiagram` | `TwoWayTableDiagram` | `TwoWayTableView` | Yes | Yes |
| `vennDiagram` | `VennDiagram` | `VennDiagramView` | Yes | Yes |

`lib/lessonMaker.ts` also carries all of these fields through tutor questions/worked examples.

No current payload exists for:

- `unitCircleDiagram`
- `sectorDiagram`
- `trigGraphDiagram`

Adding a new payload type requires coordinated updates to:

- `lib/lessons/types.ts`
- `app/components/VisualPayloadRenderer.tsx`
- a new or updated component in `app/course/components/`
- `lib/lessonMaker.ts`
- `scripts/audit-lessons.ts`
- `scripts/seed-question-bank.ts`

## CartesianGraph Capability Check

`CartesianGraph` currently supports:

- numeric bounds: `xMin`, `xMax`, `yMin`, `yMax`
- numeric tick spacing: `xStep`, `yStep`
- axis labels: `xAxisLabel`, `yAxisLabel`
- `points`
- `lineSegments`
- linear `lines`
- quadratic `parabolas`
- `circles`
- `sinusoidals` with `kind: "sin" | "cos" | "tan"`
- shaded regions for line/quadratic functions

Existing examples in `lib/lessons/trigonometricFunctionsGraphs.ts` already use:

- `y = sin x` with `xMin: 0`, `xMax: 2 * Math.PI`, `xStep: Math.PI / 2`
- `y = cos x` with the same radian domain
- `y = tan x` with `xMin: -Math.PI`, `xMax: Math.PI`
- transformed sine/cosine/tangent models
- `xAxisLabel: "x (radians)"`

### y = sin x

Supported. `sinusoidals` renders sampled sine curves safely.

### y = cos x

Supported. `sinusoidals` renders sampled cosine curves safely.

### y = tan x

Partly supported. `CartesianGraphView` deliberately breaks tangent paths near asymptotes by detecting near-zero cosine values and large jumps, so it avoids drawing misleading connected vertical jumps.

Gap: tangent asymptotes are not explicitly drawn or labelled. `lineSegments` could fake vertical markers, but they are solid teal and not semantically treated as asymptotes. The `lines` field cannot represent vertical lines.

### x-axis labelled in radians

Partly supported. `xAxisLabel` can say `x (radians)`, and key points can be labelled `pi/2`, `pi`, `3pi/2`, etc.

Gap: tick labels are generated numerically by `formatTick`, so `Math.PI / 2` appears as a decimal tick value rather than a symbolic `pi/2` tick. This is acceptable for a stimulus with labelled key points, but not ideal for a polished HSC trig graph.

### Asymptotes for tan

Not first-class supported. Tangent branches break around asymptotes, but dashed vertical asymptote lines and labels such as `x = pi/2` are not supported as a semantic payload.

## Can Phase 2 Proceed Without New Payloads?

Yes, Phase 2 can proceed without new visual payloads if the implementation accepts these constraints:

- `exact-trig-values-special-triangles` can use existing `TriangleDiagram` for 30-60-90 and 45-45-90 triangles.
- `exact-trig-values-unit-circle` can use teaching text plus optional `CartesianGraph` circle/points/radius segments.
- `unit-circle-all-quadrants` can use `CartesianGraph` with a unit circle, labelled terminal points, and radial `lineSegments`, but quadrant shading, angle arcs, and reference-angle marks will be manual/approximate or absent.
- `graphing-sin-cos-tan` can use `CartesianGraph` for sin/cos/tan curves, with point labels for symbolic radian values.

Recommendation: proceed with Phase 2 content if the priority is curriculum coverage now. Add new payloads first only if the target quality bar requires clean unit-circle/reference-angle diagrams and explicit tangent asymptotes in every relevant item.

## Payload Recommendations

### UnitCircleDiagram

Recommended before or during the unit-circle Phase 2 slots if visual precision is important. This is the highest-value new payload for Phase 2.

Minimal MVP schema:

```ts
type UnitCircleDiagram = {
  description: string;
  highlightedAngle: {
    radians?: string;
    degrees?: string;
    terminalRayRadians: number;
  };
  terminalPoint: {
    x: number;
    y: number;
    label?: string;
  };
  coordinateLabel?: string;
  quadrant?: "I" | "II" | "III" | "IV" | "axis";
  referenceAngle?: {
    radians?: string;
    degrees?: string;
  };
  symmetryMarks?: {
    reflectInXAxis?: boolean;
    reflectInYAxis?: boolean;
    relatedPointLabels?: string[];
  };
  showAxes?: boolean;
  showQuadrantLabels?: boolean;
};
```

MVP rendering should show the unit circle, axes, terminal ray, angle arc, terminal point, coordinate label, quadrant label, and optional reference-angle arc.

### TrigGraphDiagram

Recommended eventually, but not required before Phase 2. It would remove the current symbolic tick/asymptote limitations and make graph authoring cleaner.

Minimal MVP schema:

```ts
type TrigGraphDiagram = {
  description: string;
  functionType: "sin" | "cos" | "tan";
  equationLabel?: string;
  parameters?: {
    a?: number;
    b?: number;
    c?: number;
    d?: number;
  };
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  xTickLabels?: { value: number; label: string }[];
  keyPoints?: { x: number; y: number; label?: string }[];
  asymptotes?: { x: number; label?: string }[];
  periodMarkers?: {
    from: number;
    to: number;
    label?: string;
  }[];
};
```

MVP rendering should support symbolic radian tick labels, dashed vertical asymptotes, labelled key points, and a visible period marker.

### SectorDiagram

Recommended for backlog, not required for Phase 2. It remains a gap from Phase 1 arc length/sector area, but Phase 2 does not depend on sector visuals.

Suggested MVP fields for a later task:

- `description`
- `radiusLabel`
- `angleLabel`
- `arcLabel`
- `shadedSector`
- optional `centreLabel`
- optional `diameterLabel`
- optional `showFullCircle`

## Recommendation

Proceed with Phase 2 lesson content without adding new payloads only if:

- special-triangle exact values use `TriangleDiagram`,
- unit-circle questions avoid asking students to read unrendered angle arcs or shaded quadrants from a visual,
- trig graph questions use `CartesianGraph` with labelled key points and text explanations for symbolic radian ticks,
- tangent graph questions explain asymptotes in text because dashed asymptote visuals are unavailable.

Best quality path:

1. Add `UnitCircleDiagram` first.
2. Implement `exact-trig-values-unit-circle` and `unit-circle-all-quadrants` with that payload.
3. Use existing `CartesianGraph` for `graphing-sin-cos-tan`.
4. Add `TrigGraphDiagram` later if tangent asymptote/tick-label polish becomes a recurring audit or UX issue.
5. Add `SectorDiagram` later for Phase 1 visual enhancement, not as a Phase 2 blocker.

## Risks

- `CartesianGraph` tick labels are numeric, so radian axes can look less mathematical unless key points are manually labelled.
- Tangent graph branches render safely, but asymptotes are not explicit. Students may miss why branches stop without accompanying text.
- Unit circle via `CartesianGraph` lacks angle arcs, reference-angle arcs, quadrant shading, and symmetry marks, which are central to Phase 2 conceptual understanding.
- New payload types require audit, seed, lesson maker, renderer, and component updates together; adding only a type without pipeline support will break previews or omit `diagram_data`.
- If Phase 2 proceeds without `UnitCircleDiagram`, avoid visual-required questions that say "use the diagram" unless the diagram can be faithfully represented with existing payloads.
