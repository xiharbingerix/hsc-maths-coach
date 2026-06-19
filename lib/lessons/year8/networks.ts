import type {
  CourseLessonSeed,
  CoursePathwaySeed,
  CourseUnitSeed,
} from "../../courseTypes";
import type {
  ExplicitLesson,
  PracticeQuestion,
  WorkedExample,
} from "../differentialCalculus";

type LessonContent = Pick<
  ExplicitLesson,
  | "description"
  | "learningIntention"
  | "successCriteria"
  | "teaching"
  | "workedExamples"
  | "guidedPractice"
  | "independentPractice"
  | "commonMistakes"
  | "masteryQuiz"
  | "masteryQuizPool"
  | "multiPartPractice"
>;

// ── Helper builders ──────────────────────────────────────────────────────────

function answer(
  id: string,
  prompt: string,
  latex: string,
  value: string,
  explanation: string,
  hint: string,
  acceptedAnswers: string[] = [],
  difficulty?: number
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer: value,
    acceptedAnswers: Array.from(new Set([value, ...acceptedAnswers])),
    hint,
    explanation,
    ...(difficulty ? { difficulty } : {}),
  };
}

function choice(
  id: string,
  prompt: string,
  value: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string,
  hint: string,
  difficulty?: number,
  latex = "\\text{Select A, B, C or D.}"
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    choices: ["A", "B", "C", "D"].map((label, i) => ({ label, text: choices[i] })),
    answer: value,
    acceptedAnswers: [],
    hint,
    explanation,
    ...(difficulty ? { difficulty } : {}),
  };
}

// ── Lesson 1: Network Fundamentals ───────────────────────────────────────────

