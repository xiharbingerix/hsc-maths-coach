import type { PracticeQuestion } from "../differentialCalculus";
import type { PlaneShapeDiagram } from "../types";
import { trapezoidDiagram } from "../geometryVisualFactories";

const visuals: Record<string, { prompt: string; latex?: string; planeShapeDiagram: PlaneShapeDiagram }> = {
  "y7-are-par-g4": {
    prompt: "Find the area of the trapezoid shown in square centimetres.", latex: "",
    planeShapeDiagram: trapezoidDiagram({ description: "Right trapezoid with parallel sides 4 centimetres and 8 centimetres and perpendicular height 5 centimetres.", bottom: 8, top: 4, height: 5, bottomLabel: "8 cm", topLabel: "4 cm", heightLabel: "5 cm" }),
  },
  "y7-are-par-i3": {
    prompt: "Find the area of the trapezoid shown in square centimetres.", latex: "",
    planeShapeDiagram: trapezoidDiagram({ description: "Right trapezoid with parallel sides 6 centimetres and 14 centimetres and perpendicular height 8 centimetres.", bottom: 14, top: 6, height: 8, bottomLabel: "14 cm", topLabel: "6 cm", heightLabel: "8 cm" }),
  },
  "y7-are-par-i5": {
    prompt: "The trapezoid shown has area 60 square metres. Find its perpendicular height h.", latex: "",
    planeShapeDiagram: trapezoidDiagram({ description: "Right trapezoid of area 60 square metres with parallel sides 7 metres and 13 metres and unknown perpendicular height h.", bottom: 13, top: 7, height: 6, bottomLabel: "13 m", topLabel: "7 m", heightLabel: "h" }),
  },
  "y7-are-par-m4": {
    prompt: "Find the area of the trapezoid shown in square centimetres.", latex: "",
    planeShapeDiagram: trapezoidDiagram({ description: "Right trapezoid with parallel sides 9 centimetres and 15 centimetres and perpendicular height 10 centimetres.", bottom: 15, top: 9, height: 10, bottomLabel: "15 cm", topLabel: "9 cm", heightLabel: "10 cm" }),
  },
  "y7-are-par-m7": {
    prompt: "A student calculates the area of the trapezoid shown as (5 + 9) times 6. Which factor did they omit?", latex: "",
    planeShapeDiagram: trapezoidDiagram({ description: "Right trapezoid with parallel sides 5 centimetres and 9 centimetres and perpendicular height 6 centimetres.", bottom: 9, top: 5, height: 6, bottomLabel: "9 cm", topLabel: "5 cm", heightLabel: "6 cm" }),
  },
  "y7-are-par-m9": {
    prompt: "The trapezoid shown has area 88 square centimetres. Find the unknown parallel side x.", latex: "",
    planeShapeDiagram: trapezoidDiagram({ description: "Right trapezoid of area 88 square centimetres with one parallel side 6 centimetres, unknown parallel side x and perpendicular height 8 centimetres.", bottom: 16, top: 6, height: 8, bottomLabel: "x", topLabel: "6 cm", heightLabel: "8 cm" }),
  },
  "y7-are-par-mp1": {
    prompt: "The trapezoidal glass panel shown has parallel sides 6 m and 14 m and height 5 m. A rhombus inlay inside it has diagonals 4 m and 3 m. Use these measurements for all parts.", latex: "",
    planeShapeDiagram: trapezoidDiagram({ description: "Trapezoidal glass panel with parallel sides 6 metres and 14 metres and perpendicular height 5 metres; a rhombus-shaped inlay inside the panel has diagonals 4 metres and 3 metres.", bottom: 14, top: 6, height: 5, bottomLabel: "14 m", topLabel: "6 m", heightLabel: "5 m" }),
  },
};

export function addYear7AreaVisual(question: PracticeQuestion): PracticeQuestion {
  const visual = visuals[question.id];
  return visual ? { ...question, ...visual } : question;
}
