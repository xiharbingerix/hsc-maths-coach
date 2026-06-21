# Year 12 Standard 2: Network Concepts and Terminology Assessment Rebuild Plan

Scope: `year-12-standard-2/network-flow/network-concepts-terminology`

Primary input: [completed question audit](./year-12-standard-2-network-concepts-terminology-question-audit.md)

This document defines assessment architecture only. It does not contain final replacement questions.

## Step 1: Lesson Diagnosis

### Current Lesson Purpose

The lesson is intended to establish the language and foundational reasoning used throughout network mathematics. Students should be able to interpret vertices and edges, distinguish directed and undirected connections, use edge weights, calculate vertex degree, classify routes as paths, trails or circuits, and recognise structural properties of Euler trails and trees. These ideas should prepare students to reason about shortest paths, minimum spanning trees, flow networks and critical paths in later lessons.

### Current Lesson Failure

The current assessment confuses exposure to terminology with evidence of understanding. Much of guided, independent and mastery practice asks students to count labels or recall a definition already signalled by the prompt. The same edge-count, vertex-count, path and circuit tasks recur with only names or numbers changed, so later sections do not create meaningful transfer.

Difficulty progression is particularly weak. Several D3-D4 questions are actually D1 recall, while the D5 items apply familiar properties directly rather than requiring modelling, constraints or synthesis. Mastery Q1-Q7 therefore measures vocabulary recognition rather than mastery. Some contexts are decorative, generic feedback obscures the misconception being assessed, and degree questions accept angle units. The final three items contain the best mathematical ideas, but their difficulty and answer formats are not calibrated reliably.

The rebuild must use terminology as a tool inside mathematical decisions, not as the assessment endpoint.

## Step 2: Define Learning Outcomes

### Knowledge Outcomes

Students should understand:

* A vertex represents an object or location, while an edge represents a direct connection.
* Vertex degree counts incident edges and is not an angle measurement.
* Direction and weight are independent edge properties.
* A path, trail and circuit impose different restrictions on repeated vertices, repeated edges and endpoints.
* The sum of all vertex degrees in an undirected network equals twice the number of edges.
* Euler-trail existence is determined by connectivity and the number of odd-degree vertices.
* A connected network with no cycles is a tree and has one fewer edge than vertices.

### Skill Outcomes

Students should be able to:

* Translate a practical description, edge list, table or diagram into network features.
* Count vertices and edges when they are not simply enumerated as the requested answer.
* Calculate and update vertex degrees when connections change.
* Use edge weights to calculate and compare route totals.
* Classify a route by checking repeated vertices, repeated edges and endpoints.
* Determine whether directed movement makes a proposed route possible.
* Apply the degree-sum property to infer a missing quantity.
* Use odd-degree vertices to determine Euler-trail existence and endpoints.
* Identify or infer tree structure from connectivity, cycles, vertices and edges.
* Reject a plausible but invalid network conclusion and identify the precise reason it fails.

### Misconceptions

* Confusing vertices with edges.
* Counting every endpoint occurrence as a new vertex.
* Treating vertex degree as an angle or as the total number of vertices.
* Assuming a weighted edge must also be directed.
* Assuming an undirected edge permits only one direction of travel.
* Treating every route as a path.
* Confusing a trail with a path when a vertex repeats but no edge repeats.
* Calling a route a circuit when it does not return to its start.
* Assuming a closed route is automatically an Euler circuit.
* Forgetting that every undirected edge contributes two to the degree sum.
* Assuming any connected network has an Euler trail.
* Assuming every connected network is a tree.
* Using the tree edge rule without first checking connectivity and cycles.

## Step 3: Design Assessment Progression

### Guided Practice

Purpose:

Introduce the core representations and make the vertex-edge, degree, direction and weight distinctions explicit. Questions should be highly scaffolded but still require the student to perform one meaningful mathematical action.

Question types:

* One visual or practical representation-identification MCQ.
* One typed degree calculation from a small network diagram.
* One misconception-focused MCQ distinguishing directed from weighted networks.
* One typed route-weight calculation using only the edges actually travelled.

Target difficulty: D1-D2.

### Independent Practice

Purpose:

Reinforce the same concepts in less explicit representations and require mild transfer. Students should infer network structure, update degrees, classify routes using restrictions, and use weights to make a constrained comparison.

Question types:

* Typed interpretation of a practical connection table or compact diagram.
* Typed degree update after adding or removing an edge.
* One route-classification MCQ with plausible path, trail and circuit distractors.
* Typed route classification where a repeated vertex changes the answer.
* Typed weighted-route comparison with a specific, objectively markable output.

Target difficulty: D2-D3.

### Mastery Quiz

Purpose:

