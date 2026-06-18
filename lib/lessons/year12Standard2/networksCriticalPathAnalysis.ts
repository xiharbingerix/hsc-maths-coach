import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion } from "../differentialCalculus";
import type { NetworkDiagram } from "../types";
import {
  labelledChoice,
  shortAnswer as baseShortAnswer,
} from "../questionHelpers";

function networkFeedback(prompt: string, answer: string) {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("degree")) {
    return `The degree of a vertex counts only the direct edges touching that vertex. Count those connections once each to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("how many edges") ||
    lowerPrompt.includes("how many edges are listed")
  ) {
    return `Each listed connection is one edge. Count the connections in the edge list once each to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("how many vertices") ||
    lowerPrompt.includes("vertices are named")
  ) {
    return `Vertices are the distinct endpoint labels, not the number of roads. List each different label once to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("shortest path label") ||
    lowerPrompt.includes("enter the shortest path")
  ) {
    return `A shortest path is the route with the smallest total weight between the two endpoints. Compare the candidate route totals, then enter the labels in travel order: ${answer}.`;
  }
  if (lowerPrompt.includes("shortest-path weight")) {
    return `A shortest-path question asks for the smallest route total, not the fewest edges. Compare the available totals and choose ${answer}.`;
  }
  if (
    lowerPrompt.includes("mst") ||
    lowerPrompt.includes("connector lengths") ||
    lowerPrompt.includes("total cable length")
  ) {
    return `For an MST total, add the selected connector edges once each. Those edges already form the minimum cycle-free connection, so their combined weight is ${answer}.`;
  }
  if (lowerPrompt.includes("dummy activity") || lowerPrompt.includes("dummy arrow")) {
    return `A dummy activity has zero duration and is shown as a dashed arrow. It carries a precedence constraint — it tells the network that a preceding activity must finish before the next one can start, without adding any time. The answer is ${answer}.`;
  }
  if (lowerPrompt.includes("gantt") || lowerPrompt.includes("bar chart")) {
    return `On a Gantt chart each activity is a horizontal bar. The bar starts at the EST and extends for the activity's duration. Critical activities have no gap after them; non-critical activities may have a dashed extension showing their float. The answer is ${answer}.`;
  }
  if (lowerPrompt.includes("lft") || lowerPrompt.includes("latest finish")) {
    return `Latest finish time (LFT) is the latest an activity can end without delaying the project. It equals the minimum of the LSTs of all successor activities. Here LFT = ${answer}.`;
  }
  if (lowerPrompt.includes("eft") || lowerPrompt.includes("earliest finish")) {
    return `Earliest finish means the activity's earliest start plus its duration. Add those two times to get ${answer}.`;
  }
  if (lowerPrompt.includes("earliest start")) {
    return `An activity cannot start until every prerequisite is complete. Use the latest prerequisite finish time, which gives ${answer}.`;
  }
  if (
    lowerPrompt.includes("project completion time") ||
    lowerPrompt.includes("completion time")
  ) {
    return `Project completion is controlled by the longest dependent path, because the project must wait for that chain to finish. Choose the largest path total to get ${answer}.`;
  }
  if (lowerPrompt.includes("float")) {
    return `Float is the spare time between the earliest and latest allowed start. Subtract earliest start from latest start to get ${answer}.`;
  }
  if (lowerPrompt.includes("critical path")) {
    return `The critical path is the longest dependent route through the activity network. It controls the completion time, so the required path is ${answer}.`;
  }
  if (lowerPrompt.includes("path total")) {
    return `A project path total is the sum of the activity durations along that one dependent chain. Add the listed durations to get ${answer}.`;
  }
  if (
    lowerPrompt.includes("route weight") ||
    lowerPrompt.includes("route time") ||
    lowerPrompt.includes("route uses") ||
    lowerPrompt.includes("find the total")
  ) {
    return `A route total is found by adding the weights of the edges actually travelled. Add the listed edge weights once each to get ${answer}.`;
  }
  return `Read what the network quantity represents, then use only the relevant edges or activity times. This gives ${answer}.`;
}

// Returns safe numeric formatting equivalents: integer "7" → ["7.0"],
// decimal "7.5" → ["7.50"]. Returns [] for path labels, unit strings,
// or any answer containing non-digit characters.
function numericFormatVariants(answer: string): string[] {
  const t = answer.trim();
  if (/^\d+$/.test(t)) return [`${t}.0`];
  if (/^\d+\.\d*[1-9]$/.test(t)) return [`${t}0`];
  return [];
}

function shortAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseShortAnswer(id, prompt, latex, answer, [...numericFormatVariants(answer), ...acceptedAnswers]),
    explanation: networkFeedback(prompt, answer),
  };
}

const y12CampusDiagram: NetworkDiagram = {
  description:
    "Undirected school path network with vertices A, B, C, D, E. Edges: A-B, A-C, B-D, C-D, C-E.",
  vertices: [
    { id: "A", label: "A", x: 90, y: 150 },
    { id: "B", label: "B", x: 200, y: 80 },
    { id: "C", label: "C", x: 200, y: 220 },
    { id: "D", label: "D", x: 320, y: 110 },
    { id: "E", label: "E", x: 320, y: 240 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "B", to: "D" },
    { from: "C", to: "D" },
    { from: "C", to: "E" },
  ],
};

const y12ShortestPathDiagram: NetworkDiagram = {
  description:
    "Undirected weighted road network with vertices A, B, C, D. Edges: A-B weight 4, A-C weight 7, B-C weight 2, B-D weight 6, C-D weight 3.",
  vertices: [
    { id: "A", label: "A", x: 80, y: 150 },
    { id: "B", label: "B", x: 190, y: 80 },
    { id: "C", label: "C", x: 200, y: 220 },
    { id: "D", label: "D", x: 320, y: 150 },
  ],
  edges: [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 7 },
    { from: "B", to: "C", weight: 2 },
    { from: "B", to: "D", weight: 6 },
    { from: "C", to: "D", weight: 3 },
  ],
};

const y12SolvedShortestPathDiagram: NetworkDiagram = {
  ...y12ShortestPathDiagram,
  highlightedEdges: [
    ["A", "B"],
    ["B", "C"],
    ["C", "D"],
  ],
};

const y12MstDiagram: NetworkDiagram = {
  ...y12ShortestPathDiagram,
  description:
    "Undirected weighted cable network with vertices A, B, C, D. Edges: A-B weight 4, A-C weight 7, B-C weight 2, B-D weight 6, C-D weight 3.",
};

const y12SolvedMstDiagram: NetworkDiagram = {
  ...y12MstDiagram,
  highlightedEdges: [
    ["B", "C"],
    ["C", "D"],
    ["A", "B"],
  ],
};

const y12CriticalPathDiagram: NetworkDiagram = {
  description:
    "Directed activity network. A leads to B and C. B and C lead to D. D leads to F. Durations: A 3 days, B 4 days, C 2 days, D 5 days, F 2 days.",
  vertices: [
    { id: "A", label: "A", x: 70, y: 150 },
    { id: "B", label: "B", x: 185, y: 80 },
    { id: "C", label: "C", x: 185, y: 220 },
    { id: "D", label: "D", x: 300, y: 150 },
    { id: "F", label: "F", x: 390, y: 150 },
  ],
  edges: [
    { from: "A", to: "B", directed: true },
    { from: "A", to: "C", directed: true },
    { from: "B", to: "D", directed: true },
    { from: "C", to: "D", directed: true },
    { from: "D", to: "F", directed: true },
  ],
  viewBox: "0 0 460 300",
};

const y12SolvedCriticalPathDiagram: NetworkDiagram = {
  ...y12CriticalPathDiagram,
  highlightedEdges: [
    ["A", "B"],
    ["B", "D"],
    ["D", "F"],
  ],
};

