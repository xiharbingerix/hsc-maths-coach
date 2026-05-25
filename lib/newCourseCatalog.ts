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

function practicalChoice(
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
    hint: "Match the method to the practical context.",
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

function linearAnswer(
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
    hint: "Use the linear relationship in the context.",
    explanation: `The answer is ${answer}.`,
  };
}

function formulaAnswer(
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
    hint: "Substitute carefully, use inverse operations, and keep units in mind.",
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

function linearRelationshipsWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "linear-relationships-graphs") {
    return [
      {
        title: "Interpreting a fare model",
        questionLatex:
          "\\text{A taxi fare is modelled by }C=4+2.20d\\text{, where }d\\text{ is distance in km.}",
        steps: [
          { explanation: "The constant term is the starting amount when distance is 0.", latex: "C=4\\text{ when }d=0" },
          { explanation: "The coefficient of d is the rate per kilometre.", latex: "2.20\\text{ dollars per km}" },
        ],
        finalAnswerLatex: "\\$4\\text{ fixed fee, }\\$2.20\\text{/km}",
      },
      {
        title: "Completing a table from a hire rule",
        questionLatex:
          "\\text{A hire company charges }C=35+12h\\text{ for }h\\text{ hours.}",
        steps: [
          { explanation: "Substitute h = 0, 1, 2 and 3.", latex: "35,\\ 47,\\ 59,\\ 71" },
          { explanation: "The cost increases by 12 dollars each hour, so the relationship is linear." },
        ],
        finalAnswerLatex: "\\begin{array}{c|c}h&0&1&2&3\\\\C&35&47&59&71\\end{array}",
      },
      {
        title: "Choosing a graph description",
        questionLatex:
          "\\text{A tank starts at }120\\text{ L and drains at }8\\text{ L/min.}",
        steps: [
          { explanation: "The starting amount is the vertical intercept." },
          { explanation: "Draining means the graph decreases with a negative gradient.", latex: "V=120-8t" },
        ],
        finalAnswerLatex: "\\text{Starts at }120\\text{ L and decreases by }8\\text{ L/min.}",
      },
    ];
  }

  if (slug === "direct-variation-practical-linear-models") {
    return [
      {
        title: "Cost per litre as direct variation",
        questionLatex:
          "\\text{Fuel costs }\\$1.80\\text{ per litre. Let }C\\text{ be cost and }L\\text{ be litres.}",
        steps: [
          { explanation: "There is no fixed fee, so cost is proportional to litres." },
          { explanation: "The constant of variation is the unit cost.", latex: "C=1.80L" },
        ],
        finalAnswerLatex: "C=1.80L",
      },
      {
        title: "Currency conversion",
        questionLatex:
          "\\text{A conversion gives }1\\text{ AUD}=0.65\\text{ USD.}",
        steps: [
          { explanation: "USD is directly proportional to AUD in this simplified model." },
          { explanation: "Multiply the number of Australian dollars by 0.65.", latex: "U=0.65A" },
        ],
        finalAnswerLatex: "U=0.65A",
      },
      {
        title: "Direct variation or fixed cost",
        questionLatex:
          "\\text{A scooter hire costs }\\$10\\text{ unlock fee plus }\\$4\\text{ per hour.}",
        steps: [
          { explanation: "A direct variation graph goes through the origin." },
          { explanation: "The 10 dollar fixed fee means the cost is not zero at 0 hours.", latex: "C=10+4h" },
        ],
        finalAnswerLatex: "\\text{Not direct variation.}",
      },
    ];
  }

  return [
    {
      title: `${title}: table to rule`,
      questionLatex:
        "\\begin{array}{c|c}\\text{Hours}&0&1&2&3\\\\\\text{Cost}&35&47&59&71\\end{array}",
      steps: [
        { explanation: "The starting value is 35 dollars at 0 hours." },
        { explanation: "The cost increases by 12 dollars for each extra hour." },
      ],
      finalAnswerLatex: "C=35+12h",
    },
    {
      title: `${title}: graph feature in context`,
      questionLatex:
        "\\text{A water tank has }V=120-8t\\text{ litres after }t\\text{ minutes.}",
      steps: [
        { explanation: "The intercept 120 is the starting volume." },
        { explanation: "The gradient -8 is the draining rate in litres per minute." },
      ],
      finalAnswerLatex: "\\text{Starts at }120\\text{ L and drains at }8\\text{ L/min.}",
    },
  ];
}

function linearRelationshipsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-11-standard" ||
    unit.slug !== "linear-relationships"
  ) {
    return null;
  }

  const base = {
    workedExamples: linearRelationshipsWorkedExamples(lesson.slug, lesson.title),
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "linear-relationships-graphs") {
    return {
      ...base,
      description:
        "Interpret straight-line rules, tables and graphs using gradients, rates and starting values.",
      learningIntention:
        "Use linear rules, tables and graph features to model practical situations.",
      successCriteria: [
        "Identify the gradient as a practical rate of change.",
        "Identify the y-intercept as a starting value or fixed amount.",
        "Complete a table from a linear rule.",
        "Match graph features to practical contexts.",
      ],
      teaching: {
        paragraphs: [
          "A linear relationship has a constant rate of change. Its graph is a straight line.",
          "In a rule such as y = mx + b, m is the gradient and b is the y-intercept.",
          "In practical contexts, the gradient is often a rate such as dollars per hour or litres per minute.",
          "The y-intercept is the starting value when the input is 0, such as a fixed fee or initial amount.",
        ],
        latexBlocks: [
          "y=mx+b",
          "\\text{gradient}=\\frac{\\text{change in output}}{\\text{change in input}}",
        ],
      },
      guidedPractice: [
        financeChoice("linear-graph-g1", "A taxi fare is modelled by C = 4 + 2.20d. What does the 4 represent?", "B", ["Cost per kilometre", "Fixed starting fare", "Total distance", "Maximum fare"], "The constant term is the cost when d = 0."),
        moneyAnswer("linear-graph-g2", "A hire company charges C = 35 + 12h. What is the cost for 3 hours?", "35+12\\times 3", "71"),
        linearAnswer("linear-graph-g3", "A table shows hire costs: 0 h costs 35 dollars, 1 h costs 47 dollars, 2 h costs 59 dollars. What is the hourly rate?", "47-35", "12", ["$12", "12 dollars", "12 dollars per hour", "$12/h"]),
        financeChoice("linear-graph-g4", "A water tank model V = 120 - 8t has a graph that:", "C", ["Starts at 8 and increases", "Starts at 0 and increases", "Starts at 120 and decreases", "Has no starting value"], "The intercept is 120 and the gradient is negative."),
      ],
      independentPractice: [
        financeChoice("linear-graph-i1", "A phone plan is C = 20 + 5g, where g is gigabytes used. What does 5 represent?", "A", ["Cost per gigabyte", "Fixed monthly fee", "Total cost", "Number of months"], "The coefficient of g is the rate per gigabyte."),
        moneyAnswer("linear-graph-i2", "A bike hire costs 18 dollars plus 9 dollars per hour. What is the total cost for 4 hours?", "18+9\\times 4", "54"),
        linearAnswer("linear-graph-i3", "A savings balance is S = 60 + 25w. What is the starting balance?", "S=60\\text{ when }w=0", "60", ["$60", "60 dollars"]),
        linearAnswer("linear-graph-i4", "A tank starts at 200 L and drains at 10 L/min. Write a rule for volume V after t minutes.", "V=200-10t", "V = 200 - 10t", ["V=200-10t", "v=200-10t", "V=-10t+200", "v=-10t+200"]),
        financeChoice("linear-graph-i5", "A graph of cost against hours crosses the vertical axis at 35. In context, this is the:", "D", ["Hourly rate", "Travel time", "Gradient only", "Fixed starting cost"], "The vertical intercept is the starting cost."),
      ],
      commonMistakes: [
        { mistake: "Confusing gradient and intercept.", fix: "Gradient is the rate; intercept is the starting value." },
        { mistake: "Treating the fixed fee as the hourly rate.", fix: "The fixed fee is the value when the input is zero." },
        { mistake: "Forgetting units.", fix: "Attach units such as dollars per hour or litres per minute where needed." },
        { mistake: "Assuming every line increases.", fix: "Negative gradients represent decreasing quantities." },
      ],
      masteryQuiz: [
        financeChoice("linear-graph-m1", "A taxi model C = 5 + 2d has gradient 2. In context, this is:", "A", ["2 dollars per km", "5 dollars per km", "2 km fixed fee", "Total fare always"], "The gradient is the cost per kilometre."),
        financeChoice("linear-graph-m2", "In C = 5 + 2d, the y-intercept means:", "C", ["Distance travelled", "Cost per km", "Fixed starting fare", "Maximum fare"], "The intercept is the cost when d = 0."),
        moneyAnswer("linear-graph-m3", "A hire cost is C = 40 + 15h. Find the cost for 2 hours.", "40+15\\times 2", "70"),
        linearAnswer("linear-graph-m4", "A table has costs 35, 47, 59, 71 for 0, 1, 2, 3 hours. What is the gradient?", "47-35", "12", ["$12", "12 dollars per hour", "$12/h"]),
        linearAnswer("linear-graph-m5", "A water tank starts with 120 L and drains at 8 L/min. Write the rule for volume V after t minutes.", "V=120-8t", "V = 120 - 8t", ["V=120-8t", "v=120-8t", "V=-8t+120", "v=-8t+120"]),
        financeChoice("linear-graph-m6", "A decreasing straight-line graph in a tank context most likely represents:", "B", ["A tank filling", "A tank draining", "A fixed fee", "A bar chart"], "A decreasing volume suggests draining."),
        moneyAnswer("linear-graph-m7", "A phone plan costs 25 dollars plus 4 dollars per extra GB. Find the cost for 6 extra GB.", "25+4\\times 6", "49"),
        linearAnswer("linear-graph-m8", "A savings model is S = 100 + 30w. What is the weekly increase?", "30", "30", ["$30", "30 dollars", "30 dollars per week", "$30/week"]),
        financeChoice("linear-graph-m9", "A graph crossing the vertical axis at 0 means the starting value is:", "D", ["The gradient", "The maximum", "Unknown always", "Zero"], "The vertical intercept is the starting value."),
        financeChoice("linear-graph-m10", "A practical linear model should usually be used:", "A", ["Within the context and sensible input range", "For all possible values forever", "Only at negative times", "Without checking units"], "Practical models have context limits."),
      ],
    };
  }

  if (lesson.slug === "direct-variation-practical-linear-models") {
    return {
      ...base,
      description:
        "Use direct variation, constants of variation and practical linear models with and without fixed costs.",
      learningIntention:
        "Recognise direct variation and distinguish it from linear models with fixed costs.",
      successCriteria: [
        "Identify direct variation as y = kx.",
        "Find a constant of variation from a practical context.",
        "Use direct variation rules for cost, fuel or conversion contexts.",
        "Recognise when a fixed cost means the model is not direct variation.",
      ],
      teaching: {
        paragraphs: [
          "Direct variation means one quantity is a constant multiple of another.",
          "A direct variation graph passes through the origin because if the input is 0, the output is also 0.",
          "The constant of variation k is the multiplier in y = kx. It may represent a unit cost, conversion rate or rate per item.",
          "A linear model with a fixed cost, such as C = 10 + 4h, is not direct variation because the graph does not pass through the origin.",
        ],
        latexBlocks: [
          "y=kx",
          "\\text{direct variation graph passes through }(0,0)",
        ],
      },
      guidedPractice: [
        linearAnswer("linear-direct-g1", "Fuel costs 1.80 dollars per litre. Write a direct variation rule for cost C in dollars for L litres.", "C=1.80L", "C = 1.80L", ["C=1.80L", "c=1.80L", "C=1.8L", "c=1.8L"]),
        moneyAnswer("linear-direct-g2", "Using C = 1.80L, find the cost of 20 L of fuel.", "1.80\\times 20", "36"),
        financeChoice("linear-direct-g3", "Which model is direct variation?", "B", ["C = 10 + 4h", "C = 4h", "C = 4h + 10", "C = 10"], "Direct variation has the form y = kx and passes through the origin."),
        financeChoice("linear-direct-g4", "A scooter hire has a 10 dollar unlock fee plus 4 dollars per hour. This is not direct variation because:", "C", ["It has hours", "It is linear", "It has a fixed fee", "It has a rate"], "The fixed fee means the graph does not pass through the origin."),
      ],
      independentPractice: [
        linearAnswer("linear-direct-i1", "A currency conversion uses 1 AUD = 0.65 USD. Write a rule for U USD from A Australian dollars.", "U=0.65A", "U = 0.65A", ["U=0.65A", "u=0.65a", "U=.65A", "u=.65a"]),
        linearAnswer("linear-direct-i2", "A recipe uses 250 g of pasta per person. Write a rule for grams G for p people.", "G=250p", "G = 250p", ["G=250p", "g=250p"]),
        financeChoice("linear-direct-i3", "A plan C = 20 + 5g is:", "D", ["Direct variation", "A graph through the origin", "A model with no fixed cost", "Linear but not direct variation"], "The fixed 20 means it is not direct variation."),
        moneyAnswer("linear-direct-i4", "A stall sells apples at 3 dollars per kg. What is the cost of 4 kg?", "3\\times 4", "12"),
        financeChoice("linear-direct-i5", "For direct variation y = kx, the value k is the:", "A", ["Constant of variation", "Fixed fee", "x-intercept always", "Maximum value"], "k is the constant multiplier."),
      ],
      commonMistakes: [
        { mistake: "Assuming every linear model is direct variation.", fix: "Direct variation must pass through the origin." },
        { mistake: "Confusing the fixed fee with the constant of variation.", fix: "A fixed fee means the model is not y = kx." },
        { mistake: "Forgetting units for k.", fix: "k often has units such as dollars per litre." },
        { mistake: "Using a direct variation model outside its context.", fix: "Check whether the practical rule is sensible for the input." },
      ],
      masteryQuiz: [
        financeChoice("linear-direct-m1", "A graph of direct variation must pass through:", "A", ["The origin", "The point (0, 5)", "The highest point", "The x-axis at 10 only"], "Direct variation has y = 0 when x = 0."),
        linearAnswer("linear-direct-m2", "Printing costs 12 cents per page. Write a direct variation rule for cost C in cents for p pages.", "C=12p", "C = 12p", ["C=12p", "c=12p"]),
        moneyAnswer("linear-direct-m3", "A drink costs 2.50 dollars per bottle. What is the cost of 8 bottles?", "2.50\\times 8", "20"),
        financeChoice("linear-direct-m4", "Which relationship is not direct variation?", "C", ["C = 3n", "D = 80t", "C = 15 + 2n", "M = 100b"], "C = 15 + 2n has a fixed cost."),
        linearAnswer("linear-direct-m5", "A conversion uses 1 km = 0.621 miles. Write a rule for miles M from kilometres k.", "M=0.621k", "M = 0.621k", ["M=0.621k", "m=0.621k"]),
        financeChoice("linear-direct-m6", "A taxi fare with a flagfall fee is usually:", "D", ["Direct variation", "A graph through the origin", "No fixed cost", "Linear with an intercept"], "A flagfall is a fixed starting cost."),
        moneyAnswer("linear-direct-m7", "A car uses fuel at 9 L per 100 km. In a simplified direct model, how many litres for 300 km?", "9\\times 3", "27"),
        linearAnswer("linear-direct-m8", "If y varies directly with x and y = 24 when x = 6, find k.", "k=24\\div 6", "4", ["k=4"]),
        financeChoice("linear-direct-m9", "The model S = 50w for savings after w weeks means:", "B", ["50 dollars fixed fee", "50 dollars saved each week", "50 weeks", "50 dollars subtracted"], "The multiplier is the weekly saving rate."),
        financeChoice("linear-direct-m10", "A limitation of a fuel cost model is that:", "A", ["Prices can change over time", "Costs can never be estimated", "Litres are not measurable", "Direct variation has no context"], "Fuel prices may change, so the model may stop being accurate."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed linear relationship questions using tables, rules, graph features, direct variation and practical limitations.",
    learningIntention:
      "Apply linear relationship skills to practical exam-style contexts.",
    successCriteria: [
      "Find a linear rule from a practical table.",
      "Interpret gradient and y-intercept in context.",
      "Recognise direct variation and fixed-cost models.",
      "Choose reasonable conclusions about practical linear models.",
    ],
    teaching: {
      paragraphs: [
        "Exam-style linear relationship questions often use tables, rules, graphs and practical contexts.",
        "Look for the starting value and the constant change. These become the intercept and gradient in a linear rule.",
        "A direct variation model has no fixed starting amount and passes through the origin.",
        "Practical models have limitations. Do not assume the rule works forever or outside the context given.",
      ],
      latexBlocks: [
        "y=mx+b",
        "y=kx\\quad\\text{for direct variation}",
      ],
    },
    guidedPractice: [
      linearAnswer("linear-exam-g1", "A hire table shows 0 hours costs 35 dollars, 1 hour costs 47 dollars, and 2 hours costs 59 dollars. What is the hourly increase?", "47-35", "12", ["$12", "12 dollars", "$12/h", "12 dollars per hour"]),
      linearAnswer("linear-exam-g2", "Using the hire table with starting cost 35 dollars and hourly increase 12 dollars, write a rule for cost C after h hours.", "C=35+12h", "C = 35 + 12h", ["C=35+12h", "c=35+12h", "C=12h+35", "c=12h+35"]),
      financeChoice("linear-exam-g3", "In C = 35 + 12h, the 35 represents:", "A", ["Fixed starting cost", "Hourly rate", "Number of hours", "Maximum cost"], "The intercept is the fixed cost."),
      financeChoice("linear-exam-g4", "A cost model C = 5n is direct variation because:", "B", ["It has a fixed fee", "It passes through the origin", "It has no rate", "It is not linear"], "C = 5n has no fixed starting amount."),
    ],
    independentPractice: [
      moneyAnswer("linear-exam-i1", "A taxi charges 6 dollars plus 2 dollars per kilometre. What is the fare for 9 km?", "6+2\\times 9", "24"),
      linearAnswer("linear-exam-i2", "A water tank starts at 150 L and drains at 5 L/min. Write a rule for volume V after t minutes.", "V=150-5t", "V = 150 - 5t", ["V=150-5t", "v=150-5t", "V=-5t+150", "v=-5t+150"]),
      financeChoice("linear-exam-i3", "In V = 150 - 5t, the gradient -5 means:", "C", ["The tank starts with 5 L", "The tank fills by 150 L/min", "The tank drains by 5 L/min", "The cost is 5 dollars"], "A negative gradient means volume decreases by 5 L each minute."),
      financeChoice("linear-exam-i4", "Which model is direct variation?", "D", ["C = 20 + 4x", "V = 100 - 2t", "C = 50", "C = 1.5L"], "C = 1.5L has the form y = kx."),
      financeChoice("linear-exam-i5", "A practical model should not be extrapolated too far because:", "A", ["The context may stop being realistic", "The rule is always wrong", "Units do not matter", "Graphs cannot be interpreted"], "Models have sensible domains in context."),
    ],
    commonMistakes: [
      { mistake: "Using the wrong table change as the gradient.", fix: "Check the output change for one input step." },
      { mistake: "Writing a fixed-cost model as direct variation.", fix: "Include the y-intercept when there is a starting fee." },
      { mistake: "Ignoring a negative gradient.", fix: "Decreasing contexts need a negative rate." },
      { mistake: "Making conclusions outside the model context.", fix: "Use the rule only over sensible input values." },
    ],
    masteryQuiz: [
      linearAnswer("linear-exam-m1", "A hire table has costs 35, 47, 59, 71 dollars for 0, 1, 2, 3 hours. Find the gradient.", "47-35", "12", ["$12", "12 dollars", "$12/h", "12 dollars per hour"]),
      linearAnswer("linear-exam-m2", "For that hire table, write a rule for cost C after h hours.", "C=35+12h", "C = 35 + 12h", ["C=35+12h", "c=35+12h", "C=12h+35", "c=12h+35"]),
      moneyAnswer("linear-exam-m3", "Using C = 35 + 12h, find the cost for 5 hours.", "35+12\\times 5", "95"),
      financeChoice("linear-exam-m4", "The y-intercept in a hire-cost graph represents:", "B", ["Hourly rate", "Fixed starting cost", "Total hours", "Distance"], "The y-intercept is the cost at 0 hours."),
      financeChoice("linear-exam-m5", "A water tank graph with negative gradient represents:", "C", ["Constant temperature", "A fixed fee", "Draining or decreasing volume", "Direct variation only"], "Negative gradient means decreasing output."),
      linearAnswer("linear-exam-m6", "Fuel costs 1.75 dollars per litre. Write a direct variation rule for cost C for L litres.", "C=1.75L", "C = 1.75L", ["C=1.75L", "c=1.75L"]),
      moneyAnswer("linear-exam-m7", "Using C = 1.75L, find the cost of 12 L of fuel.", "1.75\\times 12", "21"),
      financeChoice("linear-exam-m8", "Which statement is true?", "A", ["Direct variation has no fixed fee", "All linear models are direct variation", "Intercept is always the rate", "Gradient is always positive"], "Direct variation has the form y = kx."),
      financeChoice("linear-exam-m9", "A model C = 12 + 3n should be described as:", "D", ["Direct variation", "Non-linear only", "A graph through origin", "Linear with a fixed cost"], "The 12 is a fixed starting cost."),
      financeChoice("linear-exam-m10", "A reasonable conclusion from a phone plan model should:", "C", ["Ignore units", "Use negative data amounts", "Stay within the plan context", "Assume infinite usage is valid"], "Practical conclusions should stay within context."),
    ],
  };
}

function formulasEquationsWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "substitution-formulae-equations") {
    return [
      {
        title: "Substituting into a travel formula",
        questionLatex:
          "\\text{A trip uses }d=st\\text{. If }s=80\\text{ km/h and }t=2.5\\text{ h, find }d.",
        steps: [
          { explanation: "Substitute speed and time into the formula.", latex: "d=80\\times 2.5" },
          { explanation: "Calculate the distance.", latex: "d=200" },
        ],
        finalAnswerLatex: "200\\text{ km}",
      },
      {
        title: "Substituting into a stopping distance model",
        questionLatex:
          "\\text{Stopping distance is }d=0.01v^2+0.4v.\\text{ Estimate }d\\text{ when }v=60.",
        steps: [
          { explanation: "Square the speed before multiplying by 0.01.", latex: "60^2=3600" },
          { explanation: "Substitute and calculate.", latex: "d=0.01(3600)+0.4(60)=36+24=60" },
        ],
        finalAnswerLatex: "60\\text{ m}",
      },
      {
        title: "Solving a contextual equation",
        questionLatex:
          "\\text{A delivery fee is }C=12+3n.\\text{ If }C=30,\\text{ find }n.",
        steps: [
          { explanation: "Subtract the fixed fee first.", latex: "30-12=18" },
          { explanation: "Divide by the charge per item.", latex: "n=18\\div 3=6" },
        ],
        finalAnswerLatex: "6\\text{ items}",
      },
    ];
  }

  if (slug === "changing-subject-formula") {
    return [
      {
        title: "Circumference formula",
        questionLatex: "\\text{The formula }C=2\\pi r\\text{ gives circumference. Make }r\\text{ the subject.}",
        steps: [
          { explanation: "r is multiplied by 2 pi." },
          { explanation: "Divide both sides by 2 pi.", latex: "r=\\frac{C}{2\\pi}" },
        ],
        finalAnswerLatex: "r=\\frac{C}{2\\pi}",
      },
      {
        title: "Triangle area formula",
        questionLatex: "\\text{The formula }A=\\frac{bh}{2}\\text{ gives triangle area. Make }h\\text{ the subject.}",
        steps: [
          { explanation: "Multiply both sides by 2.", latex: "2A=bh" },
          { explanation: "Divide by b.", latex: "h=\\frac{2A}{b}" },
        ],
        finalAnswerLatex: "h=\\frac{2A}{b}",
      },
      {
        title: "Temperature conversion",
        questionLatex: "\\text{The formula }F=1.8C+32\\text{ converts Celsius to Fahrenheit. Make }C\\text{ the subject.}",
        steps: [
          { explanation: "Subtract 32 first.", latex: "F-32=1.8C" },
          { explanation: "Divide by 1.8.", latex: "C=\\frac{F-32}{1.8}" },
        ],
        finalAnswerLatex: "C=\\frac{F-32}{1.8}",
      },
    ];
  }

  return [
    {
      title: `${title}: substitution in a cost formula`,
      questionLatex:
        "\\text{Electricity cost is }C=0.32k+8.\\text{ Find }C\\text{ when }k=50.",
      steps: [
        { explanation: "Substitute 50 for k.", latex: "C=0.32(50)+8" },
        { explanation: "Calculate the cost.", latex: "C=16+8=24" },
      ],
      finalAnswerLatex: "\\$24",
    },
    {
      title: `${title}: rearranging a practical formula`,
      questionLatex:
        "\\text{The formula }C=5w\\text{ gives a simplified dose. Make }w\\text{ the subject.}",
      steps: [
        { explanation: "w is multiplied by 5." },
        { explanation: "Divide both sides by 5.", latex: "w=\\frac{C}{5}" },
      ],
      finalAnswerLatex: "w=\\frac{C}{5}",
    },
  ];
}

function formulasEquationsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (course.slug !== "year-11-standard" || unit.slug !== "formulas-equations") {
    return null;
  }

  const base = {
    workedExamples: formulasEquationsWorkedExamples(lesson.slug, lesson.title),
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "substitution-formulae-equations") {
    return {
      ...base,
      description:
        "Substitute into practical formulae, solve simple contextual equations, and interpret answers with units.",
      learningIntention:
        "Evaluate practical formulae and solve simple equations from everyday contexts.",
      successCriteria: [
        "Substitute values into formulae using the correct variable.",
        "Apply order of operations in practical formulae.",
        "Solve simple linear equations from contexts.",
        "Interpret answers with appropriate units and reasonableness.",
      ],
      teaching: {
        paragraphs: [
          "A formula shows how quantities are connected. In practical questions, each variable represents a real quantity such as distance, time, weight or cost.",
          "Substitution means replacing a variable with a given value. Use the value for the correct variable and keep the units in mind.",
          "Order of operations matters. Powers are calculated before multiplication and addition.",
          "Equations from contexts can often be solved by undoing operations in reverse order.",
        ],
        latexBlocks: [
          "d=st",
          "d=0.01v^2+0.4v",
          "\\text{dose}=5w\\quad\\text{(simplified hypothetical rule)}",
        ],
      },
      guidedPractice: [
        formulaAnswer("formula-sub-g1", "A trip uses d = st. If speed is 80 km/h and time is 2.5 h, find the distance.", "d=80\\times 2.5", "200 km", ["200", "200km"]),
        formulaAnswer("formula-sub-g2", "A simplified medication dosage rule is D = 5w, where w is weight in kg. Find D for a 22 kg child.", "D=5\\times 22", "110", ["110 mg", "110mg"]),
        formulaAnswer("formula-sub-g3", "The stopping distance model is d = 0.01v^2 + 0.4v. Estimate d when v = 60.", "d=0.01(60)^2+0.4(60)", "60 m", ["60", "60m"]),
        financeChoice("formula-sub-g4", "In D = 5w, where w is weight in kg, w represents:", "B", ["Dose", "Weight in kg", "Time in hours", "Cost"], "The question defines w as weight in kg."),
      ],
      independentPractice: [
        formulaAnswer("formula-sub-i1", "Electricity cost is C = 0.32k + 8. Find C when k = 50 kWh.", "C=0.32(50)+8", "$24", ["24", "24.00", "$24.00"]),
        formulaAnswer("formula-sub-i2", "Fuel use is F = 0.08d, where d is distance in km. Find F for a 150 km trip.", "F=0.08\\times 150", "12 L", ["12", "12L", "12 litres"]),
        formulaAnswer("formula-sub-i3", "A hall hire cost is C = 60 + 25h. If the total cost is 185 dollars, find h.", "185=60+25h", "5", ["5 h", "5 hours"]),
        financeChoice("formula-sub-i4", "In the stopping distance formula d = 0.01v^2 + 0.4v, the first step when v = 50 is to:", "A", ["Square 50 before multiplying by 0.01", "Add 0.01 and 50", "Ignore v^2", "Use v = 0.4"], "The square is part of the order of operations."),
        formulaAnswer("formula-sub-i5", "A phone repair quote is C = 45 + 30p. If C = 135, find p.", "135=45+30p", "3", ["3 parts", "3parts"]),
      ],
      commonMistakes: [
        { mistake: "Substituting a value into the wrong variable.", fix: "Match each value with its defined variable." },
        { mistake: "Ignoring order of operations.", fix: "Calculate powers before multiplication and addition." },
        { mistake: "Dropping units from practical answers.", fix: "Include units such as km, L, dollars or minutes where needed." },
        { mistake: "Solving equations by undoing operations in the wrong order.", fix: "Undo addition/subtraction before multiplication/division when needed." },
      ],
      masteryQuiz: [
        formulaAnswer("formula-sub-m1", "A cycling distance is modelled by d = st. If s = 18 km/h and t = 3 h, find d.", "d=18\\times 3", "54 km", ["54", "54km"]),
        formulaAnswer("formula-sub-m2", "A simplified dose rule is D = 4w. Find D for a 16 kg child.", "D=4\\times 16", "64", ["64 mg", "64mg"]),
        formulaAnswer("formula-sub-m3", "Stopping distance is d = 0.01v^2 + 0.4v. Find d when v = 40.", "d=0.01(40)^2+0.4(40)", "32 m", ["32", "32m"]),
        formulaAnswer("formula-sub-m4", "A delivery cost is C = 12 + 3n. If C = 30, find n.", "30=12+3n", "6", ["6 items", "6items"]),
        financeChoice("formula-sub-m5", "A result of 200 km for a distance formula should be written with:", "C", ["No unit ever", "Dollars", "Kilometres", "Kilograms"], "Distance is measured in kilometres here."),
        formulaAnswer("formula-sub-m6", "A water bill is C = 18 + 2.5k. Find C when k = 20.", "18+2.5\\times 20", "$68", ["68", "68.00", "$68.00"]),
        formulaAnswer("formula-sub-m7", "A perimeter formula is P = 2l + 2w. Find P when l = 8 m and w = 3 m.", "2(8)+2(3)", "22 m", ["22", "22m"]),
        financeChoice("formula-sub-m8", "If C = 60 + 25h and h is hours, the 60 is:", "B", ["Hourly rate", "Fixed starting cost", "Number of hours", "Final answer"], "The constant term is the fixed starting cost."),
        formulaAnswer("formula-sub-m9", "A parking cost is C = 8 + 4h. If C = 28, find h.", "28=8+4h", "5", ["5 h", "5 hours"]),
        financeChoice("formula-sub-m10", "A formula answer should be checked for reasonableness because:", "D", ["Units never matter", "Substitution is always impossible", "All answers are exact dollars", "A wrong variable can give an unrealistic result"], "Reasonableness helps catch substitution errors."),
      ],
    };
  }

  if (lesson.slug === "changing-subject-formula") {
    return {
      ...base,
      description:
        "Rearrange practical formulae using inverse operations, including cost, area, circumference and temperature formulae.",
      learningIntention:
        "Change the subject of practical formulae using inverse operations.",
      successCriteria: [
        "Use inverse operations to isolate a variable.",
        "Rearrange one-step and two-step formulae.",
        "Rearrange formulae involving multiplication, division, addition and subtraction.",
        "Check a rearranged formula by substitution where appropriate.",
      ],
      teaching: {
        paragraphs: [
          "Changing the subject means rewriting a formula so a different variable is alone on one side.",
          "Use inverse operations to undo what has been done to the variable.",
          "For two-step formulae, undo addition or subtraction before undoing multiplication or division.",
          "A rearranged formula should keep the same meaning as the original. Substitution can be used to check it.",
        ],
        latexBlocks: [
          "C=2\\pi r\\Rightarrow r=\\frac{C}{2\\pi}",
          "A=\\frac{bh}{2}\\Rightarrow h=\\frac{2A}{b}",
        ],
      },
      guidedPractice: [
        formulaAnswer("formula-subject-g1", "The formula C = 2\\pi r gives circumference. Rearrange it to make r the subject.", "C=2\\pi r", "r = C/(2pi)", ["r=C/(2pi)", "r=C/(2\\pi)", "r = C/(2\\pi)", "r=C/2pi"]),
        formulaAnswer("formula-subject-g2", "The triangle area formula is A = bh/2. Rearrange it to make h the subject.", "A=\\frac{bh}{2}", "h = 2A/b", ["h=2A/b", "h=(2A)/b", "h = (2A)/b"]),
        formulaAnswer("formula-subject-g3", "A hire formula is C = 35 + 12h. Rearrange it to make h the subject.", "C=35+12h", "h = (C - 35)/12", ["h=(C-35)/12", "h = (C-35)/12", "h=C-35/12"]),
        financeChoice("formula-subject-g4", "To make h the subject of C = 35 + 12h, the first inverse operation is:", "A", ["Subtract 35", "Divide by 35", "Add 12", "Square h"], "Undo the added 35 before dividing by 12."),
      ],
      independentPractice: [
        formulaAnswer("formula-subject-i1", "The speed formula is d = st. Rearrange it to make s the subject.", "d=st", "s = d/t", ["s=d/t", "s = d ÷ t"]),
        formulaAnswer("formula-subject-i2", "The cost formula C = 8 + 4h gives parking cost. Rearrange it to make h the subject.", "C=8+4h", "h = (C - 8)/4", ["h=(C-8)/4", "h = (C-8)/4"]),
        formulaAnswer("formula-subject-i3", "The rectangle area formula A = lw is used for flooring. Make w the subject.", "A=lw", "w = A/l", ["w=A/l", "w = A ÷ l"]),
        formulaAnswer("formula-subject-i4", "The formula F = 1.8C + 32 converts Celsius to Fahrenheit. Make C the subject.", "F=1.8C+32", "C = (F - 32)/1.8", ["C=(F-32)/1.8", "c=(f-32)/1.8"]),
        financeChoice("formula-subject-i5", "When rearranging A = bh/2 to make h the subject, why multiply by 2 first?", "B", ["To remove b", "To undo division by 2", "To square h", "To remove A"], "Multiplying by 2 undoes the division by 2."),
      ],
      commonMistakes: [
        { mistake: "Changing only one side of the formula.", fix: "Apply the same inverse operation to both sides." },
        { mistake: "Dividing before subtracting in a two-step formula.", fix: "Undo addition or subtraction first when the variable term is grouped." },
        { mistake: "Dropping constants such as 2 or pi.", fix: "Keep every factor attached to the variable until it is divided away." },
        { mistake: "Forgetting square roots in formulas involving squares.", fix: "Undo squaring with a square root when required." },
      ],
      masteryQuiz: [
        formulaAnswer("formula-subject-m1", "The circumference formula is C = 2\\pi r. Make r the subject.", "C=2\\pi r", "r = C/(2pi)", ["r=C/(2pi)", "r=C/(2\\pi)", "r = C/(2\\pi)", "r=C/2pi"]),
        formulaAnswer("formula-subject-m2", "The triangle area formula is A = bh/2. Make b the subject.", "A=\\frac{bh}{2}", "b = 2A/h", ["b=2A/h", "b=(2A)/h", "b = (2A)/h"]),
        formulaAnswer("formula-subject-m3", "A cost formula is C = 20 + 5n. Make n the subject.", "C=20+5n", "n = (C - 20)/5", ["n=(C-20)/5", "n = (C-20)/5"]),
        formulaAnswer("formula-subject-m4", "The distance formula is d = st. Make t the subject.", "d=st", "t = d/s", ["t=d/s", "t = d ÷ s"]),
        financeChoice("formula-subject-m5", "To isolate r in C = 2\\pi r, divide by:", "D", ["C", "r", "2 only", "2\\pi"], "r is multiplied by 2 pi."),
        formulaAnswer("formula-subject-m6", "The formula P = 2l + 2w is used for a rectangle perimeter. Make l the subject.", "P=2l+2w", "l = (P - 2w)/2", ["l=(P-2w)/2", "l = P/2 - w", "l=P/2-w"]),
        formulaAnswer("formula-subject-m7", "The formula C = 0.32k + 8 gives electricity cost. Make k the subject.", "C=0.32k+8", "k = (C - 8)/0.32", ["k=(C-8)/0.32", "k = (C-8)/.32", "k=(C-8)/.32"]),
        financeChoice("formula-subject-m8", "A rearranged formula can be checked by:", "A", ["Substituting values to see if both forms match", "Ignoring units", "Changing only one side", "Guessing the subject"], "Substitution can verify equivalent formulae."),
        formulaAnswer("formula-subject-m9", "A simplified dosage formula is D = 5w. Make w the subject.", "D=5w", "w = D/5", ["w=D/5", "w = D ÷ 5"]),
        financeChoice("formula-subject-m10", "If x^2 = A and x is a positive length, then x is:", "C", ["A^2", "2A", "sqrt(A)", "A/2"], "Undo squaring with a square root for a positive length."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed formula and equation questions involving substitution, rearranging, units and reasonableness.",
    learningIntention:
      "Apply substitution, equation solving and changing the subject to practical exam-style contexts.",
    successCriteria: [
      "Choose the correct formula for a practical context.",
      "Substitute values accurately and use order of operations.",
      "Solve simple contextual equations.",
      "Rearrange practical formulae and interpret units.",
    ],
    teaching: {
      paragraphs: [
        "Formula and equation exam questions often combine context, units and algebraic steps.",
        "Start by identifying the variable you need to find. Then choose whether to substitute, solve an equation, or rearrange first.",
        "For substitution, replace variables carefully and follow order of operations.",
        "For rearranging, use inverse operations to make the required variable the subject.",
      ],
      latexBlocks: [
        "\\text{substitute values into the correct variables}",
        "\\text{use inverse operations to solve or rearrange}",
      ],
    },
    guidedPractice: [
      formulaAnswer("formula-exam-g1", "A trip formula is d = st. If s = 90 km/h and t = 2 h, find d.", "d=90\\times 2", "180 km", ["180", "180km"]),
      formulaAnswer("formula-exam-g2", "Electricity cost is C = 0.32k + 8. Find C when k = 25.", "0.32\\times 25+8", "$16", ["16", "16.00", "$16.00"]),
      formulaAnswer("formula-exam-g3", "A delivery cost is C = 12 + 3n. If C = 39, find n.", "39=12+3n", "9", ["9 items", "9items"]),
      financeChoice("formula-exam-g4", "Which rearrangement makes h the subject of A = bh/2?", "B", ["h = A/(2b)", "h = 2A/b", "h = b/(2A)", "h = A - b/2"], "Multiply by 2, then divide by b."),
    ],
    independentPractice: [
      formulaAnswer("formula-exam-i1", "A simplified fuel formula is F = 0.08d. Find F for d = 250 km.", "0.08\\times 250", "20 L", ["20", "20L", "20 litres"]),
      formulaAnswer("formula-exam-i2", "A parking formula is C = 8 + 4h. If C = 32, find h.", "32=8+4h", "6", ["6 h", "6 hours"]),
      formulaAnswer("formula-exam-i3", "The area formula A = lw is used for a room. Make l the subject.", "A=lw", "l = A/w", ["l=A/w", "l = A ÷ w"]),
      financeChoice("formula-exam-i4", "A stopping-distance formula includes v^2. A common mistake is:", "C", ["Using units", "Substituting v", "Forgetting to square v", "Checking reasonableness"], "The square must be applied before multiplying."),
      financeChoice("formula-exam-i5", "A formula answer in a cost context should usually include:", "A", ["Dollars", "Kilograms", "Degrees Celsius only", "No units"], "Cost is measured in dollars."),
    ],
    commonMistakes: [
      { mistake: "Choosing the wrong formula for the context.", fix: "Identify the quantity being found first." },
      { mistake: "Substituting before rearranging when rearranging would be clearer.", fix: "Use the method that isolates the required variable cleanly." },
      { mistake: "Dropping units in practical questions.", fix: "Attach the unit from the context." },
      { mistake: "Accepting an unreasonable answer.", fix: "Check whether the size and unit make sense." },
    ],
    masteryQuiz: [
      formulaAnswer("formula-exam-m1", "The stopping distance model is d = 0.01v^2 + 0.4v. Find d when v = 30.", "0.01(30)^2+0.4(30)", "21 m", ["21", "21m"]),
      formulaAnswer("formula-exam-m2", "A simplified dosage rule is D = 5w. Find D for w = 22 kg.", "5\\times 22", "110", ["110 mg", "110mg"]),
      formulaAnswer("formula-exam-m3", "A hire cost is C = 35 + 12h. If C = 95, find h.", "95=35+12h", "5", ["5 h", "5 hours"]),
      formulaAnswer("formula-exam-m4", "The formula C = 2\\pi r gives circumference. Make r the subject.", "C=2\\pi r", "r = C/(2pi)", ["r=C/(2pi)", "r=C/(2\\pi)", "r = C/(2\\pi)", "r=C/2pi"]),
      formulaAnswer("formula-exam-m5", "The formula A = bh/2 gives triangle area. Make h the subject.", "A=\\frac{bh}{2}", "h = 2A/b", ["h=2A/b", "h=(2A)/b", "h = (2A)/b"]),
      financeChoice("formula-exam-m6", "In d = st, if d is distance and t is time, s represents:", "D", ["Cost", "Temperature", "Dose", "Speed"], "Speed times time gives distance."),
      formulaAnswer("formula-exam-m7", "The temperature formula is F = 1.8C + 32. Make C the subject.", "F=1.8C+32", "C = (F - 32)/1.8", ["C=(F-32)/1.8", "c=(f-32)/1.8"]),
      financeChoice("formula-exam-m8", "When solving C = 35 + 12h for h, after subtracting 35 you should:", "A", ["Divide by 12", "Multiply by 35", "Square h", "Add 12"], "The h term is multiplied by 12."),
      formulaAnswer("formula-exam-m9", "A fuel formula is F = 0.08d. If F = 16 L, find d.", "16=0.08d", "200 km", ["200", "200km"]),
      financeChoice("formula-exam-m10", "A practical equation answer should be rejected if it:", "C", ["Has correct units", "Matches the formula", "Is impossible in context", "Uses inverse operations"], "Context and reasonableness matter."),
    ],
  };
}

function year12Standard2NetworksLessonOverride(
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
        shortAnswer("y12s2-net-term-m1", "A school path network has edges AB, AC, CD, DE. How many edges are listed?", "AB,AC,CD,DE", "4"),
        shortAnswer("y12s2-net-term-m2", "For edges AB, AC, AD and DE, find the degree of A.", "\\deg(A)=?", "3"),
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
        shortAnswer("y12s2-spmst-g1", "Delivery route A-B-D has weights 5 and 7. What is the total route weight?", "5+7", "12"),
        shortAnswer("y12s2-spmst-g2", "Paths A-B-D and A-C-D have total weights 11 and 9. What is the shortest-path weight?", "\\min(11,9)", "9"),
        labelledChoice("y12s2-spmst-g3", "A town wants to connect every suburb with the least total fibre cable. Which method is appropriate?", "B", ["Shortest path", "Minimum spanning tree", "Circuit only", "Degree count only"], "Connecting every location with least total length is an MST problem."),
        shortAnswer("y12s2-spmst-g4", "Kruskal's method selects MST edges with weights 2, 4 and 5. What is the total weight?", "2+4+5", "11"),
      ],
      independentPractice: [
        shortAnswer("y12s2-spmst-i1", "Road weights are AB=3 and BD=8. Find the route weight for A-B-D.", "3+8", "11"),
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
        shortAnswer("y12s2-spmst-m1", "A route from A to D uses weights 4, 2 and 3. What is its total weight?", "4+2+3", "9"),
        shortAnswer("y12s2-spmst-m2", "Routes A-B-D and A-C-D have weights 13 and 10. What is the shortest-path weight?", "\\min(13,10)", "10"),
        shortAnswer("y12s2-spmst-m3", "If A-C-D is the shortest route, enter the path label.", "\\text{path}", "A-C-D", ["A,C,D", "ACD", "A C D"]),
        labelledChoice("y12s2-spmst-m4", "A council wants minimum total pipe length connecting all parks. Use:", "B", ["Shortest path", "Minimum spanning tree", "A circuit only", "A directed graph only"], "This is a minimal connector problem."),
        shortAnswer("y12s2-spmst-m5", "Selected MST edges have weights 1, 3, 4 and 6. Find the total weight.", "1+3+4+6", "14"),
        labelledChoice("y12s2-spmst-m6", "Kruskal's method chooses edges in which order?", "A", ["Smallest allowed edge first", "Largest edge first", "Random edges only", "Edges that make cycles first"], "Kruskal's method works from smallest to largest while avoiding cycles."),
        labelledChoice("y12s2-spmst-m7", "A spanning tree must:", "D", ["Use only one vertex", "Use all edges", "Contain a cycle", "Connect all vertices without cycles"], "A spanning tree connects every vertex and has no cycles."),
        shortAnswer("y12s2-spmst-m8", "Cable edges chosen for an MST are AB=5, BC=4 and CD=8. Find the total cable length.", "5+4+8", "17", ["17 m", "17m", "17 metres", "17 meters"]),
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
        shortAnswer("y12s2-cpa-m1", "Activity A starts at day 0 and takes 6 days. Find its earliest finish.", "0+6", "6 days", ["6", "6d"]),
        shortAnswer("y12s2-cpa-m2", "Activity B starts after A finishes at day 6 and takes 4 days. Find B's earliest finish.", "6+4", "10 days", ["10", "10d"]),
        shortAnswer("y12s2-cpa-m3", "Activity D depends on B and C, which finish at days 9 and 12. What is D's earliest start?", "\\max(9,12)", "12 days", ["12", "12d"]),
        shortAnswer("y12s2-cpa-m4", "Path A-B-D-F has durations 3, 4, 5 and 2. Find the path total.", "3+4+5+2", "14 days", ["14", "14d"]),
        shortAnswer("y12s2-cpa-m5", "Path totals are 14, 12 and 10 days. Find the project completion time.", "\\max(14,12,10)", "14 days", ["14", "14d"]),
        shortAnswer("y12s2-cpa-m6", "The longest path is A-B-D-F. Enter the critical path.", "\\text{critical path}", "A-B-D-F", ["A,B,D,F", "ABDF", "A B D F"]),
        labelledChoice("y12s2-cpa-m7", "Activity C has 2 days float and is delayed by 3 days. What is the likely project delay?", "B", ["No delay", "1 day", "3 days", "5 days"], "A delay 1 day beyond float delays the project by 1 day."),
        labelledChoice("y12s2-cpa-m8", "Which activity can delay the whole project if it is delayed?", "A", ["A critical activity", "Any activity with float remaining", "Only a directed edge", "Only an MST edge"], "Critical activities control completion time."),
        shortAnswer("y12s2-cpa-m9", "Latest start is day 11 and earliest start is day 8. Find the float.", "11-8", "3 days", ["3", "3d"]),
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
      shortAnswer("y12s2-net-exam-m3", "A route uses edge weights 7, 3 and 6. Find the total.", "7+3+6", "16"),
      shortAnswer("y12s2-net-exam-m4", "Path totals are A-B-D=17 and A-C-D=14. Enter the shortest path.", "\\text{shortest path}", "A-C-D", ["A,C,D", "ACD", "A C D"]),
      shortAnswer("y12s2-net-exam-m5", "MST selected edges have lengths 5, 6, 8 and 9. Find the total length.", "5+6+8+9", "28", ["28 m", "28m", "28 metres", "28 meters"]),
      labelledChoice("y12s2-net-exam-m6", "A tree used for an MST must not contain:", "D", ["Vertices", "Weights", "Selected edges", "Cycles"], "Trees do not contain cycles."),
      shortAnswer("y12s2-net-exam-m7", "A project path has durations 2, 5, 4 and 3 days. Find the path total.", "2+5+4+3", "14 days", ["14", "14d"]),
      shortAnswer("y12s2-net-exam-m8", "Project path totals are 12, 15 and 11 days. Find the project completion time.", "\\max(12,15,11)", "15 days", ["15", "15d"]),
      labelledChoice("y12s2-net-exam-m9", "A non-critical activity has 5 days float and is delayed by 3 days. Completion time:", "C", ["Increases by 5 days", "Increases by 3 days", "Does not change", "Becomes a circuit"], "The delay is within float."),
      labelledChoice("y12s2-net-exam-m10", "A critical activity is delayed by 2 days. Completion time usually:", "A", ["Increases by 2 days", "Does not change", "Decreases by 2 days", "Is found using MST"], "A critical delay delays the whole project by the same amount."),
    ],
  };
}

