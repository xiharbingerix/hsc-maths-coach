import type {
  ExplicitLesson,
  LessonOutlineItem,
  PracticeQuestion,
  WorkedExample,
} from "./lessons/differentialCalculus";

export type NewCourseSlug =
  | "year-12-standard-2"
  | "year-11-advanced"
  | "year-11-standard";

export type CourseLessonSeed = {
  slug: string;
  title: string;
  description?: string;
};

export type CourseUnitSeed = {
  slug: string;
  title: string;
  description: string;
  syllabusArea: string;
  focus: string;
  lessons: CourseLessonSeed[];
};

export type CoursePathwaySeed = {
  slug: NewCourseSlug;
  title: string;
  yearLevel: string;
  courseType: string;
  description: string;
  positioning: string;
  units: CourseUnitSeed[];
};

function slugPrefix(slug: string) {
  return slug.split("-").slice(0, 2).join("-");
}

function typedQuestion(id: string, topic: string, index: number): PracticeQuestion {
  const answer = String(index + 2);

  return {
    id,
    prompt: `Short calculation for ${topic}: what is ${index + 1}+1?`,
    latex: `${index + 1}+1`,
    answer,
    acceptedAnswers: [answer],
    hint: "Use the operation shown and keep the answer short.",
    explanation: `The value is ${answer}.`,
  };
}

function choiceQuestion(
  id: string,
  topic: string,
  promptType: "method" | "interpretation" | "classification",
  answer: "A" | "B" | "C" | "D" = "A"
): PracticeQuestion {
  const choices = [
    {
      label: "A",
      text: `Use the key definition or formula for ${topic}.`,
    },
    {
      label: "B",
      text: "Ignore the context and choose the largest number.",
    },
    {
      label: "C",
      text: "Use a formula from an unrelated topic.",
    },
    {
      label: "D",
      text: "Round first, then decide what the question means.",
    },
  ];

  return {
    id,
    prompt: `Choose the best ${promptType} for this ${topic} question.`,
    latex: "\\text{Select A, B, C, or D.}",
    choices,
    answer,
    hint: "Match the method to the topic and context.",
    explanation: "A is the most reliable option because it starts from the relevant definition or formula.",
  };
}

function workedExamples(title: string): WorkedExample[] {
  return [
    {
      title: `${title}: identifying the method`,
      questionLatex: "\\text{Choose the relevant formula or representation.}",
      steps: [
        {
          explanation:
            "Read the question carefully and identify the mathematical feature being tested.",
        },
        {
          explanation:
            "Write down the key formula, definition, or graph feature before calculating.",
          latex: "\\text{method first, calculation second}",
        },
      ],
      finalAnswerLatex: "\\text{A clear setup leads to a markable answer.}",
    },
    {
      title: `${title}: short calculation`,
      questionLatex: "3+2",
      steps: [
        {
          explanation:
            "Keep the working short and use the units or context from the question.",
        },
        {
          explanation: "Calculate the required value.",
          latex: "3+2=5",
        },
      ],
      finalAnswerLatex: "5",
    },
  ];
}

function commonMistakes(topic: string) {
  return [
    {
      mistake: "Starting with a formula from the wrong topic.",
      fix: `Identify that the question is about ${topic} before calculating.`,
    },
    {
      mistake: "Giving a long explanation instead of a clear answer.",
      fix: "Use a short calculation or choose the best labelled option.",
    },
    {
      mistake: "Ignoring units or context.",
      fix: "Check whether the answer is a value, rate, time, amount, or feature.",
    },
    {
      mistake: "Rounding too early.",
      fix: "Keep working exact where possible, then round at the end if needed.",
    },
  ];
}

function labelledChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint: "Eliminate choices that do not match the network definition or context.",
    explanation,
  };
}

function shortAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers,
    hint: "Use the network diagram information directly.",
    explanation: `The answer is ${answer}.`,
  };
}

function financeChoice(
  id: string,
  prompt: string,
  answer: "A" | "B" | "C" | "D",
  choices: [string, string, string, string],
  explanation: string
): PracticeQuestion {
  return {
    id,
    prompt,
    latex: "\\text{Select A, B, C, or D.}",
    choices: ["A", "B", "C", "D"].map((label, index) => ({
      label,
      text: choices[index],
    })),
    answer,
    hint: "Match the calculation to the financial context.",
    explanation,
  };
}

function financeShortAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Use the context and keep the answer short.",
    explanation: `The answer is ${answer}.`,
  };
}

function moneyAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  const numericValue = Number(answer.replace(/[$,]/g, ""));
  const moneyVariants = Number.isFinite(numericValue)
    ? [
        String(numericValue),
        numericValue.toFixed(2),
        numericValue.toLocaleString("en-AU"),
        numericValue.toLocaleString("en-AU", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      ]
    : [answer];
  const currencyVariants = moneyVariants.flatMap((value) => [
    value,
    `$${value}`,
  ]);

  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(
      new Set([answer, ...currencyVariants, ...acceptedAnswers])
    ),
    hint: "Keep the money calculation short and round to cents when needed.",
    explanation: `The answer is ${answer}.`,
  };
}

function measurementAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Use the units in the context and keep the answer short.",
    explanation: `The answer is ${answer}.`,
  };
}

function timeAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Track the context, time format and any date change.",
    explanation: `The answer is ${answer}.`,
  };
}

function dataAnswer(
  id: string,
  prompt: string,
  latex: string,
  answer: string,
  acceptedAnswers: string[] = []
): PracticeQuestion {
  return {
    id,
    prompt,
    latex,
    answer,
    acceptedAnswers: Array.from(new Set([answer, ...acceptedAnswers])),
    hint: "Use the data context and keep the answer short.",
    explanation: `The answer is ${answer}.`,
  };
}

function networkWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "network-diagrams-terminology") {
    return [
      {
        title: "Identifying vertices, edges, and degrees",
        questionLatex:
          "\\text{School map edges: Library-Canteen, Library-Gym, Canteen-Office.}",
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

function networkLessonOverride(
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
        shortAnswer("net-term-g1", "School paths are AB, AC, and AD. What is the degree of A?", "\\deg(A)=?", "3"),
        labelledChoice("net-term-g2", "Which statement best describes a weighted edge?", "A", ["An edge with a number such as distance, time, or cost", "A vertex with exactly two edges", "A network with no vertices", "A route that returns to the start"], "A weighted edge carries a numerical value."),
        labelledChoice("net-term-g3", "A map of one-way delivery streets should be represented by which network?", "B", ["Undirected network", "Directed network", "Unweighted tree only", "Box plot"], "One-way streets need arrows, so the network is directed."),
        labelledChoice("net-term-g4", "A table lists AB=5, AC=7, and CD=4. Which description matches it?", "C", ["Edges AB and CD only", "Vertices A and B only", "Weighted edges AB, AC, and CD", "A directed circuit A-B-C-D-A"], "The table gives three weighted edges."),
      ],
      independentPractice: [
        shortAnswer("net-term-i1", "A vertex is joined to five edges. What is its degree?", "\\deg(v)=?", "5"),
        shortAnswer("net-term-i2", "Connections AB, BC, CD, and DA are listed. How many edges are listed?", "AB,BC,CD,DA", "4"),
        shortAnswer("net-term-i3", "Connections AB, BC, CD, and DA use vertices A, B, C, D. How many vertices are named?", "A,B,C,D", "4"),
        labelledChoice("net-term-i4", "A bus route table gives travel times between stops. What should the times become?", "C", ["Vertex labels", "Directions only", "Edge weights", "Degrees"], "Travel time is a weight on an edge."),
        labelledChoice("net-term-i5", "Which context is a realistic use of a network?", "D", ["Spelling a word", "Naming a colour", "Writing a paragraph", "Planning roads between towns"], "Roads between towns can be modelled using vertices and edges."),
      ],
      commonMistakes: [
        { mistake: "Counting vertices instead of edges when finding degree.", fix: "Degree counts only the edges joined to that one vertex." },
        { mistake: "Leaving arrows off one-way connections.", fix: "Use a directed edge whenever movement or order is one-way." },
        { mistake: "Ignoring weights from a table.", fix: "Write distances, costs, times, or lengths on the matching edges." },
        { mistake: "Drawing extra edges not listed in the table or map.", fix: "Only connect vertices when the information says there is a direct connection." },
      ],
      masteryQuiz: [
        shortAnswer("net-term-m1", "A is connected to B and C. What is the degree of A?", "\\deg(A)=?", "2"),
        labelledChoice("net-term-m2", "In a network, a vertex is:", "A", ["A point such as a town or building", "A number on a connection", "A route returning to the start", "A repeated edge"], "A vertex is a point in the network."),
        labelledChoice("net-term-m3", "Which network type uses arrows?", "B", ["Weighted", "Directed", "Undirected only", "Disconnected"], "Directed networks use arrows."),
        shortAnswer("net-term-m4", "A network has edges AB, BC, CA. How many edges are there?", "AB,BC,CA", "3"),
        labelledChoice("net-term-m5", "A number 12 on an edge most likely represents:", "C", ["A vertex", "A circuit", "A weight", "A degree"], "A number on an edge is a weight."),
        shortAnswer("net-term-m6", "A vertex touches 5 edges. What is its degree?", "\\deg(v)=5", "5"),
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
        labelledChoice("net-path-g1", "A route A-B-C-A starts and ends at A. What is it?", "C", ["Vertex", "Edge", "Circuit", "Weight"], "A circuit returns to its starting vertex."),
        shortAnswer("net-path-g2", "A walking route uses edge weights 3, 4, and 5. What is the total weight?", "3+4+5", "12"),
        labelledChoice("net-path-g3", "What does connected mean?", "A", ["Every vertex can be reached from every other vertex", "Every edge has weight 1", "The network has arrows", "The network has no paths"], "Connected means all vertices are reachable."),
        labelledChoice("net-path-g4", "Why might the shortest route not be the best route?", "D", ["It always is best", "It has no vertices", "It must be a tree", "It may be slower, unsafe, or more costly in context"], "Practical constraints can matter more than distance."),
      ],
      independentPractice: [
        labelledChoice("net-path-i1", "A route that does not repeat an edge is called:", "B", ["Degree", "Trail", "Weight", "Vertex"], "A trail does not repeat edges."),
        shortAnswer("net-path-i2", "Route A-B-C has weights AB=6 and BC=7. Find the total weight.", "6+7", "13"),
        shortAnswer("net-path-i3", "Compare paths A-B-D=9 and A-C-D=8. What is the shortest-path weight?", "\\min(9,8)", "8"),
        labelledChoice("net-path-i4", "A network has an isolated vertex. Is it connected?", "B", ["Yes", "No", "Only if weighted", "Only if directed"], "An isolated vertex cannot be reached."),
        shortAnswer("net-path-i5", "In a 9-vertex network, is a shortest path question within the no-more-than-10-vertices limit? Answer yes or no.", "9\\le 10", "yes", ["Yes", "YES"]),
      ],
      commonMistakes: [
        { mistake: "Calling every route a circuit.", fix: "A circuit must start and end at the same vertex." },
        { mistake: "Finding the route with the fewest edges instead of the lowest total weight.", fix: "For weighted networks, add edge weights and compare totals." },
        { mistake: "Assuming shortest always means best.", fix: "Check time, cost, safety, traffic, and restrictions." },
        { mistake: "Saying a network is connected when a vertex is isolated.", fix: "Every vertex must be reachable from every other vertex." },
      ],
      masteryQuiz: [
        labelledChoice("net-path-m1", "A route that starts and ends at A is a:", "C", ["Path only", "Weight", "Circuit", "Degree"], "A circuit starts and ends at the same vertex."),
        shortAnswer("net-path-m2", "Add path weights 4, 6, and 1.", "4+6+1", "11"),
        labelledChoice("net-path-m3", "A trail cannot repeat:", "B", ["Vertices", "Edges", "Weights", "Labels"], "A trail does not repeat edges."),
        labelledChoice("net-path-m4", "A connected network means:", "A", ["All vertices are reachable", "All weights are equal", "There are no edges", "It must be directed"], "Connected means every vertex can be reached."),
        shortAnswer("net-path-m5", "Paths from A to D have totals 8 and 10. What is the shortest-path weight?", "\\min(8,10)", "8"),
        labelledChoice("net-path-m6", "The shortest path may not be best because:", "D", ["It has the smallest distance", "It uses vertices", "It is drawn on paper", "Other practical factors may matter"], "Context can make a longer route better."),
        shortAnswer("net-path-m7", "A network has 10 vertices. Is this within a no-more-than-10-vertices shortest path question? Answer yes or no.", "10\\le 10", "yes", ["Yes", "YES"]),
        labelledChoice("net-path-m8", "A route A-B-C is best described as:", "A", ["Path", "Degree", "Weight only", "Disconnected network"], "It is a route through connected vertices."),
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
        labelledChoice("net-tree-g1", "Which describes a tree?", "A", ["Connected with no cycles", "Disconnected with arrows", "Only one vertex", "A route with repeated edges"], "A tree is connected and has no cycles."),
        shortAnswer("net-tree-g2", "A tree has 7 vertices. How many edges does it have?", "7-1", "6"),
        labelledChoice("net-tree-g3", "Using Kruskal's method, what should you choose first?", "B", ["The largest edge", "The smallest edge that is allowed", "Any edge that creates a cycle", "Only directed edges"], "Kruskal's method starts with the smallest available edge and avoids cycles."),
        shortAnswer("net-tree-g4", "Selected MST edges have weights 2, 5, and 6. Find the total.", "2+5+6", "13"),
      ],
      independentPractice: [
        shortAnswer("net-tree-i1", "A tree has 5 vertices. How many edges?", "5-1", "4"),
        labelledChoice("net-tree-i2", "A spanning tree must include:", "A", ["All vertices", "All edges", "Only directed edges", "No weights"], "A spanning tree spans all vertices."),
        shortAnswer("net-tree-i3", "Add MST connector weights 4, 4, 7, and 8.", "4+4+7+8", "23"),
        labelledChoice("net-tree-i4", "Which edge should be avoided when building an MST?", "D", ["A low weight edge", "An edge connecting a new vertex", "The first edge chosen", "An edge that creates a cycle"], "MST methods avoid cycles."),
        labelledChoice("net-tree-i5", "A school wants to connect all buildings with least total cable. Use:", "B", ["Shortest path", "Minimum spanning tree", "Circuit", "Degree only"], "This is a minimal connector problem."),
      ],
      commonMistakes: [
        { mistake: "Confusing shortest path with minimum spanning tree.", fix: "Shortest path is between two vertices; MST connects all required vertices." },
        { mistake: "Including an edge that creates a cycle.", fix: "Skip edges that would make a cycle when building an MST." },
        { mistake: "Forgetting to include all vertices.", fix: "A spanning tree must connect every vertex." },
        { mistake: "Choosing the fewest edges without checking weight.", fix: "For an MST, minimise total weight." },
      ],
      masteryQuiz: [
        labelledChoice("net-tree-m1", "A connected network with no cycles is a:", "A", ["Tree", "Circuit", "Directed edge", "Weight"], "That is the definition of a tree."),
        shortAnswer("net-tree-m2", "A tree has 9 vertices. How many edges?", "9-1", "8"),
        labelledChoice("net-tree-m3", "A spanning tree uses:", "C", ["No vertices", "Only one edge", "All vertices", "All possible edges"], "It spans all vertices."),
        shortAnswer("net-tree-m4", "MST weights are 1, 3, 6. Find total.", "1+3+6", "10"),
        labelledChoice("net-tree-m5", "A minimum spanning tree minimises:", "B", ["Number of vertices", "Total edge weight", "Degree of A", "Number of arrows"], "MST minimises total selected weight."),
        labelledChoice("net-tree-m6", "Which situation suits an MST?", "A", ["Connecting towns with least cable", "Finding one fastest route", "Counting survey responses", "Calculating tax"], "MSTs solve minimal connector problems."),
        shortAnswer("net-tree-m7", "A tree has 4 edges. How many vertices?", "4+1", "5"),
        labelledChoice("net-tree-m8", "When choosing MST edges, avoid:", "D", ["Small weights", "New vertices", "All vertices", "Cycles"], "Cycles are not allowed in a tree."),
        shortAnswer("net-tree-m9", "Using Kruskal's method, choose AB=2, BC=3, and CD=4. What is the total?", "2+3+4", "9"),
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
      labelledChoice("net-app-g4", "Table: AB=4, BC=6, AC=5. Which network description is correct?", "A", ["Three weighted edges connect A, B, and C", "Only one vertex is shown", "The edges must be directed", "There are no weights"], "The table shows three weighted edges."),
    ],
    independentPractice: [
      labelledChoice("net-app-i1", "A map with distances between suburbs should use:", "A", ["Weighted edges", "Only isolated vertices", "A box plot", "A frequency table"], "Distances are weights."),
      shortAnswer("net-app-i2", "Add route weights 7 and 8.", "7+8", "15"),
      labelledChoice("net-app-i3", "Shortest path is not always best because:", "D", ["It uses vertices", "It is always free", "It must connect all vertices", "Traffic, safety, or cost may matter"], "Practical constraints can override distance."),
      shortAnswer("net-app-i4", "MST selected weights are 3, 5, and 5. Find total.", "3+5+5", "13"),
      labelledChoice("net-app-i5", "A delivery route asks for the quickest path from Depot to Shop. Which method is most relevant?", "B", ["Minimum spanning tree", "Shortest path", "Counting degree only", "Finding a circuit only"], "A route between two vertices is a shortest-path problem."),
    ],
    commonMistakes: [
      { mistake: "Using MST for a single route question.", fix: "Use shortest path when travelling from one vertex to another." },
      { mistake: "Using shortest path for a connect-everything question.", fix: "Use MST for minimal connector problems." },
      { mistake: "Ignoring arrow direction.", fix: "Follow arrows in directed networks." },
      { mistake: "Ignoring practical judgement.", fix: "Shortest distance may not be best if time, cost, or safety differs." },
    ],
    masteryQuiz: [
      labelledChoice("net-app-m1", "A weighted road map has numbers showing:", "A", ["Distances or costs", "Vertex names", "Circuits only", "Degrees only"], "Weights show quantities such as distance or cost."),
      shortAnswer("net-app-m2", "Route weights are 6, 6, and 2. Find total.", "6+6+2", "14"),
      labelledChoice("net-app-m3", "To connect all parks with minimum path length, use:", "C", ["Shortest path only", "Circuit", "Minimum spanning tree", "Degree"], "Connecting all with minimum total length is MST."),
      labelledChoice("net-app-m4", "A one-way delivery route should be modelled with:", "B", ["Undirected edges", "Directed edges", "No edges", "Only weights"], "One-way movement requires direction."),
      shortAnswer("net-app-m5", "A table lists five direct connections. How many edges are drawn?", "5", "5"),
      labelledChoice("net-app-m6", "A shortest path question with 8 vertices is:", "A", ["Within a no-more-than-10-vertices limit", "Too large", "Not a network", "Always an MST"], "8 is no more than 10."),
      shortAnswer("net-app-m7", "MST weights 2, 4, and 9 total to what?", "2+4+9", "15"),
      labelledChoice("net-app-m8", "Why might a longer route be chosen?", "D", ["It has no edges", "It has fewer vertices always", "It is disconnected", "It may be safer or faster"], "Practical features can matter."),
      shortAnswer("net-app-m9", "If vertex A has 3 incident edges, what is degree of A?", "\\deg(A)=3", "3"),
      labelledChoice("net-app-m10", "Before solving a network application, first:", "A", ["Identify the goal of the problem", "Choose the largest edge", "Ignore weights", "Delete vertices"], "The method depends on the goal."),
    ],
  };
}

function earningMoneyWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "wages-salaries-payslips") {
    return [
      {
        title: "Calculating hourly wages",
        questionLatex: "\\text{Mia works 18 ordinary hours at }\\$24\\text{/hour.}",
        steps: [
          { explanation: "Ordinary hourly pay is hours multiplied by the hourly rate." },
          { explanation: "Multiply 18 by 24.", latex: "18\\times 24=432" },
        ],
        finalAnswerLatex: "\\$432",
      },
      {
        title: "Converting salary to weekly pay",
        questionLatex: "\\text{A salary is }\\$62\\,400\\text{ per year. Find weekly pay.}",
        steps: [
          { explanation: "A salary is usually stated as a yearly amount." },
          { explanation: "Divide by 52 weeks.", latex: "62400\\div 52=1200" },
        ],
        finalAnswerLatex: "\\$1200\\text{ per week}",
      },
      {
        title: "Reading basic payslip fields",
        questionLatex:
          "\\begin{array}{c|c}\\text{Ordinary pay}&\\$560\\\\\\text{Allowance}&\\$40\\\\\\text{Tax withheld}&\\$110\\end{array}",
        steps: [
          { explanation: "Gross pay is the total before deductions." },
          { explanation: "Add ordinary pay and allowances.", latex: "560+40=600" },
        ],
        finalAnswerLatex: "\\text{Gross pay }=\\$600",
      },
    ];
  }

  if (slug === "overtime-penalty-rates-allowances") {
    return [
      {
        title: "Time-and-a-half overtime",
        questionLatex: "\\text{4 overtime hours at time-and-a-half on }\\$30\\text{/hour}",
        steps: [
          { explanation: "Time-and-a-half means multiply the ordinary rate by 1.5.", latex: "30\\times 1.5=45" },
          { explanation: "Multiply by the overtime hours.", latex: "4\\times 45=180" },
        ],
        finalAnswerLatex: "\\$180",
      },
      {
        title: "Double time and ordinary pay",
        questionLatex: "\\text{8 ordinary hours and 2 double-time hours at }\\$28\\text{/hour}",
        steps: [
          { explanation: "Ordinary pay is 8 hours at 28 dollars per hour.", latex: "8\\times 28=224" },
          { explanation: "Double time is 2 hours at 56 dollars per hour.", latex: "2\\times (2\\times 28)=112" },
        ],
        finalAnswerLatex: "\\$224+\\$112=\\$336",
      },
      {
        title: "Adding an allowance",
        questionLatex: "\\text{Base shift pay }\\$210\\text{ plus meal allowance }\\$18.50",
        steps: [
          { explanation: "Allowances are added to earnings when the question includes them." },
          { explanation: "Add the allowance to the base shift pay.", latex: "210+18.50=228.50" },
        ],
        finalAnswerLatex: "\\$228.50",
      },
    ];
  }

  if (slug === "commission-piecework") {
    return [
      {
        title: "Commission as a percentage of sales",
        questionLatex: "\\text{Commission is }6\\%\\text{ of }\\$3500\\text{ in sales.}",
        steps: [
          { explanation: "Convert 6 percent to 0.06." },
          { explanation: "Multiply by the sales amount.", latex: "0.06\\times 3500=210" },
        ],
        finalAnswerLatex: "\\$210",
      },
      {
        title: "Base pay plus commission",
        questionLatex: "\\text{Base pay }\\$480\\text{ plus }4\\%\\text{ of }\\$2500\\text{ sales}",
        steps: [
          { explanation: "Calculate the commission first.", latex: "0.04\\times 2500=100" },
          { explanation: "Add it to the base pay.", latex: "480+100=580" },
        ],
        finalAnswerLatex: "\\$580",
      },
      {
        title: "Piecework earnings",
        questionLatex: "\\text{48 items paid at }\\$3.75\\text{ per item}",
        steps: [
          { explanation: "Piecework pays for each item completed." },
          { explanation: "Multiply the number of items by the piece rate.", latex: "48\\times 3.75=180" },
        ],
        finalAnswerLatex: "\\$180",
      },
    ];
  }

  if (slug === "tax-deductions-net-pay") {
    return [
      {
        title: "Net pay from gross pay and deductions",
        questionLatex: "\\text{Gross pay }\\$920,\\ \\text{tax }\\$165,\\ \\text{other deduction }\\$25",
        steps: [
          { explanation: "Net pay is gross pay minus all deductions." },
          { explanation: "Subtract the tax and the other deduction.", latex: "920-165-25=730" },
        ],
        finalAnswerLatex: "\\$730",
      },
      {
        title: "Percentage deduction",
        questionLatex: "\\text{A }5\\%\\text{ deduction is taken from }\\$840.",
        steps: [
          { explanation: "Convert 5 percent to 0.05." },
          { explanation: "Multiply by gross pay.", latex: "0.05\\times 840=42" },
        ],
        finalAnswerLatex: "\\$42",
      },
      {
        title: "Interpreting a payslip",
        questionLatex:
          "\\begin{array}{c|c}\\text{Gross pay}&\\$760\\\\\\text{Tax withheld}&\\$118\\\\\\text{Union fee}&\\$12\\end{array}",
        steps: [
          { explanation: "Tax withheld and union fees are deductions." },
          { explanation: "Subtract both from gross pay.", latex: "760-118-12=630" },
        ],
        finalAnswerLatex: "\\text{Net pay }=\\$630",
      },
    ];
  }

  return [
    {
      title: `${title}: mixed gross pay question`,
      questionLatex:
        "\\text{Ordinary pay }\\$540,\\ \\text{overtime }\\$90,\\ \\text{allowance }\\$25",
      steps: [
        { explanation: "Gross pay includes all earnings before deductions." },
        { explanation: "Add ordinary pay, overtime and allowance.", latex: "540+90+25=655" },
      ],
      finalAnswerLatex: "\\$655",
    },
    {
      title: `${title}: commission and net pay`,
      questionLatex:
        "\\text{Base }\\$500,\\ 3\\%\\text{ of }\\$4000\\text{ sales, deductions }\\$130",
      steps: [
        { explanation: "Calculate commission first.", latex: "0.03\\times 4000=120" },
        { explanation: "Find gross pay, then subtract deductions.", latex: "500+120-130=490" },
      ],
      finalAnswerLatex: "\\$490",
    },
  ];
}

function earningMoneyLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-standard" || unit.slug !== "earning-money") {
    return null;
  }

  const base = {
    workedExamples: earningMoneyWorkedExamples(lesson.slug, lesson.title),
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "wages-salaries-payslips") {
    return {
      ...base,
      description:
        "Calculate hourly wages and salary pay, then interpret ordinary hours, gross pay, and basic payslip fields.",
      learningIntention:
        "Calculate wages and salary amounts and read basic information from payslips.",
      successCriteria: [
        "Calculate hourly pay from ordinary hours and an hourly rate.",
        "Convert a yearly salary to weekly pay.",
        "Identify gross pay on a simple payslip.",
        "Compare wage and salary earning contexts.",
      ],
      teaching: {
        paragraphs: [
          "Hourly wages are paid using an hourly rate. Ordinary hours are the standard hours paid at the normal rate.",
          "A salary is usually a fixed yearly amount. To estimate weekly salary pay, divide the yearly salary by 52.",
          "Gross pay is the amount earned before tax and other deductions. A payslip may show ordinary pay, allowances, tax withheld, deductions, and net pay.",
          "Wages can change with hours worked, while salaries are more stable across pay periods.",
        ],
        latexBlocks: [
          "\\text{hourly pay}=\\text{ordinary hours}\\times\\text{hourly rate}",
          "\\text{weekly salary}=\\text{annual salary}\\div 52",
        ],
      },
      guidedPractice: [
        moneyAnswer("earn-wage-g1", "Lina works 12 ordinary hours at a bookstore at 25 dollars per hour. What is her gross pay for the week?", "12\\times 25", "300", ["$300", "300.00", "$300.00"]),
        moneyAnswer("earn-wage-g2", "A school office trainee is paid a salary of 52,000 dollars per year. What is the weekly salary amount?", "52000\\div 52", "1000", ["$1000", "1,000", "$1,000", "1000.00", "$1000.00"]),
        financeChoice("earn-wage-g3", "Which payslip field shows pay before deductions?", "B", ["Net pay", "Gross pay", "Tax withheld", "Superannuation"], "Gross pay is before deductions."),
        financeChoice("earn-wage-g4", "Which worker is most clearly paid a wage?", "A", ["Paid 28 dollars for each hour worked", "Paid 70,000 dollars per year", "Paid a fixed monthly salary", "Paid once per year only"], "Hourly pay is a wage structure."),
      ],
      independentPractice: [
        moneyAnswer("earn-wage-i1", "Kai works 20 ordinary hours at a swimming centre for 22 dollars per hour. What gross pay should appear on his payslip?", "20\\times 22", "440", ["$440", "440.00", "$440.00"]),
        moneyAnswer("earn-wage-i2", "A junior receptionist has an annual salary of 62,400 dollars. What is the weekly salary amount?", "62400\\div 52", "1200", ["$1200", "1,200", "$1,200", "1200.00", "$1200.00"]),
        moneyAnswer("earn-wage-i3", "A payslip lists ordinary pay of 510 dollars and a travel allowance of 35 dollars. What is the gross pay?", "510+35", "545", ["$545", "545.00", "$545.00"]),
        financeChoice("earn-wage-i4", "Which statement is true about salary?", "C", ["It is always paid by the hour", "It cannot be converted to weekly pay", "It is often stated as a yearly amount", "It is the same as tax withheld"], "Salary is usually stated annually."),
        financeChoice("earn-wage-i5", "A student comparing two jobs should compare what over the same time period?", "D", ["Only job titles", "Only workplace distance", "Only tax labels", "Expected earnings"], "Earnings should be compared over equivalent time periods."),
      ],
      commonMistakes: [
        { mistake: "Using net pay when the question asks for gross pay.", fix: "Gross pay is before deductions; net pay is after deductions." },
        { mistake: "Forgetting to multiply hours by the hourly rate.", fix: "Hourly wage questions need hours times rate." },
        { mistake: "Dividing salary by 12 when weekly pay is requested.", fix: "Use 52 for weekly pay from an annual salary." },
        { mistake: "Comparing a weekly wage with a yearly salary directly.", fix: "Convert to the same time period before comparing." },
      ],
      masteryQuiz: [
        moneyAnswer("earn-wage-m1", "Amelia works a short cafe shift of 10 ordinary hours at 30 dollars per hour. Find her gross pay.", "10\\times 30", "300", ["$300", "300.00", "$300.00"]),
        moneyAnswer("earn-wage-m2", "A trainee administrator has an annual salary of 41,600 dollars. Find the weekly salary amount.", "41600\\div 52", "800", ["$800", "800.00", "$800.00"]),
        financeChoice("earn-wage-m3", "Ordinary hours are:", "A", ["Standard hours paid at the normal rate", "Hours paid at double time", "Tax withheld", "A deduction"], "Ordinary hours are paid at the ordinary rate."),
        financeChoice("earn-wage-m4", "Gross pay means:", "B", ["Pay after deductions", "Pay before deductions", "Tax only", "Superannuation only"], "Gross pay is before deductions."),
        moneyAnswer("earn-wage-m5", "A payslip lists ordinary pay of 480 dollars and a meal allowance of 20 dollars. What is the gross pay?", "480+20", "500", ["$500", "500.00", "$500.00"]),
        moneyAnswer("earn-wage-m6", "Jay works 15 ordinary hours at a sports centre for 26 dollars per hour. Find his gross pay.", "15\\times 26", "390", ["$390", "390.00", "$390.00"]),
        financeChoice("earn-wage-m7", "Which is a salary context?", "C", ["Paid per item", "Paid per hour only", "Paid 78,000 dollars per year", "Paid only commission"], "A yearly amount is a salary context."),
        moneyAnswer("earn-wage-m8", "A trainee manager's salary is 57,200 dollars per year. What is the weekly salary amount?", "57200\\div 52", "1100", ["$1100", "1,100", "$1,100", "1100.00", "$1100.00"]),
        financeChoice("earn-wage-m9", "Which payslip field is a deduction?", "D", ["Ordinary pay", "Allowance", "Gross pay", "Tax withheld"], "Tax withheld is deducted from gross pay."),
        moneyAnswer("earn-wage-m10", "A student works 18 ordinary hours at a cinema for 20 dollars per hour. What is the gross pay?", "18\\times 20", "360", ["$360", "360.00", "$360.00"]),
      ],
    };
  }

  if (lesson.slug === "overtime-penalty-rates-allowances") {
    return {
      ...base,
      description:
        "Calculate overtime, time-and-a-half, double time, penalty rates, allowances, and total earnings with mixed rates.",
      learningIntention:
        "Calculate total earnings when ordinary pay is combined with overtime, penalty rates, and allowances.",
      successCriteria: [
        "Calculate time-and-a-half and double-time rates.",
        "Calculate pay for hours worked at mixed rates.",
        "Add allowances to earnings when appropriate.",
        "Interpret penalty-rate contexts on simple payslips.",
      ],
      teaching: {
        paragraphs: [
          "Overtime is extra work beyond ordinary hours. It may be paid at a higher rate.",
          "Time-and-a-half means 1.5 times the ordinary hourly rate. Double time means 2 times the ordinary hourly rate.",
          "Penalty rates are higher rates for certain times, such as weekends or public holidays. Allowances are extra amounts paid for specific costs or duties.",
          "For mixed-rate questions, calculate each part separately, then add them for total gross earnings.",
        ],
        latexBlocks: [
          "\\text{time-and-a-half rate}=1.5\\times\\text{ordinary rate}",
          "\\text{total earnings}=\\text{ordinary pay}+\\text{overtime pay}+\\text{allowances}",
        ],
      },
      guidedPractice: [
        moneyAnswer("earn-ot-g1", "A cinema pays time-and-a-half after 9 pm. If the ordinary rate is 30 dollars per hour, what is the overtime hourly rate?", "1.5\\times 30", "45", ["$45", "45.00", "$45.00"]),
        moneyAnswer("earn-ot-g2", "Sam works 3 public-holiday hours at double time. The ordinary rate is 24 dollars per hour. Find the public-holiday pay.", "3\\times 2\\times 24", "144", ["$144", "144.00", "$144.00"]),
        moneyAnswer("earn-ot-g3", "A payslip lists ordinary pay 220 dollars, overtime 90 dollars, and a laundry allowance 15 dollars. Find gross earnings.", "220+90+15", "325", ["$325", "325.00", "$325.00"]),
        financeChoice("earn-ot-g4", "Which rate is highest?", "C", ["Ordinary rate", "Time-and-a-half", "Double time", "A zero allowance"], "Double time is 2 times the ordinary rate."),
      ],
      independentPractice: [
        moneyAnswer("earn-ot-i1", "A supermarket assistant works 4 overtime hours at time-and-a-half. The ordinary rate is 28 dollars per hour. What is the overtime pay?", "4\\times 1.5\\times 28", "168", ["$168", "168.00", "$168.00"]),
        moneyAnswer("earn-ot-i2", "A bowling alley roster shows 8 ordinary hours at 25 dollars per hour and 2 public-holiday hours at double time. What is the total pay?", "8\\times 25+2\\times 2\\times 25", "300", ["$300", "300.00", "$300.00"]),
        moneyAnswer("earn-ot-i3", "A restaurant shift pays 190 dollars plus a meal allowance of 18.50 dollars. What is the total shift pay?", "190+18.50", "208.50", ["$208.50", "208.5", "$208.5"]),
        financeChoice("earn-ot-i4", "A Sunday shift paid at a higher rate is most likely an example of:", "B", ["Salary conversion", "Penalty rate", "Piecework", "Net pay"], "Penalty rates are higher rates for certain times."),
        moneyAnswer("earn-ot-i5", "A tutoring centre pays time-and-a-half for late shifts. If the ordinary rate is 32 dollars per hour, find the late-shift hourly rate.", "1.5\\times 32", "48", ["$48", "48.00", "$48.00"]),
      ],
      commonMistakes: [
        { mistake: "Applying overtime rates to all hours.", fix: "Apply higher rates only to the hours described as overtime or penalty hours." },
        { mistake: "Using 1.5 dollars instead of multiplying by 1.5.", fix: "Time-and-a-half means 1.5 times the ordinary hourly rate." },
        { mistake: "Forgetting to add allowances.", fix: "If the question says an allowance is paid, add it to earnings." },
        { mistake: "Mixing net pay with gross earnings.", fix: "Overtime and allowances are part of gross earnings before deductions." },
      ],
      masteryQuiz: [
        moneyAnswer("earn-ot-m1", "A retail award pays time-and-a-half on weeknights. If the ordinary rate is 20 dollars per hour, find the weeknight hourly rate.", "1.5\\times 20", "30", ["$30", "30.00", "$30.00"]),
        moneyAnswer("earn-ot-m2", "A casual worker completes 5 Sunday hours at double time. The ordinary rate is 18 dollars per hour. Find the Sunday pay.", "5\\times 2\\times 18", "180", ["$180", "180.00", "$180.00"]),
        moneyAnswer("earn-ot-m3", "A rostered shift pays 240 dollars ordinary pay and 60 dollars overtime pay. What are the total gross earnings?", "240+60", "300", ["$300", "300.00", "$300.00"]),
        financeChoice("earn-ot-m4", "A travel allowance should usually be:", "A", ["Added to earnings", "Subtracted as tax", "Ignored", "Divided by 52"], "Allowances are extra paid amounts in these contexts."),
        moneyAnswer("earn-ot-m5", "A lifeguard works 2 overtime hours at time-and-a-half. The ordinary rate is 40 dollars per hour. Find overtime pay.", "2\\times 1.5\\times 40", "120", ["$120", "120.00", "$120.00"]),
        moneyAnswer("earn-ot-m6", "A weekly payslip shows 320 dollars ordinary pay, 80 dollars penalty pay and a 25 dollar travel allowance. Find gross earnings.", "320+80+25", "425", ["$425", "425.00", "$425.00"]),
        financeChoice("earn-ot-m7", "Double time means:", "B", ["1.5 times the ordinary rate", "2 times the ordinary rate", "Half the ordinary rate", "No pay"], "Double time doubles the ordinary rate."),
        moneyAnswer("earn-ot-m8", "A warehouse pays double time on a public holiday. If ordinary pay is 27 dollars per hour, find the public-holiday hourly rate.", "2\\times 27", "54", ["$54", "54.00", "$54.00"]),
        financeChoice("earn-ot-m9", "The best first step in a mixed-rate question is:", "D", ["Guess the total", "Subtract tax first", "Ignore ordinary hours", "Separate the hours by pay rate"], "Separate ordinary, overtime and penalty hours first."),
        moneyAnswer("earn-ot-m10", "A delivery shift pays 150 dollars plus a 12 dollar travel allowance. What are the total earnings?", "150+12", "162", ["$162", "162.00", "$162.00"]),
      ],
    };
  }

  if (lesson.slug === "commission-piecework") {
    return {
      ...base,
      description:
        "Calculate commission, base pay plus commission, piecework earnings, and compare earning structures for reasonableness.",
      learningIntention:
        "Calculate commission and piecework earnings and compare different earning structures.",
      successCriteria: [
        "Calculate commission as a percentage of sales.",
        "Add base pay and commission.",
        "Calculate piecework earnings from an item rate.",
        "Choose reasonable earning structures for practical contexts.",
      ],
      teaching: {
        paragraphs: [
          "Commission is pay based on sales. It is often calculated as a percentage of the sales amount.",
          "Some jobs pay a base amount plus commission. Calculate the commission first, then add the base pay.",
          "Piecework pays a fixed amount for each item made, delivered, or completed.",
          "When comparing earning structures, use the same sales amount, item count, or time period so the comparison is fair.",
        ],
        latexBlocks: [
          "\\text{commission}=\\text{commission rate}\\times\\text{sales}",
          "\\text{piecework pay}=\\text{number of items}\\times\\text{rate per item}",
        ],
      },
      guidedPractice: [
        moneyAnswer("earn-com-g1", "A shoe-store worker earns 5 percent commission on 2000 dollars of sales. Find the commission.", "0.05\\times 2000", "100", ["$100", "100.00", "$100.00"]),
        moneyAnswer("earn-com-g2", "Noah earns 450 dollars base pay and 80 dollars commission for the week. Find total earnings.", "450+80", "530", ["$530", "530.00", "$530.00"]),
        moneyAnswer("earn-com-g3", "A farm worker is paid 4 dollars for each tray packed and packs 35 trays. Find piecework pay.", "4\\times 35", "140", ["$140", "140.00", "$140.00"]),
        financeChoice("earn-com-g4", "Which job uses commission?", "A", ["Paid 6 percent of sales", "Paid a fixed yearly salary", "Paid only for hours worked", "Paid tax withheld"], "Commission is based on sales."),
      ],
      independentPractice: [
        moneyAnswer("earn-com-i1", "A phone salesperson earns 8 percent commission on 1500 dollars sales. Find the commission.", "0.08\\times 1500", "120", ["$120", "120.00", "$120.00"]),
        moneyAnswer("earn-com-i2", "A sales assistant earns 500 dollars base pay plus 4 percent of 3000 dollars sales. Find total earnings.", "500+0.04\\times 3000", "620", ["$620", "620.00", "$620.00"]),
        moneyAnswer("earn-com-i3", "Piecework pays 2.50 dollars for each brochure delivered. A student delivers 60 brochures. Find earnings.", "2.50\\times 60", "150", ["$150", "150.00", "$150.00"]),
        financeChoice("earn-com-i4", "Which comparison is fairest?", "C", ["One day vs one year", "Before tax vs after tax", "Both options over the same sales amount", "Ignoring the number of items"], "Compare over the same basis."),
        financeChoice("earn-com-i5", "If sales are zero, which earning structure still gives pay?", "B", ["Commission only", "Base pay plus commission", "Piecework with zero items", "Percentage of sales only"], "Base pay still applies even if commission is zero."),
      ],
      commonMistakes: [
        { mistake: "Using 5 instead of 0.05 for 5 percent.", fix: "Convert percentages to decimals before multiplying." },
        { mistake: "Forgetting to add base pay.", fix: "For base plus commission, add both parts." },
        { mistake: "Treating piecework as hourly pay.", fix: "Piecework uses number of items times rate per item." },
        { mistake: "Comparing earning structures over different amounts.", fix: "Use the same sales, items, or time period." },
      ],
      masteryQuiz: [
        moneyAnswer("earn-com-m1", "A weekend market stall pays 10 percent commission on 900 dollars sales. Find the commission.", "0.10\\times 900", "90", ["$90", "90.00", "$90.00"]),
        moneyAnswer("earn-com-m2", "A real-estate assistant earns 3 percent commission on 4000 dollars of referral sales. Find the commission.", "0.03\\times 4000", "120", ["$120", "120.00", "$120.00"]),
        moneyAnswer("earn-com-m3", "A shop assistant earns 350 dollars base pay plus 95 dollars commission. Find total pay.", "350+95", "445", ["$445", "445.00", "$445.00"]),
        moneyAnswer("earn-com-m4", "A warehouse assistant labels 50 parcels at a piecework rate of 1.80 dollars each. What is the pay?", "1.80\\times 50", "90", ["$90", "90.00", "$90.00"]),
        financeChoice("earn-com-m5", "Commission is usually based on:", "A", ["Sales", "Tax withheld", "Net pay only", "The number of weeks in a year"], "Commission is commonly a percentage of sales."),
        moneyAnswer("earn-com-m6", "A retail worker earns 600 dollars base pay plus 5 percent of 2000 dollars sales. Find total pay.", "600+0.05\\times 2000", "700", ["$700", "700.00", "$700.00"]),
        financeChoice("earn-com-m7", "Piecework pays according to:", "C", ["Yearly salary", "Tax rate", "Number of items completed", "Travel distance only"], "Piecework pays per item."),
        moneyAnswer("earn-com-m8", "A student earns 7 percent commission on 1000 dollars of fundraising sales. Find the commission.", "0.07\\times 1000", "70", ["$70", "70.00", "$70.00"]),
        financeChoice("earn-com-m9", "Which earning structure has the most variable pay?", "D", ["Fixed salary", "Fixed allowance", "Fixed hourly shift", "Commission only"], "Commission-only pay changes with sales."),
        moneyAnswer("earn-com-m10", "A student helper packs 24 gift boxes at a piecework rate of 5 dollars each. What is the pay?", "24\\times 5", "120", ["$120", "120.00", "$120.00"]),
      ],
    };
  }

  if (lesson.slug === "tax-deductions-net-pay") {
    return {
      ...base,
      description:
        "Use gross pay, tax withheld, deductions and percentage deductions to calculate net pay and interpret payslips.",
      learningIntention:
        "Calculate net pay from gross pay and deductions, and interpret simplified payslip information.",
      successCriteria: [
        "Identify deductions on a payslip.",
        "Calculate net pay using gross pay minus deductions.",
        "Calculate percentage deductions.",
        "Interpret tax withheld and other deductions in simple contexts.",
      ],
      teaching: {
        paragraphs: [
          "Deductions are amounts taken out of gross pay. In simplified questions these may include tax withheld, union fees, insurance, or other listed deductions.",
          "Net pay is the amount received after deductions are subtracted from gross pay.",
          "Percentage deductions are found by converting the percentage to a decimal and multiplying by the relevant amount.",
          "Payslip questions often ask you to identify which values are earnings, which are deductions, and what the final net pay should be.",
        ],
        latexBlocks: [
          "\\text{net pay}=\\text{gross pay}-\\text{total deductions}",
          "\\text{percentage deduction}=\\frac{p}{100}\\times\\text{gross pay}",
        ],
      },
      guidedPractice: [
        moneyAnswer("earn-tax-g1", "A payslip shows gross pay of 800 dollars and tax withheld of 150 dollars. What is the net pay?", "800-150", "650", ["$650", "650.00", "$650.00"]),
        moneyAnswer("earn-tax-g2", "A payslip shows gross pay of 920 dollars, tax withheld of 165 dollars, and a uniform deduction of 25 dollars. What is the net pay?", "920-165-25", "730", ["$730", "730.00", "$730.00"]),
        moneyAnswer("earn-tax-g3", "A payslip applies a 5 percent equipment deduction to 600 dollars gross pay. Find the deduction.", "0.05\\times 600", "30", ["$30", "30.00", "$30.00"]),
        financeChoice("earn-tax-g4", "Which payslip item is a deduction?", "C", ["Ordinary pay", "Allowance", "Tax withheld", "Gross pay"], "Tax withheld is taken out of gross pay."),
      ],
      independentPractice: [
        moneyAnswer("earn-tax-i1", "A payslip lists gross pay of 760 dollars, tax withheld of 118 dollars and a union fee of 12 dollars. What is the net pay?", "760-118-12", "630", ["$630", "630.00", "$630.00"]),
        moneyAnswer("earn-tax-i2", "A casual worker has an 8 percent tax withholding on 500 dollars gross pay. Find the tax withheld.", "0.08\\times 500", "40", ["$40", "40.00", "$40.00"]),
        moneyAnswer("earn-tax-i3", "A weekly payslip shows gross pay of 1000 dollars and total deductions of 220 dollars. What is the net pay?", "1000-220", "780", ["$780", "780.00", "$780.00"]),
        financeChoice("earn-tax-i4", "Net pay is best described as:", "B", ["Pay before deductions", "Pay after deductions", "Tax before gross pay", "Allowance only"], "Net pay is the amount left after deductions."),
        moneyAnswer("earn-tax-i5", "A staff discount repayment is a 3 percent deduction from 900 dollars gross pay. What is the deduction?", "0.03\\times 900", "27", ["$27", "27.00", "$27.00"]),
      ],
      commonMistakes: [
        { mistake: "Adding deductions instead of subtracting them.", fix: "Deductions are taken away from gross pay." },
        { mistake: "Confusing gross pay and net pay.", fix: "Gross is before deductions; net is after deductions." },
        { mistake: "Using the percentage number directly.", fix: "Convert percentages to decimals before multiplying." },
        { mistake: "Ignoring small listed deductions.", fix: "Subtract every deduction named in the question." },
      ],
      masteryQuiz: [
        moneyAnswer("earn-tax-m1", "A student worker's payslip shows gross pay of 700 dollars and tax withheld of 120 dollars. What is the net pay?", "700-120", "580", ["$580", "580.00", "$580.00"]),
        moneyAnswer("earn-tax-m2", "A payslip shows gross pay of 850 dollars and total deductions of 200 dollars. What is the net pay?", "850-200", "650", ["$650", "650.00", "$650.00"]),
        moneyAnswer("earn-tax-m3", "A payslip with gross pay 460 dollars has a 10 percent tax withholding. Find the tax withheld.", "0.10\\times 460", "46", ["$46", "46.00", "$46.00"]),
        financeChoice("earn-tax-m4", "Tax withheld is:", "A", ["A deduction", "Gross pay", "An allowance", "A salary"], "Tax withheld is deducted."),
        moneyAnswer("earn-tax-m5", "A payslip lists gross pay of 960 dollars, tax withheld of 180 dollars and a union fee of 15 dollars. What is the net pay?", "960-180-15", "765", ["$765", "765.00", "$765.00"]),
        financeChoice("earn-tax-m6", "To find net pay, calculate:", "C", ["Gross plus deductions", "Tax times salary", "Gross minus deductions", "Allowance minus gross"], "Net pay is gross pay less deductions."),
        moneyAnswer("earn-tax-m7", "A 4 percent uniform deduction is taken from 750 dollars gross pay. Find the deduction.", "0.04\\times 750", "30", ["$30", "30.00", "$30.00"]),
        moneyAnswer("earn-tax-m8", "A payslip shows net pay of 540 dollars after 60 dollars of deductions. What was the gross pay?", "540+60", "600", ["$600", "600.00", "$600.00"]),
        financeChoice("earn-tax-m9", "Which item increases gross earnings rather than reducing pay?", "D", ["Tax withheld", "Union fee", "Insurance deduction", "Allowance"], "An allowance is added to earnings."),
        moneyAnswer("earn-tax-m10", "A fortnightly payslip shows gross pay of 1200 dollars and total deductions of 275 dollars. What is the net pay?", "1200-275", "925", ["$925", "925.00", "$925.00"]),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed earning-money questions involving payslips, overtime, commission, allowances, gross pay, and net pay.",
    learningIntention:
      "Apply earning-money skills to mixed practical exam-style questions.",
    successCriteria: [
      "Choose the correct method for wages, salary, overtime, commission, or net pay.",
      "Calculate gross pay and net pay in short practical contexts.",
      "Interpret payslip information accurately.",
      "Check whether an earning calculation is reasonable.",
    ],
    teaching: {
      paragraphs: [
        "Mixed earning-money questions often combine several ideas, such as ordinary pay, overtime, allowances, commission, tax and net pay.",
        "Start by identifying what is being asked: gross pay, net pay, a deduction, commission, piecework, or a comparison.",
        "Calculate each earning component separately before adding them. Subtract deductions only when the question asks for net pay.",
        "A reasonable answer should match the context. For example, double time should be higher than ordinary pay, and net pay should be less than gross pay when deductions apply.",
      ],
      latexBlocks: [
        "\\text{gross pay}=\\text{all earnings before deductions}",
        "\\text{net pay}=\\text{gross pay}-\\text{deductions}",
      ],
    },
    guidedPractice: [
      financeChoice("earn-exam-g1", "A question asks for pay before tax. Which value is needed?", "A", ["Gross pay", "Net pay", "Tax withheld", "Total deductions only"], "Pay before tax is gross pay."),
      moneyAnswer("earn-exam-g2", "A payslip table lists ordinary pay 500 dollars, overtime pay 120 dollars, and a meal allowance 30 dollars. What is the gross pay?", "500+120+30", "650", ["$650", "650.00", "$650.00"]),
        moneyAnswer("earn-exam-g3", "A salesperson earns 6 percent commission on 2500 dollars sales. Find the commission.", "0.06\\times 2500", "150", ["$150", "150.00", "$150.00"]),
      moneyAnswer("earn-exam-g4", "A payslip shows gross pay of 650 dollars and total deductions of 140 dollars. What is the net pay?", "650-140", "510", ["$510", "510.00", "$510.00"]),
    ],
    independentPractice: [
      moneyAnswer("earn-exam-i1", "A roster shows a library assistant worked 16 ordinary hours at 24 dollars per hour. What is the ordinary pay?", "16\\times 24", "384", ["$384", "384.00", "$384.00"]),
      moneyAnswer("earn-exam-i2", "A public-holiday shift pays 3 double-time hours. The ordinary rate is 30 dollars per hour. What is the overtime pay?", "3\\times 2\\times 30", "180", ["$180", "180.00", "$180.00"]),
      moneyAnswer("earn-exam-i3", "A sales assistant earns 420 dollars base pay plus 5 percent commission on 1600 dollars of sales. What are the total earnings?", "420+0.05\\times 1600", "500", ["$500", "500.00", "$500.00"]),
      financeChoice("earn-exam-i4", "Which conclusion is reasonable?", "B", ["Net pay is always higher than gross pay", "Net pay is lower than gross pay when deductions apply", "Tax withheld is added to net pay", "Allowances are always deductions"], "Deductions reduce gross pay to net pay."),
      moneyAnswer("earn-exam-i5", "A payslip lists gross pay of 880 dollars, tax withheld of 150 dollars, and other deductions of 20 dollars. What is the net pay?", "880-150-20", "710", ["$710", "710.00", "$710.00"]),
    ],
    commonMistakes: [
      { mistake: "Starting calculations before identifying what the question asks for.", fix: "Decide whether the answer is gross pay, net pay, commission, overtime, or a deduction." },
      { mistake: "Subtracting deductions when asked for gross pay.", fix: "Gross pay is before deductions." },
      { mistake: "Forgetting commission or allowances in total earnings.", fix: "Add all earnings components before deductions." },
      { mistake: "Giving an unreasonable result without checking.", fix: "Net pay should be less than gross pay when deductions are included." },
    ],
    masteryQuiz: [
      financeChoice("earn-exam-m1", "Which method finds ordinary hourly pay?", "A", ["Hours times hourly rate", "Gross minus tax", "Sales times tax", "Salary divided by 12 always"], "Hourly pay uses hours times rate."),
        moneyAnswer("earn-exam-m2", "A cafe roster shows 14 ordinary hours at 26 dollars per hour. Find ordinary pay.", "14\\times 26", "364", ["$364", "364.00", "$364.00"]),
        moneyAnswer("earn-exam-m3", "A Saturday shift is paid at time-and-a-half. If the ordinary rate is 34 dollars per hour, find the Saturday hourly rate.", "1.5\\times 34", "51", ["$51", "51.00", "$51.00"]),
        moneyAnswer("earn-exam-m4", "A sales assistant earns 4 percent commission on 5000 dollars sales. Find the commission.", "0.04\\times 5000", "200", ["$200", "200.00", "$200.00"]),
      financeChoice("earn-exam-m5", "A payslip asks for pay after deductions. Find:", "B", ["Gross pay", "Net pay", "Allowance only", "Hourly rate"], "Pay after deductions is net pay."),
      moneyAnswer("earn-exam-m6", "A payslip shows gross pay of 720 dollars and deductions of 155 dollars. What is the net pay?", "720-155", "565", ["$565", "565.00", "$565.00"]),
      moneyAnswer("earn-exam-m7", "A warehouse worker is paid 3 dollars per parcel and packs 75 parcels. What is the piecework pay?", "3\\times 75", "225", ["$225", "225.00", "$225.00"]),
      financeChoice("earn-exam-m8", "Which item is added to earnings?", "C", ["Tax withheld", "Union fee", "Meal allowance", "Insurance deduction"], "A meal allowance is added."),
      moneyAnswer("earn-exam-m9", "A payslip has ordinary pay of 400 dollars, overtime pay of 90 dollars, and tax withheld of 80 dollars. What is the net pay?", "400+90-80", "410", ["$410", "410.00", "$410.00"]),
      financeChoice("earn-exam-m10", "Which answer is most reasonable if gross pay is 600 dollars and deductions apply?", "D", ["700 dollars net pay", "6000 dollars net pay", "No net pay can exist", "520 dollars net pay"], "Net pay should be less than gross pay when deductions apply."),
    ],
  };
}

function managingMoneyWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "budgets-cash-flow") {
    return [
      {
        title: "Finding a weekly surplus",
        questionLatex:
          "\\begin{array}{c|c}\\text{Income}&\\$420\\\\\\text{Transport}&\\$60\\\\\\text{Food}&\\$95\\\\\\text{Subscriptions}&\\$18\\\\\\text{Savings}&\\$80\\end{array}",
        steps: [
          { explanation: "Add the expenses and planned savings.", latex: "60+95+18+80=253" },
          { explanation: "Subtract this from income to find the surplus.", latex: "420-253=167" },
        ],
        finalAnswerLatex: "\\$167\\text{ surplus}",
      },
      {
        title: "Recognising a deficit",
        questionLatex:
          "\\text{Income }\\$310,\\ \\text{total expenses }\\$345",
        steps: [
          { explanation: "A deficit occurs when expenses are greater than income." },
          { explanation: "Find the difference.", latex: "345-310=35" },
        ],
        finalAnswerLatex: "\\$35\\text{ deficit}",
      },
      {
        title: "Estimating a monthly amount",
        questionLatex: "\\text{A student saves }\\$45\\text{ each week. Estimate 4-week monthly savings.}",
        steps: [
          { explanation: "Use 4 weeks as a simple monthly estimate." },
          { explanation: "Multiply the weekly amount by 4.", latex: "45\\times 4=180" },
        ],
        finalAnswerLatex: "\\$180",
      },
    ];
  }

  if (slug === "saving-spending-financial-goals") {
    return [
      {
        title: "Weeks to reach a savings goal",
        questionLatex:
          "\\begin{array}{c|c}\\text{Goal}&\\$900\\\\\\text{Current savings}&\\$240\\\\\\text{Weekly deposit}&\\$55\\end{array}",
        steps: [
          { explanation: "Find the remaining amount.", latex: "900-240=660" },
          { explanation: "Divide by the weekly deposit.", latex: "660\\div 55=12" },
        ],
        finalAnswerLatex: "12\\text{ weeks}",
      },
      {
        title: "Comparing saving plans",
        questionLatex:
          "\\text{Plan A: }\\$40\\text{/week for 10 weeks. Plan B: }\\$55\\text{/week for 8 weeks.}",
        steps: [
          { explanation: "Calculate each total.", latex: "40\\times 10=400,\\quad 55\\times 8=440" },
          { explanation: "Compare the totals over the stated time." },
        ],
        finalAnswerLatex: "\\text{Plan B saves }\\$40\\text{ more.}",
      },
      {
        title: "Affordability after planned expenses",
        questionLatex:
          "\\text{Income }\\$360,\\ \\text{planned expenses }\\$250,\\ \\text{purchase }\\$95",
        steps: [
          { explanation: "Find money left after planned expenses.", latex: "360-250=110" },
          { explanation: "Compare the purchase cost with the money left." },
        ],
        finalAnswerLatex: "\\text{Affordable, with }\\$15\\text{ left.}",
      },
    ];
  }

  if (slug === "simple-interest") {
    return [
      {
        title: "Calculating simple interest",
        questionLatex:
          "\\text{Principal }\\$1500,\\ \\text{rate }4\\%\\text{ p.a., time }2\\text{ years}",
        steps: [
          { explanation: "Use simple interest with the rate as a decimal.", latex: "I=Prt" },
          { explanation: "Substitute the values.", latex: "I=1500\\times 0.04\\times 2=120" },
        ],
        finalAnswerLatex: "\\$120",
      },
      {
        title: "Finding the total amount",
        questionLatex: "\\text{Deposit }\\$800\\text{ earns }\\$72\\text{ simple interest.}",
        steps: [
          { explanation: "The total amount is principal plus interest." },
          { explanation: "Add the two amounts.", latex: "800+72=872" },
        ],
        finalAnswerLatex: "\\$872",
      },
      {
        title: "Comparing two simple-interest options",
        questionLatex:
          "\\text{Option A: }\\$1000\\text{ at }5\\%\\text{ for 1 year. Option B: }\\$1000\\text{ at }4\\%\\text{ for 2 years.}",
        steps: [
          { explanation: "Calculate the interest for each option.", latex: "A=1000(0.05)(1)=50,\\quad B=1000(0.04)(2)=80" },
          { explanation: "The higher interest is better for the saver in this context." },
        ],
        finalAnswerLatex: "\\text{Option B earns more interest.}",
      },
    ];
  }

  if (slug === "comparing-financial-decisions") {
    return [
      {
        title: "Comparing total cost with fees",
        questionLatex:
          "\\text{Option A: }\\$280\\text{ plus }\\$25\\text{ delivery. Option B: }\\$315\\text{ with free delivery.}",
        steps: [
          { explanation: "Find each total cost.", latex: "A=280+25=305,\\quad B=315" },
          { explanation: "Choose the lower total cost if the items are equivalent." },
        ],
        finalAnswerLatex: "\\text{Option A is cheaper by }\\$10.",
      },
      {
        title: "Discount then fee",
        questionLatex:
          "\\text{A }\\$240\\text{ item has }20\\%\\text{ off, then a }\\$12\\text{ service fee.}",
        steps: [
          { explanation: "Calculate the discount.", latex: "0.20\\times 240=48" },
          { explanation: "Subtract the discount and add the fee.", latex: "240-48+12=204" },
        ],
        finalAnswerLatex: "\\$204",
      },
      {
        title: "Best value is not always lowest upfront price",
        questionLatex:
          "\\text{Plan A costs }\\$18\\text{/month plus }\\$40\\text{ setup. Plan B costs }\\$25\\text{/month with no setup for 4 months.}",
        steps: [
          { explanation: "Compare over the same 4-month period.", latex: "A=18\\times 4+40=112,\\quad B=25\\times 4=100" },
          { explanation: "Use total cost, not just the monthly price." },
        ],
        finalAnswerLatex: "\\text{Plan B is cheaper for 4 months.}",
      },
    ];
  }

  return [
    {
      title: `${title}: budget table`,
      questionLatex:
        "\\begin{array}{c|c}\\text{Income}&\\$520\\\\\\text{Food}&\\$110\\\\\\text{Transport}&\\$70\\\\\\text{Savings}&\\$90\\\\\\text{Subscriptions}&\\$25\\end{array}",
      steps: [
        { explanation: "Add expenses and planned savings.", latex: "110+70+90+25=295" },
        { explanation: "Subtract from income.", latex: "520-295=225" },
      ],
      finalAnswerLatex: "\\$225\\text{ surplus}",
    },
    {
      title: `${title}: mixed saving and interest`,
      questionLatex:
        "\\text{A student saves }\\$60\\text{/week for 8 weeks, then earns }\\$24\\text{ simple interest.}",
      steps: [
        { explanation: "Find the saved amount first.", latex: "60\\times 8=480" },
        { explanation: "Add the interest.", latex: "480+24=504" },
      ],
      finalAnswerLatex: "\\$504",
    },
  ];
}

function managingMoneyLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-standard" || unit.slug !== "managing-money") {
    return null;
  }

  const base = {
    workedExamples: managingMoneyWorkedExamples(lesson.slug, lesson.title),
    syllabusArea: "Financial Mathematics",
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "budgets-cash-flow") {
    return {
      ...base,
      description:
        "Use income, fixed expenses, variable expenses and savings to calculate surplus, deficit and cash flow.",
      learningIntention:
        "Create and interpret simple budgets and calculate surplus or deficit from income and expenses.",
      successCriteria: [
        "Identify income, fixed expenses, variable expenses, and savings.",
        "Calculate total expenses from a budget table.",
        "Calculate surplus or deficit.",
        "Convert weekly amounts to a simple monthly estimate when appropriate.",
      ],
      teaching: {
        paragraphs: [
          "A budget is a plan for income and expenses over a set time period. It helps a person see whether money is available after regular costs.",
          "Income is money coming in. Expenses are money going out. Fixed expenses stay about the same, such as a phone plan, while variable expenses can change, such as food or entertainment.",
          "Cash flow describes money moving in and out over time. A surplus means income is greater than expenses. A deficit means expenses are greater than income.",
          "Always compare amounts over the same time period. A weekly amount can be estimated monthly by multiplying by 4 if the question asks for a simple 4-week estimate.",
        ],
        latexBlocks: [
          "\\text{surplus}=\\text{income}-\\text{expenses}",
          "\\text{deficit}=\\text{expenses}-\\text{income}",
        ],
      },
      guidedPractice: [
        moneyAnswer("manage-budget-g1", "Mia earns 320 dollars per week and spends 85 dollars on transport, 45 dollars on food, and 30 dollars on subscriptions. What is her weekly surplus?", "320-85-45-30", "160"),
        financeChoice("manage-budget-g2", "A 22 dollar weekly phone plan is best classified as:", "A", ["Fixed expense", "Income", "Surplus", "Deficit"], "A regular phone plan is a fixed expense."),
        moneyAnswer("manage-budget-g3", "A student has income of 280 dollars and weekly expenses of 315 dollars. What is the deficit?", "315-280", "35"),
        moneyAnswer("manage-budget-g4", "Noah saves 70 dollars each week. Using a 4-week monthly estimate, how much is this per month?", "70\\times 4", "280"),
      ],
      independentPractice: [
        moneyAnswer("manage-budget-i1", "A weekly budget shows income 450 dollars, rent contribution 120 dollars, food 90 dollars, transport 55 dollars, and savings 80 dollars. What is the surplus?", "450-120-90-55-80", "105"),
        financeChoice("manage-budget-i2", "Which change would most improve weekly cash flow?", "C", ["Increase subscriptions by 15 dollars", "Add a new 20 dollar fee", "Reduce variable spending by 25 dollars", "Ignore transport costs"], "Reducing spending improves cash flow."),
        moneyAnswer("manage-budget-i3", "A budget has income of 390 dollars and total expenses of 410 dollars. What is the deficit?", "410-390", "20"),
        moneyAnswer("manage-budget-i4", "A gym membership costs 18 dollars each week. Estimate the 4-week monthly cost.", "18\\times 4", "72"),
        financeChoice("manage-budget-i5", "A budget should compare amounts over:", "B", ["Different time periods", "The same time period", "Only one expense", "Only wants, not needs"], "Weekly amounts should be compared with weekly amounts, and monthly with monthly."),
      ],
      commonMistakes: [
        { mistake: "Adding income and expenses together.", fix: "Subtract expenses from income to find surplus." },
        { mistake: "Calling a deficit a surplus.", fix: "If expenses are greater than income, it is a deficit." },
        { mistake: "Mixing weekly and monthly amounts.", fix: "Convert amounts to the same time period first." },
        { mistake: "Ignoring planned savings.", fix: "If savings are listed in the budget, include them in cash-flow planning." },
      ],
      masteryQuiz: [
        moneyAnswer("manage-budget-m1", "A student earns 400 dollars per week and spends 60 dollars on transport, 110 dollars on food and 25 dollars on subscriptions. What is the weekly surplus?", "400-60-110-25", "205"),
        financeChoice("manage-budget-m2", "A streaming subscription paid every week is a:", "A", ["Fixed expense", "Variable income", "Surplus", "Saving goal"], "A regular subscription is a fixed expense."),
        moneyAnswer("manage-budget-m3", "Income is 360 dollars and weekly expenses are 385 dollars. What is the deficit?", "385-360", "25"),
        moneyAnswer("manage-budget-m4", "A student budgets 95 dollars each week for food. Estimate the 4-week monthly food cost.", "95\\times 4", "380"),
        financeChoice("manage-budget-m5", "Cash flow is about:", "B", ["Only yearly tax", "Money coming in and going out", "Only discounts", "Only interest rates"], "Cash flow tracks income and expenses."),
        moneyAnswer("manage-budget-m6", "A budget table lists income 520 dollars, transport 75 dollars, food 130 dollars, savings 100 dollars and subscriptions 20 dollars. What is the surplus?", "520-75-130-100-20", "195"),
        financeChoice("manage-budget-m7", "Which item is most likely a variable expense?", "D", ["Fixed rent contribution", "Weekly phone plan", "Set insurance fee", "Entertainment spending"], "Entertainment spending can vary."),
        moneyAnswer("manage-budget-m8", "A learner driver pays 40 dollars per week for petrol. Estimate the 4-week monthly amount.", "40\\times 4", "160"),
        financeChoice("manage-budget-m9", "If a budget has a deficit, the student should first look for:", "C", ["A larger deficit", "A way to increase expenses", "Income increases or expense reductions", "Only the smallest number"], "Deficits can be addressed by increasing income or reducing expenses."),
        moneyAnswer("manage-budget-m10", "A monthly estimate uses 4 weeks. If weekly savings are 55 dollars, what is the monthly estimate?", "55\\times 4", "220"),
      ],
    };
  }

  if (lesson.slug === "saving-spending-financial-goals") {
    return {
      ...base,
      description:
        "Plan savings goals, regular deposits, affordability checks and spending decisions.",
      learningIntention:
        "Use current savings, regular deposits and planned expenses to make simple financial decisions.",
      successCriteria: [
        "Calculate the amount still needed for a savings goal.",
        "Find the number of weeks or months needed for regular deposits.",
        "Compare two saving plans over the same time period.",
        "Decide whether a purchase is affordable after planned expenses.",
      ],
      teaching: {
        paragraphs: [
          "A savings goal states the amount a person wants to reach. To plan for it, subtract current savings from the goal.",
          "Regular deposits help track progress. If the remaining amount divides exactly by the deposit, the quotient gives the number of deposits needed.",
          "Affordability means checking whether money is available after necessary expenses and planned savings.",
          "When comparing saving plans, compare totals over the same number of weeks or months.",
        ],
        latexBlocks: [
          "\\text{amount still needed}=\\text{goal}-\\text{current savings}",
          "\\text{number of deposits}=\\frac{\\text{amount still needed}}{\\text{regular deposit}}",
        ],
      },
      guidedPractice: [
        financeShortAnswer("manage-save-g1", "A savings goal is 900 dollars. Noah already has 240 dollars and saves 55 dollars each week. How many more weeks are needed?", "(900-240)\\div 55", "12", ["12 weeks", "12weeks"]),
        moneyAnswer("manage-save-g2", "A student wants 1200 dollars for a laptop and currently has 350 dollars. How much more is needed?", "1200-350", "850"),
        financeChoice("manage-save-g3", "Which saving plan reaches 300 dollars fastest?", "B", ["30 dollars per week for 10 weeks", "75 dollars per week for 4 weeks", "40 dollars per week for 7 weeks", "20 dollars per week for 12 weeks"], "75 dollars for 4 weeks reaches 300 dollars in the shortest time."),
        financeChoice("manage-save-g4", "A student has 110 dollars left after planned expenses. A 95 dollar purchase is:", "A", ["Affordable with 15 dollars left", "Not affordable", "A deficit of 95 dollars", "Affordable only by ignoring expenses"], "110 minus 95 leaves 15 dollars."),
      ],
      independentPractice: [
        financeShortAnswer("manage-save-i1", "A goal is 600 dollars. Ava has 180 dollars and saves 70 dollars each week. How many more weeks are needed?", "(600-180)\\div 70", "6", ["6 weeks", "6weeks"]),
        moneyAnswer("manage-save-i2", "A student deposits 45 dollars each week for 8 weeks into a trip fund. How much is deposited in total?", "45\\times 8", "360"),
        financeChoice("manage-save-i3", "Plan A saves 50 dollars per week for 6 weeks. Plan B saves 35 dollars per week for 10 weeks. Which saves more?", "B", ["Plan A by 50 dollars", "Plan B by 50 dollars", "They save the same", "Plan A by 300 dollars"], "Plan A saves 300 dollars and Plan B saves 350 dollars."),
        financeChoice("manage-save-i4", "A student has 70 dollars spare after bills and wants to buy an 85 dollar jacket. The best judgement is:", "C", ["Buy it and ignore the shortfall", "It is affordable with 15 dollars spare", "It is not affordable this week", "It creates a 70 dollar surplus"], "The purchase is 15 dollars more than the spare money."),
        moneyAnswer("manage-save-i5", "A student saves 35 dollars per week for 12 weeks. What will be added to savings?", "35\\times 12", "420"),
      ],
      commonMistakes: [
        { mistake: "Using the goal amount instead of the amount still needed.", fix: "Subtract current savings first." },
        { mistake: "Rounding down the number of weeks when a goal is not reached.", fix: "A partial week usually means another full deposit is needed." },
        { mistake: "Comparing saving plans over different time periods without checking totals.", fix: "Calculate each total first." },
        { mistake: "Ignoring planned expenses before deciding affordability.", fix: "Check money left after necessary expenses." },
      ],
      masteryQuiz: [
        financeShortAnswer("manage-save-m1", "A student wants 750 dollars, has 150 dollars, and saves 50 dollars per week. How many weeks are needed?", "(750-150)\\div 50", "12", ["12 weeks", "12weeks"]),
        moneyAnswer("manage-save-m2", "A phone costs 980 dollars and current savings are 420 dollars. How much more is needed?", "980-420", "560"),
        moneyAnswer("manage-save-m3", "A student saves 65 dollars each week for 6 weeks. How much is saved?", "65\\times 6", "390"),
        financeChoice("manage-save-m4", "Which plan saves the greatest amount?", "D", ["40 dollars for 5 weeks", "55 dollars for 3 weeks", "30 dollars for 6 weeks", "70 dollars for 4 weeks"], "The totals are 200, 165, 180 and 280 dollars."),
        financeChoice("manage-save-m5", "A student has 125 dollars spare and a planned purchase costs 140 dollars. The purchase is:", "B", ["Affordable with 15 dollars left", "Not affordable by 15 dollars", "A 140 dollar surplus", "Free after expenses"], "The student is 15 dollars short."),
        financeShortAnswer("manage-save-m6", "A goal is 1000 dollars. Current savings are 250 dollars and deposits are 75 dollars each week. How many weeks are needed?", "(1000-250)\\div 75", "10", ["10 weeks", "10weeks"]),
        moneyAnswer("manage-save-m7", "A student cancels a 16 dollar weekly subscription for 10 weeks. How much can be redirected to savings?", "16\\times 10", "160"),
        financeChoice("manage-save-m8", "When comparing spending choices, the fairest comparison uses:", "A", ["The same time period and total cost", "Only the largest discount sign", "Only the first payment", "Only the cheapest-looking option"], "Fair comparisons use equivalent time periods and totals."),
        moneyAnswer("manage-save-m9", "A student has 480 dollars and adds 40 dollars per week for 5 weeks. What will the savings balance be?", "480+40\\times 5", "680"),
        financeChoice("manage-save-m10", "Tracking savings progress helps because it shows:", "C", ["Only tax owed", "Only weekly expenses", "How close the student is to the goal", "The highest possible fee"], "Progress tracking compares current savings with the goal."),
      ],
    };
  }

  if (lesson.slug === "simple-interest") {
    return {
      ...base,
      description:
        "Calculate simple interest, total amounts and compare simple-interest options using principal, rate and time.",
      learningIntention:
        "Use the simple interest formula to calculate interest earned and total amount.",
      successCriteria: [
        "Identify principal, interest rate and time.",
        "Convert a percentage rate to a decimal.",
        "Calculate simple interest.",
        "Calculate the total amount after interest.",
      ],
      teaching: {
        paragraphs: [
          "Simple interest is calculated only on the original amount, called the principal.",
          "The interest rate must be written as a decimal before using the formula. For example, 4 percent becomes 0.04.",
          "Time must match the rate period. If the rate is per annum, time is measured in years.",
          "The total amount is the principal plus the interest earned.",
        ],
        latexBlocks: [
          "I=Prt",
          "\\text{total amount}=P+I",
        ],
      },
      guidedPractice: [
        moneyAnswer("manage-interest-g1", "A bank account earns simple interest on 1500 dollars at 4 percent p.a. for 2 years. How much interest is earned?", "1500\\times 0.04\\times 2", "120"),
        moneyAnswer("manage-interest-g2", "A 900 dollar deposit earns 54 dollars simple interest. What is the total amount?", "900+54", "954"),
        financeChoice("manage-interest-g3", "In a simple interest question, the principal is:", "B", ["The interest earned", "The original amount invested or borrowed", "The yearly fee", "The final answer only"], "Principal is the starting amount."),
        financeShortAnswer("manage-interest-g4", "Write 6 percent as a decimal for a simple interest calculation.", "6\\%=0.06", "0.06", [".06"]),
      ],
      independentPractice: [
        moneyAnswer("manage-interest-i1", "A student savings account has 2000 dollars at 3 percent p.a. simple interest for 1 year. How much interest is earned?", "2000\\times 0.03\\times 1", "60"),
        moneyAnswer("manage-interest-i2", "A 1200 dollar deposit earns simple interest at 5 percent p.a. for 3 years. Find the interest.", "1200\\times 0.05\\times 3", "180"),
        moneyAnswer("manage-interest-i3", "A 750 dollar investment earns 45 dollars simple interest. What is the total amount?", "750+45", "795"),
        financeChoice("manage-interest-i4", "Which setup correctly uses 4 percent p.a. for 2 years on 800 dollars?", "A", ["800 x 0.04 x 2", "800 x 4 x 2", "800 + 0.04 + 2", "800 x 0.4 x 2"], "4 percent must be converted to 0.04."),
        financeChoice("manage-interest-i5", "For the same principal and rate, doubling the time will:", "C", ["Halve simple interest", "Make no difference", "Double simple interest", "Remove the principal"], "Simple interest is proportional to time."),
      ],
      commonMistakes: [
        { mistake: "Using 4 instead of 0.04 for 4 percent.", fix: "Convert percentages to decimals." },
        { mistake: "Forgetting to multiply by time.", fix: "Use I = Prt and include all three values." },
        { mistake: "Giving interest when the question asks for total amount.", fix: "Add interest to principal for total amount." },
        { mistake: "Using months with an annual rate without converting.", fix: "Make sure time matches the rate period." },
      ],
      masteryQuiz: [
        moneyAnswer("manage-interest-m1", "A 1000 dollar deposit earns 5 percent p.a. simple interest for 2 years. Find the interest.", "1000\\times 0.05\\times 2", "100"),
        financeShortAnswer("manage-interest-m2", "Write 3.5 percent as a decimal for a simple interest calculation.", "3.5\\%=0.035", "0.035", [".035"]),
        moneyAnswer("manage-interest-m3", "A 600 dollar account earns 48 dollars interest. What is the total amount?", "600+48", "648"),
        financeChoice("manage-interest-m4", "In I = Prt, r represents:", "C", ["Principal", "Time", "Interest rate as a decimal", "Total amount"], "r is the rate written as a decimal."),
        moneyAnswer("manage-interest-m5", "A 2500 dollar deposit earns simple interest at 2 percent p.a. for 4 years. Find the interest.", "2500\\times 0.02\\times 4", "200"),
        financeChoice("manage-interest-m6", "Which option earns more interest on 1000 dollars?", "B", ["3 percent for 1 year", "2 percent for 2 years", "1 percent for 2 years", "0.5 percent for 3 years"], "The interest amounts are 30, 40, 20 and 15 dollars."),
        moneyAnswer("manage-interest-m7", "A 1500 dollar account earns 90 dollars simple interest. Find the total amount.", "1500+90", "1590"),
        financeChoice("manage-interest-m8", "A rate of 7 percent should be entered as:", "D", ["7", "70", "0.7", "0.07"], "7 percent is 0.07."),
        moneyAnswer("manage-interest-m9", "A 400 dollar savings account earns 6 percent p.a. simple interest for 3 years. Find the interest.", "400\\times 0.06\\times 3", "72"),
        moneyAnswer("manage-interest-m10", "A 1800 dollar deposit earns 144 dollars simple interest. What is the total amount?", "1800+144", "1944"),
      ],
    };
  }

  if (lesson.slug === "comparing-financial-decisions") {
    return {
      ...base,
      description:
        "Compare financial choices using total cost, discounts, fees, charges and reasonableness.",
      learningIntention:
        "Compare financial options fairly using total cost and practical judgement.",
      successCriteria: [
        "Calculate total cost when fees or charges apply.",
        "Calculate a discount in context.",
        "Compare options over the same time period.",
        "Choose the better option using total cost, not just headline price.",
      ],
      teaching: {
        paragraphs: [
          "Financial decisions often involve more than the advertised price. Fees, delivery charges, discounts and ongoing payments can change the total cost.",
          "A discount reduces the price. A fee or charge increases the cost.",
          "The cheapest upfront price may not be the best value if later fees are higher.",
          "To compare options fairly, calculate the total cost for each option over the same time period.",
        ],
        latexBlocks: [
          "\\text{total cost}=\\text{price}-\\text{discount}+\\text{fees}",
          "\\text{discount}=\\text{discount rate}\\times\\text{original price}",
        ],
      },
      guidedPractice: [
        moneyAnswer("manage-compare-g1", "A concert ticket costs 48 dollars plus a 6 dollar booking fee. What is the total cost?", "48+6", "54"),
        moneyAnswer("manage-compare-g2", "A 200 dollar jacket has a 15 percent discount. How much is the discount?", "0.15\\times 200", "30"),
        financeChoice("manage-compare-g3", "Two phone plans should be compared using:", "C", ["Only the setup fee", "Only the cheapest first month", "Total cost over the same time period", "Only the biggest advertisement"], "Fair comparisons use the same time period and total cost."),
        financeChoice("manage-compare-g4", "A lower upfront price may not be best if:", "D", ["It has no fee", "It is paid today", "It has the same total cost", "Later fees make the total higher"], "Fees can make the total higher."),
      ],
      independentPractice: [
        moneyAnswer("manage-compare-i1", "Option A costs 260 dollars plus a 35 dollar delivery fee. What is the total cost?", "260+35", "295"),
        moneyAnswer("manage-compare-i2", "A student buys headphones priced at 180 dollars with 20 percent off. What is the sale price?", "180-0.20\\times 180", "144"),
        financeChoice("manage-compare-i3", "Option A costs 120 dollars plus a 15 dollar fee. Option B costs 140 dollars with no fee. Which is cheaper?", "A", ["Option A by 5 dollars", "Option B by 5 dollars", "They are equal", "Option A by 20 dollars"], "Option A totals 135 dollars and Option B totals 140 dollars."),
        moneyAnswer("manage-compare-i4", "A 75 dollar online order has a 10 dollar delivery fee and a 5 dollar coupon. What is the total cost?", "75+10-5", "80"),
        financeChoice("manage-compare-i5", "Which mistake is most likely when comparing costs?", "B", ["Using total costs", "Ignoring fees and charges", "Comparing the same time period", "Subtracting a discount"], "Ignoring fees can lead to the wrong decision."),
      ],
      commonMistakes: [
        { mistake: "Choosing the lowest headline price without adding fees.", fix: "Compare total costs." },
        { mistake: "Adding discounts instead of subtracting them.", fix: "A discount reduces the price." },
        { mistake: "Comparing different time periods.", fix: "Convert options to the same time period first." },
        { mistake: "Ignoring small charges.", fix: "Include fees, delivery and service charges when stated." },
      ],
      masteryQuiz: [
        moneyAnswer("manage-compare-m1", "A sports bag costs 85 dollars plus 12 dollars delivery. What is the total cost?", "85+12", "97"),
        moneyAnswer("manage-compare-m2", "A 300 dollar bike has a 10 percent discount. How much is the discount?", "0.10\\times 300", "30"),
        moneyAnswer("manage-compare-m3", "A 240 dollar item has 20 percent off and a 12 dollar service fee. What is the final cost?", "240-0.20\\times 240+12", "204"),
        financeChoice("manage-compare-m4", "Plan A costs 18 dollars per month plus a 40 dollar setup fee. Plan B costs 25 dollars per month with no setup fee. Which is cheaper over 4 months?", "B", ["Plan A by 12 dollars", "Plan B by 12 dollars", "They are equal", "Plan A by 40 dollars"], "Plan A costs 112 dollars and Plan B costs 100 dollars."),
        financeChoice("manage-compare-m5", "Best value means:", "C", ["Always the lowest upfront price", "Always the biggest discount sign", "The option that best fits total cost and context", "Ignoring fees"], "Best value considers total cost and context."),
        moneyAnswer("manage-compare-m6", "A laptop sleeve costs 42 dollars after an 8 dollar discount, then a 5 dollar delivery fee is added. What is the total cost?", "42+5", "47"),
        financeChoice("manage-compare-m7", "A 15 percent discount on 200 dollars is commonly mistaken as:", "A", ["15 dollars", "30 dollars", "185 dollars", "215 dollars"], "The discount is 30 dollars; 15 dollars confuses percent with dollars."),
        moneyAnswer("manage-compare-m8", "Option A totals 410 dollars. Option B totals 395 dollars. How much cheaper is Option B?", "410-395", "15"),
        financeChoice("manage-compare-m9", "A plan with a cheap first month and high later fees should be judged by:", "D", ["First month only", "The colour of the advertisement", "Setup fee only", "Total cost over the relevant period"], "Total cost over the relevant period is fairer."),
        moneyAnswer("manage-compare-m10", "A 120 dollar purchase has 25 percent off and a 9 dollar fee. What is the final cost?", "120-0.25\\times 120+9", "99"),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed managing-money exam questions using budgets, savings goals, simple interest, fees and financial comparisons.",
    learningIntention:
      "Apply managing-money skills to mixed practical exam-style questions.",
    successCriteria: [
      "Interpret budget and savings information from tables.",
      "Calculate surplus, savings progress and simple interest.",
      "Include fees, discounts and charges in total cost.",
      "Choose reasonable financial decisions from short contexts.",
    ],
    teaching: {
      paragraphs: [
        "Managing-money exam questions often combine budgets, savings goals, interest and comparisons of financial choices.",
        "Read the question carefully and identify whether it asks for surplus, deficit, savings progress, interest, total cost or a decision.",
        "Use tables to separate income, expenses, savings and fees. This reduces the chance of adding or subtracting the wrong amount.",
        "A reasonable financial decision should be based on total cost and the time period in the question.",
      ],
      latexBlocks: [
        "\\text{surplus}=\\text{income}-\\text{expenses}",
        "I=Prt",
        "\\text{total cost}=\\text{price}-\\text{discount}+\\text{fees}",
      ],
    },
    guidedPractice: [
      moneyAnswer("manage-exam-g1", "A budget table shows income 520 dollars, food 110 dollars, transport 70 dollars, savings 90 dollars and subscriptions 25 dollars. What is the surplus?", "520-110-70-90-25", "225"),
      financeShortAnswer("manage-exam-g2", "A goal is 840 dollars. Current savings are 240 dollars and weekly deposits are 60 dollars. How many weeks are needed?", "(840-240)\\div 60", "10", ["10 weeks", "10weeks"]),
      moneyAnswer("manage-exam-g3", "A 1500 dollar account earns simple interest at 4 percent p.a. for 2 years. How much interest is earned?", "1500\\times 0.04\\times 2", "120"),
      financeChoice("manage-exam-g4", "A purchase has a delivery fee. Which value should be used for comparison?", "C", ["Headline price only", "Discount sign only", "Total cost including the fee", "The largest number in the question"], "Fees affect the total cost."),
    ],
    independentPractice: [
      moneyAnswer("manage-exam-i1", "A monthly budget has income 1600 dollars and expenses 1425 dollars. What is the surplus?", "1600-1425", "175"),
      moneyAnswer("manage-exam-i2", "A student saves 45 dollars per week for 9 weeks. How much is added to savings?", "45\\times 9", "405"),
      moneyAnswer("manage-exam-i3", "A 900 dollar deposit earns 5 percent p.a. simple interest for 3 years. Find the interest.", "900\\times 0.05\\times 3", "135"),
      moneyAnswer("manage-exam-i4", "A 250 dollar item has 10 percent off and a 15 dollar delivery fee. What is the final cost?", "250-0.10\\times 250+15", "240"),
      financeChoice("manage-exam-i5", "Which decision is most reasonable?", "B", ["Choose a plan without checking fees", "Compare total costs over the same time period", "Use monthly and weekly costs directly", "Ignore savings goals"], "Total costs over the same time period give a fair comparison."),
    ],
    commonMistakes: [
      { mistake: "Using the wrong financial model.", fix: "Identify whether the question is about budget, savings, interest, or comparison." },
      { mistake: "Ignoring fees or discounts.", fix: "Include every stated cost change." },
      { mistake: "Comparing weekly and monthly amounts directly.", fix: "Convert to the same time period first." },
      { mistake: "Forgetting to check if the answer is reasonable.", fix: "Surplus should fall when expenses increase; discounts should reduce price." },
    ],
    masteryQuiz: [
      moneyAnswer("manage-exam-m1", "A student earns 480 dollars and budgets 95 dollars for food, 60 dollars for transport, 80 dollars for savings and 20 dollars for subscriptions. What is the surplus?", "480-95-60-80-20", "225"),
      financeShortAnswer("manage-exam-m2", "A student needs 500 dollars, already has 140 dollars, and saves 45 dollars each week. How many weeks are needed?", "(500-140)\\div 45", "8", ["8 weeks", "8weeks"]),
      moneyAnswer("manage-exam-m3", "A 1200 dollar account earns 3 percent p.a. simple interest for 2 years. Find the interest.", "1200\\times 0.03\\times 2", "72"),
      moneyAnswer("manage-exam-m4", "A 90 dollar jacket has 20 percent off. What is the sale price?", "90-0.20\\times 90", "72"),
      financeChoice("manage-exam-m5", "A budget with expenses greater than income shows:", "D", ["A surplus", "Simple interest", "A discount", "A deficit"], "Expenses greater than income create a deficit."),
      moneyAnswer("manage-exam-m6", "A 600 dollar deposit earns 48 dollars simple interest. What is the total amount?", "600+48", "648"),
      financeChoice("manage-exam-m7", "A fair comparison between two subscriptions should use:", "A", ["Total cost over the same number of months", "Only setup fee", "Only the first payment", "Only the largest discount"], "Use the same time period."),
      moneyAnswer("manage-exam-m8", "A 150 dollar item has a 30 dollar discount and a 12 dollar delivery fee. What is the final cost?", "150-30+12", "132"),
      financeChoice("manage-exam-m9", "Which answer is reasonable if income is 300 dollars and expenses are 340 dollars?", "B", ["40 dollars surplus", "40 dollars deficit", "640 dollars surplus", "No cash flow"], "Expenses exceed income by 40 dollars."),
      moneyAnswer("manage-exam-m10", "A student deposits 35 dollars each week for 6 weeks, then pays a 15 dollar account fee. What amount remains from those deposits?", "35\\times 6-15", "195"),
    ],
  };
}

function measurementWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "units-accuracy-measurement-error") {
    return [
      {
        title: "Converting units in context",
        questionLatex:
          "\\text{A garden bed is }4.2\\text{ m long. Border strip is sold in centimetres.}",
        steps: [
          { explanation: "Convert metres to centimetres by multiplying by 100.", latex: "1\\text{ m}=100\\text{ cm}" },
          { explanation: "Convert the garden length.", latex: "4.2\\times 100=420" },
        ],
        finalAnswerLatex: "420\\text{ cm}",
      },
      {
        title: "Limits of accuracy",
        questionLatex:
          "\\text{A reported length is }18.4\\text{ cm to the nearest millimetre.}",
        steps: [
          { explanation: "Nearest millimetre means nearest 0.1 cm, so half the unit is 0.05 cm." },
          { explanation: "Subtract and add 0.05 cm.", latex: "18.35\\le L<18.45" },
        ],
        finalAnswerLatex: "18.35\\text{ cm}\\le L<18.45\\text{ cm}",
      },
      {
        title: "Percentage error",
        questionLatex:
          "\\text{A scale reads }51\\text{ kg for a bag with actual mass }50\\text{ kg.}",
        steps: [
          { explanation: "Find the absolute error.", latex: "|51-50|=1" },
          { explanation: "Divide by the actual value and multiply by 100.", latex: "\\frac{1}{50}\\times 100=2\\%" },
        ],
        finalAnswerLatex: "2\\%",
      },
    ];
  }

  if (slug === "area-surface-area-volume") {
    return [
      {
        title: "Flooring area",
        questionLatex:
          "\\text{A bedroom is }4.8\\text{ m by }3.2\\text{ m.}",
        steps: [
          { explanation: "Flooring uses area.", latex: "A=l\\times w" },
          { explanation: "Multiply length by width.", latex: "4.8\\times 3.2=15.36" },
        ],
        finalAnswerLatex: "15.36\\text{ m}^2",
      },
      {
        title: "Tank volume and capacity",
        questionLatex:
          "\\text{A rectangular tank is }1.2\\text{ m by }0.5\\text{ m by }0.4\\text{ m.}",
        steps: [
          { explanation: "Volume of a rectangular prism is length times width times height.", latex: "V=1.2\\times 0.5\\times 0.4=0.24\\text{ m}^3" },
          { explanation: "One cubic metre is 1000 litres.", latex: "0.24\\times 1000=240" },
        ],
        finalAnswerLatex: "240\\text{ L}",
      },
      {
        title: "Material for a box",
        questionLatex:
          "\\text{A cube storage box has side length }0.5\\text{ m. Find its surface area.}",
        steps: [
          { explanation: "A cube has 6 equal square faces.", latex: "SA=6s^2" },
          { explanation: "Substitute the side length.", latex: "6(0.5)^2=1.5" },
        ],
        finalAnswerLatex: "1.5\\text{ m}^2",
      },
    ];
  }

  if (slug === "energy-mass-practical-measurement") {
    return [
      {
        title: "Mass conversion for ingredients",
        questionLatex:
          "\\text{A recipe uses }1.75\\text{ kg of flour. Find this in grams.}",
        steps: [
          { explanation: "One kilogram is 1000 grams.", latex: "1\\text{ kg}=1000\\text{ g}" },
          { explanation: "Multiply by 1000.", latex: "1.75\\times 1000=1750" },
        ],
        finalAnswerLatex: "1750\\text{ g}",
      },
      {
        title: "Energy label calculation",
        questionLatex:
          "\\text{A snack has }620\\text{ kJ per serve. A student eats }3\\text{ serves.}",
        steps: [
          { explanation: "Multiply the energy per serve by the number of serves." },
          { explanation: "Calculate total energy.", latex: "620\\times 3=1860" },
        ],
        finalAnswerLatex: "1860\\text{ kJ}",
      },
      {
        title: "Electricity use and cost",
        questionLatex:
          "\\text{A heater uses }1.8\\text{ kWh. Electricity costs }30\\text{ cents per kWh.}",
        steps: [
          { explanation: "Multiply kWh by the cost per kWh.", latex: "1.8\\times 30=54" },
          { explanation: "The result is in cents." },
        ],
        finalAnswerLatex: "54\\text{ cents}",
      },
    ];
  }

  return [
    {
      title: `${title}: mixed room measurement`,
      questionLatex:
        "\\begin{array}{c|c}\\text{Room length}&4.8\\text{ m}\\\\\\text{Room width}&3.2\\text{ m}\\\\\\text{Paint coverage}&12\\text{ m}^2\\text{/L}\\end{array}",
      steps: [
        { explanation: "Find the floor or wall area depending on the question." },
        { explanation: "Keep units attached so the final answer makes sense." },
      ],
      finalAnswerLatex: "\\text{Use area, capacity or error method as required.}",
    },
    {
      title: `${title}: mixed electricity context`,
      questionLatex:
        "\\text{An appliance uses }2.5\\text{ kWh at }28\\text{ cents per kWh.}",
      steps: [
        { explanation: "Multiply energy used by the cost per kWh.", latex: "2.5\\times 28=70" },
        { explanation: "Interpret the answer in cents." },
      ],
      finalAnswerLatex: "70\\text{ cents}",
    },
  ];
}

function measurementLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-standard" ||
    unit.slug !== "applications-measurement"
  ) {
    return null;
  }

  const base = {
    workedExamples: measurementWorkedExamples(lesson.slug, lesson.title),
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "units-accuracy-measurement-error") {
    return {
      ...base,
      description:
        "Convert practical measurements, choose units, and use accuracy, absolute error and percentage error.",
      learningIntention:
        "Use metric units, limits of accuracy and measurement error in practical contexts.",
      successCriteria: [
        "Convert between common metric units in context.",
        "Choose appropriate units for length, area, volume, capacity and mass.",
        "Find limits of accuracy for a rounded measurement.",
        "Calculate absolute error and percentage error in simple contexts.",
      ],
      teaching: {
        paragraphs: [
          "Measurements are always connected to units. Length, area, volume, capacity and mass each use different units.",
          "Common conversions include metres to centimetres, square metres to square centimetres, cubic metres to litres, kilograms to grams, and tonnes to kilograms.",
          "A reported measurement has a possible range. If a value is rounded to the nearest unit, the true value is within half a unit either side.",
          "Absolute error is the size of the difference between a measured value and an actual value. Percentage error compares that error with the actual value.",
        ],
        latexBlocks: [
          "1\\text{ m}=100\\text{ cm},\\quad 1\\text{ kg}=1000\\text{ g},\\quad 1\\text{ m}^3=1000\\text{ L}",
          "\\text{percentage error}=\\frac{\\text{absolute error}}{\\text{actual value}}\\times 100\\%",
        ],
      },
      guidedPractice: [
        measurementAnswer("measure-unit-g1", "A garden bed is 4.2 m long. A border strip is sold in centimetres. What length in centimetres is needed for one long side?", "4.2\\times 100", "420 cm", ["420", "420cm"]),
        measurementAnswer("measure-unit-g2", "A reported shelf length is 86 cm to the nearest centimetre. What is the lower limit of accuracy?", "86-0.5", "85.5 cm", ["85.5", "85.5cm"]),
        measurementAnswer("measure-unit-g3", "A bag labelled 5 kg actually has mass 4.9 kg. What is the absolute error?", "|5-4.9|", "0.1 kg", ["0.1", "0.1kg", "100 g", "100g"]),
        financeChoice("measure-unit-g4", "Which unit is most appropriate for the capacity of a water bottle?", "B", ["Square metres", "Litres", "Kilograms per hour", "Kilowatts"], "Bottle capacity is usually measured in litres or millilitres."),
      ],
      independentPractice: [
        measurementAnswer("measure-unit-i1", "A room is 3.6 m wide. Carpet edging is ordered in centimetres. Convert the width to centimetres.", "3.6\\times 100", "360 cm", ["360", "360cm"]),
        measurementAnswer("measure-unit-i2", "A reported mass is 2.4 kg to the nearest 0.1 kg. What is the upper limit of accuracy?", "2.4+0.05", "2.45 kg", ["2.45", "2.45kg"]),
        measurementAnswer("measure-unit-i3", "A delivery box has actual mass 20 kg but a scale reads 21 kg. What is the percentage error?", "\\frac{1}{20}\\times 100", "5%", ["5", "5 percent", "5percent"]),
        financeChoice("measure-unit-i4", "Which conversion is needed to change 0.75 tonnes to kilograms?", "A", ["Multiply by 1000", "Divide by 1000", "Multiply by 100", "Square the value"], "One tonne is 1000 kg."),
        measurementAnswer("measure-unit-i5", "A container holds 0.35 m^3 of water. Convert this capacity to litres.", "0.35\\times 1000", "350 L", ["350", "350L", "350 l", "350 litres"]),
      ],
      commonMistakes: [
        { mistake: "Using length conversions for area or volume without adjusting powers.", fix: "Area and volume conversions involve squared or cubed units." },
        { mistake: "Ignoring the unit in the answer.", fix: "Include the correct unit or choose the unit that matches the context." },
        { mistake: "Using the full rounding unit instead of half for limits of accuracy.", fix: "Use half the rounding unit on each side." },
        { mistake: "Dividing by the measured value for percentage error.", fix: "Use the actual value in the denominator when it is given." },
      ],
      masteryQuiz: [
        measurementAnswer("measure-unit-m1", "A desk is 1.25 m long. Convert this length to centimetres for a cutting list.", "1.25\\times 100", "125 cm", ["125", "125cm"]),
        measurementAnswer("measure-unit-m2", "A reported length is 18.4 cm to the nearest millimetre. What is the lower limit of accuracy?", "18.4-0.05", "18.35 cm", ["18.35", "18.35cm"]),
        measurementAnswer("measure-unit-m3", "A reported length is 18.4 cm to the nearest millimetre. What is the upper limit of accuracy?", "18.4+0.05", "18.45 cm", ["18.45", "18.45cm"]),
        measurementAnswer("measure-unit-m4", "A scale reads 51 kg for a bag with actual mass 50 kg. What is the percentage error?", "\\frac{1}{50}\\times 100", "2%", ["2", "2 percent", "2percent"]),
        financeChoice("measure-unit-m5", "Which unit is most suitable for floor area?", "C", ["Centimetres", "Litres", "Square metres", "Kilograms"], "Floor area is measured in square units."),
        measurementAnswer("measure-unit-m6", "A small tank contains 1.8 m^3 of water. Convert this to litres.", "1.8\\times 1000", "1800 L", ["1800", "1,800", "1800L", "1800 l", "1800 litres"]),
        financeChoice("measure-unit-m7", "A percentage error question should compare error with:", "A", ["The actual value", "The rounded unit only", "The largest unit", "The label colour"], "Percentage error uses actual value in the denominator when available."),
        measurementAnswer("measure-unit-m8", "A recipe uses 0.65 kg of rice. Convert this to grams.", "0.65\\times 1000", "650 g", ["650", "650g"]),
        financeChoice("measure-unit-m9", "A length rounded to the nearest metre has a maximum rounding error of:", "D", ["2 m", "1 m", "0.1 m", "0.5 m"], "Half of 1 metre is 0.5 m."),
        measurementAnswer("measure-unit-m10", "A measured length is 2.8 m and the actual length is 2.75 m. What is the absolute error?", "|2.8-2.75|", "0.05 m", ["0.05", "0.05m", "5 cm", "5cm"]),
      ],
    };
  }

  if (lesson.slug === "area-surface-area-volume") {
    return {
      ...base,
      description:
        "Use perimeter, area, surface area, volume and capacity for rooms, materials, containers and tanks.",
      learningIntention:
        "Calculate practical area, surface area, volume and capacity using appropriate units.",
      successCriteria: [
        "Calculate area for flooring, painting or materials.",
        "Calculate composite area in simple contexts.",
        "Calculate volume and convert capacity to litres.",
        "Choose between area, surface area and volume methods.",
      ],
      teaching: {
        paragraphs: [
          "Area is used for flat surfaces such as flooring, walls, gardens and paint coverage.",
          "Surface area is the total area of the outside faces of an object, such as material needed to cover a box.",
          "Volume measures three-dimensional space. Capacity is how much a container holds, often measured in litres.",
          "Check units before calculating. For capacity, 1 cubic metre equals 1000 litres.",
        ],
        latexBlocks: [
          "A_{\\text{rectangle}}=lw",
          "V_{\\text{prism}}=lwh",
          "1\\text{ m}^3=1000\\text{ L}",
        ],
      },
      guidedPractice: [
        measurementAnswer("measure-area-g1", "A bedroom floor is 4.8 m long and 3.2 m wide. What area of flooring is needed?", "4.8\\times 3.2", "15.36 m^2", ["15.36", "15.36m^2", "15.36 m2"]),
        measurementAnswer("measure-area-g2", "A rectangular planter box is 1.2 m by 0.5 m by 0.4 m. What is its volume in cubic metres?", "1.2\\times 0.5\\times 0.4", "0.24 m^3", ["0.24", "0.24m^3", "0.24 m3"]),
        measurementAnswer("measure-area-g3", "The planter box volume is 0.24 m^3. Convert this to litres.", "0.24\\times 1000", "240 L", ["240", "240L", "240 l", "240 litres"]),
        financeChoice("measure-area-g4", "Painting the outside of a box is mainly a:", "B", ["Volume problem", "Surface area problem", "Mass problem", "Percentage error problem"], "Painting outside faces uses surface area."),
      ],
      independentPractice: [
        measurementAnswer("measure-area-i1", "A rectangular garden bed is 5.5 m long and 1.8 m wide. What is its area?", "5.5\\times 1.8", "9.9 m^2", ["9.9", "9.90", "9.9m^2", "9.9 m2"]),
        measurementAnswer("measure-area-i2", "A wall is 3 m high and 4.2 m wide. What area is painted?", "3\\times 4.2", "12.6 m^2", ["12.6", "12.60", "12.6m^2", "12.6 m2"]),
        measurementAnswer("measure-area-i3", "A storage box is 0.8 m by 0.5 m by 0.3 m. Find its volume.", "0.8\\times 0.5\\times 0.3", "0.12 m^3", ["0.12", "0.12m^3", "0.12 m3"]),
        measurementAnswer("measure-area-i4", "A tank holds 0.12 m^3. Convert this to litres.", "0.12\\times 1000", "120 L", ["120", "120L", "120 l", "120 litres"]),
        financeChoice("measure-area-i5", "Which mistake is most likely when converting square metres to square centimetres?", "D", ["Using square units", "Checking the context", "Multiplying by the area", "Multiplying by 100 instead of 10000"], "Area conversions square the length conversion factor."),
      ],
      commonMistakes: [
        { mistake: "Using perimeter when area is needed for flooring.", fix: "Flooring and painting flat surfaces usually need area." },
        { mistake: "Using diameter as radius in circular problems.", fix: "Halve the diameter to get radius before using circle formulas." },
        { mistake: "Forgetting to convert cubic metres to litres.", fix: "Multiply cubic metres by 1000 to get litres." },
        { mistake: "Confusing surface area and volume.", fix: "Surface area covers outside faces; volume fills space inside." },
      ],
      masteryQuiz: [
        measurementAnswer("measure-area-m1", "A rug is 2.4 m by 1.5 m. What floor area does it cover?", "2.4\\times 1.5", "3.6 m^2", ["3.6", "3.60", "3.6m^2", "3.6 m2"]),
        measurementAnswer("measure-area-m2", "A room is 6 m by 3.5 m. What area of flooring is needed?", "6\\times 3.5", "21 m^2", ["21", "21.0", "21m^2", "21 m2"]),
        measurementAnswer("measure-area-m3", "A box is 1 m by 0.4 m by 0.5 m. What is its volume?", "1\\times 0.4\\times 0.5", "0.2 m^3", ["0.2", "0.20", "0.2m^3", "0.2 m3"]),
        measurementAnswer("measure-area-m4", "A container has volume 0.2 m^3. What is its capacity in litres?", "0.2\\times 1000", "200 L", ["200", "200L", "200 l", "200 litres"]),
        financeChoice("measure-area-m5", "Carpet for a room should be ordered using:", "A", ["Area", "Volume", "Mass", "Percentage error"], "Carpet covers floor area."),
        measurementAnswer("measure-area-m6", "A cube has side length 0.5 m. Find its surface area.", "6(0.5)^2", "1.5 m^2", ["1.5", "1.50", "1.5m^2", "1.5 m2"]),
        financeChoice("measure-area-m7", "Water filling a tank is a:", "C", ["Perimeter context", "Surface area context only", "Volume or capacity context", "Mass-only context"], "Filling a tank uses volume/capacity."),
        measurementAnswer("measure-area-m8", "A rectangular sign is 80 cm by 50 cm. What is its area in square centimetres?", "80\\times 50", "4000 cm^2", ["4000", "4,000", "4000cm^2", "4000 cm2"]),
        measurementAnswer("measure-area-m9", "A composite path has two rectangles: 4 m by 2 m and 3 m by 1 m. What is the total area?", "4\\times 2+3\\times 1", "11 m^2", ["11", "11m^2", "11 m2"]),
        financeChoice("measure-area-m10", "A material estimate for wrapping a box should use:", "B", ["Only volume", "Surface area", "Only capacity", "Percentage error"], "Wrapping uses outside surface area."),
      ],
    };
  }

  if (lesson.slug === "energy-mass-practical-measurement") {
    return {
      ...base,
      description:
        "Use mass, food energy labels, kilojoules, electricity use in kWh, and practical reasonableness checks.",
      learningIntention:
        "Interpret mass, energy and electricity measurements in everyday contexts.",
      successCriteria: [
        "Convert between grams, kilograms and tonnes.",
        "Use energy labels to calculate total kilojoules.",
        "Calculate electricity usage or cost using kWh.",
        "Compare practical quantities and check reasonableness.",
      ],
      teaching: {
        paragraphs: [
          "Mass is commonly measured in grams, kilograms and tonnes. Choose the unit that fits the context.",
          "Food energy labels often use kilojoules per serve. Total energy depends on the number of serves eaten.",
          "Electricity usage is often measured in kilowatt-hours, written kWh. Cost can be found by multiplying kWh by the cost per kWh.",
          "Reasonableness matters: a snack may be measured in grams, while a delivery truck load may be measured in tonnes.",
        ],
        latexBlocks: [
          "1\\text{ kg}=1000\\text{ g},\\quad 1\\text{ t}=1000\\text{ kg}",
          "\\text{electricity cost}=\\text{kWh used}\\times\\text{cost per kWh}",
        ],
      },
      guidedPractice: [
        measurementAnswer("measure-energy-g1", "A recipe uses 1.75 kg of flour. Convert this to grams.", "1.75\\times 1000", "1750 g", ["1750", "1,750", "1750g"]),
        measurementAnswer("measure-energy-g2", "A snack label shows 620 kJ per serve. A student eats 3 serves. What total energy is consumed?", "620\\times 3", "1860 kJ", ["1860", "1,860", "1860kJ", "1860 kJ"]),
        measurementAnswer("measure-energy-g3", "A heater uses 1.8 kWh and electricity costs 30 cents per kWh. What is the cost in cents?", "1.8\\times 30", "54 cents", ["54", "54c", "54 cents"]),
        financeChoice("measure-energy-g4", "Which unit is most suitable for the mass of a car?", "D", ["Millilitres", "Square metres", "Kilojoules", "Tonnes"], "A car mass is commonly measured in tonnes."),
      ],
      independentPractice: [
        measurementAnswer("measure-energy-i1", "A lunchbox contains 0.85 kg of fruit. Convert this to grams.", "0.85\\times 1000", "850 g", ["850", "850g"]),
        measurementAnswer("measure-energy-i2", "A cereal label lists 410 kJ per serve. Two serves are eaten. What is the total energy?", "410\\times 2", "820 kJ", ["820", "820kJ", "820 kJ"]),
        measurementAnswer("measure-energy-i3", "A dryer uses 2.5 kWh. Electricity costs 28 cents per kWh. What is the cost in cents?", "2.5\\times 28", "70 cents", ["70", "70c", "70 cents"]),
        measurementAnswer("measure-energy-i4", "A load of gravel has mass 2.4 tonnes. Convert this to kilograms.", "2.4\\times 1000", "2400 kg", ["2400", "2,400", "2400kg"]),
        financeChoice("measure-energy-i5", "Which answer is most reasonable for the mass of a packet of rice?", "B", ["5 tonnes", "1 kg", "900 kWh", "20 square metres"], "Rice packets are commonly measured in kilograms."),
      ],
      commonMistakes: [
        { mistake: "Treating kilojoules as grams.", fix: "Kilojoules measure energy, not mass." },
        { mistake: "Forgetting to multiply by the number of serves.", fix: "Use energy per serve times number of serves." },
        { mistake: "Using kW when the question asks for kWh cost.", fix: "Electricity bills usually use kilowatt-hours." },
        { mistake: "Choosing an unreasonable unit.", fix: "Match small items to grams/kg and large loads to tonnes." },
      ],
      masteryQuiz: [
        measurementAnswer("measure-energy-m1", "A packet contains 2.25 kg of potatoes. Convert this to grams.", "2.25\\times 1000", "2250 g", ["2250", "2,250", "2250g"]),
        measurementAnswer("measure-energy-m2", "A drink label lists 350 kJ per bottle. What energy is in 4 bottles?", "350\\times 4", "1400 kJ", ["1400", "1,400", "1400kJ", "1400 kJ"]),
        measurementAnswer("measure-energy-m3", "An air conditioner uses 3.2 kWh. Electricity costs 25 cents per kWh. What is the cost in cents?", "3.2\\times 25", "80 cents", ["80", "80c", "80 cents"]),
        financeChoice("measure-energy-m4", "A food label showing kJ is measuring:", "A", ["Energy", "Surface area", "Length", "Capacity"], "kJ measures energy."),
        measurementAnswer("measure-energy-m5", "A delivery has mass 0.75 tonnes. Convert this to kilograms.", "0.75\\times 1000", "750 kg", ["750", "750kg"]),
        measurementAnswer("measure-energy-m6", "A snack has 510 kJ per serve and there are 5 serves. Find total energy.", "510\\times 5", "2550 kJ", ["2550", "2,550", "2550kJ", "2550 kJ"]),
        financeChoice("measure-energy-m7", "Which unit is most suitable for a phone battery energy discussion?", "C", ["Tonnes", "Square metres", "Kilowatt-hours or watt-hours", "Centimetres"], "Electrical energy is measured with watt-hours or kilowatt-hours."),
        measurementAnswer("measure-energy-m8", "A washing machine uses 1.4 kWh at 32 cents per kWh. What is the cost in cents?", "1.4\\times 32", "44.8 cents", ["44.8", "44.80", "44.8c", "44.8 cents"]),
        financeChoice("measure-energy-m9", "A result of 300 tonnes for a school lunch sandwich is:", "D", ["Reasonable", "A capacity", "An area", "Not reasonable"], "A sandwich mass would be in grams, not tonnes."),
        measurementAnswer("measure-energy-m10", "A recipe uses 250 g of pasta for each person. How many grams are needed for 6 people?", "250\\times 6", "1500 g", ["1500", "1,500", "1500g"]),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed measurement questions involving units, accuracy, error, area, volume, capacity, energy, mass and electricity use.",
    learningIntention:
      "Apply measurement skills to mixed practical exam-style contexts.",
    successCriteria: [
      "Choose appropriate units and conversions.",
      "Use limits of accuracy and percentage error.",
      "Calculate area, surface area, volume and capacity in context.",
      "Interpret mass, energy labels and electricity usage.",
    ],
    teaching: {
      paragraphs: [
        "Measurement exam questions often combine unit choice, conversion, accuracy, and practical calculations.",
        "Start by identifying what is being measured: length, area, volume, capacity, mass, energy or electricity use.",
        "Use the context to decide the method. Flooring needs area, tanks need volume or capacity, and energy bills use kWh.",
        "Check reasonableness at the end. A unit or conversion error can make an answer much too large or too small.",
      ],
      latexBlocks: [
        "\\text{percentage error}=\\frac{\\text{absolute error}}{\\text{actual value}}\\times 100\\%",
        "1\\text{ m}^3=1000\\text{ L}",
        "\\text{electricity cost}=\\text{kWh}\\times\\text{cost per kWh}",
      ],
    },
    guidedPractice: [
      measurementAnswer("measure-exam-g1", "A hallway is 2.8 m long. Skirting is ordered in centimetres. Convert the length to centimetres.", "2.8\\times 100", "280 cm", ["280", "280cm"]),
      measurementAnswer("measure-exam-g2", "A reported length is 12.0 cm to the nearest millimetre. What is the lower limit of accuracy?", "12.0-0.05", "11.95 cm", ["11.95", "11.95cm"]),
      measurementAnswer("measure-exam-g3", "A water tub is 0.45 m^3. Convert this capacity to litres.", "0.45\\times 1000", "450 L", ["450", "450L", "450 l", "450 litres"]),
      financeChoice("measure-exam-g4", "Which method is needed to estimate carpet for a bedroom?", "A", ["Calculate floor area", "Calculate tank volume", "Calculate percentage error only", "Use kilojoules"], "Carpet covers floor area."),
    ],
    independentPractice: [
      measurementAnswer("measure-exam-i1", "A reported mass is 4.6 kg and the actual mass is 4.5 kg. What is the absolute error?", "|4.6-4.5|", "0.1 kg", ["0.1", "0.1kg", "100 g", "100g"]),
      measurementAnswer("measure-exam-i2", "A patio is 3.5 m by 2.4 m. What is its area?", "3.5\\times 2.4", "8.4 m^2", ["8.4", "8.40", "8.4m^2", "8.4 m2"]),
      measurementAnswer("measure-exam-i3", "A food label says 480 kJ per serve. A student eats 2 serves. What energy is consumed?", "480\\times 2", "960 kJ", ["960", "960kJ", "960 kJ"]),
      measurementAnswer("measure-exam-i4", "A fan uses 0.6 kWh at 35 cents per kWh. What is the cost in cents?", "0.6\\times 35", "21 cents", ["21", "21c", "21 cents"]),
      financeChoice("measure-exam-i5", "Which result is most reasonable for the capacity of a household bucket?", "B", ["12 square metres", "12 litres", "12 tonnes", "12 kilojoules"], "Buckets are commonly measured in litres."),
    ],
    commonMistakes: [
      { mistake: "Choosing the wrong measurement type.", fix: "Identify whether the context is length, area, volume, mass, energy or cost." },
      { mistake: "Ignoring limits of accuracy.", fix: "Use half the rounding unit on each side." },
      { mistake: "Confusing area and volume.", fix: "Area is flat; volume fills space." },
      { mistake: "Leaving off important units.", fix: "Include units or select the unit that matches the question." },
    ],
    masteryQuiz: [
      measurementAnswer("measure-exam-m1", "A garden edge is 6.4 m long. Convert this to centimetres for an order form.", "6.4\\times 100", "640 cm", ["640", "640cm"]),
      measurementAnswer("measure-exam-m2", "A reported length is 25 cm to the nearest centimetre. What is the upper limit of accuracy?", "25+0.5", "25.5 cm", ["25.5", "25.5cm"]),
      measurementAnswer("measure-exam-m3", "A measured mass is 10.5 kg and the actual mass is 10 kg. What is the percentage error?", "\\frac{0.5}{10}\\times 100", "5%", ["5", "5 percent", "5percent"]),
      measurementAnswer("measure-exam-m4", "A kitchen floor is 4 m by 3 m. What area of flooring is needed?", "4\\times 3", "12 m^2", ["12", "12m^2", "12 m2"]),
      measurementAnswer("measure-exam-m5", "A tank volume is 0.75 m^3. Convert this to litres.", "0.75\\times 1000", "750 L", ["750", "750L", "750 l", "750 litres"]),
      measurementAnswer("measure-exam-m6", "A recipe uses 1.2 kg of sugar. Convert this to grams.", "1.2\\times 1000", "1200 g", ["1200", "1,200", "1200g"]),
      measurementAnswer("measure-exam-m7", "A snack has 390 kJ per serve. Find the energy for 3 serves.", "390\\times 3", "1170 kJ", ["1170", "1,170", "1170kJ", "1170 kJ"]),
      measurementAnswer("measure-exam-m8", "A heater uses 2.2 kWh at 30 cents per kWh. What is the cost in cents?", "2.2\\times 30", "66 cents", ["66", "66c", "66 cents"]),
      financeChoice("measure-exam-m9", "A paint question asking how much wall is covered needs:", "C", ["Mass", "Capacity", "Area", "Kilowatt-hours"], "Paint coverage uses area."),
      financeChoice("measure-exam-m10", "A result should be checked for reasonableness because:", "A", ["Wrong conversions can make answers too large or too small", "Units never matter", "All rounded values are exact", "Area and volume are identical"], "Reasonableness catches unit and method errors."),
    ],
  };
}

function timeLocationWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "time-calculations-timetables") {
    return [
      {
        title: "Trip duration from a timetable",
        questionLatex: "\\text{A train leaves at 08:42 and arrives at 10:17.}",
        steps: [
          { explanation: "Count from 08:42 to 09:42 as 1 hour." },
          { explanation: "Count from 09:42 to 10:17 as 35 minutes.", latex: "1\\text{ h }35\\text{ min}" },
        ],
        finalAnswerLatex: "1\\text{ h }35\\text{ min}",
      },
      {
        title: "Waiting for the next bus",
        questionLatex:
          "\\begin{array}{c|c}\\text{Service A}&07{:}15\\\\\\text{Service B}&07{:}45\\\\\\text{Service C}&08{:}20\\end{array}\\quad\\text{Maya arrives at }07{:}32.",
        steps: [
          { explanation: "The next departure after 07:32 is 07:45." },
          { explanation: "Find the waiting time.", latex: "07{:}45-07{:}32=13\\text{ min}" },
        ],
        finalAnswerLatex: "13\\text{ min}",
      },
      {
        title: "Converting time formats",
        questionLatex: "\\text{A rehearsal starts at }6{:}30\\text{ pm. Write this in 24-hour time.}",
        steps: [
          { explanation: "For pm times after midday, add 12 to the hour unless it is 12 pm." },
          { explanation: "6:30 pm becomes 18:30." },
        ],
        finalAnswerLatex: "18{:}30",
      },
    ];
  }

  if (slug === "time-zones-utc-international-date-line") {
    return [
      {
        title: "Sydney to Perth using UTC offsets",
        questionLatex: "\\text{Sydney is UTC+10 and Perth is UTC+8. Sydney time is }18{:}30.",
        steps: [
          { explanation: "Perth is 2 hours behind Sydney." },
          { explanation: "Subtract 2 hours from Sydney time.", latex: "18{:}30-2\\text{ h}=16{:}30" },
        ],
        finalAnswerLatex: "16{:}30\\text{ or }4{:}30\\text{ pm}",
      },
      {
        title: "International UTC offset",
        questionLatex: "\\text{London is UTC+0 and Singapore is UTC+8. London time is }09{:}15.",
        steps: [
          { explanation: "Singapore is 8 hours ahead of London." },
          { explanation: "Add 8 hours.", latex: "09{:}15+8\\text{ h}=17{:}15" },
        ],
        finalAnswerLatex: "17{:}15\\text{ or }5{:}15\\text{ pm}",
      },
      {
        title: "Crossing the International Date Line",
        questionLatex:
          "\\text{A flight leaves Fiji late Tuesday and crosses east over the International Date Line.}",
        steps: [
          { explanation: "Crossing east over the International Date Line usually moves the calendar date back one day." },
          { explanation: "Check both the time difference and the date change before writing the arrival date." },
        ],
        finalAnswerLatex: "\\text{The date may become Monday or earlier Tuesday depending on flight time.}",
      },
    ];
  }

  return [
    {
      title: `${title}: mixed timetable question`,
      questionLatex:
        "\\begin{array}{c|c|c}\\text{Service}&\\text{Departure}&\\text{Arrival}\\\\\\text{A}&07{:}15&08{:}05\\\\\\text{B}&07{:}45&08{:}32\\\\\\text{C}&08{:}20&09{:}12\\end{array}",
      steps: [
        { explanation: "Read departure and arrival times from the same service row." },
        { explanation: "Subtract departure time from arrival time to find travel time." },
      ],
      finalAnswerLatex: "\\text{Use the selected service row.}",
    },
    {
      title: `${title}: mixed time zone question`,
      questionLatex: "\\text{A city at UTC+12 is compared with a city at UTC-8.}",
      steps: [
        { explanation: "Find the difference between the UTC offsets.", latex: "12-(-8)=20\\text{ h}" },
        { explanation: "Large differences may create a date change." },
      ],
      finalAnswerLatex: "\\text{20 hours apart, with possible date change.}",
    },
  ];
}

function timeLocationLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-standard" || unit.slug !== "time-location") {
    return null;
  }

  const base = {
    workedExamples: timeLocationWorkedExamples(lesson.slug, lesson.title),
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "time-calculations-timetables") {
    return {
      ...base,
      description:
        "Read timetables, convert time formats, and calculate elapsed, waiting and travel times.",
      learningIntention:
        "Use 12-hour and 24-hour time, elapsed time and timetables in practical travel contexts.",
      successCriteria: [
        "Convert between 12-hour and 24-hour time in context.",
        "Calculate elapsed time between departure and arrival.",
        "Read a timetable to find a waiting time.",
        "Handle simple time calculations that cross midnight.",
      ],
      teaching: {
        paragraphs: [
          "Timetables organise departure and arrival times. Read along the same row or service before calculating.",
          "Elapsed time is the amount of time between two times. It is often easier to count to the next hour, then to the finish time.",
          "Waiting time is the time from when a person arrives at the station or stop until the next suitable service departs.",
          "For 24-hour time, pm times are usually written by adding 12 to the hour. Midnight crossings need careful date awareness.",
        ],
        latexBlocks: [
          "6{:}30\\text{ pm}=18{:}30",
          "\\text{elapsed time}=\\text{finish time}-\\text{start time}",
        ],
      },
      guidedPractice: [
        timeAnswer("time-table-g1", "A train leaves at 08:42 and arrives at 10:17. How long is the trip?", "10{:}17-08{:}42", "1 h 35 min", ["1 hour 35 minutes", "95 min", "95 minutes", "1h35min"]),
        timeAnswer("time-table-g2", "A bus timetable shows departures at 7:15, 7:45 and 8:20. If Maya arrives at 7:32, how long does she wait for the next bus?", "07{:}45-07{:}32", "13 min", ["13 minutes", "13min"]),
        timeAnswer("time-table-g3", "A school rehearsal starts at 6:30 pm. Write the start time in 24-hour time.", "6{:}30\\text{ pm}", "18:30", ["1830", "6:30 pm", "6.30 pm"]),
        financeChoice("time-table-g4", "A ferry leaves at 23:40 and arrives at 00:25. What must be remembered?", "C", ["The trip is impossible", "The arrival is earlier on the same day", "The trip crosses midnight", "The time zone must always change"], "The arrival time is after midnight on the next day."),
      ],
      independentPractice: [
        timeAnswer("time-table-i1", "A bus leaves at 07:55 and arrives at 08:38. What is the travel time?", "08{:}38-07{:}55", "43 min", ["43 minutes", "43min"]),
        timeAnswer("time-table-i2", "A student arrives at the station at 15:18. The next trains leave at 15:05, 15:32 and 15:50. What is the waiting time?", "15{:}32-15{:}18", "14 min", ["14 minutes", "14min"]),
        timeAnswer("time-table-i3", "A part-time shift starts at 9:15 am. Write this in 24-hour time.", "9{:}15\\text{ am}", "09:15", ["9:15", "0915", "9.15 am"]),
        timeAnswer("time-table-i4", "A flight departs at 22:50 and lands at 01:20 the next day. How long is the flight?", "1\\text{ h }10\\text{ min}+1\\text{ h }20\\text{ min}", "2 h 30 min", ["2 hours 30 minutes", "150 min", "150 minutes", "2h30min"]),
        financeChoice("time-table-i5", "When using a timetable, the safest first step is to:", "A", ["Use times from the same service row", "Use the latest arrival only", "Ignore am and pm", "Subtract the smaller number from the larger number"], "Timetable calculations must use the correct row."),
      ],
      commonMistakes: [
        { mistake: "Subtracting times as ordinary decimals.", fix: "Use hours and minutes, not base-10 decimal subtraction." },
        { mistake: "Ignoring am and pm.", fix: "Convert to 24-hour time when it helps." },
        { mistake: "Using the wrong timetable row.", fix: "Read departure and arrival from the same service." },
        { mistake: "Forgetting midnight crossings.", fix: "When arrival is after 00:00, check whether the date has changed." },
      ],
      masteryQuiz: [
        timeAnswer("time-table-m1", "A train leaves Central at 09:28 and reaches Parramatta at 10:06. What is the travel time?", "10{:}06-09{:}28", "38 min", ["38 minutes", "38min"]),
        timeAnswer("time-table-m2", "A ferry leaves at 11:45 am. Write this in 24-hour time.", "11{:}45\\text{ am}", "11:45", ["1145", "11.45 am"]),
        timeAnswer("time-table-m3", "A cinema session starts at 7:05 pm. Write this in 24-hour time.", "7{:}05\\text{ pm}", "19:05", ["1905", "7:05 pm", "7.05 pm"]),
        timeAnswer("time-table-m4", "A bus leaves at 16:40 and arrives at 17:25. How long is the trip?", "17{:}25-16{:}40", "45 min", ["45 minutes", "45min"]),
        financeChoice("time-table-m5", "A school bell time of 14:50 is:", "B", ["2:50 am", "2:50 pm", "4:50 pm", "12:50 pm"], "14:50 is 2:50 pm."),
        timeAnswer("time-table-m6", "A student arrives at 08:03. Buses depart at 07:58, 08:12 and 08:27. How long is the wait for the next bus?", "08{:}12-08{:}03", "9 min", ["9 minutes", "9min"]),
        timeAnswer("time-table-m7", "A coach leaves at 23:15 and arrives at 00:05 the next day. What is the travel time?", "45+5", "50 min", ["50 minutes", "50min"]),
        financeChoice("time-table-m8", "A trip from 10:20 to 12:05 is best counted as:", "D", ["205 minutes", "1 hour only", "20 minutes", "1 hour 45 minutes"], "10:20 to 11:20 is 1 hour, then 45 minutes."),
        timeAnswer("time-table-m9", "A work shift runs from 13:30 to 17:00. How long is the shift?", "17{:}00-13{:}30", "3 h 30 min", ["3 hours 30 minutes", "210 min", "210 minutes", "3h30min"]),
        financeChoice("time-table-m10", "If a timetable has departures at 06:30, 07:00 and 07:20, and a student arrives at 06:45, the next service is:", "C", ["06:30", "06:45", "07:00", "07:20"], "The next departure after 06:45 is 07:00."),
      ],
    };
  }

  if (lesson.slug === "time-zones-utc-international-date-line") {
    return {
      ...base,
      description:
        "Use UTC offsets, Australian and international time zones, daylight saving and date changes.",
      learningIntention:
        "Convert between local times using UTC offsets and recognise when dates may change.",
      successCriteria: [
        "Compare local times using UTC offsets.",
        "Convert between Australian time zones in practical contexts.",
        "Account for daylight saving when the question includes it.",
        "Recognise date changes when crossing midnight or the International Date Line.",
      ],
      teaching: {
        paragraphs: [
          "UTC offsets describe how far a location is ahead of or behind Coordinated Universal Time. UTC+10 is two hours ahead of UTC+8.",
          "To convert between time zones, find the difference between the offsets, then add or subtract that difference from the starting local time.",
          "Daylight saving can change a location's offset for part of the year. Use the offset stated in the question.",
          "The International Date Line can change the calendar date. Crossing it east generally moves the date back one day; crossing it west generally moves the date forward one day.",
        ],
        latexBlocks: [
          "\\text{time difference}=\\text{destination UTC offset}-\\text{starting UTC offset}",
          "\\text{local destination time}=\\text{starting time}+\\text{time difference}",
        ],
      },
      guidedPractice: [
        timeAnswer("time-zone-g1", "Sydney is UTC+10 and Perth is UTC+8. If it is 6:30 pm in Sydney, what time is it in Perth?", "18{:}30-2\\text{ h}", "4:30 pm", ["16:30", "1630", "4.30 pm"]),
        timeAnswer("time-zone-g2", "London is UTC+0 and Singapore is UTC+8. If it is 09:15 in London, what time is it in Singapore?", "09{:}15+8\\text{ h}", "17:15", ["5:15 pm", "1715", "5.15 pm"]),
        financeChoice("time-zone-g3", "A city at UTC+11 compared with a city at UTC+10 is:", "A", ["1 hour ahead", "1 hour behind", "11 hours behind", "21 hours ahead"], "UTC+11 is one hour ahead of UTC+10."),
        financeChoice("time-zone-g4", "A flight crosses the International Date Line travelling east. The date will usually:", "B", ["Move forward one day", "Move back one day", "Never change", "Always become Sunday"], "Travelling east across the Date Line usually moves the date back."),
      ],
      independentPractice: [
        timeAnswer("time-zone-i1", "Brisbane is UTC+10 and Adelaide is UTC+9:30. If it is 14:00 in Brisbane, what time is it in Adelaide?", "14{:}00-0{:}30", "13:30", ["1:30 pm", "1330", "1.30 pm"]),
        timeAnswer("time-zone-i2", "Tokyo is UTC+9 and Perth is UTC+8. If it is 20:45 in Tokyo, what time is it in Perth?", "20{:}45-1\\text{ h}", "19:45", ["7:45 pm", "1945", "7.45 pm"]),
        financeChoice("time-zone-i3", "If daylight saving changes Sydney from UTC+10 to UTC+11, Sydney becomes:", "C", ["1 hour earlier", "unchanged", "1 hour later compared with UTC", "10 hours behind UTC"], "UTC+11 is one hour further ahead than UTC+10."),
        timeAnswer("time-zone-i4", "A city at UTC-5 calls a city at UTC+1. If it is 08:00 at UTC-5, what time is it at UTC+1?", "08{:}00+6\\text{ h}", "14:00", ["2:00 pm", "1400", "2.00 pm"]),
        financeChoice("time-zone-i5", "A flight leaves late at night and arrives after crossing several time zones. The most important extra check is:", "D", ["Only the plane colour", "Only the ticket price", "Only the airline name", "Whether the date changes"], "Long trips and time zones may change the date."),
      ],
      commonMistakes: [
        { mistake: "Adding when the destination is behind.", fix: "Compare the UTC offsets before choosing add or subtract." },
        { mistake: "Ignoring half-hour time zones.", fix: "Some Australian time zones differ by 30 minutes." },
        { mistake: "Forgetting daylight saving when stated.", fix: "Use the UTC offset given in the question." },
        { mistake: "Missing the date change at midnight or the International Date Line.", fix: "Check whether the converted time crosses a day boundary." },
      ],
      masteryQuiz: [
        timeAnswer("time-zone-m1", "Sydney is UTC+10 and Perth is UTC+8. If it is 21:10 in Sydney, what time is it in Perth?", "21{:}10-2\\text{ h}", "19:10", ["7:10 pm", "1910", "7.10 pm"]),
        timeAnswer("time-zone-m2", "Auckland is UTC+12 and Sydney is UTC+10. If it is 08:00 in Sydney, what time is it in Auckland?", "08{:}00+2\\text{ h}", "10:00", ["10:00 am", "1000", "10.00 am"]),
        financeChoice("time-zone-m3", "Perth at UTC+8 is compared with Sydney at UTC+10. Perth is:", "B", ["2 hours ahead", "2 hours behind", "18 hours ahead", "The same time"], "UTC+8 is two hours behind UTC+10."),
        timeAnswer("time-zone-m4", "New York is UTC-5 and London is UTC+0. If it is 13:30 in New York, what time is it in London?", "13{:}30+5\\text{ h}", "18:30", ["6:30 pm", "1830", "6.30 pm"]),
        financeChoice("time-zone-m5", "Crossing the International Date Line west usually means:", "C", ["Move back one day", "No date change ever", "Move forward one day", "Subtract 12 hours only"], "West across the Date Line usually moves the date forward."),
        timeAnswer("time-zone-m6", "Darwin is UTC+9:30 and Perth is UTC+8. If it is 12:00 in Darwin, what time is it in Perth?", "12{:}00-1{:}30", "10:30", ["10:30 am", "1030", "10.30 am"]),
        financeChoice("time-zone-m7", "If a converted time changes from 23:30 to 01:30, the arrival is:", "D", ["Earlier the same morning", "Always two days earlier", "No date change", "On the next day"], "Moving past midnight changes to the next day."),
        timeAnswer("time-zone-m8", "A city at UTC+2 calls a city at UTC-4. If it is 16:00 at UTC+2, what time is it at UTC-4?", "16{:}00-6\\text{ h}", "10:00", ["10:00 am", "1000", "10.00 am"]),
        financeChoice("time-zone-m9", "The safest way to handle daylight saving in a question is to:", "A", ["Use the UTC offsets stated in the question", "Always ignore it", "Always subtract 24 hours", "Use Sydney time for every city"], "Use the offsets provided."),
        timeAnswer("time-zone-m10", "If it is 23:15 Monday in a UTC+10 city, what time is it in a UTC+12 city?", "23{:}15+2\\text{ h}", "01:15 Tuesday", ["1:15 am Tuesday", "01:15 Tue", "1.15 am Tuesday"]),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed time questions using timetables, elapsed time, UTC offsets, time zones and date changes.",
    learningIntention:
      "Apply timetable and time-zone skills to mixed practical exam-style contexts.",
    successCriteria: [
      "Interpret timetable information accurately.",
      "Calculate elapsed and waiting times.",
      "Convert between time zones using UTC offsets.",
      "Recognise date changes in travel scenarios.",
    ],
    teaching: {
      paragraphs: [
        "Time and location exam questions often combine timetable reading, elapsed time, time zones and date changes.",
        "Start by identifying whether the question is asking for a duration, a departure or arrival time, a waiting time, or a local time in another place.",
        "Use the timetable row or UTC offsets carefully. A small direction error can change the answer by several hours.",
        "Check reasonableness: a bus wait should match the next departure, and a converted time may need a new date if it crosses midnight.",
      ],
      latexBlocks: [
        "\\text{elapsed time}=\\text{arrival time}-\\text{departure time}",
        "\\text{time difference}=\\text{destination offset}-\\text{starting offset}",
      ],
    },
    guidedPractice: [
      timeAnswer("time-exam-g1", "A service leaves at 07:45 and arrives at 08:32. What is the travel time?", "08{:}32-07{:}45", "47 min", ["47 minutes", "47min"]),
      timeAnswer("time-exam-g2", "A passenger arrives at 07:32. Departures are 07:15, 07:45 and 08:20. How long is the wait for the next service?", "07{:}45-07{:}32", "13 min", ["13 minutes", "13min"]),
      timeAnswer("time-exam-g3", "Sydney is UTC+10 and Perth is UTC+8. If it is 18:30 in Sydney, what time is it in Perth?", "18{:}30-2\\text{ h}", "16:30", ["4:30 pm", "1630", "4.30 pm"]),
      financeChoice("time-exam-g4", "A flight arrives at 00:20 after leaving at 22:50. What must be included?", "C", ["A daylight saving rule always", "No duration", "The next-day date change", "A ferry timetable"], "00:20 is after midnight."),
    ],
    independentPractice: [
      timeAnswer("time-exam-i1", "A train leaves at 06:55 and arrives at 08:10. What is the travel time?", "08{:}10-06{:}55", "1 h 15 min", ["1 hour 15 minutes", "75 min", "75 minutes", "1h15min"]),
      timeAnswer("time-exam-i2", "A bus passenger arrives at 15:22. Buses depart at 15:18, 15:36 and 15:55. How long is the wait?", "15{:}36-15{:}22", "14 min", ["14 minutes", "14min"]),
      timeAnswer("time-exam-i3", "A city at UTC+9 is compared with a city at UTC+5. If it is 20:00 at UTC+9, what time is it at UTC+5?", "20{:}00-4\\text{ h}", "16:00", ["4:00 pm", "1600", "4.00 pm"]),
      timeAnswer("time-exam-i4", "A flight departs at 23:30 Monday and lasts 2 hours. Ignoring time zones, what is the arrival time and day?", "23{:}30+2\\text{ h}", "01:30 Tuesday", ["1:30 am Tuesday", "01:30 Tue", "1.30 am Tuesday"]),
      financeChoice("time-exam-i5", "Which answer is reasonable for a train trip from 09:50 to 10:20?", "A", ["30 minutes", "70 minutes", "3 hours", "30 hours"], "09:50 to 10:20 is 30 minutes."),
    ],
    commonMistakes: [
      { mistake: "Using the wrong timetable row.", fix: "Use departure and arrival from the same service." },
      { mistake: "Confusing duration with arrival time.", fix: "Check whether the answer should be a length of time or a clock time." },
      { mistake: "Reversing time zone offsets.", fix: "Find whether the destination is ahead or behind." },
      { mistake: "Forgetting date changes.", fix: "Check midnight and the International Date Line." },
    ],
    masteryQuiz: [
      timeAnswer("time-exam-m1", "Service B departs at 07:45 and arrives at 08:32. What is the trip duration?", "08{:}32-07{:}45", "47 min", ["47 minutes", "47min"]),
      timeAnswer("time-exam-m2", "A commuter arrives at 08:06. Services leave at 08:01, 08:18 and 08:40. How long is the wait?", "08{:}18-08{:}06", "12 min", ["12 minutes", "12min"]),
      timeAnswer("time-exam-m3", "A school event starts at 5:45 pm. Write this in 24-hour time.", "5{:}45\\text{ pm}", "17:45", ["1745", "5:45 pm", "5.45 pm"]),
      timeAnswer("time-exam-m4", "A ferry leaves at 22:35 and arrives at 23:20. What is the travel time?", "23{:}20-22{:}35", "45 min", ["45 minutes", "45min"]),
      timeAnswer("time-exam-m5", "Melbourne is UTC+10 and Perth is UTC+8. If it is 09:30 in Perth, what time is it in Melbourne?", "09{:}30+2\\text{ h}", "11:30", ["11:30 am", "1130", "11.30 am"]),
      financeChoice("time-exam-m6", "A trip crosses the International Date Line. Which detail is most important?", "D", ["The seat number", "The ticket colour", "The meal choice", "The direction of crossing"], "Direction affects whether the date moves forward or back."),
      timeAnswer("time-exam-m7", "A city at UTC-3 is compared with UTC+2. If it is 10:00 at UTC-3, what time is it at UTC+2?", "10{:}00+5\\text{ h}", "15:00", ["3:00 pm", "1500", "3.00 pm"]),
      financeChoice("time-exam-m8", "Which mistake gives a bad timetable answer?", "B", ["Checking am/pm", "Subtracting minutes as decimals", "Using the same service row", "Checking midnight"], "Time uses 60 minutes per hour, not decimal place value."),
      timeAnswer("time-exam-m9", "A flight leaves at 21:20 and lasts 4 h 10 min. Ignoring time zones, what is the arrival time?", "21{:}20+4{:}10", "01:30", ["1:30 am", "0130", "1.30 am"]),
      financeChoice("time-exam-m10", "If Sydney is observing daylight saving as UTC+11 and Perth is UTC+8, Sydney is:", "A", ["3 hours ahead", "2 hours ahead", "3 hours behind", "The same time"], "UTC+11 is 3 hours ahead of UTC+8."),
    ],
  };
}

function dataAnalysisWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "data-displays-summary-statistics") {
    return [
      {
        title: "Mean coffee sales",
        questionLatex:
          "\\text{Cafe coffees sold over 7 mornings: }42,38,45,51,39,44,48",
        steps: [
          { explanation: "Add the seven sales values.", latex: "42+38+45+51+39+44+48=307" },
          { explanation: "Divide by 7 mornings.", latex: "307\\div 7=43.857\\ldots" },
        ],
        finalAnswerLatex: "43.9\\text{ coffees, approximately}",
      },
      {
        title: "Median and range after ordering",
        questionLatex:
          "\\text{Delivery times in minutes: }18,20,21,22,23,24,47",
        steps: [
          { explanation: "The data are already ordered. The middle value is the 4th value.", latex: "\\text{median}=22" },
          { explanation: "Range is highest minus lowest.", latex: "47-18=29" },
        ],
        finalAnswerLatex: "\\text{median }22\\text{ min, range }29\\text{ min}",
      },
      {
        title: "Reading a frequency table",
        questionLatex:
          "\\begin{array}{c|c}\\text{Rating}&\\text{Frequency}\\\\1&2\\\\2&3\\\\3&5\\\\4&8\\\\5&12\\end{array}",
        steps: [
          { explanation: "Frequency tells how many times each rating occurred." },
          { explanation: "The largest frequency is 12 for rating 5." },
        ],
        finalAnswerLatex: "\\text{Rating }5",
      },
    ];
  }

  if (slug === "interpreting-data-outliers") {
    return [
      {
        title: "Identifying an outlier",
        questionLatex:
          "\\text{Delivery times in minutes: }18,20,21,22,23,24,47",
        steps: [
          { explanation: "Most values are between 18 and 24 minutes." },
          { explanation: "47 minutes is far away from the rest." },
        ],
        finalAnswerLatex: "47\\text{ min}",
      },
      {
        title: "Mean and median with an outlier",
        questionLatex:
          "\\text{Data: }18,20,21,22,23,24,47",
        steps: [
          { explanation: "The median is the middle value.", latex: "\\text{median}=22" },
          { explanation: "The outlier 47 pulls the mean upward more than the median." },
        ],
        finalAnswerLatex: "\\text{Median is more resistant.}",
      },
      {
        title: "Choosing a summary statistic",
        questionLatex:
          "\\text{A delivery data set has one unusually late delivery.}",
        steps: [
          { explanation: "An outlier can distort the mean." },
          { explanation: "The median better describes a typical delivery time when the outlier is not typical." },
        ],
        finalAnswerLatex: "\\text{Use the median.}",
      },
    ];
  }

  return [
    {
      title: `${title}: mixed summary statistics`,
      questionLatex:
        "\\begin{array}{c|c}\\text{Day}&\\text{Sales}\\\\\\text{Mon}&42\\\\\\text{Tue}&38\\\\\\text{Wed}&45\\\\\\text{Thu}&51\\\\\\text{Fri}&44\\end{array}",
      steps: [
        { explanation: "Use the table to identify the data values." },
        { explanation: "Calculate the statistic requested, such as mean, median or range." },
      ],
      finalAnswerLatex: "\\text{Answer depends on the statistic requested.}",
    },
    {
      title: `${title}: interpreting an outlier`,
      questionLatex:
        "\\text{Travel times: }14,15,16,16,17,18,42",
      steps: [
        { explanation: "The value 42 is far from the rest of the travel times." },
        { explanation: "Use a cautious conclusion because the unusual value affects the mean." },
      ],
      finalAnswerLatex: "42\\text{ min is an outlier.}",
    },
  ];
}

function dataAnalysisLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-standard" || unit.slug !== "data-analysis") {
    return null;
  }

  const base = {
    workedExamples: dataAnalysisWorkedExamples(lesson.slug, lesson.title),
    syllabusArea: "Statistical Analysis",
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "data-displays-summary-statistics") {
    return {
      ...base,
      description:
        "Read data displays and calculate mean, median, mode and range in practical contexts.",
      learningIntention:
        "Summarise and display practical data using frequency tables, graphs and summary statistics.",
      successCriteria: [
        "Distinguish categorical and numerical data.",
        "Read frequency tables and simple column graphs.",
        "Calculate mean, median, mode and range.",
        "Choose a suitable summary statistic for a context.",
      ],
      teaching: {
        paragraphs: [
          "Data can be categorical, such as transport type, or numerical, such as travel time in minutes.",
          "Frequency tables and column graphs show how often categories or values occur.",
          "The mean is the total divided by the number of values. The median is the middle value after ordering. The mode is the most common value.",
          "The range is the highest value minus the lowest value. It gives a quick measure of spread.",
        ],
        latexBlocks: [
          "\\text{mean}=\\frac{\\text{total}}{\\text{number of values}}",
          "\\text{range}=\\text{highest value}-\\text{lowest value}",
        ],
      },
      guidedPractice: [
        dataAnswer("data-display-g1", "A cafe records coffees sold over five mornings: 42, 38, 45, 51, 44. Find the mean number sold.", "\\frac{42+38+45+51+44}{5}", "44", ["44.0", "44 coffees"]),
        dataAnswer("data-display-g2", "A delivery team records travel times: 18, 20, 21, 22, 24. Find the median travel time.", "\\text{middle value}=21", "21", ["21 min", "21 minutes"]),
        dataAnswer("data-display-g3", "Daily absences at a school are 6, 4, 9, 7, 5. Find the range.", "9-4", "5", ["5 absences"]),
        financeChoice("data-display-g4", "A survey asks students to choose bus, train, walk or car. This data is:", "A", ["Categorical", "Numerical continuous", "A time zone", "A percentage error"], "Transport type is a category."),
      ],
      independentPractice: [
        dataAnswer("data-display-i1", "A sports team scores 12, 15, 15, 18 and 20 points in five games. Find the mode.", "\\text{most common}=15", "15", ["15 points"]),
        dataAnswer("data-display-i2", "A shop records customer counts: 30, 34, 29, 37, 35. Find the mean customer count.", "\\frac{30+34+29+37+35}{5}", "33", ["33.0", "33 customers"]),
        dataAnswer("data-display-i3", "Study hours over a week are 1, 2, 2, 3, 4, 5, 6. Find the median.", "\\text{middle value}=3", "3", ["3 hours", "3 h"]),
        financeChoice("data-display-i4", "A frequency table has the largest frequency beside rating 4. The mode is:", "C", ["The total frequency", "The smallest rating", "Rating 4", "The range"], "The mode is the category or value with highest frequency."),
        financeChoice("data-display-i5", "A column graph is useful because it shows:", "B", ["Only the mean", "Comparisons between categories", "Only time zones", "Only limits of accuracy"], "Column graphs compare category heights."),
      ],
      commonMistakes: [
        { mistake: "Using the total instead of the mean.", fix: "Divide the total by the number of values." },
        { mistake: "Finding the median before ordering data.", fix: "Order the values first." },
        { mistake: "Using the highest value as the range.", fix: "Range is highest minus lowest." },
        { mistake: "Confusing frequency with the data value.", fix: "Frequency is how often a value or category occurs." },
      ],
      masteryQuiz: [
        dataAnswer("data-display-m1", "A cafe sells 42, 38, 45, 51, 39, 44 and 48 coffees over 7 mornings. Find the mean to 1 decimal place.", "\\frac{307}{7}", "43.9", ["43.86", "43.857", "43.9 coffees"]),
        dataAnswer("data-display-m2", "Temperatures recorded at midday are 21, 23, 24, 24, 26. Find the mode.", "\\text{most common}=24", "24", ["24 degrees", "24°C", "24 C"]),
        dataAnswer("data-display-m3", "Customer ratings are 2, 3, 3, 4, 5. Find the median rating.", "\\text{middle value}=3", "3", ["3 stars", "rating 3"]),
        dataAnswer("data-display-m4", "Delivery times are 12, 15, 17, 20 and 25 minutes. Find the range.", "25-12", "13", ["13 min", "13 minutes"]),
        financeChoice("data-display-m5", "Number of pets owned by students is:", "B", ["Categorical only", "Numerical discrete", "A time display", "A unit conversion"], "Pet counts are numerical discrete data."),
        financeChoice("data-display-m6", "A bar chart column for Wednesday is highest. This means Wednesday had:", "A", ["The greatest frequency", "The lowest value", "The median only", "No data"], "The tallest column shows the greatest frequency."),
        dataAnswer("data-display-m7", "Weekly study hours are 4, 5, 6, 7, 8. Find the mean.", "\\frac{4+5+6+7+8}{5}", "6", ["6 hours", "6 h"]),
        financeChoice("data-display-m8", "To find the median of 8, 3, 7, 4, 5, first:", "D", ["Add all values", "Find the highest value", "Draw a map", "Order the data"], "Median requires ordered data."),
        dataAnswer("data-display-m9", "A frequency table shows 6 students chose soccer, 9 chose netball, 4 chose tennis. How many students were surveyed?", "6+9+4", "19", ["19 students"]),
        financeChoice("data-display-m10", "The best display for comparing favourite subjects is usually:", "C", ["A stopwatch", "A ruler", "A column graph", "A timetable"], "Favourite subjects are categories suited to a column graph."),
      ],
    };
  }

  if (lesson.slug === "interpreting-data-outliers") {
    return {
      ...base,
      description:
        "Interpret practical data, identify outliers, and choose cautious conclusions using mean or median.",
      learningIntention:
        "Interpret data sets with outliers and choose suitable summary statistics for practical conclusions.",
      successCriteria: [
        "Identify an outlier in a practical data set.",
        "Describe how an outlier can affect the mean.",
        "Choose when median is more appropriate than mean.",
        "Make cautious conclusions from data in context.",
      ],
      teaching: {
        paragraphs: [
          "An outlier is a value that is noticeably far away from the rest of the data.",
          "Outliers can pull the mean toward the unusual value. The median is usually less affected.",
          "When data are skewed or include an unusual result, the median may better represent a typical value.",
          "Conclusions from data should be cautious. A small data set or unusual value may not represent every situation.",
        ],
        latexBlocks: [
          "\\text{outlier}=\\text{value far from the main group}",
          "\\text{median is resistant to outliers}",
        ],
      },
      guidedPractice: [
        dataAnswer("data-outlier-g1", "Delivery times are 18, 20, 21, 22, 23, 24 and 47 minutes. Which value is the outlier?", "\\text{far value}=47", "47", ["47 min", "47 minutes"]),
        financeChoice("data-outlier-g2", "For delivery times 18, 20, 21, 22, 23, 24, 47, which measure is usually better for a typical delivery time?", "B", ["Mean", "Median", "Range only", "Highest value"], "The median is less affected by the outlier 47."),
        financeChoice("data-outlier-g3", "An outlier usually affects the mean by:", "A", ["Pulling it toward the outlier", "Leaving it always unchanged", "Turning it into the range", "Making it categorical"], "The mean uses every value, including outliers."),
        dataAnswer("data-outlier-g4", "Travel times are 14, 15, 16, 16, 17, 18 and 42 minutes. What is the range?", "42-14", "28", ["28 min", "28 minutes"]),
      ],
      independentPractice: [
        financeChoice("data-outlier-i1", "A data set of house prices includes one extremely expensive house. Which measure is more resistant?", "C", ["Mean", "Range", "Median", "Total"], "Median is more resistant to an extreme value."),
        dataAnswer("data-outlier-i2", "Customer waiting times are 3, 4, 4, 5, 6 and 19 minutes. Identify the outlier.", "\\text{far value}=19", "19", ["19 min", "19 minutes"]),
        financeChoice("data-outlier-i3", "A class wants a typical homework time but one student reports 9 hours. The best cautious choice is:", "A", ["Use the median", "Use the maximum only", "Ignore all data", "Use the range as the typical value"], "Median is less affected by the unusually high value."),
        financeChoice("data-outlier-i4", "A conclusion from a survey of 12 people should be:", "D", ["Certain for all students", "Unrelated to data", "Based only on the largest value", "Cautious because the sample is small"], "Small samples support cautious conclusions."),
        dataAnswer("data-outlier-i5", "Daily sales are 38, 40, 41, 42, 43 and 79. What value is likely an outlier?", "\\text{far value}=79", "79", ["79 sales"]),
      ],
      commonMistakes: [
        { mistake: "Assuming every highest value is an outlier.", fix: "Check whether it is far from the rest of the data." },
        { mistake: "Using mean without considering outliers.", fix: "Check whether the median is more suitable." },
        { mistake: "Making a conclusion that is too strong.", fix: "Use cautious wording based on the data available." },
        { mistake: "Confusing range with a typical value.", fix: "Range measures spread, not centre." },
      ],
      masteryQuiz: [
        dataAnswer("data-outlier-m1", "A delivery time data set is 18, 20, 21, 22, 23, 24, 47. Which value is the outlier?", "\\text{far value}=47", "47", ["47 min", "47 minutes"]),
        financeChoice("data-outlier-m2", "In that delivery data set, the median is preferred because:", "B", ["It is always the largest value", "It is less affected by 47", "It includes no data", "It is the same as range"], "Median is resistant to the high outlier."),
        financeChoice("data-outlier-m3", "An outlier in a small data set should make conclusions:", "C", ["More certain", "Impossible always", "More cautious", "Unrelated to context"], "Outliers can distort summaries."),
        dataAnswer("data-outlier-m4", "Sport scores are 8, 9, 10, 10, 11, 30. Identify the outlier.", "\\text{far value}=30", "30", ["30 points"]),
        dataAnswer("data-outlier-m5", "Temperatures are 19, 20, 21, 21, 22 and 35. What is the range?", "35-19", "16", ["16 degrees", "16°C", "16 C"]),
        financeChoice("data-outlier-m6", "If an unusually high value is added to a data set, the mean will usually:", "A", ["Increase", "Always decrease", "Become the mode", "Disappear"], "A high outlier pulls the mean upward."),
        financeChoice("data-outlier-m7", "Which statement is cautious and data-based?", "D", ["All deliveries are always late", "The company is perfect", "One value proves everything", "Most recorded deliveries were around 18 to 24 minutes"], "This matches the recorded data without overclaiming."),
        dataAnswer("data-outlier-m8", "Customer ratings are 4, 4, 5, 5, 5 and 1. Which value is unusually low?", "\\text{far low value}=1", "1", ["rating 1", "1 star"]),
        financeChoice("data-outlier-m9", "When an outlier is present, range can become:", "B", ["Smaller always", "Much larger", "The median", "A category"], "Range uses highest and lowest values."),
        financeChoice("data-outlier-m10", "For skewed travel-time data, the best typical value is often:", "C", ["Highest value", "Range", "Median", "Total"], "Median is useful for skewed data."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed data questions using tables, summary statistics, graph interpretation, outliers and cautious conclusions.",
    learningIntention:
      "Apply data analysis skills to practical exam-style contexts.",
    successCriteria: [
      "Calculate summary statistics from practical data.",
      "Read and interpret tables or graph descriptions.",
      "Identify outliers and their effect on summaries.",
      "Choose cautious conclusions from data.",
    ],
    teaching: {
      paragraphs: [
        "Data analysis exam questions often combine calculations with interpretation.",
        "Start by identifying the data values and the statistic required: mean, median, mode, range, total or percentage.",
        "For graph questions, read the category and value carefully. Do not confuse frequency with the data value.",
        "When outliers are present, consider whether the median gives a better typical value than the mean.",
      ],
      latexBlocks: [
        "\\text{mean}=\\frac{\\text{total}}{n}",
        "\\text{range}=\\text{maximum}-\\text{minimum}",
      ],
    },
    guidedPractice: [
      dataAnswer("data-exam-g1", "A table shows cafe sales: Mon 42, Tue 38, Wed 45, Thu 51, Fri 44. What is the total sales count?", "42+38+45+51+44", "220", ["220 coffees"]),
      dataAnswer("data-exam-g2", "The same cafe sales are 42, 38, 45, 51 and 44. Find the mean.", "\\frac{220}{5}", "44", ["44.0", "44 coffees"]),
      financeChoice("data-exam-g3", "A delivery time data set has 18, 20, 21, 22, 23, 24, 47. Which measure is better for a typical time?", "B", ["Mean", "Median", "Maximum", "Total"], "Median is less affected by the outlier."),
      financeChoice("data-exam-g4", "A column graph has the tallest column on Friday. Friday had the:", "A", ["Greatest frequency", "Smallest value", "Median only", "Range"], "The tallest column shows the greatest frequency."),
    ],
    independentPractice: [
      dataAnswer("data-exam-i1", "Absences over five days are 4, 6, 5, 8 and 7. Find the mean absences.", "\\frac{4+6+5+8+7}{5}", "6", ["6.0", "6 absences"]),
      dataAnswer("data-exam-i2", "Customer ratings are 2, 3, 4, 4, 5. Find the mode.", "\\text{most common}=4", "4", ["rating 4", "4 stars"]),
      dataAnswer("data-exam-i3", "Travel times are 12, 14, 15, 15, 18 and 34 minutes. Find the range.", "34-12", "22", ["22 min", "22 minutes"]),
      financeChoice("data-exam-i4", "The value 34 in the travel-time data is likely to:", "C", ["Lower the mean", "Not affect any statistic", "Pull the mean upward", "Turn the data categorical"], "A high outlier increases the mean."),
      financeChoice("data-exam-i5", "A careful conclusion from a survey should:", "D", ["Ignore the data", "Claim it proves all people agree", "Use only the highest value", "Match the data and avoid overclaiming"], "Data conclusions should be cautious."),
    ],
    commonMistakes: [
      { mistake: "Calculating a statistic from the wrong data values.", fix: "Copy the relevant values from the table or graph first." },
      { mistake: "Using total when mean is requested.", fix: "Divide the total by the number of values." },
      { mistake: "Ignoring an outlier when choosing mean or median.", fix: "Check whether the median is more appropriate." },
      { mistake: "Overstating a conclusion.", fix: "Use cautious language that matches the data." },
    ],
    masteryQuiz: [
      dataAnswer("data-exam-m1", "A cafe sells 42, 38, 45, 51 and 44 coffees from Monday to Friday. Find the mean.", "\\frac{220}{5}", "44", ["44.0", "44 coffees"]),
      dataAnswer("data-exam-m2", "Study hours are 1, 2, 2, 3, 4, 5, 6. Find the median.", "\\text{middle value}=3", "3", ["3 hours", "3 h"]),
      dataAnswer("data-exam-m3", "Daily temperatures are 18, 21, 22, 23, 25. Find the range.", "25-18", "7", ["7 degrees", "7°C", "7 C"]),
      financeChoice("data-exam-m4", "A frequency table shows 12 students chose bus, 7 chose train and 5 chose walk. Which category is most common?", "A", ["Bus", "Train", "Walk", "No category"], "Bus has the greatest frequency."),
      dataAnswer("data-exam-m5", "Delivery times are 18, 20, 21, 22, 23, 24 and 47 minutes. Identify the outlier.", "\\text{far value}=47", "47", ["47 min", "47 minutes"]),
      financeChoice("data-exam-m6", "With the delivery-time outlier present, the better typical measure is:", "C", ["Range", "Maximum", "Median", "Total"], "Median is less affected by the outlier."),
      dataAnswer("data-exam-m7", "A survey has 18 yes responses out of 30 students. What percentage said yes?", "\\frac{18}{30}\\times 100", "60%", ["60", "60 percent", "60percent"]),
      financeChoice("data-exam-m8", "A column graph is read by:", "B", ["Choosing the smallest label only", "Matching each category to its column height", "Ignoring frequencies", "Using time zones"], "Column height gives the value or frequency."),
      dataAnswer("data-exam-m9", "Sport scores are 9, 12, 12, 15 and 17. Find the mode.", "\\text{most common}=12", "12", ["12 points"]),
      financeChoice("data-exam-m10", "A practical conclusion should be based on:", "D", ["A guess", "Only the largest number", "No context", "The data and its limitations"], "Conclusions should reflect the data carefully."),
    ],
  };
}

export function buildLesson(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed,
  index: number
): ExplicitLesson {
  const topic = lesson.title;
  const prefix = slugPrefix(lesson.slug);
  const override =
    networkLessonOverride(course, unit, lesson) ??
    earningMoneyLessonOverride(course, unit, lesson) ??
    managingMoneyLessonOverride(course, unit, lesson) ??
    measurementLessonOverride(course, unit, lesson) ??
    timeLocationLessonOverride(course, unit, lesson) ??
    dataAnalysisLessonOverride(course, unit, lesson);

  return {
    id: lesson.slug,
    slug: lesson.slug,
    moduleSlug: unit.slug,
    moduleTitle: unit.title,
    courseTitle: course.title,
    title: lesson.title,
    description:
      lesson.description ??
      `Learn and practise ${lesson.title.toLowerCase()} in ${course.title}.`,
    syllabusArea: unit.syllabusArea,
    focus: unit.focus,
    status: "active",
    video: {
      title: `${lesson.title} video placeholder`,
      url: "/videos/placeholder-lesson.mp4",
    },
    learningIntention: `Understand the core ideas in ${lesson.title.toLowerCase()} and apply them to short exam-style questions.`,
    successCriteria: [
      `Identify when a question is testing ${lesson.title.toLowerCase()}.`,
      "Choose the relevant method or formula.",
      "Complete short calculations accurately.",
      "Give a clear answer using the context of the question.",
    ],
    teaching: {
      paragraphs: [
        `${lesson.title} is part of ${unit.title}. The aim is to recognise the structure of the question before doing any calculation.`,
        "A strong response starts by identifying the variable, feature, formula, graph, table, or context being used.",
        "For exam practice, keep answers concise and markable. Use labelled choices for interpretation and short typed answers for calculations.",
      ],
      latexBlocks: [
        "\\text{Identify the topic} \\rightarrow \\text{choose a method} \\rightarrow \\text{calculate} \\rightarrow \\text{interpret}",
        "\\text{Check units, restrictions, and context before finalising the answer.}",
      ],
    },
    workedExamples: workedExamples(lesson.title),
    guidedPractice: [
      choiceQuestion(`${prefix}-g1`, topic, "method"),
      typedQuestion(`${prefix}-g2`, topic, 1),
      choiceQuestion(`${prefix}-g3`, topic, "interpretation"),
      typedQuestion(`${prefix}-g4`, topic, 2),
    ],
    independentPractice: [
      typedQuestion(`${prefix}-i1`, topic, 3),
      choiceQuestion(`${prefix}-i2`, topic, "classification"),
      typedQuestion(`${prefix}-i3`, topic, 4),
      choiceQuestion(`${prefix}-i4`, topic, "method"),
      typedQuestion(`${prefix}-i5`, topic, 5),
    ],
    commonMistakes: commonMistakes(topic),
    masteryQuiz: [
      choiceQuestion(`${prefix}-m1`, topic, "method"),
      choiceQuestion(`${prefix}-m2`, topic, "classification"),
      typedQuestion(`${prefix}-m3`, topic, 1),
      typedQuestion(`${prefix}-m4`, topic, 2),
      choiceQuestion(`${prefix}-m5`, topic, "interpretation"),
      typedQuestion(`${prefix}-m6`, topic, 3),
      choiceQuestion(`${prefix}-m7`, topic, "method"),
      typedQuestion(`${prefix}-m8`, topic, 4),
      choiceQuestion(`${prefix}-m9`, topic, "interpretation"),
      typedQuestion(`${prefix}-m10`, topic, 5),
    ],
    masteryPassMark: 0.8,
    ...override,
  };
}

export const year11AdvancedSequencesSeriesArchive: CourseUnitSeed = {
  slug: "sequences-series",
  title: "Sequences and Series",
  description:
    "Arithmetic and geometric sequences, series, and exam-style pattern questions.",
  syllabusArea: "Sequences and series",
  focus: "Sequences and series",
  lessons: [
    { slug: "arithmetic-sequences", title: "Arithmetic Sequences" },
    { slug: "geometric-sequences", title: "Geometric Sequences" },
    { slug: "arithmetic-series", title: "Arithmetic Series" },
    { slug: "geometric-series", title: "Geometric Series" },
    { slug: "sequences-series-exam-practice", title: "Sequences and Series Exam Practice" },
  ],
};

// TODO: Recheck whether Sequences and Series should return to the public
// Year 11 Advanced pathway if future syllabus mapping or school demand requires it.

export const newCoursePathways: CoursePathwaySeed[] = [
  {
    slug: "year-12-standard-2",
    title: "Year 12 Mathematics Standard 2",
    yearLevel: "Year 12",
    courseType: "Mathematics Standard 2",
    description:
      "Practical HSC Mathematics Standard 2 revision with lessons, guided practice, and mastery checks.",
    positioning:
      "Practical HSC Mathematics Standard 2 revision with lessons, guided practice, and mastery checks.",
    units: [
      {
        slug: "algebraic-relationships",
        title: "Algebraic Relationships",
        description:
          "Linear and non-linear models, simultaneous equations, and exam-style algebra in context.",
        syllabusArea: "Algebra",
        focus: "Algebraic relationships",
        lessons: [
          { slug: "linear-relationships-modelling", title: "Linear Relationships and Modelling" },
          { slug: "non-linear-relationships-graphs", title: "Non-Linear Relationships and Graphs" },
          { slug: "simultaneous-equations-context", title: "Simultaneous Equations in Context" },
          { slug: "algebraic-relationships-exam-practice", title: "Algebraic Relationships Exam Practice" },
        ],
      },
      {
        slug: "trigonometry-ratios-rates",
        title: "Trigonometry, Ratios and Rates",
        description:
          "Non-right-angled trigonometry, triangle formulae, ratios, rates, and practical conversions.",
        syllabusArea: "Measurement",
        focus: "Trigonometry, ratios and rates",
        lessons: [
          { slug: "non-right-angled-trigonometry", title: "Non-Right-Angled Trigonometry" },
          { slug: "sine-rule-cosine-rule-area-triangle", title: "Sine Rule, Cosine Rule and Area of a Triangle" },
          { slug: "ratios-rates-unit-conversions", title: "Ratios, Rates and Unit Conversions" },
          { slug: "practical-rates-ratios-exam-practice", title: "Practical Rates and Ratios Exam Practice" },
        ],
      },
      {
        slug: "investments-loans-annuities",
        title: "Investments, Loans and Annuities",
        description:
          "Compound interest, depreciation, loan balances, annuities, and financial decisions.",
        syllabusArea: "Financial mathematics",
        focus: "Investments, loans and annuities",
        lessons: [
          { slug: "investment-compound-interest", title: "Investment and Compound Interest" },
          { slug: "depreciation-loans", title: "Depreciation and Loans" },
          { slug: "annuities-regular-payments", title: "Annuities and Regular Payments" },
          { slug: "financial-decision-making-exam-practice", title: "Financial Decision Making Exam Practice" },
        ],
      },
      {
        slug: "bivariate-data-normal-distribution",
        title: "Bivariate Data and Normal Distribution",
        description:
          "Scatterplots, correlation, regression, z-scores, normal distribution, and statistics practice.",
        syllabusArea: "Statistics",
        focus: "Bivariate data and normal distribution",
        lessons: [
          { slug: "bivariate-data-scatterplots", title: "Bivariate Data and Scatterplots" },
          { slug: "correlation-regression", title: "Correlation and Regression" },
          { slug: "normal-distribution-z-scores", title: "Normal Distribution and Z-Scores" },
          { slug: "statistical-analysis-exam-practice", title: "Statistical Analysis Exam Practice" },
        ],
      },
      {
        slug: "networks-critical-path-analysis",
        title: "Networks and Critical Path Analysis",
        description:
          "Network terminology, shortest paths, minimum spanning trees, and critical path analysis.",
        syllabusArea: "Networks",
        focus: "Networks and critical path analysis",
        lessons: [
          { slug: "network-concepts-terminology", title: "Network Concepts and Terminology" },
          { slug: "shortest-paths-minimum-spanning-trees", title: "Shortest Paths and Minimum Spanning Trees" },
          { slug: "critical-path-analysis", title: "Critical Path Analysis" },
          { slug: "networks-exam-practice", title: "Networks Exam Practice" },
        ],
      },
    ],
  },
  {
    slug: "year-11-advanced",
    title: "Year 11 Mathematics Advanced",
    yearLevel: "Year 11",
    courseType: "Mathematics Advanced",
    description:
      "Year 11 Mathematics Advanced foundations for senior assessment and future HSC Advanced study.",
    positioning:
      "Year 11 Mathematics Advanced foundations for students preparing for senior assessment and future HSC Advanced study.",
    units: [
      {
        slug: "working-with-functions",
        title: "Working with Functions",
        description:
          "Function notation, domain, range, linear, quadratic, cubic, polynomial, and reciprocal functions.",
        syllabusArea: "Functions",
        focus: "Working with functions",
        lessons: [
          { slug: "function-notation-domain-range", title: "Function Notation, Domain and Range" },
          { slug: "linear-quadratic-cubic-functions", title: "Linear, Quadratic and Cubic Functions" },
          { slug: "polynomial-reciprocal-functions", title: "Polynomial and Reciprocal Functions" },
          { slug: "working-with-functions-exam-practice", title: "Working with Functions Exam Practice" },
        ],
      },
      {
        slug: "graph-transformations",
        title: "Graph Transformations",
        description:
          "Transformations, composite functions, polynomial and reciprocal graph transformations, and exam-style graphing questions.",
        syllabusArea: "Functions",
        focus: "Graph transformations",
        lessons: [
          { slug: "transformations-composite-functions", title: "Transformations and Composite Functions" },
          { slug: "transformations-polynomial-reciprocal-graphs", title: "Transformations of Polynomial and Reciprocal Graphs" },
          { slug: "graph-transformations-exam-practice", title: "Graph Transformations Exam Practice" },
        ],
      },
      {
        slug: "trigonometry-measure-angles",
        title: "Trigonometry and Measure of Angles",
        description:
          "Radians, exact trigonometric values, the unit circle, trigonometric graphs, and angle-measure practice.",
        syllabusArea: "Trigonometric functions",
        focus: "Trigonometry and measure of angles",
        lessons: [
          { slug: "radians-exact-trigonometric-values", title: "Radians and Exact Trigonometric Values" },
          { slug: "unit-circle-trigonometric-graphs", title: "Unit Circle and Trigonometric Graphs" },
          { slug: "trigonometry-measure-angles-exam-practice", title: "Trigonometry and Measure of Angles Exam Practice" },
        ],
      },
      {
        slug: "trigonometric-identities-equations",
        title: "Trigonometric Identities and Equations",
        description:
          "Trigonometric equations, identities, simplification, and exam-style trigonometry practice.",
        syllabusArea: "Trigonometric functions",
        focus: "Trigonometric identities and equations",
        lessons: [
          { slug: "trigonometric-equations", title: "Trigonometric Equations" },
          { slug: "trigonometric-identities", title: "Trigonometric Identities" },
          { slug: "trigonometric-identities-equations-exam-practice", title: "Trigonometric Identities and Equations Exam Practice" },
        ],
      },
      {
        slug: "exponential-logarithmic-functions",
        title: "Exponential and Logarithmic Functions",
        description:
          "Index laws, logarithms, equations, modelling, and mixed exponential/logarithmic practice.",
        syllabusArea: "Exponential and logarithmic functions",
        focus: "Exponential and logarithmic functions",
        lessons: [
          { slug: "index-laws-exponential-functions", title: "Index Laws and Exponential Functions" },
          { slug: "logarithms-logarithm-laws", title: "Logarithms and Logarithm Laws" },
          { slug: "solving-exponential-logarithmic-equations", title: "Solving Exponential and Logarithmic Equations" },
          { slug: "exponential-logarithmic-modelling", title: "Exponential and Logarithmic Modelling" },
          { slug: "exponential-logarithmic-functions-exam-practice", title: "Exponential and Logarithmic Functions Exam Practice" },
        ],
      },
      {
        slug: "introduction-differentiation",
        title: "Introduction to Differentiation",
        description:
          "Rates of change, first principles, polynomial derivatives, tangents, normals, and applications.",
        syllabusArea: "Calculus",
        focus: "Introduction to differentiation",
        lessons: [
          { slug: "rates-of-change-gradients", title: "Rates of Change and Gradients" },
          { slug: "derivatives-first-principles", title: "Derivatives from First Principles" },
          { slug: "differentiating-polynomial-functions", title: "Differentiating Polynomial Functions" },
          { slug: "tangents-normals-applications", title: "Tangents, Normals and Applications" },
          { slug: "introduction-differentiation-exam-practice", title: "Introduction to Differentiation Exam Practice" },
        ],
      },
      {
        slug: "probability-data",
        title: "Probability and Data",
        description:
          "Data displays, probability, relative frequency, random variables, expected value, and spread.",
        syllabusArea: "Statistical analysis",
        focus: "Probability and data",
        lessons: [
          { slug: "data-displays-summary-statistics", title: "Data Displays and Summary Statistics" },
          { slug: "probability-relative-frequency", title: "Probability and Relative Frequency" },
          { slug: "discrete-random-variables", title: "Discrete Random Variables" },
          { slug: "expected-value-standard-deviation", title: "Expected Value and Standard Deviation" },
          { slug: "probability-data-exam-practice", title: "Probability and Data Exam Practice" },
        ],
      },
    ],
  },
  {
    slug: "year-11-standard",
    title: "Year 11 Mathematics Standard",
    yearLevel: "Year 11",
    courseType: "Mathematics Standard",
    description:
      "Practical Year 11 Mathematics Standard support for students building skills for Standard 1 or Standard 2.",
    positioning:
      "Practical Year 11 Mathematics Standard support for students building skills for Standard 1 or Standard 2.",
    units: [
      {
        slug: "formulas-equations",
        title: "Formulas and Equations",
        description:
          "Substitution, formulae, equations, changing the subject, and exam-style formula work.",
        syllabusArea: "Algebra",
        focus: "Formulas and equations",
        lessons: [
          { slug: "substitution-formulae-equations", title: "Substitution, Formulae and Equations" },
          { slug: "changing-subject-formula", title: "Changing the Subject of a Formula" },
          { slug: "formulae-equations-exam-practice", title: "Formulae and Equations Exam Practice" },
        ],
      },
      {
        slug: "linear-relationships",
        title: "Linear Relationships",
        description:
          "Linear graphs, direct variation, practical linear models, and exam-style relationship questions.",
        syllabusArea: "Algebra",
        focus: "Linear relationships",
        lessons: [
          { slug: "linear-relationships-graphs", title: "Linear Relationships and Graphs" },
          { slug: "direct-variation-practical-linear-models", title: "Direct Variation and Practical Linear Models" },
          { slug: "linear-relationships-exam-practice", title: "Linear Relationships Exam Practice" },
        ],
      },
      {
        slug: "earning-money",
        title: "Earning Money",
        description:
          "Wages, salaries, payslips, overtime, penalty rates, allowances, commission, piecework, tax, deductions, and net pay.",
        syllabusArea: "Financial Mathematics",
        focus: "Earning money",
        lessons: [
          {
            slug: "wages-salaries-payslips",
            title: "Wages, Salaries and Payslips",
            description:
              "Calculate wages and salary amounts, and read simple payslip information.",
          },
          {
            slug: "overtime-penalty-rates-allowances",
            title: "Overtime, Penalty Rates and Allowances",
            description:
              "Apply overtime, penalty rates and allowances to realistic work rosters.",
          },
          {
            slug: "commission-piecework",
            title: "Commission and Piecework",
            description:
              "Use commission and piecework rates to compare earning structures.",
          },
          {
            slug: "tax-deductions-net-pay",
            title: "Tax, Deductions and Net Pay",
            description:
              "Calculate net pay from tax withheld and deductions.",
          },
          {
            slug: "earning-money-exam-practice",
            title: "Earning Money Exam Practice",
            description:
              "Practise mixed earning-money exam questions using rosters and payslips.",
          },
        ],
      },
      {
        slug: "managing-money",
        title: "Managing Money",
        description:
          "Budgets, cash flow, savings goals, simple interest, fees, discounts, and practical financial decisions.",
        syllabusArea: "Financial Mathematics",
        focus: "Managing money",
        lessons: [
          {
            slug: "budgets-cash-flow",
            title: "Budgets and Cash Flow",
            description:
              "Use income, fixed expenses, variable expenses and savings to calculate surplus, deficit and cash flow.",
          },
          {
            slug: "saving-spending-financial-goals",
            title: "Saving, Spending and Financial Goals",
            description:
              "Plan savings goals, regular deposits, affordability checks and spending decisions.",
          },
          {
            slug: "simple-interest",
            title: "Simple Interest",
            description:
              "Calculate simple interest, total amounts and compare simple-interest options using principal, rate and time.",
          },
          {
            slug: "comparing-financial-decisions",
            title: "Comparing Financial Decisions",
            description:
              "Compare financial choices using total cost, discounts, fees, charges and reasonableness.",
          },
          {
            slug: "managing-money-exam-practice",
            title: "Managing Money Exam Practice",
            description:
              "Practise mixed managing-money exam questions using budgets, savings goals, simple interest, fees and financial comparisons.",
          },
        ],
      },
      {
        slug: "applications-measurement",
        title: "Applications of Measurement",
        description:
          "Units, accuracy, measurement error, area, surface area, volume, capacity, energy, mass and practical measurement applications.",
        syllabusArea: "Measurement",
        focus: "Applications of measurement",
        lessons: [
          {
            slug: "units-accuracy-measurement-error",
            title: "Units, Accuracy and Measurement Error",
            description:
              "Convert practical measurements, choose units, and use accuracy, absolute error and percentage error.",
          },
          {
            slug: "area-surface-area-volume",
            title: "Area, Surface Area and Volume",
            description:
              "Use perimeter, area, surface area, volume and capacity for rooms, materials, containers and tanks.",
          },
          {
            slug: "energy-mass-practical-measurement",
            title: "Energy, Mass and Practical Measurement",
            description:
              "Use mass, food energy labels, kilojoules, electricity use in kWh, and practical reasonableness checks.",
          },
          {
            slug: "applications-measurement-exam-practice",
            title: "Applications of Measurement Exam Practice",
            description:
              "Practise mixed measurement questions involving units, accuracy, error, area, volume, capacity, energy, mass and electricity use.",
          },
        ],
      },
      {
        slug: "time-location",
        title: "Time and Location",
        description:
          "Timetables, elapsed time, UTC offsets, Australian and international time zones, and date changes in travel contexts.",
        syllabusArea: "Measurement",
        focus: "Time and location",
        lessons: [
          {
            slug: "time-calculations-timetables",
            title: "Time Calculations and Timetables",
            description:
              "Read timetables, convert time formats, and calculate elapsed, waiting and travel times.",
          },
          {
            slug: "time-zones-utc-international-date-line",
            title: "Time Zones, UTC and the International Date Line",
            description:
              "Use UTC offsets, Australian and international time zones, daylight saving and date changes.",
          },
          {
            slug: "time-location-exam-practice",
            title: "Time and Location Exam Practice",
            description:
              "Practise mixed time questions using timetables, elapsed time, UTC offsets, time zones and date changes.",
          },
        ],
      },
      {
        slug: "networks-paths-trees",
        title: "Networks, Paths and Trees",
        description:
          "Network diagrams, paths, trails, circuits, connectivity, trees, and minimum spanning trees.",
        syllabusArea: "Networks",
        focus: "Networks, paths and trees",
        lessons: [
          {
            slug: "network-diagrams-terminology",
            title: "Network Diagrams and Terminology",
            description:
              "Identify vertices, edges, degree, directed networks and weighted edges, then construct networks from tables or maps.",
          },
          {
            slug: "paths-trails-circuits-connectivity",
            title: "Paths, Trails, Circuits and Connectivity",
            description:
              "Classify paths, trails and circuits, check connectivity, and solve shortest path problems in small networks.",
          },
          {
            slug: "trees-minimum-spanning-trees",
            title: "Trees and Minimum Spanning Trees",
            description:
              "Use trees, spanning trees and minimum spanning trees to solve minimal connector problems.",
          },
          {
            slug: "network-applications-exam-practice",
            title: "Network Applications Exam Practice",
            description:
              "Practise mixed network applications involving construction, directed and weighted networks, shortest paths and MST decisions.",
          },
        ],
      },
      {
        slug: "data-analysis",
        title: "Data Analysis",
        description:
          "Data displays, frequency tables, summary statistics, outliers, graph interpretation and cautious data conclusions.",
        syllabusArea: "Statistical Analysis",
        focus: "Data analysis",
        lessons: [
          {
            slug: "data-displays-summary-statistics",
            title: "Data Displays and Summary Statistics",
            description:
              "Read data displays and calculate mean, median, mode and range in practical contexts.",
          },
          {
            slug: "interpreting-data-outliers",
            title: "Interpreting Data and Outliers",
            description:
              "Interpret practical data, identify outliers, and choose cautious conclusions using mean or median.",
          },
          {
            slug: "data-analysis-exam-practice",
            title: "Data Analysis Exam Practice",
            description:
              "Practise mixed data questions using tables, summary statistics, graph interpretation, outliers and cautious conclusions.",
          },
        ],
      },
    ],
  },
];

export function getNewCourse(courseSlug: string) {
  return newCoursePathways.find((course) => course.slug === courseSlug);
}

export function getNewCourseUnit(courseSlug: string, unitSlug: string) {
  return getNewCourse(courseSlug)?.units.find((unit) => unit.slug === unitSlug);
}

export function getNewCourseLesson(
  courseSlug: string,
  unitSlug: string,
  lessonSlug: string
) {
  const course = getNewCourse(courseSlug);
  const unit = course?.units.find((nextUnit) => nextUnit.slug === unitSlug);
  const lesson = unit?.lessons.find(
    (nextLesson) => nextLesson.slug === lessonSlug
  );

  if (!course || !unit || !lesson) {
    return null;
  }

  const index = unit.lessons.findIndex(
    (nextLesson) => nextLesson.slug === lessonSlug
  );

  return buildLesson(course, unit, lesson, index);
}

export function getNewCourseUnitLessons(courseSlug: string, unitSlug: string) {
  const course = getNewCourse(courseSlug);
  const unit = course?.units.find((nextUnit) => nextUnit.slug === unitSlug);

  if (!course || !unit) {
    return [];
  }

  return unit.lessons.map((lesson, index) =>
    buildLesson(course, unit, lesson, index)
  );
}

export function getNewCourseUnitOutline(
  courseSlug: string,
  unitSlug: string
): LessonOutlineItem[] {
  const unit = getNewCourseUnit(courseSlug, unitSlug);

  return (
    unit?.lessons.map((lesson) => ({
      id: lesson.slug,
      slug: lesson.slug,
      title: lesson.title,
      description:
        lesson.description ??
        `Practise ${lesson.title.toLowerCase()} with concise examples and mastery checks.`,
      status: "active" as const,
    })) ?? []
  );
}

export function newCourseLessonCount(course: CoursePathwaySeed) {
  return course.units.reduce((total, unit) => total + unit.lessons.length, 0);
}
