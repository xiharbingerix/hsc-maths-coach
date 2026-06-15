import type { CourseLessonSeed, CoursePathwaySeed, CourseUnitSeed } from "../../courseTypes";
import type { ExplicitLesson, PracticeQuestion, WorkedExample } from "../differentialCalculus";
import type { NetworkDiagram } from "../types";
import { labelledChoice, shortAnswer as baseShortAnswer } from "../questionHelpers";

function networkAnswerVariants(prompt: string, answer: string): string[] {
  if (!/^-?\d+(\.\d+)?$/.test(answer)) return [];

  const lowerPrompt = prompt.toLowerCase();
  const variants: string[] = [];

  if (lowerPrompt.includes("degree")) {
    variants.push(`degree=${answer}`, `degree = ${answer}`, `deg=${answer}`);
    const vertex = prompt.match(/degree of ([A-Z])/);
    if (vertex) variants.push(`deg(${vertex[1]})=${answer}`);
  } else if (lowerPrompt.includes("vertices")) {
    variants.push(`${answer} vertices`, `vertices=${answer}`, `vertices = ${answer}`);
  } else if (lowerPrompt.includes("edge")) {
    variants.push(`${answer} edges`, `edges=${answer}`, `edges = ${answer}`);
  } else if (lowerPrompt.includes("weight")) {
    variants.push(`${answer} units`, `total=${answer}`, `total = ${answer}`, `weight=${answer}`);
  } else if (lowerPrompt.includes("total")) {
    variants.push(`${answer} units`, `total=${answer}`, `total = ${answer}`);
  }

  return variants.slice(0, 4);
}

function networkFeedback(prompt: string, latex: string, answer: string): string {
  const context = `${prompt} ${latex}`.toLowerCase();

  if (context.includes("degree")) {
    return `The degree of a vertex is the number of edges meeting at that vertex, not the number of vertices in the whole network. Count only the edges touching the named vertex to get ${answer}.`;
  }

  if (context.includes("vertices") || context.includes("vertex")) {
    return `Vertices are the points or nodes in the network, such as places or tasks. Count each named point once, even if it appears in more than one edge, to get ${answer}.`;
  }

  if (context.includes("edge") || context.includes("connection")) {
    return `Edges are the direct connections between vertices. Count each listed connection once, rather than counting both directions separately, to get ${answer}.`;
  }

  if (
    context.includes("shortest") ||
    context.includes("path") ||
    context.includes("route")
  ) {
    if (context.includes("yes or no") || context.includes("10 vertices") || context.includes("9-vertex")) {
      return `This is checking the size condition for a shortest-path question. Compare the number of vertices with the stated limit to get ${answer}.`;
    }

    return `For a shortest path, add the weights along each sensible route and compare the totals. The route with the smallest total gives ${answer}.`;
  }

  if (
    context.includes("mst") ||
    context.includes("minimum spanning") ||
    context.includes("spanning tree") ||
    context.includes("selected weights") ||
    context.includes("connector")
  ) {
    return `A minimum spanning tree connects every required vertex without making a loop. Add only the selected edge weights to find the total ${answer}.`;
  }

  if (context.includes("tree")) {
    if (context.includes("edges")) {
      return `A tree is connected and has no cycles, so its edge count is one less than its vertex count. Use edges = vertices - 1 to get ${answer}.`;
    }

    return `For a tree, use the connected-with-no-cycles idea. The relationship between vertices and edges gives ${answer}.`;
  }

  if (context.includes("weight") || context.includes("total") || context.includes("add")) {
    return `A route or connector total is found by adding the relevant edge weights once each. Keep the route order clear so no edge is missed or counted twice; the total is ${answer}.`;
  }

  if (
    context.includes("euler") ||
    context.includes("odd degree") ||
    context.includes("odd vertices") ||
    context.includes("chinese postman")
  ) {
    return `The key to Euler paths and circuits is counting odd-degree vertices: 0 odd-degree vertices means an Euler circuit exists; exactly 2 means an Euler path exists; 4 or more means neither exists. The answer is ${answer}.`;
  }

  if (
    context.includes("bridge") ||
    context.includes("redundan") ||
    context.includes("disconnect")
  ) {
    return `A bridge is an edge whose removal disconnects the network — some vertices can no longer be reached. To check, remove the edge and test whether all remaining vertices stay connected. The answer is ${answer}.`;
  }

  return `First decide which network idea is being tested: degree, vertices, edges, route total, shortest path, spanning tree, Euler conditions, or bridges. Use that definition carefully to get ${answer}.`;
}

function shortAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    ...baseShortAnswer(id, prompt, latex, answer, [
      ...acceptedAnswers,
      ...networkAnswerVariants(prompt, answer),
    ]),
    explanation: networkFeedback(prompt, latex, answer),
  };
}

const schoolMapDiagram: NetworkDiagram = {
  description:
    "Undirected school network with vertices Library, Canteen, Gym, and Office. Edges: Library-Canteen, Library-Gym, Canteen-Office.",
  vertices: [
    { id: "L", label: "L", x: 90, y: 150 },
    { id: "C", label: "C", x: 230, y: 80 },
    { id: "G", label: "G", x: 230, y: 220 },
    { id: "O", label: "O", x: 340, y: 80 },
  ],
  edges: [
    { from: "L", to: "C" },
    { from: "L", to: "G" },
    { from: "C", to: "O" },
  ],
};

const degreeStarDiagram: NetworkDiagram = {
  description:
    "Undirected network with vertices A, B, C, and D. Edges: A-B, A-C, and A-D.",
  vertices: [
    { id: "A", label: "A", x: 200, y: 150 },
    { id: "B", label: "B", x: 90, y: 80 },
    { id: "C", label: "C", x: 90, y: 220 },
    { id: "D", label: "D", x: 320, y: 150 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "A", to: "C" },
    { from: "A", to: "D" },
  ],
};

const directedDeliveryDiagram: NetworkDiagram = {
  description:
    "Directed delivery network with vertices Depot, Shop, Office, and Home. Arrows go from Depot to Shop, Depot to Office, and Shop to Home.",
  vertices: [
    { id: "D", label: "D", x: 80, y: 150 },
    { id: "S", label: "S", x: 200, y: 80 },
    { id: "O", label: "O", x: 200, y: 220 },
    { id: "H", label: "H", x: 330, y: 80 },
  ],
  edges: [
    { from: "D", to: "S", directed: true },
    { from: "D", to: "O", directed: true },
    { from: "S", to: "H", directed: true },
  ],
};

const weightedTriangleDiagram: NetworkDiagram = {
  description:
    "Undirected weighted network with vertices A, B, and C. Edges: A-B weight 5, A-C weight 7, and B-C weight 6.",
  vertices: [
    { id: "A", label: "A", x: 100, y: 190 },
    { id: "B", label: "B", x: 210, y: 80 },
    { id: "C", label: "C", x: 320, y: 190 },
  ],
  edges: [
    { from: "A", to: "B", weight: 5 },
    { from: "A", to: "C", weight: 7 },
    { from: "B", to: "C", weight: 6 },
  ],
};

const circuitDiagram: NetworkDiagram = {
  description:
    "Undirected triangle network with vertices A, B, and C. Edges: A-B, B-C, and C-A.",
  vertices: [
    { id: "A", label: "A", x: 200, y: 70 },
    { id: "B", label: "B", x: 90, y: 220 },
    { id: "C", label: "C", x: 310, y: 220 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "B", to: "C" },
    { from: "C", to: "A" },
  ],
};

const pathLineDiagram: NetworkDiagram = {
  description:
    "Undirected path network with vertices A, B, and C. Edges: A-B and B-C.",
  vertices: [
    { id: "A", label: "A", x: 90, y: 150 },
    { id: "B", label: "B", x: 200, y: 150 },
    { id: "C", label: "C", x: 310, y: 150 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "B", to: "C" },
  ],
};

const shortestPathDiagram: NetworkDiagram = {
  description:
    "Undirected weighted graph with vertices A, B, C, D. Edges: A-B weight 4, A-C weight 2, C-B weight 1, B-D weight 5, C-D weight 7.",
  vertices: [
    { id: "A", label: "A", x: 80, y: 150 },
    { id: "B", label: "B", x: 200, y: 70 },
    { id: "C", label: "C", x: 200, y: 230 },
    { id: "D", label: "D", x: 320, y: 150 },
  ],
  edges: [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "C", to: "B", weight: 1 },
    { from: "B", to: "D", weight: 5 },
    { from: "C", to: "D", weight: 7 },
  ],
};

const solvedShortestPathDiagram: NetworkDiagram = {
  ...shortestPathDiagram,
  highlightedEdges: [
    ["A", "C"],
    ["C", "B"],
    ["B", "D"],
  ],
};

const treeLineDiagram: NetworkDiagram = {
  description:
    "Undirected tree with vertices A, B, C, and D. Edges: A-B, B-C, and C-D.",
  vertices: [
    { id: "A", label: "A", x: 70, y: 150 },
    { id: "B", label: "B", x: 170, y: 150 },
    { id: "C", label: "C", x: 270, y: 150 },
    { id: "D", label: "D", x: 370, y: 150 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "B", to: "C" },
    { from: "C", to: "D" },
  ],
};

const mstDiagram: NetworkDiagram = {
  description:
    "Undirected weighted graph with vertices A, B, C, D. Edges: A-B weight 2, A-C weight 5, B-C weight 3, B-D weight 4, C-D weight 6.",
  vertices: [
    { id: "A", label: "A", x: 80, y: 90 },
    { id: "B", label: "B", x: 200, y: 90 },
    { id: "C", label: "C", x: 140, y: 220 },
    { id: "D", label: "D", x: 320, y: 160 },
  ],
  edges: [
    { from: "A", to: "B", weight: 2 },
    { from: "A", to: "C", weight: 5 },
    { from: "B", to: "C", weight: 3 },
    { from: "B", to: "D", weight: 4 },
    { from: "C", to: "D", weight: 6 },
  ],
};

const appShortestDiagram: NetworkDiagram = {
  description:
    "Undirected weighted route network with vertices Depot, A, B, and Shop. Edges: Depot-A weight 4, A-Shop weight 3, Depot-B weight 6, B-Shop weight 5.",
  vertices: [
    { id: "D", label: "D", x: 70, y: 150 },
    { id: "A", label: "A", x: 190, y: 80 },
    { id: "B", label: "B", x: 190, y: 220 },
    { id: "S", label: "S", x: 330, y: 150 },
  ],
  edges: [
    { from: "D", to: "A", weight: 4 },
    { from: "A", to: "S", weight: 3 },
    { from: "D", to: "B", weight: 6 },
    { from: "B", to: "S", weight: 5 },
  ],
};

const appMstDiagram: NetworkDiagram = {
  description:
    "Undirected weighted connector network with vertices P, Q, R, and S. Edges: P-Q weight 2, Q-R weight 4, R-S weight 9, P-R weight 7, Q-S weight 6.",
  vertices: [
    { id: "P", label: "P", x: 90, y: 100 },
    { id: "Q", label: "Q", x: 220, y: 80 },
    { id: "R", label: "R", x: 150, y: 220 },
    { id: "S", label: "S", x: 320, y: 200 },
  ],
  edges: [
    { from: "P", to: "Q", weight: 2 },
    { from: "Q", to: "R", weight: 4 },
    { from: "R", to: "S", weight: 9 },
    { from: "P", to: "R", weight: 7 },
    { from: "Q", to: "S", weight: 6 },
  ],
};

