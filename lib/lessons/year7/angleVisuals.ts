import type { PracticeQuestion } from "../differentialCalculus";
import type { PlaneShapeDiagram } from "../types";
import { trapezoidDiagram } from "../geometryVisualFactories";

const visuals: Record<string, { prompt: string; latex?: string; planeShapeDiagram: PlaneShapeDiagram }> = {
  "y7-ang-qdr-g4": {
    prompt: "Use the trapezoid shown to find angle D.", latex: "",
    planeShapeDiagram: trapezoidDiagram({ description: "Trapezoid ABCD with AB parallel to DC; co-interior angles A and D lie on the same side, with angle A equal to 118 degrees and angle D unknown.", bottom: 10, top: 6, height: 5, angleLabels: ["118°", "", "", "x°"], rightTrapezoid: false }),
  },
  "y7-ang-qdr-m3": {
    prompt: "Use the trapezoid shown to find x in degrees.", latex: "",
    planeShapeDiagram: trapezoidDiagram({ description: "Trapezoid ABCD with AB parallel to DC; co-interior angles A and D are labelled x degrees and x plus 30 degrees.", bottom: 10, top: 6, height: 5, angleLabels: ["x°", "", "", "(x + 30)°"], rightTrapezoid: false }),
  },
  "y7-ang-qdr-m8": {
    prompt: "Use the three labelled angles in the trapezoid to find angle C.", latex: "",
    planeShapeDiagram: trapezoidDiagram({ description: "Trapezoid ABCD with AB parallel to DC and interior angles A = 70 degrees, D = 110 degrees, B = 85 degrees and C unknown.", bottom: 10, top: 6, height: 5, angleLabels: ["70°", "85°", "x°", "110°"], rightTrapezoid: false }),
  },
};

export function addYear7AngleVisual(question: PracticeQuestion): PracticeQuestion {
  const visual = visuals[question.id];
  return visual ? { ...question, ...visual } : question;
}
