// Year 10 restructure — Wave 8 (Networks). Authors all hidden stubs in Unit 11 (networks):
// introduction-to-networks (11A), isomorphic-planar-graphs (11B), trails-paths-eulerian (11C),
// shortest-path-problems (11D, extending). Architecture untouched. No critical-path scheduling
// depth (that is Standard 2). Prose uses unicode superscripts (no raw ^ or _). Y10 audit:
// 3 worked examples + 4 commonMistakes + 4/5/10 + masteryPassMark 0.8.

import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { NetworkDiagram } from "../types";

function ans(id: string, prompt: string, latex: string, answer: string, difficulty: number, explanation: string, accepted: string[] = [], extra: Partial<PracticeQuestion> = {}): PracticeQuestion {
  return { id, prompt, latex, answer, acceptedAnswers: Array.from(new Set([answer, ...accepted])), difficulty, hint: "Think about what the network represents, then count or compare.", explanation, ...extra };
}
function mcq(id: string, prompt: string, answer: "A" | "B" | "C" | "D", choices: [string, string, string, string], difficulty: number, explanation: string, extra: Partial<PracticeQuestion> = {}): PracticeQuestion {
  return { id, prompt, latex: "\\text{Select A, B, C, or D.}", choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })), answer, difficulty, hint: "Reason about the network structure, then check each option.", explanation, ...extra };
}

// ── Shared network diagrams ─────────────────────────────────────────────────────────────
// Unweighted hub network: edges A–B, B–C, B–D, C–D, C–E, D–E.
// Degrees: A=1, B=3, C=3, D=3, E=2. 6 edges, degree sum 12.
const netHub: NetworkDiagram = {
  description:
    "Network with vertices A, B, C, D and E. Edges join A–B, B–C, B–D, C–D, C–E and D–E. A joins only to B; C and D are each joined to three other vertices.",
  vertices: [
    { id: "A", label: "A", x: 60, y: 150 },
    { id: "B", label: "B", x: 190, y: 150 },
    { id: "C", label: "C", x: 300, y: 60 },
    { id: "D", label: "D", x: 300, y: 240 },
    { id: "E", label: "E", x: 420, y: 150 },
  ],
  edges: [
    { from: "A", to: "B" }, { from: "B", to: "C" }, { from: "B", to: "D" },
    { from: "C", to: "D" }, { from: "C", to: "E" }, { from: "D", to: "E" },
  ],
};

// Triangle network P–Q–R: every vertex has degree 2.
const netTri: NetworkDiagram = {
  description: "Triangle network with vertices P, Q and R, and edges P–Q, Q–R and R–P.",
  vertices: [
    { id: "P", label: "P", x: 200, y: 60 },
    { id: "Q", label: "Q", x: 90, y: 240 },
    { id: "R", label: "R", x: 310, y: 240 },
  ],
  edges: [{ from: "P", to: "Q" }, { from: "Q", to: "R" }, { from: "R", to: "P" }],
};

// Square cycle W–X–Y–Z: every vertex has degree 2.
const netSquare: NetworkDiagram = {
  description: "Square network with vertices W, X, Y and Z, and edges W–X, X–Y, Y–Z and Z–W.",
  vertices: [
    { id: "W", label: "W", x: 120, y: 70 },
    { id: "X", label: "X", x: 320, y: 70 },
    { id: "Y", label: "Y", x: 320, y: 240 },
    { id: "Z", label: "Z", x: 120, y: 240 },
  ],
  edges: [
    { from: "W", to: "X" }, { from: "X", to: "Y" }, { from: "Y", to: "Z" }, { from: "Z", to: "W" },
  ],
};

// Complete graph on A, B, C, D: every vertex has degree 3 (4 odd-degree vertices).
const netK4: NetworkDiagram = {
  description:
    "Network with vertices A, B, C and D where every pair of vertices is joined: edges A–B, B–C, C–D, D–A, A–C and B–D. Every vertex has three edges.",
  vertices: [
    { id: "A", label: "A", x: 120, y: 70 },
    { id: "B", label: "B", x: 320, y: 70 },
    { id: "C", label: "C", x: 320, y: 240 },
    { id: "D", label: "D", x: 120, y: 240 },
  ],
  edges: [
    { from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "D" },
    { from: "D", to: "A" }, { from: "A", to: "C" }, { from: "B", to: "D" },
  ],
};

// Square A–B–C–D with one diagonal A–C: degrees A=3, B=2, C=3, D=2 (exactly 2 odd).
const netEnvelope: NetworkDiagram = {
  description:
    "Network with vertices A, B, C and D. Edges join A–B, B–C, C–D, D–A and the diagonal A–C. A and C each have three edges; B and D each have two.",
  vertices: [
    { id: "A", label: "A", x: 120, y: 70 },
    { id: "B", label: "B", x: 320, y: 70 },
    { id: "C", label: "C", x: 320, y: 240 },
    { id: "D", label: "D", x: 120, y: 240 },
  ],
  edges: [
    { from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "D" },
    { from: "D", to: "A" }, { from: "A", to: "C" },
  ],
};