const solvedMstDiagram: NetworkDiagram = {
  ...mstDiagram,
  highlightedEdges: [
    ["A", "B"],
    ["B", "C"],
    ["B", "D"],
  ],
};

const kruskalCycleDiagram: NetworkDiagram = {
  description:
    "Undirected graph with vertices A, B, C. Edges A-B and B-C are already selected. The next lowest edge under consideration is A-C.",
  vertices: [
    { id: "A", label: "A", x: 120, y: 80 },
    { id: "B", label: "B", x: 260, y: 80 },
    { id: "C", label: "C", x: 190, y: 220 },
  ],
  edges: [
    { from: "A", to: "B", weight: 2 },
    { from: "B", to: "C", weight: 3 },
    { from: "A", to: "C", weight: 4, dashed: true },
  ],
};

const eulerSquareDiagram: NetworkDiagram = {
  description:
    "Undirected square network with vertices A, B, C, D. Edges: A-B, B-C, C-D, D-A. All vertices have degree 2 (even).",
  vertices: [
    { id: "A", label: "A", x: 90, y: 150 },
    { id: "B", label: "B", x: 230, y: 80 },
    { id: "C", label: "C", x: 370, y: 150 },
    { id: "D", label: "D", x: 230, y: 220 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "B", to: "C" },
    { from: "C", to: "D" },
    { from: "D", to: "A" },
  ],
};

const eulerTwoOddDiagram: NetworkDiagram = {
  description:
    "Undirected network with vertices A, B, C, D. Edges: A-B, B-C, C-D, D-A, A-C. Degrees: A=3, B=2, C=3, D=2. Two odd-degree vertices: A and C.",
  vertices: [
    { id: "A", label: "A", x: 90, y: 150 },
    { id: "B", label: "B", x: 230, y: 80 },
    { id: "C", label: "C", x: 370, y: 150 },
    { id: "D", label: "D", x: 230, y: 220 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "B", to: "C" },
    { from: "C", to: "D" },
    { from: "D", to: "A" },
    { from: "A", to: "C" },
  ],
};

const eulerStarDiagram: NetworkDiagram = {
  description:
    "Star network with central vertex X and four leaf vertices A, B, C, D. Edges: X-A, X-B, X-C, X-D. X has degree 4 (even); A, B, C, D each have degree 1 (odd). Four odd-degree vertices.",
  vertices: [
    { id: "X", label: "X", x: 220, y: 150 },
    { id: "A", label: "A", x: 110, y: 80 },
    { id: "B", label: "B", x: 330, y: 80 },
    { id: "C", label: "C", x: 330, y: 220 },
    { id: "D", label: "D", x: 110, y: 220 },
  ],
  edges: [
    { from: "X", to: "A" },
    { from: "X", to: "B" },
    { from: "X", to: "C" },
    { from: "X", to: "D" },
  ],
};

const weightedFiveEdgeDiagram: NetworkDiagram = {
  description:
    "Undirected weighted network with vertices A, B, C, D. Edges: A-B weight 3, A-C weight 6, B-C weight 2, B-D weight 5, C-D weight 4.",
  vertices: [
    { id: "A", label: "A", x: 80, y: 150 },
    { id: "B", label: "B", x: 220, y: 80 },
    { id: "C", label: "C", x: 220, y: 220 },
    { id: "D", label: "D", x: 360, y: 150 },
  ],
  edges: [
    { from: "A", to: "B", weight: 3 },
    { from: "A", to: "C", weight: 6 },
    { from: "B", to: "C", weight: 2 },
    { from: "B", to: "D", weight: 5 },
    { from: "C", to: "D", weight: 4 },
  ],
};

const weightedDeliveryDiagram: NetworkDiagram = {
  description:
    "Undirected weighted delivery network with vertices P (Depot), A, B, and Q (Warehouse). Edges: P-A weight 5, A-Q weight 3, P-B weight 8, B-Q weight 4, A-B weight 6.",
  vertices: [
    { id: "P", label: "P", x: 80, y: 150 },
    { id: "A", label: "A", x: 210, y: 80 },
    { id: "B", label: "B", x: 210, y: 220 },
    { id: "Q", label: "Q", x: 360, y: 150 },
  ],
  edges: [
    { from: "P", to: "A", weight: 5 },
    { from: "A", to: "Q", weight: 3 },
    { from: "P", to: "B", weight: 8 },
    { from: "B", to: "Q", weight: 4 },
    { from: "A", to: "B", weight: 6 },
  ],
};

const chainBridgeDiagram: NetworkDiagram = {
  description:
    "Undirected chain network with vertices A, B, C, D. Edges: A-B, B-C, C-D. Every edge is a bridge — removing any one disconnects the network.",
  vertices: [
    { id: "A", label: "A", x: 80, y: 150 },
    { id: "B", label: "B", x: 190, y: 150 },
    { id: "C", label: "C", x: 300, y: 150 },
    { id: "D", label: "D", x: 410, y: 150 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "B", to: "C" },
    { from: "C", to: "D" },
  ],
};

const trianglePendantDiagram: NetworkDiagram = {
  description:
    "Undirected network with a triangle of vertices A, B, C and a pendant vertex D attached to C. Edges: A-B, B-C, C-A, C-D. The triangle edges are not bridges; C-D is the only bridge.",
  vertices: [
    { id: "A", label: "A", x: 150, y: 80 },
    { id: "B", label: "B", x: 80, y: 220 },
    { id: "C", label: "C", x: 280, y: 220 },
    { id: "D", label: "D", x: 380, y: 220 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "B", to: "C" },
    { from: "C", to: "A" },
    { from: "C", to: "D" },
  ],
};

const cyclePendantDiagram: NetworkDiagram = {
  description:
    "Undirected network with vertices A, B, C, D, E. Edges: A-B, B-C, C-D, D-E, E-B. Vertex A is a pendant (degree 1). Edge A-B is the only bridge; edges B-C, C-D, D-E, E-B form a cycle with no bridges.",
  vertices: [
    { id: "A", label: "A", x: 80, y: 150 },
    { id: "B", label: "B", x: 200, y: 150 },
    { id: "C", label: "C", x: 280, y: 80 },
    { id: "D", label: "D", x: 380, y: 150 },
    { id: "E", label: "E", x: 280, y: 220 },
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "B", to: "C" },
    { from: "C", to: "D" },
    { from: "D", to: "E" },
    { from: "E", to: "B" },
  ],
};

function networkWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "network-diagrams-terminology") {
    return [
      {
        title: "Identifying vertices, edges, and degrees",
        questionLatex:
          "\\text{School map edges: Library-Canteen, Library-Gym, Canteen-Office.}",
        diagram: schoolMapDiagram,
        steps: [
          {
            explanation:
              "The vertices are the places named in the edge list: Library, Canteen, Gym, and Office.",
            latex: "V=\\{L,C,G,O\\}",
          },
          {
            explanation:
              "There are three edges because three direct connections are listed.",
            latex: "E=3",
          },
          {
            explanation:
              "Library touches two edges, so its degree is 2.",
            latex: "\\deg(L)=2",
          },
        ],
        finalAnswerLatex:
          "\\text{4 vertices, 3 edges, and degree of Library }=2",
      },
      {
        title: "Constructing a weighted network from a table",
        questionLatex:
          "\\begin{array}{c|c} \\text{Connection} & \\text{Time} \\\\ A-B&4 \\\\ A-C&6 \\\\ B-D&5 \\end{array}",
        diagram: {
          description:
            "Undirected weighted network with vertices A, B, C, and D. Edges: A-B weight 4, A-C weight 6, and B-D weight 5.",
          vertices: [
            { id: "A", label: "A", x: 90, y: 150 },
            { id: "B", label: "B", x: 210, y: 80 },
            { id: "C", label: "C", x: 210, y: 220 },
            { id: "D", label: "D", x: 330, y: 80 },
          ],
          edges: [
            { from: "A", to: "B", weight: 4 },
            { from: "A", to: "C", weight: 6 },
            { from: "B", to: "D", weight: 5 },
          ],
        },
        steps: [
          {
            explanation:
              "Make one vertex for each location: A, B, C, and D.",
          },
          {
            explanation:
              "Draw only the listed connections: AB, AC, and BD.",
          },
          {
            explanation:
              "Write the travel time on each edge because the network is weighted.",
          },
        ],
        finalAnswerLatex:
          "\\text{Weighted edges } AB=4,\\ AC=6,\\ BD=5",
      },
      {
        title: "Interpreting directed and weighted edges",
        questionLatex:
          "\\text{Delivery edge Depot }\\rightarrow\\text{ Shop has weight }12.",
        steps: [
          {
            explanation:
              "The arrow means the connection is directed, so the movement is from Depot to Shop.",
          },
          {
            explanation:
              "The weight 12 could represent minutes, kilometres, or dollars depending on the context.",
          },
        ],
        finalAnswerLatex:
          "\\text{A one-way weighted connection from Depot to Shop}",
      },
    ];
  }

  if (slug === "paths-trails-circuits-connectivity") {
    return [
      {
        title: "Classifying a route",
        questionLatex:
          "\\text{Route around school: A-B-C-A}",
        diagram: circuitDiagram,
        steps: [
          {
            explanation:
              "The route follows connected vertices, so it is a path-like route through the network.",
          },
          {
            explanation:
              "It starts and ends at A, so it is a circuit.",
            latex: "\\text{start}=\\text{finish}=A",
          },
        ],
        finalAnswerLatex: "\\text{Circuit}",
      },
      {
        title: "Finding a shortest path",
        questionLatex:
          "\\text{Roads: } AB=4,\\ AC=2,\\ CB=1,\\ BD=5,\\ CD=7",
        diagram: solvedShortestPathDiagram,
        steps: [
          {
            explanation:
              "Compare sensible routes from A to D.",
            latex: "A-B-D=4+5=9",
          },
          {
            explanation:
              "The route through C then B is shorter.",
            latex: "A-C-B-D=2+1+5=8",
          },
        ],
        finalAnswerLatex: "\\text{Shortest path } A-C-B-D \\text{ has weight }8",
      },
      {
        title: "Shortest path is not always the best path",
        questionLatex:
          "\\text{Route A is 8 km with tolls. Route B is 10 km with no tolls and safer crossings.}",
        steps: [
          {
            explanation:
              "The shortest path minimises distance only.",
          },
          {
            explanation:
              "A practical decision may also consider cost, safety, traffic, or reliability.",
          },
        ],
        finalAnswerLatex:
          "\\text{The longer route may be better in context.}",
      },
    ];
  }

  if (slug === "trees-minimum-spanning-trees") {
    return [
      {
        title: "Recognising a tree",
        questionLatex:
          "\\text{Network edges: AB, BC, CD. Vertices: A, B, C, D.}",
        diagram: treeLineDiagram,
        steps: [
          {
            explanation:
              "The network is connected because every vertex can be reached.",
          },
          {
            explanation:
              "It has no cycle, and a tree with 4 vertices has 3 edges.",
            latex: "n-1=4-1=3",
          },
        ],
        finalAnswerLatex: "\\text{This network is a tree.}",
      },
      {
        title: "Building an MST using Kruskal's method",
        questionLatex:
          "\\text{Edges: } AB=2,\\ AC=5,\\ BC=3,\\ BD=4,\\ CD=6",
        diagram: solvedMstDiagram,
        steps: [
          {
            explanation:
              "List edges from smallest to largest: AB, BC, BD, AC, CD.",
          },
          {
            explanation:
              "Choose AB=2, then BC=3, then BD=4. These connect all four vertices without a cycle.",
            latex: "2+3+4=9",
          },
        ],
        finalAnswerLatex:
          "\\text{MST edges } AB,BC,BD \\text{ with total weight }9",
      },
      {
        title: "Interpreting a minimal connector",
        questionLatex:
          "\\text{A school connects buildings with cable using MST total }38\\text{ m.}",
        steps: [
          {
            explanation:
              "A minimum spanning tree connects all required buildings.",
          },
          {
            explanation:
              "The total weight is the least cable length for the network model.",
          },
        ],
        finalAnswerLatex:
          "\\text{The lowest cable length is }38\\text{ m.}",
      },
    ];
  }

  if (slug === "euler-paths-circuits") {
    return [
      {
        title: "Checking the Euler condition",
        questionLatex:
          "\\text{Network: edges A-B, B-C, C-D, D-A. Count degrees and determine what exists.}",
        diagram: eulerSquareDiagram,
        steps: [
          {
            explanation: "Count the edges at each vertex.",
            latex:
              "\\deg(A)=2,\\quad\\deg(B)=2,\\quad\\deg(C)=2,\\quad\\deg(D)=2",
          },
          {
            explanation: "All four degrees are even, so there are 0 odd-degree vertices.",
            latex: "\\text{odd-degree vertices}=0",
          },
          {
            explanation: "With 0 odd-degree vertices, an Euler circuit exists: every edge is visited exactly once and the route returns to the start.",
            latex: "0\\text{ odd} \\Rightarrow \\text{Euler circuit exists}",
          },
        ],
        finalAnswerLatex: "\\text{Euler circuit exists. Sample route: A-B-C-D-A.}",
      },
      {
        title: "Euler path with two odd-degree vertices",
        questionLatex:
          "\\text{Network: edges A-B, B-C, C-D, D-A, A-C. Find odd-degree vertices.}",
        diagram: eulerTwoOddDiagram,
        steps: [
          {
            explanation:
              "Count degrees: A connects to B, D, C (degree 3); B connects to A, C (degree 2); C connects to B, D, A (degree 3); D connects to C, A (degree 2).",
            latex: "\\deg(A)=3,\\;\\deg(B)=2,\\;\\deg(C)=3,\\;\\deg(D)=2",
          },
          {
            explanation: "Vertices A and C have odd degree. That is exactly 2 odd-degree vertices.",
            latex: "\\text{odd-degree vertices}=2",
          },
          {
            explanation:
              "With exactly 2 odd-degree vertices, an Euler path exists. It must start at one odd vertex and finish at the other.",
            latex: "2\\text{ odd} \\Rightarrow \\text{Euler path from A to C}",
          },
        ],
        finalAnswerLatex:
          "\\text{Euler path exists: start at A, finish at C (or vice versa).}",
      },
      {
        title: "Chinese Postman concept",
        questionLatex:
          "\\text{A street inspector must travel every road at least once and return to base. When can they avoid repeating any road?}",
        steps: [
          {
            explanation:
              "If every vertex in the street network has even degree, an Euler circuit exists.",
            latex: "\\text{all even degrees} \\Rightarrow \\text{Euler circuit}",
          },
          {
            explanation:
              "The inspector can cover every street exactly once and return to base, with no repeated roads.",
          },
          {
            explanation:
              "If there are odd-degree vertices, some roads must be repeated. The Chinese Postman problem finds the minimum extra distance required to make all vertices even.",
          },
        ],
        finalAnswerLatex:
          "\\text{All even degrees} \\Rightarrow \\text{cover every street once with no repeats.}",
      },
    ];
  }

  if (slug === "weighted-networks-shortest-paths") {
    return [
      {
        title: "Systematic route comparison",
        questionLatex:
          "\\text{Edges: A-B=3, A-C=6, B-C=2, B-D=5, C-D=4. Find the shortest path from A to D.}",
        diagram: weightedFiveEdgeDiagram,
        steps: [
          {
            explanation: "List all sensible routes from A to D and calculate each total.",
            latex: "A\\text{-}B\\text{-}D = 3+5=8",
          },
          {
            explanation: "Second route via C then D.",
            latex: "A\\text{-}C\\text{-}D = 6+4=10",
          },
          {
            explanation: "Third route via B then C.",
            latex: "A\\text{-}B\\text{-}C\\text{-}D = 3+2+4=9",
          },
          {
            explanation: "The smallest total is 8, via route A-B-D.",
            latex: "\\min(8,10,9)=8",
          },
        ],
        finalAnswerLatex:
          "\\text{Shortest path: A-B-D with total weight }8.",
      },
      {
        title: "Delivery route optimisation",
        questionLatex:
          "\\text{P-A=5, A-Q=3, P-B=8, B-Q=4, A-B=6. Find the quickest route from P to Q.}",
        diagram: weightedDeliveryDiagram,
        steps: [
          {
            explanation: "Route via A:",
            latex: "P\\text{-}A\\text{-}Q = 5+3=8",
          },
          {
            explanation: "Route via B:",
            latex: "P\\text{-}B\\text{-}Q = 8+4=12",
          },
          {
            explanation: "Route via A then B:",
            latex: "P\\text{-}A\\text{-}B\\text{-}Q = 5+6+4=15",
          },
          {
            explanation: "The minimum total is 8 via route P-A-Q.",
            latex: "\\min(8,12,15)=8",
          },
        ],
        finalAnswerLatex:
          "\\text{Shortest route: P-A-Q with total weight }8.",
      },
    ];
  }

  if (slug === "network-flow-connectivity") {
    return [
      {
        title: "Identifying bridges in a chain",
        questionLatex:
          "\\text{Network: chain A-B-C-D. Which edges are bridges?}",
        diagram: chainBridgeDiagram,
        steps: [
          {
            explanation:
              "Remove edge A-B. Can A still reach B, C, or D? No — A is now isolated.",
            latex: "\\text{remove A-B} \\Rightarrow A \\text{ disconnected}",
          },
          {
            explanation:
              "In a chain there is no alternative path around any edge, so every edge is a bridge.",
            latex: "\\text{chain} \\Rightarrow \\text{every edge is a bridge}",
          },
          {
            explanation:
              "Three edges A-B, B-C, C-D are all bridges.",
            latex: "\\text{bridge count}=3",
          },
        ],
        finalAnswerLatex:
          "\\text{All 3 edges — A-B, B-C, C-D — are bridges.}",
      },
      {
        title: "Bridge in a triangle-plus-pendant",
        questionLatex:
          "\\text{Network: triangle A-B-C-A plus pendant C-D. How many bridges?}",
        diagram: trianglePendantDiagram,
        steps: [
          {
            explanation:
              "Remove edge C-D. Can D reach anything? No — D is isolated. So C-D is a bridge.",
            latex: "\\text{remove C-D} \\Rightarrow D \\text{ disconnected}",
          },
          {
            explanation:
              "Remove edge A-B. Can A still reach B? Yes: A-C-B. The network stays connected — A-B is not a bridge.",
            latex: "\\text{remove A-B} \\Rightarrow \\text{still connected via C}",
          },
          {
            explanation:
              "The triangle edges are not bridges (alternative paths exist); only C-D is a bridge.",
            latex: "\\text{bridge count}=1",
          },
        ],
        finalAnswerLatex:
          "\\text{There is exactly 1 bridge: edge C-D.}",
      },
    ];
  }

  return [
    {
      title: `${title}: choosing the right network method`,
      questionLatex:
        "\\text{A town map has roads with distances and one-way restrictions.}",
      diagram: {
        description:
          "Directed weighted town road network with vertices P, Q, R, and S. Arrows: P to Q weight 5, P to R weight 7, Q to S weight 4, R to S weight 3.",
        vertices: [
          { id: "P", label: "P", x: 80, y: 150 },
          { id: "Q", label: "Q", x: 200, y: 80 },
          { id: "R", label: "R", x: 200, y: 220 },
          { id: "S", label: "S", x: 320, y: 150 },
        ],
        edges: [
          { from: "P", to: "Q", weight: 5, directed: true },
          { from: "P", to: "R", weight: 7, directed: true },
          { from: "Q", to: "S", weight: 4, directed: true },
          { from: "R", to: "S", weight: 3, directed: true },
        ],
      },
      steps: [
        {
          explanation:
            "Use directed edges for one-way roads and weighted edges for distances.",
        },
        {
          explanation:
            "If the question asks for one route, use shortest path. If it asks to connect all locations, use an MST.",
          latex:
            "\\text{route} \\rightarrow \\text{shortest path},\\quad \\text{connect all} \\rightarrow \\text{MST}",
        },
      ],
      finalAnswerLatex: "\\text{Choose the method from the practical goal.}",
    },
    {
      title: `${title}: practical shortest path decision`,
      questionLatex:
        "\\text{Route P is 11 min. Route Q is 13 min but avoids a dangerous crossing.}",
      steps: [
        {
          explanation:
            "The mathematical shortest path is P because it has the smaller time.",
        },
        {
          explanation:
            "The best practical route could be Q if safety is more important than two minutes.",
        },
      ],
      finalAnswerLatex:
        "\\text{Shortest is P; best practical route may be Q.}",
    },
  ];
}