const networkFundamentals: LessonContent = {
  description:
    "Identify the vertices and edges of a network, find the degree of a vertex, read and construct network diagrams from descriptions, and interpret weighted networks.",
  learningIntention:
    "Describe networks using vertices and edges, find the degree of each vertex, and read or build network diagrams including weighted networks.",
  successCriteria: [
    "Identify the vertices and edges of a network and count each.",
    "Find the degree of a vertex by counting the edges meeting it.",
    "Construct a network from a written description of its connections.",
    "Explain what the numbers on a weighted network represent.",
    "Recognise that the sum of all degrees equals twice the number of edges.",
    "Read information such as connections and weights from a network diagram.",
  ],
  teaching: {
    paragraphs: [
      "A network is just a picture of things and the connections between them. Think of a map of train stations: each station is a dot, and each railway line joining two stations is a line. The dots are called vertices (one of them is a vertex) and the connecting lines are called edges. Nothing more complicated than dots joined by lines.",
      "Here is a concrete one. Suppose four friends — Ana, Ben, Cara and Dan — and we draw a line between any two who have each other's phone number. Ana knows Ben, Ben knows Cara, Cara knows Dan, and Ana knows Dan. That is a network with 4 vertices (the friends) and 4 edges (the friendships). The picture would be a square: Ana–Ben, Ben–Cara, Cara–Dan, Dan–Ana.",
      "The degree of a vertex is simply how many edges come out of it — count the lines touching that dot. In the friends network, Ana has edges to Ben and to Dan, so Ana has degree 2. Every one of the four friends has degree 2 here. Degree tells you how 'busy' or well-connected a point is.",
      "There is a neat rule hiding in the degrees. Every edge has two ends, and each end adds 1 to the degree of a vertex. So if you add up the degrees of every vertex, you count each edge exactly twice. That means the sum of all the degrees is always double the number of edges: $\\text{sum of degrees} = 2 \\times (\\text{number of edges})$. In the friends network the degrees are $2+2+2+2 = 8$, and there are 4 edges — and indeed $8 = 2 \\times 4$.",
      "To construct a network from words, work one connection at a time. If you read 'a network has vertices P, Q, R, S with edges PQ, QR, RS and PR', you draw four dots and join exactly those pairs: P to Q, Q to R, R to S, and P to R. Reading carefully matters — PR is an edge but PS is not, so do not add lines that were not listed.",
      "Sometimes the edges carry numbers. A weighted network puts a number on each edge — perhaps the distance in kilometres between two towns, the cost of a cable, or the time a journey takes. The number is called the weight. A weighted edge of 7 between towns A and B might mean the road from A to B is 7 km long. The structure is the same; the weights just add extra information for later problems like finding the shortest route.",
      "A common slip is to count a single edge twice when finding degree, or to forget that a loop or a shared dot still only counts the lines you can actually see. Always touch each line once with your pencil as you count, and the degree will be right.",
    ],
    latexBlocks: [
      "\\text{vertex} = \\text{a dot}, \\qquad \\text{edge} = \\text{a line joining two vertices}",
      "\\text{degree of a vertex} = \\text{number of edges meeting it}",
      "\\text{sum of all degrees} = 2 \\times (\\text{number of edges})",
    ],
  },
  workedExamples: [
    {
      title: "Count vertices and edges",
      questionLatex:
        "\\text{A network has vertices } A,B,C,D,E \\text{ with edges } AB, BC, CD, DE, EA \\text{ and } AC. \\text{ Count the vertices and edges.}",
      diagram: {
        description:
          "Undirected network with vertices A, B, C, D, E arranged in a pentagon. Edges: A-B, B-C, C-D, D-E, E-A around the ring, plus the chord A-C.",
        vertices: [
          { id: "A", label: "A", x: 210, y: 60 },
          { id: "B", label: "B", x: 330, y: 145 },
          { id: "C", label: "C", x: 285, y: 280 },
          { id: "D", label: "D", x: 135, y: 280 },
          { id: "E", label: "E", x: 90, y: 145 },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "B", to: "C" },
          { from: "C", to: "D" },
          { from: "D", to: "E" },
          { from: "E", to: "A" },
          { from: "A", to: "C" },
        ],
      },
      steps: [
        { explanation: "List the vertices named in the description.", latex: "A, B, C, D, E \\Rightarrow 5 \\text{ vertices}" },
        { explanation: "List the edges named, counting each pair once.", latex: "AB, BC, CD, DE, EA, AC \\Rightarrow 6 \\text{ edges}" },
      ],
      finalAnswerLatex: "5 \\text{ vertices and } 6 \\text{ edges}",
    } as WorkedExample,
    {
      title: "Find the degree of a vertex",
      questionLatex:
        "\\text{In the network with edges } AB, AC, AD, BC, \\text{ find the degree of vertex } A.",
      diagram: {
        description:
          "Undirected network with vertices A, B, C, D. Edges: A-B, A-C, A-D and B-C. Vertex A meets three edges.",
        vertices: [
          { id: "A", label: "A", x: 200, y: 90 },
          { id: "B", label: "B", x: 90, y: 200 },
          { id: "C", label: "C", x: 200, y: 260 },
          { id: "D", label: "D", x: 320, y: 200 },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "A", to: "C" },
          { from: "A", to: "D" },
          { from: "B", to: "C" },
        ],
      },
      steps: [
        { explanation: "Pick out every edge that has A as one of its ends.", latex: "AB, AC, AD" },
        { explanation: "Count those edges — that is the degree of A.", latex: "\\deg(A) = 3" },
      ],
      finalAnswerLatex: "\\deg(A) = 3",
    } as WorkedExample,
    {
      title: "Use the degree-sum rule to find the number of edges",
      questionLatex:
        "\\text{A network has 5 vertices with degrees } 3, 3, 2, 2, 2. \\text{ How many edges does it have?}",
      steps: [
        { explanation: "Add up all the degrees.", latex: "3+3+2+2+2 = 12" },
        { explanation: "The sum of degrees is twice the number of edges, so halve it.", latex: "\\text{edges} = \\tfrac{12}{2} = 6" },
      ],
      finalAnswerLatex: "6 \\text{ edges}",
    } as WorkedExample,
    {
      title: "Read a weighted network",
      questionLatex:
        "\\text{Towns } P,Q,R \\text{ have roads } PQ=5 \\text{ km}, QR=8 \\text{ km}, PR=4 \\text{ km}. \\text{ How far is it from } P \\text{ to } R \\text{ going via } Q?",
      diagram: {
        description:
          "Undirected weighted network of towns P, Q, R forming a triangle. Edge weights (km): P-Q = 5, Q-R = 8, P-R = 4.",
        vertices: [
          { id: "P", label: "P", x: 90, y: 250 },
          { id: "Q", label: "Q", x: 210, y: 70 },
          { id: "R", label: "R", x: 330, y: 250 },
        ],
        edges: [
          { from: "P", to: "Q", weight: 5 },
          { from: "Q", to: "R", weight: 8 },
          { from: "P", to: "R", weight: 4 },
        ],
      },
      steps: [
        { explanation: "Going via Q uses the edges PQ then QR, so add their weights.", latex: "PQ + QR = 5 + 8" },
        { explanation: "Add the two weights to get the total distance.", latex: "5 + 8 = 13 \\text{ km}" },
      ],
      finalAnswerLatex: "13 \\text{ km (the direct road } PR \\text{ is shorter at } 4 \\text{ km)}",
    } as WorkedExample,
  ],
  guidedPractice: [
    {
      ...answer(
        "y8-net-fun-g1",
        "How many edges does the network shown have?",
        "\\text{Edges in the network} = \\;?",
        "4",
        "The edges are AB, BC, CD and DA — that is 4 edges.",
        "Count each connecting line once.",
      ),
      diagram: {
        description:
          "Undirected network with vertices A, B, C, D forming a square. Edges: A-B, B-C, C-D, D-A.",
        vertices: [
          { id: "A", label: "A", x: 90, y: 80 },
          { id: "B", label: "B", x: 320, y: 80 },
          { id: "C", label: "C", x: 320, y: 260 },
          { id: "D", label: "D", x: 90, y: 260 },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "B", to: "C" },
          { from: "C", to: "D" },
          { from: "D", to: "A" },
        ],
      },
    },
    {
      ...answer(
        "y8-net-fun-g2",
        "Find the degree of vertex A in the network shown.",
        "\\deg(A) = \\;?",
        "4",
        "A is an end of AB, AC, AD and AE — that is 4 edges, so $\\deg(A) = 4$.",
        "Count the edges that touch A.",
      ),
      diagram: {
        description:
          "Star network with centre A joined to B, C, D and E. Edges: A-B, A-C, A-D, A-E.",
        vertices: [
          { id: "A", label: "A", x: 210, y: 170 },
          { id: "B", label: "B", x: 210, y: 50 },
          { id: "C", label: "C", x: 340, y: 170 },
          { id: "D", label: "D", x: 210, y: 290 },
          { id: "E", label: "E", x: 80, y: 170 },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "A", to: "C" },
          { from: "A", to: "D" },
          { from: "A", to: "E" },
        ],
      },
    },
    choice(
      "y8-net-fun-g3",
      "Which best describes a weighted network?",
      "B",
      [
        "A network where every vertex has the same degree.",
        "A network where each edge has a number showing a value such as distance or cost.",
        "A network drawn with no crossings.",
        "A network with exactly one edge.",
      ],
      "A weighted network has a number (the weight) on each edge, often representing distance, time or cost.",
      "Think about what extra information the numbers on the edges carry.",
    ),
    answer(
      "y8-net-fun-g4",
      "A network has 4 vertices with degrees 3, 3, 1 and 1. How many edges does it have?",
      "\\text{Number of edges} = \\;?",
      "4",
      "Sum of degrees $= 3+3+1+1 = 8$. Edges $= 8 \\div 2 = 4$.",
      "Add the degrees, then halve the total.",
    ),
  ],
  independentPractice: [
    {
      ...answer(
        "y8-net-fun-i1",
        "How many edges does the network shown have?",
        "\\text{Number of edges} = \\;?",
        "5",
        "The edges AB, BC, CD, DE, EA make a ring of 5 edges.",
        "Count each connection once.",
      ),
      diagram: {
        description:
          "Undirected network with vertices A, B, C, D, E forming a pentagon ring. Edges: A-B, B-C, C-D, D-E, E-A.",
        vertices: [
          { id: "A", label: "A", x: 210, y: 60 },
          { id: "B", label: "B", x: 330, y: 145 },
          { id: "C", label: "C", x: 285, y: 280 },
          { id: "D", label: "D", x: 135, y: 280 },
          { id: "E", label: "E", x: 90, y: 145 },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "B", to: "C" },
          { from: "C", to: "D" },
          { from: "D", to: "E" },
          { from: "E", to: "A" },
        ],
      },
    },
    {
      ...answer(
        "y8-net-fun-i2",
        "Find the degree of vertex B in the network shown.",
        "\\deg(B) = \\;?",
        "3",
        "B is an end of AB, BC and BD — three edges, so $\\deg(B) = 3$.",
        "Pick out every edge containing B.",
      ),
      diagram: {
        description:
          "Undirected network with vertices A, B, C, D. Edges: A-B, A-C, B-C and B-D. Vertex B meets three edges.",
        vertices: [
          { id: "A", label: "A", x: 90, y: 90 },
          { id: "B", label: "B", x: 210, y: 200 },
          { id: "C", label: "C", x: 90, y: 280 },
          { id: "D", label: "D", x: 330, y: 200 },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "A", to: "C" },
          { from: "B", to: "C" },
          { from: "B", to: "D" },
        ],
      },
    },
    answer(
      "y8-net-fun-i3",
      "A network has 6 vertices with degrees 2, 2, 2, 2, 3 and 3. How many edges does it have?",
      "\\text{Number of edges} = \\;?",
      "7",
      "Sum of degrees $= 2+2+2+2+3+3 = 14$. Edges $= 14 \\div 2 = 7$.",
      "Add all degrees, then divide by 2.",
    ),
    {
      ...choice(
        "y8-net-fun-i4",
        "The network shown joins every pair of its four vertices. What is the degree of each vertex?",
        "C",
        [
          "1",
          "2",
          "3",
          "4",
        ],
        "Each vertex connects to the other 3 vertices, so every vertex has degree 3.",
        "Count how many other vertices each one is joined to.",
      ),
      diagram: {
        description:
          "Complete network on vertices A, B, C, D with every pair joined. Edges: A-B, A-C, A-D, B-C, B-D, C-D. Each vertex has degree 3.",
        vertices: [
          { id: "A", label: "A", x: 90, y: 80 },
          { id: "B", label: "B", x: 320, y: 80 },
          { id: "C", label: "C", x: 320, y: 260 },
          { id: "D", label: "D", x: 90, y: 260 },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "A", to: "C" },
          { from: "A", to: "D" },
          { from: "B", to: "C" },
          { from: "B", to: "D" },
          { from: "C", to: "D" },
        ],
      },
    },
    {
      ...answer(
        "y8-net-fun-i5",
        "Using the weighted network shown, find the distance from X to Z travelling via Y.",
        "XY + YZ = \\;?",
        "15",
        "Via Y uses XY then YZ: $6 + 9 = 15$ km.",
        "Add the weights of the two edges on the route.",
        ["15 km"],
      ),
      diagram: {
        description:
          "Undirected weighted network of towns X, Y, Z forming a triangle. Edge weights (km): X-Y = 6, Y-Z = 9, X-Z = 12.",
        vertices: [
          { id: "X", label: "X", x: 90, y: 250 },
          { id: "Y", label: "Y", x: 210, y: 70 },
          { id: "Z", label: "Z", x: 330, y: 250 },
        ],
        edges: [
          { from: "X", to: "Y", weight: 6 },
          { from: "Y", to: "Z", weight: 9 },
          { from: "X", to: "Z", weight: 12 },
        ],
      },
    },
  ],
  commonMistakes: [
    {
      mistake: "Counting an edge twice when finding the degree of a vertex.",
      fix: "Touch each line once with your pencil. $\\deg(A)$ is the number of distinct edges meeting A — count each connecting line a single time.",
    },
    {
      mistake: "Adding edges that were not listed, e.g. drawing PS when only PQ, QR, RS and PR were given.",
      fix: "Draw exactly the edges named, no more. PR being an edge does not mean PS is — only join the pairs actually written down.",
    },
    {
      mistake: "Thinking the number of edges equals the sum of the degrees.",
      fix: "Each edge is counted twice in the degree sum, so the number of edges is half the sum: $\\text{edges} = \\tfrac{1}{2}(\\text{sum of degrees})$.",
    },
    {
      mistake: "Ignoring the weights and treating every edge as the same length.",
      fix: "In a weighted network the number on each edge matters. To find a route's total, add the weights of the edges you actually travel along.",
    },
  ],
  masteryQuiz: [
    {
      ...answer(
        "y8-net-fun-m1",
        "How many edges does the network shown have?",
        "\\text{Number of edges} = \\;?",
        "3",
        "AB, BC and CA make a triangle of 3 edges.",
        "Count each connection once.",
      ),
      diagram: {
        description:
          "Undirected network with vertices A, B, C forming a triangle. Edges: A-B, B-C, C-A.",
        vertices: [
          { id: "A", label: "A", x: 210, y: 70 },
          { id: "B", label: "B", x: 330, y: 270 },
          { id: "C", label: "C", x: 90, y: 270 },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "B", to: "C" },
          { from: "C", to: "A" },
        ],
      },
    },
    {
      ...answer(
        "y8-net-fun-m2",
        "Find the degree of vertex A in the network shown.",
        "\\deg(A) = \\;?",
        "4",
        "A meets AB, AC, AD and AE, so $\\deg(A) = 4$.",
        "Count the edges touching A.",
      ),
      diagram: {
        description:
          "Star network with centre A joined to B, C, D and E. Edges: A-B, A-C, A-D, A-E.",
        vertices: [
          { id: "A", label: "A", x: 210, y: 170 },
          { id: "B", label: "B", x: 210, y: 50 },
          { id: "C", label: "C", x: 340, y: 170 },
          { id: "D", label: "D", x: 210, y: 290 },
          { id: "E", label: "E", x: 80, y: 170 },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "A", to: "C" },
          { from: "A", to: "D" },
          { from: "A", to: "E" },
        ],
      },
    },
    choice(
      "y8-net-fun-m3",
      "What does the weight on an edge of a network usually represent?",
      "A",
      [
        "A value such as distance, time or cost for that connection.",
        "The number of vertices in the network.",
        "The degree of a vertex.",
        "The number of edges in the network.",
      ],
      "A weight is a number attached to an edge, often a distance, time or cost.",
      "Weights add information about each individual connection.",
    ),
    answer(
      "y8-net-fun-m4",
      "A network has 5 vertices with degrees 2, 2, 2, 2 and 2. How many edges does it have?",
      "\\text{Number of edges} = \\;?",
      "5",
      "Sum of degrees $= 10$, so edges $= 10 \\div 2 = 5$.",
      "Add the degrees, then halve.",
    ),
    {
      ...answer(
        "y8-net-fun-m5",
        "How many edges does the network shown have?",
        "\\text{Number of edges} = \\;?",
        "5",
        "PQ, QR, RS, SP and PR is 5 edges (a square with one diagonal).",
        "Count every line in the diagram.",
      ),
      diagram: {
        description:
          "Undirected network with vertices P, Q, R, S forming a square with one diagonal. Edges: P-Q, Q-R, R-S, S-P and the diagonal P-R.",
        vertices: [
          { id: "P", label: "P", x: 90, y: 80 },
          { id: "Q", label: "Q", x: 320, y: 80 },
          { id: "R", label: "R", x: 320, y: 260 },
          { id: "S", label: "S", x: 90, y: 260 },
        ],
        edges: [
          { from: "P", to: "Q" },
          { from: "Q", to: "R" },
          { from: "R", to: "S" },
          { from: "S", to: "P" },
          { from: "P", to: "R" },
        ],
      },
    },
    {
      ...answer(
        "y8-net-fun-m6",
        "Find the degree of vertex B in the network shown.",
        "\\deg(B) = \\;?",
        "3",
        "B is an end of AB, BC and BD, so $\\deg(B) = 3$.",
        "Find every edge containing B.",
      ),
      diagram: {
        description:
          "Undirected network with vertices A, B, C, D forming a square with one diagonal. Edges: A-B, B-C, C-D, D-A and the diagonal B-D. Vertex B meets three edges.",
        vertices: [
          { id: "A", label: "A", x: 90, y: 80 },
          { id: "B", label: "B", x: 320, y: 80 },
          { id: "C", label: "C", x: 320, y: 260 },
          { id: "D", label: "D", x: 90, y: 260 },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "B", to: "C" },
          { from: "C", to: "D" },
          { from: "D", to: "A" },
          { from: "B", to: "D" },
        ],
      },
    },
    choice(
      "y8-net-fun-m7",
      "The degrees of a network's vertices add to 14. How many edges does the network have?",
      "B",
      [
        "7 edges, because edges equal the degree sum.",
        "7 edges, because edges are half the degree sum.",
        "14 edges, because each degree is one edge.",
        "28 edges, because each edge counts twice.",
      ],
      "Each edge is counted twice in the degree sum, so edges $= 14 \\div 2 = 7$.",
      "Halve the degree sum to get the number of edges.",
    ),
    {
      ...answer(
        "y8-net-fun-m8",
        "Using the weighted network shown, find the distance from A to D travelling A–B–C–D.",
        "AB + BC + CD = \\;?",
        "14",
        "$4 + 7 + 3 = 14$ km along the route A–B–C–D.",
        "Add the weights of the three edges used.",
        ["14 km"],
      ),
      diagram: {
        description:
          "Undirected weighted road network with towns A, B, C, D forming a square. Edge weights (km): A-B = 4, B-C = 7, C-D = 3, A-D = 10.",
        vertices: [
          { id: "A", label: "A", x: 90, y: 80 },
          { id: "B", label: "B", x: 320, y: 80 },
          { id: "C", label: "C", x: 320, y: 260 },
          { id: "D", label: "D", x: 90, y: 260 },
        ],
        edges: [
          { from: "A", to: "B", weight: 4 },
          { from: "B", to: "C", weight: 7 },
          { from: "C", to: "D", weight: 3 },
          { from: "A", to: "D", weight: 10 },
        ],
      },
    },
    answer(
      "y8-net-fun-m9",
      "A network has 6 vertices, each of degree 2. How many edges does it have?",
      "\\text{Number of edges} = \\;?",
      "6",
      "Sum of degrees $= 6 \\times 2 = 12$, so edges $= 12 \\div 2 = 6$.",
      "Total the degrees, then divide by 2.",
    ),
    {
      ...choice(
        "y8-net-fun-m10",
        "The network shown joins every pair of its four vertices. How many edges are there in total?",
        "C",
        [
          "4",
          "5",
          "6",
          "8",
        ],
        "Each vertex has degree 3, so the degree sum is $4 \\times 3 = 12$ and edges $= 12 \\div 2 = 6$.",
        "Find each vertex's degree, add them, then halve.",
      ),
      diagram: {
        description:
          "Complete network on vertices A, B, C, D with every pair joined. Edges: A-B, A-C, A-D, B-C, B-D, C-D — 6 edges in total.",
        vertices: [
          { id: "A", label: "A", x: 90, y: 80 },
          { id: "B", label: "B", x: 320, y: 80 },
          { id: "C", label: "C", x: 320, y: 260 },
          { id: "D", label: "D", x: 90, y: 260 },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "A", to: "C" },
          { from: "A", to: "D" },
          { from: "B", to: "C" },
          { from: "B", to: "D" },
          { from: "C", to: "D" },
        ],
      },
    },
  ],
  masteryQuizPool: [
    { ...answer("y8-net-fun-p1", "How many edges does the network shown have?", "\\text{Edges} = \\;?", "2", "AB and BC is 2 edges.", "Count the lines in the diagram.", [], 1), diagram: { description: "Undirected network with vertices A, B, C in a path. Edges: A-B, B-C.", vertices: [{ id: "A", label: "A", x: 80, y: 150 }, { id: "B", label: "B", x: 210, y: 150 }, { id: "C", label: "C", x: 340, y: 150 }], edges: [{ from: "A", to: "B" }, { from: "B", to: "C" }] } },
    { ...answer("y8-net-fun-p2", "How many edges does the network shown have?", "\\text{Edges} = \\;?", "3", "AB, BC, CD is a chain of 3 edges.", "Count each line once.", [], 1), diagram: { description: "Undirected network with vertices A, B, C, D in a path. Edges: A-B, B-C, C-D.", vertices: [{ id: "A", label: "A", x: 70, y: 150 }, { id: "B", label: "B", x: 180, y: 150 }, { id: "C", label: "C", x: 290, y: 150 }, { id: "D", label: "D", x: 400, y: 150 }], edges: [{ from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "D" }] } },
    { ...answer("y8-net-fun-p3", "Find the degree of vertex A in the network shown.", "\\deg(A) = \\;?", "2", "A meets AB and AC, so $\\deg(A) = 2$.", "Count the edges touching A.", [], 1), diagram: { description: "Undirected network with vertices A, B, C. Edges: A-B and A-C. Vertex A meets two edges.", vertices: [{ id: "A", label: "A", x: 210, y: 80 }, { id: "B", label: "B", x: 90, y: 250 }, { id: "C", label: "C", x: 330, y: 250 }], edges: [{ from: "A", to: "B" }, { from: "A", to: "C" }] } },
    { ...answer("y8-net-fun-p4", "How many vertices does the network shown have?", "\\text{Vertices} = \\;?", "5", "The vertices A, B, C, D, E number 5.", "Count the dots in the diagram.", [], 1), diagram: { description: "Undirected network with vertices A, B, C, D, E forming a pentagon ring. Edges: A-B, B-C, C-D, D-E, E-A.", vertices: [{ id: "A", label: "A", x: 210, y: 60 }, { id: "B", label: "B", x: 330, y: 145 }, { id: "C", label: "C", x: 285, y: 280 }, { id: "D", label: "D", x: 135, y: 280 }, { id: "E", label: "E", x: 90, y: 145 }], edges: [{ from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "D" }, { from: "D", to: "E" }, { from: "E", to: "A" }] } },
    choice("y8-net-fun-p5", "What is a vertex in a network?", "A", ["A point (dot) in the network.", "A line joining two points.", "A number on an edge.", "The total number of edges."], "A vertex is a point or dot; edges are the lines joining them.", "Recall the basic vocabulary.", 1),
    { ...answer("y8-net-fun-p6", "How many edges does the network shown have?", "\\text{Edges} = \\;?", "3", "AB, AC, AD is 3 edges, all meeting at A.", "Count each line once.", [], 1), diagram: { description: "Star network with centre A joined to B, C, D. Edges: A-B, A-C, A-D.", vertices: [{ id: "A", label: "A", x: 210, y: 90 }, { id: "B", label: "B", x: 90, y: 250 }, { id: "C", label: "C", x: 210, y: 280 }, { id: "D", label: "D", x: 330, y: 250 }], edges: [{ from: "A", to: "B" }, { from: "A", to: "C" }, { from: "A", to: "D" }] } },
    { ...answer("y8-net-fun-p7", "Find the degree of vertex B in the network shown.", "\\deg(B) = \\;?", "3", "B meets AB, BC and BD, so $\\deg(B) = 3$.", "Find every edge containing B.", [], 2), diagram: { description: "Star network with centre B joined to A, C, D. Edges: A-B, B-C, B-D. Vertex B meets three edges.", vertices: [{ id: "B", label: "B", x: 210, y: 90 }, { id: "A", label: "A", x: 90, y: 250 }, { id: "C", label: "C", x: 210, y: 280 }, { id: "D", label: "D", x: 330, y: 250 }], edges: [{ from: "A", to: "B" }, { from: "B", to: "C" }, { from: "B", to: "D" }] } },
    answer("y8-net-fun-p8", "A network has 4 vertices with degrees 2, 2, 1, 1. How many edges does it have?", "\\text{Edges} = \\;?", "3", "Sum $= 6$, so edges $= 6 \\div 2 = 3$.", "Halve the degree sum.", [], 2),
    { ...answer("y8-net-fun-p9", "How many edges does the network shown have?", "\\text{Edges} = \\;?", "5", "Four ring edges plus the diagonal AC make 5 edges.", "Count every line in the diagram.", [], 2), diagram: { description: "Undirected network with vertices A, B, C, D forming a square with one diagonal. Edges: A-B, B-C, C-D, D-A and the diagonal A-C.", vertices: [{ id: "A", label: "A", x: 90, y: 80 }, { id: "B", label: "B", x: 320, y: 80 }, { id: "C", label: "C", x: 320, y: 260 }, { id: "D", label: "D", x: 90, y: 260 }], edges: [{ from: "A", to: "B" }, { from: "B", to: "C" }, { from: "C", to: "D" }, { from: "D", to: "A" }, { from: "A", to: "C" }] } },
    { ...answer("y8-net-fun-p10", "Find the degree of vertex C in the network shown.", "\\deg(C) = \\;?", "2", "C meets AC and BC, so $\\deg(C) = 2$.", "Pick out the edges containing C.", [], 2), diagram: { description: "Undirected network with vertices A, B, C forming a triangle. Edges: A-B, A-C, B-C. Vertex C meets two edges.", vertices: [{ id: "A", label: "A", x: 210, y: 70 }, { id: "B", label: "B", x: 330, y: 270 }, { id: "C", label: "C", x: 90, y: 270 }], edges: [{ from: "A", to: "B" }, { from: "A", to: "C" }, { from: "B", to: "C" }] } },
    choice("y8-net-fun-p11", "Which statement about degree is true?", "B", ["Degree counts the vertices in the network.", "Degree counts the edges meeting a vertex.", "Degree is always equal to the number of edges.", "Degree is the weight of an edge."], "The degree of a vertex is the number of edges meeting it.", "Recall the definition of degree.", 2),
    { ...answer("y8-net-fun-p12", "Using the weighted network shown, find the distance from A to C via B.", "AB + BC = \\;?", "8", "$3 + 5 = 8$ km via B.", "Add the two edge weights.", ["8 km"], 2), diagram: { description: "Undirected weighted road network with towns A, B, C in a path. Edge weights (km): A-B = 3, B-C = 5.", vertices: [{ id: "A", label: "A", x: 70, y: 150 }, { id: "B", label: "B", x: 210, y: 150 }, { id: "C", label: "C", x: 350, y: 150 }], edges: [{ from: "A", to: "B", weight: 3 }, { from: "B", to: "C", weight: 5 }] } },
    answer("y8-net-fun-p13", "A network has 5 vertices with degrees 3, 2, 2, 2, 1. How many edges does it have?", "\\text{Edges} = \\;?", "5", "Sum $= 3+2+2+2+1 = 10$, so edges $= 10 \\div 2 = 5$.", "Add the degrees and halve.", [], 3),
    { ...answer("y8-net-fun-p14", "Find the degree of vertex C in the network shown.", "\\deg(C) = \\;?", "3", "C meets AC, BC and CD, so $\\deg(C) = 3$.", "List every edge containing C.", [], 3), diagram: { description: "Undirected network with vertices A, B, C, D. Edges: A-B, A-C, A-D, B-C, C-D. Vertex C meets three edges.", vertices: [{ id: "A", label: "A", x: 90, y: 80 }, { id: "B", label: "B", x: 320, y: 80 }, { id: "C", label: "C", x: 320, y: 260 }, { id: "D", label: "D", x: 90, y: 260 }], edges: [{ from: "A", to: "B" }, { from: "A", to: "C" }, { from: "A", to: "D" }, { from: "B", to: "C" }, { from: "C", to: "D" }] } },
    { ...answer("y8-net-fun-p15", "How many edges does the network shown have?", "\\text{Edges} = \\;?", "5", "AB, AC, AD, AE and BC is 5 edges.", "Count each line once.", [], 3), diagram: { description: "Undirected network with vertices A, B, C, D, E. Edges: A-B, A-C, A-D, A-E, B-C.", vertices: [{ id: "A", label: "A", x: 210, y: 170 }, { id: "B", label: "B", x: 210, y: 50 }, { id: "C", label: "C", x: 340, y: 170 }, { id: "D", label: "D", x: 270, y: 290 }, { id: "E", label: "E", x: 80, y: 170 }], edges: [{ from: "A", to: "B" }, { from: "A", to: "C" }, { from: "A", to: "D" }, { from: "A", to: "E" }, { from: "B", to: "C" }] } },
    answer("y8-net-fun-p16", "A network has 6 vertices with degrees 3, 3, 2, 2, 1, 1. How many edges does it have?", "\\text{Edges} = \\;?", "6", "Sum $= 12$, so edges $= 12 \\div 2 = 6$.", "Halve the degree sum.", [], 3),
    choice("y8-net-fun-p17", "A network has degree sum 16. How many edges has it?", "C", ["16", "4", "8", "32"], "Edges $= 16 \\div 2 = 8$.", "Halve the degree sum.", 3),
    { ...answer("y8-net-fun-p18", "Using the weighted network shown, find the A-to-D distance via B and C.", "AB + BC + CD = \\;?", "12", "$2 + 4 + 6 = 12$ km.", "Add the three edge weights.", ["12 km"], 3), diagram: { description: "Undirected weighted road network with towns A, B, C, D in a path. Edge weights (km): A-B = 2, B-C = 4, C-D = 6.", vertices: [{ id: "A", label: "A", x: 70, y: 150 }, { id: "B", label: "B", x: 180, y: 150 }, { id: "C", label: "C", x: 290, y: 150 }, { id: "D", label: "D", x: 400, y: 150 }], edges: [{ from: "A", to: "B", weight: 2 }, { from: "B", to: "C", weight: 4 }, { from: "C", to: "D", weight: 6 }] } },
    { ...answer("y8-net-fun-p19", "In the network shown every pair of the four vertices is joined. Find the degree of vertex A.", "\\deg(A) = \\;?", "3", "A joins to B, C and D, so $\\deg(A) = 3$.", "Count how many other vertices A connects to.", [], 4), diagram: { description: "Complete network on vertices A, B, C, D with every pair joined. Edges: A-B, A-C, A-D, B-C, B-D, C-D. Each vertex has degree 3.", vertices: [{ id: "A", label: "A", x: 90, y: 80 }, { id: "B", label: "B", x: 320, y: 80 }, { id: "C", label: "C", x: 320, y: 260 }, { id: "D", label: "D", x: 90, y: 260 }], edges: [{ from: "A", to: "B" }, { from: "A", to: "C" }, { from: "A", to: "D" }, { from: "B", to: "C" }, { from: "B", to: "D" }, { from: "C", to: "D" }] } },
    { ...answer("y8-net-fun-p20", "In the network shown every vertex is joined to every other. Find the degree of any vertex.", "\\deg = \\;?", "4", "Each vertex joins the other 4, so each has degree 4.", "Each vertex connects to all the others.", [], 4), diagram: { description: "Complete network on 5 vertices A, B, C, D, E with every pair joined. Each vertex has degree 4.", vertices: [{ id: "A", label: "A", x: 210, y: 60 }, { id: "B", label: "B", x: 330, y: 145 }, { id: "C", label: "C", x: 285, y: 280 }, { id: "D", label: "D", x: 135, y: 280 }, { id: "E", label: "E", x: 90, y: 145 }], edges: [{ from: "A", to: "B" }, { from: "A", to: "C" }, { from: "A", to: "D" }, { from: "A", to: "E" }, { from: "B", to: "C" }, { from: "B", to: "D" }, { from: "B", to: "E" }, { from: "C", to: "D" }, { from: "C", to: "E" }, { from: "D", to: "E" }] } },
    { ...answer("y8-net-fun-p21", "In the network shown every vertex is joined to every other. How many edges in total?", "\\text{Edges} = \\;?", "10", "Each of 5 vertices has degree 4, sum $= 20$, edges $= 20 \\div 2 = 10$.", "Find the degree of each, add, then halve.", [], 4), diagram: { description: "Complete network on 5 vertices A, B, C, D, E with every pair joined. There are 10 edges in total.", vertices: [{ id: "A", label: "A", x: 210, y: 60 }, { id: "B", label: "B", x: 330, y: 145 }, { id: "C", label: "C", x: 285, y: 280 }, { id: "D", label: "D", x: 135, y: 280 }, { id: "E", label: "E", x: 90, y: 145 }], edges: [{ from: "A", to: "B" }, { from: "A", to: "C" }, { from: "A", to: "D" }, { from: "A", to: "E" }, { from: "B", to: "C" }, { from: "B", to: "D" }, { from: "B", to: "E" }, { from: "C", to: "D" }, { from: "C", to: "E" }, { from: "D", to: "E" }] } },
    answer("y8-net-fun-p22", "A network has 7 vertices each of degree 2. How many edges does it have?", "\\text{Edges} = \\;?", "7", "Sum $= 7 \\times 2 = 14$, edges $= 14 \\div 2 = 7$.", "Multiply, then halve.", [], 4),
    answer("y8-net-fun-p23", "A network has 4 vertices with degrees 3, 3, 3 and an unknown degree d. If it has 6 edges, find d.", "d = \\;?", "3", "Degree sum $= 2 \\times 6 = 12$. So $3+3+3+d = 12$, giving $d = 3$.", "The degree sum is twice the number of edges.", [], 4),
    answer("y8-net-fun-p24", "A network has 6 edges. What is the sum of all its vertex degrees?", "\\text{Degree sum} = \\;?", "12", "Degree sum $= 2 \\times \\text{edges} = 2 \\times 6 = 12$.", "Degree sum is twice the edge count.", [], 4),
    answer("y8-net-fun-p25", "Towns A, B, C, D form a square with roads AB = 5, BC = 5, CD = 5, DA = 5 and a diagonal AC = 7. Find the shorter distance from A to C.", "\\text{Shorter of } AC \\text{ and } AB+BC = \\;?", "7", "Direct AC $= 7$; via B is $5 + 5 = 10$. The shorter is the diagonal, 7 km.", "Compare the direct edge with the two-edge route.", ["7 km"], 5),
    choice("y8-net-fun-p26", "A network has vertices A, B, C, D, E. Vertex A is joined to all others; no other edges exist. What is the degree of B?", "A", ["1", "2", "3", "4"], "Only edge at B is AB, so $\\deg(B) = 1$. (A has degree 4.)", "B connects only to A.", 5),
    answer("y8-net-fun-p27", "A network has 5 vertices with degrees 4, 3, 3, 2 and an unknown d, and 7 edges. Find d.", "d = \\;?", "2", "Degree sum $= 2 \\times 7 = 14$. So $4+3+3+2+d = 14$, giving $d = 2$.", "Use degree sum $= 2 \\times$ edges.", [], 5),
    answer("y8-net-fun-p28", "A 'star' network has 1 centre joined to 6 outer vertices and no other edges. How many edges in total?", "\\text{Edges} = \\;?", "6", "The centre connects to 6 outer vertices: 6 edges. (Degree sum $= 6 + 6 \\times 1 = 12$, edges $= 6$.)", "Count the spokes from the centre.", [], 5),
    answer("y8-net-fun-p29", "A network has 8 vertices each of degree 3. How many edges does it have?", "\\text{Edges} = \\;?", "12", "Sum $= 8 \\times 3 = 24$, edges $= 24 \\div 2 = 12$.", "Multiply, then halve.", [], 5),
    answer("y8-net-fun-p30", "A network has degree sum 22 and you know one vertex has degree 5. What is the number of edges?", "\\text{Edges} = \\;?", "11", "Edges $= 22 \\div 2 = 11$ (the individual degree of 5 does not change the total).", "Halve the degree sum.", [], 5),
  ],
  multiPartPractice: [
    {
      id: "y8-net-fun-mp1",
      prompt:
        "A network has vertices A, B, C, D, E with edges AB, AC, AD, AE, BC and CD.",
      latex: "\\text{Edges: } AB, AC, AD, AE, BC, CD",
      answer: "6",
      hint: "Count edges, then count the lines meeting A, then use the degree-sum rule.",
      explanation:
        "Part (a): the listed edges AB, AC, AD, AE, BC, CD number 6. Part (b): A is an end of AB, AC, AD, AE, so deg(A) = 4. Part (c): degree sum = 2 x 6 = 12.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many edges does the network have?",
          latex: "\\text{Edges} = \\;?",
          marks: 1,
          answer: "6",
          acceptedAnswers: [],
          hint: "Count each listed pair once.",
          explanation: "AB, AC, AD, AE, BC, CD is 6 edges.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the degree of vertex A.",
          latex: "\\deg(A) = \\;?",
          marks: 1,
          answer: "4",
          acceptedAnswers: [],
          hint: "Count the edges that touch A.",
          explanation: "A meets AB, AC, AD and AE, so deg(A) = 4.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the sum of all the vertex degrees.",
          latex: "\\text{Degree sum} = \\;?",
          marks: 1,
          answer: "12",
          acceptedAnswers: [],
          hint: "The degree sum is twice the number of edges.",
          explanation: "Degree sum = 2 x (edges) = 2 x 6 = 12.",
        },
      ],
    },
  ],
};