export function year12Standard2NetworksLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  const isStandard1Networks =
    course.slug === "year-12-standard-1" && unit.slug === "network-flow";
  const isStandard2Networks =
    course.slug === "year-12-standard-2" &&
    (unit.slug === "network-flow" || unit.slug === "critical-path-analysis");

  if (
    !isStandard1Networks &&
    !isStandard2Networks
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "network-flow-revision") {
    return {
      ...base,
      description:
        "Activate Year 11 network foundations: identify and count vertices and edges, find vertex degrees, interpret directed and weighted networks, and identify paths and circuits — preparation for flow, shortest path and spanning tree lessons.",
      learningIntention:
        "Recall key network vocabulary and skills from Year 11 so that Year 12 flow capacity, shortest path and critical path problems can be approached with confidence.",
      successCriteria: [
        "Identify vertices and edges from a network diagram and count them.",
        "Find the degree of a vertex by counting its incident edges.",
        "Distinguish directed (one-way) from undirected networks and read edge weights.",
        "Identify a path (no repeated vertices) and a circuit (path returning to the start) in a network.",
      ],
      teaching: {
        paragraphs: [
          "A network (graph) consists of vertices (points or nodes) and edges (connections between pairs of vertices). Vertices are usually labelled with letters; edges are the lines between them. A network with n vertices and e edges has both properties easy to count directly from the diagram.",
          "The degree of a vertex is the number of edges that meet at that vertex. In an undirected network, each edge contributes 1 to the degree of each of its two endpoints. The sum of all vertex degrees always equals twice the number of edges (the Handshaking Lemma).",
          "In a directed network (digraph), each edge has an arrow showing the allowed direction of travel. In a weighted network, each edge carries a number (weight) representing distance, cost, time, or capacity. A network can be both directed and weighted.",
          "A path is a route through the network that visits each vertex at most once. A circuit (or cycle) is a path that starts and ends at the same vertex, passing through other vertices without repeating. Euler paths and circuits visit every edge exactly once; Hamiltonian paths and circuits visit every vertex exactly once.",
        ],
        latexBlocks: [
          "\\text{Sum of degrees} = 2 \\times \\text{number of edges}",
          "\\text{Degree of vertex } v = \\text{number of edges incident to } v",
          "\\text{Path: no vertex repeated. Circuit: path returning to start.}",
          "\\text{Weighted edge total (route): sum edge weights along the chosen path.}",
        ],
      },
      workedExamples: [
        {
          title: "Count vertices, edges and find degrees",
          questionLatex:
            "\\text{A network has edges: A-B, A-C, B-C, B-D, C-D, D-E. How many vertices and edges? Find the degree of vertex B.}",
          steps: [
            {
              explanation: "List the distinct vertex labels: A, B, C, D, E → 5 vertices. Count the edges listed → 6 edges.",
              latex: "\\text{vertices} = 5,\\quad \\text{edges} = 6",
            },
            {
              explanation: "Edges at B: A-B, B-C, B-D → degree of B = 3.",
              latex: "\\deg(B) = 3",
            },
          ],
          finalAnswerLatex: "5\\text{ vertices, }6\\text{ edges};\\quad \\deg(B) = 3",
          diagram: {
            description: "Network with vertices A, B, C, D, E. Edges: A-B, A-C, B-C, B-D, C-D, D-E.",
            vertices: [
              { id: "A", label: "A", x: 0, y: 2 },
              { id: "B", label: "B", x: 2, y: 3 },
              { id: "C", label: "C", x: 2, y: 1 },
              { id: "D", label: "D", x: 4, y: 2 },
              { id: "E", label: "E", x: 6, y: 2 },
            ],
            edges: [
              { from: "A", to: "B", directed: false },
              { from: "A", to: "C", directed: false },
              { from: "B", to: "C", directed: false },
              { from: "B", to: "D", directed: false },
              { from: "C", to: "D", directed: false },
              { from: "D", to: "E", directed: false },
            ],
          },
        },
        {
          title: "Weighted network — find a route total",
          questionLatex:
            "\\text{A weighted network has edges A-B (4), B-C (6), A-C (8), B-D (3), C-D (5). Find the weight of route A→B→D.}",
          steps: [
            {
              explanation: "The route A→B→D uses edges A-B and B-D.",
              latex: "\\text{Weight} = 4 + 3 = 7",
            },
          ],
          finalAnswerLatex: "\\text{Route total} = 7",
          diagram: {
            description: "Weighted network: A-B (4), B-C (6), A-C (8), B-D (3), C-D (5).",
            vertices: [
              { id: "A", label: "A", x: 0, y: 2 },
              { id: "B", label: "B", x: 3, y: 3.5 },
              { id: "C", label: "C", x: 3, y: 0.5 },
              { id: "D", label: "D", x: 6, y: 2 },
            ],
            edges: [
              { from: "A", to: "B", weight: 4, directed: false, highlighted: true },
              { from: "B", to: "C", weight: 6, directed: false },
              { from: "A", to: "C", weight: 8, directed: false },
              { from: "B", to: "D", weight: 3, directed: false, highlighted: true },
              { from: "C", to: "D", weight: 5, directed: false },
            ],
          },
        },
        {
          title: "Directed network — identify valid paths",
          questionLatex:
            "\\text{A directed network has edges A→B, A→C, B→D, C→B, C→D. List all paths from A to D.}",
          steps: [
            {
              explanation: "From A: can go to B or C. From B: can go to D. From C: can go to B or D.",
              latex: "\\text{Path 1: }A \\to B \\to D",
            },
            {
              explanation: "Path 2: A → C → D. Path 3: A → C → B → D.",
              latex: "\\text{Path 2: }A \\to C \\to D,\\quad \\text{Path 3: }A \\to C \\to B \\to D",
            },
          ],
          finalAnswerLatex: "A \\to B \\to D;\\quad A \\to C \\to D;\\quad A \\to C \\to B \\to D",
          diagram: {
            description: "Directed network: A→B, A→C, B→D, C→B, C→D.",
            vertices: [
              { id: "A", label: "A", x: 0, y: 2 },
              { id: "B", label: "B", x: 3, y: 3.5 },
              { id: "C", label: "C", x: 3, y: 0.5 },
              { id: "D", label: "D", x: 6, y: 2 },
            ],
            edges: [
              { from: "A", to: "B", directed: true },
              { from: "A", to: "C", directed: true },
              { from: "B", to: "D", directed: true },
              { from: "C", to: "B", directed: true },
              { from: "C", to: "D", directed: true },
            ],
          },
        },
      ],
      guidedPractice: [
        labelledChoice(
          "y12s2-nfr-g1",
          "A network has edges P-Q, P-R, Q-R, Q-S. How many vertices does it have?",
          "B",
          ["3", "4", "5", "6"],
          "Distinct vertices: P, Q, R, S → 4 vertices."
        ),
        shortAnswer(
          "y12s2-nfr-g2",
          "A network has edges A-B, A-C, A-D, B-C. What is the degree of vertex A?",
          "\\text{Edges at A: A-B, A-C, A-D}",
          "3",
          ["3.0"]
        ),
        labelledChoice(
          "y12s2-nfr-g3",
          "A weighted network has A-B (5), B-C (3), A-C (9). Find the total weight of path A→B→C.",
          "B",
          ["9", "8", "17", "3"],
          "5 + 3 = 8."
        ),
        labelledChoice(
          "y12s2-nfr-g4",
          "In a directed network, edge A→B means:",
          "A",
          ["Travel from A to B only", "Travel from B to A only", "Travel either way", "No travel allowed"],
          "An arrow shows the permitted direction only — from A to B."
        ),
      ],
      independentPractice: [
        shortAnswer(
          "y12s2-nfr-i1",
          "A network has edges: X-Y, X-Z, Y-Z, Y-W, Z-W. How many edges are there?",
          "\\text{Count the listed edges}",
          "5",
          ["5.0"]
        ),
        labelledChoice(
          "y12s2-nfr-i2",
          "A network has 5 vertices with degrees 2, 3, 2, 4, 3. How many edges does it have?",
          "C",
          ["5", "6", "7", "14"],
          "Sum of degrees = 2+3+2+4+3 = 14. Edges = 14 ÷ 2 = 7."
        ),
        shortAnswer(
          "y12s2-nfr-i3",
          "Weighted network: A-B (6), B-C (4), B-D (7), A-D (10). Find the total weight of path A→B→D.",
          "6 + 7",
          "13",
          ["13.0"]
        ),
        labelledChoice(
          "y12s2-nfr-i4",
          "A circuit in a network is a path that:",
          "B",
          ["Visits every vertex once", "Starts and ends at the same vertex", "Uses every edge exactly once", "Passes through no vertex more than twice"],
          "A circuit returns to its starting vertex."
        ),
        labelledChoice(
          "y12s2-nfr-i5",
          "The degree of a vertex equals the number of:",
          "A",
          ["Edges incident to that vertex", "Vertices adjacent to it minus 1", "Other vertices in the network", "Loops at that vertex only"],
          "Degree = number of edges touching the vertex (each undirected edge counts once)."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Counting vertices as the number of edges instead of the number of distinct labelled points.",
          fix: "Vertices are the labelled dots (nodes) in the network. Edges are the lines connecting them. List each distinct label once: P, Q, R, S gives 4 vertices, regardless of how many connections they have.",
        },
        {
          mistake: "Finding the degree of vertex A by counting how many other vertices connect to it instead of counting the edges.",
          fix: "Each undirected edge contributes 1 to the degree of each of its two endpoints. Count the edges directly touching vertex A — one count per edge regardless of where it goes.",
        },
        {
          mistake: "Adding all edge weights in the network when asked for the weight of a specific path.",
          fix: "A path total uses only the edges on that particular route, not all edges in the network. Identify the route (e.g. A→B→D) and add only those edge weights.",
        },
        {
          mistake: "Treating a directed edge A→B as allowing travel in both directions.",
          fix: "A directed edge (arrow) allows travel only in the direction of the arrow. A→B means you can go from A to B, not B to A. To travel both ways you need two separate arrows (A→B and B→A).",
        },
      ],
      masteryQuiz: [
        shortAnswer(
          "y12s2-nfr-m1",
          "Network edges: A-B, A-C, B-D, C-D, D-E. How many vertices?",
          "\\text{Distinct labels: A, B, C, D, E}",
          "5",
          ["5.0"]
        ),
        shortAnswer(
          "y12s2-nfr-m2",
          "Network edges: A-B, A-C, B-C, B-D, C-D. What is the degree of vertex C?",
          "\\text{Edges at C: A-C, B-C, C-D}",
          "3",
          ["3.0"]
        ),
        labelledChoice(
          "y12s2-nfr-m3",
          "A network has 4 vertices with degrees 2, 3, 3, 2. How many edges does it have?",
          "C",
          ["4", "4", "5", "10"],
          "Sum = 10. Edges = 10 ÷ 2 = 5."
        ),
        shortAnswer(
          "y12s2-nfr-m4",
          "Weighted network: A-B (3), B-C (5), A-C (6), C-D (4). Find path total A→B→C→D.",
          "3 + 5 + 4",
          "12",
          ["12.0"]
        ),
        labelledChoice(
          "y12s2-nfr-m5",
          "A directed network has edges A→B, A→C, C→B, B→D. Which path from A to D is valid?",
          "C",
          ["A→C→D", "A→B→C→D", "A→C→B→D", "A→D"],
          "A→C (valid), C→B (valid), B→D (valid). Path A→C→B→D is valid."
        ),
        shortAnswer(
          "y12s2-nfr-m6",
          "A network has 7 edges. What is the sum of all vertex degrees?",
          "\\text{Sum} = 2 \\times 7",
          "14",
          ["14.0"]
        ),
        labelledChoice(
          "y12s2-nfr-m7",
          "A path visits each vertex:",
          "B",
          ["At least once", "At most once", "Exactly twice", "An even number of times"],
          "A path does not repeat any vertex."
        ),
        shortAnswer(
          "y12s2-nfr-m8",
          "Network edges: P-Q (8), Q-R (5), P-R (11), R-S (3). Find path total P→Q→R→S.",
          "8 + 5 + 3",
          "16",
          ["16.0"]
        ),
        labelledChoice(
          "y12s2-nfr-m9",
          "A vertex with degree 0 is called:",
          "B",
          ["A bridge", "An isolated vertex", "A leaf", "A loop"],
          "A degree-0 vertex has no edges — it is isolated."
        ),
        labelledChoice(
          "y12s2-nfr-m10",
          "Which statement about a circuit is correct?",
          "A",
          ["It starts and ends at the same vertex", "It visits every edge exactly once", "It must pass through every vertex", "It cannot use directed edges"],
          "A circuit returns to its starting vertex; other properties belong to Euler/Hamiltonian circuits specifically."
        ),
      ],
    };
  }

  if (lesson.slug === "network-concepts-terminology") {
    return {
      ...base,
      description:
        "Use network language to interpret practical edge lists, weighted roads, directed routes, and small campus networks.",
      learningIntention:
        "Interpret practical networks using vertices, edges, degree, paths, trails, circuits, direction, and weights.",
      successCriteria: [
        "Identify vertices, edges, and vertex degree from an edge list.",
        "Recognise paths, trails, circuits, connected networks, weighted networks, and directed networks.",
        "Interpret weights and directions in practical road, cable, or delivery contexts.",
        "Use an edge list to answer a short network question without needing a drawn diagram.",
      ],
      teaching: {
        paragraphs: [
          "A network models connected objects. In a practical HSC-style problem, vertices can represent towns, buildings, delivery stops, or project points. Edges represent direct connections between them.",
          "The degree of a vertex is the number of edges joined to that vertex. In a road network, degree can show how many direct roads meet at a town.",
          "A weighted network has numbers on edges, such as distance, time, cost, or cable length. A directed network uses arrows when movement is one-way or when one task must happen before another.",
          "Routes also have names. A path follows connected vertices without repeating vertices, a trail does not repeat edges, and a circuit starts and ends at the same vertex.",
          "When a question gives an edge list instead of a diagram, treat each row as one edge. The labels are the vertices, and any number in the row is the edge weight.",
        ],
        latexBlocks: [
          "\\deg(v)=\\text{number of edges joined to vertex }v",
          "\\text{weighted edge: } A\\xleftrightarrow{\\ 8\\ }B,\\quad \\text{directed edge: } A\\to B",
          "\\text{path: no repeated vertices},\\quad \\text{trail: no repeated edges},\\quad \\text{circuit: start=end}",
        ],
      },
      workedExamples: [
        {
          title: "Identify vertices, edges and degree from an edge list",
          questionLatex:
            "\\begin{array}{c|c} \\text{School paths} & AB, AC, BD, CD, CE \\end{array}",
          diagram: y12CampusDiagram,
          steps: [
            {
              explanation:
                "List the different vertex labels that appear in the edge list.",
              latex: "A,B,C,D,E\\quad \\Rightarrow \\quad 5\\text{ vertices}",
            },
            {
              explanation:
                "Count the listed connections. There are five edges.",
              latex: "AB,AC,BD,CD,CE\\quad \\Rightarrow \\quad 5\\text{ edges}",
            },
            {
              explanation:
                "Vertex C is joined to A, D, and E, so its degree is 3.",
              latex: "\\deg(C)=3",
            },
          ],
          finalAnswerLatex:
            "\\text{5 vertices, 5 edges, and }\\deg(C)=3.",
        },
        {
          title: "Interpret a weighted road network",
          questionLatex:
            "\\begin{array}{c|c} \\text{Road} & \\text{Time (min)}\\\\ A-B&6\\\\ A-C&10\\\\ B-C&4 \\end{array}",
          steps: [
            {
              explanation:
                "The towns are the vertices and the direct roads are the edges.",
            },
            {
              explanation:
                "The numbers are weights. Here they represent travel time in minutes.",
              latex: "B-C=4\\text{ min}",
            },
          ],
          finalAnswerLatex:
            "\\text{This is a weighted network because each edge has a time.}",
        },
        {
          title: "Classify a route",
          questionLatex:
            "\\text{A delivery route is } A-B-C-A.",
          steps: [
            {
              explanation:
                "The route starts at A and returns to A.",
            },
            {
              explanation:
                "A route that starts and ends at the same vertex is a circuit.",
            },
          ],
          finalAnswerLatex: "\\text{A-B-C-A is a circuit.}",
        },
      ],
      guidedPractice: [
        shortAnswer("y12s2-net-term-g1", "A campus network has edges AB, AC, BC and CD. How many edges are listed?", "AB,AC,BC,CD", "4"),
        shortAnswer("y12s2-net-term-g2", "In the edge list AB, AC, AD, BD, what is the degree of A?", "\\deg(A)=?", "3"),
        labelledChoice("y12s2-net-term-g3", "A delivery map has arrows showing one-way streets. Which network type is needed?", "B", ["Weighted only", "Directed", "Disconnected", "Minimum spanning tree"], "One-way streets require directed edges."),
        labelledChoice("y12s2-net-term-g4", "Edge list: Library-Gym 5 min, Gym-Canteen 3 min. What do 5 and 3 represent?", "C", ["Vertex labels", "Degrees", "Edge weights", "Circuits"], "The numbers on edges are weights."),
      ],
      independentPractice: [
        shortAnswer("y12s2-net-term-i1", "Roads are AB, BC, CD, DA and AC. How many vertices are named?", "A,B,C,D", "4"),
        shortAnswer("y12s2-net-term-i2", "Roads are AB, BC, CD, DA and AC. What is the degree of C?", "\\deg(C)=?", "3"),
        labelledChoice("y12s2-net-term-i3", "A route A-B-C-D has no repeated vertices. It is best described as:", "A", ["A path", "A disconnected network", "A degree", "A vertex"], "A route with no repeated vertices is a path."),
        labelledChoice("y12s2-net-term-i4", "A route A-B-C-A returns to its starting point. It is a:", "D", ["Weight", "Tree", "Trail only", "Circuit"], "A circuit starts and ends at the same vertex."),
        labelledChoice("y12s2-net-term-i5", "A table of fibre cable lengths between buildings should be represented as:", "A", ["A weighted network", "A column graph", "An unweighted directed network only", "A payslip table"], "Cable lengths become edge weights."),
      ],
      commonMistakes: [
        { mistake: "Counting the number of vertices when asked for degree.", fix: "Degree counts only the edges joined to the named vertex." },
        { mistake: "Treating every weighted edge as directed.", fix: "Weights and directions are different features; arrows show direction." },
        { mistake: "Drawing extra connections that are not in the edge list.", fix: "Use only the direct connections given in the table or context." },
        { mistake: "Calling a route a circuit when it does not return to the start.", fix: "A circuit must start and finish at the same vertex." },
      ],
      masteryQuiz: [
        shortAnswer("y12s2-net-term-m1", "A school path network has edges AB, AC, CD, DE. How many edges are listed?", "AB,AC,CD,DE", "4", ["4 edges"]),
        {
          ...shortAnswer("y12s2-net-term-m2", "Use the school path network to find the degree of C.", "AB,\\ AC,\\ BD,\\ CD,\\ CE", "3"),
          diagram: y12CampusDiagram,
        },
        labelledChoice("y12s2-net-term-m3", "In a road network, a number on an edge usually represents:", "C", ["A vertex", "A circuit", "A weight such as distance or time", "A repeated path"], "Numbers on edges are weights."),
        labelledChoice("y12s2-net-term-m4", "A route A-B-C-D with no repeated vertices is a:", "A", ["Path", "Degree", "Weight", "Disconnected network"], "A path has no repeated vertices."),
        labelledChoice("y12s2-net-term-m5", "A route A-B-C-A is a:", "D", ["Vertex", "Edge list", "Degree", "Circuit"], "It starts and ends at A."),
        shortAnswer("y12s2-net-term-m6", "Edges AB, BC, CD, DA and AC use vertices A, B, C and D. How many vertices are there?", "A,B,C,D", "4"),
        labelledChoice("y12s2-net-term-m7", "One-way roads are represented using:", "B", ["Only weights", "Directed edges", "A box plot", "Undirected edges only"], "One-way movement needs arrows."),
        shortAnswer("y12s2-net-term-m8", "A vertex is joined to four direct roads. What is its degree?", "\\deg(v)=?", "4"),
        labelledChoice("y12s2-net-term-m9", "A cable network has lengths on each connection. It is:", "A", ["Weighted", "Unweighted only", "Not a network", "A salary table"], "Cable lengths are weights."),
        labelledChoice("y12s2-net-term-m10", "Which statement matches the edge list AB=8, AC=5, BC=6?", "C", ["There are no weights", "There is only one vertex", "There are three weighted edges", "The route must be a circuit"], "The table gives three edges with weights."),
      ],
    };
  }

  if (lesson.slug === "shortest-paths-minimum-spanning-trees") {
    return {
      ...base,
      description:
        "Choose between shortest paths and minimum spanning trees for route and minimal connector problems.",
      learningIntention:
        "Solve practical shortest-path and minimum-spanning-tree problems using weighted edge lists.",
      successCriteria: [
        "Calculate the total weight of a route.",
        "Identify a shortest path between two vertices in a small weighted network.",
        "Build a minimum spanning tree using a clear method such as Kruskal's algorithm.",
        "Choose whether a context requires a shortest path or a minimum spanning tree.",
      ],
      teaching: {
        paragraphs: [
          "A shortest path problem asks for the lowest total weight route between two vertices. The weight might be distance, travel time, cost, or risk.",
          "A minimum spanning tree, or MST, is different. It connects all required vertices with the smallest possible total edge weight and contains no cycles.",
          "Use shortest path when the question asks for one route from a start to an end. Use an MST when the question asks to connect all locations with minimum total cable, pipe, road length, or cost.",
          "Kruskal's algorithm is a clear MST method: order edges from smallest to largest, choose the next smallest edge that connects without making a cycle, and stop when all vertices are connected.",
        ],
        latexBlocks: [
          "\\text{path weight}=\\text{sum of edge weights on the route}",
          "\\text{MST: connects all vertices, no cycles, minimum total weight}",
          "\\text{Kruskal: choose smallest allowed edges until all vertices are connected}",
        ],
      },
      workedExamples: [
        {
          title: "Find a shortest path on a small road network",
          questionLatex:
            "\\begin{array}{c|c} \\text{Road} & \\text{Distance}\\\\" +
            "A-B&4\\\\ A-C&7\\\\ B-C&2\\\\ B-D&6\\\\ C-D&3 \\end{array}",
          diagram: y12SolvedShortestPathDiagram,
          steps: [
            {
              explanation:
                "Compare sensible routes from A to D.",
              latex: "A-B-D=4+6=10",
            },
            {
              explanation:
                "Another route goes through C.",
              latex: "A-B-C-D=4+2+3=9",
            },
            {
              explanation:
                "The route through B and C has the lowest total.",
            },
          ],
          finalAnswerLatex: "A-B-C-D\\text{ with total weight }9.",
        },
        {
          title: "Build a minimum spanning tree using Kruskal's method",
          questionLatex:
            "\\begin{array}{c|c} \\text{Cable} & \\text{Length}\\\\" +
            "A-B&4\\\\ A-C&7\\\\ B-C&2\\\\ B-D&6\\\\ C-D&3 \\end{array}",
          diagram: y12SolvedMstDiagram,
          steps: [
            {
              explanation:
                "Choose the smallest edge first.",
              latex: "B-C=2",
            },
            {
              explanation:
                "Choose the next smallest edge that does not create a cycle.",
              latex: "C-D=3,\\quad A-B=4",
            },
            {
              explanation:
                "All four vertices A, B, C and D are connected with no cycle.",
              latex: "2+3+4=9",
            },
          ],
          finalAnswerLatex: "\\text{MST edges }BC,CD,AB\\text{ with total }9.",
        },
        {
          title: "Choose shortest path or MST",
          questionLatex:
            "\\text{A school wants the least total cable connecting all buildings.}",
          steps: [
            {
              explanation:
                "The goal is to connect all buildings, not travel from one building to another.",
            },
            {
              explanation:
                "This is a minimal connector problem, so use a minimum spanning tree.",
            },
          ],
          finalAnswerLatex: "\\text{Use an MST.}",
        },
      ],
      guidedPractice: [
        shortAnswer("y12s2-spmst-g1", "Delivery route A-B-D has weights 5 and 7. What is the total route weight?", "5+7", "12", ["12 units"]),
        shortAnswer("y12s2-spmst-g2", "Paths A-B-D and A-C-D have total weights 11 and 9. What is the shortest-path weight?", "\\min(11,9)", "9", ["9 units"]),
        labelledChoice("y12s2-spmst-g3", "A town wants to connect every suburb with the least total fibre cable. Which method is appropriate?", "B", ["Shortest path", "Minimum spanning tree", "Circuit only", "Degree count only"], "Connecting every location with least total length is an MST problem."),
        shortAnswer("y12s2-spmst-g4", "Kruskal's method selects MST edges with weights 2, 4 and 5. What is the total weight?", "2+4+5", "11"),
      ],
      independentPractice: [
        shortAnswer("y12s2-spmst-i1", "Road weights are AB=3 and BD=8. Find the route weight for A-B-D.", "3+8", "11", ["11 units"]),
        shortAnswer("y12s2-spmst-i2", "Routes A-C-D=10 and A-B-D=12. Give the shortest path label.", "\\text{shortest path}", "A-C-D", ["A,C,D", "ACD", "A C D"]),
        labelledChoice("y12s2-spmst-i3", "Which mistake would break an MST solution?", "C", ["Adding selected edge weights", "Connecting a new vertex", "Including an edge that creates a cycle", "Stopping when all vertices are connected"], "A tree cannot include a cycle."),
        shortAnswer("y12s2-spmst-i4", "MST edge weights for connecting buildings are 6, 7, 9 and 10 metres. Find the total cable length.", "6+7+9+10", "32 m", ["32", "32m", "32 metres", "32 meters"]),
        labelledChoice("y12s2-spmst-i5", "A courier needs the quickest route from Depot A to Stop F. Which problem type is this?", "A", ["Shortest path", "Minimum spanning tree", "Tree count", "Tax calculation"], "A route from one point to another is a shortest-path problem."),
      ],
      commonMistakes: [
        { mistake: "Using an MST when the question asks for one route.", fix: "Use shortest path for a route between two vertices." },
        { mistake: "Using shortest path when the question asks to connect all locations.", fix: "Use an MST for minimal connector problems." },
        { mistake: "Including a cycle in a spanning tree.", fix: "Skip any edge that would create a cycle." },
        { mistake: "Choosing the fewest edges instead of the smallest total weight.", fix: "Add the weights and compare totals." },
      ],
      masteryQuiz: [
        shortAnswer("y12s2-spmst-m1", "A route from A to D uses weights 4, 2 and 3. What is its total weight?", "\\text{weights: }4,\\ 2,\\ 3", "9", ["9 units"]),
        shortAnswer("y12s2-spmst-m2", "Routes A-B-D and A-C-D have weights 13 and 10. What is the shortest-path weight?", "\\text{A-B-D}=13,\\quad \\text{A-C-D}=10", "10", ["10 units"]),
        {
          ...shortAnswer("y12s2-spmst-m3", "Use the weighted road network to enter the shortest path from A to D.", "AB=6,\\ AC=4,\\ BD=7,\\ CD=5", "A-C-D", ["A,C,D", "ACD", "A C D"]),
          explanation:
            "A-C-D has total weight 4 + 5 = 9, while A-B-D has total weight 6 + 7 = 13.",
          diagram: {
            description:
              "Undirected weighted road network with vertices A, B, C, D. Edges: A-B weight 6, A-C weight 4, B-D weight 7, C-D weight 5.",
            vertices: [
              { id: "A", label: "A", x: 80, y: 150 },
              { id: "B", label: "B", x: 200, y: 80 },
              { id: "C", label: "C", x: 200, y: 220 },
              { id: "D", label: "D", x: 320, y: 150 },
            ],
            edges: [
              { from: "A", to: "B", weight: 6 },
              { from: "A", to: "C", weight: 4 },
              { from: "B", to: "D", weight: 7 },
              { from: "C", to: "D", weight: 5 },
            ],
          },
        },
        labelledChoice("y12s2-spmst-m4", "A council wants minimum total pipe length connecting all parks. Use:", "B", ["Shortest path", "Minimum spanning tree", "A circuit only", "A directed graph only"], "This is a minimal connector problem."),
        shortAnswer("y12s2-spmst-m5", "Selected MST edges have weights 1, 3, 4 and 6. Find the total weight.", "\\text{MST weights: }1,\\ 3,\\ 4,\\ 6", "14"),
        labelledChoice("y12s2-spmst-m6", "Kruskal's method chooses edges in which order?", "A", ["Smallest allowed edge first", "Largest edge first", "Random edges only", "Edges that make cycles first"], "Kruskal's method works from smallest to largest while avoiding cycles."),
        labelledChoice("y12s2-spmst-m7", "A spanning tree must:", "D", ["Use only one vertex", "Use all edges", "Contain a cycle", "Connect all vertices without cycles"], "A spanning tree connects every vertex and has no cycles."),
        shortAnswer("y12s2-spmst-m8", "Cable edges chosen for an MST are AB=5, BC=4 and CD=8. Find the total cable length.", "AB=5,\\quad BC=4,\\quad CD=8", "17", ["17 m", "17m", "17 metres", "17 meters"]),
        labelledChoice("y12s2-spmst-m9", "Which edge should be rejected while forming an MST?", "C", ["A small edge joining a new vertex", "The first selected edge", "An edge that creates a cycle", "An edge with a weight"], "Cycles are not allowed in a tree."),
        labelledChoice("y12s2-spmst-m10", "A route from Home to School with the least travel time is a:", "A", ["Shortest path", "Minimum spanning tree", "Degree table", "Tax deduction"], "A single best route is a shortest-path problem."),
      ],
    };
  }

  if (lesson.slug === "critical-path-revision") {
    return {
      ...base,
      description:
        "Activate Year 11 network scheduling foundations: read precedence tables, identify predecessor relationships, sequence activities, and calculate path totals through an activity network.",
      learningIntention:
        "Recall the skills for reading precedence tables and sequencing activities so that earliest start times, float and critical path analysis can be approached systematically.",
      successCriteria: [
        "Read a precedence (dependency) table and identify which activities must be completed before each task begins.",
        "List activities in a valid sequence that satisfies all precedence constraints.",
        "Calculate the total duration of a given path through an activity network.",
        "Identify the longest path through a simple network and explain why it controls the project duration.",
      ],
      teaching: {
        paragraphs: [
          "A precedence table lists each activity, its duration, and the activities that must be completed before it can start (its predecessors). An activity with no predecessor can start immediately (at time 0). An activity with one or more predecessors must wait until all predecessors are finished.",
          "To draw or check an activity network, work through the precedence table in order. Place activities with no predecessor first, then connect each activity to its predecessors. All predecessors must be complete before the next activity can start.",
          "A path is a sequence of connected activities from start to finish. The path total (duration) is the sum of the durations of all activities on that path. The critical path is the longest path; it determines the minimum project completion time.",
          "Float (slack) is the amount of time an activity can be delayed without delaying the project. Activities on the critical path have zero float — any delay to them delays the whole project. Activities not on the critical path have positive float.",
        ],
        latexBlocks: [
          "\\text{Path total} = \\sum \\text{durations of activities on the path}",
          "\\text{Project completion time} = \\text{length of the critical (longest) path}",
          "\\text{Float} = \\text{latest allowable start} - \\text{earliest possible start}",
          "\\text{Critical path: float} = 0\\text{ for every activity on it}",
        ],
      },
      workedExamples: [
        {
          title: "Read a precedence table and list valid sequences",
          questionLatex:
            "\\text{Activity table: A(3, none), B(2, none), C(4, A), D(3, B), E(2, C,D). List two valid activity sequences.}",
          steps: [
            {
              explanation: "A and B have no predecessors → can start first. C needs A done; D needs B done; E needs both C and D done.",
              latex: "\\text{Sequence 1: } A, B, C, D, E",
            },
            {
              explanation: "A and B can run in parallel. Another valid sequence lists B before A.",
              latex: "\\text{Sequence 2: } B, A, D, C, E",
            },
          ],
          finalAnswerLatex: "A, B, C, D, E\\;\\text{(or }B, A, D, C, E\\text{)}",
          diagram: {
            description: "AON network: Start → A → C → E, Start → B → D → E → End.",
            vertices: [
              { id: "S", label: "Start", x: 0, y: 2 },
              { id: "A", label: "A (3)", x: 2, y: 3.5 },
              { id: "B", label: "B (2)", x: 2, y: 0.5 },
              { id: "C", label: "C (4)", x: 4, y: 3.5 },
              { id: "D", label: "D (3)", x: 4, y: 0.5 },
              { id: "E", label: "E (2)", x: 6, y: 2 },
              { id: "F", label: "End", x: 8, y: 2 },
            ],
            edges: [
              { from: "S", to: "A", directed: true },
              { from: "S", to: "B", directed: true },
              { from: "A", to: "C", directed: true },
              { from: "B", to: "D", directed: true },
              { from: "C", to: "E", directed: true },
              { from: "D", to: "E", directed: true },
              { from: "E", to: "F", directed: true },
            ],
          },
        },
        {
          title: "Calculate path totals",
          questionLatex:
            "\\text{Activity durations: A=5, B=3, C=4, D=6, E=2. Paths through the network: (i) A→C→E, (ii) A→D, (iii) B→D. Find each path total.}",
          steps: [
            {
              explanation: "(i) A→C→E = 5 + 4 + 2 = 11.",
              latex: "5 + 4 + 2 = 11",
            },
            {
              explanation: "(ii) A→D = 5 + 6 = 11. (iii) B→D = 3 + 6 = 9.",
              latex: "A \\to D = 11,\\quad B \\to D = 9",
            },
          ],
          finalAnswerLatex: "A \\to C \\to E = 11,\\quad A \\to D = 11,\\quad B \\to D = 9",
        },
        {
          title: "Identify the critical path",
          questionLatex:
            "\\text{A project has three paths: P1 = 8 days, P2 = 11 days, P3 = 9 days. What is the critical path and the project completion time?}",
          steps: [
            {
              explanation: "The critical path is the longest path. P2 = 11 days is the longest.",
              latex: "\\text{Critical path: P2},\\quad \\text{completion time} = 11\\text{ days}",
            },
            {
              explanation: "P1 has float 11 − 8 = 3 days. P3 has float 11 − 9 = 2 days. Critical path has 0 float.",
              latex: "\\text{Float(P1)} = 3,\\quad \\text{Float(P3)} = 2",
            },
          ],
          finalAnswerLatex: "\\text{Critical path: P2 (11 days). P1 float}=3,\\;\\text{P3 float}=2.",
        },
      ],
      guidedPractice: [
        labelledChoice(
          "y12s2-cpr-g1",
          "Activity E has predecessors C and D. Activity E can start only when:",
          "C",
          ["C is complete", "D is complete", "Both C and D are complete", "Either C or D is complete"],
          "All listed predecessors must be complete before an activity can begin."
        ),
        shortAnswer(
          "y12s2-cpr-g2",
          "Activity durations: A=4, B=6, C=3. Path A→C has total:",
          "4 + 3",
          "7",
          ["7.0"]
        ),
        labelledChoice(
          "y12s2-cpr-g3",
          "Three paths through a project have durations 10, 14, 12 days. The project completion time is:",
          "B",
          ["10 days", "14 days", "12 days", "36 days"],
          "The critical (longest) path controls the project. Duration = 14 days."
        ),
        shortAnswer(
          "y12s2-cpr-g4",
          "Activity A has no predecessors, duration 5. Activity B depends on A, duration 3. Earliest B can finish =",
          "5 + 3",
          "8",
          ["8.0"]
        ),
      ],
      independentPractice: [
        labelledChoice(
          "y12s2-cpr-i1",
          "Which activities can start at time 0 in: A(none), B(A), C(none), D(B,C)?",
          "C",
          ["A only", "C only", "A and C", "A, B and C"],
          "Activities with no predecessors can start immediately: A and C."
        ),
        shortAnswer(
          "y12s2-cpr-i2",
          "Path durations: A=3, C=7, E=2. Path total A→C→E =",
          "3 + 7 + 2",
          "12",
          ["12.0"]
        ),
        labelledChoice(
          "y12s2-cpr-i3",
          "An activity is on the critical path. Its float is:",
          "A",
          ["0", "1", "The path total", "The project duration"],
          "Critical path activities have zero float — any delay affects the project."
        ),
        shortAnswer(
          "y12s2-cpr-i4",
          "Paths: P1=8, P2=11, P3=7 days. Float for P1 =",
          "11 - 8",
          "3",
          ["3.0", "3 days"]
        ),
        labelledChoice(
          "y12s2-cpr-i5",
          "Activity C (predecessor B, duration 5) and B ends at time 7. The earliest C can finish is:",
          "C",
          ["5", "7", "12", "35"],
          "C starts at 7 (when B finishes) and takes 5, so earliest finish = 7 + 5 = 12."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Starting an activity before all its predecessors are complete (starting E when only C is done, but D is still running).",
          fix: "All listed predecessors must be finished before the next activity can begin. If E depends on both C and D, then E's earliest start is max(finish of C, finish of D).",
        },
        {
          mistake: "Choosing the shortest path as the critical path.",
          fix: "The critical path is the LONGEST path. It controls the project because all activities on it must be completed in sequence — any delay extends the whole project. Use the longest path total as the project completion time.",
        },
        {
          mistake: "Calculating float as 'longest path − shortest path' instead of 'longest path − this path'.",
          fix: "Float for each path = project completion time (longest path) minus the duration of that specific path. If the critical path is 14 and path P1 = 10, then float(P1) = 14 − 10 = 4 days.",
        },
        {
          mistake: "Adding all activity durations in the table to get the project duration.",
          fix: "The project duration is the length of the longest SINGLE PATH through the network, not the sum of all activities. Activities in parallel don't add to the project duration — only activities in sequence on the critical path matter.",
        },
      ],
      masteryQuiz: [
        labelledChoice(
          "y12s2-cpr-m1",
          "Activity G has predecessors D and E. G starts when:",
          "C",
          ["D finishes", "E finishes", "Both D and E finish", "G has no constraint"],
          "All predecessors must finish before G can start."
        ),
        shortAnswer(
          "y12s2-cpr-m2",
          "Durations: A=5, B=3, D=4. Path total A→D =",
          "5 + 4",
          "9",
          ["9.0"]
        ),
        labelledChoice(
          "y12s2-cpr-m3",
          "Three paths: 8, 15, 11 days. Project completion time =",
          "B",
          ["8 days", "15 days", "11 days", "34 days"],
          "Longest path = 15 days = project completion time."
        ),
        shortAnswer(
          "y12s2-cpr-m4",
          "Critical path = 15 days. Path P3 = 11 days. Float for P3 =",
          "15 - 11",
          "4",
          ["4.0", "4 days"]
        ),
        labelledChoice(
          "y12s2-cpr-m5",
          "Activities A (none, 4) and B (none, 6) can both start at time 0. C depends on both A and B, duration 3. Earliest finish of C =",
          "C",
          ["7", "10", "9", "13"],
          "B finishes last at time 6. C starts at 6 and takes 3 → finish = 9."
        ),
        shortAnswer(
          "y12s2-cpr-m6",
          "Path P1: A(3)+C(5)+E(2) = ?",
          "3 + 5 + 2",
          "10",
          ["10.0"]
        ),
        labelledChoice(
          "y12s2-cpr-m7",
          "On the critical path, if one activity is delayed by 2 days, the project completion:",
          "B",
          ["Is unaffected", "Is delayed by 2 days", "Is shortened by 2 days", "Depends on other paths"],
          "Critical path activities have zero float, so any delay extends the project by the same amount."
        ),
        shortAnswer(
          "y12s2-cpr-m8",
          "Project has 4 activities with durations 5, 3, 4, 6. Path total for all 4 in sequence =",
          "5 + 3 + 4 + 6",
          "18",
          ["18.0"]
        ),
        labelledChoice(
          "y12s2-cpr-m9",
          "Paths: P1=9, P2=13, P3=11 days. Which activity has zero float?",
          "B",
          ["P1 activities", "P2 activities", "P3 activities", "All activities"],
          "Zero float belongs to activities on the critical (longest) path: P2 = 13 days."
        ),
        labelledChoice(
          "y12s2-cpr-m10",
          "A project must be completed in 12 days. Critical path currently = 15 days. Float of critical path =",
          "A",
          ["0", "3", "−3", "12"],
          "Critical path always has float = 0. The project cannot meet the deadline without shortening the critical path."
        ),
      ],
    };
  }

  if (lesson.slug === "critical-path-analysis") {
    return {
      ...base,
      description:
        "Use activity tables to find project completion time, critical paths, float, and the effect of delays.",
      learningIntention:
        "Analyse small project schedules using prerequisites, earliest times, float, critical path, and delay effects.",
      successCriteria: [
        "Read an activity, duration, and prerequisite table.",
        "Find earliest start or finish times for manageable project networks.",
        "Identify a critical path and project completion time.",
        "Decide whether a delay changes the overall project completion time.",
      ],
      teaching: {
        paragraphs: [
          "Critical path analysis is used to schedule projects such as construction work, event planning, and school productions. Activities take time and may depend on earlier activities being finished.",
          "The earliest start time of an activity is the earliest time all its prerequisites are complete. The earliest finish time is earliest start plus duration.",
          "The project completion time is controlled by the longest dependent chain of activities. That chain is the critical path.",
          "Float, or slack, is spare time for a non-critical activity. A delay on a critical activity delays the project, but a delay within float on a non-critical activity does not.",
        ],
        latexBlocks: [
          "\\text{earliest finish}=\\text{earliest start}+\\text{duration}",
          "\\text{critical path}=\\text{longest dependent path}",
          "\\text{float}=\\text{latest start}-\\text{earliest start}",
        ],
      },
      workedExamples: [
        {
          title: "Find project completion time from a prerequisite table",
          questionLatex:
            "\\begin{array}{c|c|c} \\text{Activity} & \\text{Duration} & \\text{Prerequisite}\\\\" +
            "A&3&-\\\\ B&4&A\\\\ C&2&A\\\\ D&5&B,C\\\\ F&2&D \\end{array}",
          diagram: y12SolvedCriticalPathDiagram,
          steps: [
            {
              explanation:
                "Activity A starts at 0 and finishes at 3.",
              latex: "EF_A=0+3=3",
            },
            {
              explanation:
                "B finishes at 7 and C finishes at 5, so D must wait for B.",
              latex: "ES_D=7,\\quad EF_D=7+5=12",
            },
            {
              explanation:
                "F starts when D finishes and takes 2 days.",
              latex: "EF_F=12+2=14",
            },
          ],
          finalAnswerLatex: "\\text{Project completion time}=14\\text{ days.}",
        },
        {
          title: "Identify the critical path",
          questionLatex:
            "\\text{Path totals: }A-B-D-F=14,\\quad A-C-D-F=12.",
          steps: [
            {
              explanation:
                "The critical path is the longest dependent path through the project.",
            },
            {
              explanation:
                "The larger total is 14 days.",
              latex: "A-B-D-F=14",
            },
          ],
          finalAnswerLatex: "\\text{Critical path }A-B-D-F.",
        },
        {
          title: "Decide whether a delay affects completion",
          questionLatex:
            "\\text{Activity C has 2 days float. C is delayed by 1 day.}",
          steps: [
            {
              explanation:
                "The delay is less than or equal to the available float.",
            },
            {
              explanation:
                "The project completion time does not change.",
            },
          ],
          finalAnswerLatex: "\\text{No delay to the overall project.}",
        },
      ],
      guidedPractice: [
        shortAnswer("y12s2-cpa-g1", "Activity A takes 4 days and starts at day 0. What is its earliest finish time?", "0+4", "4 days", ["4", "4d"]),
        shortAnswer("y12s2-cpa-g2", "Activity B takes 5 days and can start after A finishes at day 4. What is B's earliest finish time?", "4+5", "9 days", ["9", "9d"]),
        labelledChoice("y12s2-cpa-g3", "A project path with the longest total duration is called the:", "C", ["Shortest path", "Minimum spanning tree", "Critical path", "Degree of a vertex"], "The critical path controls the project completion time."),
        labelledChoice("y12s2-cpa-g4", "Activity E has 3 days float and is delayed by 2 days. What happens to the project completion time?", "A", ["It does not change", "It must increase by 2 days", "It becomes a circuit", "It becomes an MST"], "A delay within float does not delay the whole project."),
      ],
      independentPractice: [
        shortAnswer("y12s2-cpa-i1", "Activity C can start after A and B finish at days 5 and 8. What is C's earliest start?", "\\max(5,8)", "8 days", ["8", "8d"]),
        shortAnswer("y12s2-cpa-i2", "A path A-C-F has durations 3, 6 and 2 days. Find the path total.", "3+6+2", "11 days", ["11", "11d"]),
        shortAnswer("y12s2-cpa-i3", "Path totals are A-B-D=12 and A-C-D=15. What is the project completion time?", "\\max(12,15)", "15 days", ["15", "15d"]),
        labelledChoice("y12s2-cpa-i4", "A critical activity is delayed by 3 days. What is the likely effect?", "B", ["No effect ever", "Project completion is delayed by 3 days", "It creates a cycle", "It reduces the completion time"], "A delay on the critical path delays the project by the same amount, unless the plan changes."),
        shortAnswer("y12s2-cpa-i5", "If latest start is day 10 and earliest start is day 7, find the float.", "10-7", "3 days", ["3", "3d"]),
      ],
      commonMistakes: [
        { mistake: "Adding all activity durations in the table.", fix: "Follow dependent paths and use the longest path, not the sum of every activity." },
        { mistake: "Starting an activity before all prerequisites are complete.", fix: "Use the latest finish time among its prerequisites." },
        { mistake: "Assuming every delay delays the whole project.", fix: "Check whether the delayed activity is critical or has float." },
        { mistake: "Confusing earliest start and earliest finish.", fix: "Earliest finish equals earliest start plus activity duration." },
      ],
      masteryQuiz: [
        shortAnswer("y12s2-cpa-m1", "Activity A starts at day 0 and takes 6 days. Find its earliest finish.", "\\text{start}=\\text{day }0,\\quad \\text{duration}=6\\text{ days}", "6 days", ["6", "6d"]),
        shortAnswer("y12s2-cpa-m2", "Activity B starts after A finishes at day 6 and takes 4 days. Find B's earliest finish.", "\\text{B starts day }6,\\quad \\text{duration}=4\\text{ days}", "10 days", ["10", "10d"]),
        shortAnswer("y12s2-cpa-m3", "Activity D depends on B and C, which finish at days 9 and 12. What is D's earliest start?", "\\text{B finishes day }9,\\quad \\text{C finishes day }12", "12 days", ["12", "12d"]),
        shortAnswer("y12s2-cpa-m4", "Path A-B-D-F has durations 3, 4, 5 and 2. Find the path total.", "\\text{durations: }3,\\ 4,\\ 5,\\ 2\\text{ days}", "14 days", ["14", "14d"]),
        shortAnswer("y12s2-cpa-m5", "Path totals are 14, 12 and 10 days. Find the project completion time.", "\\text{path totals: }14,\\ 12,\\ 10\\text{ days}", "14 days", ["14", "14d"]),
        {
          ...shortAnswer("y12s2-cpa-m6", "Use the activity network to enter the critical path.", "\\begin{array}{c|ccccc}\\text{Activity}&A&B&C&D&F\\\\ \\text{Duration}&3&4&2&5&2\\end{array}", "A-B-D-F", ["A,B,D,F", "ABDF", "A B D F"]),
          explanation:
            "The path A-B-D-F has total duration 3 + 4 + 5 + 2 = 14 days, while A-C-D-F has total duration 12 days.",
          diagram: y12CriticalPathDiagram,
        },
        labelledChoice("y12s2-cpa-m7", "Activity C has 2 days float and is delayed by 3 days. What is the likely project delay?", "B", ["No delay", "1 day", "3 days", "5 days"], "A delay 1 day beyond float delays the project by 1 day."),
        labelledChoice("y12s2-cpa-m8", "Which activity can delay the whole project if it is delayed?", "A", ["A critical activity", "Any activity with float remaining", "Only a directed edge", "Only an MST edge"], "Critical activities control completion time."),
        shortAnswer("y12s2-cpa-m9", "Latest start is day 11 and earliest start is day 8. Find the float.", "\\text{latest start}=\\text{day }11,\\quad \\text{earliest start}=\\text{day }8", "3 days", ["3", "3d"]),
        labelledChoice("y12s2-cpa-m10", "When an activity has two prerequisites, its earliest start is based on:", "D", ["The shortest prerequisite finish time", "The first activity listed", "The average finish time", "The latest prerequisite finish time"], "All prerequisites must be finished before the activity starts."),
      ],
    };
  }

  if (lesson.slug === "network-flow-capacity-cuts") {
    return {
      ...base,
      description:
        "Interpret directed flow networks, capacities, bottlenecks, feasible flow, cuts, and maximum-flow limits in practical contexts.",
      learningIntention:
        "Use capacities and cuts to reason about feasible flow through a directed network.",
      successCriteria: [
        "Identify source, sink, arcs, and capacities in a directed flow network.",
        "Check whether a proposed flow is feasible by comparing flow with capacity.",
        "Find the capacity of a cut by adding relevant forward arcs.",
        "Use bottlenecks and cuts to place an upper limit on total network flow.",
      ],
      teaching: {
        paragraphs: [
          "A flow network is a directed network used to model movement through a system. The source is where flow begins, and the sink is where flow leaves the network.",
          "Each directed edge, or arc, has a capacity. A proposed flow is feasible only if no arc carries more than its capacity.",
          "A bottleneck is a part of the network with limited capacity. It can restrict the amount of water, traffic, data, or goods that can pass through the whole system.",
          "A cut separates the source from the sink. The capacity of the cut is found by adding the capacities of forward arcs crossing from the source side to the sink side.",
        ],
        latexBlocks: [
          "\\text{flow on an arc}\\le\\text{capacity of that arc}",
          "\\text{source}\\to\\text{network}\\to\\text{sink}",
          "\\text{cut capacity}=\\sum \\text{forward capacities crossing the cut}",
        ],
      },
      workedExamples: [
        {
          title: "Check a proposed flow",
          questionLatex:
            "\\text{Arc }A\\to B\\text{ has capacity }12.\\text{ A proposed flow sends }9\\text{ units.}",
          steps: [
            { explanation: "Compare the proposed flow with the capacity.", latex: "9\\le12" },
            { explanation: "The proposed flow does not exceed the capacity." },
          ],
          finalAnswerLatex: "\\text{Feasible on this arc.}",
        },
        {
          title: "Find the capacity of a cut",
          questionLatex:
            "\\text{Forward arcs crossing a cut have capacities }8,\\ 5,\\ 7.",
          steps: [
            { explanation: "Add the forward capacities that cross the cut.", latex: "8+5+7" },
            { explanation: "Evaluate the total.", latex: "20" },
          ],
          finalAnswerLatex: "20",
        },
        {
          title: "Identify a bottleneck",
          questionLatex:
            "\\text{Two pipes into the sink have capacities }6\\text{ and }9\\text{ litres per second.}",
          steps: [
            { explanation: "All flow into the sink must use these final pipes." },
            { explanation: "Their combined capacity limits the total flow into the sink.", latex: "6+9=15" },
          ],
          finalAnswerLatex: "\\text{At most }15\\text{ L/s can enter the sink through these pipes.}",
        },
      ],
      guidedPractice: [
        labelledChoice("y12s2-flow-g1", "In a flow network, what is the source?", "A", ["Where flow begins", "Where flow leaves", "Any edge weight", "A cycle"], "The source is the starting point of the flow."),
        labelledChoice("y12s2-flow-g2", "An arc has capacity 10 and proposed flow 7. Is the arc feasible?", "B", ["No", "Yes", "Only if it is undirected", "Only if capacity is ignored"], "The flow is not greater than the capacity."),
        shortAnswer("y12s2-flow-g3", "A cut has forward capacities 4, 6 and 5. Find the cut capacity.", "4+6+5", "15"),
        shortAnswer("y12s2-flow-g4", "Two final arcs into a sink have capacities 8 and 3. Find the most that can enter through those arcs.", "8+3", "11"),
      ],
      independentPractice: [
        shortAnswer("y12s2-flow-i1", "A pipe has capacity 18 L/s and carries 12 L/s. How much spare capacity remains?", "18-12", "6", ["6 L/s"]),
        labelledChoice("y12s2-flow-i2", "An arc has capacity 9 and proposed flow 11. What is the issue?", "C", ["It has no source", "It is always optimal", "It exceeds capacity", "It is a cut"], "A feasible flow cannot exceed capacity."),
        shortAnswer("y12s2-flow-i3", "Forward arcs crossing a cut have capacities 7 and 13. Find the cut capacity.", "7+13", "20"),
        shortAnswer("y12s2-flow-i4", "A source can send along two outgoing arcs with capacities 10 and 14. Find the outgoing capacity total.", "10+14", "24"),
        labelledChoice("y12s2-flow-i5", "What does a cut capacity provide for the total flow?", "D", ["A lower limit only", "A vertex degree", "A residual", "An upper limit"], "A cut limits how much flow can cross from source side to sink side."),
      ],
      commonMistakes: [
        { mistake: "Treating every directed edge as two-way.", fix: "Follow the arrow direction in a flow network." },
        { mistake: "Allowing flow to exceed capacity.", fix: "Check each arc separately against its capacity." },
        { mistake: "Adding backward arcs when finding a cut capacity.", fix: "For a source-to-sink cut, add only forward arcs crossing the cut." },
        { mistake: "Confusing shortest path with maximum flow.", fix: "Flow questions are about capacity through the network, not one shortest route." },
      ],
      masteryQuiz: [
        labelledChoice("y12s2-flow-m1", "In a flow network, what is the sink?", "B", ["Where flow begins", "Where flow leaves", "The largest capacity", "A repeated edge"], "The sink is the endpoint that receives the flow."),
        shortAnswer("y12s2-flow-m2", "A proposed flow sends 16 on an arc with capacity 20. Find the spare capacity.", "20-16", "4"),
        labelledChoice("y12s2-flow-m3", "A proposed flow sends 15 on an arc with capacity 12. The flow is:", "A", ["Not feasible", "Always maximum", "A cut", "A source"], "The proposed flow is greater than the capacity."),
        shortAnswer("y12s2-flow-m4", "A cut has forward capacities 6, 9 and 10. Find the cut capacity.", "6+9+10", "25"),
        shortAnswer("y12s2-flow-m5", "Final arcs into a sink have capacities 5, 7 and 8. Find their combined capacity.", "5+7+8", "20"),
        labelledChoice("y12s2-flow-m6", "Which practical context is naturally modelled by network flow?", "C", ["A box plot", "A residual", "Water through pipes with capacity limits", "A normal z-score"], "Pipes with capacity limits are a flow-network context."),
        labelledChoice("y12s2-flow-m7", "A bottleneck in a flow network is:", "D", ["The first vertex alphabetically", "Any triangle", "A shortest path", "A low-capacity part that restricts total flow"], "A bottleneck restricts the total amount that can pass through."),
        shortAnswer("y12s2-flow-m8", "An arc has capacity 30 and flow 22. Find the unused capacity.", "30-22", "8"),
        labelledChoice("y12s2-flow-m9", "When calculating a cut capacity, which arcs are added?", "A", ["Forward arcs crossing from source side to sink side", "All arcs in the network", "Only loops", "Only the shortest path"], "A cut capacity adds the forward crossing arcs."),
        shortAnswer("y12s2-flow-m10", "A cut capacity is 18. What is the largest possible total flow across that cut?", "\\text{cut capacity}=18", "18"),
      ],
    };
  }

  if (lesson.slug === "gantt-charts-dummy-activities") {
    return {
      ...base,
      description:
        "Construct Gantt charts from network diagrams, identify the critical path on a Gantt chart, and use dummy activities to model shared precedence constraints.",
      learningIntention:
        "Build a Gantt chart from a precedence table, read critical and non-critical activities from it, and recognise when a dummy activity is needed in a network.",
      successCriteria: [
        "Identify EST, EFT, LST and LFT for each activity using the forward and backward pass.",
        "Construct a Gantt chart by placing each activity's bar from its EST for its duration.",
        "Identify critical path activities as those with zero float on the Gantt chart.",
        "Recognise that a dummy activity (dashed arrow, zero duration) is needed when two activities share some but not all predecessors.",
      ],
      teaching: {
        paragraphs: [
          "A Gantt chart is a horizontal bar chart where each row is an activity and the horizontal axis is time. Every bar starts at the activity's EST and extends for the duration of the activity. Critical activities sit one after another with no gap; non-critical activities may start later than their EST by up to their float time.",
          "To build a Gantt chart: complete the forward pass to find EST and EFT for each activity, then the backward pass to find LST and LFT. Float = LST − EST. Place each bar starting at EST. Shade critical activities (float = 0) differently from non-critical ones. Float can be shown as a dashed extension after the bar.",
          "A dummy activity is needed in an Activity-on-Arc (AOA) network when two activities share some but not all predecessors. For example, if Activity C depends on A only, but Activity D depends on both A and B, a dummy (dashed arrow, zero duration) runs from the end of B to the node where D starts. This forces D to wait for B without making C depend on B.",
          "Project Alpha: activities A(2), B(4), C(3), D(2), E(5), F(1). Precedences: C after A; D after B; E after C and D; F after E. Critical path = B → D → E → F = 4+2+5+1 = 12 days. Float: A=1, B=0, C=1, D=0, E=0, F=0.",
        ],
        latexBlocks: [
          "\\text{EFT} = \\text{EST} + \\text{duration}",
          "\\text{LFT} = \\min(\\text{LST of successors})",
          "\\text{Float} = \\text{LST} - \\text{EST} = \\text{LFT} - \\text{EFT}",
          "\\text{Critical path: all activities with Float} = 0",
        ],
      },
      workedExamples: [
        {
          title: "Forward and backward pass for Project Alpha",
          questionLatex:
            "\\text{Project Alpha: A(2), B(4), C(3 after A), D(2 after B), E(5 after C and D), F(1 after E). Find EST, EFT, LST, LFT and float for each activity.}",
          diagram: {
            description:
              "Project Alpha AON network. Critical path B→D→E→F is highlighted. A and C are non-critical (float = 1 each).",
            vertices: [
              { id: "S", label: "Start", x: 40, y: 120 },
              { id: "A", label: "A(2)", x: 160, y: 60 },
              { id: "B", label: "B(4)", x: 160, y: 180, highlighted: true },
              { id: "C", label: "C(3)", x: 280, y: 60 },
              { id: "D", label: "D(2)", x: 280, y: 180, highlighted: true },
              { id: "E", label: "E(5)", x: 400, y: 120, highlighted: true },
              { id: "F", label: "F(1)", x: 520, y: 120, highlighted: true },
              { id: "End", label: "End", x: 640, y: 120 },
            ],
            edges: [
              { from: "S", to: "A", directed: true },
              { from: "S", to: "B", directed: true, highlighted: true },
              { from: "A", to: "C", directed: true },
              { from: "B", to: "D", directed: true, highlighted: true },
              { from: "C", to: "E", directed: true },
              { from: "D", to: "E", directed: true, highlighted: true },
              { from: "E", to: "F", directed: true, highlighted: true },
              { from: "F", to: "End", directed: true, highlighted: true },
            ],
            highlightedVertices: ["B", "D", "E", "F"],
          },
          steps: [
            {
              explanation: "Forward pass — find EST and EFT.",
              latex:
                "A:\\;0\\to2,\\quad B:\\;0\\to4,\\quad C:\\;2\\to5,\\quad D:\\;4\\to6,\\quad E:\\;6\\to11,\\quad F:\\;11\\to12",
            },
            {
              explanation: "Backward pass from project end (12) — find LFT and LST.",
              latex:
                "F:\\;\\text{LFT}=12,\\;\\text{LST}=11\\quad D:\\;\\text{LFT}=6,\\;\\text{LST}=4\\quad E:\\;\\text{LFT}=11,\\;\\text{LST}=6",
            },
            {
              explanation: "Floats: B, D, E, F have float 0 (critical). A and C have float 1.",
              latex:
                "\\text{Critical path: }B\\to D\\to E\\to F\\quad(\\text{duration }=12\\text{ days})",
            },
          ],
          finalAnswerLatex:
            "\\text{Critical path: }B\\to D\\to E\\to F=12\\text{ days. Float: }A=C=1,\\;B=D=E=F=0.",
        },
        {
          title: "Reading a Gantt chart",
          questionLatex:
            "\\text{Using Project Alpha, draw the Gantt chart and identify which activities have float.}",
          steps: [
            {
              explanation: "Place each bar at its EST, extending for its duration.",
              latex:
                "A:\\;\\text{days }0\\text{–}2\\;(+1\\text{ float}),\\quad B:\\;\\text{days }0\\text{–}4,\\quad C:\\;\\text{days }2\\text{–}5\\;(+1\\text{ float})",
            },
            {
              explanation: "Critical activities (float = 0) have no dashed extension: B, D, E, F.",
              latex:
                "D:\\;\\text{days }4\\text{–}6,\\quad E:\\;\\text{days }6\\text{–}11,\\quad F:\\;\\text{days }11\\text{–}12",
            },
          ],
          finalAnswerLatex:
            "\\text{Activities with float: A (float 1), C (float 1). Critical (float 0): B, D, E, F.}",
        },
        {
          title: "When is a dummy activity needed?",
          questionLatex:
            "\\text{Activity C depends on A only. Activity D depends on A and B. Explain why a dummy is needed and where it goes.}",
          diagram: {
            description:
              "AOA network showing dummy activity. A: Node 1→Node 2. B: Node 1→Node 3. Dummy (dashed, zero duration): Node 2→Node 3. C: Node 2→Node 4. D: Node 3→Node 5. D requires both A (via dummy) and B.",
            vertices: [
              { id: "N1", label: "1", x: 60, y: 150 },
              { id: "N2", label: "2", x: 220, y: 70 },
              { id: "N3", label: "3", x: 220, y: 230 },
              { id: "N4", label: "4", x: 380, y: 70 },
              { id: "N5", label: "5", x: 380, y: 230 },
            ],
            edges: [
              { from: "N1", to: "N2", weight: "A", directed: true },
              { from: "N1", to: "N3", weight: "B", directed: true },
              { from: "N2", to: "N3", weight: "dummy", directed: true, dashed: true },
              { from: "N2", to: "N4", weight: "C", directed: true },
              { from: "N3", to: "N5", weight: "D", directed: true },
            ],
          },
          steps: [
            {
              explanation: "Without a dummy, B would need its own path to D's start node. But if A and B both finish at the same node, C would incorrectly depend on B.",
              latex:
                "\\text{Solution: draw A}\\to\\text{Node 2}\\to\\text{C, and draw B}\\to\\text{Node 3.}",
            },
            {
              explanation: "Add a dummy (dashed, zero duration) from Node 2 to Node 3. D starts at Node 3, requiring both A (via dummy) and B.",
              latex:
                "\\text{Dummy: Node 2}\\xrightarrow{0}\\text{Node 3},\\quad D\\text{ starts at Node 3}",
            },
          ],
          finalAnswerLatex:
            "\\text{Dummy: Node 2}\\xrightarrow{\\text{duration}=0}\\text{Node 3 ensures D waits for A and B, without forcing C to depend on B.}",
        },
      ],
      guidedPractice: [
        labelledChoice(
          "y12s2-gcd-g1",
          "What is a dummy activity in a critical path network?",
          "B",
          [
            "An activity with negative float",
            "A dashed arrow with zero duration that carries a precedence constraint",
            "The last activity in the project",
            "An activity that runs in parallel with the critical path",
          ],
          "A dummy is a dashed arrow of zero duration used to show that one activity must wait for another without adding any time to the project."
        ),
        shortAnswer(
          "y12s2-gcd-g2",
          "Project Alpha: A(2), B(4), C(3 after A), D(2 after B), E(5 after C and D), F(1 after E). Find the minimum project completion time in days.",
          "\\text{Critical path: }B\\to D\\to E\\to F=4+2+5+1",
          "12",
          ["12 days"]
        ),
        labelledChoice(
          "y12s2-gcd-g3",
          "Project Alpha: which activities are on the critical path?",
          "B",
          [
            "A, C, E, F",
            "B, D, E, F",
            "A, B, D, F",
            "All activities",
          ],
          "Critical path = B→D→E→F (float = 0 for each). A and C both have float = 1."
        ),
        shortAnswer(
          "y12s2-gcd-g4",
          "Project Alpha: find the float for Activity C (EST=2, LST=3).",
          "\\text{Float}=\\text{LST}-\\text{EST}=3-2",
          "1",
          ["1 day"]
        ),
      ],
      independentPractice: [
        labelledChoice(
          "y12s2-gcd-i1",
          "A dummy activity is shown in a network diagram as:",
          "C",
          [
            "A solid arrow",
            "A rectangular box",
            "A dashed arrow with duration 0",
            "A dotted node",
          ],
          "Dummy activities are always drawn as dashed arrows with zero duration to distinguish them from real activities."
        ),
        shortAnswer(
          "y12s2-gcd-i2",
          "Project Alpha: find EFT for Activity E (EST=6, duration=5 days).",
          "\\text{EFT}=6+5",
          "11",
          ["11 days"]
        ),
        labelledChoice(
          "y12s2-gcd-i3",
          "In a Gantt chart, the horizontal axis represents:",
          "B",
          ["Activity names", "Time", "Cost", "Probability"],
          "The horizontal axis is time. Each bar starts at the EST of the activity."
        ),
        labelledChoice(
          "y12s2-gcd-i4",
          "Project Alpha — Activity C has EST=2 and duration 3. On the Gantt chart, C's bar spans:",
          "B",
          ["Days 0 to 3", "Days 2 to 5", "Days 3 to 6", "Days 2 to 3"],
          "Bar starts at EST (day 2) and extends for 3 days: days 2 to 5."
        ),
        shortAnswer(
          "y12s2-gcd-i5",
          "Project Alpha: find LST for Activity A (LFT=3, duration=2 days).",
          "\\text{LST}=\\text{LFT}-\\text{duration}=3-2",
          "1",
          ["1 day", "Day 1"]
        ),
      ],
      commonMistakes: [
        {
          mistake: "Starting a Gantt bar at time 0 for every activity.",
          fix: "Each bar starts at the activity's EST, not always at 0. Activities that depend on others start after their predecessors finish.",
        },
        {
          mistake: "Thinking a dummy activity adds time to the project.",
          fix: "A dummy has zero duration — it adds no time. It only enforces a precedence constraint. The project length comes from real activities only.",
        },
        {
          mistake: "Confusing EFT with LFT when calculating float.",
          fix: "Float = LST − EST = LFT − EFT. EFT is the earliest an activity can finish; LFT is the latest it can finish. Float uses the difference, not either value alone.",
        },
        {
          mistake: "Adding a dummy whenever there is a parallel path, even when not needed.",
          fix: "A dummy is only needed when two activities share some but not all predecessors, creating a precedence clash. If two activities simply start at the same node independently, no dummy is required.",
        },
      ],
      masteryQuiz: [
        labelledChoice(
          "y12s2-gcd-m1",
          "On a Gantt chart, critical path activities are those that:",
          "B",
          [
            "Have the longest individual duration",
            "Have zero float and must start at their EST",
            "Always appear at the top of the chart",
            "Are drawn as dashed bars",
          ],
          "Critical activities have zero float — any delay cascades directly to the project end date."
        ),
        shortAnswer(
          "y12s2-gcd-m2",
          "Project Alpha: find LFT for Activity D (LST of F=11, LST of E=6, D feeds E).",
          "\\text{LFT(D)}=\\text{LST(E)}=6",
          "6",
          ["6 days", "Day 6"]
        ),
        labelledChoice(
          "y12s2-gcd-m3",
          "Project Alpha: which activities have float greater than 0?",
          "A",
          ["A and C only", "B and D only", "E and F only", "All activities"],
          "A has float=1, C has float=1. B, D, E, F are critical (float=0)."
        ),
        labelledChoice(
          "y12s2-gcd-m4",
          "A dummy is needed when Activity X depends on A and B, but Activity Y depends on A only. The dummy runs:",
          "B",
          [
            "From A's end node to B's end node",
            "From B's end node to X's start node, showing B is required for X but not Y",
            "From X to Y directly",
            "From the start node to both A and B",
          ],
          "The dummy carries B's completion into X's start while Y branches off at A's end node independently."
        ),
        shortAnswer(
          "y12s2-gcd-m5",
          "Project Alpha: find EST for Activity E (EFT of C=5, EFT of D=6).",
          "\\text{EST(E)}=\\max(5,6)=6",
          "6",
          ["6 days", "Day 6"]
        ),
        labelledChoice(
          "y12s2-gcd-m6",
          "If Activity B in Project Alpha increases from 4 to 5 days, the minimum project completion time becomes:",
          "B",
          ["12 days", "13 days", "14 days", "15 days"],
          "B→D→E→F = 5+2+5+1 = 13 days. The critical path length increases by 1."
        ),
        labelledChoice(
          "y12s2-gcd-m7",
          "On a Gantt chart, float for a non-critical activity is shown as:",
          "B",
          [
            "A longer solid bar",
            "A dashed extension after the solid bar",
            "A separate row above the activity",
            "A shorter bar",
          ],
          "The solid bar shows the activity duration. The dashed extension shows how much later the activity could start (float)."
        ),
        shortAnswer(
          "y12s2-gcd-m8",
          "Project Alpha: if Activity E is reduced to 3 days (was 5), find the new minimum completion time.",
          "B\\to D\\to E\\to F=4+2+3+1",
          "10",
          ["10 days"]
        ),
        labelledChoice(
          "y12s2-gcd-m9",
          "Project Alpha: which activities must be complete before E can start?",
          "C",
          ["A only", "B only", "Both C and D", "F only"],
          "E depends on C and D. C needs A; D needs B. So both C and D must be done before E starts."
        ),
        labelledChoice(
          "y12s2-gcd-m10",
          "The primary purpose of a Gantt chart in project management is to:",
          "B",
          [
            "Calculate the project cost",
            "Show the schedule of activities and their timing visually",
            "Replace the network diagram entirely",
            "Identify the probability of project completion",
          ],
          "A Gantt chart is a scheduling tool — it shows when each activity starts and ends, making it easy to see the critical path and resource needs at a glance."
        ),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise HSC-style network questions involving terminology, shortest paths, minimum spanning trees, project tables, and critical path delays.",
    learningIntention:
      "Apply networks and critical path analysis to mixed practical Standard 2 exam-style questions.",
    successCriteria: [
      "Interpret vertices, edges, weights, directed edges, paths, trails, circuits, and connected networks.",
      "Choose the correct method for shortest path, MST, or critical path analysis.",
      "Calculate route weights, MST totals, project completion times, float, and delay effects.",
      "Answer practical network questions with concise labels, totals, or labelled choices.",
    ],
    teaching: {
      paragraphs: [
        "Networks exam questions usually begin with a context: roads, school buildings, deliveries, fibre cables, or project tasks. Start by identifying what the question is asking you to optimise or describe.",
        "If the question asks for the quickest, shortest, or cheapest route from one place to another, use shortest path. If it asks to connect all locations with minimum total cost or length, use a minimum spanning tree.",
        "If the question gives project activities, durations, and prerequisites, use critical path analysis. The project completion time comes from the longest dependent path, not from adding every activity in the table.",
        "For interpretation questions, be precise. A non-critical delay may not change the completion time if it is within float, and the mathematically shortest route may not be the best real-world route if safety, traffic, or restrictions matter.",
      ],
      latexBlocks: [
        "\\text{one route} \\rightarrow \\text{shortest path}",
        "\\text{connect all locations} \\rightarrow \\text{minimum spanning tree}",
        "\\text{project with prerequisites} \\rightarrow \\text{critical path analysis}",
      ],
    },
    workedExamples: [
      {
        title: "Choose the correct network method",
        questionLatex:
          "\\text{A council wants the least total cable to connect five buildings.}",
        steps: [
          {
            explanation:
              "The goal is to connect all buildings, not travel between two buildings.",
          },
          {
            explanation:
              "A minimal connector problem uses a minimum spanning tree.",
          },
        ],
        finalAnswerLatex: "\\text{Use a minimum spanning tree.}",
      },
      {
        title: "Mixed route calculation",
        questionLatex:
          "\\begin{array}{c|c} \\text{Route} & \\text{Total time}\\\\" +
          "A-B-D&18\\\\ A-C-D&16\\\\ A-E-D&20 \\end{array}",
        steps: [
          {
            explanation:
              "Compare the total time for each possible route.",
          },
          {
            explanation:
              "The smallest total is 16 minutes.",
              latex: "A-C-D=16",
            },
        ],
        finalAnswerLatex: "\\text{Shortest path }A-C-D\\text{, 16 minutes.}",
      },
      {
        title: "Critical path delay decision",
        questionLatex:
          "\\text{Activity G is critical and is delayed by 2 days.}",
        steps: [
          {
            explanation:
              "A critical activity has no float in the current schedule.",
          },
          {
            explanation:
              "A delay to a critical activity delays the project by the same amount.",
          },
        ],
        finalAnswerLatex:
          "\\text{The project completion time increases by 2 days.}",
      },
    ],
    guidedPractice: [
      labelledChoice("y12s2-net-exam-g1", "A question asks for the quickest road route from Town A to Town F. Which method is best?", "A", ["Shortest path", "Minimum spanning tree", "Tax calculation", "Box plot"], "One route from a start to an end is a shortest-path problem."),
      shortAnswer("y12s2-net-exam-g2", "A route uses edge weights 6, 5 and 4 minutes. Find the total route time.", "6+5+4", "15 minutes", ["15", "15 min", "15 mins"]),
      labelledChoice("y12s2-net-exam-g3", "A project activity has float of 4 days and is delayed by 2 days. What happens to completion time?", "B", ["It increases by 2 days", "It does not change", "It becomes an MST", "It must restart"], "The delay is within the available float."),
      shortAnswer("y12s2-net-exam-g4", "MST connector lengths are 8, 10, 12 and 15 metres. Find the total length.", "8+10+12+15", "45 m", ["45", "45m", "45 metres", "45 meters"]),
    ],
    independentPractice: [
      shortAnswer("y12s2-net-exam-i1", "A table lists roads AB, BC, CD, DA and AC. How many edges are listed?", "AB,BC,CD,DA,AC", "5"),
      shortAnswer("y12s2-net-exam-i2", "Routes A-B-E and A-C-E have total times 22 and 19 minutes. Give the shortest path label.", "\\text{shortest path}", "A-C-E", ["A,C,E", "ACE", "A C E"]),
      labelledChoice("y12s2-net-exam-i3", "A school is connecting every classroom block using the least total fibre length. Which method should be used?", "C", ["Critical path", "Shortest path", "Minimum spanning tree", "Circuit count"], "Connecting all required locations at minimum total length is an MST problem."),
      shortAnswer("y12s2-net-exam-i4", "A project has path totals 9, 13 and 11 days. Find the completion time.", "\\max(9,13,11)", "13 days", ["13", "13d"]),
      labelledChoice("y12s2-net-exam-i5", "A 14-minute walking route is longer than a 12-minute route but avoids an unsafe crossing. Which conclusion is best?", "D", ["The 12-minute route must always be chosen", "The 14-minute route is impossible", "The network has no weights", "The longer route may be better in practice"], "Practical decisions can include safety, not just shortest time."),
    ],
    commonMistakes: [
      { mistake: "Choosing shortest path for a minimal connector problem.", fix: "Use MST when all locations must be connected." },
      { mistake: "Adding every project activity duration to find completion time.", fix: "Use the longest dependent path." },
      { mistake: "Ignoring float when interpreting a delay.", fix: "Compare the delay with available float before deciding the project effect." },
      { mistake: "Giving a long explanation when a label or total is enough.", fix: "Use short route labels, totals, or A/B/C/D choices." },
    ],
    masteryQuiz: [
      labelledChoice("y12s2-net-exam-m1", "A delivery driver needs the quickest route from depot to school. Use:", "A", ["Shortest path", "Minimum spanning tree", "Critical path only", "Degree only"], "A single route is a shortest-path problem."),
      labelledChoice("y12s2-net-exam-m2", "A fibre company needs to connect all buildings with minimum total cable. Use:", "B", ["Shortest path", "Minimum spanning tree", "Median", "Tax table"], "This is a minimal connector problem."),
      shortAnswer("y12s2-net-exam-m3", "A route uses edge weights 7, 3 and 6. Find the total.", "\\text{weights: }7,\\ 3,\\ 6", "16"),
      shortAnswer("y12s2-net-exam-m4", "Path totals are A-B-D=17 and A-C-D=14. Enter the shortest path.", "\\text{shortest path}", "A-C-D", ["A,C,D", "ACD", "A C D"]),
      shortAnswer("y12s2-net-exam-m5", "MST selected edges have lengths 5, 6, 8 and 9. Find the total length.", "\\text{MST lengths: }5,\\ 6,\\ 8,\\ 9", "28", ["28 m", "28m", "28 metres", "28 meters"]),
      labelledChoice("y12s2-net-exam-m6", "A tree used for an MST must not contain:", "D", ["Vertices", "Weights", "Selected edges", "Cycles"], "Trees do not contain cycles."),
      shortAnswer("y12s2-net-exam-m7", "A project path has durations 2, 5, 4 and 3 days. Find the path total.", "\\text{durations: }2,\\ 5,\\ 4,\\ 3\\text{ days}", "14 days", ["14", "14d"]),
      shortAnswer("y12s2-net-exam-m8", "Project path totals are 12, 15 and 11 days. Find the project completion time.", "\\text{path totals: }12,\\ 15,\\ 11\\text{ days}", "15 days", ["15", "15d"]),
      labelledChoice("y12s2-net-exam-m9", "A non-critical activity has 5 days float and is delayed by 3 days. Completion time:", "C", ["Increases by 5 days", "Increases by 3 days", "Does not change", "Becomes a circuit"], "The delay is within float."),
      labelledChoice("y12s2-net-exam-m10", "A critical activity is delayed by 2 days. Completion time usually:", "A", ["Increases by 2 days", "Does not change", "Decreases by 2 days", "Is found using MST"], "A critical delay delays the whole project by the same amount."),
    ],
  };
}
