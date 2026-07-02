// Year 12 Standard 1 — Unit 2 "Networks and Paths" — Wave 6 authored sections (all net-new).
//
//   2A Networks                  (networks-introduction)
//   2B Travelling a Network      (networks-travelling)
//   2C Drawing a Network Diagram (networks-drawing)
//   2D Eulerian & Hamiltonian Walks (networks-eulerian-hamiltonian)
//   2E Network Problems          (networks-problems)
//   2F Minimal Spanning Trees    (networks-minimal-spanning-trees)
//   2G Shortest Path             (networks-shortest-path)
//
// Standard-1-appropriate (MS-N1): no critical-path / Gantt depth (that is Standard 2). Network
// diagram primitives mined from the Year-11-Standard convention (field `diagram`, coords ~0–450
// × 0–300). Pattern matches Waves 1–5: Feynman teaching, 4/5/10 with EXACTLY 1/1/3 MCQs per
// section, authored cognitive-demand difficulty, markable answers. IDs unprefixed; `y12s1-` auto-added.

import type { CoursePathwaySeed, CourseLessonSeed, CourseUnitSeed } from "../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "./differentialCalculus";
import type { NetworkDiagram } from "./types";

const UNIT = "networks-and-paths";

function ans(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  difficulty: number,
  hint: string,
  explanation: string,
  acceptedAnswers: string[] = [],
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

function mcq(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  difficulty: number,
  hint: string,
  explanation: string,
  extra: Partial<PracticeQuestion> = {}
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer,
    acceptedAnswers: [],
    difficulty,
    hint,
    explanation,
    ...extra,
  };
}

// Unweighted network: vertices A,B,C,D,E; edges A-B, A-C, A-D, B-D, C-D, D-E.
// Degrees: A=3, B=2, C=2, D=4, E=1 (odd vertices A and E → Euler path, not circuit).
const netA: NetworkDiagram = {
  description:
    "Network with vertices A, B, C, D, E. Edges join A–B, A–C, A–D, B–D, C–D and D–E. Vertex D is the central hub joined to A, B, C and E; vertex E joins only to D.",
  vertices: [
    { id: "A", label: "A", x: 80, y: 90 },
    { id: "B", label: "B", x: 230, y: 60 },
    { id: "C", label: "C", x: 230, y: 230 },
    { id: "D", label: "D", x: 350, y: 150 },
    { id: "E", label: "E", x: 450, y: 150 },
  ],
  edges: [
    { from: "A", to: "B" }, { from: "A", to: "C" }, { from: "A", to: "D" },
    { from: "B", to: "D" }, { from: "C", to: "D" }, { from: "D", to: "E" },
  ],
};

// All-even network: square A-B-C-D-A. Every vertex has degree 2 → an Euler circuit exists.
const netSquare: NetworkDiagram = {
  description: "Square network with vertices A, B, C, D and edges A–B, B–C, C–D and D–A; every vertex has degree 2.",
  vertices: [
    { id: "A", label: "A", x: 120, y: 80 },
    { id: "B", label: "B", x: 320, y: 80 },
    { id: "C", label: "C", x: 320, y: 240 },
    { id: "D", label: "D", x: 120, y: 240 },
  ],
  edges: [
    { from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "D" }, { from: "D", to: "A" },
  ],
};

// Weighted network of towns: A,B,C,D,E with distances (km).
// Edges: A-B 6, A-C 4, B-C 2, B-D 5, C-E 7, D-E 3.
// Shortest A→E = 11 (A-C-E). MST weight = 14 (B-C 2, D-E 3, A-C 4, B-D 5), 4 edges.
const netW: NetworkDiagram = {
  description:
    "Weighted network of towns A, B, C, D, E with road distances in km: A–B 6, A–C 4, B–C 2, B–D 5, C–E 7, D–E 3.",
  vertices: [
    { id: "A", label: "A", x: 70, y: 150 },
    { id: "B", label: "B", x: 210, y: 70 },
    { id: "C", label: "C", x: 210, y: 230 },
    { id: "D", label: "D", x: 360, y: 70 },
    { id: "E", label: "E", x: 360, y: 230 },
  ],
  edges: [
    { from: "A", to: "B", weight: 6 }, { from: "A", to: "C", weight: 4 },
    { from: "B", to: "C", weight: 2 }, { from: "B", to: "D", weight: 5 },
    { from: "C", to: "E", weight: 7 }, { from: "D", to: "E", weight: 3 },
  ],
};

