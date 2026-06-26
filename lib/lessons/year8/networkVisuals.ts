import type { NetworkDiagram, NetworkEdge, NetworkVertex } from "../types";

export type NetworkQuestionVisual = {
  prompt: string;
  diagram: NetworkDiagram;
};

function network(
  description: string,
  vertices: NetworkVertex[],
  edges: NetworkEdge[]
): NetworkDiagram {
  return { description, vertices, edges, viewBox: "0 0 380 300" };
}

export const networkQuestionVisuals: Record<string, NetworkQuestionVisual> = {
  "y8-net-fun-g1": {
    prompt: "How many edges are in the network shown?",
    diagram: network(
      "Undirected network with four vertices A, B, C and D arranged as a square. The edges are AB, BC, CD and DA.",
      [
        { id: "A", label: "A", x: 80, y: 70 },
        { id: "B", label: "B", x: 300, y: 70 },
        { id: "C", label: "C", x: 300, y: 230 },
        { id: "D", label: "D", x: 80, y: 230 },
      ],
      [
        { from: "A", to: "B" },
        { from: "B", to: "C" },
        { from: "C", to: "D" },
        { from: "D", to: "A" },
      ]
    ),
  },
  "y8-net-fun-g2": {
    prompt: "Find the degree of vertex A in the network shown.",
    diagram: network(
      "Undirected star network with central vertex A joined to four outer vertices B, C, D and E. The edges are AB, AC, AD and AE.",
      [
        { id: "A", label: "A", x: 190, y: 150 },
        { id: "B", label: "B", x: 190, y: 45 },
        { id: "C", label: "C", x: 325, y: 150 },
        { id: "D", label: "D", x: 190, y: 255 },
        { id: "E", label: "E", x: 55, y: 150 },
      ],
      [
        { from: "A", to: "B" },
        { from: "A", to: "C" },
        { from: "A", to: "D" },
        { from: "A", to: "E" },
      ]
    ),
  },
  "y8-net-fun-i5": {
    prompt: "Using the weighted network, find the distance from X to Z travelling via Y.",
    diagram: network(
      "Weighted triangular network with vertices X, Y and Z. Edge XY has weight 6 km, YZ has weight 9 km, and XZ has weight 12 km.",
      [
        { id: "X", label: "X", x: 70, y: 230 },
        { id: "Y", label: "Y", x: 190, y: 55 },
        { id: "Z", label: "Z", x: 310, y: 230 },
      ],
      [
        { from: "X", to: "Y", weight: "6 km" },
        { from: "Y", to: "Z", weight: "9 km" },
        { from: "X", to: "Z", weight: "12 km" },
      ]
    ),
  },
  "y8-net-pc-g3": {
    prompt: "How many different paths go from A to D in the network shown?",
    diagram: network(
      "Diamond-shaped undirected network with A at the left, B at the top, C at the bottom and D at the right. Edges are AB, AC, BD and CD.",
      [
        { id: "A", label: "A", x: 55, y: 150 },
        { id: "B", label: "B", x: 190, y: 55 },
        { id: "C", label: "C", x: 190, y: 245 },
        { id: "D", label: "D", x: 325, y: 150 },
      ],
      [
        { from: "A", to: "B" },
        { from: "A", to: "C" },
        { from: "B", to: "D" },
        { from: "C", to: "D" },
      ]
    ),
  },
  "y8-net-pc-i2": {
    prompt: "How many different paths go from A to E in the network shown?",
    diagram: network(
      "Undirected network with A at the left and E at the right. Middle vertices B, C and D each connect directly to both A and E.",
      [
        { id: "A", label: "A", x: 55, y: 150 },
        { id: "B", label: "B", x: 190, y: 55 },
        { id: "C", label: "C", x: 190, y: 150 },
        { id: "D", label: "D", x: 190, y: 245 },
        { id: "E", label: "E", x: 325, y: 150 },
      ],
      [
        { from: "A", to: "B" },
        { from: "A", to: "C" },
        { from: "A", to: "D" },
        { from: "B", to: "E" },
        { from: "C", to: "E" },
        { from: "D", to: "E" },
      ]
    ),
  },
  "y8-net-pc-mp1": {
    prompt: "The undirected network shown has vertices A, B, C and D.",
    diagram: network(
      "Undirected network with vertices A, B, C and D. Edges are AB, AC, BC, BD and CD; B and C form the middle pair between A and D.",
      [
        { id: "A", label: "A", x: 55, y: 150 },
        { id: "B", label: "B", x: 190, y: 65 },
        { id: "C", label: "C", x: 190, y: 235 },
        { id: "D", label: "D", x: 325, y: 150 },
      ],
      [
        { from: "A", to: "B" },
        { from: "A", to: "C" },
        { from: "B", to: "C" },
        { from: "B", to: "D" },
        { from: "C", to: "D" },
      ]
    ),
  },
  "y8-net-eul-g3": {
    prompt: "How many odd-degree vertices are in the network shown?",
    diagram: network(
      "Undirected square network with vertices A, B, C and D and edges AB, BC, CD, DA, plus diagonal AC.",
      [
        { id: "A", label: "A", x: 80, y: 65 },
        { id: "B", label: "B", x: 300, y: 65 },
        { id: "C", label: "C", x: 300, y: 235 },
        { id: "D", label: "D", x: 80, y: 235 },
      ],
      [
        { from: "A", to: "B" },
        { from: "B", to: "C" },
        { from: "C", to: "D" },
        { from: "D", to: "A" },
        { from: "A", to: "C" },
      ]
    ),
  },
  "y8-net-eul-i5": {
    prompt:
      "The connected network shown has an Eulerian trail. At which two vertices must the trail start and finish? Give the alphabetically first vertex.",
    diagram: network(
      "Undirected network with vertices A, B, C and D and edges AB, AC, BC, BD and CD. Vertices B and C have degree 3; A and D have degree 2.",
      [
        { id: "A", label: "A", x: 55, y: 150 },
        { id: "B", label: "B", x: 190, y: 65 },
        { id: "C", label: "C", x: 190, y: 235 },
        { id: "D", label: "D", x: 325, y: 150 },
      ],
      [
        { from: "A", to: "B" },
        { from: "A", to: "C" },
        { from: "B", to: "C" },
        { from: "B", to: "D" },
        { from: "C", to: "D" },
      ]
    ),
  },
  "y8-net-eul-m5": {
    prompt: "Every pair of vertices in the network shown is joined. How many vertices have odd degree?",
    diagram: network(
      "Complete undirected network on four vertices A, B, C and D. All six possible edges AB, AC, AD, BC, BD and CD are present.",
      [
        { id: "A", label: "A", x: 80, y: 65 },
        { id: "B", label: "B", x: 300, y: 65 },
        { id: "C", label: "C", x: 300, y: 235 },
        { id: "D", label: "D", x: 80, y: 235 },
      ],
      [
        { from: "A", to: "B" },
        { from: "A", to: "C" },
        { from: "A", to: "D" },
        { from: "B", to: "C" },
        { from: "B", to: "D" },
        { from: "C", to: "D" },
      ]
    ),
  },
  "y8-net-pl-g4": {
    prompt: "How many faces does the planar network shown have, including the outer region?",
    diagram: network(
      "Planar triangular network with vertices A, B and C and edges AB, BC and CA. It has one triangular interior face and one outer face.",
      [
        { id: "A", label: "A", x: 190, y: 50 },
        { id: "B", label: "B", x: 65, y: 235 },
        { id: "C", label: "C", x: 315, y: 235 },
      ],
      [
        { from: "A", to: "B" },
        { from: "B", to: "C" },
        { from: "C", to: "A" },
      ]
    ),
  },
  "y8-net-pl-i4": {
    prompt:
      "The crossing-free planar network shown has 4 vertices and 6 edges. Use Euler's formula to find the number of faces, including the outer region.",
    diagram: network(
      "Crossing-free planar drawing of the complete network on four vertices. A, B and C form an outer triangle; D is inside it and joins to A, B and C. All six edges are present.",
      [
        { id: "A", label: "A", x: 190, y: 40 },
        { id: "B", label: "B", x: 50, y: 250 },
        { id: "C", label: "C", x: 330, y: 250 },
        { id: "D", label: "D", x: 190, y: 165 },
      ],
      [
        { from: "A", to: "B" },
        { from: "B", to: "C" },
        { from: "C", to: "A" },
        { from: "A", to: "D" },
        { from: "B", to: "D" },
        { from: "C", to: "D" },
      ]
    ),
  },
  "y8-net-pl-m9": {
    prompt:
      "The network is drawn with both diagonals crossing. Can the same network be redrawn without any edges crossing? Answer yes or no.",
    diagram: network(
      "Square drawing of the complete network on four vertices A, B, C and D. The four boundary edges and both diagonals are present; the diagonals cross without a vertex at the crossing.",
      [
        { id: "A", label: "A", x: 80, y: 65 },
        { id: "B", label: "B", x: 300, y: 65 },
        { id: "C", label: "C", x: 300, y: 235 },
        { id: "D", label: "D", x: 80, y: 235 },
      ],
      [
        { from: "A", to: "B" },
        { from: "B", to: "C" },
        { from: "C", to: "D" },
        { from: "D", to: "A" },
        { from: "A", to: "C" },
        { from: "B", to: "D" },
      ]
    ),
  },
  "y8-net-app-g1": {
    prompt: "Using the weighted network, find the shortest distance from A to C.",
    diagram: network(
      "Weighted triangular road network with vertices A, B and C. Direct edge AC is 8 km, while AB is 3 km and BC is 4 km.",
      [
        { id: "A", label: "A", x: 70, y: 230 },
        { id: "B", label: "B", x: 190, y: 55 },
        { id: "C", label: "C", x: 310, y: 230 },
      ],
      [
        { from: "A", to: "B", weight: "3 km" },
        { from: "B", to: "C", weight: "4 km" },
        { from: "A", to: "C", weight: "8 km" },
      ]
    ),
  },
  "y8-net-app-i3": {
    prompt: "Using the weighted network, find the shortest distance from P to S.",
    diagram: network(
      "Weighted road network from P to S. Direct edge PS is 15; the route through Q has edges 6 and 6; the route through R has edges 5 and 5.",
      [
        { id: "P", label: "P", x: 45, y: 150 },
        { id: "Q", label: "Q", x: 190, y: 55 },
        { id: "R", label: "R", x: 190, y: 245 },
        { id: "S", label: "S", x: 335, y: 150 },
      ],
      [
        { from: "P", to: "S", weight: 15 },
        { from: "P", to: "Q", weight: 6 },
        { from: "Q", to: "S", weight: 6 },
        { from: "P", to: "R", weight: 5 },
        { from: "R", to: "S", weight: 5 },
      ]
    ),
  },
  "y8-net-app-mp1": {
    prompt: "The weighted road network shown gives distances in kilometres between four towns.",
    diagram: network(
      "Weighted network with towns A, B, C and D. Edges are AB 5 km, BC 4 km, CD 6 km, AC 8 km and AD 20 km.",
      [
        { id: "A", label: "A", x: 45, y: 150 },
        { id: "B", label: "B", x: 150, y: 55 },
        { id: "C", label: "C", x: 255, y: 150 },
        { id: "D", label: "D", x: 335, y: 245 },
      ],
      [
        { from: "A", to: "B", weight: 5 },
        { from: "B", to: "C", weight: 4 },
        { from: "C", to: "D", weight: 6 },
        { from: "A", to: "C", weight: 8 },
        { from: "A", to: "D", weight: 20 },
      ]
    ),
  },
};
