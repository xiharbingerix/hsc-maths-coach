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

  return `First decide which network idea is being tested: degree, vertices, edges, route total, shortest path, or spanning tree. Use that definition carefully to get ${answer}.`;
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