// Two triangles sharing vertex C (bow-tie): degrees A=2, B=2, C=4, D=2, E=2 (all even).
const netBowtie: NetworkDiagram = {
  description:
    "Network of two triangles sharing vertex C: edges A–B, B–C, C–A, C–D, D–E and E–C. Vertex C has four edges; every other vertex has two.",
  vertices: [
    { id: "A", label: "A", x: 60, y: 70 },
    { id: "B", label: "B", x: 60, y: 240 },
    { id: "C", label: "C", x: 220, y: 155 },
    { id: "D", label: "D", x: 380, y: 70 },
    { id: "E", label: "E", x: 380, y: 240 },
  ],
  edges: [
    { from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "A" },
    { from: "C", to: "D" }, { from: "D", to: "E" }, { from: "E", to: "C" },
  ],
};

// Planar wheel: square A,B,C,D with centre E joined to all four. V=5, E=8, F=5.
const netWheel: NetworkDiagram = {
  description:
    "Connected planar graph: square with vertices A, B, C and D, and a centre vertex E joined to all four corners. Edges: A–B, B–C, C–D, D–A, E–A, E–B, E–C and E–D.",
  vertices: [
    { id: "A", label: "A", x: 120, y: 70 },
    { id: "B", label: "B", x: 320, y: 70 },
    { id: "C", label: "C", x: 320, y: 240 },
    { id: "D", label: "D", x: 120, y: 240 },
    { id: "E", label: "E", x: 220, y: 155 },
  ],
  edges: [
    { from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "D" }, { from: "D", to: "A" },
    { from: "E", to: "A" }, { from: "E", to: "B" }, { from: "E", to: "C" }, { from: "E", to: "D" },
  ],
};

// Triangular prism drawn planar: outer triangle A,B,C; inner triangle D,E,F; spokes A–D, B–E, C–F.
// V=6, E=9, F=5.
const netPrism: NetworkDiagram = {
  description:
    "Connected planar graph with an outer triangle A, B, C and an inner triangle D, E, F, with connecting edges A–D, B–E and C–F. Six vertices and nine edges, no crossings.",
  vertices: [
    { id: "A", label: "A", x: 220, y: 40 },
    { id: "B", label: "B", x: 60, y: 270 },
    { id: "C", label: "C", x: 380, y: 270 },
    { id: "D", label: "D", x: 220, y: 120 },
    { id: "E", label: "E", x: 150, y: 220 },
    { id: "F", label: "F", x: 290, y: 220 },
  ],
  edges: [
    { from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "A" },
    { from: "D", to: "E" }, { from: "E", to: "F" }, { from: "F", to: "D" },
    { from: "A", to: "D" }, { from: "B", to: "E" }, { from: "C", to: "F" },
  ],
};

// Pentagon A–B–C–D–E with chord A–C. V=5, E=6, F=3.
const netPentaChord: NetworkDiagram = {
  description:
    "Connected planar graph: pentagon with vertices A, B, C, D and E in order, plus the chord A–C. Five vertices and six edges, no crossings.",
  vertices: [
    { id: "A", label: "A", x: 220, y: 40 },
    { id: "B", label: "B", x: 380, y: 140 },
    { id: "C", label: "C", x: 320, y: 280 },
    { id: "D", label: "D", x: 120, y: 280 },
    { id: "E", label: "E", x: 60, y: 140 },
  ],
  edges: [
    { from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "D" },
    { from: "D", to: "E" }, { from: "E", to: "A" }, { from: "A", to: "C" },
  ],
};

// Weighted: A–B 5, B–C 4, A–C 10. Shortest A→C = 9 via B (beats the direct edge).
const netW1: NetworkDiagram = {
  description:
    "Weighted network with vertices A, B and C. Edge A–B has weight 5, edge B–C has weight 4, and the direct edge A–C has weight 10.",
  vertices: [
    { id: "A", label: "A", x: 70, y: 240 },
    { id: "B", label: "B", x: 220, y: 60 },
    { id: "C", label: "C", x: 380, y: 240 },
  ],
  edges: [
    { from: "A", to: "B", weight: 5 }, { from: "B", to: "C", weight: 4 },
    { from: "A", to: "C", weight: 10 },
  ],
};

// Weighted: P–Q 3, Q–R 3, R–S 3 (total 9) vs P–T 4, T–S 6 (total 10). Shortest P→S = 9.
const netW2: NetworkDiagram = {
  description:
    "Weighted network with vertices P, Q, R, S and T. The top route has edges P–Q 3, Q–R 3 and R–S 3. The bottom route has edges P–T 4 and T–S 6.",
  vertices: [
    { id: "P", label: "P", x: 60, y: 150 },
    { id: "Q", label: "Q", x: 180, y: 60 },
    { id: "R", label: "R", x: 300, y: 60 },
    { id: "S", label: "S", x: 420, y: 150 },
    { id: "T", label: "T", x: 240, y: 250 },
  ],
  edges: [
    { from: "P", to: "Q", weight: 3 }, { from: "Q", to: "R", weight: 3 }, { from: "R", to: "S", weight: 3 },
    { from: "P", to: "T", weight: 4 }, { from: "T", to: "S", weight: 6 },
  ],
};

// Weighted: A–B 3, B–C 4 (total 7) vs A–D 2, D–C 3 (total 5). Shortest A→C = 5.
const netW3: NetworkDiagram = {
  description:
    "Weighted network with vertices A, B, C and D. The top route has edges A–B 3 and B–C 4. The bottom route has edges A–D 2 and D–C 3.",
  vertices: [
    { id: "A", label: "A", x: 60, y: 150 },
    { id: "B", label: "B", x: 220, y: 50 },
    { id: "C", label: "C", x: 400, y: 150 },
    { id: "D", label: "D", x: 220, y: 250 },
  ],
  edges: [
    { from: "A", to: "B", weight: 3 }, { from: "B", to: "C", weight: 4 },
    { from: "A", to: "D", weight: 2 }, { from: "D", to: "C", weight: 3 },
  ],
};