Assess connected reasoning with degree sums, route restrictions, directed reachability, Euler conditions and tree structure. Later items must require transfer, constraint reasoning or model evaluation rather than definition recall.

Question types:

* Degree-sequence and missing-value production tasks.
* Diagram interpretation that combines two network properties.
* Three misconception-driven MCQs across Q1-Q10.
* Route classification using repeated-edge and repeated-vertex constraints.
* Directed-network reachability or route-validity reasoning.
* Euler-trail endpoint reasoning under a changed connection.
* Tree modelling and structural constraint tasks.
* A final synthesis MCQ requiring evaluation of competing network claims.

Target difficulty: Q1-Q4 D3, Q5-Q7 D4, Q8-Q10 D5.

## Step 4: Proposed Replacement Questions

### Guided Practice

Question ID: `y12s2-net-term-g1`

Current Status: REPLACE

Concept Tested: Vertices and edges as different elements of a practical network.

Misconception Targeted: Counting endpoint appearances as separate vertices or confusing locations with connections.

Question Type: Visual MCQ with four plausible network representations.

Expected Difficulty: D1.

One-sentence description: Student selects the representation that correctly maps a small practical situation to vertices and edges without merely counting a supplied list.

Question ID: `y12s2-net-term-g2`

Current Status: REPLACE

Concept Tested: Vertex degree.

Misconception Targeted: Treating degree as an angle or as the number of vertices in the network.

Question Type: Typed numeric answer from a small network diagram.

Expected Difficulty: D2.

One-sentence description: Student determines the degree of a labelled vertex by identifying only the edges incident to it.

Question ID: `y12s2-net-term-g3`

Current Status: KEEP

Concept Tested: Directed edges in a one-way-road context.

Misconception Targeted: Treating a one-way connection as undirected or confusing direction with weight.

Question Type: Conceptual MCQ.

Expected Difficulty: D1.

One-sentence description: Student identifies that arrows representing one-way streets require a directed network.

Question ID: `y12s2-net-term-g4`

Current Status: REPLACE

Concept Tested: Edge weights and route totals.

Misconception Targeted: Adding every visible weight rather than only the weights on the stated route.

Question Type: Typed numeric answer using a small weighted network diagram.

Expected Difficulty: D2.

One-sentence description: Student adds the weights of the two edges on a specified route and ignores an unused connection.

### Independent Practice

Question ID: `y12s2-net-term-i1`

Current Status: REPLACE

Concept Tested: Translating a connection table into vertex and edge information.

Misconception Targeted: Counting repeated endpoint labels as new vertices.

Question Type: Typed numeric answer from a compact practical table.

Expected Difficulty: D2.

One-sentence description: Student infers the number of distinct locations from a connection table in which labels occur more than once.

Question ID: `y12s2-net-term-i2`

Current Status: REPLACE

Concept Tested: Change in vertex degree when an edge is added or removed.

Misconception Targeted: Updating only one endpoint or changing unrelated vertex degrees.

Question Type: Typed numeric answer from a before-and-after network description.

Expected Difficulty: D2.

One-sentence description: Student calculates a named vertex's new degree after one specified connection is changed.

Question ID: `y12s2-net-term-i3`

Current Status: KEEP

Concept Tested: Path classification.

Misconception Targeted: Confusing a path with a disconnected network, vertex or degree.

Question Type: Conceptual MCQ, with distractors revised later to use plausible route terms.

Expected Difficulty: D2.

One-sentence description: Student recognises that a route with no repeated vertices is a path.

Question ID: `y12s2-net-term-i4`

Current Status: REPLACE

Concept Tested: Distinction between path, trail and circuit.

Misconception Targeted: Assuming a route with a repeated vertex must repeat an edge or must be a circuit.

Question Type: Typed named classification with controlled accepted variants.

Expected Difficulty: D3.

One-sentence description: Student classifies a route that repeats one vertex but no edge and does not return to its start.

Question ID: `y12s2-net-term-i5`

Current Status: REPLACE

Concept Tested: Weighted-route interpretation and comparison.

Misconception Targeted: Choosing the route with fewer edges instead of the route with the smaller total weight.

Question Type: Typed route label or route-total answer from a weighted diagram.

Expected Difficulty: D3.

One-sentence description: Student compares two valid routes with different edge counts and returns the lower-weight route in a constrained format.

### Mastery Quiz

Question ID: `y12s2-net-term-m1`

Current Status: REPLACE

Concept Tested: Degree sum and a missing vertex degree.

Misconception Targeted: Counting edges once rather than counting their two endpoint contributions.

Question Type: Typed numeric production.

Expected Difficulty: D3.

One-sentence description: Student uses a known edge count and several vertex degrees to determine one missing degree.

Question ID: `y12s2-net-term-m2`