// ── 2A Networks ──────────────────────────────────────────────────────────────────────
export function year12Standard1NetworksIntroductionLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "networks-introduction") {
    return null;
  }
  return {
    description:
      "Read a network diagram: vertices and edges, the degree of a vertex, adjacency, and the handshake fact that the degrees sum to twice the number of edges.",
    learningIntention:
      "Identify the vertices, edges and degrees in a network and use the sum-of-degrees relationship.",
    successCriteria: [
      "Identify the vertices (nodes) and edges (connections) of a network.",
      "Find the degree of a vertex by counting the edges meeting it.",
      "Decide whether two vertices are adjacent (directly joined).",
      "Use the fact that the degrees of all vertices add to twice the number of edges.",
    ],
    teaching: {
      paragraphs: [
        "A network is just a map of CONNECTIONS. Picture towns joined by roads, or friends who know each other: draw a dot for each thing (a vertex, or node) and a line between two dots that are connected (an edge). Strip away the geography — only what connects to what matters — and you have a network. The same picture models flights between cities, pipes between tanks, or links between web pages.",
        "The DEGREE of a vertex is simply how many edges meet it — how many roads leave that town. Count the lines touching the dot. A town with three roads has degree 3; a dead-end town with one road has degree 1. Degree measures how 'connected' a single vertex is.",
        "Two vertices are ADJACENT if there is an edge directly joining them. A and D being adjacent means there is a single road from A to D; if you have to pass through another town, they are not adjacent (though they may still be connected by a longer route).",
        "There is a neat counting fact: every edge has two ends, so it adds 1 to the degree of each vertex it touches — 2 in total. That means the degrees of ALL the vertices always add up to exactly TWICE the number of edges. If a network has 6 edges, the degrees sum to 12. This is a quick way to check your degree counts.",
      ],
      latexBlocks: [
        "\\text{vertex (node)} = \\text{a dot};\\quad \\text{edge} = \\text{a line joining two vertices}",
        "\\text{degree of a vertex} = \\text{number of edges meeting it}",
        "\\text{sum of all degrees} = 2 \\times (\\text{number of edges})",
      ],
    },
    workedExamples: [
      {
        title: "Count vertices, edges and a degree",
        questionLatex: "\\text{For the network shown, count the vertices and edges and find the degree of D.}",
        steps: [
          { explanation: "Count the dots and the lines.", latex: "5 \\text{ vertices},\\ 6 \\text{ edges}" },
          { explanation: "Count the edges meeting D (to A, B, C, E).", latex: "\\deg(D) = 4" },
        ],
        finalAnswerLatex: "5 \\text{ vertices, } 6 \\text{ edges, } \\deg(D) = 4",
        diagram: netA,
      },
      {
        title: "Check with the sum-of-degrees fact",
        questionLatex: "\\text{A network has 6 edges. What do all the degrees add to?}",
        steps: [
          { explanation: "Each edge contributes 2 to the total degree.", latex: "2 \\times 6 = 12" },
        ],
        finalAnswerLatex: "12",
      },
    ],
    guidedPractice: [
      mcq("nint-g1", "In a network diagram, the dots are called:", "B",
        ["edges", "vertices (nodes)", "paths", "weights"], 1,
        "The dots represent the things being connected.",
        "The dots are the vertices (or nodes); the lines joining them are the edges."),
      ans("nint-g2", "Using the network shown, how many vertices does it have?", "\\text{count the dots}", "5", 2,
        "Count the dots.", "The network has 5 vertices: A, B, C, D and E.", [], { diagram: netA }),
      ans("nint-g3", "Using the network shown, how many edges does it have?", "\\text{count the lines}", "6", 2,
        "Count the lines.", "There are 6 edges: A–B, A–C, A–D, B–D, C–D and D–E.", [], { diagram: netA }),
      ans("nint-g4", "Using the network shown, what is the degree of vertex B?", "\\text{edges meeting B}", "2", 2,
        "Count the edges meeting B.", "B is joined to A and D, so its degree is 2.", [], { diagram: netA }),
    ],
    independentPractice: [
      ans("nint-i1", "Using the network shown, what is the degree of vertex A?", "\\text{edges meeting A}", "3", 3,
        "Count the edges meeting A.", "A is joined to B, C and D, so its degree is 3.", [], { diagram: netA }),
      mcq("nint-i2", "The degree of a vertex is:", "C",
        ["the number of vertices in the network", "the length of the longest edge", "the number of edges meeting that vertex", "the total number of edges"], 3,
        "It measures one vertex's connections.",
        "The degree of a vertex is the number of edges that meet it."),
      ans("nint-i3", "Using the network shown, which vertex has the highest degree?", "\\text{compare degrees}", "D", 3,
        "Find the most-connected vertex.", "D meets four edges (to A, B, C, E), more than any other vertex, so D has the highest degree.",
        ["vertex D"], { diagram: netA }),
      ans("nint-i4", "A network has 9 edges. What do all of its vertex degrees add to?", "", "18", 3,
        "Sum of degrees = 2 × edges.", "Each edge adds 2 to the total degree, so the degrees sum to 2 × 9 = 18."),
      ans("nint-i5", "Using the network shown, is vertex E adjacent to vertex A? Answer yes or no.", "\\text{direct edge?}", "no", 3,
        "Is there a single edge directly joining E and A?", "E is joined only to D, so there is no direct edge from E to A — they are not adjacent (you would go E–D–A).",
        ["No"], { diagram: netA }),
    ],
    masteryQuiz: [
      ans("nint-m1", "Using the network shown, what is the degree of vertex D?", "\\text{edges meeting D}", "4", 2,
        "Count the edges at D.", "D is joined to A, B, C and E, so its degree is 4.", [], { diagram: netA }),
      mcq("nint-m2", "Two vertices are 'adjacent' when:", "B",
        ["they have the same degree", "they are joined directly by an edge", "they are the two ends of the network", "they have no edges"], 3,
        "Adjacent means directly connected.",
        "Two vertices are adjacent when a single edge joins them directly."),
      ans("nint-m3", "Using the network shown, how many vertices have degree 2?", "\\text{count degree-2 vertices}", "2", 3,
        "Find vertices meeting exactly two edges.", "B and C each meet exactly two edges, so 2 vertices have degree 2 (A has 3, D has 4, E has 1).", [], { diagram: netA }),
      ans("nint-m4", "A network has 8 edges. What do all of its vertex degrees add to?", "", "16", 3,
        "Sum of degrees = 2 × edges.", "Degrees sum to 2 × 8 = 16."),
      mcq("nint-m5", "Using the network shown, which vertex has degree 1?", "D",
        ["Vertex A", "Vertex B", "Vertex C", "Vertex E"], 3,
        "Find the vertex meeting only one edge.", "E is joined only to D, so it meets a single edge — degree 1.", { diagram: netA }),
      ans("nint-m6", "A network's vertices have degrees 2, 3, 3 and 4. How many edges does it have?", "", "6", 3,
        "Edges = sum of degrees ÷ 2.", "Sum of degrees = 2 + 3 + 3 + 4 = 12; edges = 12 ÷ 2 = 6."),
      ans("nint-m7", "Using the network shown, list the degree of vertex C.", "\\text{edges meeting C}", "2", 2,
        "Count the edges at C.", "C is joined to A and D, so its degree is 2.", [], { diagram: netA }),
      mcq("nint-m8", "The lines joining the vertices of a network are called:", "C",
        ["nodes", "degrees", "edges", "paths"], 3,
        "They represent the connections.",
        "The connections between vertices are the edges."),
      ans("nint-m9", "A network has 5 vertices whose degrees add to 14. How many edges does it have?", "", "7", 4,
        "Edges = sum of degrees ÷ 2.", "Edges = 14 ÷ 2 = 7 (the number of vertices is not needed)."),
      ans("nint-m10", "The degrees of all vertices in any network always equal how many times the number of edges?", "", "2", 4,
        "Each edge has two ends.", "Every edge adds 1 to the degree of each of its two endpoints, so the degrees total 2 times the number of edges (twice).",
        ["twice", "two"]),
    ],
    commonMistakes: [
      { mistake: "Counting vertices when asked for edges (or vice versa).", fix: "Vertices are the dots; edges are the lines joining them." },
      { mistake: "Miscounting a vertex's degree.", fix: "Degree = number of edges meeting that vertex; recount the lines touching the dot." },
      { mistake: "Calling vertices adjacent when only connected by a longer route.", fix: "Adjacent means joined by a single direct edge." },
      { mistake: "Forgetting degrees total twice the edges.", fix: "Sum of degrees = 2 × edges — use it to check your counts." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 2B Travelling a Network ──────────────────────────────────────────────────────────
export function year12Standard1NetworksTravellingLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "networks-travelling") {
    return null;
  }
  return {
    description:
      "Travel through a network: paths (no repeated vertex), circuits (return to the start), the length of a route, and whether a route is valid.",
    learningIntention:
      "Recognise paths and circuits, count the edges in a route, and check whether a route is valid in a network.",
    successCriteria: [
      "Recognise a path as a route that does not repeat a vertex.",
      "Recognise a circuit as a route that starts and ends at the same vertex.",
      "Count the number of edges (the length) of a route.",
      "Check whether a sequence of vertices is a valid route in a network.",
    ],
    teaching: {
      paragraphs: [
        "Once you can read a network, the next idea is MOVING through it — following edges from vertex to vertex, like driving from town to town. A route is just the list of vertices you pass through in order, such as A–B–D. Each step must use an actual edge: you can only travel A–B if there is an edge joining A and B.",
        "A PATH is a route that does not repeat any vertex — you never visit the same place twice. A–C–D is a path; A–C–A is not (it revisits A). Keeping to a path matters because revisiting wastes a trip and can create loops.",
        "A CIRCUIT (or cycle) is a special route that STARTS and ENDS at the same vertex, without otherwise repeating vertices in between — like a delivery run that returns to the depot. A–B–D–C–A is a circuit because it comes back to A. The give-away is: same start and finish.",
        "The LENGTH of a route is the number of EDGES it uses (one less than the number of vertices listed, for a simple path). A–B–D uses two edges (A–B and B–D), so its length is 2. In a weighted network you would instead add the edge weights, but here length means the edge count.",
      ],
      latexBlocks: [
        "\\text{route} = \\text{a sequence of vertices joined by edges}",
        "\\text{path: no repeated vertex};\\quad \\text{circuit: starts and ends at the same vertex}",
        "\\text{length of a route} = \\text{number of edges used}",
      ],
    },
    workedExamples: [
      {
        title: "Is it a path or a circuit?",
        questionLatex: "\\text{Classify the route } A\\text{–}B\\text{–}D\\text{–}C\\text{–}A.",
        steps: [
          { explanation: "It starts and ends at the same vertex (A).", latex: "\\text{start} = \\text{end} = A" },
          { explanation: "Returning to the start makes it a circuit.", latex: "\\text{circuit}" },
        ],
        finalAnswerLatex: "\\text{Circuit}",
        diagram: netA,
      },
      {
        title: "Length of a route",
        questionLatex: "\\text{Find the length (number of edges) of the route } A\\text{–}B\\text{–}D\\text{–}E.",
        steps: [
          { explanation: "List the edges used: A–B, B–D, D–E.", latex: "3 \\text{ edges}" },
        ],
        finalAnswerLatex: "3",
        diagram: netA,
      },
    ],
    guidedPractice: [
      mcq("ntrav-g1", "A route that starts and ends at the SAME vertex is called a:", "B",
        ["path", "circuit", "vertex", "degree"], 1,
        "It returns to where it began.",
        "A route that begins and ends at the same vertex is a circuit (cycle)."),
      ans("ntrav-g2", "Using the network shown, how many edges does the route A–B–D–E use?", "\\text{count the steps}", "3", 2,
        "Count the edges between successive vertices.", "The route uses A–B, B–D and D–E — 3 edges.", [], { diagram: netA }),
      ans("ntrav-g3", "A route that visits vertices without repeating any of them is called a:", "\\text{no repeats}", "path", 2,
        "What is the name for a non-repeating route?", "A route that does not repeat any vertex is a path.",
        ["a path"]),
      ans("ntrav-g4", "Using the network shown, is A–B–D a valid route (does each step use an edge)? Answer yes or no.", "A\\text{-}B\\text{-}D", "yes", 2,
        "Check each step is a real edge.", "A–B is an edge and B–D is an edge, so A–B–D is a valid route.",
        ["Yes"], { diagram: netA }),
    ],
    independentPractice: [
      ans("ntrav-i1", "Using the network shown, how many edges does the route A–C–D–E use?", "\\text{count the steps}", "3", 2,
        "Count the edges.", "The route uses A–C, C–D and D–E — 3 edges.", [], { diagram: netA }),
      mcq("ntrav-i2", "Which statement describes a circuit?", "C",
        ["it repeats every vertex", "it has no edges", "it starts and ends at the same vertex", "it visits only one vertex"], 3,
        "Think about where it begins and ends.",
        "A circuit starts and finishes at the same vertex."),
      ans("ntrav-i3", "The route A–B–C–A begins and ends at A. Is it a circuit? Answer yes or no.", "A \\to A", "yes", 3,
        "Does it return to the start?", "It starts and ends at A without repeating other vertices, so yes, it is a circuit.",
        ["Yes"]),
      ans("ntrav-i4", "In a path, may you visit the same vertex twice? Answer yes or no.", "\\text{no repeats}", "no", 3,
        "Recall the definition of a path.", "No — a path never repeats a vertex (a route that returns to a vertex is not a path).",
        ["No"]),
      ans("ntrav-i5", "Using the network shown, the route A–D–E has how many edges?", "\\text{count the steps}", "2", 3,
        "Count the edges between successive vertices.", "The route uses A–D and D–E — 2 edges.", [], { diagram: netA }),
    ],
    masteryQuiz: [
      mcq("ntrav-m1", "Which of these routes is a circuit?", "B",
        ["A–B–D", "A–B–D–C–A", "A–C–D–E", "A–D–E"], 3,
        "A circuit returns to its starting vertex.",
        "A–B–D–C–A starts and ends at A, so it is a circuit; the others end at a different vertex from where they started."),
      ans("ntrav-m2", "Using the network shown, how many edges does the route A–B–D–C use?", "\\text{count the steps}", "3", 2,
        "Count the edges.", "The route uses A–B, B–D and D–C — 3 edges.", [], { diagram: netA }),
      ans("ntrav-m3", "A route lists 5 vertices with no repeats. How many edges does this path use?", "", "4", 3,
        "A simple path of n vertices uses n − 1 edges.", "A path through 5 vertices uses 5 − 1 = 4 edges."),
      ans("ntrav-m4", "Using the network shown, is E–D–A–B a valid route? Answer yes or no.", "\\text{check each edge}", "yes", 3,
        "Check E–D, D–A and A–B are all edges.", "E–D, D–A and A–B are all edges, so E–D–A–B is a valid route.",
        ["Yes"], { diagram: netA }),
      mcq("ntrav-m5", "The length of a route in an unweighted network is:", "B",
        ["the number of vertices visited", "the number of edges used", "the highest degree on the route", "always 1"], 3,
        "Length counts the steps between vertices.",
        "The length of a route is the number of edges it uses."),
      ans("ntrav-m6", "A circuit returns to its start after visiting 4 different vertices. How many edges does it use?", "", "4", 4,
        "A circuit through 4 vertices needs an edge back to the start.", "Visiting 4 vertices and returning to the start uses 4 edges (the last one closes the loop)."),
      ans("ntrav-m7", "Using the network shown, does a route exist from A to E? Answer yes or no.", "A \\to ... \\to E", "yes", 3,
        "Can you reach E by following edges from A?", "Yes — for example A–D–E reaches E, so a route from A to E exists.",
        ["Yes"], { diagram: netA }),
      mcq("ntrav-m8", "A route A–C–A is NOT a path because:", "B",
        ["it has too many edges", "it repeats the vertex A", "it has no circuit", "it uses a weight"], 3,
        "Paths cannot repeat a vertex.",
        "A–C–A revisits A, and a path may not repeat any vertex, so it is not a path."),
      ans("ntrav-m9", "Using the network shown, how many edges does the route A–C–D–B use?", "\\text{count the steps}", "3", 3,
        "Count A–C, C–D, D–B.", "The route uses A–C, C–D and D–B — 3 edges.", [], { diagram: netA }),
      ans("ntrav-m10", "A delivery van leaves the depot, visits 6 other stops without repeating any, and returns to the depot. How many edges (legs) does its circuit use?", "", "7", 4,
        "Count the depot plus 6 stops, then the leg back.", "The circuit visits 7 vertices (depot + 6 stops) and returns to the depot, using 7 edges in total."),
    ],
    commonMistakes: [
      { mistake: "Confusing a path with a circuit.", fix: "A circuit returns to its starting vertex; a path does not." },
      { mistake: "Counting vertices instead of edges for the length.", fix: "Length = edges used = (number of vertices − 1) for a simple path." },
      { mistake: "Calling a vertex-repeating route a path.", fix: "A path never repeats a vertex." },
      { mistake: "Assuming any vertex sequence is a valid route.", fix: "Each consecutive pair must be joined by an actual edge." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 2C Drawing a Network Diagram ─────────────────────────────────────────────────────
export function year12Standard1NetworksDrawingLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "networks-drawing") {
    return null;
  }
  return {
    description:
      "Translate a real situation into a network: choosing vertices and edges, counting them from a description, and reading a connection table.",
    learningIntention:
      "Represent a practical situation as a network by choosing what the vertices and edges stand for, and count them.",
    successCriteria: [
      "Decide what the vertices and edges represent for a given situation.",
      "Count the vertices and edges implied by a description.",
      "Read connections from a simple table into a network.",
      "Recognise when two situations have the same network structure.",
    ],
    teaching: {
      paragraphs: [
        "Drawing a network is a modelling decision: you choose what the dots and lines MEAN. For roads between towns, the towns are vertices and the roads are edges. For friendships, the people are vertices and a shared friendship is an edge. The first question is always: what is being connected (vertices), and what counts as a connection (edges)?",
        "Counting comes straight from the description. 'Five towns, each road joins two of them' — five vertices, and one edge for every road listed. If a passage says 'A connects to B and C; B also connects to D', that is the edges A–B, A–C and B–D — three edges across four vertices.",
        "Connections are often given as a TABLE or a list. A row 'A: B, C' means A is joined to B and to C. Reading each row gives the edges; just be careful not to count the same edge twice (A–B and B–A are the SAME edge in an undirected network).",
        "Finally, the PICTURE can be moved around without changing the network. Two diagrams that look different can have the same vertices and the same connections — they are the same network. What matters is which vertices are joined, not where you place the dots on the page.",
      ],
      latexBlocks: [
        "\\text{choose: vertices} = \\text{the things};\\ \\text{edges} = \\text{the connections}",
        "\\text{each listed connection} = \\text{one edge}",
        "A\\text{–}B \\text{ and } B\\text{–}A \\text{ are the same (undirected) edge}",
      ],
    },
    workedExamples: [
      {
        title: "Count vertices and edges from a description",
        questionLatex: "\\text{Four friends: Ann knows Bo and Cal; Bo also knows Di. How many vertices and edges?}",
        steps: [
          { explanation: "Each friend is a vertex.", latex: "4 \\text{ vertices}" },
          { explanation: "Each 'knows' is one edge: Ann–Bo, Ann–Cal, Bo–Di.", latex: "3 \\text{ edges}" },
        ],
        finalAnswerLatex: "4 \\text{ vertices, } 3 \\text{ edges}",
      },
      {
        title: "Read a connection table",
        questionLatex: "\\text{Table — A: B, C;\\ B: C. How many edges?}",
        steps: [
          { explanation: "Row A gives A–B and A–C; row B gives B–C.", latex: "A\\text{–}B,\\ A\\text{–}C,\\ B\\text{–}C" },
          { explanation: "Count distinct edges.", latex: "3 \\text{ edges}" },
        ],
        finalAnswerLatex: "3 \\text{ edges}",
      },
    ],
    guidedPractice: [
      mcq("ndraw-g1", "To model roads between towns as a network, the towns are the:", "A",
        ["vertices, and the roads are the edges", "edges, and the roads are the vertices", "weights", "circuits"], 1,
        "Vertices are the things; edges are the connections.",
        "The towns (the things being connected) are the vertices, and the roads (the connections) are the edges."),
      ans("ndraw-g2", "Five towns are to be drawn as a network. How many vertices are needed?", "\\text{one per town}", "5", 2,
        "One vertex per town.", "Each town is a vertex, so 5 towns need 5 vertices."),
      ans("ndraw-g3", "A network has the edges A–B, A–C and B–C. How many edges is that?", "\\text{count distinct edges}", "3", 2,
        "Count the listed connections.", "There are 3 edges: A–B, A–C and B–C."),
      ans("ndraw-g4", "In an undirected network, are A–B and B–A the same edge? Answer yes or no.", "A\\text{-}B = B\\text{-}A", "yes", 2,
        "Direction does not matter in an undirected network.", "Yes — A–B and B–A describe the same single undirected edge.",
        ["Yes"]),
    ],
    independentPractice: [
      ans("ndraw-i1", "Four friends: Ann knows Bo and Cal; Bo also knows Di. How many edges does the friendship network have?", "\\text{count each friendship}", "3", 2,
        "Each friendship is one edge.", "The friendships are Ann–Bo, Ann–Cal and Bo–Di — 3 edges."),
      mcq("ndraw-i2", "A diagram can be redrawn with the dots in different places. The network is the same as long as:", "C",
        ["the dots are in the same positions", "the diagram looks identical", "the same vertices are joined by the same edges", "the edges are the same length"], 3,
        "Position does not define a network.",
        "Two diagrams are the same network when the same pairs of vertices are joined — position and edge length do not matter."),
      ans("ndraw-i3", "Connection table — A: B, C; B: C, D. How many edges does the network have?", "\\text{list distinct edges}", "4", 3,
        "List the edges, avoiding double-counting.", "Row A: A–B, A–C. Row B: B–C, B–D. Distinct edges: A–B, A–C, B–C, B–D = 4 edges."),
      ans("ndraw-i4", "Six computers are each connected to one central server (and to nothing else). How many edges are there?", "\\text{one per computer}", "6", 3,
        "Each computer has one cable to the server.", "Each of the 6 computers has a single edge to the server, so there are 6 edges (a 'star')."),
      ans("ndraw-i5", "In the situation in i4, how many vertices does the network have?", "", "7", 3,
        "Count the computers and the server.", "6 computers plus 1 server gives 7 vertices."),
    ],
    masteryQuiz: [
      ans("ndraw-m1", "Eight bus stops are to be shown as a network. How many vertices are needed?", "\\text{one per stop}", "8", 2,
        "One vertex per stop.", "Each stop is a vertex, so 8 stops need 8 vertices."),
      mcq("ndraw-m2", "When modelling a situation as a network, the edges represent:", "B",
        ["the objects being connected", "the connections between objects", "the number of objects", "the positions of objects"], 3,
        "Edges are the links.",
        "The edges represent the connections (links/relationships) between the objects, which are the vertices."),
      ans("ndraw-m3", "Connection table — A: B, C, D; B: C. How many edges does the network have?", "\\text{distinct edges}", "4", 3,
        "List distinct edges.", "Row A: A–B, A–C, A–D. Row B: B–C. Distinct edges: A–B, A–C, A–D, B–C = 4."),
      ans("ndraw-m4", "Five towns are all directly connected to each other (every pair has a road). How many edges is that?", "", "10", 4,
        "Each of 5 towns joins the other 4, but each road is shared by two towns.", "Number of edges = 5 × 4 ÷ 2 = 10 (every pair of towns joined once)."),
      mcq("ndraw-m5", "Two network diagrams look completely different but join exactly the same pairs of vertices. They are:", "A",
        ["the same network", "always different networks", "impossible", "only the same if drawn identically"], 3,
        "A network is defined by its connections.",
        "If the same vertices are joined by the same edges, it is the same network regardless of how it is drawn."),
      ans("ndraw-m6", "Three friends who all know each other are drawn as a network. How many edges?", "", "3", 3,
        "Each pair of the 3 friends shares one edge.", "The pairs are 1–2, 1–3 and 2–3, so 3 edges (a triangle)."),
      ans("ndraw-m7", "A network is drawn with 7 vertices and the connection list gives 9 distinct links. How many edges does it have?", "\\text{count the links}", "9", 2,
        "Each distinct link is an edge.", "There are 9 distinct links, so 9 edges."),
      mcq("ndraw-m8", "Reading the row 'A: B, C' in a connection table gives which edges?", "B",
        ["B–C only", "A–B and A–C", "A only", "A–B–C as one edge"], 3,
        "The row lists everything A connects to.",
        "The row 'A: B, C' means A is joined to B and to C — the edges A–B and A–C."),
      ans("ndraw-m9", "Ten houses are each connected only to the two houses next to them in a straight street (the first and last have one neighbour). How many edges?", "", "9", 4,
        "Edges join consecutive houses along the line.", "A line of 10 houses has an edge between each consecutive pair: 10 − 1 = 9 edges."),
      ans("ndraw-m10", "Four cities are connected in a single loop (each city to the next, and the last back to the first). How many edges?", "\\text{loop of 4}", "4", 4,
        "A loop returns to the start.", "A loop of 4 cities uses 4 edges (the last edge closes the loop)."),
    ],
    commonMistakes: [
      { mistake: "Swapping what the vertices and edges represent.", fix: "Vertices are the objects; edges are the connections between them." },
      { mistake: "Counting A–B and B–A as two edges.", fix: "In an undirected network they are the same single edge." },
      { mistake: "Thinking a redrawn diagram is a new network.", fix: "Same vertices joined the same way = the same network, however it is drawn." },
      { mistake: "Forgetting to halve when every pair is joined.", fix: "All pairs of n vertices give n(n − 1)/2 edges (each road shared by two)." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 2D Eulerian & Hamiltonian Walks ──────────────────────────────────────────────────
export function year12Standard1NetworksEulerianHamiltonianLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "networks-eulerian-hamiltonian") {
    return null;
  }
  return {
    description:
      "Eulerian trails/circuits (use every edge once) and Hamiltonian paths/cycles (visit every vertex once), and the odd-degree test for Eulerian routes.",
    learningIntention:
      "Distinguish Eulerian (every edge once) from Hamiltonian (every vertex once) routes and apply the odd-degree test.",
    successCriteria: [
      "Describe an Eulerian trail/circuit as using every EDGE exactly once.",
      "Describe a Hamiltonian path/cycle as visiting every VERTEX exactly once.",
      "Use the count of odd-degree vertices to decide if an Eulerian route exists.",
      "Tell the two ideas apart in a context.",
    ],
    teaching: {
      paragraphs: [
        "Two famous kinds of journey have different goals. An EULERIAN route is about the EDGES: travel along every edge exactly once (think of a snow-plough that must clear every road once, or drawing a shape without lifting your pen). A HAMILTONIAN route is about the VERTICES: visit every vertex exactly once (think of a salesperson who must call at every town once). Edges-once is Euler; vertices-once is Hamilton.",
        "Eulerian routes have a beautifully simple test based on ODD-degree vertices (vertices with an odd number of edges). If there are NO odd-degree vertices, you can travel every edge once and return to the start — an Euler CIRCUIT. If there are exactly TWO odd-degree vertices, you can travel every edge once but must start at one odd vertex and finish at the other — an Euler TRAIL (path). More than two odd vertices: no Eulerian route exists.",
        "The reason is intuitive: every time you pass THROUGH a vertex you use one edge to arrive and one to leave, so you need edges in pairs — an even degree. Odd-degree vertices can only be the start or the end, and a journey has at most two of those.",
        "Hamiltonian routes have no such neat rule — you check by trying to find a route that hits every vertex once. Keep the two separate: Euler counts EDGES and uses the odd-degree test; Hamilton counts VERTICES and is found by inspection.",
      ],
      latexBlocks: [
        "\\text{Eulerian: every EDGE once};\\quad \\text{Hamiltonian: every VERTEX once}",
        "0 \\text{ odd-degree vertices} \\Rightarrow \\text{Euler circuit}",
        "2 \\text{ odd-degree vertices} \\Rightarrow \\text{Euler trail (path)};\\ >2 \\Rightarrow \\text{none}",
      ],
    },
    workedExamples: [
      {
        title: "Odd-degree test for an Euler route",
        questionLatex: "\\text{The square network A–B–C–D–A: every vertex has degree 2. Does an Euler circuit exist?}",
        steps: [
          { explanation: "Count odd-degree vertices.", latex: "\\text{all degree 2} \\Rightarrow 0 \\text{ odd}" },
          { explanation: "Zero odd vertices means an Euler circuit exists.", latex: "\\text{yes}" },
        ],
        finalAnswerLatex: "\\text{Yes — an Euler circuit exists}",
        diagram: netSquare,
      },
      {
        title: "Euler trail vs circuit",
        questionLatex: "\\text{A network has exactly 2 odd-degree vertices. What can you say?}",
        steps: [
          { explanation: "Exactly two odd vertices allows a trail, not a circuit.", latex: "2 \\text{ odd} \\Rightarrow \\text{Euler trail}" },
          { explanation: "You must start and end at the two odd vertices.", latex: "\\text{start/end at the odd vertices}" },
        ],
        finalAnswerLatex: "\\text{An Euler trail exists}",
      },
    ],
    guidedPractice: [
      mcq("neul-g1", "An Eulerian trail uses every:", "B",
        ["vertex exactly once", "edge exactly once", "vertex twice", "edge twice"], 1,
        "Euler is about edges.",
        "An Eulerian trail travels along every edge exactly once."),
      ans("neul-g2", "A route that visits every VERTEX exactly once is called a … route.", "\\text{vertices once}", "Hamiltonian", 2,
        "Which name goes with visiting every vertex once?", "Visiting every vertex exactly once is a Hamiltonian route.",
        ["hamiltonian", "Hamiltonian path"]),
      ans("neul-g3", "Using the network shown, how many vertices have an odd degree?", "\\text{count odd degrees}", "0", 2,
        "Find vertices with an odd number of edges.", "Every vertex in the square has degree 2 (even), so 0 vertices have odd degree.",
        [], { diagram: netSquare }),
      ans("neul-g4", "A network has 0 odd-degree vertices. Does an Euler circuit exist? Answer yes or no.", "0 \\text{ odd}", "yes", 2,
        "Recall the odd-degree test.", "With 0 odd-degree vertices an Euler circuit exists (you can travel every edge once and return to the start).",
        ["Yes"]),
    ],
    independentPractice: [
      ans("neul-i1", "Using the network shown, how many vertices have an odd degree? (Degrees: A 3, B 2, C 2, D 4, E 1.)", "\\text{count odd}", "2", 3,
        "Odd degrees are 3 and 1.", "A has degree 3 and E has degree 1 — both odd — so 2 vertices have odd degree.",
        [], { diagram: netA }),
      mcq("neul-i2", "A network has exactly 2 odd-degree vertices. Which is true?", "C",
        ["an Euler circuit exists", "no Euler route exists", "an Euler trail exists (start/end at the odd vertices)", "every route is Hamiltonian"], 3,
        "Two odd vertices is the trail case.",
        "Exactly two odd-degree vertices means an Euler trail exists: you can use every edge once, starting at one odd vertex and finishing at the other."),
      ans("neul-i3", "Using the network shown (2 odd-degree vertices), does an Euler TRAIL exist? Answer yes or no.", "2 \\text{ odd}", "yes", 3,
        "Two odd vertices → trail.", "With exactly 2 odd-degree vertices (A and E), an Euler trail exists, beginning at A and ending at E (or vice versa).",
        ["Yes"], { diagram: netA }),
      ans("neul-i4", "A snow plough must clear every ROAD exactly once. This requires which kind of route — Eulerian or Hamiltonian?", "\\text{every edge once}", "Eulerian", 3,
        "Roads are edges.", "Clearing every road (edge) exactly once is an Eulerian route.",
        ["euler", "Euler"]),
      ans("neul-i5", "A network has 4 odd-degree vertices. Does any Euler route exist? Answer yes or no.", ">2 \\text{ odd}", "no", 3,
        "More than 2 odd vertices.", "With more than two odd-degree vertices, no Eulerian route (trail or circuit) exists.",
        ["No"]),
    ],
    masteryQuiz: [
      mcq("neul-m1", "A Hamiltonian path visits every:", "B",
        ["edge exactly once", "vertex exactly once", "edge twice", "vertex twice"], 2,
        "Hamilton is about vertices.",
        "A Hamiltonian path visits every vertex exactly once."),
      ans("neul-m2", "Using the network shown, does an Euler circuit exist? Answer yes or no.", "0 \\text{ odd}", "yes", 3,
        "Count odd-degree vertices first.", "Every vertex of the square has degree 2 (0 odd), so an Euler circuit exists.",
        ["Yes"], { diagram: netSquare }),
      ans("neul-m3", "A network's vertex degrees are 2, 2, 3, 3. How many odd-degree vertices are there?", "\\text{count odd}", "2", 3,
        "Odd degrees are the 3s.", "Two vertices have degree 3 (odd), so there are 2 odd-degree vertices (an Euler trail exists)."),
      ans("neul-m4", "A delivery driver must visit every TOWN exactly once. Which kind of route is this — Eulerian or Hamiltonian?", "\\text{every vertex once}", "Hamiltonian", 3,
        "Towns are vertices.", "Visiting every town (vertex) exactly once is a Hamiltonian route.",
        ["hamiltonian"]),
      mcq("neul-m5", "If a network has more than two odd-degree vertices, then:", "C",
        ["an Euler circuit exists", "an Euler trail exists", "no Euler route exists", "a Hamiltonian route is guaranteed"], 3,
        "Recall the three cases of the odd-degree test.",
        "More than two odd-degree vertices means no Eulerian route (trail or circuit) is possible."),
      ans("neul-m6", "All vertices of a network have even degree. How many odd-degree vertices are there?", "\\text{all even}", "0", 2,
        "Even degree means not odd.", "If every vertex is even, the number of odd-degree vertices is 0 (so an Euler circuit exists)."),
      ans("neul-m7", "A network has exactly 2 odd-degree vertices. At which vertices must an Euler trail start and finish?", "\\text{the odd ones}", "the odd-degree vertices", 4,
        "Where can a trail begin and end?", "An Euler trail must start at one odd-degree vertex and finish at the other.",
        ["odd vertices", "the two odd vertices", "the odd-degree ones"]),
      mcq("neul-m8", "Drawing a figure 'without lifting your pen and without retracing any line' is finding a/an:", "B",
        ["Hamiltonian path", "Eulerian trail", "minimal spanning tree", "shortest path"], 3,
        "No line retraced = every edge once.",
        "Tracing every line once without lifting the pen is an Eulerian trail (every edge exactly once)."),
      ans("neul-m9", "A network has degrees 1, 1, 2, 2, 4. State the number of odd-degree vertices, then say whether an Euler trail exists (yes/no). Give the count.", "\\text{count odd}", "2", 4,
        "Count the odd degrees (the 1s).", "Two vertices have degree 1 (odd), so there are 2 odd-degree vertices — meaning an Euler trail does exist."),
      ans("neul-m10", "Does the odd-degree test apply to Hamiltonian routes? Answer yes or no.", "\\text{Euler test only}", "no", 4,
        "Which kind of route does the odd-degree test decide?", "No — the odd-degree test is for Eulerian routes (about edges). Hamiltonian routes (about vertices) have no such simple test and are checked by inspection.",
        ["No"]),
    ],
    commonMistakes: [
      { mistake: "Mixing up Eulerian and Hamiltonian.", fix: "Eulerian = every EDGE once; Hamiltonian = every VERTEX once." },
      { mistake: "Forgetting the odd-degree thresholds.", fix: "0 odd → circuit; 2 odd → trail; more than 2 → no Euler route." },
      { mistake: "Starting an Euler trail at the wrong vertex.", fix: "A trail must start and end at the two odd-degree vertices." },
      { mistake: "Applying the odd-degree test to Hamiltonian routes.", fix: "The odd-degree test is only for Eulerian routes." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 2E Network Problems ──────────────────────────────────────────────────────────────
export function year12Standard1NetworksProblemsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "networks-problems") {
    return null;
  }
  return {
    description:
      "Solve practical network problems: connectivity, finding and comparing routes, total route weight, and reasoning from network constraints.",
    learningIntention:
      "Interpret a weighted network to find connections, compare routes by total weight, and reason about the network.",
    successCriteria: [
      "Decide whether two vertices are connected and find a route between them.",
      "Find the total weight (cost/distance) of a route by adding edge weights.",
      "Compare two routes and choose the cheaper or shorter one.",
      "Reason about a network from its structure and constraints.",
    ],
    teaching: {
      paragraphs: [
        "Most network questions are really practical questions in disguise: can I get from here to there, which way is cheapest, how long is this trip? Once a situation is a weighted network — towns joined by roads labelled with distances or costs — these become matters of reading the diagram and adding numbers.",
        "Two vertices are CONNECTED if some route of edges joins them (even via other vertices). To find a route, trace edges from the start until you reach the destination. There is often more than one route, which is exactly what makes comparison interesting.",
        "The TOTAL WEIGHT of a route is the sum of the weights of the edges it uses. A trip A–C–E with edges of 4 km and 7 km is 4 + 7 = 11 km. To compare options, work out the total weight of each candidate route and pick the smallest for the cheapest or shortest.",
        "Good network reasoning means checking the structure: is every place reachable, which vertex is a bottleneck (a cut point whose removal disconnects the network), how many different routes exist. You answer these by reading connections, not by formula.",
      ],
      latexBlocks: [
        "\\text{connected: some route of edges joins the two vertices}",
        "\\text{total weight of a route} = \\text{sum of its edge weights}",
        "\\text{compare routes: choose the smallest total weight}",
      ],
    },
    workedExamples: [
      {
        title: "Total weight of a route",
        questionLatex: "\\text{In the town network, find the length of the route A–C–E.}",
        steps: [
          { explanation: "Add the weights A–C and C–E.", latex: "4 + 7 = 11 \\text{ km}" },
        ],
        finalAnswerLatex: "11 \\text{ km}",
        diagram: netW,
      },
      {
        title: "Compare two routes",
        questionLatex: "\\text{Compare A–B–D (6 + 5) with A–C–E... no, compare A–B–D–E vs A–C–E from A to E.}",
        steps: [
          { explanation: "A–B–D–E = 6 + 5 + 3.", latex: "= 14 \\text{ km}" },
          { explanation: "A–C–E = 4 + 7.", latex: "= 11 \\text{ km} \\Rightarrow \\text{shorter}" },
        ],
        finalAnswerLatex: "A–C–E (11 km) is shorter",
        diagram: netW,
      },
    ],
    guidedPractice: [
      mcq("nprob-g1", "Two vertices are 'connected' in a network when:", "B",
        ["they have the same degree", "some route of edges joins them", "they are next to each other on the page", "they have equal weights"], 1,
        "Connection is about reachability, not position.",
        "Two vertices are connected when a route of edges joins them, even if it passes through other vertices."),
      ans("nprob-g2", "Using the town network, find the total distance of the route A–C–E (in km).", "", "11", 2,
        "Add the edge weights A–C and C–E.", "A–C is 4 km and C–E is 7 km, so the route is 4 + 7 = 11 km.",
        ["11 km"], { diagram: netW }),
      ans("nprob-g3", "Using the town network, find the total distance of the route A–B–D (in km).", "", "11", 2,
        "Add A–B and B–D.", "A–B is 6 km and B–D is 5 km, so the route is 6 + 5 = 11 km.",
        ["11 km"], { diagram: netW }),
      ans("nprob-g4", "Using the town network, is there a road directly from A to E? Answer yes or no.", "\\text{direct edge?}", "no", 2,
        "Is A–E listed as an edge?", "There is no direct A–E road; A reaches E only via other towns (e.g. A–C–E).",
        ["No"], { diagram: netW }),
    ],
    independentPractice: [
      ans("nprob-i1", "Using the town network, find the total distance of A–B–D–E (in km).", "", "14", 3,
        "Add A–B, B–D and D–E.", "6 + 5 + 3 = 14 km.",
        ["14 km"], { diagram: netW }),
      mcq("nprob-i2", "From A to E, the route A–C–E is 11 km and A–B–D–E is 14 km. Which should a driver choose to travel the shorter distance?", "A",
        ["A–C–E", "A–B–D–E", "either, they are equal", "neither is possible"], 3,
        "Pick the smaller total.",
        "A–C–E (11 km) is shorter than A–B–D–E (14 km), so the driver should choose A–C–E."),
      ans("nprob-i3", "Using the town network, find the total distance of the route B–C–E (in km).", "", "9", 3,
        "Add B–C and C–E.", "B–C is 2 km and C–E is 7 km, so 2 + 7 = 9 km.",
        ["9 km"], { diagram: netW }),
      ans("nprob-i4", "Using the town network, how many different towns can be reached directly from B (B's degree)?", "\\text{count B's edges}", "3", 3,
        "Count the edges at B.", "B joins A, C and D directly, so 3 towns are directly reachable from B.",
        [], { diagram: netW }),
      ans("nprob-i5", "Using the town network, find the total distance of A–C–B–D (in km).", "", "11", 3,
        "Add A–C, C–B and B–D.", "4 + 2 + 5 = 11 km.",
        ["11 km"], { diagram: netW }),
    ],
    masteryQuiz: [
      ans("nprob-m1", "Using the town network, find the total distance of D–E (in km).", "\\text{edge weight}", "3", 2,
        "Read the single edge weight.", "The direct road D–E is 3 km.",
        ["3 km"], { diagram: netW }),
      mcq("nprob-m2", "To compare two routes between the same towns, you should compare their:", "B",
        ["number of vertices", "total edge weights", "highest single weight", "starting letters"], 3,
        "Cost/distance is the sum of the weights.",
        "Compare the total weight (sum of edge weights) of each route, and choose the smaller for the shorter/cheaper trip."),
      ans("nprob-m3", "Using the town network, find the total distance of A–B–C–E (in km).", "", "15", 3,
        "Add A–B, B–C and C–E.", "6 + 2 + 7 = 15 km.",
        ["15 km"], { diagram: netW }),
      ans("nprob-m4", "From B to E, compare B–C–E (9 km) with B–D–E (5 + 3). Give the distance of the shorter route (in km).", "", "8", 4,
        "Work out B–D–E and compare with 9.", "B–D–E = 5 + 3 = 8 km, which is shorter than B–C–E (9 km), so the shorter route is 8 km.",
        ["8 km"], { diagram: netW }),
      mcq("nprob-m5", "Using the town network, which town is reached directly from A by the SHORTEST single road?", "B",
        ["B (6 km)", "C (4 km)", "D (no direct road)", "E (no direct road)"], 3,
        "Compare A's direct roads.",
        "A has direct roads to B (6 km) and C (4 km); C is the closer of the two. There are no direct roads A–D or A–E.", { diagram: netW }),
      ans("nprob-m6", "Using the town network, find the total distance of A–C–B (in km).", "", "6", 3,
        "Add A–C and C–B.", "4 + 2 = 6 km.",
        ["6 km"], { diagram: netW }),
      ans("nprob-m7", "A delivery from A to E must avoid town C (it is closed). Find the distance of the route A–B–D–E (in km).", "", "14", 4,
        "Use the route that does not pass through C.", "Avoiding C, the route A–B–D–E = 6 + 5 + 3 = 14 km.",
        ["14 km"], { diagram: netW }),
      mcq("nprob-m8", "Two towns are NOT connected when:", "C",
        ["they have different degrees", "they are far apart on the page", "no route of edges joins them", "the edge between them is long"], 3,
        "Connection means a route exists.",
        "Two towns are not connected when no route of edges joins them at all (distance on the page is irrelevant)."),
      ans("nprob-m9", "Using the town network, find the total distance of the circuit A–B–C–A (in km).", "", "12", 4,
        "Add A–B, B–C and C–A.", "A–B 6 + B–C 2 + C–A 4 = 12 km for the circuit back to A.",
        ["12 km"], { diagram: netW }),
      ans("nprob-m10", "From A to E, the routes are A–C–E (11 km), A–B–D–E (14 km) and A–C–B–D–E (4+2+5+3). Give the distance of the longest of these three (in km).", "", "14", 4,
        "Work out A–C–B–D–E and compare the three totals.", "A–C–B–D–E = 4 + 2 + 5 + 3 = 14 km, equal to A–B–D–E (14 km) and longer than A–C–E (11 km); the longest distance is 14 km.",
        ["14 km"], { diagram: netW }),
    ],
    commonMistakes: [
      { mistake: "Judging connection or distance by how far apart dots look.", fix: "Use the edges and their weights, not the page layout." },
      { mistake: "Adding the wrong edges for a route.", fix: "Add only the weights of the edges actually used, in order." },
      { mistake: "Assuming a direct edge exists between two vertices.", fix: "Check the diagram — some pairs are only connected via other vertices." },
      { mistake: "Comparing routes by number of towns instead of total weight.", fix: "Compare the sum of edge weights to find the shorter/cheaper route." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 2F Minimal Spanning Trees ────────────────────────────────────────────────────────
export function year12Standard1NetworksMSTLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "networks-minimal-spanning-trees") {
    return null;
  }
  return {
    description:
      "Find a minimal spanning tree: connect every vertex with the least total weight using no cycles, and count its edges and weight.",
    learningIntention:
      "Find a minimal spanning tree and its total weight by repeatedly choosing the cheapest edge that adds a new connection without a cycle.",
    successCriteria: [
      "Describe a spanning tree as connecting all vertices with no cycle.",
      "State that a spanning tree of n vertices has n − 1 edges.",
      "Build a minimal spanning tree by choosing cheapest edges that avoid cycles.",
      "Find the total weight of the minimal spanning tree.",
    ],
    teaching: {
      paragraphs: [
        "Imagine you must lay cable so that every town is connected to the network, and you want to spend the LEAST. You do not need a road between every pair — you just need everything joined up, with no wasteful loops. A connection of all the vertices with no cycle is a SPANNING TREE, and the cheapest one is the MINIMAL spanning tree (MST).",
        "A spanning tree of n vertices always has exactly n − 1 edges. That is just enough to connect everything: the first edge joins 2 vertices, and each new edge must bring in exactly one new vertex. Any extra edge would create a cycle (a loop), which is redundant for just staying connected.",
        "To build the MINIMAL spanning tree, be greedy in the right way: repeatedly add the CHEAPEST available edge that connects to a new vertex WITHOUT forming a cycle. Keep going until every vertex is joined. Skipping an edge that would close a loop is the key move — that edge is wasteful.",
        "The total weight of the MST is the sum of the weights of its n − 1 edges. It is the minimum cost to keep everything connected. Reading 'connect all sites as cheaply as possible' should immediately suggest a minimal spanning tree.",
      ],
      latexBlocks: [
        "\\text{spanning tree: all vertices connected, no cycle}",
        "\\text{a spanning tree of } n \\text{ vertices has } n - 1 \\text{ edges}",
        "\\text{MST: repeatedly add the cheapest edge that avoids a cycle}",
      ],
    },
    workedExamples: [
      {
        title: "Build the minimal spanning tree",
        questionLatex: "\\text{For the town network, choose cheapest edges (no cycles) until all 5 towns are joined.}",
        steps: [
          { explanation: "Add cheapest edges in order, skipping any that form a cycle.", latex: "B\\text{–}C(2),\\ D\\text{–}E(3),\\ A\\text{–}C(4),\\ B\\text{–}D(5)" },
          { explanation: "All 5 vertices are now joined with 4 edges.", latex: "\\text{total} = 2 + 3 + 4 + 5 = 14" },
        ],
        finalAnswerLatex: "\\text{MST weight } 14 \\text{ km}",
        diagram: netW,
      },
      {
        title: "Edges in a spanning tree",
        questionLatex: "\\text{How many edges does a spanning tree of 5 vertices have?}",
        steps: [
          { explanation: "A spanning tree has n − 1 edges.", latex: "5 - 1 = 4" },
        ],
        finalAnswerLatex: "4 \\text{ edges}",
      },
    ],
    guidedPractice: [
      mcq("nmst-g1", "A spanning tree of a network:", "B",
        ["connects all vertices and contains a cycle", "connects all vertices with no cycle", "connects only some vertices", "uses every edge"], 1,
        "A tree has no loops.",
        "A spanning tree connects all the vertices with no cycle (no loops)."),
      ans("nmst-g2", "How many edges does a spanning tree of 5 vertices have?", "", "4", 2,
        "A spanning tree has n − 1 edges.", "5 vertices → 5 − 1 = 4 edges."),
      ans("nmst-g3", "When building a minimal spanning tree, do you add the CHEAPEST or the most expensive available edge (one that avoids a cycle)?", "\\text{greedy on weight}", "cheapest", 2,
        "Greedy on weight, avoid loops.", "At each step you add the cheapest available edge that does not create a cycle.",
        ["the cheapest", "cheapest edge"]),
      ans("nmst-g4", "Using the town network, which single edge would you add FIRST for a minimal spanning tree (give its weight in km)?", "\\text{smallest weight}", "2", 2,
        "Start with the smallest weight.", "The cheapest edge is B–C at 2 km, so it is added first.",
        ["2 km", "B-C"], { diagram: netW }),
    ],
    independentPractice: [
      ans("nmst-i1", "Using the town network, find the total weight of the minimal spanning tree (in km).", "", "14", 3,
        "Add cheapest edges without cycles: B–C, D–E, A–C, B–D.", "MST edges: B–C 2, D–E 3, A–C 4, B–D 5; total = 2 + 3 + 4 + 5 = 14 km.",
        ["14 km"], { diagram: netW }),
      mcq("nmst-i2", "Why do you skip an edge that would form a cycle when building a spanning tree?", "C",
        ["it is always the most expensive", "cycles connect new vertices", "a cycle is a redundant loop that adds cost without connecting a new vertex", "edges in cycles cannot be drawn"], 3,
        "A cycle does not bring in a new vertex.",
        "An edge that closes a cycle joins two already-connected vertices, so it adds weight without connecting anything new — it is skipped."),
      ans("nmst-i3", "A spanning tree of 8 vertices has how many edges?", "", "7", 3,
        "n − 1 edges.", "8 − 1 = 7 edges."),
      ans("nmst-i4", "Using the town network, how many edges are in its minimal spanning tree?", "", "4", 3,
        "5 vertices → 4 edges.", "The network has 5 towns, so its spanning tree has 5 − 1 = 4 edges.",
        [], { diagram: netW }),
      ans("nmst-i5", "Using the town network, the MST uses B–C, D–E, A–C and B–D. Which weight-6 and weight-7 edges are left OUT? Give the count of left-out edges.", "", "2", 3,
        "Total edges minus MST edges.", "The network has 6 edges and the MST uses 4, so 2 edges are left out (A–B at 6 and C–E at 7).",
        [], { diagram: netW }),
    ],
    masteryQuiz: [
      ans("nmst-m1", "How many edges are in a spanning tree of 6 vertices?", "", "5", 2,
        "n − 1 edges.", "6 − 1 = 5 edges."),
      mcq("nmst-m2", "A minimal spanning tree gives:", "B",
        ["the shortest single route between two vertices", "the cheapest way to connect all vertices", "the route using every edge once", "the vertex of highest degree"], 3,
        "It connects everything at least cost.",
        "A minimal spanning tree is the cheapest set of edges that connects all the vertices (no cycles)."),
      ans("nmst-m3", "Using the town network, give the total weight of its minimal spanning tree (in km).", "", "14", 3,
        "Sum the MST edges.", "MST = B–C 2 + D–E 3 + A–C 4 + B–D 5 = 14 km.",
        ["14 km"], { diagram: netW }),
      ans("nmst-m4", "Using the town network, what is the weight of the FIRST edge added in building the MST (in km)?", "\\text{smallest weight}", "2", 2,
        "Start from the cheapest edge.", "The cheapest edge is B–C at 2 km, added first.",
        ["2 km"], { diagram: netW }),
      mcq("nmst-m5", "A council wants to connect 6 towns with water pipes as cheaply as possible, with no redundant loops. They should find the:", "C",
        ["shortest path", "Eulerian circuit", "minimal spanning tree", "vertex of highest degree"], 3,
        "Connect all sites at least cost, no loops.",
        "Connecting all towns at least cost with no loops is exactly a minimal spanning tree."),
      ans("nmst-m6", "A spanning tree of 10 vertices has how many edges?", "", "9", 3,
        "n − 1.", "10 − 1 = 9 edges."),
      ans("nmst-m7", "Using the town network, after adding B–C (2) and D–E (3), what is the next cheapest edge to add without a cycle (give its weight in km)?", "\\text{next smallest}", "4", 3,
        "The next smallest weight that adds a new vertex.", "After B–C and D–E, the next cheapest edge that avoids a cycle is A–C at 4 km (it brings in A).",
        ["4 km", "A-C"], { diagram: netW }),
      mcq("nmst-m8", "While building an MST you reach an edge whose two vertices are already connected. You should:", "B",
        ["add it anyway", "skip it (it would form a cycle)", "remove a cheaper edge", "stop building"], 3,
        "Already-connected vertices mean a loop.",
        "If both ends are already connected, adding the edge forms a cycle, so you skip it and move to the next cheapest."),
      ans("nmst-m9", "A minimal spanning tree connects 7 sites. Its edges weigh 3, 4, 4, 5, 6 and 8. Find its total weight.", "", "30", 4,
        "A 7-site tree has 6 edges; add their weights.", "7 − 1 = 6 edges (matches the list); total = 3 + 4 + 4 + 5 + 6 + 8 = 30."),
      ans("nmst-m10", "Using the town network, the MST weight is 14 km. The direct route A–B alone is 6 km. By how much more than that single road is the whole MST (in km)?", "", "8", 4,
        "Subtract the single edge weight from the MST total.", "MST total 14 km minus the A–B edge (6 km) = 8 km more.",
        ["8 km"], { diagram: netW }),
    ],
    commonMistakes: [
      { mistake: "Including a cycle in the spanning tree.", fix: "A spanning tree has no loops — skip any edge that joins two already-connected vertices." },
      { mistake: "Using the wrong number of edges.", fix: "A spanning tree of n vertices has exactly n − 1 edges." },
      { mistake: "Just picking the smallest edges regardless of cycles.", fix: "Add the cheapest edge that does NOT form a cycle at each step." },
      { mistake: "Confusing the MST with a shortest path.", fix: "MST connects ALL vertices cheaply; a shortest path connects just two." },
    ],
    masteryPassMark: 0.8,
  };
}

// ── 2G Shortest Path ─────────────────────────────────────────────────────────────────
export function year12Standard1NetworksShortestPathLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-12-standard-1" || unit.slug !== UNIT || lesson.slug !== "networks-shortest-path") {
    return null;
  }
  return {
    description:
      "Find the shortest path between two vertices in a weighted network by listing candidate routes and comparing their total weights.",
    learningIntention:
      "Find the shortest (least-weight) path between two vertices by comparing the totals of the possible routes.",
    successCriteria: [
      "List the possible routes between two vertices.",
      "Find the total weight of each route.",
      "Choose the route with the smallest total as the shortest path.",
      "Interpret the shortest path in a practical context (distance, time, cost).",
    ],
    teaching: {
      paragraphs: [
        "The shortest-path question is the everyday GPS question: of all the ways to get from A to B, which has the least total distance (or time, or cost)? In a weighted network the answer is the route whose edge weights add to the smallest total — not necessarily the one with the fewest towns.",
        "The reliable method for small networks is to LIST the sensible routes from start to finish, add up the weights of each, and pick the smallest. Be systematic so you do not miss a route: follow each first step and branch out. The winner is the least total, even if it passes through more towns.",
        "A key insight: more edges can still be shorter. A two-edge route of 6 + 5 = 11 can beat a different two-edge route of 4 + 7 = 11 (a tie), and a three-edge route 4 + 2 + 5 = 11 can match a two-edge one. Always add the actual weights rather than counting the steps.",
        "Once you have the shortest path, interpret it in context: the smallest total is the least distance to drive, the quickest time, or the cheapest fare, depending on what the weights mean. Watch for forced detours — if a town is closed, remove its edges and re-compare the remaining routes.",
      ],
      latexBlocks: [
        "\\text{shortest path} = \\text{route with the least total weight}",
        "\\text{list routes} \\to \\text{add each route's weights} \\to \\text{choose the smallest}",
        "\\text{fewer edges} \\ne \\text{always shorter}",
      ],
    },
    workedExamples: [
      {
        title: "Shortest path by comparison",
        questionLatex: "\\text{Find the shortest path from A to E in the town network.}",
        steps: [
          { explanation: "List routes and totals.", latex: "A\\text{–}C\\text{–}E = 11,\\ A\\text{–}B\\text{–}D\\text{–}E = 14" },
          { explanation: "Choose the smallest total.", latex: "11 \\text{ km via A–C–E}" },
        ],
        finalAnswerLatex: "11 \\text{ km (A–C–E)}",
        diagram: netW,
      },
      {
        title: "Fewer edges is not always shorter",
        questionLatex: "\\text{From B to E: compare B–C–E with B–D–E.}",
        steps: [
          { explanation: "B–C–E = 2 + 7.", latex: "= 9" },
          { explanation: "B–D–E = 5 + 3.", latex: "= 8 \\Rightarrow \\text{shorter}" },
        ],
        finalAnswerLatex: "8 \\text{ km (B–D–E)}",
        diagram: netW,
      },
    ],
    guidedPractice: [
      mcq("nsp-g1", "The shortest path between two vertices in a weighted network is the route with the:", "B",
        ["fewest edges", "least total weight", "most vertices", "highest single weight"], 1,
        "Add the weights, not the steps.",
        "The shortest path is the route whose edge weights add to the smallest total."),
      ans("nsp-g2", "Using the town network, find the total distance of A–C–E (in km).", "", "11", 2,
        "Add A–C and C–E.", "4 + 7 = 11 km.",
        ["11 km"], { diagram: netW }),
      ans("nsp-g3", "Using the town network, find the total distance of A–B–D–E (in km).", "", "14", 2,
        "Add A–B, B–D and D–E.", "6 + 5 + 3 = 14 km.",
        ["14 km"], { diagram: netW }),
      ans("nsp-g4", "Comparing A–C–E (11 km) and A–B–D–E (14 km) from A to E, give the shortest distance (in km).", "", "11", 2,
        "Pick the smaller total.", "11 km (via A–C–E) is shorter than 14 km, so the shortest distance is 11 km.",
        ["11 km"], { diagram: netW }),
    ],
    independentPractice: [
      ans("nsp-i1", "Using the town network, find the shortest distance from B to E (in km).", "", "8", 3,
        "Compare B–C–E and B–D–E.", "B–C–E = 9 km, B–D–E = 8 km; the shortest is 8 km (via B–D–E).",
        ["8 km"], { diagram: netW }),
      mcq("nsp-i2", "A route with MORE edges than another:", "C",
        ["is always longer", "is always shorter", "can still be shorter if its weights are smaller", "cannot be compared"], 3,
        "Compare totals, not edge counts.",
        "Shortest path is about total weight, so a route with more edges can still be shorter if those edges have smaller weights."),
      ans("nsp-i3", "Using the town network, find the shortest distance from A to D (in km).", "", "11", 3,
        "Compare A–B–D and A–C–B–D.", "A–B–D = 11 km and A–C–B–D = 4 + 2 + 5 = 11 km, so the shortest distance is 11 km.",
        ["11 km"], { diagram: netW }),
      ans("nsp-i4", "Using the town network, find the total distance of A–C–B–D–E (in km).", "", "14", 3,
        "Add A–C, C–B, B–D, D–E.", "4 + 2 + 5 + 3 = 14 km.",
        ["14 km"], { diagram: netW }),
      ans("nsp-i5", "If the shortest A-to-E route is 11 km and represents distance at 60 km/h, this is the route a driver should pick to travel the … distance. Answer shortest or longest.", "\\text{least weight}", "shortest", 3,
        "Least total weight = least distance.", "The least total weight is the shortest distance, so the driver picks the shortest route.",
        ["shortest distance"]),
    ],
    masteryQuiz: [
      ans("nsp-m1", "Using the town network, find the shortest distance from A to E (in km).", "", "11", 3,
        "Compare A–C–E and A–B–D–E.", "A–C–E = 11 km, A–B–D–E = 14 km; the shortest is 11 km.",
        ["11 km"], { diagram: netW }),
      mcq("nsp-m2", "To find a shortest path in a small network, the reliable method is to:", "B",
        ["pick the route with fewest towns", "list the routes, total each, and choose the smallest", "always go through the central vertex", "add every edge in the network"], 3,
        "Compare candidate totals.",
        "List the possible routes, add up each route's weights, and choose the one with the smallest total."),
      ans("nsp-m3", "Using the town network, find the shortest distance from B to E (in km).", "", "8", 3,
        "Compare B–C–E (9) and B–D–E (8).", "B–D–E = 8 km is shorter than B–C–E = 9 km, so the shortest distance is 8 km.",
        ["8 km"], { diagram: netW }),
      ans("nsp-m4", "Using the town network, find the total distance of A–B–C–E (in km).", "", "15", 3,
        "Add A–B, B–C, C–E.", "6 + 2 + 7 = 15 km.",
        ["15 km"], { diagram: netW }),
      mcq("nsp-m5", "A shortest path differs from a minimal spanning tree because a shortest path:", "B",
        ["connects every vertex", "connects just two chosen vertices at least cost", "must use every edge", "ignores the weights"], 3,
        "Two vertices vs all vertices.",
        "A shortest path connects two chosen vertices at least cost; a minimal spanning tree connects ALL vertices."),
      ans("nsp-m6", "Using the town network, find the shortest distance from A to D (in km).", "", "11", 3,
        "Compare A–B–D and A–C–B–D.", "Both A–B–D and A–C–B–D total 11 km, so the shortest distance is 11 km.",
        ["11 km"], { diagram: netW }),
      ans("nsp-m7", "Town C is closed, so its roads cannot be used. Using the town network, find the shortest distance from A to E avoiding C (in km).", "", "14", 4,
        "Remove C's roads, then find the best route.", "Without C the only A-to-E route is A–B–D–E = 6 + 5 + 3 = 14 km.",
        ["14 km"], { diagram: netW }),
      mcq("nsp-m8", "If each edge weight is a time in minutes, the shortest path gives the:", "B",
        ["longest trip", "quickest trip", "cheapest fare only", "route with most stops"], 3,
        "Least total weight = least time.",
        "When weights are times, the least-total-weight route is the quickest trip."),
      ans("nsp-m9", "Using the town network, by how many km is the shortest A-to-E route shorter than A–B–D–E (in km)?", "", "3", 4,
        "Subtract the shortest from the A–B–D–E total.", "Shortest A–C–E = 11 km; A–B–D–E = 14 km; difference = 14 − 11 = 3 km.",
        ["3 km"], { diagram: netW }),
      ans("nsp-m10", "From A to E, the routes are A–C–E (11), A–B–D–E (14) and A–B–C–E (15). Give the shortest distance (in km).", "", "11", 4,
        "Compare all three totals.", "The three totals are 11, 14 and 15 km, so the shortest distance is 11 km (via A–C–E).",
        ["11 km"], { diagram: netW }),
    ],
    commonMistakes: [
      { mistake: "Choosing the route with the fewest edges.", fix: "Add the weights — a route with more edges can have a smaller total." },
      { mistake: "Missing a possible route.", fix: "List routes systematically (branch from each first step) before comparing." },
      { mistake: "Confusing shortest path with minimal spanning tree.", fix: "Shortest path joins two vertices; an MST joins all of them." },
      { mistake: "Forgetting forced detours.", fix: "If a vertex is closed, remove its edges and re-compare the remaining routes." },
    ],
    masteryPassMark: 0.8,
  };
}