// Weighted, three routes A→D: A–B 5 + B–D 7 = 12; A–C 4 + C–D 5 = 9; direct A–D 15. Shortest = 9.
const netW4: NetworkDiagram = {
  description:
    "Weighted network with vertices A, B, C and D. Routes from A to D: through B with edges A–B 5 and B–D 7; through C with edges A–C 4 and C–D 5; or the direct edge A–D with weight 15.",
  vertices: [
    { id: "A", label: "A", x: 60, y: 150 },
    { id: "B", label: "B", x: 220, y: 50 },
    { id: "C", label: "C", x: 220, y: 250 },
    { id: "D", label: "D", x: 400, y: 150 },
  ],
  edges: [
    { from: "A", to: "B", weight: 5 }, { from: "B", to: "D", weight: 7 },
    { from: "A", to: "C", weight: 4 }, { from: "C", to: "D", weight: 5 },
    { from: "A", to: "D", weight: 15 },
  ],
};

// ── 11A Introduction to Networks (path) ────────────────────────────────────────────────
const introNetworks: Partial<ExplicitLesson> = {
  description: "Describe networks as vertices joined by edges, find vertex degrees, and use the handshake relationship.",
  learningIntention: "Read a network as connections and quantify it with degrees and edges.",
  successCriteria: ["Identify vertices (nodes) and edges.", "Find the degree of a vertex.", "Use sum of degrees = 2 × edges.", "Recognise what a network models."],
  teaching: {
    paragraphs: [
      "A NETWORK (or graph) is just a set of points called VERTICES (nodes) joined by lines called EDGES. It is a picture of CONNECTIONS — roads between towns, friendships between people, pipes between junctions. The positions of the dots don't matter; only WHICH vertices are joined.",
      "The DEGREE of a vertex is how many edges meet it. A vertex with 3 edges has degree 3; an isolated vertex with none has degree 0. A loop (an edge joining a vertex to itself) counts twice towards that vertex's degree.",
      "There is a neat counting rule, the HANDSHAKE relationship: the sum of all the degrees equals twice the number of edges (each edge has two ends, so it is counted at two vertices). So 6 edges give a degree sum of 12.",
      "A consequence worth knowing: the number of ODD-degree vertices in any network is always even. Reading a network is about the connections and the counts, not the drawing.",
    ],
    latexBlocks: ["\\text{network} = \\text{vertices} + \\text{edges}", "\\deg(v) = \\text{edges meeting } v", "\\textstyle\\sum \\deg = 2 \\times (\\text{edges})"],
  },
  workedExamples: [
    { title: "Degree of a vertex", questionLatex: "\\text{A vertex has 4 edges meeting it. What is its degree?}", steps: [{ explanation: "Degree counts the edges at the vertex.", latex: "\\deg = 4" }], finalAnswerLatex: "4" },
    { title: "Handshake", questionLatex: "\\text{A network has 6 edges. What is the sum of all degrees?}", steps: [{ explanation: "Sum of degrees = 2 × edges.", latex: "2 \\times 6 = 12" }], finalAnswerLatex: "12" },
    { title: "Edges from degree sum", questionLatex: "\\text{The degrees of a network sum to 8. How many edges?}", steps: [{ explanation: "Edges = (sum of degrees) ÷ 2.", latex: "8 \\div 2 = 4" }], finalAnswerLatex: "4" },
  ],
  guidedPractice: [
    mcq("y10-itn-g1", "In a network, the dots are called:", "A", ["vertices (nodes)", "edges", "faces", "loops"], 2, "The dots are vertices, also called nodes."),
    mcq("y10-itn-g2", "The lines joining the dots are called:", "B", ["vertices", "edges", "degrees", "paths"], 2, "The connecting lines are edges."),
    ans("y10-itn-g3", "In the network shown, state the degree of vertex C.", "", "3", 2, "C is joined to B, D and E, so deg(C) = 3.", [], { diagram: netHub, hint: "Count the edges that meet vertex C." }),
    mcq("y10-itn-g4", "A network is a model of:", "C", ["areas", "angles", "connections/relationships", "probabilities"], 2, "Networks represent how things are connected."),
  ],
  independentPractice: [
    ans("y10-itn-i1", "Count the edges in the network shown, then find the sum of all the vertex degrees.", "", "12", 3, "The network has 6 edges (A–B, B–C, B–D, C–D, C–E, D–E). Sum of degrees = 2 × 6 = 12.", [], { diagram: netHub, hint: "Count the edges first, then use sum of degrees = 2 × edges." }),
    mcq("y10-itn-i2", "The degree of a vertex is:", "B", ["the number of vertices", "the number of edges meeting it", "the total edges in the graph", "its position"], 2, "Degree counts the edges meeting that vertex."),
    ans("y10-itn-i3", "In the triangle network shown, state the degree of vertex Q.", "", "2", 2, "Q is joined to P and R, so deg(Q) = 2.", [], { diagram: netTri, hint: "Count the edges that meet vertex Q." }),
    ans("y10-itn-i4", "A network's degrees sum to 10. How many edges does it have?", "\\sum\\deg=10", "5", 2, "Edges = 10 ÷ 2 = 5.", []),
    mcq("y10-itn-i5", "An isolated vertex (no edges) has degree:", "A", ["0", "1", "2", "undefined"], 2, "No edges meet it, so its degree is 0."),
  ],
  masteryQuiz: [
    ans("y10-itn-m1", "A vertex has 2 edges meeting it. State its degree.", "\\deg(v)", "2", 1, "Degree = 2.", []),
    mcq("y10-itn-m2", "Vertices are also called:", "B", ["edges", "nodes", "faces", "loops"], 2, "Vertices are also known as nodes."),
    ans("y10-itn-m3", "Find the sum of degrees of a network with 7 edges.", "7 \\text{ edges}", "14", 2, "2 × 7 = 14.", []),
    ans("y10-itn-m4", "A network's degrees sum to 8. How many edges?", "\\sum\\deg=8", "4", 2, "8 ÷ 2 = 4.", []),
    mcq("y10-itn-m5", "A loop (edge from a vertex to itself) adds how much to that vertex's degree?", "B", ["1", "2", "0", "half"], 4, "A loop has both ends at the same vertex, so it adds 2."),
    ans("y10-itn-m6", "How many edges if the degrees sum to 20?", "\\sum\\deg=20", "10", 2, "20 ÷ 2 = 10.", []),
    mcq("y10-itn-m7", "A network is also called a:", "C", ["chart", "table", "graph", "tree only"], 2, "A network is a graph."),
    ans("y10-itn-m8", "In the network shown, state the degree of vertex X.", "", "2", 2, "X is joined to its two neighbours W and Y, so deg(X) = 2.", [], { diagram: netSquare, hint: "Count the edges that meet vertex X." }),
    mcq("y10-itn-m9", "The number of odd-degree vertices in any network is always:", "A", ["even", "odd", "zero", "equal to the edges"], 4, "By the handshake relationship, odd-degree vertices come in even numbers."),
    ans("y10-itn-m10", "In the network shown, every pair of vertices is joined. State the degree of vertex A.", "", "3", 2, "A is joined to B, C and D, so deg(A) = 3.", [], { diagram: netK4, hint: "Count the edges that meet vertex A." }),
  ],
  commonMistakes: [
    { mistake: "Counting vertices instead of edges for the degree.", fix: "Degree = the number of EDGES meeting the vertex." },
    { mistake: "Thinking the drawing's layout changes the network.", fix: "Only which vertices are joined matters, not their positions." },
    { mistake: "Forgetting a loop counts twice.", fix: "A loop adds 2 to the vertex's degree." },
    { mistake: "Setting sum of degrees equal to the number of edges.", fix: "Sum of degrees = 2 × edges." },
  ],
  masteryPassMark: 0.8,
};