Current Status: REPLACE

Concept Tested: Combined interpretation of a network diagram and degree sequence.

Misconception Targeted: Omitting an incident edge or double-counting an edge at one vertex.

Question Type: Typed numeric answer from a diagram.

Expected Difficulty: D3.

One-sentence description: Student reads a diagram, calculates two relevant degrees, and returns their difference or sum as one exact value.

Question ID: `y12s2-net-term-m3`

Current Status: REPLACE

Concept Tested: Independence of edge direction and edge weight.

Misconception Targeted: Assuming every weighted network is directed or every directed network must be weighted.

Question Type: Misconception-diagnostic MCQ.

Expected Difficulty: D3.

One-sentence description: Student selects the only valid description of a network containing weighted undirected edges and unweighted directed edges.

Question ID: `y12s2-net-term-m4`

Current Status: REPLACE

Concept Tested: Route classification from repeated vertices, repeated edges and endpoints.

Misconception Targeted: Applying a route label from only one visible feature.

Question Type: Typed named classification with robust accepted answers.

Expected Difficulty: D3.

One-sentence description: Student checks all three route constraints before classifying a non-trivial vertex sequence.

Question ID: `y12s2-net-term-m5`

Current Status: REPLACE

Concept Tested: Diagnosing an incorrect path/trail/circuit classification.

Misconception Targeted: Believing that returning to the start is sufficient for an Euler circuit or that repeated vertices invalidate every trail.

Question Type: Misconception-diagnostic MCQ with mathematically specific distractors.

Expected Difficulty: D4.

One-sentence description: Student identifies the precise route restriction violated in a student's proposed classification.

Question ID: `y12s2-net-term-m6`

Current Status: REPLACE

Concept Tested: Directed reachability.

Misconception Targeted: Traversing a directed edge backwards because the two vertices appear connected.

Question Type: Typed constrained route or reachable-vertex answer from a directed diagram.

Expected Difficulty: D4.

One-sentence description: Student determines which destination remains reachable after one edge direction is reversed.

Question ID: `y12s2-net-term-m7`

Current Status: REPLACE

Concept Tested: Degree constraints after a network modification.

Misconception Targeted: Changing only one endpoint degree when an undirected edge is added.

Question Type: Typed numeric production with a before-and-after condition.

Expected Difficulty: D4.

One-sentence description: Student finds the required added connection count from a target degree condition and checks both affected endpoints.

Question ID: `y12s2-net-term-m8`

Current Status: REPLACE

Concept Tested: Tree structure under connectivity and cycle constraints.

Misconception Targeted: Applying the `n - 1` edge rule without checking that the network is connected and acyclic.

Question Type: Typed numeric output from a practical modelling constraint.

Expected Difficulty: D5.

One-sentence description: Student determines the minimum number of additional links required to turn several connected components into one tree without creating a cycle.

Question ID: `y12s2-net-term-m9`

Current Status: REPLACE

Concept Tested: Euler-trail conditions after a network change.

Misconception Targeted: Checking connectivity but ignoring the number and identity of odd-degree vertices.

Question Type: Typed endpoint pair or exact classification with controlled accepted formats.

Expected Difficulty: D5.

One-sentence description: Student tracks how adding one specified edge changes parity and determines the resulting Euler-trail endpoints.

Question ID: `y12s2-net-term-m10`

Current Status: REPLACE

Concept Tested: Synthesis of direction, weight, route validity and structural claims.

Misconception Targeted: Evaluating a route by weight before checking whether its directed edges make it valid.

Question Type: Synthesis MCQ with four worked claims as distractors.

Expected Difficulty: D5.

One-sentence description: Student selects the only claim that correctly combines route direction, total weight and route classification for a practical network.

## Step 5: Diversity Audit

* Procedural fluency: Included through degree calculations, route-weight totals and degree-sum production.
* Conceptual understanding: Included through vertex-edge interpretation, direction-versus-weight distinctions and tree conditions.
* Classification: Included through path, trail, circuit and network-structure classification.
* Interpretation: Included through diagrams, connection tables, directed reachability and practical network representations.
* Transfer: Included through network modifications, changed directions, component connection and parity changes.
* Misconception detection: Included explicitly in guided direction recognition and mastery questions on edge properties, route classification, degree updates, Euler conditions and tree rules.

No required category is missing. Recognition is deliberately confined to a minority of MCQ slots, while production, interpretation and constraint reasoning dominate independent and mastery sections.

## Step 6: Final Verdict

Current Lesson Quality: 4/10

Expected Quality After Rebuild: 9/10

Biggest Improvement: Mastery will move from repeated terminology recall to connected reasoning about route constraints, degree parity, direction, Euler trails and tree structure.
