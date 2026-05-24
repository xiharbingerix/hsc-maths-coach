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

function networkWorkedExamples(slug: string, title: string): WorkedExample[] {
  if (slug === "network-diagrams-terminology") {
    return [
      {
        title: "Identifying vertices, edges, and degree",
        questionLatex: "\\text{A is joined to B, C, and D. Find the degree of A.}",
        steps: [
          { explanation: "A vertex is a point in a network." },
          { explanation: "The degree of a vertex is the number of edges incident to it.", latex: "\\deg(A)=3" },
        ],
        finalAnswerLatex: "3",
      },
      {
        title: "Constructing a network from a table",
        questionLatex: "\\begin{array}{c|c} \\text{Connection} & \\text{Distance} \\\\ A-B & 4 \\\\ B-C & 6 \\end{array}",
        steps: [
          { explanation: "Draw one vertex for each location: A, B, and C." },
          { explanation: "Connect A to B with weight 4 and B to C with weight 6." },
        ],
        finalAnswerLatex: "\\text{A weighted network with edges } AB \\text{ and } BC.",
      },
    ];
  }

  if (slug === "paths-trails-circuits-connectivity") {
    return [
      {
        title: "Classifying a route",
        questionLatex: "A \\rightarrow B \\rightarrow C \\rightarrow A",
        steps: [
          { explanation: "A path is a route through connected vertices." },
          { explanation: "A circuit starts and ends at the same vertex." },
        ],
        finalAnswerLatex: "\\text{Circuit}",
      },
      {
        title: "Shortest path is not always best",
        questionLatex: "\\text{Route A is 8 km. Route B is 10 km but avoids tolls.}",
        steps: [
          { explanation: "The shortest path minimises distance." },
          { explanation: "The best practical path may also consider time, cost, safety, or restrictions." },
        ],
        finalAnswerLatex: "\\text{Shortest does not always mean best in context.}",
      },
    ];
  }

  if (slug === "trees-minimum-spanning-trees") {
    return [
      {
        title: "Recognising a tree",
        questionLatex: "\\text{A connected network has 6 vertices and 5 edges with no cycles.}",
        steps: [
          { explanation: "A tree is connected and contains no cycles." },
          { explanation: "For a tree with n vertices, there are n-1 edges.", latex: "6-1=5" },
        ],
        finalAnswerLatex: "\\text{Tree}",
      },
      {
        title: "Finding a minimum spanning tree",
        questionLatex: "AB=3,\\ AC=5,\\ BC=4,\\ CD=2",
        steps: [
          { explanation: "Choose the smallest edges that connect all vertices without forming a cycle." },
          { explanation: "Use CD, AB, and BC to connect A, B, C, and D.", latex: "2+3+4=9" },
        ],
        finalAnswerLatex: "9",
      },
    ];
  }

  return [
    {
      title: `${title}: choosing a network method`,
      questionLatex: "\\text{A delivery network has directed and weighted edges.}",
      steps: [
        { explanation: "Identify whether the question is asking for construction, shortest path, or minimal connection." },
        { explanation: "Use the relevant method and then interpret the result in context." },
      ],
      finalAnswerLatex: "\\text{Method depends on the practical goal.}",
    },
    {
      title: `${title}: practical decision`,
      questionLatex: "\\text{Compare shortest route and lowest-cost connector.}",
      steps: [
        { explanation: "Shortest path is about a route between two vertices." },
        { explanation: "Minimum spanning tree is about connecting all required vertices with minimum total weight." },
      ],
      finalAnswerLatex: "\\text{Use shortest path for routes; MST for minimal connectors.}",
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
        "Identify vertices, edges, degree, directed networks, weighted edges, and construct networks from tables or maps.",
      learningIntention:
        "Understand core network terminology and use it to interpret and construct practical network diagrams.",
      successCriteria: [
        "Identify vertices, edges, and the degree of a vertex.",
        "Recognise directed networks and weighted edges.",
        "Construct a simple network from a table or map description.",
        "Interpret a network diagram in a practical context.",
      ],
      teaching: {
        paragraphs: [
          "A network is a diagram made from vertices connected by edges. Vertices often represent places, people, tasks, or objects.",
          "An edge shows a connection between two vertices. The degree of a vertex is the number of edges joined to that vertex.",
          "A directed network uses arrows to show one-way movement or order. A weighted edge has a number attached, such as distance, time, cost, or capacity.",
          "To construct a network from a table or map, list the vertices first, then add each connection as an edge. Include arrows for directed connections and weights when values are given.",
        ],
        latexBlocks: [
          "\\deg(v)=\\text{number of edges incident to vertex }v",
          "\\text{weighted edge: } A \\xleftrightarrow{\\ 7\\ } B",
        ],
      },
      guidedPractice: [
        shortAnswer("net-term-g1", "A vertex A is joined to B, C, and D. What is the degree of A?", "\\deg(A)=?", "3"),
        labelledChoice("net-term-g2", "Which statement best describes a weighted edge?", "A", ["An edge with a number such as distance or cost", "A vertex with exactly two edges", "A network that has no vertices", "A path that starts and ends at the same vertex"], "A weighted edge carries a numerical value."),
        labelledChoice("net-term-g3", "A one-way street network is best modelled by which type of network?", "B", ["Undirected network", "Directed network", "Tree only", "Box plot"], "One-way movement needs arrows, so it is directed."),
        shortAnswer("net-term-g4", "A table lists connections AB, AC, and CD. How many edges are listed?", "\\{AB,AC,CD\\}", "3"),
      ],
      independentPractice: [
        shortAnswer("net-term-i1", "A vertex has edges to four other vertices. What is its degree?", "\\deg(v)=?", "4"),
        labelledChoice("net-term-i2", "Which item is most likely represented by a vertex on a town map network?", "A", ["A town or intersection", "The total distance only", "The colour of the map", "A probability"], "Vertices usually represent places or junctions."),
        shortAnswer("net-term-i3", "Connections AB, BC, CD, and DA are listed. How many vertices are named?", "A,B,C,D", "4"),
        labelledChoice("net-term-i4", "A bus route table gives travel times between stops. The times should be shown as what?", "C", ["Directions", "Vertex names", "Edge weights", "Degrees"], "Travel time is a numerical weight."),
        shortAnswer("net-term-i5", "If AB has weight 6, what number should be written on edge AB?", "AB=6", "6"),
      ],
      commonMistakes: [
        { mistake: "Counting vertices instead of edges for degree.", fix: "Degree counts the edges incident to one vertex." },
        { mistake: "Leaving arrows off one-way connections.", fix: "Use directed edges whenever movement is one-way." },
        { mistake: "Ignoring weights from a table.", fix: "Write distances, costs, or times on the matching edges." },
        { mistake: "Drawing an edge for a connection not listed.", fix: "Only connect vertices when the table or map shows a connection." },
      ],
      masteryQuiz: [
        shortAnswer("net-term-m1", "A is connected to B and C. What is degree of A?", "\\deg(A)=?", "2"),
        labelledChoice("net-term-m2", "Which is a vertex?", "A", ["A point representing a location", "A number on an edge", "A route returning to the start", "A repeated edge"], "A vertex is a point in the network."),
        labelledChoice("net-term-m3", "Which network type uses arrows?", "B", ["Weighted", "Directed", "Undirected only", "Disconnected"], "Directed networks use arrows."),
        shortAnswer("net-term-m4", "A network has edges AB, BC, CA. How many edges are there?", "AB,BC,CA", "3"),
        labelledChoice("net-term-m5", "A number 12 on an edge most likely represents what?", "C", ["A vertex", "A circuit", "A weight", "A degree"], "A number on an edge is a weight."),
        shortAnswer("net-term-m6", "A vertex touches 5 edges. What is its degree?", "\\deg(v)=5", "5"),
        labelledChoice("net-term-m7", "A map table gives towns and direct roads. What should the towns become?", "A", ["Vertices", "Weights", "Degrees", "Circuits"], "Locations become vertices."),
        shortAnswer("net-term-m8", "Connections AB and CD are listed. How many edges are drawn?", "AB,CD", "2"),
        labelledChoice("net-term-m9", "Which practical context suits a directed network?", "D", ["Two-way walking tracks", "Undirected friendships", "A normal road with no restrictions", "One-way traffic"], "One-way traffic needs direction."),
        shortAnswer("net-term-m10", "If edge BC has cost 9, what is the weight on BC?", "BC=9", "9"),
      ],
    };
  }

  if (lesson.slug === "paths-trails-circuits-connectivity") {
    return {
      ...base,
      description:
        "Classify paths, trails, circuits and connected networks, then identify shortest paths and practical route limits.",
      learningIntention:
        "Use path, trail, circuit, connectivity and shortest path ideas to solve practical route problems.",
      successCriteria: [
        "Distinguish between a path, trail, and circuit.",
        "Recognise whether a network is connected.",
        "Find a shortest path in a small network with no more than 10 vertices.",
        "Explain why the shortest path may not be the best practical path using a labelled choice.",
      ],
      teaching: {
        paragraphs: [
          "A path is a route through connected vertices. A trail is a route that does not repeat an edge.",
          "A circuit starts and ends at the same vertex. A connected network has a route between every pair of vertices.",
          "A shortest path is the route between two vertices with the smallest total weight. In Year 11 Standard, shortest path questions use small networks that can be checked systematically.",
          "The shortest path is not always the best practical path. A longer path may be safer, faster in traffic, cheaper, or more reliable.",
        ],
        latexBlocks: [
          "\\text{total path weight}=\\text{sum of edge weights on the route}",
          "\\text{circuit: start vertex}=\\text{end vertex}",
        ],
      },
      guidedPractice: [
        labelledChoice("net-path-g1", "A route starts at A, goes to B, then returns to A. What is it?", "C", ["Vertex", "Edge", "Circuit", "Weight"], "A circuit returns to its starting vertex."),
        shortAnswer("net-path-g2", "A route uses edges of weights 3, 4, and 5. What is the total weight?", "3+4+5", "12"),
        labelledChoice("net-path-g3", "What does connected mean?", "A", ["Every vertex can be reached from every other vertex", "Every edge has weight 1", "The network has arrows", "The network has no paths"], "Connected means all vertices are reachable."),
        labelledChoice("net-path-g4", "Why might the shortest path not be the best path?", "D", ["It always is best", "It has no vertices", "It must be a tree", "It may be slower, unsafe, or more costly in context"], "Practical constraints can matter more than distance."),
      ],
      independentPractice: [
        shortAnswer("net-path-i1", "Route A-B-C has weights AB=6 and BC=7. Find the total weight.", "6+7", "13"),
        labelledChoice("net-path-i2", "A route that does not repeat an edge is called what?", "B", ["Degree", "Trail", "Weight", "Vertex"], "A trail does not repeat edges."),
        shortAnswer("net-path-i3", "A shortest path has edge weights 2, 2, and 3. What is its total weight?", "2+2+3", "7"),
        labelledChoice("net-path-i4", "A network has an isolated vertex. Is it connected?", "B", ["Yes", "No", "Only if weighted", "Only if directed"], "An isolated vertex cannot be reached."),
        shortAnswer("net-path-i5", "In a 9-vertex network, is a shortest path question within the no-more-than-10-vertices limit? Answer yes or no.", "9\\le 10", "yes", ["Yes", "YES"]),
      ],
      commonMistakes: [
        { mistake: "Calling every route a circuit.", fix: "A circuit must start and end at the same vertex." },
        { mistake: "Finding the route with the fewest edges instead of the lowest total weight.", fix: "For weighted networks, add the edge weights." },
        { mistake: "Assuming shortest always means best.", fix: "Check time, cost, safety, and other practical constraints." },
        { mistake: "Saying a network is connected when a vertex is isolated.", fix: "Every vertex must be reachable from every other vertex." },
      ],
      masteryQuiz: [
        labelledChoice("net-path-m1", "A route that starts and ends at A is a:", "C", ["Path only", "Weight", "Circuit", "Degree"], "A circuit starts and ends at the same vertex."),
        shortAnswer("net-path-m2", "Add path weights 4, 6, and 1.", "4+6+1", "11"),
        labelledChoice("net-path-m3", "A trail cannot repeat what?", "B", ["Vertices", "Edges", "Weights", "Labels"], "A trail does not repeat edges."),
        labelledChoice("net-path-m4", "A connected network means:", "A", ["All vertices are reachable", "All weights are equal", "There are no edges", "It must be directed"], "Connected means every vertex can be reached."),
        shortAnswer("net-path-m5", "A path has total weights 8 or 10. What is the shortest-path weight?", "\\min(8,10)", "8"),
        labelledChoice("net-path-m6", "The shortest path may not be best because:", "D", ["It has the smallest distance", "It uses vertices", "It is drawn on paper", "Other practical factors may matter"], "Context can make a longer route better."),
        shortAnswer("net-path-m7", "A network has 10 vertices. Is this within a no-more-than-10-vertices shortest path question? Answer yes or no.", "10\\le 10", "yes", ["Yes", "YES"]),
        labelledChoice("net-path-m8", "A route A-B-C is best described as:", "A", ["Path", "Degree", "Weight only", "Disconnected network"], "It is a route through connected vertices."),
        shortAnswer("net-path-m9", "Route weights are 5 and 9. Add them.", "5+9", "14"),
        labelledChoice("net-path-m10", "An isolated vertex makes a network:", "B", ["Connected", "Not connected", "Directed", "Weighted"], "An isolated vertex prevents connectivity."),
      ],
    };
  }

  if (lesson.slug === "trees-minimum-spanning-trees") {
    return {
      ...base,
      description:
        "Use trees, spanning trees and minimum spanning trees to solve minimal connector problems.",
      learningIntention:
        "Understand trees and minimum spanning trees, and use a clear method to solve minimal connector problems.",
      successCriteria: [
        "Identify a tree as a connected network with no cycles.",
        "Explain that a spanning tree connects all vertices without cycles.",
        "Find a minimum spanning tree using a smallest-edge method.",
        "Interpret an MST as a minimal connector in context.",
      ],
      teaching: {
        paragraphs: [
          "A tree is a connected network with no cycles. A tree with n vertices has n-1 edges.",
          "A spanning tree uses all the vertices of a network and connects them without creating a cycle.",
          "A minimum spanning tree is the spanning tree with the smallest possible total weight.",
          "To find an MST, repeatedly choose the smallest available edge that connects a new part of the network and does not make a cycle. MSTs are used for minimal connector problems such as cables, roads, or pipelines.",
        ],
        latexBlocks: [
          "\\text{tree with } n \\text{ vertices has } n-1 \\text{ edges}",
          "\\text{MST total}=\\text{sum of selected connector weights}",
        ],
      },
      guidedPractice: [
        labelledChoice("net-tree-g1", "Which describes a tree?", "A", ["Connected with no cycles", "Disconnected with arrows", "Only one vertex", "A route with repeated edges"], "A tree is connected and has no cycles."),
        shortAnswer("net-tree-g2", "A tree has 7 vertices. How many edges does it have?", "7-1", "6"),
        labelledChoice("net-tree-g3", "What is the goal of a minimum spanning tree?", "C", ["Find the longest route", "Repeat every edge", "Connect all vertices with minimum total weight", "Find only one shortest path"], "An MST is a minimal connector."),
        shortAnswer("net-tree-g4", "Selected MST edges have weights 2, 5, and 6. Find the total.", "2+5+6", "13"),
      ],
      independentPractice: [
        shortAnswer("net-tree-i1", "A tree has 5 vertices. How many edges?", "5-1", "4"),
        labelledChoice("net-tree-i2", "A spanning tree must include:", "A", ["All vertices", "All edges", "Only directed edges", "No weights"], "A spanning tree spans all vertices."),
        shortAnswer("net-tree-i3", "Add MST connector weights 4, 4, 7, and 8.", "4+4+7+8", "23"),
        labelledChoice("net-tree-i4", "Which edge should be avoided when building an MST?", "D", ["A low weight edge", "An edge connecting a new vertex", "The first edge chosen", "An edge that creates a cycle"], "MST methods avoid cycles."),
        labelledChoice("net-tree-i5", "A cable company wants to connect all houses with least total cable. Use:", "B", ["Shortest path", "Minimum spanning tree", "Circuit", "Degree only"], "This is a minimal connector problem."),
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
        shortAnswer("net-tree-m9", "Add connector weights 2, 2, 3, and 5.", "2+2+3+5", "12"),
        labelledChoice("net-tree-m10", "A minimal connector problem asks you to:", "C", ["Return to the start", "Choose the longest path", "Connect required vertices cheaply", "Ignore weights"], "Minimal connectors connect required points at least total cost."),
      ],
    };
  }

  return {
    ...base,
    description:
      "Practise mixed network applications involving construction, directed and weighted networks, shortest paths, and MST decisions.",
    learningIntention:
      "Apply network diagrams, shortest paths and minimum spanning trees to practical exam-style contexts.",
    successCriteria: [
      "Construct or interpret a network from a table or map.",
      "Use directed and weighted edges correctly.",
      "Choose between shortest path and MST methods.",
      "Make a practical conclusion from a network calculation.",
    ],
    teaching: {
      paragraphs: [
        "Network exam questions often combine terminology, diagram construction, routes, and minimal connector decisions.",
        "First decide what the question is asking: build a diagram, find a route, check connectivity, or connect all vertices at minimum total weight.",
        "Directed edges show one-way relationships. Weighted edges show values such as distance, time, cost, or capacity.",
        "Use shortest path for a route between two vertices. Use an MST when the goal is to connect all required locations with minimum total weight.",
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
      shortAnswer("net-app-g4", "A table lists edges AB, BC, CD, DE. How many edges are listed?", "AB,BC,CD,DE", "4"),
    ],
    independentPractice: [
      labelledChoice("net-app-i1", "A map with distances between suburbs should use:", "A", ["Weighted edges", "Only isolated vertices", "A box plot", "A frequency table"], "Distances are weights."),
      shortAnswer("net-app-i2", "Add route weights 7 and 8.", "7+8", "15"),
      labelledChoice("net-app-i3", "Shortest path is not always best because:", "D", ["It uses vertices", "It is always free", "It must connect all vertices", "Traffic, safety, or cost may matter"], "Practical constraints can override distance."),
      shortAnswer("net-app-i4", "MST selected weights are 3, 5, 5. Find total.", "3+5+5", "13"),
      labelledChoice("net-app-i5", "A table of direct flights with arrows should be drawn as:", "B", ["Undirected unweighted network", "Directed network", "Histogram", "Scatterplot"], "Arrows show direction."),
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
      shortAnswer("net-app-m7", "MST weights 2, 4, 9 total to what?", "2+4+9", "15"),
      labelledChoice("net-app-m8", "Why might a longer route be chosen?", "D", ["It has no edges", "It has fewer vertices always", "It is disconnected", "It may be safer or faster"], "Practical features can matter."),
      shortAnswer("net-app-m9", "If vertex A has 3 incident edges, what is degree of A?", "\\deg(A)=3", "3"),
      labelledChoice("net-app-m10", "Before solving a network application, first:", "A", ["Identify the goal of the problem", "Choose the largest edge", "Ignore weights", "Delete vertices"], "The method depends on the goal."),
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
  const override = networkLessonOverride(course, unit, lesson);

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
          "Payslips, tax, deductions, net pay, and practical earning-money questions.",
        syllabusArea: "Financial mathematics",
        focus: "Earning money",
        lessons: [
          { slug: "earning-money-payslips", title: "Earning Money and Payslips" },
          { slug: "tax-deductions-net-pay", title: "Tax, Deductions and Net Pay" },
          { slug: "earning-money-exam-practice", title: "Earning Money Exam Practice" },
        ],
      },
      {
        slug: "managing-money",
        title: "Managing Money",
        description:
          "Budgeting, simple interest, financial decisions, and exam-style money management.",
        syllabusArea: "Financial mathematics",
        focus: "Managing money",
        lessons: [
          { slug: "budgeting-managing-money", title: "Budgeting and Managing Money" },
          { slug: "simple-interest-financial-decisions", title: "Simple Interest and Financial Decisions" },
          { slug: "managing-money-exam-practice", title: "Managing Money Exam Practice" },
        ],
      },
      {
        slug: "applications-measurement",
        title: "Applications of Measurement",
        description:
          "Measurement accuracy, area, surface area, volume, practical measurement, and applied measurement questions.",
        syllabusArea: "Measurement",
        focus: "Applications of measurement",
        lessons: [
          { slug: "units-accuracy-measurement-error", title: "Units, Accuracy and Measurement Error" },
          { slug: "area-surface-area-volume", title: "Area, Surface Area and Volume" },
          { slug: "energy-mass-practical-measurement", title: "Energy, Mass and Practical Measurement" },
          { slug: "applications-measurement-exam-practice", title: "Applications of Measurement Exam Practice" },
        ],
      },
      {
        slug: "time-location",
        title: "Time and Location",
        description:
          "Time zones, timetables, travel contexts, and practical time-location exam questions.",
        syllabusArea: "Measurement",
        focus: "Time and location",
        lessons: [
          { slug: "time-zones-timetables", title: "Time Zones and Timetables" },
          { slug: "time-location-exam-practice", title: "Time and Location Exam Practice" },
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
          "Data displays, summary statistics, outliers, interpretation, and practical data-analysis questions.",
        syllabusArea: "Statistics",
        focus: "Data analysis",
        lessons: [
          { slug: "data-displays-summary-statistics", title: "Data Displays and Summary Statistics" },
          { slug: "interpreting-data-outliers", title: "Interpreting Data and Outliers" },
          { slug: "data-analysis-exam-practice", title: "Data Analysis Exam Practice" },
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