// ── 11B Isomorphic and Planar Graphs (path) ────────────────────────────────────────────
const isomorphicPlanar: Partial<ExplicitLesson> = {
  description: "Recognise isomorphic graphs (same structure) and planar graphs (drawn without crossings), and apply Euler's formula.",
  learningIntention: "Decide when two graphs are the same and use Euler's formula on planar graphs.",
  successCriteria: ["State that isomorphic graphs share structure, not appearance.", "Use vertex/edge counts and degree sequence to rule out isomorphism.", "Recognise a planar graph.", "Apply V − E + F = 2."],
  teaching: {
    paragraphs: [
      "Two graphs are ISOMORPHIC if they have the SAME STRUCTURE — the same connections — even when drawn to look completely different. Same is about the relationships, not the picture: same number of vertices, same number of edges, and the same DEGREE SEQUENCE (list of degrees).",
      "Those shared counts give a quick test: if two graphs have a different number of edges, or a different degree sequence, they CANNOT be isomorphic. (Matching counts make them candidates, but you must check the actual connections.)",
      "A graph is PLANAR if it can be redrawn so that no edges cross. Many graphs that look tangled are actually planar once redrawn — being planar is a property of the structure, not of one particular drawing.",
      "For a connected planar graph, EULER'S FORMULA links vertices, edges and faces (regions, including the outside): V − E + F = 2. Rearranged, F = 2 − V + E, so you can find any one from the other two.",
    ],
    latexBlocks: ["\\text{isomorphic} = \\text{same structure / connections}", "\\text{planar} = \\text{drawable with no crossings}", "V - E + F = 2 \\Rightarrow F = 2 - V + E"],
  },
  workedExamples: [
    { title: "Euler's formula", questionLatex: "\\text{A connected planar graph has } V=4,\\ E=6. \\text{ Find } F.", steps: [{ explanation: "F = 2 − V + E.", latex: "2 - 4 + 6 = 4" }], finalAnswerLatex: "4" },
    { title: "Ruling out isomorphism", questionLatex: "\\text{Graph A has 5 edges, graph B has 6. Isomorphic?}", steps: [{ explanation: "Different edge counts.", latex: "\\text{No}" }], finalAnswerLatex: "\\text{No}" },
    { title: "Planar meaning", questionLatex: "\\text{A graph redrawn so no edges cross is:}", steps: [{ explanation: "Drawable without crossings.", latex: "\\text{planar}" }], finalAnswerLatex: "\\text{planar}" },
  ],
  guidedPractice: [
    mcq("y10-ipg-g1", "Isomorphic graphs have the same:", "A", ["structure (connections)", "drawing only", "colours", "vertex positions"], 3, "Isomorphic graphs share structure, regardless of how they're drawn."),
    mcq("y10-ipg-g2", "A planar graph can be drawn with:", "B", ["all edges crossing", "no edges crossing", "no vertices", "only loops"], 2, "Planar means it can be drawn with no edge crossings."),
    ans("y10-ipg-g3", "Complete Euler's formula: V − E + F = ?", "", "2", 2, "For a connected planar graph, V − E + F = 2.", []),
    ans("y10-ipg-g4", "For the connected planar graph shown, count V and E, then find the number of faces F (remember the outside region counts).", "", "5", 3, "V = 5 and E = 8, so F = 2 − V + E = 2 − 5 + 8 = 5 (four inner regions plus the outer face).", [], { diagram: netWheel, hint: "Count the vertices and edges from the diagram, then use F = 2 − V + E." }),
  ],
  independentPractice: [
    mcq("y10-ipg-i1", "Isomorphic graphs must have the same number of:", "C", ["faces only", "colours", "vertices and edges", "crossings"], 3, "Same structure requires the same number of vertices and edges."),
    ans("y10-ipg-i2", "For the connected planar graph shown, count V and E, then find the number of faces F (including the outside region).", "", "5", 3, "V = 6 and E = 9, so F = 2 − V + E = 2 − 6 + 9 = 5.", [], { diagram: netPrism, hint: "Count the vertices and edges from the diagram, then use F = 2 − V + E." }),
    mcq("y10-ipg-i3", "Two graphs with different numbers of edges:", "A", ["cannot be isomorphic", "are always isomorphic", "are always planar", "have the same degree sequence"], 3, "Different edge counts immediately rule out isomorphism."),
    ans("y10-ipg-i4", "A connected planar graph has V = 3, E = 3. Find F.", "V=3,E=3", "2", 3, "F = 2 − 3 + 3 = 2.", []),
    mcq("y10-ipg-i5", "The degree sequence of two isomorphic graphs is:", "B", ["always different", "the same", "always increasing", "irrelevant"], 3, "Isomorphic graphs have identical degree sequences."),
  ],
  masteryQuiz: [
    ans("y10-ipg-m1", "A connected planar graph has V = 4, E = 4. Find F.", "V=4,E=4", "2", 2, "F = 2 − 4 + 4 = 2.", []),
    mcq("y10-ipg-m2", "'Planar' means the graph can be drawn:", "B", ["with many crossings", "without crossings", "without vertices", "as a tree only"], 2, "Planar = drawable with no edge crossings."),
    ans("y10-ipg-m3", "A connected planar graph has V = 7, E = 10. Find F.", "V=7,E=10", "5", 3, "F = 2 − 7 + 10 = 5.", []),
    mcq("y10-ipg-m4", "Isomorphic graphs are the same except for:", "C", ["the number of edges", "the degree sequence", "how they are drawn", "the number of vertices"], 3, "Only the drawing differs; structure is identical."),
    ans("y10-ipg-m5", "For the connected planar graph shown, count V and E, then find the number of faces F (including the outside region).", "", "3", 3, "V = 5 and E = 6, so F = 2 − V + E = 2 − 5 + 6 = 3 (two inner regions plus the outer face).", [], { diagram: netPentaChord, hint: "Count the vertices and edges from the diagram, then use F = 2 − V + E." }),
    mcq("y10-ipg-m6", "What guarantees two graphs are NOT isomorphic?", "A", ["different degree sequences", "different drawings", "different colours", "different vertex labels"], 4, "A different degree sequence rules out isomorphism."),
    ans("y10-ipg-m7", "A connected planar graph has V = 8, E = 12. Find F.", "V=8,E=12", "6", 3, "F = 2 − 8 + 12 = 6.", []),
    mcq("y10-ipg-m8", "Euler's formula V − E + F = 2 applies to:", "B", ["any graph", "connected planar graphs", "trees only", "graphs with crossings"], 4, "It holds for connected planar graphs."),
    ans("y10-ipg-m9", "A connected planar graph has F = 4, E = 6. Find V.", "F=4,E=6", "4", 4, "V = 2 − F + E = 2 − 4 + 6 = 4.", []),
    mcq("y10-ipg-m10", "Redrawing a graph so no edges cross shows it is:", "A", ["planar", "isomorphic to a tree", "Eulerian", "complete"], 3, "A crossing-free drawing demonstrates the graph is planar."),
  ],
  commonMistakes: [
    { mistake: "Thinking different drawings mean different graphs.", fix: "Isomorphic graphs can look different but share structure." },
    { mistake: "Calling graphs isomorphic just because vertex counts match.", fix: "Also check edges and the degree sequence (and the actual connections)." },
    { mistake: "Forgetting to count the outer region as a face.", fix: "F in Euler's formula includes the infinite outer face." },
    { mistake: "Misremembering Euler's formula sign.", fix: "V − E + F = 2, so F = 2 − V + E." },
  ],
  masteryPassMark: 0.8,
};