// ── Lesson 2: Paths and Circuits ─────────────────────────────────────────────

const pathsAndCircuits: LessonContent = {
  description:
    "Distinguish walks, trails, paths and circuits in a network, decide whether a network is connected, and count the number of routes between two vertices.",
  learningIntention:
    "Use the language of walks, trails, paths and circuits to describe journeys through a network, test connectedness, and count routes.",
  successCriteria: [
    "Describe a journey through a network as a sequence of vertices and edges.",
    "Tell the difference between a walk, a trail, a path and a circuit.",
    "Decide whether a network is connected.",
    "Count the number of paths between two given vertices.",
    "Recognise that a circuit starts and finishes at the same vertex.",
    "Explain why repeating edges or vertices changes the type of journey.",
  ],
  teaching: {
    paragraphs: [
      "Once you have a network, the interesting question is how you move around it. A journey through a network is a sequence of vertices joined by edges — like reading off the stations you pass on a train trip. We give different journeys different names depending on whether you are allowed to repeat edges or vertices.",
      "Start with the most general one. A walk is any journey along edges, with no restrictions — you may reuse edges and revisit vertices as much as you like. For example, in a square A–B–C–D–A you could walk A to B to A to B again; that is a perfectly valid walk, just a wasteful one.",
      "A trail is a walk that never repeats an edge, though it may revisit a vertex. A path is stricter still: it never repeats a vertex (and therefore never repeats an edge either). So a path is the 'clean' kind of route — each stop is visited at most once. In the square, A to B to C to D is a path; A to B to C to A to D is not a path because A is visited twice.",
      "A circuit (also called a cycle when it is also a path) is a journey that starts and finishes at the same vertex without repeating an edge. Think of a lap: you leave home and return home. In the square, A to B to C to D to A is a circuit because it ends where it began and uses each edge once.",
      "A network is connected if you can get from any vertex to any other vertex by some walk. If the network splits into separate pieces with no edges between them — like two islands with no bridge — it is disconnected. A quick test: pick a vertex and see whether you can reach every other vertex; if even one is unreachable, the network is not connected.",
      "Counting routes is a careful listing job. To count the paths from A to D, write down every route that never repeats a vertex, and make sure you do not miss any or count the same one twice. For a small network it is best to be systematic: list routes of length 1 first (a single edge), then length 2, then length 3, and so on.",
      "The most common error is mixing up the names. Remember the hierarchy from loosest to strictest: walk (anything), trail (no repeated edge), path (no repeated vertex). And a circuit is special because of where it ends — back at the start. Keep asking 'did I repeat an edge?' and 'did I repeat a vertex?' and the right label follows.",
    ],
    latexBlocks: [
      "\\text{walk: edges and vertices may repeat}",
      "\\text{trail: no repeated edge} \\qquad \\text{path: no repeated vertex}",
      "\\text{circuit: starts and ends at the same vertex, no repeated edge}",
    ],
  },
  workedExamples: [
    {
      title: "Name the type of journey",
      questionLatex:
        "\\text{In a square } A\\text{–}B\\text{–}C\\text{–}D\\text{–}A, \\text{ what type of journey is } A \\to B \\to C \\to D \\to A?",
      steps: [
        { explanation: "Check for repeated edges: each of AB, BC, CD, DA is used once, so no edge repeats.", latex: "AB, BC, CD, DA \\text{ — all different}" },
        { explanation: "Check the start and end: it begins and ends at A.", latex: "\\text{start} = \\text{end} = A" },
      ],
      finalAnswerLatex: "\\text{It is a circuit.}",
    } as WorkedExample,
    {
      title: "Decide if a network is connected",
      questionLatex:
        "\\text{A network has edges } AB, BC \\text{ and a separate edge } DE. \\text{ Is it connected?}",
      steps: [
        { explanation: "Start at A and see which vertices you can reach.", latex: "A \\to B \\to C \\quad (\\text{reaches } A, B, C)" },
        { explanation: "Check whether D and E can be reached from A — there is no edge linking the two groups.", latex: "D, E \\text{ are unreachable from } A" },
      ],
      finalAnswerLatex: "\\text{Not connected (it has two separate pieces).}",
    } as WorkedExample,
    {
      title: "Count paths between two vertices",
      questionLatex:
        "\\text{A network has edges } AB, AC, BD, CD. \\text{ How many paths go from } A \\text{ to } D?",
      steps: [
        { explanation: "List routes from A that never repeat a vertex and end at D.", latex: "A \\to B \\to D \\quad \\text{and} \\quad A \\to C \\to D" },
        { explanation: "Count the distinct paths found.", latex: "2 \\text{ paths}" },
      ],
      finalAnswerLatex: "2 \\text{ paths}",
    } as WorkedExample,
    {
      title: "Distinguish a trail from a path",
      questionLatex:
        "\\text{In the network } AB, BC, CA, CD, \\text{ classify the journey } A \\to B \\to C \\to A \\to ? \\;\\; \\text{Is } A \\to B \\to C \\to A \\text{ a path?}",
      steps: [
        { explanation: "Check for a repeated vertex: A appears at the start and again at the end.", latex: "A \\ldots A \\Rightarrow \\text{vertex } A \\text{ repeats}" },
        { explanation: "A path forbids any repeated vertex, but no edge repeats, so it qualifies as a trail (and a circuit).", latex: "\\text{trail/circuit, not a path}" },
      ],
      finalAnswerLatex: "\\text{It is a circuit (and a trail), but not a path.}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-net-pc-g1",
      "A journey starts and ends at the same vertex and repeats no edge. What is it called?",
      "C",
      [
        "A path",
        "A trail",
        "A circuit",
        "A vertex",
      ],
      "A journey that returns to its start without repeating an edge is a circuit.",
      "Think about where the journey finishes.",
    ),
    choice(
      "y8-net-pc-g2",
      "Which journey is a path (no repeated vertex), given edges AB, BC, CD, DA?",
      "A",
      [
        "$A \\to B \\to C \\to D$",
        "$A \\to B \\to A \\to D$",
        "$A \\to B \\to C \\to A$",
        "$A \\to B \\to C \\to B$",
      ],
      "$A \\to B \\to C \\to D$ visits each vertex at most once, so it is a path. The others repeat a vertex.",
      "A path never visits the same vertex twice.",
    ),
    answer(
      "y8-net-pc-g3",
      "A network has edges AB, AC, BD, CD. How many paths go from A to D?",
      "\\text{Number of paths } A \\to D = \\;?",
      "2",
      "The paths are $A \\to B \\to D$ and $A \\to C \\to D$, so there are 2.",
      "List routes that never repeat a vertex.",
    ),
    choice(
      "y8-net-pc-g4",
      "A network has edges AB and CD only (4 vertices). Is it connected?",
      "B",
      [
        "Yes, every vertex is reachable from every other.",
        "No, it splits into two separate pieces.",
        "Yes, because it has 4 vertices.",
        "No, because it has only 2 edges.",
      ],
      "A and B form one piece; C and D form another, with no edge between them, so the network is disconnected.",
      "Try to travel from A to C — is there a route?",
    ),
  ],
  independentPractice: [
    choice(
      "y8-net-pc-i1",
      "A walk is best described as:",
      "D",
      [
        "A journey that repeats no vertex.",
        "A journey that starts and ends at the same vertex.",
        "A journey that repeats no edge.",
        "Any journey along edges, where edges and vertices may repeat.",
      ],
      "A walk is the most general journey — repeats of edges and vertices are allowed.",
      "Walk is the least restrictive of the journey types.",
    ),
    answer(
      "y8-net-pc-i2",
      "A network has edges AB, AC, AD, with B, C, D each also joined to E (edges BE, CE, DE). How many paths go from A to E?",
      "\\text{Number of paths } A \\to E = \\;?",
      "3",
      "The paths are $A \\to B \\to E$, $A \\to C \\to E$ and $A \\to D \\to E$, so 3 paths.",
      "Each middle vertex gives one path from A to E.",
    ),
    choice(
      "y8-net-pc-i3",
      "Given edges AB, BC, CD, DA, which journey is a circuit?",
      "A",
      [
        "$A \\to B \\to C \\to D \\to A$",
        "$A \\to B \\to C \\to D$",
        "$A \\to B \\to C$",
        "$A \\to B$",
      ],
      "$A \\to B \\to C \\to D \\to A$ returns to its start using each edge once — a circuit.",
      "A circuit must finish where it started.",
    ),
    answer(
      "y8-net-pc-i4",
      "A network has edges AB, BC, CA (a triangle) and a separate edge DE. How many vertices can be reached from A (including A itself)?",
      "\\text{Vertices reachable from } A = \\;?",
      "3",
      "From A you reach A, B and C, but not D or E, so 3 vertices are reachable.",
      "Follow edges out of A and see where you can go.",
    ),
    choice(
      "y8-net-pc-i5",
      "Which statement is true about a path?",
      "C",
      [
        "A path may repeat vertices but not edges.",
        "A path always returns to its start.",
        "A path never repeats a vertex.",
        "A path must use every edge.",
      ],
      "A path never repeats a vertex (and so never repeats an edge either).",
      "Recall the strictness order: walk, trail, path.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Calling any closed journey a 'path' when it returns to its start.",
      fix: "A path never repeats a vertex, so it cannot return to its start. A journey that returns to its start (no repeated edge) is a circuit.",
    },
    {
      mistake: "Confusing a trail with a path.",
      fix: "A trail forbids repeating an edge; a path forbids repeating a vertex. A path is stricter — every path is a trail, but not every trail is a path.",
    },
    {
      mistake: "Declaring a network connected just because it has many edges.",
      fix: "Connectedness depends on reachability, not edge count. Check that you can travel from one chosen vertex to every other vertex.",
    },
    {
      mistake: "Missing routes or double-counting when listing paths.",
      fix: "Be systematic: list paths by length (1 edge, then 2, then 3 …) and check each visits no vertex twice. That way you neither skip nor repeat a route.",
    },
  ],
  masteryQuiz: [
    choice(
      "y8-net-pc-m1",
      "A journey that never repeats an edge but may revisit a vertex is called a:",
      "B",
      [
        "Path",
        "Trail",
        "Circuit",
        "Walk only",
      ],
      "A trail forbids repeated edges but allows revisiting a vertex.",
      "Which restriction is on edges only?",
    ),
    answer(
      "y8-net-pc-m2",
      "A network has edges AB, AC, BD, CD. How many paths go from A to D?",
      "\\text{Paths } A \\to D = \\;?",
      "2",
      "$A \\to B \\to D$ and $A \\to C \\to D$ give 2 paths.",
      "List vertex-non-repeating routes to D.",
    ),
    choice(
      "y8-net-pc-m3",
      "A network has edges AB, BC and a separate edge DE. Is it connected?",
      "B",
      [
        "Yes",
        "No — D and E cannot be reached from A.",
        "Yes, because all vertices have edges.",
        "Only if you add a weight.",
      ],
      "There is no edge linking {A, B, C} to {D, E}, so the network is disconnected.",
      "Try to reach D from A.",
    ),
    choice(
      "y8-net-pc-m4",
      "Given edges AB, BC, CD, DA, which journey is a path?",
      "A",
      [
        "$A \\to B \\to C \\to D$",
        "$A \\to B \\to C \\to D \\to A$",
        "$A \\to B \\to A$",
        "$A \\to B \\to C \\to B$",
      ],
      "$A \\to B \\to C \\to D$ repeats no vertex, so it is a path. The others repeat a vertex.",
      "A path repeats no vertex.",
    ),
    answer(
      "y8-net-pc-m5",
      "A network has edges AB, AC, AD, all four vertices also joined to E (BE, CE, DE). How many paths go from A to E?",
      "\\text{Paths } A \\to E = \\;?",
      "3",
      "$A \\to B \\to E$, $A \\to C \\to E$, $A \\to D \\to E$ — 3 paths.",
      "Each middle vertex gives one path.",
    ),
    choice(
      "y8-net-pc-m6",
      "Which journey, on edges AB, BC, CA, is a circuit?",
      "A",
      [
        "$A \\to B \\to C \\to A$",
        "$A \\to B \\to C$",
        "$A \\to B$",
        "$A \\to B \\to A$",
      ],
      "$A \\to B \\to C \\to A$ returns to A using each edge once — a circuit. ($A \\to B \\to A$ reuses edge AB.)",
      "A circuit returns to start with no repeated edge.",
    ),
    answer(
      "y8-net-pc-m7",
      "A triangle ABC has a separate edge DE. How many vertices are reachable from D (including D)?",
      "\\text{Vertices reachable from } D = \\;?",
      "2",
      "From D you can reach D and E only, so 2 vertices.",
      "Follow edges out of D.",
    ),
    choice(
      "y8-net-pc-m8",
      "Order the journey types from least to most restrictive.",
      "C",
      [
        "Path, trail, walk",
        "Trail, path, walk",
        "Walk, trail, path",
        "Walk, path, trail",
      ],
      "Walk allows anything, trail forbids repeated edges, path forbids repeated vertices — so walk, trail, path.",
      "Walk is the loosest; path is the strictest.",
    ),
    answer(
      "y8-net-pc-m9",
      "A network has edges AB, AC, BC, BD, CD. How many paths go from A to D? (List routes that repeat no vertex.)",
      "\\text{Paths } A \\to D = \\;?",
      "4",
      "Paths: $A \\to B \\to D$, $A \\to C \\to D$, $A \\to B \\to C \\to D$, $A \\to C \\to B \\to D$ — 4 in total.",
      "Try going directly and also via the other middle vertex.",
    ),
    choice(
      "y8-net-pc-m10",
      "Why is $A \\to B \\to C \\to A \\to D$ NOT a path, on edges AB, BC, CA, AD?",
      "B",
      [
        "Because it repeats edge AB.",
        "Because it repeats vertex A.",
        "Because it is too long.",
        "Because it ends at D.",
      ],
      "Vertex A appears twice, so it cannot be a path (which forbids repeated vertices).",
      "Check whether any vertex appears more than once.",
    ),
  ],
  masteryQuizPool: [
    choice("y8-net-pc-p1", "What is a journey called if it may repeat both edges and vertices?", "A", ["A walk", "A path", "A circuit", "A trail"], "A walk is the most general journey with no restrictions.", "It is the loosest type.", 1),
    choice("y8-net-pc-p2", "A circuit must:", "B", ["repeat every edge.", "start and finish at the same vertex.", "visit only two vertices.", "have a weight."], "A circuit returns to its starting vertex without repeating an edge.", "Think about where it ends.", 1),
    answer("y8-net-pc-p3", "A network has edges AB, BC. How many paths go from A to C?", "\\text{Paths } A \\to C = \\;?", "1", "Only $A \\to B \\to C$, so 1 path.", "List vertex-non-repeating routes.", [], 1),
    choice("y8-net-pc-p4", "A path is a journey that:", "C", ["repeats every vertex.", "uses every edge.", "repeats no vertex.", "returns to its start."], "A path repeats no vertex.", "Recall the definition.", 1),
    answer("y8-net-pc-p5", "A network has edges AB and CD only. How many vertices can A reach (including A)?", "\\text{Reachable from } A = \\;?", "2", "A reaches A and B only, so 2 vertices.", "Follow edges from A.", [], 1),
    choice("y8-net-pc-p6", "A trail forbids:", "A", ["repeated edges.", "repeated vertices.", "returning to the start.", "weights."], "A trail forbids repeating an edge (vertices may repeat).", "Trail is about edges.", 1),
    answer("y8-net-pc-p7", "A network has edges AB, AC, BD, CD. How many paths from A to D?", "\\text{Paths } A \\to D = \\;?", "2", "$A \\to B \\to D$ and $A \\to C \\to D$ give 2 paths.", "List routes with no repeated vertex.", [], 2),
    choice("y8-net-pc-p8", "Which journey is a circuit on edges AB, BC, CD, DA?", "A", ["$A \\to B \\to C \\to D \\to A$", "$A \\to B \\to C \\to D$", "$A \\to B \\to C$", "$A \\to B$"], "It returns to A using each edge once — a circuit.", "Must finish at the start.", 2),
    choice("y8-net-pc-p9", "A network has edges AB, BC and DE. Is it connected?", "B", ["Yes", "No", "Yes, if you add a weight", "Only at vertex B"], "{A,B,C} and {D,E} are separate, so it is disconnected.", "Try to reach D from A.", 2),
    answer("y8-net-pc-p10", "A network has edges AB, AC, AD with B, C, D each joined to E. How many paths from A to E?", "\\text{Paths } A \\to E = \\;?", "3", "$A \\to B \\to E$, $A \\to C \\to E$, $A \\to D \\to E$.", "One path per middle vertex.", [], 2),
    choice("y8-net-pc-p11", "Which is NOT a path on edges AB, BC, CA?", "C", ["$A \\to B$", "$A \\to B \\to C$", "$A \\to B \\to C \\to A$", "$B \\to C$"], "$A \\to B \\to C \\to A$ repeats vertex A, so it is not a path.", "Look for a repeated vertex.", 2),
    answer("y8-net-pc-p12", "A triangle ABC plus separate edge DE. How many vertices reachable from B (including B)?", "\\text{Reachable from } B = \\;?", "3", "From B you reach A, B, C, so 3 vertices.", "Follow edges from B.", [], 2),
    answer("y8-net-pc-p13", "A network has edges AB, AC, BC, BD, CD. How many paths from A to D?", "\\text{Paths } A \\to D = \\;?", "4", "$A \\to B \\to D$, $A \\to C \\to D$, $A \\to B \\to C \\to D$, $A \\to C \\to B \\to D$.", "Try direct and via the other middle vertex.", [], 3),
    choice("y8-net-pc-p14", "Every path is also a trail because:", "A", ["repeating no vertex means repeating no edge.", "trails are shorter.", "paths return to start.", "all journeys are trails."], "If you never revisit a vertex, you can never reuse an edge, so a path is automatically a trail.", "An edge needs both its endpoints.", 3),
    answer("y8-net-pc-p15", "A square ABCD (edges AB, BC, CD, DA) plus diagonal AC. How many paths from A to C?", "\\text{Paths } A \\to C = \\;?", "3", "$A \\to C$ (diagonal), $A \\to B \\to C$, $A \\to D \\to C$.", "Include the direct diagonal and the two side routes.", [], 3),
    choice("y8-net-pc-p16", "A network of 5 vertices is connected when:", "B", ["it has 5 edges.", "every vertex can be reached from every other.", "every vertex has degree 2.", "it has no circuit."], "Connected means any vertex can reach any other.", "Connectedness is about reachability.", 3),
    answer("y8-net-pc-p17", "Edges AB, BC, CD, DA, AC. How many paths from A to D?", "\\text{Paths } A \\to D = \\;?", "3", "$A \\to D$ (edge DA), $A \\to C \\to D$, $A \\to B \\to C \\to D$.", "Use the direct edge and the routes via C.", [], 3),
    choice("y8-net-pc-p18", "Which journey is a trail but NOT a path on edges AB, BC, CA, CD?", "B", ["$A \\to B \\to C \\to D$", "$A \\to B \\to C \\to A$", "$A \\to B$", "$C \\to D$"], "$A \\to B \\to C \\to A$ repeats no edge (trail) but repeats vertex A (not a path).", "Find one that reuses a vertex but no edge.", 3),
    answer("y8-net-pc-p19", "A network has 5 vertices A–E in a line: AB, BC, CD, DE. How many paths from A to E?", "\\text{Paths } A \\to E = \\;?", "1", "Only $A \\to B \\to C \\to D \\to E$, so 1 path.", "There is just one way along the line.", [], 4),
    answer("y8-net-pc-p20", "Edges AB, AC, BC, CD, BD. How many paths from A to D?", "\\text{Paths } A \\to D = \\;?", "4", "$A \\to B \\to D$, $A \\to C \\to D$, $A \\to B \\to C \\to D$, $A \\to C \\to B \\to D$.", "Direct via each middle vertex, then the two longer routes.", [], 4),
    answer("y8-net-pc-p21", "A network where all of A, B, C, D are joined to each other. How many paths of exactly 2 edges go from A to D?", "\\text{Two-edge paths } A \\to D = \\;?", "2", "$A \\to B \\to D$ and $A \\to C \\to D$ are the only 2-edge paths.", "The middle vertex is B or C.", [], 4),
    choice("y8-net-pc-p22", "A network splits into two pieces of 3 and 2 vertices. The network is:", "B", ["connected.", "disconnected.", "a circuit.", "weighted."], "Two separate pieces with no joining edge means disconnected.", "Can you cross between the pieces?", 4),
    answer("y8-net-pc-p23", "A 'fan': vertex A joined to B, C, D, E, and also edges BC, CD, DE. How many paths of exactly 2 edges from A to D? (A–C–D and A–E–D)", "\\text{Two-edge paths } A \\to D = \\;?", "2", "Two-edge paths to D: $A \\to C \\to D$ and $A \\to E \\to D$.", "Which neighbours of D are also joined to A?", [], 4),
    choice("y8-net-pc-p24", "If a network has a vertex of degree 0, the network is:", "B", ["always connected.", "disconnected (that vertex is isolated).", "a circuit.", "a single edge."], "A degree-0 vertex has no edges, so it cannot be reached — the network is disconnected.", "Can you reach a vertex with no edges?", 4),
    answer("y8-net-pc-p25", "Complete network on 4 vertices A, B, C, D (all pairs joined). How many paths from A to D in total (any length)?", "\\text{Total paths } A \\to D = \\;?", "5", "$A\\to D$; $A\\to B\\to D$, $A\\to C\\to D$; $A\\to B\\to C\\to D$, $A\\to C\\to B\\to D$. Total 5.", "Count length 1, then 2, then 3.", [], 5),
    answer("y8-net-pc-p26", "A network has 5 vertices A–E, complete (every pair joined). How many paths of exactly 2 edges from A to E?", "\\text{Two-edge paths } A \\to E = \\;?", "3", "Middle vertex is B, C or D: $A\\to B\\to E$, $A\\to C\\to E$, $A\\to D\\to E$ — 3 paths.", "Any of the 3 other vertices can be the middle.", [], 5),
    choice("y8-net-pc-p27", "A journey uses edges AB, BC, CA, AB. This journey is:", "C", ["a path.", "a trail.", "a walk only (it repeats edge AB).", "a circuit."], "Edge AB is used twice, so it is not a trail, path or simple circuit — just a walk.", "Did any edge get reused?", 5),
    answer("y8-net-pc-p28", "Square ABCD with both diagonals (edges AB, BC, CD, DA, AC, BD). How many paths of exactly 2 edges from A to C?", "\\text{Two-edge paths } A \\to C = \\;?", "2", "$A \\to B \\to C$ and $A \\to D \\to C$ are the 2-edge paths (the direct AC is length 1).", "Use the two corner routes.", [], 5),
    answer("y8-net-pc-p29", "A line A–B–C–D–E (edges AB, BC, CD, DE). How many paths from B to E?", "\\text{Paths } B \\to E = \\;?", "1", "Only $B \\to C \\to D \\to E$, so 1 path.", "Just one way along the line.", [], 5),
    choice("y8-net-pc-p30", "Which makes a disconnected network connected?", "A", ["Adding an edge between the two separate pieces.", "Removing a vertex.", "Adding a weight to an edge.", "Renaming a vertex."], "An edge joining the two pieces lets you travel between them, making the network connected.", "You need a bridge between the pieces.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-net-pc-mp1",
      prompt:
        "A network has vertices A, B, C, D with edges AB, AC, BC, BD and CD.",
      latex: "\\text{Edges: } AB, AC, BC, BD, CD",
      answer: "4",
      hint: "List vertex-non-repeating routes A to D, then count edges, then find a reachable count.",
      explanation:
        "Part (a): paths A to D are A-B-D, A-C-D, A-B-C-D, A-C-B-D, so 4. Part (b): there are 5 edges. Part (c): from A you reach A, B, C, D, so 4 vertices (the network is connected).",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many paths go from A to D?",
          latex: "\\text{Paths } A \\to D = \\;?",
          marks: 2,
          answer: "4",
          acceptedAnswers: [],
          hint: "List routes that never repeat a vertex.",
          explanation: "A-B-D, A-C-D, A-B-C-D, A-C-B-D — 4 paths.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "How many edges does the network have?",
          latex: "\\text{Edges} = \\;?",
          marks: 1,
          answer: "5",
          acceptedAnswers: [],
          hint: "Count each listed pair once.",
          explanation: "AB, AC, BC, BD, CD is 5 edges.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How many vertices can be reached from A, including A itself?",
          latex: "\\text{Reachable from } A = \\;?",
          marks: 1,
          answer: "4",
          acceptedAnswers: [],
          hint: "Follow edges out of A.",
          explanation: "From A you can reach A, B, C and D, so 4 vertices.",
        },
      ],
    },
  ],
};

