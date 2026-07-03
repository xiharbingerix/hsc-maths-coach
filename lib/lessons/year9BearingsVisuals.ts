import type { BearingsDiagram } from "./types";

// Diagrams for the Year 9 bearings questions. Selection rule:
//  - Back-bearing and "bearing of A from B" questions get a compass diagram
//    showing ONLY the given ray — the reverse direction (the answer) is not
//    drawn, so the diagram supports the mental 180° rotation without leaking.
//  - Compass-point conversions ("write the bearing of NE") get NO diagram:
//    drawing the ray at the bearing would display the very angle being asked
//    for.
//  - Turn-angle questions get NO diagram: with both rays drawn the answer is
//    readable off the figure (many are exact right angles).

export type Year9BearingsVisual = {
  bearingsDiagram: BearingsDiagram;
};

function pad3(bearing: number): string {
  return String(bearing).padStart(3, "0");
}

// A single ray at the given bearing, arc annotated from north.
function backBearing(bearing: number): Year9BearingsVisual {
  return {
    bearingsDiagram: {
      description:
        `Compass diagram showing north and a single ray from the origin on a true bearing of ` +
        `${pad3(bearing)} degrees, measured clockwise from north. The reverse direction is not drawn.`,
      originLabel: "O",
      rays: [{ bearing, label: `${pad3(bearing)}°`, showAngle: true }],
    },
  };
}

// A ray from `origin` to `target` at the given bearing, for "bearing of
// A from B" questions.
function pointBearing(bearing: number, origin: string, target: string): Year9BearingsVisual {
  return {
    bearingsDiagram: {
      description:
        `Compass diagram centred at ${origin} showing north and a ray to ${target} on a true bearing of ` +
        `${pad3(bearing)} degrees, measured clockwise from north. The bearing back from ${target} is not drawn.`,
      originLabel: origin,
      rays: [{ bearing, label: target, showAngle: true }],
    },
  };
}

export const year9BearingsVisuals: Record<string, Year9BearingsVisual> = {
  // bearings — guided / independent / mastery back-bearing items
  "y9-brg-g3": backBearing(90),
  "y9-brg-i2": backBearing(120),
  "y9-brg-i4": backBearing(200),
  "y9-brg-m2": backBearing(50),
  "y9-brg-m4": backBearing(315),
  "y9-brg-m7": backBearing(80),
  "y9-brg-m9": backBearing(170),
  // mastery pool
  "y9-brg-p1": backBearing(25),
  "y9-brg-p2": backBearing(250),
  "y9-brg-p3": pointBearing(110, "A", "B"),
  "y9-brg-p5": backBearing(300),
  "y9-brg-p7": pointBearing(215, "Y", "X"),
  "y9-brg-p9": backBearing(15),
  "y9-brg-p10": pointBearing(90, "A", "B"),
  // challenge (lib/challenges/year9Chapter3.ts)
  "y9c-brg-1": backBearing(37),
  "y9c-brg-2": backBearing(290),
  "y9c-brg-3": pointBearing(65, "A", "B"),
  "y9c-brg-5": backBearing(5),
  "y9c-brg-6": backBearing(178),
  "y9c-brg-8": pointBearing(140, "B", "A"),
  "y9c-brg-10": backBearing(245),
  "y9c-brg-12": backBearing(123),
};