export function year11StandardNetworksLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-standard" ||
    unit.slug !== "networks-paths-trees"
  ) {
    return null;
  }

  const base = {
    workedExamples: networkWorkedExamples(lesson.slug, lesson.title),
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "network-diagrams-terminology") {
    return {
      ...base,
      description:
        "Use vertices, edges, degree, directed networks and weighted edges to construct and interpret practical network diagrams.",
      learningIntention:
        "Describe networks as vertices connected by edges, and interpret directed or weighted connections in practical contexts.",
      successCriteria: [
        "Define network, vertex, edge, degree, directed network, and weighted edge.",
        "Count vertices, edges, and the degree of a vertex from an edge list.",
        "Construct a network from a small table or map description.",
        "Interpret directed and weighted edges in real-world contexts.",
      ],
      teaching: {
        paragraphs: [
          "A network is a set of vertices connected by edges. In a practical problem, vertices might be buildings, towns, delivery stops, or tasks.",
          "Digital questions use edge lists, tables and text-described networks. For drawn network diagrams, students should also practise with worksheet or paper diagrams.",
          "An edge shows a direct connection between two vertices. The degree of a vertex is the number of edges joined to that vertex.",
          "A directed network uses arrows to show direction, such as one-way roads or task order. A weighted edge has a number attached, such as distance, time, cost, or cable length.",
          "To construct a network from a table or map, list every location as a vertex, draw exactly the listed connections as edges, add arrows for one-way connections, and add weights when values are given.",
        ],
        latexBlocks: [
          "\\deg(v)=\\text{number of edges joined to vertex }v",
          "\\text{weighted edge: } A \\xleftrightarrow{\\ 7\\ } B,\\quad \\text{directed edge: } A\\rightarrow B",
        ],
      },
      guidedPractice: [
        {
          ...shortAnswer("net-term-g1", "Use the displayed network to find the degree of A.", "AB,\\ AC,\\ AD", "3"),
          diagram: degreeStarDiagram,
        },
        labelledChoice("net-term-g2", "Which statement best describes a weighted edge?", "A", ["An edge with a number such as distance, time, or cost", "A vertex with exactly two edges", "A network with no vertices", "A route that returns to the start"], "A weighted edge carries a numerical value."),
        labelledChoice("net-term-g3", "A map of one-way delivery streets should be represented by which network?", "B", ["Undirected network", "Directed network", "Unweighted tree only", "Box plot"], "One-way streets need arrows, so the network is directed."),
        labelledChoice("net-term-g4", "A table lists AB=5, AC=7, and CD=4. Which description matches it?", "C", ["Edges AB and CD only", "Vertices A and B only", "Weighted edges AB, AC, and CD", "A directed circuit A-B-C-D-A"], "The table gives three weighted edges."),
      ],
      independentPractice: [
        shortAnswer("net-term-i1", "A vertex is joined to five edges. What is its degree?", "\\deg(v)=?", "5"),
        shortAnswer("net-term-i2", "Connections AB, BC, CD, and DA are listed. How many edges are listed?", "AB,BC,CD,DA", "4"),
        shortAnswer("net-term-i3", "Connections AB, BC, CD, and DA use vertices A, B, C, D. How many vertices are named?", "A,B,C,D", "4"),
        {
          ...labelledChoice("net-term-i4", "In the weighted route diagram, what do the numbers on the connections represent?", "C", ["Vertex labels", "Directions only", "Edge weights", "Degrees"], "Travel time is a weight on an edge."),
          diagram: weightedTriangleDiagram,
        },
        labelledChoice("net-term-i5", "Which context is a realistic use of a network?", "D", ["Spelling a word", "Naming a colour", "Writing a paragraph", "Planning roads between towns"], "Roads between towns can be modelled using vertices and edges."),
      ],
      commonMistakes: [
        { mistake: "In a star diagram where A joins B, C, and D, counting 4 (the number of vertices) as the degree of A.", fix: "Degree counts only the edges attached to that one vertex: three edges means degree 3." },
        { mistake: "Drawing a delivery route from Depot to Shop as an undirected line when the route is one-way.", fix: "Add an arrowhead in the correct direction of travel for every one-way connection." },
        { mistake: "Drawing edges A-B=4, A-C=6, B-D=5 but leaving the weight numbers off.", fix: "Write the weight beside each edge as soon as it is drawn." },
        { mistake: "Adding a connection between two nearby vertices that is not listed in the table or map.", fix: "Only draw edges that are explicitly listed — proximity does not mean a direct connection." },
      ],
      masteryQuiz: [
        {
          ...shortAnswer("net-term-m1", "Use the displayed network to find the degree of A.", "AB,\\ AC", "2"),
          diagram: {
            description:
              "Undirected network with vertices A, B, and C. Edges: A-B and A-C.",
            vertices: [
              { id: "A", label: "A", x: 200, y: 150 },
              { id: "B", label: "B", x: 90, y: 90 },
              { id: "C", label: "C", x: 90, y: 210 },
            ],
            edges: [
              { from: "A", to: "B" },
              { from: "A", to: "C" },
            ],
          },
        },
        labelledChoice("net-term-m2", "In a network, a vertex is:", "A", ["A point such as a town or building", "A number on a connection", "A route returning to the start", "A repeated edge"], "A vertex is a point in the network."),
        {
          ...labelledChoice("net-term-m3", "Which network type is shown by the arrows in the delivery diagram?", "B", ["Weighted", "Directed", "Undirected only", "Disconnected"], "Directed networks use arrows."),
          diagram: directedDeliveryDiagram,
        },
        shortAnswer("net-term-m4", "A network has edges AB, BC, CA. How many edges are there?", "AB,BC,CA", "3"),
        {
          ...labelledChoice("net-term-m5", "In the displayed network, the numbers on the edges are best described as:", "C", ["Vertices", "Circuits", "Weights", "Degrees"], "A number on an edge is a weight."),
          diagram: weightedTriangleDiagram,
        },
        shortAnswer("net-term-m6", "A vertex touches 5 edges. What is its degree?", "\\deg(v)=?", "5"),
        labelledChoice("net-term-m7", "A map table gives towns and direct roads. What should the towns become?", "A", ["Vertices", "Weights", "Degrees", "Circuits"], "Locations become vertices."),
        shortAnswer("net-term-m8", "Connections AB and CD are listed. How many edges are drawn?", "AB,CD", "2"),
        labelledChoice("net-term-m9", "Which context best suits a directed network?", "D", ["Two-way walking tracks", "Undirected friendships", "A normal two-way road", "One-way traffic"], "One-way traffic needs direction."),
        labelledChoice("net-term-m10", "Table: Library-Canteen, Library-Gym. Which statement is true?", "A", ["Library has degree 2", "Gym has degree 2", "There are three edges", "The network has no vertices"], "Library touches two listed edges."),
      ],
    };
  }

  if (lesson.slug === "paths-trails-circuits-connectivity") {
    return {
      ...base,
      description:
        "Classify paths, trails and circuits, check connectivity, find shortest paths, and judge when shortest is not best.",
      learningIntention:
        "Use paths, trails, circuits, connectivity and shortest-path ideas to solve practical route problems.",
      successCriteria: [
        "Define and recognise a path, trail, circuit, and connected network.",
        "Calculate the total weight of a route.",
        "Identify a shortest path in a network with no more than 10 vertices.",
        "Choose when a longer route may be better in a practical context.",
      ],
      teaching: {
        paragraphs: [
          "A path is a route through connected vertices. A trail is a route that does not repeat an edge. A circuit starts and ends at the same vertex.",
          "Digital questions use edge lists, tables and text-described networks. For drawn network diagrams, students should also practise with worksheet or paper diagrams.",
          "A connected network has a route between every pair of vertices. If one vertex cannot be reached, the network is not connected.",
          "In a weighted network, the shortest path is the route between two vertices with the smallest total weight. For small networks, list sensible routes and add their edge weights.",
          "The mathematically shortest path is not always the best practical path. A longer route may avoid traffic, tolls, unsafe roads, steep hills, or closed areas.",
        ],
        latexBlocks: [
          "\\text{route weight}=\\text{sum of edge weights on the route}",
          "\\text{circuit: start vertex}=\\text{end vertex}",
        ],
      },
      guidedPractice: [
        {
          ...labelledChoice("net-path-g1", "In the displayed network, a route A-B-C-A starts and ends at A. What is it?", "C", ["Vertex", "Edge", "Circuit", "Weight"], "A circuit returns to its starting vertex."),
          diagram: circuitDiagram,
        },
        shortAnswer("net-path-g2", "A walking route uses edge weights 3, 4, and 5. What is the total weight?", "3+4+5", "12"),
        labelledChoice("net-path-g3", "What does connected mean?", "A", ["Every vertex can be reached from every other vertex", "Every edge has weight 1", "The network has arrows", "The network has no paths"], "Connected means all vertices are reachable."),
        labelledChoice("net-path-g4", "Why might the shortest route not be the best route?", "D", ["It always is best", "It has no vertices", "It must be a tree", "It may be slower, unsafe, or more costly in context"], "Practical constraints can matter more than distance."),
      ],
      independentPractice: [
        {
          ...labelledChoice("net-path-i1", "In the displayed network, route A-B-C does not repeat an edge. What is this route called?", "B", ["Degree", "Trail", "Weight", "Vertex"], "A trail does not repeat edges."),
          diagram: pathLineDiagram,
        },
        shortAnswer("net-path-i2", "Route A-B-C has weights AB=6 and BC=7. Find the total weight.", "6+7", "13"),
        shortAnswer("net-path-i3", "Compare paths A-B-D=9 and A-C-D=8. What is the shortest-path weight?", "\\min(9,8)", "8"),
        labelledChoice("net-path-i4", "A network has an isolated vertex. Is it connected?", "B", ["Yes", "No", "Only if weighted", "Only if directed"], "An isolated vertex cannot be reached."),
        shortAnswer("net-path-i5", "In a 9-vertex network, is a shortest path question within the no-more-than-10-vertices limit? Answer yes or no.", "9\\le 10", "yes", ["Yes", "YES"]),
      ],
      commonMistakes: [
        { mistake: "Calling route A-B-C a circuit because it visits three vertices.", fix: "A circuit must return to its starting vertex: A-B-C is a path, but A-B-C-A is a circuit." },
        { mistake: "Choosing A-B-D (2 edges) as the shorter path over A-C-B-D (3 edges) without adding weights.", fix: "Add the edge weights: A-B-D = 4+5 = 9 and A-C-B-D = 2+1+5 = 8, so A-C-B-D is shorter." },
        { mistake: "Assuming the route with the smallest distance is always the best choice.", fix: "Tolls, safety, traffic, and access restrictions can make a longer route the better practical decision." },
        { mistake: "Saying a network is connected when one vertex has no edges joining it.", fix: "Every vertex must be reachable from every other vertex for the network to be connected." },
      ],
      masteryQuiz: [
        labelledChoice("net-path-m1", "A route that starts and ends at A is a:", "C", ["Path only", "Weight", "Circuit", "Degree"], "A circuit starts and ends at the same vertex."),
        shortAnswer("net-path-m2", "Add path weights 4, 6, and 1.", "4+6+1", "11"),
        labelledChoice("net-path-m3", "A trail cannot repeat:", "B", ["Vertices", "Edges", "Weights", "Labels"], "A trail does not repeat edges."),
        labelledChoice("net-path-m4", "A connected network means:", "A", ["All vertices are reachable", "All weights are equal", "There are no edges", "It must be directed"], "Connected means every vertex can be reached."),
        {
          ...shortAnswer("net-path-m5", "Use the weighted network to find the shortest-path weight from A to D.", "AB=4,\\ AC=2,\\ CB=1,\\ BD=5,\\ CD=7", "8", ["8 units"]),
          explanation:
            "The shortest route is A-C-B-D, with total weight 2 + 1 + 5 = 8. The alternatives A-B-D and A-C-D both have total weight 9.",
          diagram: shortestPathDiagram,
        },
        labelledChoice("net-path-m6", "The shortest path may not be best because:", "D", ["It has the smallest distance", "It uses vertices", "It is drawn on paper", "Other practical factors may matter"], "Context can make a longer route better."),
        shortAnswer("net-path-m7", "A network has 10 vertices. Is this within a no-more-than-10-vertices shortest path question? Answer yes or no.", "\\text{vertices}=10", "yes", ["Yes", "YES"]),
        {
          ...labelledChoice("net-path-m8", "Use the displayed network to classify route A-B-C.", "A", ["Path", "Degree", "Weight only", "Disconnected network"], "It is a route through connected vertices."),
          diagram: pathLineDiagram,
        },
        shortAnswer("net-path-m9", "Route weights are 5 and 9. Add them.", "5+9", "14"),
        labelledChoice("net-path-m10", "A safer 12-minute route may be chosen over a 10-minute route because:", "B", ["It is mathematically shorter", "Practical safety can matter", "It has no vertices", "It must be an MST"], "A route decision can include safety, not just time."),
      ],
    };
  }

  if (lesson.slug === "trees-minimum-spanning-trees") {
    return {
      ...base,
      description:
        "Use trees, spanning trees and Kruskal's method for minimum spanning trees in minimal connector problems.",
      learningIntention:
        "Determine and interpret minimum spanning trees in weighted networks using a clear method.",
      successCriteria: [
        "Identify a tree as a connected network with no cycles.",
        "Explain that a spanning tree connects all vertices without cycles.",
        "Use Kruskal's method to choose edges in a minimum spanning tree.",
        "Interpret an MST as a minimal connector for cables, roads, or pipes.",
      ],
      teaching: {
        paragraphs: [
          "A tree is a connected network with no cycles. A tree with n vertices has n - 1 edges.",
          "Digital questions use edge lists, tables and text-described networks. For drawn network diagrams, students should also practise with worksheet or paper diagrams.",
          "A spanning tree uses all vertices from the original network and connects them without making a cycle.",
          "A minimum spanning tree, or MST, is the spanning tree with the smallest total weight.",
          "Kruskal's method finds an MST by sorting edges from smallest to largest, then choosing the next smallest edge that does not create a cycle until all vertices are connected.",
          "MSTs solve minimal connector problems, such as connecting buildings with the least cable or linking towns with the lowest total road length.",
        ],
        latexBlocks: [
          "\\text{tree with } n \\text{ vertices has } n-1 \\text{ edges}",
          "\\text{MST total}=\\text{sum of selected edge weights}",
        ],
      },
      guidedPractice: [
        {
          ...labelledChoice("net-tree-g1", "Which description matches the displayed network?", "A", ["Connected with no cycles", "Disconnected with arrows", "Only one vertex", "A route with repeated edges"], "A tree is connected and has no cycles."),
          diagram: treeLineDiagram,
        },
        shortAnswer("net-tree-g2", "A tree has 7 vertices. How many edges does it have?", "7-1", "6"),
        labelledChoice("net-tree-g3", "Using Kruskal's method on a sorted edge list, what should you choose first?", "B", ["The largest edge", "The smallest edge that is allowed", "Any edge that creates a cycle", "Only directed edges"], "Kruskal's method starts with the smallest available edge and avoids cycles."),
        shortAnswer("net-tree-g4", "Selected MST edges have weights 2, 5, and 6. Find the total.", "2+5+6", "13"),
      ],
      independentPractice: [
        shortAnswer("net-tree-i1", "A tree has 5 vertices. How many edges?", "5-1", "4"),
        {
          ...labelledChoice("net-tree-i2", "The displayed network is a spanning tree for vertices A, B, C and D because it includes:", "A", ["All vertices", "All edges", "Only directed edges", "No weights"], "A spanning tree spans all vertices."),
          diagram: treeLineDiagram,
        },
        shortAnswer("net-tree-i3", "Add MST connector weights 4, 4, 7, and 8.", "4+4+7+8", "23"),
        labelledChoice("net-tree-i4", "Which edge should be avoided when building an MST?", "D", ["A low weight edge", "An edge connecting a new vertex", "The first edge chosen", "An edge that creates a cycle"], "MST methods avoid cycles."),
        labelledChoice("net-tree-i5", "A school wants to connect all buildings with least total cable. Use:", "B", ["Shortest path", "Minimum spanning tree", "Circuit", "Degree only"], "This is a minimal connector problem."),
      ],
      commonMistakes: [
        { mistake: "Using Kruskal's method to answer a 'shortest path from A to D' question.", fix: "Shortest path finds one route between two vertices; MST connects all vertices with least total weight." },
        { mistake: "Including edge AC=4 when AB=2 and BC=3 are already selected, creating a cycle A-B-C-A.", fix: "Skip any edge that would close a cycle. Selecting AC here would create a triangle." },
        { mistake: "Stopping after selecting two edges in a four-vertex network, leaving one vertex unconnected.", fix: "A spanning tree must include every vertex: four vertices need exactly three edges." },
        { mistake: "Choosing the fewest edges without comparing their weights.", fix: "An MST minimises total weight, not the number of edges." },
      ],
      masteryQuiz: [
        {
          ...labelledChoice("net-tree-m1", "The displayed network is connected and has no cycles. What is it?", "A", ["Tree", "Circuit", "Directed edge", "Weight"], "That is the definition of a tree."),
          diagram: treeLineDiagram,
        },
        shortAnswer("net-tree-m2", "A tree has 9 vertices. How many edges?", "\\text{vertices}=9", "8"),
        labelledChoice("net-tree-m3", "A spanning tree uses:", "C", ["No vertices", "Only one edge", "All vertices", "All possible edges"], "It spans all vertices."),
        shortAnswer("net-tree-m4", "MST weights are 1, 3, 6. Find total.", "\\text{weights: }1,\\ 3,\\ 6", "10"),
        labelledChoice("net-tree-m5", "A minimum spanning tree minimises:", "B", ["Number of vertices", "Total edge weight", "Degree of A", "Number of arrows"], "MST minimises total selected weight."),
        labelledChoice("net-tree-m6", "Which situation suits an MST?", "A", ["Connecting towns with least cable", "Finding one fastest route", "Counting survey responses", "Calculating tax"], "MSTs solve minimal connector problems."),
        shortAnswer("net-tree-m7", "A tree has 4 edges. How many vertices?", "\\text{edges}=4", "5"),
        {
          ...labelledChoice("net-tree-m8", "In the Kruskal diagram, the dashed edge is the next lowest edge under consideration. What should you do?", "D", ["Choose it because it is low", "Restart the method", "Delete all previous edges", "Skip it and keep checking later edges"], "Kruskal's method skips edges that create cycles."),
          diagram: kruskalCycleDiagram,
        },
        shortAnswer("net-tree-m9", "Using Kruskal's method, choose AB=2, BC=3, and CD=4. What is the total?", "AB=2,\\ BC=3,\\ CD=4", "9"),
        labelledChoice("net-tree-m10", "A minimal connector problem asks you to:", "C", ["Return to the start", "Choose the longest path", "Connect required vertices cheaply", "Ignore weights"], "Minimal connectors connect required points at least total cost."),
      ],
    };
  }

  if (lesson.slug === "euler-paths-circuits") {
    return {
      ...base,
      description:
        "Use odd-degree vertex counts to determine whether an Euler path or Euler circuit exists, and interpret the Chinese Postman concept for route-inspection problems.",
      learningIntention:
        "Decide whether an Euler path or circuit exists by counting odd-degree vertices, and connect this to practical route-inspection problems.",
      successCriteria: [
        "Define an Euler path as a route that travels every edge exactly once.",
        "Define an Euler circuit as an Euler path that returns to the starting vertex.",
        "State the conditions: 0 odd-degree vertices → circuit, 2 odd → path, 4+ → neither.",
        "Describe the Chinese Postman problem as minimising repeated edges when covering every street.",
      ],
      teaching: {
        paragraphs: [
          "An Euler path is a route through a network that travels along every edge exactly once without repeating any edge.",
          "An Euler circuit is an Euler path that starts and finishes at the same vertex. Every vertex must be visited but each edge must be used exactly once.",
          "Whether an Euler path or circuit exists depends entirely on how many vertices have odd degree. Count the degree of each vertex, then count how many are odd.",
          "If all vertices have even degree (0 odd-degree vertices), an Euler circuit exists. If exactly 2 vertices have odd degree, an Euler path exists — starting at one odd vertex and ending at the other. If 4 or more vertices have odd degree, neither exists.",
        ],
        latexBlocks: [
          "0 \\text{ odd-degree vertices} \\Rightarrow \\text{Euler circuit exists}",
          "2 \\text{ odd-degree vertices} \\Rightarrow \\text{Euler path exists}",
          "4\\text{+ odd-degree vertices} \\Rightarrow \\text{neither exists}",
        ],
      },
      guidedPractice: [
        labelledChoice(
          "net-euler-g1",
          "An Euler circuit is a route that:",
          "B",
          ["Visits every vertex exactly once", "Travels every edge exactly once and returns to the starting vertex", "Takes the shortest path between two vertices", "Connects all vertices with minimum total weight"],
          "An Euler circuit covers every edge once and returns to the start.",
        ),
        shortAnswer("net-euler-g2", "Triangle: edges A-B, B-C, C-A. Find the degree of vertex A.", "\\deg(A)=?", "2"),
        shortAnswer("net-euler-g3", "Count the odd-degree vertices in the triangle (degrees A=2, B=2, C=2).", "\\text{how many vertices with odd degree?}", "0"),
        labelledChoice(
          "net-euler-g4",
          "The triangle has 0 odd-degree vertices. What can be concluded?",
          "A",
          ["An Euler circuit exists", "An Euler path only exists", "Neither exists", "The network is disconnected"],
          "0 odd-degree vertices means an Euler circuit exists.",
        ),
      ],
      independentPractice: [
        shortAnswer("net-euler-i1", "Network has degrees A=3, B=2, C=3, D=2. How many odd-degree vertices are there?", "\\text{odd degrees among }3,2,3,2", "2"),
        labelledChoice(
          "net-euler-i2",
          "A network has exactly 2 odd-degree vertices. What can be concluded?",
          "B",
          ["An Euler circuit exists", "An Euler path exists, starting at one odd vertex and ending at the other", "Neither an Euler path nor circuit exists", "The network is a tree"],
          "2 odd-degree vertices means an Euler path exists between the two odd vertices.",
        ),
        {
          ...shortAnswer("net-euler-i3", "Use the displayed network to count the degree of vertex X.", "\\deg(X)=?", "4"),
          diagram: eulerStarDiagram,
        },
        {
          ...shortAnswer("net-euler-i4", "Using the same star network, how many odd-degree vertices are there? (X has degree 4; A, B, C, D each have degree 1.)", "\\text{count vertices with odd degree}", "4"),
          diagram: eulerStarDiagram,
        },
        labelledChoice(
          "net-euler-i5",
          "The star network has 4 odd-degree vertices. What exists?",
          "C",
          ["Euler circuit only", "Euler path only", "Neither an Euler path nor an Euler circuit", "Both Euler path and circuit"],
          "4 or more odd-degree vertices means neither exists.",
        ),
      ],
      commonMistakes: [
        { mistake: "Saying an Euler circuit exists because a circuit can be drawn — without checking that all vertices have even degree.", fix: "Always count odd-degree vertices first. A circuit that repeats edges is not an Euler circuit." },
        { mistake: "Confusing an Euler circuit (uses every edge once) with a Hamiltonian circuit (visits every vertex once).", fix: "Euler is about edges; Hamiltonian is about vertices. Count edges per vertex (degrees) to decide the Euler condition." },
        { mistake: "Forgetting that an Euler path must start at an odd-degree vertex when exactly 2 exist.", fix: "With 2 odd-degree vertices, the Euler path must begin at one and end at the other — it cannot start at an even-degree vertex." },
        { mistake: "Counting the number of vertices in the network instead of counting how many vertices have odd degree.", fix: "Find the degree of each vertex first, then count how many of those degrees are odd numbers." },
      ],
      masteryQuiz: [
        labelledChoice(
          "net-euler-m1",
          "An Euler path is a route that:",
          "B",
          ["Visits every vertex once", "Travels every edge exactly once", "Follows the shortest route", "Connects all vertices with minimum weight"],
          "An Euler path covers every edge exactly once.",
        ),
        labelledChoice(
          "net-euler-m2",
          "An Euler circuit differs from an Euler path because:",
          "A",
          ["It returns to the starting vertex", "It visits fewer edges", "It uses directed edges only", "It avoids all odd-degree vertices"],
          "A circuit starts and ends at the same vertex.",
        ),
        shortAnswer("net-euler-m3", "Network degrees: 4, 2, 4, 2. How many odd-degree vertices?", "\\text{count odd among }4,2,4,2", "0"),
        labelledChoice(
          "net-euler-m4",
          "A network has 0 odd-degree vertices. Which exists?",
          "A",
          ["Euler circuit", "Euler path only (not circuit)", "Neither", "Cannot determine"],
          "0 odd-degree vertices guarantees an Euler circuit.",
        ),
        shortAnswer("net-euler-m5", "Network degrees: 3, 2, 4, 3. How many odd-degree vertices?", "\\text{count odd among }3,2,4,3", "2"),
        labelledChoice(
          "net-euler-m6",
          "A network has exactly 2 odd-degree vertices. An Euler path:",
          "B",
          ["Does not exist", "Exists and must start at one odd vertex and end at the other", "Exists and can start anywhere", "Requires repeating edges"],
          "The Euler path must begin and end at the two odd-degree vertices.",
        ),
        shortAnswer("net-euler-m7", "Network degrees: 1, 3, 1, 3. How many odd-degree vertices?", "\\text{count odd among }1,3,1,3", "4"),
        labelledChoice(
          "net-euler-m8",
          "A network has 4 odd-degree vertices. Which exists?",
          "C",
          ["Euler circuit", "Euler path", "Neither an Euler path nor circuit", "Both"],
          "4 or more odd-degree vertices means neither exists.",
        ),
        labelledChoice(
          "net-euler-m9",
          "The Chinese Postman problem asks:",
          "B",
          ["What is the shortest route between two vertices?", "How can every edge be covered with minimum repeated travel?", "How to connect all vertices with minimum total weight?", "How many vertices have odd degree?"],
          "The Chinese Postman finds minimum extra edges to repeat when covering all streets.",
        ),
        labelledChoice(
          "net-euler-m10",
          "A square network (all vertices degree 2) has an Euler circuit. The circuit can start at:",
          "A",
          ["Any vertex", "Only the vertex with the highest degree", "Only the two odd-degree vertices", "No vertex — no circuit exists"],
          "All even degrees mean an Euler circuit exists and can start anywhere.",
        ),
      ],
    };
  }

  if (lesson.slug === "weighted-networks-shortest-paths") {
    return {
      ...base,
      description:
        "Systematically list and compare all viable routes in weighted networks to find the shortest path, and apply this to practical delivery and cable-routing problems.",
      learningIntention:
        "Find the shortest path in a weighted network by systematically listing and comparing all viable routes.",
      successCriteria: [
        "List all sensible routes between two vertices in a small weighted network.",
        "Add the edge weights along each route to find its total.",
        "Identify the shortest path as the route with the minimum total weight.",
        "Apply shortest-path thinking to practical contexts such as delivery and cable routing.",
      ],
      teaching: {
        paragraphs: [
          "In a weighted network, each edge has a number representing distance, time, cost, or cable length. The shortest path is the route between two vertices with the smallest total weight.",
          "To find the shortest path, list every sensible route between the two vertices, add the edge weights along each route, then compare the totals.",
          "Work systematically: start from the source vertex, follow each possible first edge, then follow each possible next edge until you reach the destination. Record the route and running total before moving on.",
          "Once you have all the route totals, the shortest path is the route with the minimum. If two routes have the same minimum, either is valid.",
        ],
        latexBlocks: [
          "\\text{route total} = \\sum \\text{edge weights on that route}",
          "\\text{shortest path} = \\text{route with minimum total weight}",
        ],
      },
      guidedPractice: [
        labelledChoice(
          "net-wsp-g1",
          "To find the shortest path in a weighted network, you should:",
          "B",
          ["Choose the route with the fewest edges", "List all sensible routes, add their weights, and choose the minimum total", "Always go through the vertex with the highest degree", "Use Kruskal's method"],
          "Shortest path requires comparing total weights across all viable routes.",
        ),
        {
          ...shortAnswer("net-wsp-g2", "Using the displayed network, calculate the total weight of route A-B-D.", "AB=3,\\ BD=5", "8"),
          diagram: weightedFiveEdgeDiagram,
        },
        {
          ...shortAnswer("net-wsp-g3", "Calculate the total weight of route A-C-D.", "AC=6,\\ CD=4", "10"),
          diagram: weightedFiveEdgeDiagram,
        },
        {
          ...labelledChoice(
            "net-wsp-g4",
            "Routes from A to D have totals: A-B-D=8, A-C-D=10, A-B-C-D=9. Which is the shortest path?",
            "A",
            ["A-B-D with total weight 8", "A-C-D with total weight 10", "A-B-C-D with total weight 9", "All routes are the same length"],
            "The minimum total is 8, so A-B-D is the shortest path.",
          ),
          diagram: weightedFiveEdgeDiagram,
        },
      ],
      independentPractice: [
        {
          ...shortAnswer("net-wsp-i1", "Delivery network: route P-A-Q has weights P-A=5 and A-Q=3. Find the total.", "5+3", "8"),
          diagram: weightedDeliveryDiagram,
        },
        {
          ...shortAnswer("net-wsp-i2", "Route P-B-Q has weights P-B=8 and B-Q=4. Find the total.", "8+4", "12"),
          diagram: weightedDeliveryDiagram,
        },
        {
          ...labelledChoice(
            "net-wsp-i3",
            "Delivery routes: P-A-Q=8, P-B-Q=12, P-A-B-Q=15. Which is the shortest?",
            "A",
            ["P-A-Q with total 8", "P-B-Q with total 12", "P-A-B-Q with total 15", "All are equal"],
            "Minimum total is 8, so P-A-Q is the shortest.",
          ),
          diagram: weightedDeliveryDiagram,
        },
        labelledChoice(
          "net-wsp-i4",
          "A cable company wants to lay the least cable from Station S to Home H in a weighted network. The method is:",
          "B",
          ["Build a minimum spanning tree", "Find the shortest path from S to H", "Count the degree of each vertex", "Find an Euler circuit"],
          "A point-to-point minimum route is a shortest path problem.",
        ),
        shortAnswer("net-wsp-i5", "A route uses edge weights 4, 2, and 6. Find the total route weight.", "4+2+6", "12"),
      ],
      commonMistakes: [
        { mistake: "Choosing the route with the fewest edges instead of the one with the smallest total weight.", fix: "A longer route (more edges) can still be shorter in total weight if the individual edges are small." },
        { mistake: "Forgetting to include all viable routes in the comparison, missing the true shortest path.", fix: "Work systematically from the source vertex: list every path that reaches the destination without backtracking unnecessarily." },
        { mistake: "Confusing shortest path (one specific route) with MST (connecting all vertices).", fix: "Shortest path is for one route between two specific points. MST connects every vertex with minimum total weight across the whole network." },
        { mistake: "Adding edge weights incorrectly by missing one edge or counting an edge twice.", fix: "Write out each edge weight in the route — e.g., A-B-D: write AB=3, BD=5, then add to get 8." },
      ],
      masteryQuiz: [
        labelledChoice(
          "net-wsp-m1",
          "The shortest path in a weighted network is:",
          "B",
          ["The route with the fewest edges", "The route with the minimum total edge weight", "The route that visits every vertex", "The route that uses every edge"],
          "Shortest path minimises total weight, not edge count.",
        ),
        shortAnswer("net-wsp-m2", "A route uses weights 5, 3, and 7. Find the total.", "5+3+7", "15"),
        shortAnswer("net-wsp-m3", "Two routes: A-B-D total 8, A-C-D total 11. What is the shortest-path weight?", "\\min(8,11)", "8"),
        labelledChoice(
          "net-wsp-m4",
          "When comparing routes in a weighted network, you need to:",
          "B",
          ["Count vertices on each route", "Add the weights of all edges on each route", "Compare the number of edges only", "Select the route through the highest-weight edge"],
          "Total weight = sum of edge weights on that route.",
        ),
        {
          ...shortAnswer("net-wsp-m5", "Route A-B-D: A-B=3, B-D=5. Find the total.", "3+5", "8"),
          diagram: weightedFiveEdgeDiagram,
        },
        labelledChoice(
          "net-wsp-m6",
          "Three routes have totals 10, 7, and 13. The shortest-path weight is:",
          "B",
          ["10", "7", "13", "Cannot determine without the network"],
          "The minimum of 10, 7, 13 is 7.",
        ),
        {
          ...shortAnswer("net-wsp-m7", "Route A-B-C-D: A-B=3, B-C=2, C-D=4. Find the total.", "3+2+4", "9"),
          diagram: weightedFiveEdgeDiagram,
        },
        labelledChoice(
          "net-wsp-m8",
          "Choosing the shortest path in a delivery network helps to:",
          "B",
          ["Connect all delivery stops with minimum total distance", "Minimise travel distance from depot to one customer", "Find an Euler circuit through all streets", "Identify all bridges in the network"],
          "Shortest path = minimum route between two specific points.",
        ),
        {
          ...labelledChoice(
            "net-wsp-m9",
            "Delivery routes P-A-Q=8, P-B-Q=12, P-A-B-Q=15. Which is shortest?",
            "A",
            ["P-A-Q with total weight 8", "P-B-Q with total weight 12", "P-A-B-Q with total weight 15", "All routes are the same"],
            "Minimum is 8 via P-A-Q.",
          ),
          diagram: weightedDeliveryDiagram,
        },
        labelledChoice(
          "net-wsp-m10",
          "Tracing shortest paths is most appropriate when:",
          "A",
          ["Finding the most efficient route between two specific vertices", "Connecting every vertex with minimum total cable", "Covering every edge exactly once", "Counting odd-degree vertices"],
          "Shortest path is a point-to-point route problem.",
        ),
      ],
    };
  }

  if (lesson.slug === "network-flow-connectivity") {
    return {
      ...base,
      description:
        "Identify bridges (cut edges) by checking whether their removal disconnects the network, compare network reliability, and explain how redundant connections improve robustness.",
      learningIntention:
        "Identify bridges in a network and explain how redundant connections affect network reliability.",
      successCriteria: [
        "Define a bridge as an edge whose removal disconnects the network.",
        "Identify bridges by checking whether alternative paths exist.",
        "Recognise that a degree-1 (pendant) vertex is always connected by a bridge.",
        "Explain why networks with fewer bridges are more reliable.",
      ],
      teaching: {
        paragraphs: [
          "A bridge is an edge whose removal disconnects the network — after removing it, at least one vertex can no longer reach the others. Bridges represent critical links: if a bridge fails, some part of the network is cut off.",
          "To identify a bridge, remove the edge and check whether every remaining vertex is still connected. If any vertex becomes unreachable, the removed edge was a bridge.",
          "A vertex with degree 1 (a pendant or leaf) is always connected to the rest of the network by exactly one edge, which is therefore always a bridge. In contrast, edges that form part of a cycle are never bridges — if the edge is removed, the alternative path around the cycle still connects both endpoints.",
          "A network with many bridges is more vulnerable to failures. Adding redundant connections (extra edges that create alternative paths) removes bridge status from edges and makes the network more reliable.",
        ],
        latexBlocks: [
          "\\text{bridge: remove edge} \\Rightarrow \\text{network disconnects}",
          "\\text{no bridge: remove edge} \\Rightarrow \\text{alternative path still exists}",
        ],
      },
      guidedPractice: [
        labelledChoice(
          "net-flow-g1",
          "A bridge in a network is:",
          "B",
          ["The heaviest edge in the network", "An edge whose removal disconnects the network", "Any edge with degree greater than 2", "The shortest path between two vertices"],
          "A bridge is critical — removing it breaks the network into disconnected parts.",
        ),
        {
          ...shortAnswer("net-flow-g2", "The displayed chain A-B-C-D has edges A-B, B-C, C-D. How many bridges does it have?", "\\text{bridges in chain}", "3"),
          diagram: chainBridgeDiagram,
        },
        labelledChoice(
          "net-flow-g3",
          "Why is the single edge connecting a pendant vertex (degree 1) always a bridge?",
          "B",
          ["Because it has the largest weight", "Because removing it leaves the pendant vertex completely disconnected", "Because it is the first edge in the edge list", "Because it connects the two highest-degree vertices"],
          "A degree-1 vertex has only one edge — remove it and that vertex has no other path.",
        ),
        {
          ...shortAnswer("net-flow-g4", "Triangle A-B-C-A has edges A-B, B-C, C-A. If edge A-B is removed, can A still reach B? (yes/no)", "\\text{A-C-B still exists}", "yes", ["Yes", "YES"]),
          diagram: circuitDiagram,
        },
      ],
      independentPractice: [
        {
          ...shortAnswer("net-flow-i1", "Triangle-plus-pendant: edges A-B, B-C, C-A, C-D. How many bridges are there?", "\\text{only C-D is a bridge}", "1"),
          diagram: trianglePendantDiagram,
        },
        {
          ...labelledChoice(
            "net-flow-i2",
            "In the chain network A-B-C-D, why are all edges bridges?",
            "B",
            ["Because the chain has 4 vertices", "Because there are no alternative paths — removing any edge separates the chain", "Because the edges are unweighted", "Because vertex A has degree 1"],
            "A chain has no cycles, so every edge is the only link between its two halves.",
          ),
          diagram: chainBridgeDiagram,
        },
        {
          ...shortAnswer("net-flow-i3", "Cycle-plus-pendant: edges A-B, B-C, C-D, D-E, E-B. Vertex A is pendant (degree 1). How many bridges does this network have?", "\\text{only A-B is a bridge}", "1"),
          diagram: cyclePendantDiagram,
        },
        labelledChoice(
          "net-flow-i4",
          "A network with no bridges is:",
          "B",
          ["More vulnerable to disconnection if any edge fails", "More reliable because every pair of vertices has at least two independent paths", "Impossible to construct", "Always a tree"],
          "No bridges means alternative paths exist everywhere — the network is robust.",
        ),
        shortAnswer("net-flow-i5", "A network has edges A-B, B-C, C-A (triangle), then C-D and D-E (tail). Bridges are C-D and D-E. How many bridges does this network have?", "C-D\\text{ and }D-E", "2"),
      ],
      commonMistakes: [
        { mistake: "Saying all edges in a triangle are bridges because the triangle looks like it might be critical.", fix: "Triangle edges are NOT bridges — removing any one still leaves two edges connecting the same three vertices via the other path." },
        { mistake: "Forgetting that a pendant vertex's edge is always a bridge.", fix: "A pendant vertex (degree 1) has only one edge. Remove it and the pendant is disconnected. Its edge is always a bridge." },
        { mistake: "Confusing a connected network with a network that has no bridges.", fix: "A connected network can still have bridges. A network has no bridges only when every edge lies on at least one cycle." },
        { mistake: "Checking whether the removed vertex (not edge) disconnects the network when looking for a bridge.", fix: "A bridge is defined for edges, not vertices. Remove the edge and check if the network remains connected." },
      ],
      masteryQuiz: [
        labelledChoice(
          "net-flow-m1",
          "What is a bridge in a network?",
          "B",
          ["The longest path between any two vertices", "An edge whose removal disconnects the network", "A vertex with the highest degree", "An edge that is part of a cycle"],
          "A bridge is a critical edge — removing it splits the network.",
        ),
        shortAnswer("net-flow-m2", "A chain of 5 vertices A-B-C-D-E has 4 edges. How many bridges does it have?", "\\text{no alternative paths in chain}", "4"),
        labelledChoice(
          "net-flow-m3",
          "Why does a triangle A-B-C-A have no bridges?",
          "B",
          ["Because all its vertices have the same degree", "Because removing any edge still leaves two edges connecting the same vertices via the other path", "Because it is directed", "Because it has exactly 3 vertices"],
          "Each triangle edge has an alternative path around the other two edges.",
        ),
        labelledChoice(
          "net-flow-m4",
          "In the triangle-plus-pendant (edges A-B, B-C, C-A, C-D), which is the only bridge?",
          "D",
          ["A-B", "B-C", "C-A", "C-D"],
          "C-D is the only bridge — removing it leaves D disconnected.",
        ),
        {
          ...shortAnswer("net-flow-m5", "In the displayed cycle B-C-D-E-B (no pendant), how many bridges are there?", "\\text{every edge lies on the cycle}", "0"),
          diagram: {
            description:
              "Undirected cycle network with vertices B, C, D, E. Edges: B-C, C-D, D-E, E-B. Every edge lies on the cycle, so there are no bridges.",
            vertices: [
              { id: "B", label: "B", x: 90, y: 150 },
              { id: "C", label: "C", x: 220, y: 80 },
              { id: "D", label: "D", x: 350, y: 150 },
              { id: "E", label: "E", x: 220, y: 220 },
            ],
            edges: [
              { from: "B", to: "C" },
              { from: "C", to: "D" },
              { from: "D", to: "E" },
              { from: "E", to: "B" },
            ],
          },
        },
        labelledChoice(
          "net-flow-m6",
          "A pendant vertex (degree 1) is always connected to the rest of the network by:",
          "B",
          ["An edge that is not a bridge", "A bridge — its single edge must be a bridge", "A directed edge only", "A cycle"],
          "One edge in, one edge out — remove it and the pendant is cut off.",
        ),
        {
          ...shortAnswer("net-flow-m7", "Cycle-plus-pendant: A-B, B-C, C-D, D-E, E-B. How many bridges?", "\\text{only A-B is a bridge}", "1"),
          diagram: cyclePendantDiagram,
        },
        labelledChoice(
          "net-flow-m8",
          "Adding an extra edge to a network to create a cycle:",
          "B",
          ["Always creates a bridge", "Can remove bridge status from all edges in the new cycle", "Has no effect on connectivity", "Always creates a tree"],
          "A new cycle means alternative paths exist, removing bridge status from each edge in the cycle.",
        ),
        shortAnswer("net-flow-m9", "Network: A-B, B-C, C-A (triangle) plus C-D and D-E (tail). How many bridges?", "C-D\\text{ and }D-E\\text{ are bridges}", "2"),
        labelledChoice(
          "net-flow-m10",
          "A reliable network is best described as one that:",
          "B",
          ["Has as many bridges as possible", "Has redundant connections so no single edge failure disconnects it", "Has exactly one path between every pair of vertices", "Is always directed"],
          "Redundant connections mean the network keeps working even if one edge fails.",
        ),
      ],
    };
  }

  if (lesson.slug === "network-applications-exam-practice") {
    return {
      ...base,
      description:
        "Practise mixed network applications: constructing diagrams, interpreting directed or weighted edges, shortest paths, MSTs, and practical decisions.",
    learningIntention:
      "Apply network terminology, shortest paths and minimum spanning trees to practical exam-style contexts.",
    successCriteria: [
      "Construct or interpret a network from a table or map description.",
      "Use directed and weighted edges correctly.",
      "Choose between shortest path and MST methods.",
      "Make a practical judgement using correct network terminology.",
    ],
    teaching: {
      paragraphs: [
        "Network exam questions often combine terminology, construction, routes, and minimal connector decisions.",
        "Digital questions use edge lists, tables and text-described networks. For drawn network diagrams, students should also practise with worksheet or paper diagrams.",
        "Start by identifying the goal: construct a diagram, count features, classify a route, find a shortest path, or connect all vertices with minimum total weight.",
        "Directed edges show one-way relationships, such as one-way streets or task dependencies. Weighted edges show values such as time, cost, distance, or cable length.",
        "Use shortest path for a route between two vertices. Use a minimum spanning tree when the goal is to connect all required locations with the least total weight.",
        "In real applications, the mathematically shortest route may not be best if there are tolls, traffic, safety issues, access restrictions, or reliability concerns.",
      ],
      latexBlocks: [
        "\\text{route problem} \\rightarrow \\text{shortest path}",
        "\\text{minimal connector problem} \\rightarrow \\text{minimum spanning tree}",
      ],
    },
    guidedPractice: [
      labelledChoice("net-app-g1", "A table gives one-way task dependencies. What kind of network is needed?", "B", ["Undirected", "Directed", "Box plot", "Tree only"], "One-way dependencies need directed edges."),
      shortAnswer("net-app-g2", "A shortest route uses weights 4, 3, and 6. Find total.", "4+3+6", "13"),
      labelledChoice("net-app-g3", "A school wants minimum cable to connect all buildings. Best method?", "C", ["Circuit", "Degree", "Minimum spanning tree", "Mean"], "This is a minimal connector problem."),
      {
        ...labelledChoice("net-app-g4", "Use the displayed network to choose the correct description.", "A", ["Three weighted edges connect A, B, and C", "Only one vertex is shown", "The edges must be directed", "There are no weights"], "The table shows three weighted edges."),
        diagram: {
          description:
            "Undirected weighted network with vertices A, B, and C. Edges: A-B weight 4, B-C weight 6, and A-C weight 5.",
          vertices: [
            { id: "A", label: "A", x: 100, y: 190 },
            { id: "B", label: "B", x: 210, y: 80 },
            { id: "C", label: "C", x: 320, y: 190 },
          ],
          edges: [
            { from: "A", to: "B", weight: 4 },
            { from: "B", to: "C", weight: 6 },
            { from: "A", to: "C", weight: 5 },
          ],
        },
      },
    ],
    independentPractice: [
      {
        ...labelledChoice("net-app-i1", "A map with distances between suburbs should use:", "A", ["Weighted edges", "Only isolated vertices", "A box plot", "A frequency table"], "Distances are weights."),
        diagram: appShortestDiagram,
      },
      shortAnswer("net-app-i2", "Add route weights 7 and 8.", "7+8", "15"),
      labelledChoice("net-app-i3", "Shortest path is not always best because:", "D", ["It uses vertices", "It is always free", "It must connect all vertices", "Traffic, safety, or cost may matter"], "Practical constraints can override distance."),
      shortAnswer("net-app-i4", "MST selected weights are 3, 5, and 5. Find total.", "3+5+5", "13"),
      {
        ...labelledChoice("net-app-i5", "The displayed delivery network is being used to find the quickest path from Depot to Shop. Which method is most relevant?", "B", ["Minimum spanning tree", "Shortest path", "Counting degree only", "Finding a circuit only"], "A route between two vertices is a shortest-path problem."),
        diagram: appShortestDiagram,
      },
    ],
    commonMistakes: [
      { mistake: "Using Kruskal's method when the question asks for the quickest route from Depot to Shop.", fix: "A single point-to-point route is a shortest-path problem, not an MST problem." },
      { mistake: "Finding one shortest path when the question asks to connect all buildings with minimum cable.", fix: "Connecting all locations with minimum total length is a minimum spanning tree problem." },
      { mistake: "Travelling along an edge in the opposite direction to its arrow in a directed network.", fix: "In a directed network, arrows define which direction each edge can be used." },
      { mistake: "Choosing the 11-minute route without reading that it has a dangerous crossing.", fix: "Practical factors such as safety, tolls, and access restrictions can override the shortest distance." },
    ],
    masteryQuiz: [
      {
        ...labelledChoice("net-app-m1", "In the displayed road network, the numbers on the edges show:", "A", ["Distances or costs", "Vertex names", "Circuits only", "Degrees only"], "Weights show quantities such as distance or cost."),
        diagram: appShortestDiagram,
      },
      shortAnswer("net-app-m2", "Route weights are 6, 6, and 2. Find total.", "6+6+2", "14"),
      {
        ...labelledChoice("net-app-m3", "To connect all displayed parks with minimum path length, use:", "C", ["Shortest path only", "Circuit", "Minimum spanning tree", "Degree"], "Connecting all with minimum total length is MST."),
        diagram: appMstDiagram,
      },
      labelledChoice("net-app-m4", "A one-way delivery route should be modelled with:", "B", ["Undirected edges", "Directed edges", "No edges", "Only weights"], "One-way movement requires direction."),
      shortAnswer("net-app-m5", "A table lists five direct connections. How many edges are drawn?", "5", "5"),
      labelledChoice("net-app-m6", "A shortest path question with 8 vertices is:", "A", ["Within a no-more-than-10-vertices limit", "Too large", "Not a network", "Always an MST"], "8 is no more than 10."),
      shortAnswer("net-app-m7", "MST weights 2, 4, and 9 total to what?", "\\text{MST weights: }2,\\ 4,\\ 9", "15"),
      labelledChoice("net-app-m8", "Why might a longer route be chosen?", "D", ["It has no edges", "It has fewer vertices always", "It is disconnected", "It may be safer or faster"], "Practical features can matter."),
      {
        ...shortAnswer("net-app-m9", "Use the displayed network to find the degree of A.", "\\deg(A)=?", "3"),
        diagram: degreeStarDiagram,
      },
      labelledChoice("net-app-m10", "Before solving a network application, first:", "A", ["Identify the goal of the problem", "Choose the largest edge", "Ignore weights", "Delete vertices"], "The method depends on the goal."),
    ],
    };
  }

  if (lesson.slug === "networks-revision") {
    return {
      ...base,
      description:
        "Activate prior knowledge for network mathematics: identify vertices and edges, count degrees, recognise paths and cycles, and read simple network diagrams — foundations for Year 11 shortest-path and spanning-tree work.",
      learningIntention:
        "Recall the definitions and notation for network graphs so that Year 11 network applications build on secure foundations.",
      successCriteria: [
        "Identify vertices (nodes) and edges (connections) in a network diagram and count each.",
        "Find the degree of a vertex by counting the edges incident to it.",
        "Identify whether a sequence of connected vertices forms a path or a cycle.",
        "Recognise whether a network is connected (all vertices reachable from any starting point).",
      ],
      teaching: {
        paragraphs: [
          "A network (or graph) is a set of vertices (also called nodes or points) connected by edges (also called arcs or lines). Vertices represent objects or locations; edges represent connections between them. Networks model roads, computer links, social connections, pipelines, and many other systems.",
          "The degree of a vertex is the number of edges directly connected to it. A vertex with degree 0 is isolated (no connections). The sum of all degrees in any network equals twice the number of edges, because every edge contributes 1 to each of its two endpoints.",
          "A path is a sequence of vertices where each consecutive pair is connected by an edge and no vertex is repeated. A cycle (or circuit) is a closed path that returns to its starting vertex. A connected network has a path between every pair of vertices — no vertex is stranded.",
          "Weighted networks assign a numerical value (weight) to each edge, representing distance, cost, time, or capacity. Reading a weighted network means identifying the weight on each edge, not just the connection itself. Directed networks (digraphs) use arrows on edges to show one-way connections.",
        ],
        latexBlocks: [
          "\\text{degree}(V) = \\text{number of edges at vertex }V",
          "\\sum \\text{all degrees} = 2 \\times \\text{number of edges}",
          "\\text{Path: no vertex repeated.}\\quad \\text{Cycle: starts and ends at same vertex.}",
        ],
      },
      workedExamples: [
        {
          title: "Counting vertices, edges, and degrees",
          questionLatex:
            "\\text{A network has vertices A, B, C, D with edges AB, AC, BC, BD. Find the degree of each vertex and the total number of edges.}",
          steps: [
            {
              explanation: "Count edges at each vertex: A is in AB, AC → degree 2. B is in AB, BC, BD → degree 3. C is in AC, BC → degree 2. D is in BD → degree 1.",
              latex: "\\deg(A)=2,\\quad\\deg(B)=3,\\quad\\deg(C)=2,\\quad\\deg(D)=1",
            },
            {
              explanation: "Count edges: AB, AC, BC, BD → 4 edges. Check: sum of degrees = 2+3+2+1 = 8 = 2×4. ✓",
              latex: "\\text{4 edges}",
            },
          ],
          finalAnswerLatex: "\\deg(A)=2,\\;\\deg(B)=3,\\;\\deg(C)=2,\\;\\deg(D)=1;\\quad 4\\text{ edges}",
        },
        {
          title: "Identifying a path and a cycle",
          questionLatex:
            "\\text{In a network with edges AB, BC, CA, CD, is A→B→C→A a cycle? Is A→B→C→D a path?}",
          steps: [
            {
              explanation: "A→B→C→A returns to A and uses edges AB, BC, CA. No vertex repeated. This is a cycle.",
              latex: "A\\to B\\to C\\to A\\text{ is a cycle}",
            },
            {
              explanation: "A→B→C→D visits each vertex once and does not return to A. This is a path.",
              latex: "A\\to B\\to C\\to D\\text{ is a path}",
            },
          ],
          finalAnswerLatex: "A\\to B\\to C\\to A\\text{ is a cycle; }A\\to B\\to C\\to D\\text{ is a path}",
        },
        {
          title: "Reading a weighted network",
          questionLatex:
            "\\text{A weighted network has edges: A–B (weight 5), B–C (weight 3), A–C (weight 9). What is the total weight of the path A→B→C?}",
          steps: [
            {
              explanation: "Add the weights along the path.",
              latex: "\\text{A}\\to\\text{B}: 5\\quad+\\quad\\text{B}\\to\\text{C}: 3",
            },
            {
              explanation: "Total weight of path A→B→C.",
              latex: "5 + 3 = 8",
            },
          ],
          finalAnswerLatex: "8",
        },
      ],
      guidedPractice: [
        shortAnswer(
          "y11s-netr-g1",
          "A network has edges PQ, QR, RS, PS. How many edges does it have?",
          "PQ,\\,QR,\\,RS,\\,PS",
          "4",
          ["4 edges"]
        ),
        shortAnswer(
          "y11s-netr-g2",
          "In a network with edges AB, AC, AD, BC, what is the degree of vertex A?",
          "\\text{A is in: AB, AC, AD} \\Rightarrow \\deg(A)=3",
          "3",
          ["degree 3", "deg(A)=3"]
        ),
        labelledChoice(
          "y11s-netr-g3",
          "A network is connected if:",
          "B",
          ["Every vertex has degree 2", "There is a path between every pair of vertices", "It has no cycles", "All edges have the same weight"],
          "Connected means every vertex can be reached from any other vertex."
        ),
        shortAnswer(
          "y11s-netr-g4",
          "A path A→B→C→D→B visits B twice. Is this a valid path (yes or no)?",
          "\\text{B is repeated — not a valid path}",
          "No",
          ["no", "not a path", "invalid"]
        ),
      ],
      independentPractice: [
        shortAnswer(
          "y11s-netr-i1",
          "A network has 5 edges. What is the sum of all vertex degrees?",
          "\\sum\\text{degrees} = 2 \\times 5",
          "10",
          ["10 total", "sum=10"]
        ),
        shortAnswer(
          "y11s-netr-i2",
          "Edges: AB (4), BC (7), AC (6). Find the total weight of path A→B→C.",
          "4 + 7",
          "11",
          ["11 total", "weight 11"]
        ),
        labelledChoice(
          "y11s-netr-i3",
          "The degree of a vertex is:",
          "A",
          ["The number of edges connected to it", "The number of vertices in the network", "The weight of the shortest path", "The number of cycles"],
          "Degree counts the edges directly attached to the vertex."
        ),
        shortAnswer(
          "y11s-netr-i4",
          "A network has vertices A, B, C, D. Edges: AB, BC, CD, DA. What is the degree of vertex B?",
          "B\\text{ is in: AB, BC} \\Rightarrow \\deg(B)=2",
          "2",
          ["degree 2", "deg=2"]
        ),
        labelledChoice(
          "y11s-netr-i5",
          "A cycle in a network is a path that:",
          "C",
          ["Has no edges", "Visits every vertex", "Returns to its starting vertex", "Contains all the vertices exactly twice"],
          "A cycle is a closed path — it starts and ends at the same vertex."
        ),
      ],
      commonMistakes: [
        {
          mistake: "Counting directed edges twice when finding degree in an undirected network.",
          fix: "In an undirected network, each edge counts once toward the degree of each of its two endpoints. Edge AB contributes 1 to deg(A) and 1 to deg(B).",
        },
        {
          mistake: "Confusing a path with a cycle by forgetting that a cycle returns to the start.",
          fix: "A path goes from one vertex to another without repeating. A cycle is a path that starts and ends at the same vertex and uses at least one edge.",
        },
        {
          mistake: "Treating a network as connected when one vertex has degree 0.",
          fix: "A vertex with degree 0 (isolated) cannot be reached from any other vertex, so the network is disconnected.",
        },
        {
          mistake: "Adding all edge weights in the network when asked for the weight of a specific path.",
          fix: "Only add the weights of the edges along the specified path. Ignore edges not on the path.",
        },
      ],
      masteryQuiz: [
        shortAnswer("y11s-netr-m1", "A network has edges AB, AC, BC, CD. How many edges?", "AB,\\,AC,\\,BC,\\,CD", "4", ["4 edges"]),
        shortAnswer("y11s-netr-m2", "Edges: AB, AC, AD. What is deg(A)?", "AB, AC, AD \\Rightarrow 3", "3", ["degree 3"]),
        labelledChoice("y11s-netr-m3", "A network with no path between two vertices is:", "B", ["Connected", "Disconnected", "Weighted", "Directed"], "If some vertices cannot reach others, the network is disconnected."),
        shortAnswer("y11s-netr-m4", "A network has 6 edges. What is the sum of all degrees?", "2 \\times 6", "12", ["12 total"]),
        labelledChoice("y11s-netr-m5", "A path differs from a cycle in that a path:", "A", ["Does not return to the start", "Must visit every vertex", "Has no weights", "Requires directed edges"], "A path ends at a different vertex; a cycle returns to the start."),
        shortAnswer("y11s-netr-m6", "Edges: PQ(5), QR(3), PR(9). Total weight of path P→Q→R?", "5 + 3", "8", ["8 total", "weight=8"]),
        labelledChoice("y11s-netr-m7", "In a weighted network, the weight of an edge represents:", "D", ["The degree of a vertex", "The number of paths", "Whether the network is connected", "A quantity such as distance, cost or time"], "Weights attach a numerical value such as distance or cost to an edge."),
        shortAnswer("y11s-netr-m8", "Edges: AB, BC, CA. Vertex A has degree:", "AB\\text{ and }CA \\Rightarrow \\deg(A)=2", "2", ["degree 2"]),
        labelledChoice("y11s-netr-m9", "A→B→C→D→A is a:", "B", ["Path only", "Cycle", "Disconnected graph", "Tree"], "It returns to A — it is a closed path (cycle)."),
        labelledChoice("y11s-netr-m10", "The sum of all degrees in a graph with 7 edges is:", "C", ["7", "14", "14", "21"], "Sum of degrees = 2 × number of edges = 2 × 7 = 14."),
      ],
      masteryPassMark: 0.8,
    };
  }

  return null;
}
