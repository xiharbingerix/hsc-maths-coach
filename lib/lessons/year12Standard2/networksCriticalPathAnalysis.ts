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
  if (lowerPrompt.includes("earliest finish")) {
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

function shortAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseShortAnswer(id, prompt, latex, answer, acceptedAnswers),
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
  if (
    course.slug !== "year-12-standard-2" ||
    unit.slug !== "networks-critical-path-analysis"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

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