function year12Standard2FinanceLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-2" ||
    unit.slug !== "investments-loans-annuities"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "investment-compound-interest") {
    return {
      ...base,
      description:
        "Calculate compound investment balances, interest earned, growth factors, and net returns after fees.",
      learningIntention:
        "Use compound interest to model investment balances and compare realistic savings options.",
      successCriteria: [
        "Identify principal, rate, compounding period, and time in an investment problem.",
        "Use a growth factor to calculate a compound interest balance.",
        "Find interest earned from final balance minus principal.",
        "Compare investment options using final balance, fees, and context.",
      ],
      teaching: {
        paragraphs: [
          "Compound interest means interest is added to the account balance, then future interest is calculated on the new balance. This is different from simple interest, where interest is calculated only on the original principal.",
          "For annual compounding, a yearly rate such as 4.2% becomes the growth factor 1.042. The balance after n years can be modelled by multiplying the principal by the growth factor n times.",
          "The final balance is not the same as the interest earned. Interest earned is the final balance minus the original principal.",
          "When comparing investment options, check fees and the time period. A higher advertised rate may not give the best net return if fees are large.",
        ],
        latexBlocks: [
          "A=P(1+r)^n",
          "\\text{interest earned}=A-P",
          "\\text{growth factor}=1+\\frac{\\text{rate}}{100}",
        ],
      },
      workedExamples: [
        {
          title: "Compound an investment over several years",
          questionLatex:
            "\\text{An account starts with }\\$2500\\text{ at }4.2\\%\\text{ p.a. compounded annually for 3 years.}",
          steps: [
            {
              explanation: "Write the growth factor for 4.2%.",
              latex: "1+0.042=1.042",
            },
            {
              explanation:
                "Apply the compound interest model for 3 annual compounding periods.",
              latex: "A=2500(1.042)^3=2828.415\\ldots",
            },
            {
              explanation: "Round the balance to the nearest cent.",
            },
          ],
          finalAnswerLatex: "\\$2828.42",
        },
        {
          title: "Find interest earned",
          questionLatex:
            "\\text{A term deposit grows from }\\$3000\\text{ to }\\$3280.",
          steps: [
            {
              explanation:
                "Interest earned is the final balance minus the principal.",
              latex: "3280-3000=280",
            },
          ],
          finalAnswerLatex: "\\$280",
        },
        {
          title: "Compare two investment options",
          questionLatex:
            "\\begin{array}{c|c|c} \\text{Option} & \\text{Rate} & \\text{Fee}\\\\" +
            "A&3.5\\%&\\$0\\\\ B&3.0\\%&\\$40\\text{ at end} \\end{array}\\quad P=\\$4000,\\ n=2",
          steps: [
            {
              explanation: "Calculate Option A's final balance.",
              latex: "4000(1.035)^2=4284.90",
            },
            {
              explanation: "Calculate Option B's final balance after the fee.",
              latex: "4000(1.03)^2-40=4203.60",
            },
          ],
          finalAnswerLatex: "\\text{Option A gives the higher net balance.}",
        },
      ],
      guidedPractice: [
        moneyAnswer("y12s2-invest-g1", "An investment of 2000 dollars earns 5% p.a. compounded annually for 2 years. What is the final balance?", "2000(1.05)^2", "2205"),
        financeShortAnswer("y12s2-invest-g2", "A bank rate is 4.2% p.a. Write the annual growth factor.", "1+0.042", "1.042"),
        moneyAnswer("y12s2-invest-g3", "A savings account grows from 1800 dollars to 1968 dollars. How much interest was earned?", "1968-1800", "168"),
        financeChoice("y12s2-invest-g4", "An investment option has a higher rate but a 60 dollar yearly fee. What should be compared?", "B", ["Only the advertised rate", "The final balance after fees", "Only the first deposit", "The loan repayment amount"], "A fair comparison uses net balance after fees."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-invest-i1", "A term deposit of 1500 dollars earns 3% p.a. compounded annually for 3 years. Find the balance to the nearest cent.", "1500(1.03)^3", "1639.09"),
        moneyAnswer("y12s2-invest-i2", "A 4200 dollar investment has a final balance of 4594.80 dollars. Find the interest earned.", "4594.80-4200", "394.80", ["394.8", "$394.8"]),
        financeShortAnswer("y12s2-invest-i3", "A growth factor is 1.065. What annual percentage rate does this represent?", "1.065-1=0.065", "6.5%", ["6.5", "0.065"]),
        financeChoice("y12s2-invest-i4", "Which calculation correctly models 2800 dollars at 4% p.a. compounded annually for 5 years?", "A", ["2800(1.04)^5", "2800(4)^5", "2800+0.04+5", "2800(0.04)^5"], "The growth factor is 1.04 and the exponent is the number of years."),
        moneyAnswer("y12s2-invest-i5", "Option A returns 3060 dollars. Option B returns 3105 dollars but has a 50 dollar fee. What is Option B's net return?", "3105-50", "3055"),
      ],
      commonMistakes: [
        { mistake: "Using 4.2 instead of 0.042 for a percentage rate.", fix: "Divide the percentage by 100 before forming the growth factor." },
        { mistake: "Using simple interest when the question says compounded.", fix: "Use repeated multiplication or A = P(1 + r)^n." },
        { mistake: "Reporting the final balance when asked for interest earned.", fix: "Subtract the principal from the final balance." },
        { mistake: "Ignoring fees when comparing products.", fix: "Compare the net amount after fees and charges." },
      ],
      masteryQuiz: [
        financeShortAnswer("y12s2-invest-m1", "A savings rate is 3.8% p.a. Write the annual growth factor.", "1+0.038", "1.038"),
        moneyAnswer("y12s2-invest-m2", "A 1000 dollar account earns 6% p.a. compounded annually for 2 years. Find the balance.", "1000(1.06)^2", "1123.60", ["1123.6", "$1123.6"]),
        moneyAnswer("y12s2-invest-m3", "A 2500 dollar investment earns 4% p.a. compounded annually for 3 years. Find the balance to the nearest cent.", "2500(1.04)^3", "2812.16"),
        moneyAnswer("y12s2-invest-m4", "An account grows from 5000 dollars to 5460 dollars. Find the interest earned.", "5460-5000", "460"),
        financeChoice("y12s2-invest-m5", "Which expression models 3500 dollars at 2.5% p.a. compounded annually for 4 years?", "C", ["3500(2.5)^4", "3500(0.025)^4", "3500(1.025)^4", "3500+1.025+4"], "The growth factor is 1.025."),
        moneyAnswer("y12s2-invest-m6", "A 6000 dollar investment at 3% p.a. compounded annually is worth what after 1 year?", "6000(1.03)", "6180"),
        financeShortAnswer("y12s2-invest-m7", "A growth factor of 1.09 represents what percentage growth?", "1.09-1=0.09", "9%", ["9", "0.09"]),
        moneyAnswer("y12s2-invest-m8", "Option B has a final balance of 4260 dollars and a 35 dollar fee. Find the net balance.", "4260-35", "4225"),
        financeChoice("y12s2-invest-m9", "A student uses 2500(0.042)^3 for 4.2% compound interest. What is the error?", "A", ["They used 0.042 instead of 1.042 as the growth factor", "They included the principal", "They used an annual rate", "They rounded to cents"], "Compound growth uses 1 + r."),
        financeChoice("y12s2-invest-m10", "Which statement is safest when comparing investments?", "D", ["The highest rate is always best", "Fees never matter", "Shorter terms always earn more", "Compare net balances over the same term"], "Net balance over the same term is the fair comparison."),
      ],
    };
  }

  if (lesson.slug === "depreciation-loans") {
    return {
      ...base,
      description:
        "Model repeated depreciation and loan balances using decay factors, repayments, and recurrence relations.",
      learningIntention:
        "Use depreciation and loan recurrence models to calculate balances and interpret whether debt is reducing.",
      successCriteria: [
        "Use a decay factor for repeated percentage depreciation.",
        "Calculate the depreciated value of an asset over time.",
        "Apply a loan balance recurrence in the correct order.",
        "Judge whether repayments are large enough to reduce a loan balance.",
      ],
      teaching: {
        paragraphs: [
          "Depreciation is a repeated percentage decrease in the value of an asset, such as a car, laptop, or piece of equipment. A depreciation rate of 12% uses the decay factor 0.88.",
          "Loans often use recurrence relations because each period follows the same process: interest is applied to the current balance, then a repayment is subtracted if the recurrence says so.",
          "The order in a recurrence matters. For example, B_{n+1}=1.006B_n-450 means interest is applied first, then the 450 dollar repayment is subtracted.",
          "A repayment reduces the loan only if it is larger than the interest added for that period. Otherwise, the balance may stay similar or increase.",
        ],
        latexBlocks: [
          "V=P(1-r)^n",
          "B_{n+1}=1.006B_n-450",
          "\\text{new balance}=\\text{balance after interest}-\\text{repayment}",
        ],
      },
      workedExamples: [
        {
          title: "Depreciate a car value",
          questionLatex:
            "\\text{A car worth }\\$18000\\text{ depreciates by }12\\%\\text{ p.a. for 2 years.}",
          steps: [
            {
              explanation: "The decay factor for a 12% decrease is 0.88.",
              latex: "1-0.12=0.88",
            },
            {
              explanation: "Apply the factor for two years.",
              latex: "V=18000(0.88)^2=13939.20",
            },
          ],
          finalAnswerLatex: "\\$13939.20",
        },
        {
          title: "Use a loan recurrence",
          questionLatex:
            "B_{n+1}=1.006B_n-450,\\quad B_0=28000",
          steps: [
            {
              explanation:
                "Substitute the starting balance into the recurrence.",
              latex: "B_1=1.006(28000)-450",
            },
            {
              explanation:
                "Calculate the balance after interest and repayment.",
              latex: "B_1=28168-450=27718",
            },
          ],
          finalAnswerLatex: "B_1=\\$27718",
        },
        {
          title: "Check whether a repayment reduces a balance",
          questionLatex:
            "\\text{A loan of }\\$10000\\text{ has monthly interest }\\$80\\text{ and repayment }\\$250.",
          steps: [
            {
              explanation:
                "The repayment is larger than the interest added.",
              latex: "250>80",
            },
            {
              explanation:
                "So the balance decreases during that month.",
            },
          ],
          finalAnswerLatex: "\\text{The loan balance decreases.}",
        },
      ],
      guidedPractice: [
        financeShortAnswer("y12s2-loan-g1", "A laptop depreciates by 20% per year. What is the decay factor?", "1-0.20", "0.8", ["0.80"]),
        moneyAnswer("y12s2-loan-g2", "A phone worth 1200 dollars depreciates by 15% in one year. What is its value after one year?", "1200(0.85)", "1020"),
        moneyAnswer("y12s2-loan-g3", "A loan follows B_(n+1)=1.01B_n-300. If B_0=5000, find B_1.", "1.01(5000)-300", "4750"),
        financeChoice("y12s2-loan-g4", "A monthly loan adds 90 dollars interest and the repayment is 75 dollars. What happens to the balance?", "C", ["It decreases by 75 dollars", "It becomes zero", "It increases by 15 dollars", "It must be a depreciation model"], "The interest added is larger than the repayment."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-loan-i1", "A ute worth 24000 dollars depreciates by 10% p.a. for 2 years. Find its value.", "24000(0.90)^2", "19440"),
        financeShortAnswer("y12s2-loan-i2", "A device depreciates by 8% p.a. What decay factor should be used?", "1-0.08", "0.92"),
        moneyAnswer("y12s2-loan-i3", "A loan follows B_(n+1)=1.005B_n-400. If B_0=18000, find B_1.", "1.005(18000)-400", "17690"),
        moneyAnswer("y12s2-loan-i4", "For B_(n+1)=1.006B_n-450 and B_1=27718, find B_2 to the nearest cent.", "1.006(27718)-450", "27434.31"),
        financeChoice("y12s2-loan-i5", "In B_(n+1)=1.006B_n-450, which happens first?", "A", ["Interest is applied to the balance", "The loan is paid off", "The repayment is doubled", "Depreciation is added"], "The recurrence multiplies by 1.006 before subtracting 450."),
      ],
      commonMistakes: [
        { mistake: "Adding depreciation instead of subtracting it.", fix: "Use a decay factor less than 1 for depreciation." },
        { mistake: "Using 12 instead of 0.12 for a 12% rate.", fix: "Convert percentages to decimals before calculating." },
        { mistake: "Applying repayment before interest when the recurrence says interest first.", fix: "Follow the written order in the recurrence relation." },
        { mistake: "Assuming every repayment reduces the loan.", fix: "Compare the repayment with the interest added for the period." },
      ],
      masteryQuiz: [
        financeShortAnswer("y12s2-loan-m1", "A car depreciates by 12% p.a. What is the decay factor?", "1-0.12", "0.88"),
        moneyAnswer("y12s2-loan-m2", "A bike worth 900 dollars depreciates by 10% in one year. Find its value after one year.", "900(0.90)", "810"),
        moneyAnswer("y12s2-loan-m3", "A car worth 18000 dollars depreciates by 12% p.a. for 2 years. Find its value.", "18000(0.88)^2", "13939.20", ["13939.2", "$13939.2"]),
        moneyAnswer("y12s2-loan-m4", "A loan follows B_(n+1)=1.006B_n-450. If B_0=28000, find B_1.", "1.006(28000)-450", "27718"),
        financeChoice("y12s2-loan-m5", "A loan recurrence is B_(n+1)=1.01B_n-500. What does -500 represent?", "B", ["Interest", "A repayment", "Depreciation", "A fee added"], "The subtraction represents a repayment."),
        moneyAnswer("y12s2-loan-m6", "A camera worth 1500 dollars depreciates by 25% in one year. Find its value.", "1500(0.75)", "1125"),
        financeChoice("y12s2-loan-m7", "A repayment is 300 dollars and monthly interest added is 260 dollars. The balance:", "A", ["Decreases by 40 dollars", "Increases by 40 dollars", "Does not change", "Depreciates by 300%"], "Repayment exceeds interest by 40 dollars."),
        moneyAnswer("y12s2-loan-m8", "A loan follows B_(n+1)=1.004B_n-250. If B_0=12000, find B_1.", "1.004(12000)-250", "11798"),
        financeChoice("y12s2-loan-m9", "Which expression correctly models 16000 dollars depreciating by 7% for 3 years?", "D", ["16000(1.07)^3", "16000(7)^3", "16000(0.07)^3", "16000(0.93)^3"], "Depreciation uses 1 - 0.07 = 0.93."),
        financeChoice("y12s2-loan-m10", "If a loan balance is increasing despite repayments, the most likely reason is:", "C", ["The repayment is too large", "The interest rate is zero", "Interest added is greater than the repayment", "The balance is depreciating"], "The balance rises when interest added exceeds repayment."),
      ],
    };
  }

  if (lesson.slug === "annuities-regular-payments") {
    return {
      ...base,
      description:
        "Use recurrence and table methods for regular deposits, annuities, future value, and repayment schedules.",
      learningIntention:
        "Model regular deposits and repayments using annuity ideas, recurrence relations, and short balance tables.",
      successCriteria: [
        "Recognise an annuity as regular payments or deposits over time.",
        "Use a recurrence/table to update a savings balance with interest and deposits.",
        "Interpret loan repayment tables in context.",
        "Compare regular deposit plans using final balances or total contributions.",
      ],
      teaching: {
        paragraphs: [
          "An annuity involves equal regular payments. In Year 12 Standard 2, this can include regular deposits into an investment or regular repayments on a loan.",
          "A regular savings recurrence often adds interest to the current balance and then adds a deposit. A loan recurrence often adds interest and then subtracts a repayment.",
          "A table method is useful because each row follows the same rule. Keep the period, starting balance, interest, payment, and final balance clear.",
          "When comparing regular deposit plans, compare the final balance over the same time period and check whether deposits, fees, or interest rates are different.",
        ],
        latexBlocks: [
          "S_{n+1}=1.004S_n+200",
          "B_{n+1}=1.006B_n-450",
          "\\text{future value}=\\text{balance after regular deposits and interest}",
        ],
      },
      workedExamples: [
        {
          title: "Use a regular savings recurrence",
          questionLatex:
            "S_{n+1}=1.005S_n+200,\\quad S_0=1000",
          steps: [
            {
              explanation:
                "Apply the monthly interest factor and then add the deposit.",
              latex: "S_1=1.005(1000)+200=1205",
            },
            {
              explanation: "Repeat the same process for the second month.",
              latex: "S_2=1.005(1205)+200=1411.025",
            },
          ],
          finalAnswerLatex: "S_2=\\$1411.03",
        },
        {
          title: "Calculate a balance after regular deposits",
          questionLatex:
            "\\text{Start with }\\$0\\text{ and deposit }\\$500\\text{ at the end of each year. Interest is }4\\%\\text{ p.a.}",
          steps: [
            {
              explanation: "After the first deposit, the balance is 500 dollars.",
              latex: "S_1=500",
            },
            {
              explanation:
                "After one year of interest and another deposit, update the balance.",
              latex: "S_2=500(1.04)+500=1020",
            },
          ],
          finalAnswerLatex: "\\$1020",
        },
        {
          title: "Interpret a loan repayment table",
          questionLatex:
            "\\begin{array}{c|c} \\text{Month} & \\text{Balance after repayment}\\\\" +
            "0&\\$10000\\\\ 1&\\$9620\\\\ 2&\\$9238 \\end{array}",
          steps: [
            {
              explanation:
                "The balance is decreasing each month after the repayments.",
            },
            {
              explanation:
                "This suggests the repayment is more than the monthly interest added.",
            },
          ],
          finalAnswerLatex: "\\text{The repayment schedule is reducing the loan.}",
        },
      ],
      guidedPractice: [
        moneyAnswer("y12s2-ann-g1", "A savings plan follows S_(n+1)=1.01S_n+100. If S_0=500, find S_1.", "1.01(500)+100", "605"),
        moneyAnswer("y12s2-ann-g2", "An account has 1200 dollars and earns 0.5% for the month before a 200 dollar deposit. Find the new balance.", "1.005(1200)+200", "1406"),
        financeChoice("y12s2-ann-g3", "A regular deposit plan is an example of:", "A", ["An annuity", "A one-off simple interest calculation", "A shortest path", "A tax deduction"], "An annuity involves regular payments or deposits."),
        financeChoice("y12s2-ann-g4", "A loan repayment table shows balances 8000, 7700, 7395. What is happening?", "B", ["The loan is increasing", "The loan is decreasing", "The balance is unchanged", "The account is a weighted network"], "The balance is lower after each repayment."),
      ],
      independentPractice: [
        moneyAnswer("y12s2-ann-i1", "A regular savings account follows S_(n+1)=1.004S_n+150. If S_0=2000, find S_1.", "1.004(2000)+150", "2158"),
        moneyAnswer("y12s2-ann-i2", "Using S_(n+1)=1.004S_n+150 and S_1=2158, find S_2 to the nearest cent.", "1.004(2158)+150", "2316.63"),
        moneyAnswer("y12s2-ann-i3", "A student deposits 250 dollars at the end of each year. After the first deposit, interest is 3% before the second deposit. Find the balance after the second deposit.", "250(1.03)+250", "507.50", ["507.5", "$507.5"]),
        financeChoice("y12s2-ann-i4", "A loan recurrence B_(n+1)=1.005B_n-600 models:", "C", ["Regular deposits into savings", "Depreciation of a car", "Monthly interest followed by a repayment", "A one-way road network"], "The balance grows by interest, then repayment is subtracted."),
        financeChoice("y12s2-ann-i5", "Plan A deposits 100 dollars monthly. Plan B deposits 120 dollars monthly but charges 15 dollars monthly. What should be compared?", "D", ["Only the larger deposit", "Only the interest symbol", "Only month 1", "Final balances after deposits, interest, and fees"], "A fair comparison includes deposits, interest, fees, and time."),
      ],
      commonMistakes: [
        { mistake: "Treating regular payments as one single deposit.", fix: "Update the balance once for each payment period." },
        { mistake: "Forgetting interest before adding a deposit in the recurrence.", fix: "Follow the recurrence order exactly." },
        { mistake: "Confusing a savings recurrence with a loan recurrence.", fix: "Deposits are usually added; loan repayments are usually subtracted." },
        { mistake: "Comparing deposit size without checking fees and interest.", fix: "Compare final balances over the same time period." },
      ],
      masteryQuiz: [
        financeChoice("y12s2-ann-m1", "A plan with equal monthly deposits is best described as:", "A", ["An annuity", "Depreciation only", "A circuit", "A box plot"], "Regular deposits are an annuity-style situation."),
        moneyAnswer("y12s2-ann-m2", "A savings recurrence is S_(n+1)=1.005S_n+200. If S_0=1000, find S_1.", "1.005(1000)+200", "1205"),
        moneyAnswer("y12s2-ann-m3", "Using S_(n+1)=1.005S_n+200 and S_1=1205, find S_2 to the nearest cent.", "1.005(1205)+200", "1411.03"),
        moneyAnswer("y12s2-ann-m4", "A saver deposits 400 dollars at the end of each year. After the first deposit earns 5%, a second deposit is made. Find the balance after the second deposit.", "400(1.05)+400", "820"),
        financeChoice("y12s2-ann-m5", "In B_(n+1)=1.006B_n-450, the 450 represents:", "B", ["A regular deposit", "A regular repayment", "A growth factor", "A fee charged twice"], "It is subtracted, so it represents a repayment."),
        financeChoice("y12s2-ann-m6", "A repayment table shows balances 12000, 11850, 11702. The loan is:", "C", ["Increasing quickly", "Unchanged", "Decreasing", "Compounding as an investment"], "The listed balance decreases each period."),
        moneyAnswer("y12s2-ann-m7", "A savings account has 900 dollars. It earns 1% interest then receives a 100 dollar deposit. Find the new balance.", "1.01(900)+100", "1009"),
        moneyAnswer("y12s2-ann-m8", "A regular deposit plan adds 75 dollars each month for 6 months with no interest. What is contributed in total?", "75\\times 6", "450"),
        financeChoice("y12s2-ann-m9", "Which is the best reason to use a recurrence table for annuities?", "D", ["It avoids all percentages", "It makes every answer zero", "It removes the need for context", "It tracks each regular payment period"], "A recurrence table updates the balance period by period."),
        financeChoice("y12s2-ann-m10", "A product says 'low repayments' but the balance falls very slowly. What should be checked?", "A", ["Interest, fees, repayment size, and loan term", "Only the advertisement wording", "Only the first repayment", "Only the account name"], "Repayments must be judged against interest, fees, and term."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed HSC-style finance questions involving compound interest, depreciation, loans, annuities, fees, and comparisons.",
    learningIntention:
      "Apply compound interest, depreciation, recurrence relations, annuity ideas, and comparison skills to financial exam questions.",
    successCriteria: [
      "Choose the correct method for compound interest, depreciation, loan recurrence, or annuity questions.",
      "Calculate short balances, interest earned, repayments, fees, and net returns accurately.",
      "Interpret whether balances are increasing or decreasing.",
      "Compare financial options using the same term and relevant fees.",
    ],
    teaching: {
      paragraphs: [
        "Financial Mathematics exam questions often combine context and calculation. Read whether the question is about an investment, a depreciating asset, a loan, or regular payments before choosing a method.",
        "Investments with compound interest use growth factors greater than 1. Depreciation uses decay factors less than 1. Loan recurrences usually add interest and subtract repayments.",
        "Annuities involve regular deposits or payments. A recurrence table is often the clearest way to track the balance period by period.",
        "For comparison questions, avoid choosing the highest rate or lowest repayment too quickly. Check fees, term, final balance, and whether the balance is actually improving.",
      ],
      latexBlocks: [
        "A=P(1+r)^n",
        "V=P(1-r)^n",
        "B_{n+1}=\\text{interest factor}\\times B_n-\\text{repayment}",
      ],
    },
    workedExamples: [
      {
        title: "Choose the correct financial model",
        questionLatex:
          "\\text{A car worth }\\$22000\\text{ loses }9\\%\\text{ of its value each year.}",
        steps: [
          {
            explanation:
              "The asset is losing value by a repeated percentage, so this is depreciation.",
          },
          {
            explanation: "Use a decay factor.",
            latex: "1-0.09=0.91",
          },
        ],
        finalAnswerLatex: "\\text{Use }V=22000(0.91)^n.",
      },
      {
        title: "Compare options after fees",
        questionLatex:
          "\\text{Option A returns }\\$5180.\\quad \\text{Option B returns }\\$5230\\text{ with a }\\$70\\text{ fee.}",
        steps: [
          {
            explanation: "Calculate Option B's net return.",
            latex: "5230-70=5160",
          },
          {
            explanation:
              "Compare net values, not just the advertised return.",
            latex: "5180>5160",
          },
        ],
        finalAnswerLatex: "\\text{Option A is better by }\\$20.",
      },
      {
        title: "Interpret a loan recurrence",
        questionLatex:
          "B_{n+1}=1.008B_n-500",
        steps: [
          {
            explanation:
              "The balance is multiplied by 1.008, so interest is added first.",
          },
          {
            explanation:
              "Then 500 dollars is subtracted as the repayment.",
          },
        ],
        finalAnswerLatex: "\\text{Monthly interest is followed by a }\\$500\\text{ repayment.}",
      },
    ],
    guidedPractice: [
      moneyAnswer("y12s2-fin-exam-g1", "An investment of 3000 dollars earns 4% p.a. compounded annually for 2 years. Find the balance.", "3000(1.04)^2", "3244.80", ["3244.8", "$3244.8"]),
      moneyAnswer("y12s2-fin-exam-g2", "A car worth 20000 dollars depreciates by 10% p.a. for 2 years. Find its value.", "20000(0.90)^2", "16200"),
      moneyAnswer("y12s2-fin-exam-g3", "A loan follows B_(n+1)=1.005B_n-350. If B_0=10000, find B_1.", "1.005(10000)-350", "9700"),
      financeChoice("y12s2-fin-exam-g4", "An investment has a higher rate but a large fee. Which comparison is fairest?", "C", ["Highest rate only", "Lowest fee only", "Net balance over the same term", "The first year only"], "Financial products should be compared over the same term after fees."),
    ],
    independentPractice: [
      moneyAnswer("y12s2-fin-exam-i1", "A 4500 dollar account earns 3.5% p.a. compounded annually for 2 years. Find the balance to the nearest cent.", "4500(1.035)^2", "4820.51"),
      moneyAnswer("y12s2-fin-exam-i2", "Equipment worth 8000 dollars depreciates by 15% in one year. Find its value after one year.", "8000(0.85)", "6800"),
      moneyAnswer("y12s2-fin-exam-i3", "A savings recurrence is S_(n+1)=1.004S_n+250. If S_0=1500, find S_1.", "1.004(1500)+250", "1756"),
      moneyAnswer("y12s2-fin-exam-i4", "Option A returns 6120 dollars. Option B returns 6200 dollars but charges an 85 dollar fee. What is Option B's net balance?", "6200-85", "6115"),
      financeChoice("y12s2-fin-exam-i5", "A loan balance table shows 25000, 24920, 24835 after repayments. Which conclusion is best?", "A", ["The balance is decreasing slowly", "The balance is increasing", "The loan is fully repaid", "The interest rate is definitely zero"], "The listed balances decrease, but only slowly."),
    ],
    commonMistakes: [
      { mistake: "Using the same factor for growth and depreciation.", fix: "Growth uses 1 + r; depreciation uses 1 - r." },
      { mistake: "Ignoring whether a recurrence adds a deposit or subtracts a repayment.", fix: "Read the sign in the recurrence carefully." },
      { mistake: "Comparing products using the advertised rate only.", fix: "Include fees, term, and final balance." },
      { mistake: "Writing long explanations instead of a clear calculation or conclusion.", fix: "Give the requested balance, option, or A/B/C/D answer." },
    ],
    masteryQuiz: [
      financeChoice("y12s2-fin-exam-m1", "A bank balance grows by compound interest. Which factor is used for 5% growth?", "B", ["0.05", "1.05", "5", "0.95"], "Compound growth uses 1 + 0.05."),
      financeChoice("y12s2-fin-exam-m2", "A car depreciates by 8% p.a. Which factor is used?", "D", ["1.08", "8", "0.08", "0.92"], "Depreciation uses 1 - 0.08."),
      moneyAnswer("y12s2-fin-exam-m3", "An investment of 2500 dollars earns 4% p.a. compounded annually for 2 years. Find the balance.", "2500(1.04)^2", "2704"),
      moneyAnswer("y12s2-fin-exam-m4", "A device worth 1600 dollars depreciates by 20% in one year. Find its value.", "1600(0.80)", "1280"),
      moneyAnswer("y12s2-fin-exam-m5", "A loan follows B_(n+1)=1.006B_n-450. If B_0=28000, find B_1.", "1.006(28000)-450", "27718"),
      moneyAnswer("y12s2-fin-exam-m6", "A savings plan follows S_(n+1)=1.005S_n+200. If S_0=1000, find S_1.", "1.005(1000)+200", "1205"),
      moneyAnswer("y12s2-fin-exam-m7", "A 5000 dollar investment grows to 5360 dollars. Find the interest earned.", "5360-5000", "360"),
      moneyAnswer("y12s2-fin-exam-m8", "Option A has a net balance of 4320 dollars. Option B has 4390 dollars but a 90 dollar fee. Find Option B's net balance.", "4390-90", "4300"),
      financeChoice("y12s2-fin-exam-m9", "A loan repayment is smaller than the monthly interest added. What happens?", "C", ["The balance must decrease", "The loan is fully repaid", "The balance increases", "It becomes an investment"], "If interest added is larger than repayment, debt increases."),
      financeChoice("y12s2-fin-exam-m10", "Which is the best financial decision-making habit?", "A", ["Compare final balances after rates, fees, and time", "Choose the biggest advertised rate every time", "Ignore fees", "Use simple interest for every product"], "Good comparisons use all relevant costs and the same time period."),
    ],
  };
}

function year12Standard2StatisticsLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-2" ||
    unit.slug !== "bivariate-data-normal-distribution"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "bivariate-data-scatterplots") {
    return {
      ...base,
      description:
        "Interpret bivariate data, scatterplots, association direction, strength, outliers, and causation warnings.",
      learningIntention:
        "Use scatterplots and context to describe bivariate relationships clearly and cautiously.",
      successCriteria: [
        "Identify explanatory and response variables in a practical situation.",
        "Describe association using direction, form, strength, and outliers.",
        "Recognise positive, negative, and no clear association from a described scatterplot.",
        "Avoid claiming causation from association alone.",
      ],
      teaching: {
        paragraphs: [
          "Bivariate data records two variables for each item or person. In Standard 2 questions, the variables might be study hours and marks, advertising spend and sales, or delivery distance and time.",
          "The explanatory variable is the one used to help predict or explain the response variable. It is usually placed on the x-axis. The response variable is usually placed on the y-axis.",
          "A scatterplot can show positive association, negative association, or little to no association. Strength depends on how closely the points follow a pattern.",
          "Outliers are points that do not fit the main pattern. They can affect interpretation and may influence a regression line later.",
          "Association does not prove causation. A scatterplot can show that two variables move together, but extra evidence is needed before claiming one causes the other.",
        ],
        latexBlocks: [
          "\\text{explanatory variable} \\rightarrow x\\text{-axis}",
          "\\text{response variable} \\rightarrow y\\text{-axis}",
          "\\text{describe association: direction, form, strength, outliers}",
        ],
      },
      workedExamples: [
        {
          title: "Interpret direction and strength",
          questionLatex:
            "\\text{A scatterplot of study hours and test score has an upward trend with points close to a line.}",
          steps: [
            {
              explanation:
                "An upward trend means larger x-values tend to go with larger y-values.",
            },
            {
              explanation:
                "Points close to a line indicate a strong linear association.",
            },
          ],
          finalAnswerLatex: "\\text{Strong positive linear association.}",
        },
        {
          title: "Identify explanatory and response variables",
          questionLatex:
            "\\text{A coach records training hours and race time to predict race time.}",
          steps: [
            {
              explanation:
                "The variable used to predict is training hours.",
            },
            {
              explanation:
                "The variable being predicted is race time.",
            },
          ],
          finalAnswerLatex:
            "\\text{Explanatory: training hours. Response: race time.}",
        },
        {
          title: "Avoid a causation claim",
          questionLatex:
            "\\text{Advertising spend and sales have a positive association.}",
          steps: [
            {
              explanation:
                "The scatterplot supports an association between the variables.",
            },
            {
              explanation:
                "It does not prove advertising alone caused the sales increase.",
            },
          ],
          finalAnswerLatex:
            "\\text{Association is shown, but causation is not proven.}",
        },
      ],
      guidedPractice: [
        financeChoice("y12s2-biv-g1", "A scatterplot comparing study hours and test score slopes upward. Which description is best?", "A", ["Positive association", "Negative association", "No variables are related", "Causation is proven"], "An upward trend indicates positive association."),
        financeChoice("y12s2-biv-g2", "For delivery distance and delivery time, where distance is used to predict time, which is the explanatory variable?", "B", ["Delivery time", "Delivery distance", "Driver name", "Day of week only"], "The explanatory variable is used to predict the response."),
        financeChoice("y12s2-biv-g3", "A scatterplot has points close to a downward sloping line. Which description is best?", "C", ["Weak positive association", "No association", "Strong negative linear association", "Causation proven"], "Downward and close to a line means strong negative linear association."),
        financeChoice("y12s2-biv-g4", "A scatterplot shows temperature and ice-cream sales increase together. What is the safest conclusion?", "D", ["Temperature definitely causes all sales", "Sales cause temperature", "There is no association", "There is a positive association, but causation is not proven"], "Association alone does not prove causation."),
      ],
      independentPractice: [
        financeChoice("y12s2-biv-i1", "A scatterplot of advertising spend and sales rises from left to right with moderate scatter. Which description fits?", "A", ["Moderate positive association", "Strong negative association", "No association", "A normal distribution"], "The trend is positive with moderate strength."),
        financeChoice("y12s2-biv-i2", "In a study of hours of training and performance score, performance score is the:", "C", ["Explanatory variable", "Outlier", "Response variable", "Correlation coefficient"], "The score is the outcome being predicted."),
        financeChoice("y12s2-biv-i3", "A point is far away from the main cluster of points. It is called:", "B", ["A response", "An outlier", "A z-score", "A mean"], "A point far from the pattern is an outlier."),
        financeChoice("y12s2-biv-i4", "Height and arm span have points close to an upward line. Which association is most likely?", "D", ["Weak negative", "No association", "Curved only", "Strong positive"], "Height and arm span tend to increase together."),
        financeChoice("y12s2-biv-i5", "A scatterplot links screen time and sleep hours, but other factors may matter. Which statement is best?", "A", ["Association does not prove causation", "Correlation always proves causation", "Outliers must be ignored", "The variables cannot be plotted"], "Other factors mean causation cannot be claimed from association alone."),
      ],
      commonMistakes: [
        { mistake: "Saying association proves causation.", fix: "Use cautious wording unless the study design proves cause and effect." },
        { mistake: "Forgetting to mention strength.", fix: "Describe whether points are close to or spread away from the pattern." },
        { mistake: "Reversing explanatory and response variables.", fix: "Ask which variable is being used to predict the other." },
        { mistake: "Ignoring outliers.", fix: "Check whether any points sit away from the main trend." },
      ],
      masteryQuiz: [
        financeChoice("y12s2-biv-m1", "Study hours and marks show an upward trend. The association is:", "A", ["Positive", "Negative", "Impossible", "A residual"], "An upward trend is positive."),
        financeChoice("y12s2-biv-m2", "As outside temperature rises, electricity use for air conditioning rises. This is likely:", "C", ["Negative association", "No association", "Positive association", "A z-score"], "Both variables tend to increase together."),
        financeChoice("y12s2-biv-m3", "Points are very spread out with no clear trend. Which description is best?", "B", ["Strong positive", "Weak or no association", "Strong negative", "Causation proven"], "No clear trend means weak or no association."),
        financeChoice("y12s2-biv-m4", "A scatterplot has a downward trend with points close to a line. The association is:", "D", ["Weak positive", "No association", "Normal", "Strong negative"], "Downward and close to a line means strong negative."),
        financeChoice("y12s2-biv-m5", "In predicting delivery time from delivery distance, delivery time is the:", "B", ["Explanatory variable", "Response variable", "Outlier", "Correlation coefficient"], "Delivery time is being predicted."),
        financeChoice("y12s2-biv-m6", "A point far from the main cluster is called:", "A", ["An outlier", "A mean", "A z-score", "A slope"], "That is an outlier."),
        financeChoice("y12s2-biv-m7", "A scatterplot of advertising spend and sales shows positive association. Which claim is safest?", "C", ["Advertising definitely caused all sales", "Sales definitely caused advertising", "The variables are associated but causation is not proven", "No relationship can exist"], "Association alone is not proof of causation."),
        financeChoice("y12s2-biv-m8", "Which pair is bivariate data?", "D", ["Only test scores", "Only student names", "Only one temperature reading", "Study hours and test score for each student"], "Bivariate data records two variables for each item."),
        financeChoice("y12s2-biv-m9", "The explanatory variable is usually placed on the:", "A", ["x-axis", "y-axis", "title only", "residual axis"], "The explanatory variable usually goes on the x-axis."),
        financeChoice("y12s2-biv-m10", "A useful scatterplot description should include:", "B", ["Only the highest point", "Direction, strength, form, and outliers", "Only the mean", "Only the sample size"], "These features describe the association clearly."),
      ],
    };
  }

  if (lesson.slug === "correlation-regression") {
    return {
      ...base,
      description:
        "Use correlation, regression equations, predictions, residuals, slope, intercept, and extrapolation warnings.",
      learningIntention:
        "Use correlation and least-squares regression ideas to make and interpret statistical predictions.",
      successCriteria: [
        "Interpret the sign and size of a correlation coefficient.",
        "Use a regression equation to make an appropriate prediction.",
        "Interpret slope and intercept in context.",
        "Calculate and interpret residuals using actual minus predicted.",
      ],
      teaching: {
        paragraphs: [
          "The correlation coefficient r describes the direction and strength of a linear association. Values close to 1 show strong positive association, values close to -1 show strong negative association, and values close to 0 show weak linear association.",
          "A regression equation models the relationship between an explanatory variable x and a response variable y. It can be used for prediction within the data range.",
          "The slope gives the predicted change in y for a one-unit increase in x. The intercept is the predicted y-value when x is 0, but it should only be interpreted when x = 0 makes sense in context.",
          "A residual is actual value minus predicted value. A positive residual means the actual value is above the regression prediction.",
        ],
        latexBlocks: [
          "-1\\le r\\le 1",
          "\\hat{y}=a+bx",
          "\\text{residual}=y-\\hat{y}",
        ],
      },
      workedExamples: [
        {
          title: "Use a regression equation for prediction",
          questionLatex:
            "\\hat{y}=12.5+4.2x,\\quad x=6",
          steps: [
            {
              explanation:
                "Substitute 6 hours of training into the regression equation.",
              latex: "\\hat{y}=12.5+4.2(6)",
            },
            {
              explanation: "Calculate the predicted score.",
              latex: "\\hat{y}=37.7",
            },
          ],
          finalAnswerLatex: "\\text{Predicted score }=37.7",
        },
        {
          title: "Interpret the slope",
          questionLatex:
            "\\hat{y}=12.5+4.2x\\text{, where }x\\text{ is training hours and }y\\text{ is score.}",
          steps: [
            {
              explanation:
                "The slope is the coefficient of x.",
              latex: "b=4.2",
            },
            {
              explanation:
                "For each extra hour of training, the predicted score increases by 4.2 points.",
            },
          ],
          finalAnswerLatex:
            "\\text{Predicted score rises by 4.2 points per training hour.}",
        },
        {
          title: "Calculate a residual",
          questionLatex:
            "\\text{A predicted delivery time is }34\\text{ min, but the actual time is }39\\text{ min.}",
          steps: [
            {
              explanation: "Residual equals actual minus predicted.",
              latex: "39-34=5",
            },
            {
              explanation:
                "The positive residual means the actual delivery took longer than predicted.",
            },
          ],
          finalAnswerLatex: "\\text{Residual }=5\\text{ min.}",
        },
      ],
      guidedPractice: [
        financeChoice("y12s2-reg-g1", "A correlation coefficient is r = 0.84. Which description is best?", "A", ["Strong positive linear association", "Strong negative linear association", "Weak association", "No variables are related"], "A value close to 1 is strong positive."),
        financeChoice("y12s2-reg-g2", "A correlation coefficient is r = -0.78. Which description is best?", "B", ["Strong positive", "Strong negative", "No association", "Causation proven"], "A value close to -1 is strong negative."),
        financeShortAnswer("y12s2-reg-g3", "A regression model is y = 12.5 + 4.2x. Predict y when x = 6.", "12.5+4.2(6)", "37.7"),
        financeShortAnswer("y12s2-reg-g4", "A predicted score is 74 and the actual score is 80. Find the residual.", "80-74", "6"),
      ],
      independentPractice: [
        financeShortAnswer("y12s2-reg-i1", "A sales model is y = 220 + 18x. Predict sales when x = 5 advertising units.", "220+18(5)", "310"),
        financeChoice("y12s2-reg-i2", "In y = 220 + 18x, the slope 18 means:", "C", ["Sales start at 18", "Advertising causes all sales", "Predicted sales increase by 18 for each extra advertising unit", "The residual is 18"], "Slope is predicted change in y for a one-unit increase in x."),
        financeShortAnswer("y12s2-reg-i3", "Predicted delivery time is 42 minutes and actual delivery time is 38 minutes. Find the residual.", "38-42", "-4", ["-4 min", "-4 minutes"]),
        financeChoice("y12s2-reg-i4", "A model was built from training times between 1 and 8 hours. Predicting for 20 hours is:", "D", ["Interpolation", "Always exact", "A residual", "Extrapolation and should be treated cautiously"], "20 hours is outside the data range."),
        financeChoice("y12s2-reg-i5", "In y = 12.5 + 4.2x, the intercept 12.5 should be interpreted only if:", "A", ["x = 0 is meaningful in context", "r is negative", "there is an outlier", "the residual is positive"], "Intercepts are contextual."),
      ],
      commonMistakes: [
        { mistake: "Treating correlation as proof of causation.", fix: "Correlation measures association, not proof of cause and effect." },
        { mistake: "Reversing x and y in the regression equation.", fix: "Substitute the explanatory variable into x to predict y." },
        { mistake: "Calculating residual as predicted minus actual.", fix: "Use residual = actual - predicted." },
        { mistake: "Extrapolating far outside the data range without caution.", fix: "Predictions are most reliable within the observed data range." },
      ],
      masteryQuiz: [
        financeChoice("y12s2-reg-m1", "r = 0.91 is best described as:", "A", ["Strong positive linear association", "Strong negative linear association", "Weak association", "No linear association"], "0.91 is close to 1."),
        financeChoice("y12s2-reg-m2", "r = -0.86 is best described as:", "B", ["Strong positive", "Strong negative", "No association", "Causation"], "-0.86 is close to -1."),
        financeChoice("y12s2-reg-m3", "r = 0.08 suggests:", "C", ["Strong positive", "Strong negative", "Weak or no linear association", "A guaranteed cause"], "0.08 is close to 0."),
        financeShortAnswer("y12s2-reg-m4", "A regression equation is y = 30 + 2.5x. Predict y when x = 8.", "30+2.5(8)", "50"),
        financeShortAnswer("y12s2-reg-m5", "A model is y = 5 + 1.8x. Predict y when x = 10.", "5+1.8(10)", "23"),
        financeShortAnswer("y12s2-reg-m6", "A predicted value is 62 and the actual value is 57. Find the residual.", "57-62", "-5"),
        financeChoice("y12s2-reg-m7", "A positive residual means:", "D", ["The correlation is positive", "The model proves causation", "The actual value is below predicted", "The actual value is above predicted"], "Residual = actual - predicted."),
        financeChoice("y12s2-reg-m8", "In y = 12 + 3x, the slope 3 means:", "A", ["Predicted y increases by 3 for each 1-unit increase in x", "Predicted y is always 3", "x must be 3", "The residual is 3"], "Slope is the predicted rate of change."),
        financeChoice("y12s2-reg-m9", "Predicting outside the range of the data is called:", "B", ["Interpolation", "Extrapolation", "Residual calculation", "Standardising"], "Extrapolation is outside the observed data range."),
        financeChoice("y12s2-reg-m10", "Which conclusion is safest from a strong positive correlation?", "C", ["x definitely causes y", "y definitely causes x", "x and y have a strong positive association", "There is no relationship"], "Correlation describes association, not causation."),
      ],
    };
  }

  if (lesson.slug === "normal-distribution-z-scores") {
    return {
      ...base,
      description:
        "Calculate and interpret z-scores, standard deviations from the mean, and empirical-rule percentages.",
      learningIntention:
        "Use normal distribution features, z-scores, and the 68-95-99.7 rule to interpret data in context.",
      successCriteria: [
        "Recognise the mean and standard deviation in a normal distribution context.",
        "Calculate z-scores using a short formula.",
        "Interpret whether a value is above or below the mean.",
        "Use the 68-95-99.7 rule for simple normal distribution intervals.",
      ],
      teaching: {
        paragraphs: [
          "A normal distribution is symmetric and bell-shaped. The mean is at the centre, and the standard deviation measures spread from the mean.",
          "A z-score tells how many standard deviations a value is above or below the mean. Positive z-scores are above the mean, and negative z-scores are below the mean.",
          "Standardising with z-scores allows values from different normal distributions to be compared fairly.",
          "The empirical rule says approximately 68% of values are within 1 standard deviation of the mean, 95% within 2 standard deviations, and 99.7% within 3 standard deviations.",
        ],
        latexBlocks: [
          "z=\\frac{x-\\mu}{\\sigma}",
          "\\text{about }68\\%,95\\%,99.7\\%\\text{ within }1,2,3\\text{ standard deviations}",
          "x=\\mu+z\\sigma",
        ],
      },
      workedExamples: [
        {
          title: "Calculate a z-score",
          questionLatex:
            "\\text{Exam scores have mean }68\\text{ and standard deviation }8.\\text{ Find the z-score for }76.",
          steps: [
            {
              explanation: "Substitute into the z-score formula.",
              latex: "z=\\frac{76-68}{8}",
            },
            {
              explanation: "Calculate the standardised value.",
              latex: "z=1",
            },
          ],
          finalAnswerLatex: "z=1",
        },
        {
          title: "Interpret above or below the mean",
          questionLatex:
            "\\text{A product weight has }z=-1.5.",
          steps: [
            {
              explanation:
                "A negative z-score means the value is below the mean.",
            },
            {
              explanation:
                "The size 1.5 means it is 1.5 standard deviations from the mean.",
            },
          ],
          finalAnswerLatex:
            "\\text{1.5 standard deviations below the mean.}",
        },
        {
          title: "Use the empirical rule",
          questionLatex:
            "\\text{Scores are normal with mean }70\\text{ and standard deviation }6.\\text{ Estimate the percentage from }58\\text{ to }82.",
          steps: [
            {
              explanation:
                "The interval 58 to 82 is 12 below and above the mean.",
              latex: "70-2(6)=58,\\quad 70+2(6)=82",
            },
            {
              explanation:
                "Within 2 standard deviations is approximately 95%.",
            },
          ],
          finalAnswerLatex: "\\text{About }95\\%",
        },
      ],
      guidedPractice: [
        financeShortAnswer("y12s2-normal-g1", "Exam scores are normal with mean 68 and standard deviation 8. Find the z-score for 76.", "(76-68)/8", "1", ["1.0"]),
        financeShortAnswer("y12s2-normal-g2", "Waiting times have mean 20 min and standard deviation 5 min. Find the z-score for 10 min.", "(10-20)/5", "-2", ["-2.0"]),
        financeChoice("y12s2-normal-g3", "A z-score of 1.5 means the value is:", "A", ["1.5 standard deviations above the mean", "1.5 below zero", "Equal to the mean", "A correlation coefficient"], "Positive z-scores are above the mean."),
        financeChoice("y12s2-normal-g4", "Approximately what percentage of normal data is within 1 standard deviation of the mean?", "B", ["95%", "68%", "99.7%", "50%"], "The empirical rule gives about 68%."),
      ],
      independentPractice: [
        financeShortAnswer("y12s2-normal-i1", "Product weights have mean 500 g and standard deviation 20 g. Find the z-score for 540 g.", "(540-500)/20", "2", ["2.0"]),
        financeShortAnswer("y12s2-normal-i2", "Test scores have mean 70 and standard deviation 6. What raw score has z = -1?", "70-1(6)", "64"),
        financeChoice("y12s2-normal-i3", "A z-score of -0.5 means the value is:", "C", ["Above the mean", "Exactly the mean", "0.5 standard deviations below the mean", "The standard deviation"], "Negative means below the mean."),
        financeChoice("y12s2-normal-i4", "Approximately what percentage is within 2 standard deviations in a normal distribution?", "A", ["95%", "68%", "99.7%", "5%"], "The empirical rule gives about 95%."),
        financeShortAnswer("y12s2-normal-i5", "Scores are normal with mean 70 and standard deviation 6. Find the upper value 2 standard deviations above the mean.", "70+2(6)", "82"),
      ],
      commonMistakes: [
        { mistake: "Using the mean instead of the standard deviation in the denominator.", fix: "Use z = (x - mean) divided by standard deviation." },
        { mistake: "Ignoring the sign of the z-score.", fix: "Positive means above the mean; negative means below the mean." },
        { mistake: "Using 95% for one standard deviation.", fix: "One standard deviation is about 68%, two is about 95%." },
        { mistake: "Treating empirical-rule percentages as exact counts.", fix: "Use approximate language unless the question gives exact data." },
      ],
      masteryQuiz: [
        financeChoice("y12s2-normal-m1", "A normal distribution is best described as:", "A", ["Symmetric and bell-shaped", "Always skewed right", "Always a straight line", "A scatterplot only"], "Normal distributions are symmetric and bell-shaped."),
        financeChoice("y12s2-normal-m2", "About what percentage lies within 1 standard deviation of the mean?", "B", ["95%", "68%", "99.7%", "34%"], "The empirical rule gives about 68%."),
        financeChoice("y12s2-normal-m3", "About what percentage lies within 3 standard deviations of the mean?", "D", ["68%", "95%", "50%", "99.7%"], "The empirical rule gives about 99.7%."),
        financeShortAnswer("y12s2-normal-m4", "Scores have mean 68 and standard deviation 8. Find the z-score for 76.", "(76-68)/8", "1", ["1.0"]),
        financeShortAnswer("y12s2-normal-m5", "Scores have mean 50 and standard deviation 5. Find the z-score for 40.", "(40-50)/5", "-2", ["-2.0"]),
        financeShortAnswer("y12s2-normal-m6", "A value has z = 2 in a distribution with mean 30 and standard deviation 4. Find the raw value.", "30+2(4)", "38"),
        financeChoice("y12s2-normal-m7", "A z-score of -1.25 means:", "C", ["1.25 above the mean", "Equal to the mean", "1.25 standard deviations below the mean", "A residual of -1.25"], "Negative z-scores are below the mean."),
        financeShortAnswer("y12s2-normal-m8", "Scores are normal with mean 70 and standard deviation 6. Find the interval within 1 standard deviation. Enter the lower value.", "70-6", "64"),
        financeShortAnswer("y12s2-normal-m9", "Scores are normal with mean 70 and standard deviation 6. Find the upper value within 2 standard deviations.", "70+2(6)", "82"),
        financeChoice("y12s2-normal-m10", "A normal-distribution answer using the empirical rule should usually be described as:", "A", ["Approximate", "A proof of causation", "A residual", "A regression slope"], "Empirical-rule percentages are approximate."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed HSC-style statistical analysis questions using scatterplots, regression, residuals, z-scores, and normal distributions.",
    learningIntention:
      "Apply bivariate data, correlation, regression, residuals, z-scores, and normal distribution ideas to exam-style contexts.",
    successCriteria: [
      "Interpret scatterplots using direction, strength, outliers, and context.",
      "Use regression equations to predict values and calculate residuals.",
      "Recognise extrapolation and causation warnings.",
      "Calculate and interpret z-scores and empirical-rule percentages.",
    ],
    teaching: {
      paragraphs: [
        "Mixed statistical analysis questions often combine interpretation with short calculation. First decide whether the question is about a scatterplot, regression model, residual, z-score, or normal distribution.",
        "Scatterplot and correlation questions require careful language. Describe the association, but do not claim causation unless the question provides strong evidence.",
        "Regression questions usually ask for a prediction, slope interpretation, residual, or warning about extrapolation. Keep the calculation short and use the context in the conclusion.",
        "Normal distribution questions often use z-scores or the empirical rule. State when a value is above or below the mean, and remember that empirical-rule percentages are approximate.",
      ],
      latexBlocks: [
        "\\text{association} \\ne \\text{causation}",
        "\\text{residual}=\\text{actual}-\\text{predicted}",
        "z=\\frac{x-\\mu}{\\sigma}",
      ],
    },
    workedExamples: [
      {
        title: "Choose a cautious scatterplot conclusion",
        questionLatex:
          "\\text{Study hours and test scores have a strong positive association.}",
        steps: [
          {
            explanation:
              "The scatterplot supports a relationship between the variables.",
          },
          {
            explanation:
              "It does not prove study hours are the only cause of higher scores.",
          },
        ],
        finalAnswerLatex:
          "\\text{Strong positive association; causation is not proven.}",
      },
      {
        title: "Prediction and residual",
        questionLatex:
          "\\hat{y}=40+3x,\\quad x=5,\\quad \\text{actual }y=58",
        steps: [
          {
            explanation: "Find the predicted value.",
            latex: "\\hat{y}=40+3(5)=55",
          },
          {
            explanation: "Residual is actual minus predicted.",
            latex: "58-55=3",
          },
        ],
        finalAnswerLatex: "\\text{Predicted }55,\\quad \\text{residual }3.",
      },
      {
        title: "Z-score in context",
        questionLatex:
          "\\text{Exam scores have mean }70\\text{ and standard deviation }10.\\text{ Find }z\\text{ for }85.",
        steps: [
          {
            explanation: "Substitute into the z-score formula.",
            latex: "z=\\frac{85-70}{10}=1.5",
          },
          {
            explanation:
              "The score is 1.5 standard deviations above the mean.",
            },
        ],
        finalAnswerLatex: "z=1.5",
      },
    ],
    guidedPractice: [
      financeChoice("y12s2-stat-exam-g1", "A scatterplot of training time and performance score has an upward trend. Which conclusion is best?", "A", ["Positive association", "Negative association", "No association", "Causation proven"], "An upward trend is positive association."),
      financeShortAnswer("y12s2-stat-exam-g2", "A regression equation is y = 20 + 5x. Predict y when x = 6.", "20+5(6)", "50"),
      financeShortAnswer("y12s2-stat-exam-g3", "Predicted delivery time is 31 min and actual delivery time is 36 min. Find the residual.", "36-31", "5", ["5 min", "5 minutes"]),
      financeShortAnswer("y12s2-stat-exam-g4", "Scores have mean 68 and standard deviation 8. Find the z-score for 84.", "(84-68)/8", "2", ["2.0"]),
    ],
    independentPractice: [
      financeChoice("y12s2-stat-exam-i1", "A correlation r = -0.72 for temperature and heater use is best described as:", "B", ["Strong positive", "Strong negative", "No linear association", "Causation proven"], "The value is negative and reasonably close to -1."),
      financeShortAnswer("y12s2-stat-exam-i2", "A regression equation is y = 12.5 + 4.2x. Predict y for x = 6.", "12.5+4.2(6)", "37.7"),
      financeChoice("y12s2-stat-exam-i3", "A prediction is made for x = 30 when the data range was x = 2 to x = 10. This is:", "D", ["Interpolation", "A residual", "A z-score", "Extrapolation"], "30 is outside the data range."),
      financeShortAnswer("y12s2-stat-exam-i4", "A normal distribution has mean 70 and standard deviation 6. Find the z-score for 58.", "(58-70)/6", "-2", ["-2.0"]),
      financeChoice("y12s2-stat-exam-i5", "Approximately what percentage of normal data is within 2 standard deviations of the mean?", "A", ["95%", "68%", "99.7%", "2%"], "The empirical rule gives about 95%."),
    ],
    commonMistakes: [
      { mistake: "Claiming causation from a scatterplot.", fix: "Say association unless a causal study is described." },
      { mistake: "Substituting the response value into x.", fix: "Use the explanatory variable as x in the regression equation." },
      { mistake: "Finding residual as predicted minus actual.", fix: "Use actual minus predicted." },
      { mistake: "Mixing up the empirical-rule percentages.", fix: "Remember 68%, 95%, and 99.7% for 1, 2, and 3 standard deviations." },
    ],
    masteryQuiz: [
      financeChoice("y12s2-stat-exam-m1", "An upward scatterplot trend means:", "A", ["Positive association", "Negative association", "No association", "A normal distribution"], "Upward trend is positive association."),
      financeChoice("y12s2-stat-exam-m2", "r = -0.90 suggests:", "B", ["Strong positive association", "Strong negative association", "Weak association", "Causation"], "-0.90 is strong negative."),
      financeShortAnswer("y12s2-stat-exam-m3", "Use y = 15 + 2x to predict y when x = 9.", "15+2(9)", "33"),
      financeShortAnswer("y12s2-stat-exam-m4", "Predicted score is 72 and actual score is 68. Find the residual.", "68-72", "-4"),
      financeChoice("y12s2-stat-exam-m5", "A positive residual means the actual value is:", "C", ["Below predicted", "Equal to the mean", "Above predicted", "Outside the data range"], "Positive residual means actual minus predicted is positive."),
      financeChoice("y12s2-stat-exam-m6", "A regression prediction far outside the data range should be treated with caution because it is:", "D", ["Correlation", "Causation", "Standardising", "Extrapolation"], "Outside the data range is extrapolation."),
      financeShortAnswer("y12s2-stat-exam-m7", "Exam scores have mean 68 and standard deviation 8. Find the z-score for 76.", "(76-68)/8", "1", ["1.0"]),
      financeShortAnswer("y12s2-stat-exam-m8", "Product weights have mean 500 g and standard deviation 20 g. Find the z-score for 460 g.", "(460-500)/20", "-2", ["-2.0"]),
      financeChoice("y12s2-stat-exam-m9", "About what percentage of normal data is within 1 standard deviation of the mean?", "A", ["68%", "95%", "99.7%", "1%"], "One standard deviation is about 68%."),
      financeChoice("y12s2-stat-exam-m10", "Which conclusion is safest from correlation alone?", "B", ["One variable definitely causes the other", "The variables are associated", "The variables must be normally distributed", "The residual is always zero"], "Correlation alone supports association, not causation."),
    ],
  };
}

function year12Standard2TrigRatesLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-2" ||
    unit.slug !== "trigonometry-ratios-rates"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "non-right-angled-trigonometry") {
    return {
      ...base,
      description:
        "Choose sine rule or cosine rule for practical non-right-angled triangle problems in surveying and navigation contexts.",
      learningIntention:
        "Identify non-right-angled triangle information and choose an appropriate trigonometric rule.",
      successCriteria: [
        "Recognise when a triangle is not right-angled.",
        "Choose cosine rule when two sides and the included angle are known.",
        "Choose sine rule when a matching side-angle pair is known.",
        "Check whether side and angle answers are reasonable in context.",
      ],
      teaching: {
        paragraphs: [
          "Many Standard 2 measurement problems involve triangles that are not right-angled. These can come from surveying land, locating a drone, finding distances between towns, or measuring a triangular park.",
          "Right-angled trigonometry is only suitable when the triangle has a 90-degree angle. If there is no right angle, first decide whether the sine rule or cosine rule matches the information given.",
          "Use the cosine rule when two sides and the included angle are known, or when all three sides are known and an angle is required.",
          "Use the sine rule when you have a matching side-angle pair and need another side or angle.",
          "A measurement answer should be checked for reasonableness. A side length cannot be negative, and the largest side should be opposite the largest angle.",
        ],
        latexBlocks: [
          "\\text{cosine rule: }c^2=a^2+b^2-2ab\\cos C",
          "\\text{sine rule: }\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}",
          "\\text{included angle}=\\text{angle between the two known sides}",
        ],
      },
      workedExamples: [
        {
          title: "Select the correct rule for a surveying triangle",
          questionLatex:
            "\\text{A triangular field has sides }48\\text{ m and }62\\text{ m with included angle }37^\\circ.",
          steps: [
            {
              explanation:
                "The angle is between the two known sides, and the required side is opposite the included angle.",
            },
            {
              explanation:
                "This matches the cosine rule.",
              latex: "c^2=a^2+b^2-2ab\\cos C",
            },
          ],
          finalAnswerLatex: "\\text{Use the cosine rule.}",
        },
        {
          title: "Use cosine rule for a distance",
          questionLatex:
            "a=48,\\quad b=62,\\quad C=37^\\circ",
          steps: [
            {
              explanation:
                "Substitute the two sides and included angle into the cosine rule.",
              latex: "c^2=48^2+62^2-2(48)(62)\\cos37^\\circ",
            },
            {
              explanation: "Take the square root and round to one decimal place.",
              latex: "c=37.3\\text{ m}",
            },
          ],
          finalAnswerLatex: "37.3\\text{ m}",
        },
        {
          title: "Use sine rule when a matching pair is known",
          questionLatex:
            "\\text{In a navigation triangle, }a=80\\text{ m is opposite }35^\\circ.\\text{ Find }b\\text{ opposite }50^\\circ.",
          steps: [
            {
              explanation:
                "A matching side-angle pair is known, so the sine rule is appropriate.",
              latex: "\\frac{b}{\\sin50^\\circ}=\\frac{80}{\\sin35^\\circ}",
            },
            {
              explanation:
                "Solve for b and round to one decimal place.",
              latex: "b=\\frac{80\\sin50^\\circ}{\\sin35^\\circ}=106.8\\text{ m}",
            },
          ],
          finalAnswerLatex: "106.8\\text{ m}",
        },
      ],
      guidedPractice: [
        practicalChoice("y12s2-trig-g1", "A triangular park has two known sides and the included angle. Which rule is most appropriate for the third side?", "B", ["Sine rule", "Cosine rule", "Right-angle tangent only", "Ratio sharing"], "Two sides and the included angle match the cosine rule."),
        practicalChoice("y12s2-trig-g2", "A drone problem gives one side with its opposite angle and asks for another side. Which rule is most appropriate?", "A", ["Sine rule", "Cosine rule", "Speed formula", "Unit conversion"], "A matching side-angle pair points to the sine rule."),
        measurementAnswer("y12s2-trig-g3", "A triangular field has sides 30 m and 40 m with included angle 60 degrees. Use the cosine rule to find the third side to 1 decimal place.", "\\sqrt{30^2+40^2-2(30)(40)\\cos60^\\circ}", "36.1 m", ["36.1", "36.1m"]),
        practicalChoice("y12s2-trig-g4", "A student uses right-angle trigonometry in a triangle with angles 42, 58 and 80 degrees. What is the issue?", "C", ["The answer must be in kilometres", "The triangle is impossible", "There is no right angle", "The ratio must be simplified"], "Right-angle trigonometry needs a 90-degree angle."),
      ],
      independentPractice: [
        practicalChoice("y12s2-trig-i1", "A boat survey gives side 120 m opposite 42 degrees and asks for a side opposite 58 degrees. Which rule should be used?", "A", ["Sine rule", "Cosine rule", "Pythagoras only", "Fuel consumption"], "A known opposite side-angle pair is available."),
        measurementAnswer("y12s2-trig-i2", "A triangular paddock has sides 55 m and 70 m with included angle 40 degrees. Find the third side to 1 decimal place.", "\\sqrt{55^2+70^2-2(55)(70)\\cos40^\\circ}", "45.0 m", ["45", "45.0", "45 m", "45.0m"]),
        measurementAnswer("y12s2-trig-i3", "A tower guide rope forms a triangle where 90 m is opposite 35 degrees. Find the side opposite 48 degrees to 1 decimal place.", "\\frac{90\\sin48^\\circ}{\\sin35^\\circ}", "116.6 m", ["116.6", "116.6m"]),
        practicalChoice("y12s2-trig-i4", "In a triangle, the largest angle should be opposite:", "D", ["The shortest side", "The first side listed", "The included angle only", "The longest side"], "The largest side is opposite the largest angle."),
        practicalChoice("y12s2-trig-i5", "A non-right-angled triangle has all three sides known and an angle is required. Which rule is most appropriate?", "B", ["Sine rule first", "Cosine rule", "Speed formula", "Area formula only"], "Cosine rule can find an angle from three sides."),
      ],
      commonMistakes: [
        { mistake: "Using right-angled trigonometry when there is no right angle.", fix: "Check for a 90-degree angle before using SOH-CAH-TOA." },
        { mistake: "Choosing sine rule without a matching side-angle pair.", fix: "Use sine rule only when an opposite side-angle pair is known." },
        { mistake: "Missing that the known angle is included between two sides.", fix: "Use cosine rule for two sides and the included angle." },
        { mistake: "Accepting an unreasonable side length.", fix: "Check that the largest side is opposite the largest angle and units make sense." },
      ],
      masteryQuiz: [
        practicalChoice("y12s2-trig-m1", "A triangle has sides 48 m and 62 m with included angle 37 degrees. Which rule finds the third side?", "B", ["Sine rule", "Cosine rule", "Right-angle tangent", "Average speed"], "Two sides and included angle use cosine rule."),
        practicalChoice("y12s2-trig-m2", "A known side is paired with its opposite angle, and another side is required. Use:", "A", ["Sine rule", "Cosine rule", "Area formula", "Scale factor"], "This is a sine rule setup."),
        measurementAnswer("y12s2-trig-m3", "A triangular park has sides 20 m and 25 m with included angle 60 degrees. Find the third side to 1 decimal place.", "\\sqrt{20^2+25^2-2(20)(25)\\cos60^\\circ}", "22.9 m", ["22.9", "22.9m"]),
        measurementAnswer("y12s2-trig-m4", "A survey triangle has side 70 m opposite 40 degrees. Find the side opposite 55 degrees to 1 decimal place.", "\\frac{70\\sin55^\\circ}{\\sin40^\\circ}", "89.2 m", ["89.2", "89.2m"]),
        practicalChoice("y12s2-trig-m5", "A triangle has angles 50, 60 and 70 degrees. Right-angled trigonometry is:", "C", ["Appropriate because there are angles", "Always exact", "Not appropriate because there is no 90-degree angle", "The same as ratio sharing"], "There is no right angle."),
        practicalChoice("y12s2-trig-m6", "A cosine-rule side question needs:", "D", ["A frequency table", "A matching side-angle pair only", "A speed and time", "Two sides and the included angle"], "Cosine rule fits two sides and included angle."),
        measurementAnswer("y12s2-trig-m7", "A drone triangle has 100 m opposite 30 degrees. Find the side opposite 45 degrees to 1 decimal place.", "\\frac{100\\sin45^\\circ}{\\sin30^\\circ}", "141.4 m", ["141.4", "141.4m"]),
        practicalChoice("y12s2-trig-m8", "A side answer of -12 m in a triangle distance problem is:", "A", ["Unreasonable", "Always correct", "A bearing", "A ratio"], "Distances cannot be negative."),
        practicalChoice("y12s2-trig-m9", "A triangle has all three sides known and an angle is required. Use:", "B", ["Sine rule only", "Cosine rule", "Flow rate", "Map scale"], "Cosine rule can find an angle from three sides."),
        practicalChoice("y12s2-trig-m10", "Before choosing a trig rule, first identify:", "C", ["The student's name", "The calculator brand", "Known sides and angles", "The currency"], "Rule choice depends on the given sides and angles."),
      ],
    };
  }

  if (lesson.slug === "sine-rule-cosine-rule-area-triangle") {
    return {
      ...base,
      description:
        "Apply sine rule, cosine rule, and the triangular area formula to practical distance and land-area problems.",
      learningIntention:
        "Calculate practical side lengths, angles, and triangular areas using non-right-angled trigonometry.",
      successCriteria: [
        "Use sine rule for side and angle calculations when a matching pair is known.",
        "Use cosine rule for side and angle calculations in appropriate triangles.",
        "Use A = 1/2 ab sin C for area when two sides and the included angle are known.",
        "Round and report answers with sensible units.",
      ],
      teaching: {
        paragraphs: [
          "The sine rule, cosine rule, and area formula are the main tools for non-right-angled triangle problems. The correct formula depends on what information is given.",
          "The sine rule is useful when a side and its opposite angle are known. It can find another side or another angle.",
          "The cosine rule is useful for finding a side from two sides and the included angle, or finding an angle from three sides.",
          "The area formula A = 1/2 ab sin C finds the area when two sides and the included angle are known. This is common in land, park, field, and survey contexts.",
        ],
        latexBlocks: [
          "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}",
          "c^2=a^2+b^2-2ab\\cos C",
          "A=\\frac{1}{2}ab\\sin C",
        ],
      },
      workedExamples: [
        {
          title: "Use sine rule in a distance context",
          questionLatex:
            "\\text{A boat is }80\\text{ m from point A, opposite }35^\\circ.\\text{ Find the side opposite }50^\\circ.",
          steps: [
            {
              explanation: "Set up the sine rule using the known matching pair.",
              latex: "\\frac{x}{\\sin50^\\circ}=\\frac{80}{\\sin35^\\circ}",
            },
            {
              explanation: "Solve for x.",
              latex: "x=106.8\\text{ m}",
            },
          ],
          finalAnswerLatex: "106.8\\text{ m}",
        },
        {
          title: "Use cosine rule in a distance context",
          questionLatex:
            "\\text{Two tracks of }48\\text{ m and }62\\text{ m meet at }37^\\circ.",
          steps: [
            {
              explanation:
                "The unknown distance between the track ends is opposite the included angle.",
              latex: "c^2=48^2+62^2-2(48)(62)\\cos37^\\circ",
            },
            {
              explanation: "Take the square root.",
              latex: "c=37.3\\text{ m}",
            },
          ],
          finalAnswerLatex: "37.3\\text{ m}",
        },
        {
          title: "Find the area of a triangular park",
          questionLatex:
            "\\text{A park has sides }48\\text{ m and }62\\text{ m with included angle }37^\\circ.",
          steps: [
            {
              explanation:
                "Use the area formula for two sides and the included angle.",
              latex: "A=\\frac{1}{2}(48)(62)\\sin37^\\circ",
            },
            {
              explanation: "Calculate and round to the nearest square metre.",
              latex: "A=895\\text{ m}^2",
            },
          ],
          finalAnswerLatex: "895\\text{ m}^2",
        },
      ],
      guidedPractice: [
        measurementAnswer("y12s2-sca-g1", "A navigation triangle has side 60 m opposite 32 degrees. Find the side opposite 48 degrees to 1 decimal place.", "\\frac{60\\sin48^\\circ}{\\sin32^\\circ}", "84.1 m", ["84.1", "84.1m"]),
        measurementAnswer("y12s2-sca-g2", "A triangular park has sides 48 m and 62 m with included angle 37 degrees. Find its area to the nearest square metre.", "\\frac12(48)(62)\\sin37^\\circ", "895 m^2", ["895", "895m^2", "895 m2"]),
        practicalChoice("y12s2-sca-g3", "A triangle has three side lengths and an angle is required. Which formula is most appropriate?", "B", ["Sine rule", "Cosine rule", "Area formula only", "Speed formula"], "Cosine rule can find angles from three sides."),
        measurementAnswer("y12s2-sca-g4", "A field has sides 35 m and 50 m with included angle 60 degrees. Find the third side to 1 decimal place.", "\\sqrt{35^2+50^2-2(35)(50)\\cos60^\\circ}", "43.6 m", ["43.6", "43.6m"]),
      ],
      independentPractice: [
        measurementAnswer("y12s2-sca-i1", "A drone triangle has side 120 m opposite 42 degrees. Find the side opposite 58 degrees to 1 decimal place.", "\\frac{120\\sin58^\\circ}{\\sin42^\\circ}", "152.1 m", ["152.1", "152.1m"]),
        measurementAnswer("y12s2-sca-i2", "A triangular lot has sides 80 m and 95 m with included angle 52 degrees. Find the third side to 1 decimal place.", "\\sqrt{80^2+95^2-2(80)(95)\\cos52^\\circ}", "75.8 m", ["75.8", "75.8m"]),
        measurementAnswer("y12s2-sca-i3", "A triangular park has sides 30 m and 45 m with included angle 70 degrees. Find the area to the nearest square metre.", "\\frac12(30)(45)\\sin70^\\circ", "634 m^2", ["634", "634m^2", "634 m2"]),
        practicalChoice("y12s2-sca-i4", "Which information is needed for A = 1/2 ab sin C?", "A", ["Two sides and the included angle", "Only one side", "Speed and time", "A ratio and total only"], "The area formula uses two sides and their included angle."),
        practicalChoice("y12s2-sca-i5", "A student rounds every trig value to 1 decimal place before finishing. What is the risk?", "D", ["No risk", "The triangle disappears", "It proves causation", "The final answer may be less accurate"], "Rounding too early can affect the final answer."),
      ],
      commonMistakes: [
        { mistake: "Using the wrong angle in the area formula.", fix: "Use the included angle between the two known sides." },
        { mistake: "Using cosine rule when a matching sine-rule pair is simpler.", fix: "Look for a known side and its opposite angle." },
        { mistake: "Forgetting square root after finding c squared.", fix: "Take the square root to get the side length." },
        { mistake: "Leaving out units.", fix: "Use metres for length and square metres for area." },
      ],
      masteryQuiz: [
        measurementAnswer("y12s2-sca-m1", "A triangle has side 40 m opposite 30 degrees. Find the side opposite 45 degrees to 1 decimal place.", "\\frac{40\\sin45^\\circ}{\\sin30^\\circ}", "56.6 m", ["56.6", "56.6m"]),
        measurementAnswer("y12s2-sca-m2", "A triangular field has sides 25 m and 40 m with included angle 50 degrees. Find the third side to 1 decimal place.", "\\sqrt{25^2+40^2-2(25)(40)\\cos50^\\circ}", "31.2 m", ["31.2", "31.2m"]),
        measurementAnswer("y12s2-sca-m3", "A triangular garden has sides 20 m and 30 m with included angle 60 degrees. Find the area to the nearest square metre.", "\\frac12(20)(30)\\sin60^\\circ", "260 m^2", ["260", "260m^2", "260 m2"]),
        practicalChoice("y12s2-sca-m4", "The sine rule is most useful when:", "A", ["A matching side-angle pair is known", "Only a speed is known", "Only area is required", "No angles are known"], "Sine rule relies on opposite side-angle pairs."),
        practicalChoice("y12s2-sca-m5", "The cosine rule is most useful for a side when:", "C", ["There is a frequency table", "Only ratios are known", "Two sides and the included angle are known", "The triangle is a box plot"], "Cosine rule fits SAS information."),
        measurementAnswer("y12s2-sca-m6", "A park triangle has sides 50 m and 70 m with included angle 40 degrees. Find its area to the nearest square metre.", "\\frac12(50)(70)\\sin40^\\circ", "1125 m^2", ["1125", "1,125", "1125m^2", "1125 m2"]),
        measurementAnswer("y12s2-sca-m7", "A rescue boat triangle has side 90 m opposite 35 degrees. Find the side opposite 55 degrees to 1 decimal place.", "\\frac{90\\sin55^\\circ}{\\sin35^\\circ}", "128.5 m", ["128.5", "128.5m"]),
        measurementAnswer("y12s2-sca-m8", "A triangular sign has sides 1.2 m and 1.5 m with included angle 45 degrees. Find its area to 2 decimal places.", "\\frac12(1.2)(1.5)\\sin45^\\circ", "0.64 m^2", ["0.64", "0.64m^2", "0.64 m2"]),
        practicalChoice("y12s2-sca-m9", "If a side is found using c^2 = 144, the side length is:", "B", ["144", "12", "72", "-144"], "Take the square root of c squared."),
        practicalChoice("y12s2-sca-m10", "An area answer for a triangular field should use:", "D", ["metres only", "kilometres per hour", "degrees", "square metres"], "Area is measured in square units."),
      ],
    };
  }

  if (lesson.slug === "ratios-rates-unit-conversions") {
    return {
      ...base,
      description:
        "Use ratios, sharing, rates, speed, fuel use, flow rates, map scales, and practical unit conversions.",
      learningIntention:
        "Solve practical ratio, rate, and unit conversion questions using clear units and sensible methods.",
      successCriteria: [
        "Simplify and use ratios in practical sharing problems.",
        "Calculate average speed using consistent time units.",
        "Convert units in rates such as km/h, L/min, L per 100 km, and map scale.",
        "Interpret practical rates and choose reasonable answers.",
      ],
      teaching: {
        paragraphs: [
          "A ratio compares quantities of the same kind. In a sharing problem, add the parts in the ratio, find the value of one part, then multiply by the required number of parts.",
          "A rate compares different units, such as kilometres per hour, litres per minute, dollars per kilogram, or litres per 100 kilometres.",
          "Speed is a rate. Before calculating speed, convert time into hours if the answer must be in km/h.",
          "Unit conversions are part of many rate questions. Minutes to hours, metres to kilometres, litres to millilitres, and map scale conversions all need careful units.",
        ],
        latexBlocks: [
          "\\text{speed}=\\frac{\\text{distance}}{\\text{time}}",
          "\\text{one part}=\\frac{\\text{total}}{\\text{sum of ratio parts}}",
          "\\text{fuel use per }100\\text{ km}=\\frac{\\text{litres}}{\\text{distance}}\\times100",
        ],
      },
      workedExamples: [
        {
          title: "Share an amount in a ratio",
          questionLatex:
            "\\text{A prize of }\\$240\\text{ is shared in the ratio }3:5.",
          steps: [
            {
              explanation: "Add the parts in the ratio.",
              latex: "3+5=8",
            },
            {
              explanation: "Find one part and then each share.",
              latex: "240\\div8=30,\\quad 3\\times30=90,\\quad 5\\times30=150",
            },
          ],
          finalAnswerLatex: "\\$90\\text{ and }\\$150",
        },
        {
          title: "Calculate average speed with time conversion",
          questionLatex:
            "\\text{A car travels }168\\text{ km in }2\\text{ h }20\\text{ min.}",
          steps: [
            {
              explanation: "Convert 20 minutes to one third of an hour.",
              latex: "2\\text{ h }20\\text{ min}=2+\\frac{20}{60}=2.333\\ldots\\text{ h}",
            },
            {
              explanation: "Divide distance by time.",
              latex: "168\\div2.333\\ldots=72",
            },
          ],
          finalAnswerLatex: "72\\text{ km/h}",
        },
        {
          title: "Convert and compare a practical rate",
          questionLatex:
            "\\text{A pump fills }450\\text{ L in }15\\text{ min.}",
          steps: [
            {
              explanation: "Divide litres by minutes.",
              latex: "450\\div15=30",
            },
          ],
          finalAnswerLatex: "30\\text{ L/min}",
        },
      ],
      guidedPractice: [
        measurementAnswer("y12s2-rate-g1", "A prize of 240 dollars is shared in the ratio 3:5. What is the larger share?", "240\\div8\\times5", "$150", ["150", "150.00", "$150.00"]),
        measurementAnswer("y12s2-rate-g2", "A car travels 168 km in 2 h 20 min. Find the average speed in km/h.", "168\\div(2+20/60)", "72 km/h", ["72", "72km/h", "72 kmh"]),
        measurementAnswer("y12s2-rate-g3", "A pump fills 450 L in 15 min. Find the flow rate in L/min.", "450\\div15", "30 L/min", ["30", "30L/min", "30 L per min"]),
        practicalChoice("y12s2-rate-g4", "A map scale is 1:25000. A map distance of 4 cm represents:", "B", ["100 m", "1 km", "10 km", "25 km"], "4 cm times 25000 is 100000 cm, which is 1 km."),
      ],
      independentPractice: [
        measurementAnswer("y12s2-rate-i1", "A drink mix uses cordial and water in the ratio 1:4. If 750 mL is made, how much water is used?", "750\\div5\\times4", "600 mL", ["600", "600mL", "600 ml"]),
        measurementAnswer("y12s2-rate-i2", "A bus travels 90 km in 1 h 30 min. Find its average speed in km/h.", "90\\div1.5", "60 km/h", ["60", "60km/h", "60 kmh"]),
        measurementAnswer("y12s2-rate-i3", "A car uses 36 L of fuel for 480 km. Find the fuel consumption in L/100 km.", "36\\div480\\times100", "7.5 L/100 km", ["7.5", "7.50", "7.5L/100km"]),
        measurementAnswer("y12s2-rate-i4", "A tap fills 2.4 kL in 40 min. Convert 2.4 kL to litres.", "2.4\\times1000", "2400 L", ["2400", "2,400", "2400L", "2400 litres"]),
        practicalChoice("y12s2-rate-i5", "Which is a rate rather than a ratio?", "C", ["3:5 cordial to water", "2 red tiles to 7 blue tiles", "72 km/h", "4 parts paint to 1 part thinner"], "km/h compares distance with time."),
      ],
      commonMistakes: [
        { mistake: "Not converting minutes to hours before finding km/h.", fix: "Convert time to hours when the answer is in kilometres per hour." },
        { mistake: "Using the inverse ratio.", fix: "Check which part of the ratio the question asks for." },
        { mistake: "Confusing ratios and rates.", fix: "Ratios compare same-type quantities; rates compare different units." },
        { mistake: "Forgetting to convert units in scale and flow questions.", fix: "Write the units beside each calculation step." },
      ],
      masteryQuiz: [
        measurementAnswer("y12s2-rate-m1", "A 360 dollar cost is shared in the ratio 2:3. Find the larger share.", "360\\div5\\times3", "$216", ["216", "216.00", "$216.00"]),
        measurementAnswer("y12s2-rate-m2", "A car travels 150 km in 2 h 30 min. Find its average speed.", "150\\div2.5", "60 km/h", ["60", "60km/h", "60 kmh"]),
        measurementAnswer("y12s2-rate-m3", "A hose delivers 720 L in 24 min. Find the flow rate.", "720\\div24", "30 L/min", ["30", "30L/min", "30 L per min"]),
        measurementAnswer("y12s2-rate-m4", "A vehicle uses 45 L to travel 600 km. Find fuel use in L/100 km.", "45\\div600\\times100", "7.5 L/100 km", ["7.5", "7.50", "7.5L/100km"]),
        measurementAnswer("y12s2-rate-m5", "A map scale is 1:50000. A 3 cm map distance represents how many kilometres?", "3\\times50000\\div100000", "1.5 km", ["1.5", "1.50", "1.5km"]),
        practicalChoice("y12s2-rate-m6", "A student calculates speed using 2 h 30 min as 2.30 h. What is the mistake?", "A", ["30 min is 0.5 h, not 0.30 h", "Speed cannot use time", "Distance must be in metres only", "The ratio must be 2:30"], "Thirty minutes is half an hour."),
        practicalChoice("y12s2-rate-m7", "A ratio 4:1 for paint to thinner means:", "C", ["4 parts thinner to 1 part paint", "4 litres per hour", "4 parts paint to 1 part thinner", "4 kilometres in 1 minute"], "Order matters in a ratio."),
        measurementAnswer("y12s2-rate-m8", "A 2.5 L bottle contains how many millilitres?", "2.5\\times1000", "2500 mL", ["2500", "2,500", "2500mL", "2500 ml"]),
        measurementAnswer("y12s2-rate-m9", "A cyclist travels 42 km in 1 h 45 min. Find average speed in km/h.", "42\\div1.75", "24 km/h", ["24", "24km/h", "24 kmh"]),
        practicalChoice("y12s2-rate-m10", "Which comparison is most reasonable for fuel efficiency?", "D", ["Total litres only", "Colour of the car", "Distance only", "Litres per 100 km"], "Fuel efficiency compares fuel used with distance."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed HSC-style measurement questions involving non-right-angled trigonometry, ratios, rates, scale, speed, and unit conversion.",
    learningIntention:
      "Apply non-right-angled trigonometry, ratios, rates, and unit conversions to practical exam-style problems.",
    successCriteria: [
      "Select sine rule, cosine rule, or area formula from the information given.",
      "Calculate side lengths, triangular areas, rates, speeds, ratio shares, and converted units.",
      "Use sensible rounding and units.",
      "Recognise common errors in rule selection and rate conversion.",
    ],
    teaching: {
      paragraphs: [
        "Mixed Standard 2 measurement questions often combine choosing a method with a short calculation. Begin by identifying whether the question is about a triangle, a ratio, a rate, a scale, or a conversion.",
        "For non-right-angled triangles, use sine rule when there is a matching side-angle pair, cosine rule for two sides and included angle, and A = 1/2 ab sin C for area.",
        "For rates, make the units consistent before dividing. For example, convert minutes to hours before finding speed in km/h.",
        "For ratio sharing, add the ratio parts, find one part, and multiply by the part requested. Keep track of order and units.",
      ],
      latexBlocks: [
        "\\frac{a}{\\sin A}=\\frac{b}{\\sin B},\\quad c^2=a^2+b^2-2ab\\cos C",
        "A=\\frac{1}{2}ab\\sin C",
        "\\text{speed}=\\frac{\\text{distance}}{\\text{time}}",
      ],
    },
    workedExamples: [
      {
        title: "Choose the correct triangle formula",
        questionLatex:
          "\\text{A triangular park has two known sides and the included angle.}",
        steps: [
          {
            explanation:
              "Two sides and the included angle match the cosine rule for a third side.",
          },
        ],
        finalAnswerLatex: "\\text{Use cosine rule.}",
      },
      {
        title: "Calculate speed from a timetable-style context",
        questionLatex:
          "\\text{A car travels }168\\text{ km in }2\\text{ h }20\\text{ min.}",
        steps: [
          {
            explanation: "Convert the time to hours.",
            latex: "2\\text{ h }20\\text{ min}=2+20/60=2.333\\ldots\\text{ h}",
          },
          {
            explanation: "Divide distance by time.",
            latex: "168\\div2.333\\ldots=72",
          },
        ],
        finalAnswerLatex: "72\\text{ km/h}",
      },
      {
        title: "Ratio share in context",
        questionLatex:
          "\\text{A }\\$360\\text{ repair cost is shared in the ratio }2:3.",
        steps: [
          {
            explanation: "There are 5 parts altogether.",
            latex: "2+3=5",
          },
          {
            explanation: "The larger share is 3 parts.",
            latex: "360\\div5\\times3=216",
          },
        ],
        finalAnswerLatex: "\\$216",
      },
    ],
    guidedPractice: [
      practicalChoice("y12s2-rate-exam-g1", "A drone is observed from two points and a matching side-angle pair is known. Which rule is most likely?", "A", ["Sine rule", "Cosine rule only", "Speed formula", "Fuel rate"], "A matching side-angle pair suggests sine rule."),
      measurementAnswer("y12s2-rate-exam-g2", "A field has sides 30 m and 45 m with included angle 70 degrees. Find the area to the nearest square metre.", "\\frac12(30)(45)\\sin70^\\circ", "634 m^2", ["634", "634m^2", "634 m2"]),
      measurementAnswer("y12s2-rate-exam-g3", "A car travels 120 km in 1 h 30 min. Find average speed.", "120\\div1.5", "80 km/h", ["80", "80km/h", "80 kmh"]),
      measurementAnswer("y12s2-rate-exam-g4", "A 300 dollar cost is shared in the ratio 2:3. Find the smaller share.", "300\\div5\\times2", "$120", ["120", "120.00", "$120.00"]),
    ],
    independentPractice: [
      measurementAnswer("y12s2-rate-exam-i1", "A triangular park has sides 35 m and 50 m with included angle 60 degrees. Find the third side to 1 decimal place.", "\\sqrt{35^2+50^2-2(35)(50)\\cos60^\\circ}", "43.6 m", ["43.6", "43.6m"]),
      measurementAnswer("y12s2-rate-exam-i2", "A boat triangle has side 80 m opposite 35 degrees. Find the side opposite 50 degrees to 1 decimal place.", "\\frac{80\\sin50^\\circ}{\\sin35^\\circ}", "106.8 m", ["106.8", "106.8m"]),
      measurementAnswer("y12s2-rate-exam-i3", "A ute uses 32 L of fuel for 400 km. Find fuel consumption in L/100 km.", "32\\div400\\times100", "8 L/100 km", ["8", "8.0", "8L/100km"]),
      practicalChoice("y12s2-rate-exam-i4", "A map scale is 1:25000 and the map distance is 4 cm. Which real distance is correct?", "B", ["100 m", "1 km", "10 km", "25 km"], "4 cm at 1:25000 is 100000 cm, or 1 km."),
      practicalChoice("y12s2-rate-exam-i5", "A speed answer of 168 km/h for 168 km in 2 h 20 min is unreasonable because:", "C", ["The distance is too small", "No units are used", "The time was treated as 1 hour", "The car travelled backwards"], "The time is more than 2 hours, so speed must be less than 84 km/h."),
    ],
    commonMistakes: [
      { mistake: "Using sine rule when cosine rule is required.", fix: "Check whether two sides and the included angle are given." },
      { mistake: "Forgetting to convert minutes to hours.", fix: "Convert time units before calculating km/h." },
      { mistake: "Using the wrong part of a ratio.", fix: "Match the requested share to the correct ratio part." },
      { mistake: "Dropping units from final answers.", fix: "Include units such as m, m^2, km/h, L/min, or mL." },
    ],
    masteryQuiz: [
      practicalChoice("y12s2-rate-exam-m1", "A triangle has two sides and the included angle. To find the third side, use:", "B", ["Sine rule", "Cosine rule", "Speed formula", "Ratio sharing"], "This is a cosine-rule setup."),
      measurementAnswer("y12s2-rate-exam-m2", "A side 60 m is opposite 32 degrees. Find the side opposite 48 degrees to 1 decimal place.", "\\frac{60\\sin48^\\circ}{\\sin32^\\circ}", "84.1 m", ["84.1", "84.1m"]),
      measurementAnswer("y12s2-rate-exam-m3", "A triangular field has sides 20 m and 30 m with included angle 60 degrees. Find the area to the nearest square metre.", "\\frac12(20)(30)\\sin60^\\circ", "260 m^2", ["260", "260m^2", "260 m2"]),
      measurementAnswer("y12s2-rate-exam-m4", "A bus travels 180 km in 3 h. Find average speed.", "180\\div3", "60 km/h", ["60", "60km/h", "60 kmh"]),
      measurementAnswer("y12s2-rate-exam-m5", "A 240 dollar cost is shared in the ratio 3:5. Find the smaller share.", "240\\div8\\times3", "$90", ["90", "90.00", "$90.00"]),
      measurementAnswer("y12s2-rate-exam-m6", "A tap fills 600 L in 20 min. Find the flow rate.", "600\\div20", "30 L/min", ["30", "30L/min", "30 L per min"]),
      measurementAnswer("y12s2-rate-exam-m7", "A map scale is 1:50000. A map distance of 2 cm represents how many kilometres?", "2\\times50000\\div100000", "1 km", ["1", "1.0", "1km"]),
      practicalChoice("y12s2-rate-exam-m8", "A student uses 2.20 h for 2 h 20 min. The issue is:", "A", ["20 min is one third of an hour, not 0.20 h", "Speed cannot be calculated", "Distance must be in metres", "The angle is included"], "20 minutes is 20/60 hours."),
      practicalChoice("y12s2-rate-exam-m9", "A ratio compares:", "C", ["Only time and distance", "Only angles", "Quantities in parts", "Only litres per minute"], "Ratios compare quantities in parts."),
      practicalChoice("y12s2-rate-exam-m10", "Which answer unit is appropriate for triangular field area?", "D", ["m", "km/h", "L/min", "m^2"], "Area uses square units."),
    ],
  };
}

function year12Standard2AlgebraLessonOverride(
  course: CoursePathwaySeed,
  unit: CourseUnitSeed,
  lesson: CourseLessonSeed
): Partial<ExplicitLesson> | null {
  if (
    course.slug !== "year-12-standard-2" ||
    unit.slug !== "algebraic-relationships"
  ) {
    return null;
  }

  const base = {
    masteryPassMark: 0.8,
  };

  if (lesson.slug === "linear-relationships-modelling") {
    return {
      ...base,
      description:
        "Build and interpret linear models from fixed costs, starting values, rates of change, tables, and practical equations.",
      learningIntention:
        "Use linear equations, tables, gradients, and intercepts to model practical situations.",
      successCriteria: [
        "Write a linear model from a fixed amount and constant rate.",
        "Interpret gradient as a rate of change in context.",
        "Interpret the intercept as a starting value or fixed cost when appropriate.",
        "Use a linear model or table to calculate and compare values.",
      ],
      teaching: {
        paragraphs: [
          "A linear model has a constant rate of change. In practical problems, this might be a fixed joining fee plus a weekly cost, a taxi flagfall plus a cost per kilometre, or a savings account growing by the same amount each week.",
          "The gradient is the rate of change. In C = 40 + 18w, the gradient 18 means the cost increases by 18 dollars each week.",
          "The intercept is the value when the input is 0. In a cost model, it often represents a fixed fee or starting amount.",
          "Tables can reveal linear patterns. If the output increases by the same amount whenever the input increases by 1, the relationship is linear.",
        ],
        latexBlocks: [
          "y=mx+b",
          "\\text{gradient}=\\frac{\\text{change in output}}{\\text{change in input}}",
          "\\text{linear model}=\\text{starting value}+\\text{rate}\\times\\text{input}",
        ],
      },
      workedExamples: [
        {
          title: "Build a linear model from a fixed fee and rate",
          questionLatex:
            "\\text{A gym charges }\\$40\\text{ plus }\\$18\\text{ per week.}",
          steps: [
            {
              explanation:
                "The fixed fee is paid when w = 0, so it is the intercept.",
              latex: "40",
            },
            {
              explanation:
                "The weekly cost is the gradient.",
              latex: "18w",
            },
          ],
          finalAnswerLatex: "C=40+18w",
        },
        {
          title: "Interpret gradient and intercept",
          questionLatex:
            "\\text{A phone plan is }C=25+0.12g\\text{, where }g\\text{ is extra GB.}",
          steps: [
            {
              explanation:
                "The intercept 25 is the base monthly cost before extra data.",
            },
            {
              explanation:
                "The gradient 0.12 is the cost per extra GB.",
            },
          ],
          finalAnswerLatex:
            "\\$25\\text{ base cost and }\\$0.12\\text{ per extra GB.}",
        },
        {
          title: "Use a linear model",
          questionLatex:
            "\\text{A hire cost is }C=35+12h.\\text{ Find the cost for }4\\text{ hours.}",
          steps: [
            {
              explanation:
                "Substitute h = 4 into the model.",
              latex: "C=35+12(4)",
            },
            {
              explanation: "Calculate the total cost.",
              latex: "C=83",
            },
          ],
          finalAnswerLatex: "\\$83",
        },
      ],
      guidedPractice: [
        linearAnswer("y12s2-lin-g1", "A gym charges a 40 dollar joining fee plus 18 dollars per week. Write a model for total cost C after w weeks.", "C=40+18w", "C = 40 + 18w", ["C=40+18w", "c=40+18w", "C=18w+40", "c=18w+40"]),
        practicalChoice("y12s2-lin-g2", "A taxi fare is F = 6 + 2.40d. What does 6 represent?", "A", ["The fixed starting fare", "The cost per kilometre", "The distance travelled", "The total fare for 6 km"], "The intercept is the starting fare when d = 0."),
        moneyAnswer("y12s2-lin-g3", "A hire model is C = 35 + 12h. Find the cost for 3 hours.", "35+12(3)", "71"),
        practicalChoice("y12s2-lin-g4", "A table has costs 40, 58, 76, 94 for weeks 0, 1, 2, 3. What is the weekly increase?", "B", ["40 dollars", "18 dollars", "58 dollars", "94 dollars"], "The cost rises by 18 each week."),
      ],
      independentPractice: [
        linearAnswer("y12s2-lin-i1", "A bike hire costs 22 dollars plus 9 dollars per hour. Write the total cost C for h hours.", "C=22+9h", "C = 22 + 9h", ["C=22+9h", "c=22+9h", "C=9h+22", "c=9h+22"]),
        practicalChoice("y12s2-lin-i2", "In S = 120 + 25w for a savings plan, the gradient 25 represents:", "C", ["Starting savings", "Number of weeks", "Dollars saved per week", "Total savings after 25 weeks"], "The gradient is the weekly increase."),
        moneyAnswer("y12s2-lin-i3", "A taxi fare is F = 6 + 2.40d. Find the fare for 10 km.", "6+2.40(10)", "30"),
        linearAnswer("y12s2-lin-i4", "A water tank starts with 500 L and drains by 20 L each minute. Write V after t minutes.", "V=500-20t", "V = 500 - 20t", ["V=500-20t", "v=500-20t", "V=-20t+500", "v=-20t+500"]),
        practicalChoice("y12s2-lin-i5", "In V = 500 - 20t, what does the negative gradient mean?", "D", ["The tank starts empty", "Time is negative", "The model is quadratic", "The volume decreases by 20 L per minute"], "A negative gradient shows a decrease."),
      ],
      commonMistakes: [
        { mistake: "Confusing gradient and intercept.", fix: "The intercept is the starting value; the gradient is the rate of change." },
        { mistake: "Writing the fixed fee as the coefficient of the variable.", fix: "The fixed amount stands alone in the model." },
        { mistake: "Substituting into the wrong variable.", fix: "Match the input variable to the quantity in the question." },
        { mistake: "Ignoring units in interpretation.", fix: "State rates such as dollars per week, dollars per km, or litres per minute." },
      ],
      masteryQuiz: [
        linearAnswer("y12s2-lin-m1", "A gym charges 40 dollars plus 18 dollars per week. Write C after w weeks.", "C=40+18w", "C = 40 + 18w", ["C=40+18w", "c=40+18w", "C=18w+40", "c=18w+40"]),
        practicalChoice("y12s2-lin-m2", "In C = 40 + 18w, the 40 represents:", "A", ["Joining fee", "Weekly cost", "Number of weeks", "Gradient only"], "It is the starting cost when w = 0."),
        practicalChoice("y12s2-lin-m3", "In C = 40 + 18w, the 18 represents:", "B", ["Joining fee", "Cost per week", "Total cost", "Number of weeks"], "The coefficient of w is the weekly rate."),
        moneyAnswer("y12s2-lin-m4", "A hire company charges C = 30 + 15h. Find C for 4 hours.", "30+15(4)", "90"),
        linearAnswer("y12s2-lin-m5", "A savings account starts at 200 dollars and increases by 35 dollars per week. Write S after w weeks.", "S=200+35w", "S = 200 + 35w", ["S=200+35w", "s=200+35w", "S=35w+200"]),
        moneyAnswer("y12s2-lin-m6", "Using S = 200 + 35w, find S after 6 weeks.", "200+35(6)", "410"),
        practicalChoice("y12s2-lin-m7", "A table increases by the same amount each step. The relationship is likely:", "C", ["Quadratic", "Reciprocal", "Linear", "Random"], "Constant first difference suggests linear."),
        linearAnswer("y12s2-lin-m8", "A phone plan costs 25 dollars plus 0.12 dollars per extra GB. Write C for g extra GB.", "C=25+0.12g", "C = 25 + 0.12g", ["C=25+0.12g", "c=25+0.12g", "C=0.12g+25"]),
        practicalChoice("y12s2-lin-m9", "In F = 6 + 2.40d, the gradient is measured in:", "D", ["Dollars only", "Kilometres only", "Hours", "Dollars per kilometre"], "The fare changes by dollars for each kilometre."),
        moneyAnswer("y12s2-lin-m10", "A weekly cost model is C = 80 + 22w. Find C when w = 5.", "80+22(5)", "190"),
      ],
    };
  }

  if (lesson.slug === "non-linear-relationships-graphs") {
    return {
      ...base,
      description:
        "Interpret and evaluate non-linear models, including quadratic height and area models, graph features, and context restrictions.",
      learningIntention:
        "Recognise and use non-linear relationships in practical graph and modelling contexts.",
      successCriteria: [
        "Recognise when a relationship is not linear.",
        "Evaluate a quadratic or other simple non-linear model in context.",
        "Interpret initial values, intercepts, and maximum or minimum values from a model or graph description.",
        "Apply context restrictions such as non-negative time or distance.",
      ],
      teaching: {
        paragraphs: [
          "A non-linear relationship does not have a constant rate of change. Its graph is not a straight line.",
          "Quadratic models often appear in height, area, revenue, and projectile contexts. A parabola can have a maximum or minimum turning point.",
          "The initial value is the output when the input is 0. In h = -5t^2 + 20t + 1.5, the initial height is 1.5 m.",
          "Context restrictions matter. Time, length, and distance usually cannot be negative, even if an algebraic equation has a negative solution.",
        ],
        latexBlocks: [
          "h=-5t^2+20t+1.5",
          "\\text{initial value}=\\text{output when input}=0",
          "\\text{linear: constant first difference; non-linear: changing rate}",
        ],
      },
      workedExamples: [
        {
          title: "Evaluate a quadratic model",
          questionLatex:
            "\\text{A ball's height is }h=-5t^2+20t+1.5.\\text{ Find }h\\text{ when }t=2.",
          steps: [
            {
              explanation: "Substitute t = 2 into the model.",
              latex: "h=-5(2)^2+20(2)+1.5",
            },
            {
              explanation: "Calculate the height.",
              latex: "h=21.5",
            },
          ],
          finalAnswerLatex: "21.5\\text{ m}",
        },
        {
          title: "Interpret a maximum height",
          questionLatex:
            "\\text{A graph of a ball's height has vertex }(2,21.5).",
          steps: [
            {
              explanation:
                "The vertex of a downward-opening height parabola is the maximum point.",
            },
            {
              explanation:
                "The y-value gives the maximum height.",
            },
          ],
          finalAnswerLatex:
            "\\text{Maximum height is }21.5\\text{ m at }2\\text{ s.}",
        },
        {
          title: "Identify why a relationship is not linear",
          questionLatex:
            "\\begin{array}{c|c} x&0&1&2&3\\\\ y&1&4&9&16 \\end{array}",
          steps: [
            {
              explanation:
                "Check the first differences.",
              latex: "4-1=3,\\quad 9-4=5,\\quad 16-9=7",
            },
            {
              explanation:
                "The differences are not constant.",
            },
          ],
          finalAnswerLatex: "\\text{The relationship is non-linear.}",
        },
      ],
      guidedPractice: [
        measurementAnswer("y12s2-nonlin-g1", "A ball's height is h = -5t^2 + 20t + 1.5. Find the initial height.", "h(0)=1.5", "1.5 m", ["1.5", "1.50", "1.5m"]),
        measurementAnswer("y12s2-nonlin-g2", "Using h = -5t^2 + 20t + 1.5, find h when t = 2.", "-5(2)^2+20(2)+1.5", "21.5 m", ["21.5", "21.50", "21.5m"]),
        practicalChoice("y12s2-nonlin-g3", "A graph is a parabola with vertex (3, 40). What does 40 most likely represent in a maximum-height context?", "B", ["Initial time", "Maximum height", "Gradient", "x-intercept"], "The y-value of the vertex is the maximum height."),
        practicalChoice("y12s2-nonlin-g4", "A table has y-values 2, 5, 10, 17 for equal x-steps. Why is it not linear?", "C", ["The values are positive", "There is an intercept", "The first differences are not constant", "It has units"], "Linear tables have constant first differences."),
      ],
      independentPractice: [
        measurementAnswer("y12s2-nonlin-i1", "A revenue model is R = -2p^2 + 40p. Find R when p = 5.", "-2(5)^2+40(5)", "$150", ["150", "150.00", "$150.00"]),
        measurementAnswer("y12s2-nonlin-i2", "A ball's height is h = -4t^2 + 16t + 2. Find the initial height.", "h(0)=2", "2 m", ["2", "2.0", "2m"]),
        practicalChoice("y12s2-nonlin-i3", "The graph of A = s^2 for square area is not linear because:", "A", ["Area changes by increasing amounts as side length increases", "It has no input", "It is a straight line", "Area cannot be modelled"], "Squaring creates a changing rate."),
        practicalChoice("y12s2-nonlin-i4", "A model gives t = -3 seconds as one solution for time. In context this should usually be:", "D", ["Chosen first", "Converted to dollars", "Treated as the maximum", "Rejected because time cannot be negative"], "Negative time is not meaningful in most practical contexts."),
        measurementAnswer("y12s2-nonlin-i5", "A graph description says a quadratic cost has minimum point (4, 120). What is the minimum cost?", "y=120", "$120", ["120", "120.00", "$120.00"]),
      ],
      commonMistakes: [
        { mistake: "Treating every table as linear.", fix: "Check whether first differences are constant." },
        { mistake: "Interpreting the x-intercept as the starting value.", fix: "The starting value is the y-intercept when x = 0." },
        { mistake: "Ignoring negative values that are impossible in context.", fix: "Reject negative time, distance, or length unless the context allows it." },
        { mistake: "Forgetting to square the input in a quadratic model.", fix: "Apply powers before multiplication and addition." },
      ],
      masteryQuiz: [
        measurementAnswer("y12s2-nonlin-m1", "A ball's height is h = -5t^2 + 20t + 1.5. What is the initial height?", "h(0)=1.5", "1.5 m", ["1.5", "1.50", "1.5m"]),
        measurementAnswer("y12s2-nonlin-m2", "Using h = -5t^2 + 20t + 1.5, find h when t = 1.", "-5(1)^2+20(1)+1.5", "16.5 m", ["16.5", "16.50", "16.5m"]),
        practicalChoice("y12s2-nonlin-m3", "A parabola opening downward has vertex (2, 21.5). In a height model, this is the:", "A", ["Maximum height", "Starting time only", "Gradient", "Linear rate"], "A downward parabola has a maximum at its vertex."),
        practicalChoice("y12s2-nonlin-m4", "A graph that curves is generally:", "B", ["Linear", "Non-linear", "A fixed fee", "A constant gradient line"], "A curve is non-linear."),
        practicalChoice("y12s2-nonlin-m5", "A table has equal x-steps and y-values 3, 8, 15, 24. The first differences are:", "C", ["Constant", "3, 3, 3", "5, 7, 9", "Negative only"], "The differences increase."),
        measurementAnswer("y12s2-nonlin-m6", "A profit model is P = -x^2 + 12x. Find P when x = 4.", "-4^2+12(4)", "$32", ["32", "32.00", "$32.00"]),
        practicalChoice("y12s2-nonlin-m7", "A solution x = -5 metres in a length context is:", "D", ["Always correct", "A maximum", "The y-intercept", "Not meaningful"], "Lengths cannot be negative."),
        measurementAnswer("y12s2-nonlin-m8", "A square garden has area A = s^2. Find A when s = 6 m.", "6^2", "36 m^2", ["36", "36m^2", "36 m2"]),
        practicalChoice("y12s2-nonlin-m9", "In h = -5t^2 + 20t + 1.5, the constant 1.5 represents:", "A", ["Initial height", "Maximum time", "Gradient", "Final height always"], "At t = 0, h = 1.5."),
        practicalChoice("y12s2-nonlin-m10", "A quadratic model can be useful for:", "C", ["Only fixed fees", "Only straight-line costs", "Projectile height or area contexts", "Only ratio sharing"], "Quadratics commonly model curved height or area relationships."),
      ],
    };
  }

  if (lesson.slug === "simultaneous-equations-context") {
    return {
      ...base,
      description:
        "Solve and interpret pairs of practical models, including equal-cost points and option comparisons.",
      learningIntention:
        "Use simultaneous equations to find and interpret where two practical models are equal.",
      successCriteria: [
        "Recognise that an intersection means two models have the same value.",
        "Solve two linear models by setting them equal or using substitution.",
        "Interpret the solution in context with correct units.",
        "Choose which option is better before or after the intersection point.",
      ],
      teaching: {
        paragraphs: [
          "Simultaneous equations often compare two options, such as hire companies, phone plans, taxi fares, or savings plans.",
          "The solution is the point where both models are true at the same time. On a graph, this is the intersection point.",
          "For two cost models, the intersection tells when the costs are equal. Before or after that point, one option may be cheaper.",
          "Always interpret both values in context. If h = 6 and C = 120, that means the options cost the same after 6 hours at 120 dollars.",
        ],
        latexBlocks: [
          "A=30+15h,\\quad B=60+10h",
          "\\text{equal cost: }30+15h=60+10h",
          "\\text{intersection}=(\\text{input},\\text{common output})",
        ],
      },
      workedExamples: [
        {
          title: "Find when two hire companies cost the same",
          questionLatex:
            "A=30+15h,\\quad B=60+10h",
          steps: [
            {
              explanation: "Set the two costs equal.",
              latex: "30+15h=60+10h",
            },
            {
              explanation: "Solve for h.",
              latex: "5h=30\\Rightarrow h=6",
            },
            {
              explanation: "Substitute h = 6 into either model.",
              latex: "A=30+15(6)=120",
            },
          ],
          finalAnswerLatex: "\\text{Equal after }6\\text{ hours at }\\$120.",
        },
        {
          title: "Solve a contextual pair",
          questionLatex:
            "\\text{A savings balance is }S=200+30w.\\text{ A second is }T=80+50w.",
          steps: [
            {
              explanation: "Set the balances equal.",
              latex: "200+30w=80+50w",
            },
            {
              explanation: "Solve for w.",
              latex: "120=20w\\Rightarrow w=6",
            },
          ],
          finalAnswerLatex: "\\text{The balances are equal after }6\\text{ weeks.}",
        },
        {
          title: "Choose the cheaper option after the intersection",
          questionLatex:
            "A=30+15h,\\quad B=60+10h,\\quad h=8",
          steps: [
            {
              explanation: "Calculate each cost at 8 hours.",
              latex: "A=30+15(8)=150,\\quad B=60+10(8)=140",
            },
            {
              explanation: "The smaller cost is cheaper.",
            },
          ],
          finalAnswerLatex: "\\text{Company B is cheaper at }8\\text{ hours.}",
        },
      ],
      guidedPractice: [
        linearAnswer("y12s2-sim-g1", "Two hire companies are A = 30 + 15h and B = 60 + 10h. After how many hours are the costs equal?", "30+15h=60+10h", "6", ["6 h", "6 hours"]),
        moneyAnswer("y12s2-sim-g2", "For A = 30 + 15h, find the equal cost when h = 6.", "30+15(6)", "120"),
        practicalChoice("y12s2-sim-g3", "On a graph of two hire cost models, the intersection represents:", "B", ["The highest cost always", "The input where both costs are equal", "The fixed fee only", "The gradient of the first line"], "The intersection is where both models have the same value."),
        practicalChoice("y12s2-sim-g4", "For A = 30 + 15h and B = 60 + 10h, which company is cheaper at h = 8?", "D", ["A, because 15 is bigger", "They are equal", "Neither can be calculated", "B, because B = 140 and A = 150"], "Substitution shows B has the smaller cost."),
      ],
      independentPractice: [
        linearAnswer("y12s2-sim-i1", "Taxi A costs A = 6 + 2d and Taxi B costs B = 12 + 1.5d. Find d when costs are equal.", "6+2d=12+1.5d", "12", ["12 km", "12km"]),
        moneyAnswer("y12s2-sim-i2", "Using Taxi A: A = 6 + 2d, find the equal cost when d = 12.", "6+2(12)", "30"),
        linearAnswer("y12s2-sim-i3", "Plans P = 25 + 3g and Q = 40 + g are equal at what value of g?", "25+3g=40+g", "7.5", ["7.5 GB", "7.5GB"]),
        practicalChoice("y12s2-sim-i4", "If the solution is (6, 120) for hire time and cost, what does 120 mean?", "A", ["The common cost in dollars", "The number of hours", "The gradient", "The fixed fee"], "The output coordinate is the common cost."),
        practicalChoice("y12s2-sim-i5", "A student solves only A = 30 + 15h and never uses B = 60 + 10h. What is missing?", "C", ["A table", "A quadratic term", "The comparison with the second model", "A unit conversion"], "A simultaneous-equations question needs both models."),
      ],
      commonMistakes: [
        { mistake: "Substituting a value into only one model and calling it the intersection.", fix: "At an intersection, both models must have the same output." },
        { mistake: "Mixing up the input and output in the solution.", fix: "Interpret the x-value as the input and the y-value as the common value." },
        { mistake: "Choosing the wrong option after the intersection.", fix: "Substitute the given input into both models and compare outputs." },
        { mistake: "Forgetting context units.", fix: "State hours, kilometres, dollars, weeks, or GB as appropriate." },
      ],
      masteryQuiz: [
        linearAnswer("y12s2-sim-m1", "Hire costs A = 30 + 15h and B = 60 + 10h are equal after how many hours?", "30+15h=60+10h", "6", ["6 h", "6 hours"]),
        moneyAnswer("y12s2-sim-m2", "At h = 6, what is the equal cost for A = 30 + 15h?", "30+15(6)", "120"),
        linearAnswer("y12s2-sim-m3", "Phone plans P = 20 + 4g and Q = 50 + g are equal at what g?", "20+4g=50+g", "10", ["10 GB", "10GB"]),
        moneyAnswer("y12s2-sim-m4", "Using P = 20 + 4g, find the equal cost when g = 10.", "20+4(10)", "60"),
        practicalChoice("y12s2-sim-m5", "The intersection of two cost lines means:", "B", ["Both gradients are zero", "Both costs are equal", "The cheaper option is impossible", "The y-intercept is negative"], "The outputs are the same at the intersection."),
        practicalChoice("y12s2-sim-m6", "For A = 30 + 15h and B = 60 + 10h, which is cheaper at h = 4?", "A", ["A", "B", "They are equal", "Neither has a cost"], "A = 90 and B = 100."),
        practicalChoice("y12s2-sim-m7", "For A = 30 + 15h and B = 60 + 10h, which is cheaper at h = 8?", "C", ["A", "They are equal", "B", "Both are free"], "A = 150 and B = 140."),
        linearAnswer("y12s2-sim-m8", "Savings S = 200 + 30w and T = 80 + 50w are equal at what w?", "200+30w=80+50w", "6", ["6 weeks", "6weeks"]),
        practicalChoice("y12s2-sim-m9", "If a simultaneous solution gives negative time in a hire context, it should usually be:", "D", ["Chosen as the answer", "Converted to dollars", "Called a maximum", "Rejected as not meaningful"], "Negative time is not practical."),
        practicalChoice("y12s2-sim-m10", "Which method is suitable for comparing two linear cost models?", "A", ["Set the two expressions equal", "Use only the first expression", "Find the area under a curve", "Use a z-score"], "Equal costs occur when the expressions are equal."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise HSC-style algebra modelling questions using linear models, non-linear graphs, simultaneous equations, and contextual interpretation.",
    learningIntention:
      "Apply algebraic models to practical exam-style contexts involving costs, savings, height, area, revenue, and option comparisons.",
    successCriteria: [
      "Construct and interpret linear models from fixed costs and rates.",
      "Evaluate and interpret non-linear models and graph features.",
      "Solve and interpret simultaneous equations in context.",
      "Check units, context restrictions, and reasonableness.",
    ],
    teaching: {
      paragraphs: [
        "Algebraic Relationships questions usually start with a real situation and ask you to build, use, compare, or interpret a model.",
        "Linear models have constant rates of change. Non-linear models, such as quadratic height or area models, have changing rates and curved graphs.",
        "Simultaneous equations are useful when two models describe two options. The solution tells where the options have the same value.",
        "For exam responses, keep typed answers short: an equation, a value, a coordinate, or a labelled multiple-choice conclusion.",
      ],
      latexBlocks: [
        "y=mx+b",
        "h=-5t^2+20t+1.5",
        "\\text{intersection: model A} = \\text{model B}",
      ],
    },
    workedExamples: [
      {
        title: "Construct and use a cost model",
        questionLatex:
          "\\text{A gym charges }\\$40\\text{ plus }\\$18\\text{ per week.}",
        steps: [
          {
            explanation: "Write the model from fixed fee plus weekly rate.",
            latex: "C=40+18w",
          },
          {
            explanation: "For 5 weeks, substitute w = 5.",
            latex: "C=40+18(5)=130",
          },
        ],
        finalAnswerLatex: "\\$130",
      },
      {
        title: "Use a non-linear model",
        questionLatex:
          "h=-5t^2+20t+1.5,\\quad t=2",
        steps: [
          {
            explanation: "Substitute t = 2 and calculate.",
            latex: "h=-5(2)^2+20(2)+1.5=21.5",
          },
        ],
        finalAnswerLatex: "21.5\\text{ m}",
      },
      {
        title: "Compare two options",
        questionLatex:
          "A=30+15h,\\quad B=60+10h",
        steps: [
          {
            explanation: "Set the models equal.",
            latex: "30+15h=60+10h",
          },
          {
            explanation: "Solve for h.",
            latex: "h=6",
          },
        ],
        finalAnswerLatex: "\\text{Equal after }6\\text{ hours.}",
      },
    ],
    guidedPractice: [
      linearAnswer("y12s2-alg-exam-g1", "A gym charges 40 dollars plus 18 dollars per week. Write the cost model C after w weeks.", "C=40+18w", "C = 40 + 18w", ["C=40+18w", "c=40+18w", "C=18w+40"]),
      moneyAnswer("y12s2-alg-exam-g2", "Using C = 40 + 18w, find the cost after 5 weeks.", "40+18(5)", "130"),
      measurementAnswer("y12s2-alg-exam-g3", "A ball height is h = -5t^2 + 20t + 1.5. Find h when t = 2.", "-5(2)^2+20(2)+1.5", "21.5 m", ["21.5", "21.50", "21.5m"]),
      linearAnswer("y12s2-alg-exam-g4", "Costs A = 30 + 15h and B = 60 + 10h are equal after how many hours?", "30+15h=60+10h", "6", ["6 h", "6 hours"]),
    ],
    independentPractice: [
      practicalChoice("y12s2-alg-exam-i1", "In C = 25 + 0.12g for a phone plan, 0.12 represents:", "B", ["Base cost", "Cost per extra GB", "Total data", "Number of months"], "The coefficient of g is the rate per GB."),
      linearAnswer("y12s2-alg-exam-i2", "A taxi charges 6 dollars plus 2.40 dollars per km. Write F for d km.", "F=6+2.40d", "F = 6 + 2.40d", ["F=6+2.40d", "f=6+2.40d", "F=2.40d+6", "F=6+2.4d"]),
      moneyAnswer("y12s2-alg-exam-i3", "Using F = 6 + 2.40d, find the fare for 10 km.", "6+2.40(10)", "30"),
      practicalChoice("y12s2-alg-exam-i4", "A graph has vertex (3, 45) in a revenue model that opens downward. What does 45 represent?", "C", ["Initial cost", "Time", "Maximum revenue", "Gradient"], "The y-value of a downward vertex is the maximum."),
      practicalChoice("y12s2-alg-exam-i5", "Two models are equal at (6, 120). In a hire context, 6 represents:", "A", ["Hours", "Dollars", "Gradient", "Initial fee"], "The input coordinate is hours."),
    ],
    commonMistakes: [
      { mistake: "Confusing the meaning of gradient and intercept.", fix: "Gradient is rate; intercept is starting value or fixed amount." },
      { mistake: "Treating a non-linear model as if it has a constant rate.", fix: "Look for powers, curves, or changing first differences." },
      { mistake: "Solving two models but not interpreting the result.", fix: "State what the input and output mean in context." },
      { mistake: "Accepting impossible context values.", fix: "Reject negative time, length, or cost when the context makes them impossible." },
    ],
    masteryQuiz: [
      linearAnswer("y12s2-alg-exam-m1", "A hire company charges 35 dollars plus 12 dollars per hour. Write C for h hours.", "C=35+12h", "C = 35 + 12h", ["C=35+12h", "c=35+12h", "C=12h+35"]),
      moneyAnswer("y12s2-alg-exam-m2", "Using C = 35 + 12h, find C when h = 4.", "35+12(4)", "83"),
      practicalChoice("y12s2-alg-exam-m3", "In S = 120 + 25w, the 120 is:", "A", ["Starting savings", "Weekly increase", "Number of weeks", "Gradient only"], "It is the value when w = 0."),
      measurementAnswer("y12s2-alg-exam-m4", "A height model is h = -4t^2 + 16t + 2. Find the initial height.", "h(0)=2", "2 m", ["2", "2m", "2.0"]),
      measurementAnswer("y12s2-alg-exam-m5", "Using h = -4t^2 + 16t + 2, find h when t = 1.", "-4(1)^2+16(1)+2", "14 m", ["14", "14m"]),
      practicalChoice("y12s2-alg-exam-m6", "A curved graph with changing rate is:", "B", ["Linear", "Non-linear", "Always impossible", "A fixed fee"], "Curved graphs are non-linear."),
      linearAnswer("y12s2-alg-exam-m7", "Models A = 30 + 15h and B = 60 + 10h are equal at what h?", "30+15h=60+10h", "6", ["6 h", "6 hours"]),
      moneyAnswer("y12s2-alg-exam-m8", "Using A = 30 + 15h, find the equal cost when h = 6.", "30+15(6)", "120"),
      practicalChoice("y12s2-alg-exam-m9", "For A = 30 + 15h and B = 60 + 10h, which is cheaper at h = 8?", "C", ["A", "They are equal", "B", "Neither"], "A = 150 and B = 140."),
      practicalChoice("y12s2-alg-exam-m10", "A negative time solution in a practical model should usually be:", "D", ["Used first", "Called the gradient", "Converted to dollars", "Rejected as not meaningful"], "Negative time is not practical."),
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
    dataAnalysisLessonOverride(course, unit, lesson) ??
    linearRelationshipsLessonOverride(course, unit, lesson) ??
    formulasEquationsLessonOverride(course, unit, lesson) ??
    year12Standard2NetworksLessonOverride(course, unit, lesson) ??
    year12Standard2FinanceLessonOverride(course, unit, lesson) ??
    year12Standard2StatisticsLessonOverride(course, unit, lesson) ??
    year12Standard2TrigRatesLessonOverride(course, unit, lesson) ??
    year12Standard2AlgebraLessonOverride(course, unit, lesson);

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
          "Linear modelling, non-linear graphs, simultaneous-equation comparisons, and HSC-style algebra in practical contexts.",
        syllabusArea: "Algebra",
        focus: "Algebraic relationships",
        lessons: [
          {
            slug: "linear-relationships-modelling",
            title: "Linear Relationships and Modelling",
            description:
              "Build and interpret linear models from fixed costs, starting values, rates of change, tables, and practical equations.",
          },
          {
            slug: "non-linear-relationships-graphs",
            title: "Non-Linear Relationships and Graphs",
            description:
              "Interpret and evaluate non-linear models, including quadratic height and area models, graph features, and context restrictions.",
          },
          {
            slug: "simultaneous-equations-context",
            title: "Simultaneous Equations in Context",
            description:
              "Solve and interpret pairs of practical models, including equal-cost points and option comparisons.",
          },
          {
            slug: "algebraic-relationships-exam-practice",
            title: "Algebraic Relationships Exam Practice",
            description:
              "Practise HSC-style algebra modelling questions using linear models, non-linear graphs, simultaneous equations, and contextual interpretation.",
          },
        ],
      },
      {
        slug: "trigonometry-ratios-rates",
        title: "Trigonometry, Ratios and Rates",
        description:
          "Non-right-angled trigonometry, sine and cosine rules, triangular area, ratios, rates, scale, speed, and practical conversions.",
        syllabusArea: "Measurement",
        focus: "Trigonometry, ratios and rates",
        lessons: [
          {
            slug: "non-right-angled-trigonometry",
            title: "Non-Right-Angled Trigonometry",
            description:
              "Choose sine rule or cosine rule for practical non-right-angled triangle problems in surveying and navigation contexts.",
          },
          {
            slug: "sine-rule-cosine-rule-area-triangle",
            title: "Sine Rule, Cosine Rule and Area of a Triangle",
            description:
              "Apply sine rule, cosine rule, and the triangular area formula to practical distance and land-area problems.",
          },
          {
            slug: "ratios-rates-unit-conversions",
            title: "Ratios, Rates and Unit Conversions",
            description:
              "Use ratios, sharing, rates, speed, fuel use, flow rates, map scales, and practical unit conversions.",
          },
          {
            slug: "practical-rates-ratios-exam-practice",
            title: "Practical Rates and Ratios Exam Practice",
            description:
              "Practise mixed HSC-style measurement questions involving non-right-angled trigonometry, ratios, rates, scale, speed, and unit conversion.",
          },
        ],
      },
      {
        slug: "investments-loans-annuities",
        title: "Investments, Loans and Annuities",
        description:
          "Compound investments, depreciation, loan recurrences, annuities, regular payments, fees, and financial decisions.",
        syllabusArea: "Financial Mathematics",
        focus: "Investments, loans and annuities",
        lessons: [
          {
            slug: "investment-compound-interest",
            title: "Investment and Compound Interest",
            description:
              "Calculate compound investment balances, interest earned, growth factors, and net returns after fees.",
          },
          {
            slug: "depreciation-loans",
            title: "Depreciation and Loans",
            description:
              "Model asset depreciation and loan balances using decay factors, repayments, and recurrence relations.",
          },
          {
            slug: "annuities-regular-payments",
            title: "Annuities and Regular Payments",
            description:
              "Use recurrence and table methods for regular deposits, future value, annuities, and repayment schedules.",
          },
          {
            slug: "financial-decision-making-exam-practice",
            title: "Financial Decision Making Exam Practice",
            description:
              "Practise mixed HSC-style finance questions involving investments, loans, annuities, fees, and comparisons.",
          },
        ],
      },
      {
        slug: "bivariate-data-normal-distribution",
        title: "Bivariate Data and Normal Distribution",
        description:
          "Bivariate data, scatterplots, correlation, regression, residuals, z-scores, normal distribution, and exam-style statistics practice.",
        syllabusArea: "Statistical Analysis",
        focus: "Bivariate data and normal distribution",
        lessons: [
          {
            slug: "bivariate-data-scatterplots",
            title: "Bivariate Data and Scatterplots",
            description:
              "Interpret bivariate data, scatterplots, association direction, strength, outliers, and causation warnings.",
          },
          {
            slug: "correlation-regression",
            title: "Correlation and Regression",
            description:
              "Use correlation, regression equations, predictions, residuals, slope, intercept, and extrapolation warnings.",
          },
          {
            slug: "normal-distribution-z-scores",
            title: "Normal Distribution and Z-Scores",
            description:
              "Calculate and interpret z-scores, standard deviations from the mean, and empirical-rule percentages.",
          },
          {
            slug: "statistical-analysis-exam-practice",
            title: "Statistical Analysis Exam Practice",
            description:
              "Practise mixed HSC-style statistical analysis questions using scatterplots, regression, residuals, z-scores, and normal distributions.",
          },
        ],
      },
      {
        slug: "networks-critical-path-analysis",
        title: "Networks and Critical Path Analysis",
        description:
          "Weighted and directed networks, shortest paths, minimum spanning trees, project scheduling, and critical path analysis.",
        syllabusArea: "Networks",
        focus: "Networks and critical path analysis",
        lessons: [
          {
            slug: "network-concepts-terminology",
            title: "Network Concepts and Terminology",
            description:
              "Interpret vertices, edges, degrees, directed edges, weighted edges, paths, trails, and circuits from practical edge lists.",
          },
          {
            slug: "shortest-paths-minimum-spanning-trees",
            title: "Shortest Paths and Minimum Spanning Trees",
            description:
              "Solve route and minimal connector problems using shortest paths, path weights, MSTs, and Kruskal's method.",
          },
          {
            slug: "critical-path-analysis",
            title: "Critical Path Analysis",
            description:
              "Use activity tables to find earliest times, critical paths, project completion time, float, and delay effects.",
          },
          {
            slug: "networks-exam-practice",
            title: "Networks Exam Practice",
            description:
              "Practise mixed HSC-style network questions involving routes, connectors, project schedules, and practical decisions.",
          },
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
          "Substitution into practical formulae, contextual equations, changing the subject, units and reasonableness.",
        syllabusArea: "Algebra",
        focus: "Formulas and equations",
        lessons: [
          {
            slug: "substitution-formulae-equations",
            title: "Substitution, Formulae and Equations",
            description:
              "Substitute into practical formulae, solve simple contextual equations, and interpret answers with units.",
          },
          {
            slug: "changing-subject-formula",
            title: "Changing the Subject of a Formula",
            description:
              "Rearrange practical formulae using inverse operations, including cost, area, circumference and temperature formulae.",
          },
          {
            slug: "formulae-equations-exam-practice",
            title: "Formulae and Equations Exam Practice",
            description:
              "Practise mixed formula and equation questions involving substitution, rearranging, units and reasonableness.",
          },
        ],
      },
      {
        slug: "linear-relationships",
        title: "Linear Relationships",
        description:
          "Straight-line relationships, gradients, intercepts, direct variation, practical linear models and graph interpretation.",
        syllabusArea: "Algebra",
        focus: "Linear relationships",
        lessons: [
          {
            slug: "linear-relationships-graphs",
            title: "Linear Relationships and Graphs",
            description:
              "Interpret straight-line rules, tables and graphs using gradients, rates and starting values.",
          },
          {
            slug: "direct-variation-practical-linear-models",
            title: "Direct Variation and Practical Linear Models",
            description:
              "Use direct variation, constants of variation and practical linear models with and without fixed costs.",
          },
          {
            slug: "linear-relationships-exam-practice",
            title: "Linear Relationships Exam Practice",
            description:
              "Practise mixed linear relationship questions using tables, rules, graph features, direct variation and practical limitations.",
          },
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