// ── Lesson 3: Eulerian Trails and Circuits ───────────────────────────────────

const eulerianTrailsCircuits: LessonContent = {
  description:
    "Decide whether a network has an Eulerian trail or Eulerian circuit by counting odd-degree vertices, and apply the traversability test to real diagrams.",
  learningIntention:
    "Use the count of odd-degree vertices to decide whether a network can be traced in one stroke (Eulerian trail or circuit).",
  successCriteria: [
    "Identify the odd-degree and even-degree vertices in a network.",
    "State that an Eulerian circuit exists exactly when every vertex has even degree.",
    "State that an Eulerian trail exists exactly when there are 0 or 2 odd-degree vertices.",
    "Apply the traversability test to decide if a network can be drawn in one stroke.",
    "Explain why odd-degree vertices control where a trail must start and finish.",
    "Find the start and finish vertices of an Eulerian trail when one exists.",
  ],
  teaching: {
    paragraphs: [
      "Here is a famous puzzle. Can you trace a whole network in one continuous stroke — pencil never leaving the paper, and never going over the same edge twice? Sometimes you can, sometimes you cannot, and there is a beautifully simple rule that decides it. The rule depends only on the degrees of the vertices.",
      "First, the vocabulary. A trail that uses every edge exactly once is an Eulerian trail. If that trail also ends where it started, it is an Eulerian circuit. So an Eulerian circuit is a 'one-stroke lap' that covers every edge and returns home; an Eulerian trail covers every edge but finishes somewhere different.",
      "Now think about a vertex in the middle of your one-stroke drawing. Every time your pencil arrives at that vertex along one edge, it must leave along a different edge. So edges at a middle vertex pair up — one in, one out — which means the vertex needs an even number of edges. An odd-degree vertex cannot be a clean pass-through; it must be either where you start or where you finish.",
      "That single observation gives the whole rule. If every vertex has even degree, there are no forced start/finish points, and you can make a complete lap returning to the start: that is an Eulerian circuit. If exactly two vertices have odd degree, those two must be the start and the finish, and a one-stroke Eulerian trail exists between them. If there are more than two odd-degree vertices, no single stroke can satisfy them all, so the network is not traversable in one stroke.",
      "Notice you can never have exactly one odd vertex. Remember the degree-sum rule from earlier: the degrees add to twice the number of edges, which is always even. An odd number of odd-degree vertices would make the sum odd — impossible. So odd-degree vertices always come in pairs: 0, 2, 4, and so on.",
      "Putting it together, the traversability test is: count the odd-degree vertices. If the count is 0, there is an Eulerian circuit (start anywhere, return there). If the count is 2, there is an Eulerian trail starting at one odd vertex and ending at the other. If the count is 4 or more, it cannot be traced in a single stroke.",
      "The most common mistake is to count edges or vertices instead of focusing on odd degrees. The total number of edges does not matter for traversability — only how many vertices have an odd degree. Always make a quick list of each vertex's degree, mark the odd ones, and read off the answer.",
    ],
    latexBlocks: [
      "\\text{Eulerian circuit exists} \\iff \\text{every vertex has even degree}",
      "\\text{Eulerian trail exists} \\iff \\text{exactly } 0 \\text{ or } 2 \\text{ odd-degree vertices}",
      "\\text{4 or more odd-degree vertices} \\Rightarrow \\text{not traversable in one stroke}",
    ],
  },
  workedExamples: [
    {
      title: "Test for an Eulerian circuit",
      questionLatex:
        "\\text{A triangle has edges } AB, BC, CA. \\text{ Does it have an Eulerian circuit?}",
      steps: [
        { explanation: "Find each vertex's degree.", latex: "\\deg(A)=2, \\deg(B)=2, \\deg(C)=2" },
        { explanation: "Count the odd-degree vertices — here there are none, so an Eulerian circuit exists.", latex: "0 \\text{ odd vertices} \\Rightarrow \\text{Eulerian circuit}" },
      ],
      finalAnswerLatex: "\\text{Yes — every vertex is even, so it has an Eulerian circuit.}",
    } as WorkedExample,
    {
      title: "Test for an Eulerian trail",
      questionLatex:
        "\\text{A network has edges } AB, BC, CD, DA, AC. \\text{ Is it traversable in one stroke?}",
      steps: [
        { explanation: "Find each degree: A is in AB, DA, AC; B in AB, BC; C in BC, CD, AC; D in CD, DA.", latex: "\\deg(A)=3, \\deg(B)=2, \\deg(C)=3, \\deg(D)=2" },
        { explanation: "Count odd-degree vertices: A and C are odd — exactly 2 — so an Eulerian trail exists.", latex: "2 \\text{ odd vertices} \\Rightarrow \\text{Eulerian trail from } A \\text{ to } C" },
      ],
      finalAnswerLatex: "\\text{Yes — an Eulerian trail exists, starting at } A \\text{ and ending at } C.",
    } as WorkedExample,
    {
      title: "A network that is not traversable",
      questionLatex:
        "\\text{A network has 4 vertices all joined to each other (edges } AB,AC,AD,BC,BD,CD). \\text{ Can it be drawn in one stroke?}",
      steps: [
        { explanation: "Each vertex joins the other 3, so every degree is 3.", latex: "\\deg(A)=\\deg(B)=\\deg(C)=\\deg(D)=3" },
        { explanation: "Count odd-degree vertices: all 4 are odd, which is more than 2.", latex: "4 \\text{ odd vertices} \\Rightarrow \\text{not traversable}" },
      ],
      finalAnswerLatex: "\\text{No — 4 odd-degree vertices means no single-stroke trail exists.}",
    } as WorkedExample,
    {
      title: "Decide the type and find start/finish",
      questionLatex:
        "\\text{A network has degrees } A{=}4, B{=}3, C{=}2, D{=}3, E{=}2. \\text{ Classify its traversability.}",
      steps: [
        { explanation: "Mark the odd-degree vertices.", latex: "B \\text{ and } D \\text{ are odd}" },
        { explanation: "Exactly 2 odd vertices, so an Eulerian trail exists, and it must start and finish at those two.", latex: "\\text{trail from } B \\text{ to } D" },
      ],
      finalAnswerLatex: "\\text{Eulerian trail, starting at } B \\text{ and finishing at } D.",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-net-eul-g1",
      "A network has degrees A = 2, B = 2, C = 2, D = 2. How many odd-degree vertices does it have?",
      "\\text{Number of odd-degree vertices} = \\;?",
      "0",
      "All four degrees are even, so there are 0 odd-degree vertices.",
      "Count the vertices whose degree is an odd number.",
    ),
    choice(
      "y8-net-eul-g2",
      "A network has 0 odd-degree vertices. Which is true?",
      "A",
      [
        "It has an Eulerian circuit.",
        "It has an Eulerian trail but no circuit.",
        "It is not traversable.",
        "It must be disconnected.",
      ],
      "With every vertex even (0 odd), an Eulerian circuit exists — a one-stroke lap back to the start.",
      "0 odd vertices is the circuit case.",
    ),
    answer(
      "y8-net-eul-g3",
      "A network has edges AB, BC, CD, DA, AC. How many odd-degree vertices does it have?",
      "\\text{Number of odd-degree vertices} = \\;?",
      "2",
      "Degrees: A = 3, B = 2, C = 3, D = 2. The odd ones are A and C, so 2.",
      "Find each degree first, then count the odd ones.",
    ),
    choice(
      "y8-net-eul-g4",
      "A network has 4 odd-degree vertices. Is it traversable in one stroke?",
      "B",
      [
        "Yes, with an Eulerian circuit.",
        "No — more than 2 odd vertices means it cannot be traced in one stroke.",
        "Yes, with an Eulerian trail.",
        "Only if it has 4 edges.",
      ],
      "An Eulerian trail needs 0 or 2 odd vertices. With 4, no single stroke works.",
      "Recall the 0-or-2 rule for odd vertices.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-net-eul-i1",
      "A network has edges AB, BC, CA (a triangle). How many odd-degree vertices does it have?",
      "\\text{Odd-degree vertices} = \\;?",
      "0",
      "Each vertex has degree 2 (even), so there are 0 odd-degree vertices.",
      "Find each degree, then count the odd ones.",
    ),
    choice(
      "y8-net-eul-i2",
      "A network has exactly 2 odd-degree vertices. Which is true?",
      "C",
      [
        "It has an Eulerian circuit.",
        "It is not traversable.",
        "It has an Eulerian trail (but not a circuit) between the two odd vertices.",
        "It must have 2 edges.",
      ],
      "With exactly 2 odd vertices, an Eulerian trail exists from one odd vertex to the other; it is not a circuit.",
      "2 odd vertices is the trail case.",
    ),
    answer(
      "y8-net-eul-i3",
      "A network has degrees A = 4, B = 4, C = 3, D = 3, E = 2. How many odd-degree vertices does it have?",
      "\\text{Odd-degree vertices} = \\;?",
      "2",
      "The odd degrees belong to C (3) and D (3), so 2 odd-degree vertices.",
      "Mark the vertices with odd degree.",
    ),
    choice(
      "y8-net-eul-i4",
      "Why can a network never have exactly 1 odd-degree vertex?",
      "A",
      [
        "Because the degree sum is always even, so odd vertices come in pairs.",
        "Because every network has at least 2 edges.",
        "Because all vertices must be even.",
        "Because a vertex cannot have odd degree.",
      ],
      "The sum of degrees equals $2 \\times$ edges, which is even. An odd count of odd vertices would make the sum odd, so odd vertices always pair up.",
      "Use the degree-sum rule from Lesson 1.",
    ),
    answer(
      "y8-net-eul-i5",
      "A bridge network has edges AB, AC, BC, BD, CD, and vertex degrees A = 2, B = 3, C = 3, D = 2. An Eulerian trail exists. At which two vertices must it start and finish? (Give the alphabetically first one.)",
      "\\text{Start/finish vertices are the odd ones; give the first} = \\;?",
      "B",
      "The odd-degree vertices are B and C, so the trail runs between B and C; the first alphabetically is B.",
      "An Eulerian trail starts and finishes at the odd-degree vertices.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Counting the number of edges or vertices instead of the number of odd-degree vertices.",
      fix: "Traversability depends only on how many vertices have odd degree. List each degree, mark the odd ones, and count those.",
    },
    {
      mistake: "Thinking 2 odd vertices gives an Eulerian circuit.",
      fix: "2 odd vertices gives an Eulerian trail (start and end differ). A circuit needs 0 odd vertices — every vertex even.",
    },
    {
      mistake: "Believing a network can have exactly 1 (or 3) odd-degree vertices.",
      fix: "Odd-degree vertices always come in pairs because the degree sum is even. The possible counts are 0, 2, 4, …",
    },
    {
      mistake: "Starting an Eulerian trail at an even-degree vertex.",
      fix: "When there are exactly 2 odd vertices, the trail must begin at one odd vertex and end at the other — not at an even one.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-net-eul-m1",
      "A network has degrees A = 2, B = 2, C = 2. How many odd-degree vertices does it have?",
      "\\text{Odd-degree vertices} = \\;?",
      "0",
      "All degrees are even, so 0 odd-degree vertices.",
      "Count vertices with odd degree.",
    ),
    choice(
      "y8-net-eul-m2",
      "A network with every vertex of even degree has:",
      "A",
      [
        "an Eulerian circuit.",
        "an Eulerian trail but no circuit.",
        "no Eulerian trail.",
        "exactly 2 odd vertices.",
      ],
      "All even (0 odd) gives an Eulerian circuit.",
      "0 odd is the circuit case.",
    ),
    answer(
      "y8-net-eul-m3",
      "A network has edges AB, BC, CD, DA, AC. How many odd-degree vertices does it have?",
      "\\text{Odd-degree vertices} = \\;?",
      "2",
      "Degrees A = 3, B = 2, C = 3, D = 2: odd ones are A and C, so 2.",
      "Find each degree, then count odd ones.",
    ),
    choice(
      "y8-net-eul-m4",
      "A network has 2 odd-degree vertices. Which is true?",
      "C",
      [
        "It has an Eulerian circuit.",
        "It is not traversable.",
        "It has an Eulerian trail between the two odd vertices.",
        "It has 0 edges.",
      ],
      "Exactly 2 odd vertices gives an Eulerian trail between them.",
      "2 odd is the trail case.",
    ),
    answer(
      "y8-net-eul-m5",
      "A network has 4 vertices all joined to each other. How many odd-degree vertices does it have?",
      "\\text{Odd-degree vertices} = \\;?",
      "4",
      "Each vertex has degree 3 (odd), so all 4 are odd.",
      "Find the degree of each vertex.",
    ),
    choice(
      "y8-net-eul-m6",
      "A network has 4 odd-degree vertices. Is it traversable in one stroke?",
      "B",
      [
        "Yes, Eulerian circuit.",
        "No.",
        "Yes, Eulerian trail.",
        "Only if connected.",
      ],
      "More than 2 odd vertices means no single-stroke trail.",
      "Use the 0-or-2 rule.",
    ),
    answer(
      "y8-net-eul-m7",
      "A network has degrees A = 4, B = 3, C = 2, D = 3, E = 4. How many odd-degree vertices?",
      "\\text{Odd-degree vertices} = \\;?",
      "2",
      "Odd degrees are B (3) and D (3), so 2.",
      "Mark vertices with odd degree.",
    ),
    choice(
      "y8-net-eul-m8",
      "An Eulerian trail (with 2 odd vertices) must:",
      "B",
      [
        "start and end at the same vertex.",
        "start at one odd vertex and end at the other.",
        "start at an even vertex.",
        "use each edge twice.",
      ],
      "The trail begins at one odd-degree vertex and finishes at the other.",
      "Odd vertices are the forced endpoints.",
    ),
    answer(
      "y8-net-eul-m9",
      "A network has degrees A = 2, B = 4, C = 2, D = 4, E = 2, F = 2. How many odd-degree vertices, and so how many edges if the degree sum is used? Give the number of odd-degree vertices.",
      "\\text{Odd-degree vertices} = \\;?",
      "0",
      "All degrees are even, so 0 odd-degree vertices (the network has an Eulerian circuit).",
      "Check whether any degree is odd.",
    ),
    choice(
      "y8-net-eul-m10",
      "A connected network has degrees 5, 5, 4, 4, 2. What can you say about traversing it in one stroke?",
      "C",
      [
        "It has an Eulerian circuit.",
        "It cannot be traversed (4 odd vertices).",
        "It has an Eulerian trail between the two degree-5 vertices.",
        "It has no edges.",
      ],
      "The odd-degree vertices are the two with degree 5 — exactly 2 — so an Eulerian trail runs between them.",
      "Count the odd degrees: only the 5s are odd.",
    ),
  ],
  masteryQuizPool: [
    answer("y8-net-eul-p1", "A network has degrees 2, 2, 2, 2. How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "0", "All even, so 0 odd vertices.", "Count odd degrees.", [], 1),
    answer("y8-net-eul-p2", "A network has degrees 3, 3, 2. How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "2", "The two 3s are odd, so 2.", "Find which degrees are odd.", [], 1),
    choice("y8-net-eul-p3", "An Eulerian circuit uses every edge:", "A", ["exactly once and returns to the start.", "twice.", "and never returns to start.", "only if weighted."], "An Eulerian circuit covers every edge once and ends where it began.", "Recall the definition.", 1),
    choice("y8-net-eul-p4", "0 odd-degree vertices means:", "B", ["not traversable.", "Eulerian circuit.", "Eulerian trail only.", "exactly 2 edges."], "0 odd vertices gives an Eulerian circuit.", "0 odd is the circuit case.", 1),
    answer("y8-net-eul-p5", "A triangle (edges AB, BC, CA). How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "0", "Each vertex has degree 2, so 0 odd.", "Each degree is 2.", [], 1),
    choice("y8-net-eul-p6", "An Eulerian trail needs how many odd-degree vertices?", "C", ["1", "3", "exactly 0 or 2", "4 or more"], "An Eulerian trail exists with exactly 0 or 2 odd vertices.", "Recall the 0-or-2 rule.", 1),
    answer("y8-net-eul-p7", "A network has edges AB, BC, CD, DA, AC. How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "2", "Degrees A=3, B=2, C=3, D=2: 2 odd.", "Find each degree.", [], 2),
    choice("y8-net-eul-p8", "2 odd-degree vertices means:", "B", ["Eulerian circuit.", "Eulerian trail between the odd vertices.", "not traversable.", "no edges."], "2 odd vertices gives an Eulerian trail.", "2 odd is the trail case.", 2),
    answer("y8-net-eul-p9", "A network has degrees 4, 4, 3, 3. How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "2", "The two 3s are odd, so 2.", "Mark odd degrees.", [], 2),
    choice("y8-net-eul-p10", "4 odd-degree vertices means the network is:", "B", ["traversable with a circuit.", "not traversable in one stroke.", "traversable with a trail.", "disconnected."], "More than 2 odd vertices means no one-stroke trail.", "Use the 0-or-2 rule.", 2),
    answer("y8-net-eul-p11", "A network of 4 mutually joined vertices. How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "4", "Each has degree 3 (odd), so 4.", "Each vertex joins 3 others.", [], 2),
    choice("y8-net-eul-p12", "Why can't a network have exactly 1 odd-degree vertex?", "A", ["The degree sum is even, so odd vertices pair up.", "All vertices are even.", "Networks need 2 edges.", "Degree cannot be odd."], "The degree sum equals 2 x edges (even), so odd vertices come in pairs.", "Use the degree-sum rule.", 2),
    answer("y8-net-eul-p13", "Degrees 4, 3, 3, 2, 2. How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "2", "The two 3s are odd, so 2.", "Mark odd degrees.", [], 3),
    choice("y8-net-eul-p14", "A connected network has degrees 2,2,2,2,2. It has:", "A", ["an Eulerian circuit.", "an Eulerian trail only.", "no Eulerian trail.", "4 odd vertices."], "All even (0 odd) gives an Eulerian circuit.", "Count odd degrees first.", 3),
    answer("y8-net-eul-p15", "Degrees 5, 4, 3, 2. How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "2", "Odd ones are 5 and 3, so 2.", "Find which degrees are odd.", [], 3),
    choice("y8-net-eul-p16", "A connected network with exactly 2 odd vertices, of degrees 3 and 5, has an Eulerian trail that:", "C", ["starts and ends at the even vertices.", "is also a circuit.", "starts at the degree-3 vertex and ends at the degree-5 vertex.", "uses each edge twice."], "The trail runs between the two odd-degree vertices.", "Odd vertices are the endpoints.", 3),
    answer("y8-net-eul-p17", "A network has edges AB, AC, AD, BC, BD, CD (4 vertices joined to all). How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "4", "Each vertex has degree 3, so all 4 are odd.", "Each vertex joins the other 3.", [], 3),
    choice("y8-net-eul-p18", "A connected network has degrees 3, 3, 2, 2. Best description:", "B", ["Eulerian circuit.", "Eulerian trail between the two degree-3 vertices.", "not traversable.", "no edges."], "2 odd vertices (the 3s) gives an Eulerian trail between them.", "Count odd degrees.", 3),
    answer("y8-net-eul-p19", "A network has degrees 6, 5, 4, 4, 3, 2. How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "2", "Odd degrees are 5 and 3, so 2 odd-degree vertices.", "Count the odd numbers in the list.", [], 4),
    answer("y8-net-eul-p20", "A connected network is drawn in one stroke and returns to its start. How many odd-degree vertices must it have?", "\\text{Odd vertices} = \\;?", "0", "A one-stroke lop returning to start is an Eulerian circuit, which needs 0 odd vertices.", "A returning one-stroke trail is a circuit.", [], 4),
    answer("y8-net-eul-p21", "A connected network can be drawn in one stroke but does NOT return to its start. How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "2", "A one-stroke trail with different start and finish needs exactly 2 odd vertices.", "Different start and finish means a trail, not a circuit.", [], 4),
    choice("y8-net-eul-p22", "A network has degrees 4, 4, 4, 3, 3, 2. Traversability?", "C", ["Eulerian circuit.", "not traversable.", "Eulerian trail between the two degree-3 vertices.", "disconnected."], "Exactly 2 odd vertices (the 3s) gives an Eulerian trail between them.", "Count the odd degrees.", 4),
    answer("y8-net-eul-p23", "A network has 5 vertices each of degree 4. How many odd-degree vertices, and does it have an Eulerian circuit? Give the number of odd vertices.", "\\text{Odd vertices} = \\;?", "0", "All degrees 4 (even), so 0 odd vertices and an Eulerian circuit exists.", "Are any degrees odd?", [], 4),
    choice("y8-net-eul-p24", "Adding one edge between the only two odd-degree vertices of a connected network changes it to:", "A", ["all even, so an Eulerian circuit.", "4 odd vertices.", "not traversable.", "disconnected."], "Joining the two odd vertices raises each of their degrees by 1, making them even — so 0 odd vertices and a circuit.", "Each new edge adds 1 to two vertices' degrees.", 4),
    answer("y8-net-eul-p25", "A network has degrees 7, 6, 5, 4, 3, 2, 1. How many odd-degree vertices?", "\\text{Odd vertices} = \\;?", "4", "Odd degrees: 7, 5, 3, 1 — that is 4 odd vertices.", "Count the odd numbers.", [], 5),
    choice("y8-net-eul-p26", "A connected network has 6 odd-degree vertices. The least number of strokes to draw it (each stroke a trail) is:", "C", ["1", "2", "3", "6"], "With 6 odd vertices you need 6/2 = 3 separate trails, since each trail uses up 2 odd vertices.", "Each trail accounts for 2 odd vertices.", 5),
    answer("y8-net-eul-p27", "A connected network has 2 odd-degree vertices and 8 edges. Can it be drawn in one stroke? Answer 1 for yes, 0 for no.", "\\text{1 = yes, 0 = no} = \\;?", "1", "2 odd vertices means an Eulerian trail exists, so yes — answer 1. (The 8 edges are irrelevant.)", "Only the odd-vertex count matters.", [], 5),
    choice("y8-net-eul-p28", "A network has all even degrees except two vertices of degree 1. It has:", "B", ["an Eulerian circuit.", "an Eulerian trail between the two degree-1 vertices.", "no Eulerian trail.", "4 odd vertices."], "Exactly 2 odd vertices (the degree-1 ones) gives an Eulerian trail between them.", "Degree 1 is odd.", 5),
    answer("y8-net-eul-p29", "A connected network has 4 odd-degree vertices. What is the least number of separate one-stroke trails needed to cover every edge?", "\\text{Least number of trails} = \\;?", "2", "Each trail uses 2 odd vertices, so 4 odd vertices need 4/2 = 2 trails.", "Pair up the odd vertices.", [], 5),
    choice("y8-net-eul-p30", "A connected network with degrees 5, 5, 5, 5 (4 vertices) is:", "B", ["traversable with one trail.", "not traversable in one stroke (4 odd vertices).", "an Eulerian circuit.", "disconnected."], "All four vertices are odd (degree 5), more than 2, so it is not traversable in one stroke.", "Count odd degrees.", 5),
  ],
  multiPartPractice: [
    {
      id: "y8-net-eul-mp1",
      prompt:
        "A connected network has vertices A, B, C, D, E with degrees A = 4, B = 3, C = 2, D = 3, E = 2.",
      latex: "\\deg: A{=}4, B{=}3, C{=}2, D{=}3, E{=}2",
      answer: "2",
      hint: "Count odd-degree vertices, find the degree sum, then halve it for the edges.",
      explanation:
        "Part (a): odd-degree vertices are B and D, so 2. Part (b): degree sum = 4+3+2+3+2 = 14. Part (c): edges = 14/2 = 7.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "How many odd-degree vertices does the network have?",
          latex: "\\text{Odd-degree vertices} = \\;?",
          marks: 1,
          answer: "2",
          acceptedAnswers: [],
          hint: "Mark the vertices with odd degree.",
          explanation: "B (3) and D (3) are odd, so 2.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the sum of all the vertex degrees.",
          latex: "\\text{Degree sum} = \\;?",
          marks: 1,
          answer: "14",
          acceptedAnswers: [],
          hint: "Add all five degrees.",
          explanation: "4 + 3 + 2 + 3 + 2 = 14.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "How many edges does the network have?",
          latex: "\\text{Edges} = \\;?",
          marks: 1,
          answer: "7",
          acceptedAnswers: [],
          hint: "Edges are half the degree sum.",
          explanation: "14 / 2 = 7 edges.",
        },
      ],
    },
  ],
};

// ── Lesson 4: Planar Graphs ──────────────────────────────────────────────────

const planarGraphs: LessonContent = {
  description:
    "Decide whether a network is planar, redraw a network to remove edge crossings where possible, and apply Euler's formula V − E + F = 2 to planar networks.",
  learningIntention:
    "Recognise planar networks, redraw them without crossings, and use Euler's formula $V - E + F = 2$ to relate vertices, edges and faces.",
  successCriteria: [
    "Explain what it means for a network to be planar.",
    "Redraw a network to remove edge crossings when it is planar.",
    "Count the faces (regions) of a planar network, including the outer region.",
    "Apply Euler's formula $V - E + F = 2$ to find a missing quantity.",
    "Verify Euler's formula for a given planar network.",
    "Recognise that some networks cannot be drawn without crossings.",
  ],
  teaching: {
    paragraphs: [
      "When you draw a network, the edges sometimes cross each other — but a crossing is not a vertex; it is just two lines passing over one another, like two roads on a flyover. A natural question is whether you could redraw the same network, keeping the same vertices and connections, so that no edges cross at all. If you can, the network is called planar.",
      "Here is a concrete case. Draw a square ABCD with both diagonals AC and BD. As first drawn, the diagonals cross in the middle. But this network is still planar: you can redraw it as a triangle with one vertex inside, and then no edges cross. Being planar is about whether a crossing-free drawing exists, not about the particular messy way you first drew it.",
      "A crossing-free drawing chops the plane into regions, which we call faces. The faces are the areas you could colour in, including the big region outside the whole network. For a triangle, there are 2 faces: the inside of the triangle and the unbounded outside. Always remember to count that outer face — it is easy to forget.",
      "Now for the remarkable pattern. Count the vertices $V$, the edges $E$, and the faces $F$ of any connected planar network drawn without crossings. You will always find that $V - E + F = 2$. This is Euler's formula. For the triangle: $V = 3$, $E = 3$, $F = 2$, and indeed $3 - 3 + 2 = 2$.",
      "Why is it always 2? Build the network up one piece at a time. Start with a single vertex: $V=1, E=0, F=1$ (just the outside), giving $1 - 0 + 1 = 2$. Now, adding an edge to a new vertex raises $V$ and $E$ each by 1, so $V - E$ is unchanged and $F$ stays the same — the total stays 2. Adding an edge between two existing vertices closes off a new face, raising $E$ and $F$ each by 1, so again the total is unchanged. However you grow it, $V - E + F$ never moves from 2.",
      "Euler's formula lets you find a missing count without drawing. If a connected planar network has $V = 6$ vertices and $E = 9$ edges, then $F = 2 - V + E = 2 - 6 + 9 = 5$ faces. Rearranging the formula to solve for whichever quantity is unknown is a common exam task.",
      "Two cautions. First, not every network is planar — some, no matter how cleverly you redraw them, always have at least one crossing (these are non-planar). Second, when counting faces, never forget the outer region, and only apply $V - E + F = 2$ to a connected network drawn with no crossings.",
    ],
    latexBlocks: [
      "\\text{planar: can be redrawn with no edges crossing}",
      "V - E + F = 2 \\quad (\\text{connected planar network})",
      "F = 2 - V + E, \\qquad E = V + F - 2, \\qquad V = E - F + 2",
    ],
  },
  workedExamples: [
    {
      title: "Verify Euler's formula for a triangle",
      questionLatex:
        "\\text{A triangle has 3 vertices and 3 edges. Check that } V - E + F = 2.",
      steps: [
        { explanation: "Count the faces: the inside of the triangle plus the outer region.", latex: "F = 2" },
        { explanation: "Substitute V, E, F into Euler's formula.", latex: "V - E + F = 3 - 3 + 2 = 2 \\checkmark" },
      ],
      finalAnswerLatex: "V - E + F = 2 \\text{ holds.}",
    } as WorkedExample,
    {
      title: "Find the number of faces",
      questionLatex:
        "\\text{A connected planar network has } V = 5 \\text{ vertices and } E = 7 \\text{ edges. Find } F.",
      steps: [
        { explanation: "Rearrange Euler's formula to make F the subject.", latex: "F = 2 - V + E" },
        { explanation: "Substitute V = 5 and E = 7.", latex: "F = 2 - 5 + 7 = 4" },
      ],
      finalAnswerLatex: "F = 4 \\text{ faces}",
    } as WorkedExample,
    {
      title: "Find the number of edges",
      questionLatex:
        "\\text{A connected planar network has } V = 6 \\text{ vertices and } F = 5 \\text{ faces. Find } E.",
      steps: [
        { explanation: "Rearrange Euler's formula to make E the subject.", latex: "E = V + F - 2" },
        { explanation: "Substitute V = 6 and F = 5.", latex: "E = 6 + 5 - 2 = 9" },
      ],
      finalAnswerLatex: "E = 9 \\text{ edges}",
    } as WorkedExample,
    {
      title: "Recognise a planar redraw",
      questionLatex:
        "\\text{A square } ABCD \\text{ has both diagonals } AC \\text{ and } BD, \\text{ drawn crossing. Is the network planar, and how many faces would a crossing-free drawing have?}",
      steps: [
        { explanation: "Count vertices and edges: 4 vertices, and edges AB, BC, CD, DA, AC, BD make 6 edges.", latex: "V = 4, \\quad E = 6" },
        { explanation: "It can be redrawn without crossings, so it is planar; use Euler to find F.", latex: "F = 2 - V + E = 2 - 4 + 6 = 4" },
      ],
      finalAnswerLatex: "\\text{Planar, with } F = 4 \\text{ faces in a crossing-free drawing.}",
    } as WorkedExample,
  ],
  guidedPractice: [
    choice(
      "y8-net-pl-g1",
      "What does it mean for a network to be planar?",
      "B",
      [
        "It has exactly 2 faces.",
        "It can be redrawn so that no edges cross.",
        "It has no vertices of odd degree.",
        "It has more faces than edges.",
      ],
      "A planar network can be drawn (or redrawn) with no edge crossings.",
      "Focus on whether a crossing-free drawing is possible.",
    ),
    answer(
      "y8-net-pl-g2",
      "A connected planar network has V = 4 vertices and E = 5 edges. Use Euler's formula to find the number of faces F.",
      "F = 2 - V + E = \\;?",
      "3",
      "$F = 2 - 4 + 5 = 3$ faces.",
      "Rearrange $V - E + F = 2$ to $F = 2 - V + E$.",
    ),
    answer(
      "y8-net-pl-g3",
      "A connected planar network has E = 8 edges and F = 5 faces. Find the number of vertices V.",
      "V = E - F + 2 = \\;?",
      "5",
      "$V = 8 - 5 + 2 = 5$ vertices.",
      "Rearrange to $V = E - F + 2$.",
    ),
    answer(
      "y8-net-pl-g4",
      "A triangle has V = 3 and E = 3. How many faces F does it have (including the outer region)?",
      "F = \\;?",
      "2",
      "Inside plus outside gives $F = 2$; check: $3 - 3 + 2 = 2$.",
      "Do not forget the outer face.",
    ),
  ],
  independentPractice: [
    answer(
      "y8-net-pl-i1",
      "A connected planar network has V = 6 vertices and E = 9 edges. Find the number of faces F.",
      "F = 2 - V + E = \\;?",
      "5",
      "$F = 2 - 6 + 9 = 5$ faces.",
      "Use $F = 2 - V + E$.",
    ),
    choice(
      "y8-net-pl-i2",
      "When counting faces of a planar network for Euler's formula, you must:",
      "A",
      [
        "include the outer (unbounded) region.",
        "ignore the outer region.",
        "count only triangular faces.",
        "count vertices instead.",
      ],
      "The outer unbounded region counts as a face in Euler's formula.",
      "Remember the region outside the whole drawing.",
    ),
    answer(
      "y8-net-pl-i3",
      "A connected planar network has V = 7 vertices and F = 4 faces. Find the number of edges E.",
      "E = V + F - 2 = \\;?",
      "9",
      "$E = 7 + 4 - 2 = 9$ edges.",
      "Rearrange to $E = V + F - 2$.",
    ),
    answer(
      "y8-net-pl-i4",
      "A square ABCD with both diagonals has V = 4 and E = 6. Find the number of faces F in a crossing-free drawing.",
      "F = 2 - V + E = \\;?",
      "4",
      "$F = 2 - 4 + 6 = 4$ faces.",
      "Apply Euler's formula after redrawing without crossings.",
    ),
    choice(
      "y8-net-pl-i5",
      "Which statement is correct?",
      "C",
      [
        "Every network is planar.",
        "A crossing in a drawing counts as an extra vertex.",
        "Some networks cannot be drawn without at least one crossing.",
        "Euler's formula gives $V - E + F = 0$.",
      ],
      "Some networks are non-planar — they always have a crossing no matter how you redraw them. A crossing is not a vertex, and Euler's formula is $V - E + F = 2$.",
      "Recall that not all networks are planar.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Forgetting to count the outer (unbounded) region as a face.",
      fix: "The big region outside the whole network is a face too. A triangle has 2 faces: inside and outside.",
    },
    {
      mistake: "Treating a crossing point as a vertex.",
      fix: "A crossing is just two edges passing over each other; it is not a vertex. Only the original dots are vertices.",
    },
    {
      mistake: "Saying a network is non-planar just because the first drawing had crossings.",
      fix: "Planar means a crossing-free drawing exists. Try redrawing — a square with diagonals looks crossed but can be redrawn with no crossings.",
    },
    {
      mistake: "Using Euler's formula with the wrong sign, e.g. $V + E + F = 2$.",
      fix: "The formula is $V - E + F = 2$. Subtract the edges; add the vertices and faces.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-net-pl-m1",
      "A connected planar network has V = 4 and E = 5. Find F.",
      "F = 2 - V + E = \\;?",
      "3",
      "$F = 2 - 4 + 5 = 3$.",
      "Use $F = 2 - V + E$.",
    ),
    choice(
      "y8-net-pl-m2",
      "A planar network is one that:",
      "B",
      [
        "has exactly 2 vertices.",
        "can be redrawn with no crossing edges.",
        "has all even degrees.",
        "has no faces.",
      ],
      "Planar means a crossing-free drawing exists.",
      "It is about removing crossings.",
    ),
    answer(
      "y8-net-pl-m3",
      "A connected planar network has E = 10 and F = 6. Find V.",
      "V = E - F + 2 = \\;?",
      "6",
      "$V = 10 - 6 + 2 = 6$.",
      "Use $V = E - F + 2$.",
    ),
    answer(
      "y8-net-pl-m4",
      "A connected planar network has V = 8 and F = 4. Find E.",
      "E = V + F - 2 = \\;?",
      "10",
      "$E = 8 + 4 - 2 = 10$.",
      "Use $E = V + F - 2$.",
    ),
    choice(
      "y8-net-pl-m5",
      "How many faces does a triangle (3 vertices, 3 edges) have?",
      "B",
      [
        "1",
        "2",
        "3",
        "0",
      ],
      "Inside plus the outer region gives 2 faces; check $3 - 3 + 2 = 2$.",
      "Include the outer region.",
    ),
    answer(
      "y8-net-pl-m6",
      "A connected planar network has V = 5 and E = 6. Find F.",
      "F = 2 - V + E = \\;?",
      "3",
      "$F = 2 - 5 + 6 = 3$.",
      "Use $F = 2 - V + E$.",
    ),
    choice(
      "y8-net-pl-m7",
      "Euler's formula for a connected planar network is:",
      "C",
      [
        "$V + E + F = 2$",
        "$V - E - F = 2$",
        "$V - E + F = 2$",
        "$V + E - F = 0$",
      ],
      "The correct formula is $V - E + F = 2$.",
      "Subtract the edges.",
    ),
    answer(
      "y8-net-pl-m8",
      "A connected planar network has V = 10 and E = 15. Find F.",
      "F = 2 - V + E = \\;?",
      "7",
      "$F = 2 - 10 + 15 = 7$.",
      "Use $F = 2 - V + E$.",
    ),
    choice(
      "y8-net-pl-m9",
      "A square ABCD with both diagonals (V = 4, E = 6) is drawn with the diagonals crossing. Is it planar?",
      "A",
      [
        "Yes — it can be redrawn with no crossings.",
        "No — it always has a crossing.",
        "Only if the diagonals are removed.",
        "Only if it has 2 faces.",
      ],
      "It is planar: redraw it as a triangle with a vertex inside and no edges cross.",
      "Planar means a crossing-free drawing exists.",
    ),
    answer(
      "y8-net-pl-m10",
      "A connected planar network has F = 6 faces and E = 9 edges. Find V, then state V − E + F to check.",
      "V = E - F + 2 = \\;?",
      "5",
      "$V = 9 - 6 + 2 = 5$. Check: $5 - 9 + 6 = 2$. ✓",
      "Use $V = E - F + 2$, then verify with Euler's formula.",
    ),
  ],
  masteryQuizPool: [
    choice("y8-net-pl-p1", "Planar means a network:", "A", ["can be redrawn with no crossings.", "has 2 vertices.", "has all even degrees.", "has no faces."], "Planar means a crossing-free drawing exists.", "It is about crossings.", 1),
    answer("y8-net-pl-p2", "A connected planar network has V = 3, E = 3. Find F.", "F = 2 - V + E = \\;?", "2", "$F = 2 - 3 + 3 = 2$.", "Use $F = 2 - V + E$.", [], 1),
    choice("y8-net-pl-p3", "Euler's formula is:", "C", ["$V + E + F = 2$", "$V - E - F = 2$", "$V - E + F = 2$", "$E - V + F = 0$"], "It is $V - E + F = 2$.", "Subtract the edges.", 1),
    answer("y8-net-pl-p4", "A connected planar network has V = 5, E = 6. Find F.", "F = 2 - V + E = \\;?", "3", "$F = 2 - 5 + 6 = 3$.", "Use $F = 2 - V + E$.", [], 1),
    choice("y8-net-pl-p5", "A triangle has how many faces (with the outside)?", "B", ["1", "2", "3", "0"], "Inside plus outside is 2 faces.", "Count the outer region too.", 1),
    answer("y8-net-pl-p6", "A connected planar network has V = 4, E = 4. Find F.", "F = 2 - V + E = \\;?", "2", "$F = 2 - 4 + 4 = 2$.", "Use $F = 2 - V + E$.", [], 1),
    answer("y8-net-pl-p7", "A connected planar network has V = 6, E = 9. Find F.", "F = 2 - V + E = \\;?", "5", "$F = 2 - 6 + 9 = 5$.", "Use $F = 2 - V + E$.", [], 2),
    answer("y8-net-pl-p8", "A connected planar network has E = 8, F = 5. Find V.", "V = E - F + 2 = \\;?", "5", "$V = 8 - 5 + 2 = 5$.", "Use $V = E - F + 2$.", [], 2),
    answer("y8-net-pl-p9", "A connected planar network has V = 7, F = 4. Find E.", "E = V + F - 2 = \\;?", "9", "$E = 7 + 4 - 2 = 9$.", "Use $E = V + F - 2$.", [], 2),
    choice("y8-net-pl-p10", "When counting faces you must:", "A", ["include the outer region.", "ignore the outer region.", "count crossings as faces.", "count vertices."], "The outer unbounded region is a face.", "Remember the outside.", 2),
    answer("y8-net-pl-p11", "A connected planar network has V = 8, E = 12. Find F.", "F = 2 - V + E = \\;?", "6", "$F = 2 - 8 + 12 = 6$.", "Use $F = 2 - V + E$.", [], 2),
    choice("y8-net-pl-p12", "A crossing point in a drawing is:", "B", ["a vertex.", "not a vertex, just two edges passing over.", "a face.", "an edge weight."], "A crossing is not a vertex; only the original dots are vertices.", "Vertices are the labelled dots.", 2),
    answer("y8-net-pl-p13", "A connected planar network has V = 10, E = 15. Find F.", "F = 2 - V + E = \\;?", "7", "$F = 2 - 10 + 15 = 7$.", "Use $F = 2 - V + E$.", [], 3),
    answer("y8-net-pl-p14", "A connected planar network has E = 12, F = 6. Find V.", "V = E - F + 2 = \\;?", "8", "$V = 12 - 6 + 2 = 8$.", "Use $V = E - F + 2$.", [], 3),
    answer("y8-net-pl-p15", "A square with both diagonals has V = 4, E = 6. Find F in a crossing-free drawing.", "F = 2 - V + E = \\;?", "4", "$F = 2 - 4 + 6 = 4$.", "Apply Euler after redrawing.", [], 3),
    choice("y8-net-pl-p16", "Some networks are non-planar, meaning:", "C", ["they have 2 faces.", "they have no edges.", "they always have at least one crossing, however redrawn.", "they have all even degrees."], "A non-planar network cannot be drawn crossing-free.", "Non-planar = unavoidable crossing.", 3),
    answer("y8-net-pl-p17", "A connected planar network has V = 9, F = 5. Find E.", "E = V + F - 2 = \\;?", "12", "$E = 9 + 5 - 2 = 12$.", "Use $E = V + F - 2$.", [], 3),
    answer("y8-net-pl-p18", "A connected planar network has V = 6, F = 4. Find E.", "E = V + F - 2 = \\;?", "8", "$E = 6 + 4 - 2 = 8$.", "Use $E = V + F - 2$.", [], 3),
    answer("y8-net-pl-p19", "A connected planar network has E = 20, F = 12. Find V.", "V = E - F + 2 = \\;?", "10", "$V = 20 - 12 + 2 = 10$.", "Use $V = E - F + 2$.", [], 4),
    answer("y8-net-pl-p20", "A connected planar network has V = 12, E = 20. Find F.", "F = 2 - V + E = \\;?", "10", "$F = 2 - 12 + 20 = 10$.", "Use $F = 2 - V + E$.", [], 4),
    answer("y8-net-pl-p21", "A cube's network (drawn flat) has V = 8 and E = 12. Find the number of faces F.", "F = 2 - V + E = \\;?", "6", "$F = 2 - 8 + 12 = 6$ — matching a cube's 6 faces.", "Use Euler's formula.", [], 4),
    choice("y8-net-pl-p22", "A connected planar network has V = 5, E = 8. The number of faces is:", "C", ["3", "4", "5", "6"], "$F = 2 - 5 + 8 = 5$ faces.", "Use $F = 2 - V + E$.", 4),
    answer("y8-net-pl-p23", "A connected planar network has F = 7 and V = 6. Find E.", "E = V + F - 2 = \\;?", "11", "$E = 6 + 7 - 2 = 11$.", "Use $E = V + F - 2$.", [], 4),
    answer("y8-net-pl-p24", "A connected planar network has E = 9 edges and 5 faces. Find V, then compute V − E + F to verify (give V).", "V = E - F + 2 = \\;?", "6", "$V = 9 - 5 + 2 = 6$; check $6 - 9 + 5 = 2$. ✓", "Use $V = E - F + 2$.", [], 4),
    answer("y8-net-pl-p25", "A triangular prism network has V = 6 and E = 9. Find F.", "F = 2 - V + E = \\;?", "5", "$F = 2 - 6 + 9 = 5$ — a triangular prism has 5 faces.", "Use $F = 2 - V + E$.", [], 5),
    answer("y8-net-pl-p26", "A connected planar network has F = 10 faces and V = 7 vertices. Find E.", "E = V + F - 2 = \\;?", "15", "$E = 7 + 10 - 2 = 15$.", "Use $E = V + F - 2$.", [], 5),
    choice("y8-net-pl-p27", "If a connected planar network gains one extra edge between two existing vertices (still planar), then:", "A", ["E and F each increase by 1, so V − E + F stays 2.", "V increases by 1.", "F decreases by 1.", "V − E + F becomes 3."], "A new edge between existing vertices closes off a new face: E and F each rise by 1, leaving the total unchanged.", "Think how the new edge splits a region.", 5),
    answer("y8-net-pl-p28", "A connected planar network has V = 15, E = 25. Find F.", "F = 2 - V + E = \\;?", "12", "$F = 2 - 15 + 25 = 12$.", "Use $F = 2 - V + E$.", [], 5),
    answer("y8-net-pl-p29", "An octahedron network has V = 6 vertices and F = 8 faces. Find the number of edges E.", "E = V + F - 2 = \\;?", "12", "$E = 6 + 8 - 2 = 12$ — an octahedron has 12 edges.", "Use $E = V + F - 2$.", [], 5),
    answer("y8-net-pl-p30", "A connected planar network has E = 30 and V = 20. Find F.", "F = 2 - V + E = \\;?", "12", "$F = 2 - 20 + 30 = 12$.", "Use $F = 2 - V + E$.", [], 5),
  ],
  multiPartPractice: [
    {
      id: "y8-net-pl-mp1",
      prompt:
        "A connected planar network is drawn with no crossings. It has V = 6 vertices and E = 8 edges.",
      latex: "V = 6, \\quad E = 8",
      answer: "4",
      hint: "Use F = 2 - V + E, then check V - E + F, then find the degree sum from the edges.",
      explanation:
        "Part (a): F = 2 - 6 + 8 = 4 faces. Part (b): V - E + F = 6 - 8 + 4 = 2, confirming Euler's formula. Part (c): degree sum = 2 x E = 2 x 8 = 16.",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Use Euler's formula to find the number of faces F.",
          latex: "F = 2 - V + E = \\;?",
          marks: 1,
          answer: "4",
          acceptedAnswers: [],
          hint: "Rearrange to F = 2 - V + E.",
          explanation: "F = 2 - 6 + 8 = 4 faces.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Evaluate V − E + F to confirm Euler's formula.",
          latex: "V - E + F = \\;?",
          marks: 1,
          answer: "2",
          acceptedAnswers: [],
          hint: "Substitute V = 6, E = 8 and your value of F.",
          explanation: "6 - 8 + 4 = 2, so Euler's formula holds.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "Find the sum of all the vertex degrees.",
          latex: "\\text{Degree sum} = \\;?",
          marks: 1,
          answer: "16",
          acceptedAnswers: [],
          hint: "The degree sum is twice the number of edges.",
          explanation: "Degree sum = 2 x 8 = 16.",
        },
      ],
    },
  ],
};

// ── Lesson 5: Network Applications ───────────────────────────────────────────

const networkApplications: LessonContent = {
  description:
    "Use networks to model real situations: find the shortest path between two points, interpret transport and utility networks, and understand the minimum connector that links all vertices at least total cost.",
  learningIntention:
    "Apply networks to real problems — finding shortest paths, reading transport and utility networks, and reasoning about minimum connectors.",
  successCriteria: [
    "Find the shortest path between two vertices in a small weighted network.",
    "Interpret a transport or utility network and read off connections and weights.",
    "Explain what a minimum connector (cheapest way to link every vertex) means.",
    "Compare alternative routes by adding edge weights.",
    "Recognise that the shortest path need not use the fewest edges.",
    "Use a network model to make a practical decision.",
  ],
  teaching: {
    paragraphs: [
      "Networks are not just puzzles — they model the real world. A road map, a train timetable, a water-pipe layout, an electricity grid, even the friendships in a class: all of these are networks. Putting weights on the edges (distances, times, costs) turns the picture into a tool for making decisions, like finding the quickest way home.",
      "The most common task is the shortest path: the route between two vertices with the smallest total weight. The key idea is that 'shortest' means smallest total of edge weights, not fewest edges. A route that hops through more towns can still be shorter overall if each hop is small. So you must add up the weights along each possible route and compare the totals.",
      "Here is a concrete one. Suppose towns A and C are joined directly by a road of length 10 km, but there is also a route A to B to C with AB = 3 km and BC = 4 km. The direct road is 10 km; the two-hop route totals $3 + 4 = 7$ km. Even though the second route uses more roads, it is shorter, so 7 km is the shortest path from A to C.",
      "To find a shortest path in a small network, list the sensible routes from start to finish, add the weights along each, and pick the smallest total. For tiny networks this 'list and compare' method is perfectly reliable; for large networks, more systematic algorithms exist, but the principle is the same — compare total weights.",
      "Transport and utility networks are read the same way. On a train network the vertices are stations and edge weights might be travel times; the shortest path is the fastest journey. On a water network the vertices are junctions and the weights are pipe lengths; you might want the route a leak-tester should walk. Always check what the weights mean before you start adding.",
      "A different but related question is the minimum connector: what is the cheapest set of edges that still keeps every vertex connected? Imagine you must lay cables so that every house in a street is connected to the network, and you want to use the least total length of cable. You do not need every possible cable — just enough to join everything up, choosing the cheapest edges that avoid leaving anyone cut off. Picking small-weight edges while keeping the network connected (and avoiding wasteful loops) gives the minimum connector.",
      "The classic mistake is to grab the route with the fewest edges and assume it is shortest, or to forget to keep the network connected when choosing a minimum connector. Always add the actual weights for shortest path, and always check that every vertex is still reachable for a minimum connector.",
    ],
    latexBlocks: [
      "\\text{shortest path} = \\text{route with the smallest total of edge weights}",
      "\\text{shortest} \\ne \\text{fewest edges}",
      "\\text{minimum connector} = \\text{cheapest set of edges that keeps every vertex connected}",
    ],
  },
  workedExamples: [
    {
      title: "Compare two routes",
      questionLatex:
        "\\text{Roads: } AC = 10, AB = 3, BC = 4 \\text{ (km). Find the shortest path from } A \\text{ to } C.",
      steps: [
        { explanation: "Add the weights along the direct route and the two-hop route.", latex: "AC = 10, \\quad AB + BC = 3 + 4 = 7" },
        { explanation: "Choose the route with the smaller total.", latex: "7 < 10 \\Rightarrow \\text{shortest is } A \\to B \\to C" },
      ],
      finalAnswerLatex: "\\text{Shortest path } = 7 \\text{ km (via } B).",
    } as WorkedExample,
    {
      title: "Shortest path with three routes",
      questionLatex:
        "\\text{From } P \\text{ to } S: \\; P\\text{–}S = 12, \\; P\\text{–}Q\\text{–}S = 5+6, \\; P\\text{–}R\\text{–}S = 4+5. \\text{ Find the shortest.}",
      steps: [
        { explanation: "Add the weights along each of the three routes.", latex: "12, \\quad 5+6=11, \\quad 4+5=9" },
        { explanation: "Pick the smallest total.", latex: "\\min(12, 11, 9) = 9" },
      ],
      finalAnswerLatex: "\\text{Shortest path } = 9 \\text{ (via } R).",
    } as WorkedExample,
    {
      title: "Read a transport network",
      questionLatex:
        "\\text{Train times (min): } A\\text{–}B = 8, B\\text{–}C = 5, A\\text{–}C = 20. \\text{ Fastest } A \\text{ to } C?",
      steps: [
        { explanation: "Compare the direct line with the route through B by adding times.", latex: "A\\text{–}C = 20, \\quad A\\text{–}B\\text{–}C = 8 + 5 = 13" },
        { explanation: "The smaller total is the fastest journey.", latex: "13 < 20" },
      ],
      finalAnswerLatex: "\\text{Fastest journey } = 13 \\text{ min (via } B).",
    } as WorkedExample,
    {
      title: "Minimum connector intuition",
      questionLatex:
        "\\text{Three houses } A, B, C \\text{ with cable costs } AB = 4, BC = 5, AC = 9. \\text{ Cheapest cabling that connects all three?}",
      steps: [
        { explanation: "To connect 3 houses you need only 2 cables (a chain). Choose the two cheapest that still link everyone.", latex: "\\text{pick } AB = 4 \\text{ and } BC = 5; \\text{ skip } AC = 9" },
        { explanation: "Add the chosen weights for the total cost.", latex: "4 + 5 = 9" },
      ],
      finalAnswerLatex: "\\text{Minimum connector cost } = 9 \\text{ (cables } AB \\text{ and } BC).",
    } as WorkedExample,
  ],
  guidedPractice: [
    answer(
      "y8-net-app-g1",
      "Roads: AC = 8 km direct, or A–B–C with AB = 3 km and BC = 4 km. What is the shortest distance from A to C?",
      "\\min(8,\\; 3+4) = \\;?",
      "7",
      "Direct is 8; via B is $3 + 4 = 7$. The shortest is 7 km.",
      "Add the weights on each route and compare.",
      ["7 km"],
    ),
    choice(
      "y8-net-app-g2",
      "In a weighted network, the shortest path is the route with the:",
      "B",
      [
        "fewest edges.",
        "smallest total of edge weights.",
        "most vertices.",
        "largest total weight.",
      ],
      "Shortest path means the smallest total of edge weights, not the fewest edges.",
      "Focus on the total weight, not the number of hops.",
    ),
    answer(
      "y8-net-app-g3",
      "Three towns A, B, C have cable costs AB = 6, BC = 4, AC = 11. The cheapest cabling that connects all three uses two cables. What is the minimum total cost?",
      "\\text{Two cheapest connecting cables} = \\;?",
      "10",
      "Pick AB = 6 and BC = 4 (skip the dear AC = 11): total $6 + 4 = 10$.",
      "Choose the two cheapest cables that still link every town.",
    ),
    answer(
      "y8-net-app-g4",
      "Train times (min): A–B = 9, B–C = 6, A–C = 20. What is the fastest time from A to C?",
      "\\min(20,\\; 9+6) = \\;?",
      "15",
      "Direct is 20; via B is $9 + 6 = 15$. Fastest is 15 min.",
      "Add the times on each route and compare.",
      ["15 min"],
    ),
  ],
  independentPractice: [
    answer(
      "y8-net-app-i1",
      "Roads: AD = 14 km direct, or A–B–C–D with AB = 4, BC = 5, CD = 3. Find the shortest distance from A to D.",
      "\\min(14,\\; 4+5+3) = \\;?",
      "12",
      "Direct is 14; via B and C is $4 + 5 + 3 = 12$. Shortest is 12 km.",
      "Add the weights along each route.",
      ["12 km"],
    ),
    choice(
      "y8-net-app-i2",
      "Why might a route with more edges be the shortest path?",
      "A",
      [
        "Because each of its edges may have a small weight, giving a small total.",
        "Because more edges always means shorter.",
        "Because edges have no weight.",
        "Because it visits fewer vertices.",
      ],
      "Shortest depends on total weight; many small-weight edges can beat one large-weight edge.",
      "Think about the total of the weights.",
    ),
    answer(
      "y8-net-app-i3",
      "From P to S: direct P–S = 15, or P–Q–S = 6 + 6, or P–R–S = 5 + 5. Find the shortest distance.",
      "\\min(15,\\; 12,\\; 10) = \\;?",
      "10",
      "Totals are 15, 12 and 10; the smallest is 10 (via R).",
      "Add each route's weights, then take the minimum.",
    ),
    answer(
      "y8-net-app-i4",
      "Four houses A, B, C, D with cable costs AB = 3, BC = 4, CD = 2 and a dearer AD = 10. The cheapest cabling connecting all four uses three cables. What is the minimum total cost?",
      "AB + BC + CD = \\;?",
      "9",
      "Pick AB = 3, BC = 4, CD = 2 (skip AD = 10): total $3 + 4 + 2 = 9$.",
      "Connect all four with the three cheapest cables that avoid a wasteful loop.",
    ),
    choice(
      "y8-net-app-i5",
      "A minimum connector for a set of towns is:",
      "C",
      [
        "the longest route between two towns.",
        "every possible road built.",
        "the cheapest set of roads that keeps all towns connected.",
        "the route with the most edges.",
      ],
      "A minimum connector links every vertex at the least total cost, using just enough edges to keep everything connected.",
      "It is the cheapest way to join everything up.",
    ),
  ],
  commonMistakes: [
    {
      mistake: "Choosing the route with the fewest edges and assuming it is the shortest path.",
      fix: "Add the actual weights. A route with more edges, each small, can have a smaller total than one big direct edge.",
    },
    {
      mistake: "Forgetting to add all the edge weights along a multi-hop route.",
      fix: "Include every edge on the route. For A–B–C–D add AB + BC + CD, not just the first and last.",
    },
    {
      mistake: "Building every possible edge when only a minimum connector is needed.",
      fix: "A minimum connector uses just enough edges to keep all vertices connected — choose the cheapest edges and avoid wasteful loops.",
    },
    {
      mistake: "Leaving a vertex unconnected when picking the cheapest edges.",
      fix: "Always check that every vertex is still reachable. The cheapest edges must still join the whole network together.",
    },
  ],
  masteryQuiz: [
    answer(
      "y8-net-app-m1",
      "Roads: AC = 9 direct, or A–B–C with AB = 2 and BC = 5. Find the shortest distance from A to C.",
      "\\min(9,\\; 2+5) = \\;?",
      "7",
      "Direct 9; via B $2 + 5 = 7$. Shortest 7.",
      "Add weights and compare.",
    ),
    choice(
      "y8-net-app-m2",
      "The shortest path in a weighted network has the:",
      "B",
      [
        "fewest edges.",
        "smallest total weight.",
        "most vertices.",
        "largest weight.",
      ],
      "Shortest path = smallest total of edge weights.",
      "Total weight, not edge count.",
    ),
    answer(
      "y8-net-app-m3",
      "From P to S: P–S = 13, P–Q–S = 5 + 5, P–R–S = 4 + 6. Find the shortest distance.",
      "\\min(13,\\; 10,\\; 10) = \\;?",
      "10",
      "Totals 13, 10, 10; smallest is 10.",
      "Compare the three route totals.",
    ),
    answer(
      "y8-net-app-m4",
      "Three towns A, B, C with cable costs AB = 7, BC = 3, AC = 12. Minimum total cost to connect all three?",
      "\\text{Two cheapest connecting cables} = \\;?",
      "10",
      "Pick BC = 3 and AB = 7 (skip AC = 12): total $3 + 7 = 10$.",
      "Two cheapest cables that link all towns.",
    ),
    answer(
      "y8-net-app-m5",
      "Train times (min): A–B = 7, B–C = 4, A–C = 15. Fastest time from A to C?",
      "\\min(15,\\; 7+4) = \\;?",
      "11",
      "Via B is $7 + 4 = 11$, less than 15. Fastest 11 min.",
      "Add the times and compare.",
    ),
    answer(
      "y8-net-app-m6",
      "Roads: AD = 16 direct, or A–B–C–D with AB = 5, BC = 4, CD = 6. Shortest distance from A to D?",
      "\\min(16,\\; 5+4+6) = \\;?",
      "15",
      "Via B and C is $5 + 4 + 6 = 15$, less than 16. Shortest 15.",
      "Add all three hop weights.",
    ),
    choice(
      "y8-net-app-m7",
      "On a train network where edge weights are travel times, the shortest path gives the:",
      "A",
      [
        "fastest journey.",
        "cheapest ticket.",
        "fewest stations.",
        "longest journey.",
      ],
      "When weights are times, the smallest total weight is the fastest journey.",
      "Match the weight's meaning to the answer.",
    ),
    answer(
      "y8-net-app-m8",
      "Four houses A, B, C, D with cable costs AB = 2, BC = 6, CD = 3 and AD = 4. The minimum connector uses three cables. Which three give the least total — and what is that total?",
      "\\text{Least total of three connecting cables} = \\;?",
      "9",
      "Cheapest connecting choice: AB = 2, CD = 3, AD = 4, total $2 + 3 + 4 = 9$ (this links all four; skip BC = 6).",
      "Choose the three cheapest cables that still connect every house.",
    ),
    choice(
      "y8-net-app-m9",
      "A minimum connector for 5 towns must:",
      "C",
      [
        "use every possible road.",
        "use exactly 5 roads.",
        "keep all 5 towns connected at the least total cost.",
        "use the most expensive roads.",
      ],
      "A minimum connector links all towns at least total cost, using just enough roads.",
      "Cheapest set that keeps everything connected.",
    ),
    answer(
      "y8-net-app-m10",
      "From X to Y: X–Y = 18 direct, X–A–Y = 9 + 8, X–B–Y = 7 + 7, X–A–B–Y = 9 + 3 + 7. Find the shortest distance.",
      "\\min(18,\\; 17,\\; 14,\\; 19) = \\;?",
      "14",
      "Totals: 18, 17, 14, 19. The smallest is 14 (via B).",
      "Add each route and take the minimum — more edges is not always longer.",
    ),
  ],
  masteryQuizPool: [
    answer("y8-net-app-p1", "Roads AC = 8 or A–B–C with AB = 3, BC = 2. Shortest A to C?", "\\min(8, 3+2) = \\;?", "5", "Via B is $3+2=5 < 8$.", "Add and compare.", [], 1),
    choice("y8-net-app-p2", "Shortest path means:", "B", ["fewest edges.", "smallest total weight.", "most vertices.", "largest weight."], "Smallest total of edge weights.", "Total weight matters.", 1),
    answer("y8-net-app-p3", "A–B–C route with AB = 4, BC = 5. Total distance?", "4 + 5 = \\;?", "9", "$4 + 5 = 9$.", "Add the two weights.", [], 1),
    answer("y8-net-app-p4", "Direct AC = 12 or via B = 5 + 4. Shortest A to C?", "\\min(12, 5+4) = \\;?", "9", "Via B is $9 < 12$.", "Compare totals.", [], 1),
    choice("y8-net-app-p5", "A minimum connector aims to:", "C", ["build all roads.", "use the longest route.", "connect all vertices at least total cost.", "find the most edges."], "Cheapest set of edges keeping all connected.", "Least cost, still connected.", 1),
    answer("y8-net-app-p6", "Train times A–B = 6, B–C = 5. Time A to C via B?", "6 + 5 = \\;?", "11", "$6 + 5 = 11$ min.", "Add the times.", [], 1),
    answer("y8-net-app-p7", "Direct AD = 15 or A–B–C–D = 4 + 5 + 4. Shortest A to D?", "\\min(15, 4+5+4) = \\;?", "13", "Via B,C is $13 < 15$.", "Add all hops.", [], 2),
    answer("y8-net-app-p8", "Three towns AB = 5, BC = 3, AC = 10. Cheapest cabling to connect all three?", "\\text{Two cheapest} = \\;?", "8", "Pick AB=5, BC=3 (skip AC=10): $8$.", "Two cheapest connecting cables.", [], 2),
    answer("y8-net-app-p9", "P–S = 14, P–Q–S = 6+6, P–R–S = 5+4. Shortest?", "\\min(14, 12, 9) = \\;?", "9", "Smallest total is 9 (via R).", "Compare the three totals.", [], 2),
    choice("y8-net-app-p10", "A route with more edges can be shortest because:", "A", ["each edge may be small, giving a small total.", "more edges is always shorter.", "edges have no weight.", "it skips vertices."], "Many small edges can beat one big edge.", "Think totals.", 2),
    answer("y8-net-app-p11", "Train A–C = 22, A–B–C = 9 + 8. Fastest A to C?", "\\min(22, 9+8) = \\;?", "17", "Via B is $17 < 22$.", "Add and compare.", [], 2),
    answer("y8-net-app-p12", "Four houses chain AB = 2, BC = 3, CD = 4 connect all four. Total cost?", "2 + 3 + 4 = \\;?", "9", "$2+3+4 = 9$.", "Add the three cables.", [], 2),
    answer("y8-net-app-p13", "Direct XY = 20, X–A–Y = 8 + 9, X–B–Y = 7 + 8. Shortest?", "\\min(20, 17, 15) = \\;?", "15", "Smallest is 15 (via B).", "Compare all totals.", [], 3),
    answer("y8-net-app-p14", "Three towns AB = 8, BC = 6, AC = 5. Cheapest cabling connecting all three (two cables)?", "\\text{Two cheapest} = \\;?", "11", "Pick AC = 5 and BC = 6 (skip AB = 8): $11$.", "Two cheapest that link all towns.", [], 3),
    answer("y8-net-app-p15", "Routes A to D: direct 18, A–B–D = 7+6, A–C–D = 5+9. Shortest?", "\\min(18, 13, 14) = \\;?", "13", "Smallest total is 13 (via B).", "Add each route.", [], 3),
    choice("y8-net-app-p16", "On a water network with pipe-length weights, the shortest path is the:", "B", ["most expensive route.", "route of least total pipe length.", "route with most junctions.", "longest route."], "Least total weight = least total pipe length.", "Match weight meaning.", 3),
    answer("y8-net-app-p17", "Four houses AB = 3, BC = 5, CD = 2, AD = 8. Cheapest cabling connecting all (three cables)?", "\\text{Least total} = \\;?", "10", "Pick AB=3, CD=2, BC=5 (skip AD=8): $10$ — connects all four.", "Three cheapest that still connect every house.", [], 3),
    answer("y8-net-app-p18", "Direct PQ = 11, P–R–Q = 4+5, P–S–Q = 6+6. Shortest P to Q?", "\\min(11, 9, 12) = \\;?", "9", "Smallest total 9 (via R).", "Compare the three.", [], 3),
    answer("y8-net-app-p19", "From X to Y: XY = 25, X–A–Y = 12+10, X–B–Y = 9+9, X–A–B–Y = 12+3+9. Shortest?", "\\min(25,22,18,24) = \\;?", "18", "Totals 25, 22, 18, 24; smallest is 18 (via B).", "Add each route carefully.", [], 4),
    answer("y8-net-app-p20", "Five towns in a chain AB = 4, BC = 3, CD = 5, DE = 2 connect all five. Total cost?", "4 + 3 + 5 + 2 = \\;?", "14", "$4+3+5+2 = 14$.", "Add the four cables.", [], 4),
    answer("y8-net-app-p21", "Routes A to E: A–B–E = 6+9, A–C–E = 7+7, A–D–E = 5+8. Shortest?", "\\min(15, 14, 13) = \\;?", "13", "Smallest total is 13 (via D).", "Add each two-hop route.", [], 4),
    answer("y8-net-app-p22", "Four houses AB = 6, AC = 5, AD = 7, BC = 2, CD = 3. Cheapest connector picks AC, BC, CD. Total?", "5 + 2 + 3 = \\;?", "10", "AC=5, BC=2, CD=3 connect all four: $10$ (cheaper than using AB or AD).", "Choose three cheapest connecting cables.", [], 4),
    answer("y8-net-app-p23", "Direct AF = 30, A–B–C–F = 8+7+9, A–D–F = 11+12. Shortest A to F?", "\\min(30, 24, 23) = \\;?", "23", "Totals 30, 24, 23; smallest is 23 (via D).", "Add all hops on each route.", [], 4),
    choice("y8-net-app-p24", "A minimum connector for 4 towns uses how many edges (no wasteful loop)?", "C", ["1", "2", "3", "4"], "To connect n towns without a loop you need n - 1 edges, so 4 towns need 3 edges.", "n towns need n - 1 connecting edges.", 4),
    answer("y8-net-app-p25", "From S to T: S–T = 40, S–A–T = 15+18, S–B–T = 14+14, S–A–B–T = 15+5+14. Shortest?", "\\min(40,33,28,34) = \\;?", "28", "Totals 40, 33, 28, 34; smallest is 28 (via B).", "Add each route; fewer edges isn't always shorter.", [], 5),
    answer("y8-net-app-p26", "Five towns: cheapest connector picks edges of weight 2, 3, 3, 4 (four edges) to connect all five. Total?", "2 + 3 + 3 + 4 = \\;?", "12", "$2+3+3+4 = 12$ (5 towns need 4 connecting edges).", "Add the four cheapest connecting edges.", [], 5),
    answer("y8-net-app-p27", "Routes A to D: A–B–D = 9+11, A–C–D = 8+13, A–B–C–D = 9+4+13, A–C–B–D = 8+4+11. Shortest?", "\\min(20,21,26,23) = \\;?", "20", "Totals 20, 21, 26, 23; smallest is 20 (via B).", "Add every route and compare.", [], 5),
    answer("y8-net-app-p28", "Six towns connected by a minimum connector use 5 cables of weights 3, 4, 4, 5, 6. Total length?", "3+4+4+5+6 = \\;?", "22", "$3+4+4+5+6 = 22$ (6 towns need 5 connecting cables).", "Add the five cables; n towns need n - 1 edges.", [], 5),
    answer("y8-net-app-p29", "Direct XY = 50; X–A–B–Y = 18+9+15; X–C–Y = 22+20; X–A–C–Y = 18+6+20. Shortest X to Y?", "\\min(50,42,42,44) = \\;?", "42", "Totals 50, 42, 42, 44; the smallest is 42.", "Add each route's weights carefully.", [], 5),
    answer("y8-net-app-p30", "A delivery van must connect depots A, B, C, D, E at least total cost. The cheapest connecting edges are 5, 6, 7, 8. What is the minimum total cost?", "5+6+7+8 = \\;?", "26", "$5+6+7+8 = 26$ (5 depots need 4 connecting edges).", "Add the four cheapest connecting edges.", [], 5),
  ],
  multiPartPractice: [
    {
      id: "y8-net-app-mp1",
      prompt:
        "Four towns A, B, C, D have roads with these distances (km): AB = 5, BC = 4, CD = 6, AC = 8, AD = 20.",
      latex: "AB{=}5,\\; BC{=}4,\\; CD{=}6,\\; AC{=}8,\\; AD{=}20",
      answer: "15",
      hint: "For shortest A to D compare routes; for the connector pick the cheapest edges that link all four.",
      explanation:
        "Part (a): A to D routes: A-C-D = 8+6 = 14, A-B-C-D = 5+4+6 = 15, direct AD = 20. Shortest is 14. Part (b): A-B-C-D totals 5+4+6 = 15. Part (c): minimum connector uses AB=5, BC=4, CD=6 = 15 to link all four (skipping AD=20 and AC=8).",
      parts: [
        {
          key: "a",
          label: "(a)",
          prompt: "Find the shortest distance from A to D.",
          latex: "\\text{Shortest } A \\to D = \\;?",
          marks: 2,
          answer: "14",
          acceptedAnswers: ["14 km"],
          hint: "Compare direct AD with routes via C and via B–C.",
          explanation: "A-C-D = 8 + 6 = 14, which beats A-B-C-D = 15 and direct AD = 20.",
        },
        {
          key: "b",
          label: "(b)",
          prompt: "Find the total distance of the route A–B–C–D.",
          latex: "AB + BC + CD = \\;?",
          marks: 1,
          answer: "15",
          acceptedAnswers: ["15 km"],
          hint: "Add the three edge weights.",
          explanation: "5 + 4 + 6 = 15 km.",
        },
        {
          key: "c",
          label: "(c)",
          prompt: "A minimum connector links all four towns using the cheapest cables AB, BC and CD. Find its total length.",
          latex: "AB + BC + CD = \\;?",
          marks: 1,
          answer: "15",
          acceptedAnswers: ["15 km"],
          hint: "Add the three chosen connecting cables.",
          explanation: "AB + BC + CD = 5 + 4 + 6 = 15 km connects all four towns most cheaply.",
        },
      ],
    },
  ],
};

// ── Lesson map and export ─────────────────────────────────────────────────────

const lessons: Record<string, LessonContent> = {
  "network-fundamentals":      networkFundamentals,
  "paths-and-circuits":        pathsAndCircuits,
  "eulerian-trails-circuits":  eulerianTrailsCircuits,
  "planar-graphs":             planarGraphs,
  "network-applications":      networkApplications,
};

export function year8NetworksLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-8-mathematics") return null;
  if (unit.slug !== "introduction-to-networks") return null;
  const content = lessons[lesson.slug];
  if (!content) return null;
  return {
    syllabusArea: "Number and Algebra",
    moduleTitle: "Introduction to Networks",
    video: {
      title: "Introduction to Networks",
      url: "/videos/placeholder-lesson.mp4",
    },
    masteryPassMark: 0.8,
    ...content,
  };
}