// ── 11C Trails, Paths and Eulerian Trails (path) ───────────────────────────────────────
const trailsPathsEulerian: Partial<ExplicitLesson> = {
  description: "Distinguish walks, trails, paths and circuits, and decide when Eulerian trails and circuits exist.",
  learningIntention: "Use the rules for repeating edges/vertices and the odd-degree test for Eulerian trails.",
  successCriteria: ["Define trail (no repeated edge) and path (no repeated vertex).", "Recognise a circuit as a closed route.", "Apply the odd-degree test for Eulerian trails/circuits.", "Decide when revisiting is allowed."],
  teaching: {
    paragraphs: [
      "Moving through a network, the names depend on what you're allowed to REPEAT. A TRAIL uses no EDGE twice (but may revisit a vertex). A PATH is stricter: no VERTEX is repeated (so no edge is either). A CIRCUIT (or cycle) is a closed route that starts and ends at the same vertex.",
      "So 'when is revisiting allowed?' has a clean answer: in a trail you MAY revisit a vertex but never an edge; in a path you may revisit NEITHER.",
      "An EULERIAN TRAIL uses EVERY EDGE exactly once. The test is about ODD-degree vertices: an Eulerian trail exists when there are exactly 0 or 2 vertices of odd degree.",
      "An EULERIAN CIRCUIT is an Eulerian trail that returns to its start — every edge once, back home. It exists only when EVERY vertex has even degree (0 odd-degree vertices). Counting odd-degree vertices, not edges, is the key.",
    ],
    latexBlocks: ["\\text{trail: no repeated edge};\\ \\text{path: no repeated vertex}", "\\text{Eulerian trail} \\iff 0 \\text{ or } 2 \\text{ odd-degree vertices}", "\\text{Eulerian circuit} \\iff \\text{all degrees even}"],
  },
  workedExamples: [
    { title: "Trail vs path", questionLatex: "\\text{A route repeats a vertex but no edge. Trail or path?}", steps: [{ explanation: "No repeated edge, but a vertex repeats.", latex: "\\text{trail}" }], finalAnswerLatex: "\\text{trail}" },
    { title: "Eulerian circuit test", questionLatex: "\\text{When does an Eulerian circuit exist?}", steps: [{ explanation: "Every vertex must have even degree.", latex: "0 \\text{ odd-degree vertices}" }], finalAnswerLatex: "\\text{all even}" },
    { title: "Eulerian trail test", questionLatex: "\\text{A graph has exactly 2 odd-degree vertices. Eulerian trail?}", steps: [{ explanation: "0 or 2 odd-degree vertices allows it.", latex: "\\text{Yes}" }], finalAnswerLatex: "\\text{Yes}" },
  ],
  guidedPractice: [
    mcq("y10-tpe-g1", "A trail has no repeated:", "A", ["edge", "vertex", "face", "degree"], 2, "A trail may revisit vertices but never repeats an edge."),
    mcq("y10-tpe-g2", "A path has no repeated:", "B", ["edge only", "vertex", "face", "loop"], 2, "A path repeats no vertex (and hence no edge)."),
    mcq("y10-tpe-g3", "A circuit starts and ends at the:", "C", ["highest-degree vertex", "two odd vertices", "same vertex", "outer face"], 2, "A circuit is closed: it returns to its starting vertex."),
    mcq("y10-tpe-g4", "An Eulerian trail uses every:", "A", ["edge exactly once", "vertex exactly once", "face once", "edge twice"], 3, "An Eulerian trail traverses every edge exactly once."),
  ],
  independentPractice: [
    mcq("y10-tpe-i1", "An Eulerian circuit exists when all vertices have:", "A", ["even degree", "odd degree", "degree 1", "different degrees"], 4, "All-even degrees guarantee an Eulerian circuit."),
    mcq("y10-tpe-i2", "An Eulerian trail exists when the number of odd-degree vertices is:", "C", ["1", "3", "0 or 2", "any number"], 4, "Exactly 0 or 2 odd-degree vertices allows an Eulerian trail."),
    mcq("y10-tpe-i3", "In a path you may revisit:", "B", ["edges only", "neither edges nor vertices", "vertices only", "any vertex"], 3, "A path repeats no vertex, so no edge either."),
    mcq("y10-tpe-i4", "In a trail you may revisit a:", "A", ["vertex (but not an edge)", "edge (but not a vertex)", "edge and a vertex", "nothing"], 3, "A trail allows revisiting vertices but not edges."),
    ans("y10-tpe-i5", "For the network shown, decide whether an Eulerian trail exists. (yes/no)", "", "yes", 4, "The degrees are A = 3, B = 2, C = 3, D = 2. Exactly 2 vertices (A and C) have odd degree, so an Eulerian trail exists.", ["Yes"], { diagram: netEnvelope, hint: "Find the degree of each vertex, then count how many are odd." }),
  ],
  masteryQuiz: [
    mcq("y10-tpe-m1", "No repeated vertex describes a:", "B", ["trail", "path", "circuit", "walk"], 2, "A path has no repeated vertex."),
    mcq("y10-tpe-m2", "No repeated edge describes a:", "A", ["trail", "path", "face", "loop"], 2, "A trail has no repeated edge."),
    mcq("y10-tpe-m3", "All vertices having even degree guarantees an Eulerian:", "C", ["path", "trail only", "circuit", "tree"], 4, "All-even degrees give an Eulerian circuit."),
    ans("y10-tpe-m4", "For the network shown, decide whether an Eulerian trail exists. (yes/no)", "", "no", 4, "Every vertex is joined to the other three, so all four degrees are 3. Four odd-degree vertices is more than 2, so no Eulerian trail exists.", ["No"], { diagram: netK4, hint: "Find the degree of each vertex, then count how many are odd." }),
    mcq("y10-tpe-m5", "A closed route with no repeated edge is a:", "C", ["path", "open trail", "circuit", "loop"], 3, "A closed trail is a circuit."),
    mcq("y10-tpe-m6", "Every edge exactly once, returning to the start, is an Eulerian:", "B", ["trail", "circuit", "path", "tree"], 3, "Returning to start makes it an Eulerian circuit."),
    ans("y10-tpe-m7", "How many odd-degree vertices does an Eulerian circuit require?", "\\text{Eulerian circuit}", "0", 4, "An Eulerian circuit needs 0 odd-degree vertices (all even).", []),
    mcq("y10-tpe-m8", "Revisiting a vertex is allowed in a:", "A", ["trail (not a path)", "path", "neither", "both equally"], 3, "A trail allows vertex revisits; a path does not."),
    ans("y10-tpe-m9", "For the network shown, decide whether an Eulerian circuit exists. (yes/no)", "", "yes", 4, "The degrees are A = 2, B = 2, C = 4, D = 2, E = 2 — every degree is even, so an Eulerian circuit exists.", ["Yes"], { diagram: netBowtie, hint: "Find the degree of each vertex. An Eulerian circuit needs every degree to be even." }),
    mcq("y10-tpe-m10", "The key rule for Eulerian trails counts the number of:", "B", ["edges", "odd-degree vertices", "faces", "loops"], 3, "Eulerian existence depends on the count of odd-degree vertices."),
  ],
  commonMistakes: [
    { mistake: "Swapping the trail and path definitions.", fix: "Trail = no repeated EDGE; path = no repeated VERTEX." },
    { mistake: "Counting edges for the Eulerian test.", fix: "Count ODD-degree vertices: 0 or 2 for a trail, 0 for a circuit." },
    { mistake: "Thinking 1 odd-degree vertex is possible.", fix: "Odd-degree vertices always come in even numbers — never exactly 1." },
    { mistake: "Calling an open route a circuit.", fix: "A circuit must return to its starting vertex." },
  ],
  masteryPassMark: 0.8,
};

// ── 11D Shortest Path Problems (extending) ─────────────────────────────────────────────
const shortestPath: Partial<ExplicitLesson> = {
  description: "Find shortest paths by minimum total weight, and distinguish them from fewest-edge routes and minimum spanning trees.",
  learningIntention: "Compare weighted routes and separate shortest-path from spanning-tree problems.",
  successCriteria: ["Find the shortest route by least total weight.", "Explain that shortest path ≠ fewest edges.", "Describe a spanning tree and a minimum spanning tree.", "Distinguish shortest path from minimum spanning tree."],
  teaching: {
    paragraphs: [
      "In a WEIGHTED network each edge carries a number — a distance, time or cost. The SHORTEST PATH between two vertices is the route with the least TOTAL WEIGHT, found by adding the edge weights along each route and comparing.",
      "Crucially, shortest path is NOT the same as fewest edges. A route using more edges can have a smaller total weight: 3 short hops of 3 (total 9) beat 2 long hops of 5 and 9 (total 14). Always compare totals, not edge counts.",
      "A SPANNING TREE is a set of edges that connects ALL the vertices with no cycles; for n vertices it always uses exactly n − 1 edges. The MINIMUM SPANNING TREE (MST) is the spanning tree with the least total weight — the cheapest way to connect everything.",
      "Shortest path and MST solve DIFFERENT problems: shortest path links TWO chosen vertices as lightly as possible; an MST links ALL vertices as cheaply as possible. Don't confuse them — same network, different goals.",
    ],
    latexBlocks: ["\\text{shortest path} = \\text{least total weight (not fewest edges)}", "\\text{spanning tree of } n \\text{ vertices: } n-1 \\text{ edges}", "\\text{shortest path} \\ne \\text{minimum spanning tree}"],
  },
  workedExamples: [
    { title: "Compare totals", questionLatex: "\\text{Route A: } 3+3+3=9.\\ \\text{Route B: } 5+9=14.\\ \\text{Shortest?}", steps: [{ explanation: "Compare total weights, not edge counts.", latex: "9 < 14" }], finalAnswerLatex: "\\text{Route A (9)}" },
    { title: "Spanning tree size", questionLatex: "\\text{How many edges in a spanning tree of 6 vertices?}", steps: [{ explanation: "A spanning tree of n vertices has n − 1 edges.", latex: "6 - 1 = 5" }], finalAnswerLatex: "5" },
    { title: "Different problems", questionLatex: "\\text{Connect ALL vertices cheaply — which problem?}", steps: [{ explanation: "All vertices, least total weight.", latex: "\\text{minimum spanning tree}" }], finalAnswerLatex: "\\text{MST}" },
  ],
  guidedPractice: [
    mcq("y10-spp-g1", "The shortest path minimises the total:", "A", ["weight (distance/cost)", "number of edges", "number of vertices", "degree"], 4, "Shortest path means least total weight."),
    mcq("y10-spp-g2", "Shortest path means:", "B", ["fewest edges", "least total weight, not fewest edges", "most edges", "highest weight"], 4, "It is about least total weight, which need not be the fewest edges."),
    ans("y10-spp-g3", "In the weighted network shown, find the total weight of the shortest route from A to C.", "", "9", 3, "Via B: 5 + 4 = 9. Direct: 10. The two-edge route wins, so the shortest total weight is 9.", [], { diagram: netW1, hint: "Add the weights along each possible route from A to C, then compare the totals." }),
    mcq("y10-spp-g4", "A spanning tree:", "C", ["connects only two vertices", "has cycles", "connects all vertices with no cycles", "is the heaviest route"], 4, "A spanning tree connects every vertex with no cycles."),
  ],
  independentPractice: [
    mcq("y10-spp-i1", "Fewest edges and shortest path are:", "A", ["not always the same", "always the same", "always opposite", "both about cycles"], 4, "A route with more edges can still have a smaller total weight."),
    ans("y10-spp-i2", "In the weighted network shown, find the total weight of the shortest route from P to S.", "", "9", 4, "Top route P–Q–R–S: 3 + 3 + 3 = 9. Bottom route P–T–S: 4 + 6 = 10. The three-edge route is shorter, so the answer is 9.", [], { diagram: netW2, hint: "Total each route's weights — the route with more edges can still be shorter." }),
    mcq("y10-spp-i3", "A minimum spanning tree has:", "B", ["the most total weight", "the least total weight connecting all vertices", "exactly two edges", "cycles"], 5, "An MST connects all vertices with minimum total weight."),
    ans("y10-spp-i4", "How many edges does a spanning tree of n vertices have?", "n \\text{ vertices}", "n-1", 4, "A spanning tree of n vertices has n − 1 edges.", ["n − 1"]),
    mcq("y10-spp-i5", "Shortest path and minimum spanning tree:", "C", ["are the same problem", "both connect all vertices", "solve different problems", "both ignore weights"], 5, "Shortest path links two vertices; MST links all vertices."),
  ],
  masteryQuiz: [
    mcq("y10-spp-m1", "Shortest path is measured by:", "A", ["total weight", "number of edges", "number of faces", "highest single weight"], 4, "Shortest path = least total weight."),
    ans("y10-spp-m2", "In the weighted network shown, find the total weight of the shortest route from A to C.", "", "5", 3, "Top route A–B–C: 3 + 4 = 7. Bottom route A–D–C: 2 + 3 = 5. The shortest total weight is 5.", [], { diagram: netW3, hint: "Add the weights along each route from A to C, then compare." }),
    mcq("y10-spp-m3", "A route with more edges can still be:", "A", ["shorter (lower total weight)", "always longer", "non-existent", "a cycle"], 4, "More edges does not mean more total weight."),
    mcq("y10-spp-m4", "A minimum spanning tree connects all vertices with:", "B", ["maximum total weight", "minimum total weight", "exactly 2 edges", "a cycle"], 5, "An MST uses the least total weight to connect all vertices."),
    ans("y10-spp-m5", "How many edges in a spanning tree of 6 vertices?", "6 \\text{ vertices}", "5", 4, "6 − 1 = 5.", []),
    mcq("y10-spp-m6", "The shortest path between two points is NOT the same as:", "C", ["a weighted edge", "a single vertex", "a minimum spanning tree", "the total weight"], 5, "Shortest path (two vertices) differs from MST (all vertices)."),
    ans("y10-spp-m7", "In the weighted network shown, find the total weight of the shortest route from A to D.", "", "9", 4, "Via B: 5 + 7 = 12. Via C: 4 + 5 = 9. Direct: 15. The shortest total weight is 9, through C.", [], { diagram: netW4, hint: "There are three routes from A to D — total each one before choosing." }),
    mcq("y10-spp-m8", "Weights on edges represent:", "A", ["distance / time / cost", "the number of vertices", "the degree", "the number of faces"], 3, "Edge weights model distance, time or cost."),
    ans("y10-spp-m9", "How many edges in a spanning tree of 10 vertices?", "10 \\text{ vertices}", "9", 4, "10 − 1 = 9.", []),
    mcq("y10-spp-m10", "The goal of a shortest-path problem is to:", "B", ["connect all vertices", "minimise total weight between two vertices", "maximise the weight", "remove all edges"], 5, "Shortest path minimises total weight between two chosen vertices."),
  ],
  commonMistakes: [
    { mistake: "Choosing the route with the fewest edges as 'shortest'.", fix: "Add the weights — shortest means least total weight." },
    { mistake: "Confusing a spanning tree with a shortest path.", fix: "A spanning tree connects ALL vertices; shortest path links two." },
    { mistake: "Forgetting a spanning tree of n vertices has n − 1 edges.", fix: "Always n − 1 edges, with no cycles." },
    { mistake: "Treating MST and shortest path as the same answer.", fix: "They optimise different things — don't reuse one for the other." },
  ],
  masteryPassMark: 0.8,
};

const SECTIONS: Record<string, Partial<ExplicitLesson>> = {
  "introduction-to-networks": introNetworks,
  "isomorphic-planar-graphs": isomorphicPlanar,
  "trails-paths-eulerian": trailsPathsEulerian,
  "shortest-path-problems": shortestPath,
};

export function year10NetworksWave8LessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    !["year-10-mathematics", "year-10-mathematics-advanced", "year-10-mathematics-core"].includes(course.slug) ||
    unit.slug !== "networks"
  ) {
    return null;
  }
  return SECTIONS[lesson.slug] ?? null;
}
