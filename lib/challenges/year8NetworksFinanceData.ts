import type { PracticeQuestion } from "../lessons/differentialCalculus";

// Year 8 — Wave 5 (closeout). D6 (Level-6) challenge pools, 12 per section, for the three remaining
// Year 8 units: introduction-to-networks (5), number-financial-mathematics (5) and
// data-analysis-investigation (4) = 14 sections. Registered course-scoped
// ("year-8-mathematics/<lesson>") in lib/challenges/index.ts; unlocked after mastery via the existing
// challenge flow (no new system). Auto-markable single-value answers (counts, money, stats + yes/no
// & word answers). The seeder tags challenge questions as D6. No exponents in prose.

// ── Networks: fundamentals ────────────────────────────────────────────────────────────────────
export const networkFundamentalsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-nf-1", prompt: "A network has 5 vertices, each of degree 4. Find the number of edges.", latex: "\\tfrac{\\sum\\deg}{2}", answer: "10", acceptedAnswers: [], hint: "Sum of degrees ÷ 2.", explanation: "20/2 = 10." },
  { id: "chal-y8-nf-2", prompt: "A graph has 6 edges. Find the sum of all the vertex degrees.", latex: "2E", answer: "12", acceptedAnswers: [], hint: "Each edge adds 2 to the degree sum.", explanation: "2 × 6 = 12." },
  { id: "chal-y8-nf-3", prompt: "A vertex is connected to 3 other vertices. Find its degree.", latex: "\\deg", answer: "3", acceptedAnswers: [], hint: "Count the edges at it.", explanation: "3." },
  { id: "chal-y8-nf-4", prompt: "A network has vertex degrees 2, 3, 3 and 4. Find the number of edges.", latex: "\\tfrac{2+3+3+4}{2}", answer: "6", acceptedAnswers: [], hint: "Degree sum ÷ 2.", explanation: "12/2 = 6." },
  { id: "chal-y8-nf-5", prompt: "How many edges are in the complete graph on 4 vertices?", latex: "\\tfrac{4\\times3}{2}", answer: "6", acceptedAnswers: [], hint: "n(n−1)/2.", explanation: "6." },
  { id: "chal-y8-nf-6", prompt: "A graph has 8 vertices and 12 edges. Find the average degree.", latex: "\\tfrac{2E}{V}", answer: "3", acceptedAnswers: [], hint: "2E/V.", explanation: "24/8 = 3." },
  { id: "chal-y8-nf-7", prompt: "How many edges are in the complete graph on 5 vertices?", latex: "\\tfrac{5\\times4}{2}", answer: "10", acceptedAnswers: [], hint: "n(n−1)/2.", explanation: "10." },
  { id: "chal-y8-nf-8", prompt: "A tree has 7 vertices. How many edges does it have?", latex: "V-1", answer: "6", acceptedAnswers: [], hint: "A tree has V − 1 edges.", explanation: "6." },
  { id: "chal-y8-nf-9", prompt: "A network has a degree sum of 18. How many edges does it have?", latex: "\\tfrac{18}{2}", answer: "9", acceptedAnswers: [], hint: "Degree sum ÷ 2.", explanation: "9." },
  { id: "chal-y8-nf-10", prompt: "A vertex has a loop (counts twice) plus 2 other edges. Find its degree.", latex: "2+2", answer: "4", acceptedAnswers: [], hint: "A loop adds 2.", explanation: "4." },
  { id: "chal-y8-nf-11", prompt: "A connected graph has 4 vertices of odd degree. Is an Eulerian trail possible? Answer yes or no.", latex: "\\text{odd}=4", answer: "no", acceptedAnswers: ["n"], hint: "A trail needs 0 or 2 odd vertices.", explanation: "No — too many odd vertices." },
  { id: "chal-y8-nf-12", prompt: "A simple graph has 5 vertices. What is the maximum possible number of edges?", latex: "\\tfrac{5\\times4}{2}", answer: "10", acceptedAnswers: [], hint: "Complete graph K5.", explanation: "10." },
];

// ── Networks: paths and circuits ──────────────────────────────────────────────────────────────
export const pathsCircuitsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-pc-1", prompt: "A path visits 5 vertices in order. How many edges does it use?", latex: "5-1", answer: "4", acceptedAnswers: [], hint: "One fewer than vertices.", explanation: "4." },
  { id: "chal-y8-pc-2", prompt: "A circuit starts and ends at the same vertex. Is the start vertex the same as the end vertex? Answer yes or no.", latex: "\\text{circuit}", answer: "yes", acceptedAnswers: ["y"], hint: "By definition.", explanation: "Yes." },
  { id: "chal-y8-pc-3", prompt: "A 4-cycle A-B-C-D-A. How many edges does it have?", latex: "\\text{cycle}", answer: "4", acceptedAnswers: [], hint: "Edges = vertices in a cycle.", explanation: "4." },
  { id: "chal-y8-pc-4", prompt: "A cycle has 7 vertices. How many edges?", latex: "\\text{cycle}", answer: "7", acceptedAnswers: [], hint: "Edges = vertices.", explanation: "7." },
  { id: "chal-y8-pc-5", prompt: "A path does not repeat vertices. Can a path repeat a vertex? Answer yes or no.", latex: "\\text{path}", answer: "no", acceptedAnswers: ["n"], hint: "Definition of a path.", explanation: "No." },
  { id: "chal-y8-pc-6", prompt: "A Hamiltonian path visits every vertex once. In a graph of 6 vertices, how many vertices does it visit?", latex: "\\text{Hamilton}", answer: "6", acceptedAnswers: [], hint: "Every vertex.", explanation: "6." },
  { id: "chal-y8-pc-7", prompt: "A circuit has length 8 (8 edges). How many edges does it use?", latex: "\\text{length}", answer: "8", acceptedAnswers: [], hint: "Length = edges.", explanation: "8." },
  { id: "chal-y8-pc-8", prompt: "The shortest path A→D is A-B-D with AB = 3 and BD = 5. Find its total length.", latex: "3+5", answer: "8", acceptedAnswers: [], hint: "Add the edge weights.", explanation: "8." },
  { id: "chal-y8-pc-9", prompt: "A graph is a straight line of 6 vertices. How many edges?", latex: "6-1", answer: "5", acceptedAnswers: [], hint: "V − 1.", explanation: "5." },
  { id: "chal-y8-pc-10", prompt: "A Hamiltonian circuit on 5 vertices uses how many edges?", latex: "\\text{circuit}", answer: "5", acceptedAnswers: [], hint: "Returns to start.", explanation: "5." },
  { id: "chal-y8-pc-11", prompt: "Two routes A→B: A-C-B (2 edges) and A-D-E-B (3 edges). Which is shorter in edges?", latex: "\\min(2,3)", answer: "2", acceptedAnswers: [], hint: "Fewer edges.", explanation: "2." },
  { id: "chal-y8-pc-12", prompt: "A closed walk that uses every edge exactly once is an Eulerian what? Answer circuit or path.", latex: "\\text{Euler}", answer: "circuit", acceptedAnswers: [], hint: "Closed = returns to start.", explanation: "Eulerian circuit." },
];

// ── Networks: Eulerian trails and circuits ────────────────────────────────────────────────────
export const eulerianTrailsCircuitsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-et-1", prompt: "An Eulerian circuit requires every vertex to have which kind of degree? Answer even or odd.", latex: "\\deg", answer: "even", acceptedAnswers: [], hint: "All even.", explanation: "Even." },
  { id: "chal-y8-et-2", prompt: "A connected graph has 0 odd-degree vertices. Is an Eulerian circuit possible? Answer yes or no.", latex: "\\text{odd}=0", answer: "yes", acceptedAnswers: ["y"], hint: "All even degrees.", explanation: "Yes." },
  { id: "chal-y8-et-3", prompt: "A connected graph has exactly 2 odd-degree vertices. Is an Eulerian trail possible? Answer yes or no.", latex: "\\text{odd}=2", answer: "yes", acceptedAnswers: ["y"], hint: "A trail allows exactly 2 odd.", explanation: "Yes." },
  { id: "chal-y8-et-4", prompt: "A connected graph has 3 odd-degree vertices. Is an Eulerian trail possible? Answer yes or no.", latex: "\\text{odd}=3", answer: "no", acceptedAnswers: ["n"], hint: "Need 0 or 2 odd.", explanation: "No." },
  { id: "chal-y8-et-5", prompt: "What is the maximum number of odd-degree vertices allowed for an Eulerian trail?", latex: "\\text{max odd}", answer: "2", acceptedAnswers: [], hint: "0 or 2 are allowed.", explanation: "2." },
  { id: "chal-y8-et-6", prompt: "A connected graph has degrees 2, 2, 2, 2. Is an Eulerian circuit possible? Answer yes or no.", latex: "\\text{all even}", answer: "yes", acceptedAnswers: ["y"], hint: "All even.", explanation: "Yes." },
  { id: "chal-y8-et-7", prompt: "A graph has degrees 3, 3, 2, 2. How many odd-degree vertices are there?", latex: "\\text{count odd}", answer: "2", acceptedAnswers: [], hint: "Count the odd degrees.", explanation: "2." },
  { id: "chal-y8-et-8", prompt: "A connected graph has degrees 3, 3, 2, 2. Is an Eulerian trail possible? Answer yes or no.", latex: "\\text{odd}=2", answer: "yes", acceptedAnswers: ["y"], hint: "Exactly 2 odd.", explanation: "Yes." },
  { id: "chal-y8-et-9", prompt: "A connected graph has all even degrees. Does an Eulerian circuit exist? Answer yes or no.", latex: "\\text{all even}", answer: "yes", acceptedAnswers: ["y"], hint: "All even + connected.", explanation: "Yes." },
  { id: "chal-y8-et-10", prompt: "The number of odd-degree vertices in any graph must be even. Can a graph have exactly 3 odd-degree vertices? Answer yes or no.", latex: "\\text{handshake}", answer: "no", acceptedAnswers: ["n"], hint: "The count of odd vertices is always even.", explanation: "No." },
  { id: "chal-y8-et-11", prompt: "A network has degrees 4, 4, 4, 3 (sum 15). Is such a graph possible? Answer yes or no.", latex: "\\sum\\deg=15", answer: "no", acceptedAnswers: ["n"], hint: "The degree sum must be even.", explanation: "No — 15 is odd." },
  { id: "chal-y8-et-12", prompt: "Degrees are 1, 1, 2, 2, 2. How many odd-degree vertices are there?", latex: "\\text{count odd}", answer: "2", acceptedAnswers: [], hint: "Count the 1s.", explanation: "2." },
];

// ── Networks: planar graphs (Euler's formula) ─────────────────────────────────────────────────
export const planarGraphsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-pg-1", prompt: "A connected planar graph has 5 vertices and 6 edges. Find the number of faces (V − E + F = 2).", latex: "F=2-V+E", answer: "3", acceptedAnswers: [], hint: "F = 2 − 5 + 6.", explanation: "3." },
  { id: "chal-y8-pg-2", prompt: "A connected planar graph has 6 vertices and 9 edges. Find the number of faces.", latex: "F=2-6+9", answer: "5", acceptedAnswers: [], hint: "Euler's formula.", explanation: "5." },
  { id: "chal-y8-pg-3", prompt: "A connected planar graph has 4 vertices and 4 faces. Find the number of edges.", latex: "E=V+F-2", answer: "6", acceptedAnswers: [], hint: "E = V + F − 2.", explanation: "6." },
  { id: "chal-y8-pg-4", prompt: "A connected planar graph has 8 edges and 5 faces. Find the number of vertices.", latex: "V=2-F+E", answer: "5", acceptedAnswers: [], hint: "V = 2 − F + E.", explanation: "5." },
  { id: "chal-y8-pg-5", prompt: "In Euler's formula V − E + F = k, what is k?", latex: "V-E+F", answer: "2", acceptedAnswers: [], hint: "For connected planar graphs.", explanation: "2." },
  { id: "chal-y8-pg-6", prompt: "A cube graph has 8 vertices and 12 edges. Find the number of faces.", latex: "F=2-8+12", answer: "6", acceptedAnswers: [], hint: "Euler's formula.", explanation: "6." },
  { id: "chal-y8-pg-7", prompt: "A triangle graph has 3 vertices and 3 edges. Find the number of faces (including the outer face).", latex: "F=2-3+3", answer: "2", acceptedAnswers: [], hint: "Euler's formula.", explanation: "2." },
  { id: "chal-y8-pg-8", prompt: "A connected planar graph has 10 vertices and 15 edges. Find the number of faces.", latex: "F=2-10+15", answer: "7", acceptedAnswers: [], hint: "Euler's formula.", explanation: "7." },
  { id: "chal-y8-pg-9", prompt: "A tree (V vertices, V − 1 edges) is planar. How many faces does it have?", latex: "F=2-V+(V-1)", answer: "1", acceptedAnswers: [], hint: "Just the outer face.", explanation: "1." },
  { id: "chal-y8-pg-10", prompt: "A connected planar graph has 7 vertices and 5 faces. Find the number of edges.", latex: "E=V+F-2", answer: "10", acceptedAnswers: [], hint: "E = V + F − 2.", explanation: "10." },
  { id: "chal-y8-pg-11", prompt: "A connected planar graph has 6 faces and 10 edges. Find the number of vertices.", latex: "V=2-F+E", answer: "6", acceptedAnswers: [], hint: "V = 2 − F + E.", explanation: "6." },
  { id: "chal-y8-pg-12", prompt: "K4 drawn without crossings has 4 vertices and 6 edges. Find the number of faces.", latex: "F=2-4+6", answer: "4", acceptedAnswers: [], hint: "Euler's formula.", explanation: "4." },
];

// ── Networks: applications ────────────────────────────────────────────────────────────────────
export const networkApplicationsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-na-1", prompt: "A minimum spanning tree on 6 vertices has how many edges?", latex: "V-1", answer: "5", acceptedAnswers: [], hint: "V − 1.", explanation: "5." },
  { id: "chal-y8-na-2", prompt: "Route A→D: A-B-D (4 + 3) or A-C (10). Find the shorter total length.", latex: "\\min(7,10)", answer: "7", acceptedAnswers: [], hint: "Compare 7 and 10.", explanation: "7." },
  { id: "chal-y8-na-3", prompt: "A spanning tree connecting 5 towns uses how many roads?", latex: "5-1", answer: "4", acceptedAnswers: [], hint: "V − 1.", explanation: "4." },
  { id: "chal-y8-na-4", prompt: "Edge weights are 3, 5, 2, 8, 4. Which is the smallest edge to add first in a minimum spanning tree?", latex: "\\min", answer: "2", acceptedAnswers: [], hint: "Smallest weight.", explanation: "2." },
  { id: "chal-y8-na-5", prompt: "A delivery route must use every road exactly once and return to start. This is an Eulerian what? Answer circuit or path.", latex: "\\text{Euler}", answer: "circuit", acceptedAnswers: [], hint: "Returns to start.", explanation: "Circuit." },
  { id: "chal-y8-na-6", prompt: "The cheapest way to connect 8 nodes uses a spanning tree with how many edges?", latex: "8-1", answer: "7", acceptedAnswers: [], hint: "n − 1.", explanation: "7." },
  { id: "chal-y8-na-7", prompt: "Path A→C: A-B-C (2 + 6) or A-C direct (9). Find the shorter total length.", latex: "\\min(8,9)", answer: "8", acceptedAnswers: [], hint: "Compare 8 and 9.", explanation: "8." },
  { id: "chal-y8-na-8", prompt: "A project network has paths of length 12, 15 and 9. Find the critical (longest) path length.", latex: "\\max", answer: "15", acceptedAnswers: [], hint: "Longest path.", explanation: "15." },
  { id: "chal-y8-na-9", prompt: "A spanning tree of 10 vertices has how many edges?", latex: "10-1", answer: "9", acceptedAnswers: [], hint: "V − 1.", explanation: "9." },
  { id: "chal-y8-na-10", prompt: "A spanning tree has edges of weight 3, 5, 2 and 4. Find its total weight.", latex: "3+5+2+4", answer: "14", acceptedAnswers: [], hint: "Add the weights.", explanation: "14." },
  { id: "chal-y8-na-11", prompt: "Routes measure 20, 18 and 25 km. Find the shortest.", latex: "\\min", answer: "18", acceptedAnswers: [], hint: "Smallest.", explanation: "18." },
  { id: "chal-y8-na-12", prompt: "Four nodes are fully connected (6 links). A spanning tree uses how many links?", latex: "4-1", answer: "3", acceptedAnswers: [], hint: "V − 1.", explanation: "3." },
];

// ── Financial: simple interest introduction ───────────────────────────────────────────────────
export const simpleInterestIntroChallenge: PracticeQuestion[] = [
  { id: "chal-y8-sii-1", prompt: "Find the simple interest on $1000 at 5% per year for 3 years.", latex: "I=Prn", answer: "150", acceptedAnswers: [], hint: "1000 × 0.05 × 3.", explanation: "$150." },
  { id: "chal-y8-sii-2", prompt: "Find the simple interest on $2000 at 4% per year for 2 years.", latex: "I=Prn", answer: "160", acceptedAnswers: [], hint: "2000 × 0.04 × 2.", explanation: "$160." },
  { id: "chal-y8-sii-3", prompt: "Find the simple interest on $5000 at 6% for 1 year.", latex: "I=Prn", answer: "300", acceptedAnswers: [], hint: "5000 × 0.06.", explanation: "$300." },
  { id: "chal-y8-sii-4", prompt: "Find the total amount for $800 at 10% simple interest for 2 years.", latex: "A=P+Prn", answer: "960", acceptedAnswers: [], hint: "800 + 160.", explanation: "$960." },
  { id: "chal-y8-sii-5", prompt: "$600 earns $90 interest over 3 years. Find the annual rate (%).", latex: "r=\\tfrac{I}{Pn}", answer: "5", acceptedAnswers: [], hint: "90/(600×3).", explanation: "5%." },
  { id: "chal-y8-sii-6", prompt: "Find the simple interest on $1200 at 5% for 4 years.", latex: "I=Prn", answer: "240", acceptedAnswers: [], hint: "1200 × 0.05 × 4.", explanation: "$240." },
  { id: "chal-y8-sii-7", prompt: "How many years for $1000 at 5% per year to earn $250 simple interest?", latex: "n=\\tfrac{I}{Pr}", answer: "5", acceptedAnswers: [], hint: "250/(1000×0.05).", explanation: "5 years." },
  { id: "chal-y8-sii-8", prompt: "A principal earns $300 interest at 6% per year over 2 years. Find the principal.", latex: "P=\\tfrac{I}{rn}", answer: "2500", acceptedAnswers: [], hint: "300/(0.06×2).", explanation: "$2500." },
  { id: "chal-y8-sii-9", prompt: "Find the simple interest on $4000 at 3% for 5 years.", latex: "I=Prn", answer: "600", acceptedAnswers: [], hint: "4000 × 0.03 × 5.", explanation: "$600." },
  { id: "chal-y8-sii-10", prompt: "$2000 earns $200 simple interest in 2 years. Find the annual rate (%).", latex: "r=\\tfrac{I}{Pn}", answer: "5", acceptedAnswers: [], hint: "200/(2000×2).", explanation: "5%." },
  { id: "chal-y8-sii-11", prompt: "Find the simple interest on $1500 at 8% per year for 6 months.", latex: "I=Pr(0.5)", answer: "60", acceptedAnswers: [], hint: "6 months = 0.5 year.", explanation: "1500 × 0.08 × 0.5 = $60." },
  { id: "chal-y8-sii-12", prompt: "Find the total to repay on $2500 borrowed at 4% simple interest for 3 years.", latex: "A=P+Prn", answer: "2800", acceptedAnswers: [], hint: "2500 + 300.", explanation: "$2800." },
];

// ── Financial: wages and salary ───────────────────────────────────────────────────────────────
export const wagesSalaryChallenge: PracticeQuestion[] = [
  { id: "chal-y8-ws-1", prompt: "A worker earns $25 per hour for 38 hours. Find the weekly pay ($).", latex: "25\\times38", answer: "950", acceptedAnswers: [], hint: "Rate × hours.", explanation: "$950." },
  { id: "chal-y8-ws-2", prompt: "An annual salary is $78000. Find the monthly pay ($).", latex: "\\tfrac{78000}{12}", answer: "6500", acceptedAnswers: [], hint: "÷ 12.", explanation: "$6500." },
  { id: "chal-y8-ws-3", prompt: "Overtime is time-and-a-half on $20/hr. Find the pay for 4 overtime hours ($).", latex: "1.5(20)(4)", answer: "120", acceptedAnswers: [], hint: "$30/hr × 4.", explanation: "$120." },
  { id: "chal-y8-ws-4", prompt: "$30/hr for 40 normal hours plus 5 hours at double time. Find the total pay ($).", latex: "1200+300", answer: "1500", acceptedAnswers: [], hint: "1200 + (60×5).", explanation: "$1500." },
  { id: "chal-y8-ws-5", prompt: "A salary is $52000 per year. Find the weekly pay over 52 weeks ($).", latex: "\\tfrac{52000}{52}", answer: "1000", acceptedAnswers: [], hint: "÷ 52.", explanation: "$1000." },
  { id: "chal-y8-ws-6", prompt: "Commission is 5% on $8000 of sales. Find the commission ($).", latex: "0.05\\times8000", answer: "400", acceptedAnswers: [], hint: "5% of 8000.", explanation: "$400." },
  { id: "chal-y8-ws-7", prompt: "$18/hr for 35 hours plus a $50 bonus. Find the total ($).", latex: "18(35)+50", answer: "680", acceptedAnswers: [], hint: "630 + 50.", explanation: "$680." },
  { id: "chal-y8-ws-8", prompt: "Fortnightly pay is $2400. Find the annual pay over 26 fortnights ($).", latex: "2400\\times26", answer: "62400", acceptedAnswers: [], hint: "× 26.", explanation: "$62400." },
  { id: "chal-y8-ws-9", prompt: "Double time on $22/hr for 3 hours. Find the pay ($).", latex: "2(22)(3)", answer: "132", acceptedAnswers: [], hint: "$44/hr × 3.", explanation: "$132." },
  { id: "chal-y8-ws-10", prompt: "$40000 base plus 10% commission on $20000 sales. Find the total ($).", latex: "40000+0.1(20000)", answer: "42000", acceptedAnswers: [], hint: "40000 + 2000.", explanation: "$42000." },
  { id: "chal-y8-ws-11", prompt: "38 hours at $26.50 per hour. Find the weekly pay ($).", latex: "26.5\\times38", answer: "1007", acceptedAnswers: [], hint: "Rate × hours.", explanation: "$1007." },
  { id: "chal-y8-ws-12", prompt: "A monthly salary is $5500. Find the annual salary ($).", latex: "5500\\times12", answer: "66000", acceptedAnswers: [], hint: "× 12.", explanation: "$66000." },
];

// ── Financial: income tax basics ──────────────────────────────────────────────────────────────
export const incomeTaxBasicsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-itb-1", prompt: "Tax is 20% of a $60000 income. Find the tax payable ($).", latex: "0.2\\times60000", answer: "12000", acceptedAnswers: [], hint: "20% of 60000.", explanation: "$12000." },
  { id: "chal-y8-itb-2", prompt: "Taxable income $50000 with an $18000 tax-free threshold, taxed at 19% above it. Find the tax ($).", latex: "0.19(50000-18000)", answer: "6080", acceptedAnswers: [], hint: "19% of 32000.", explanation: "$6080." },
  { id: "chal-y8-itb-3", prompt: "Gross income $70000 with $14000 tax. Find the net income ($).", latex: "70000-14000", answer: "56000", acceptedAnswers: [], hint: "Gross − tax.", explanation: "$56000." },
  { id: "chal-y8-itb-4", prompt: "The Medicare levy is 2% of an $80000 income. Find the levy ($).", latex: "0.02\\times80000", answer: "1600", acceptedAnswers: [], hint: "2% of 80000.", explanation: "$1600." },
  { id: "chal-y8-itb-5", prompt: "$9000 tax is paid on a $45000 income. Find the average tax rate (%).", latex: "\\tfrac{9000}{45000}", answer: "20", acceptedAnswers: [], hint: "Tax ÷ income.", explanation: "20%." },
  { id: "chal-y8-itb-6", prompt: "Income $40000 with $5000 of deductions. Find the taxable income ($).", latex: "40000-5000", answer: "35000", acceptedAnswers: [], hint: "Income − deductions.", explanation: "$35000." },
  { id: "chal-y8-itb-7", prompt: "Net pay is $48000 after $12000 tax. Find the gross income ($).", latex: "48000+12000", answer: "60000", acceptedAnswers: [], hint: "Net + tax.", explanation: "$60000." },
  { id: "chal-y8-itb-8", prompt: "Tax is 30% of the income above $30000. Find the tax on a $90000 income ($).", latex: "0.3(90000-30000)", answer: "18000", acceptedAnswers: [], hint: "30% of 60000.", explanation: "$18000." },
  { id: "chal-y8-itb-9", prompt: "Fortnightly tax is $400. Find the annual tax over 26 fortnights ($).", latex: "400\\times26", answer: "10400", acceptedAnswers: [], hint: "× 26.", explanation: "$10400." },
  { id: "chal-y8-itb-10", prompt: "Tax is 19% of (income − $18200). Find the tax on a $55000 income ($).", latex: "0.19(55000-18200)", answer: "6992", acceptedAnswers: [], hint: "19% of 36800.", explanation: "$6992." },
  { id: "chal-y8-itb-11", prompt: "A $1500 tax refund means tax paid exceeded tax owed by how much ($)?", latex: "\\text{refund}", answer: "1500", acceptedAnswers: [], hint: "The refund amount.", explanation: "$1500." },
  { id: "chal-y8-itb-12", prompt: "Tax is 32.5% of $20000. Find the tax ($).", latex: "0.325\\times20000", answer: "6500", acceptedAnswers: [], hint: "32.5% of 20000.", explanation: "$6500." },
];

// ── Financial: budgeting and money management ─────────────────────────────────────────────────
export const budgetingMoneyManagementChallenge: PracticeQuestion[] = [
  { id: "chal-y8-bmm-1", prompt: "Income is $4000 per month with $3200 of expenses. Find the monthly savings ($).", latex: "4000-3200", answer: "800", acceptedAnswers: [], hint: "Income − expenses.", explanation: "$800." },
  { id: "chal-y8-bmm-2", prompt: "Rent is 30% of a $5000 income. Find the rent ($).", latex: "0.3\\times5000", answer: "1500", acceptedAnswers: [], hint: "30% of 5000.", explanation: "$1500." },
  { id: "chal-y8-bmm-3", prompt: "A weekly budget is $600 and $420 has been spent. Find the amount remaining ($).", latex: "600-420", answer: "180", acceptedAnswers: [], hint: "Budget − spent.", explanation: "$180." },
  { id: "chal-y8-bmm-4", prompt: "An income of $50000 with 15% saved. Find the annual savings ($).", latex: "0.15\\times50000", answer: "7500", acceptedAnswers: [], hint: "15% of 50000.", explanation: "$7500." },
  { id: "chal-y8-bmm-5", prompt: "Monthly expenses: rent $1200, food $600, transport $300, other $400. Find the total ($).", latex: "1200+600+300+400", answer: "2500", acceptedAnswers: [], hint: "Add them.", explanation: "$2500." },
  { id: "chal-y8-bmm-6", prompt: "Income $3000 with $3400 of expenses. Find the shortfall ($).", latex: "3400-3000", answer: "400", acceptedAnswers: [], hint: "Expenses − income.", explanation: "$400." },
  { id: "chal-y8-bmm-7", prompt: "Saving $250 per month, find the total saved in 2 years ($).", latex: "250\\times24", answer: "6000", acceptedAnswers: [], hint: "× 24 months.", explanation: "$6000." },
  { id: "chal-y8-bmm-8", prompt: "A $1200 holiday is saved over 6 months. Find the monthly saving ($).", latex: "\\tfrac{1200}{6}", answer: "200", acceptedAnswers: [], hint: "÷ 6.", explanation: "$200." },
  { id: "chal-y8-bmm-9", prompt: "80% of a $2500 income is spent. Find the amount saved ($).", latex: "0.2\\times2500", answer: "500", acceptedAnswers: [], hint: "20% is saved.", explanation: "$500." },
  { id: "chal-y8-bmm-10", prompt: "A budget is $800 and food is one quarter of it. Find the food amount ($).", latex: "\\tfrac{800}{4}", answer: "200", acceptedAnswers: [], hint: "1/4 of 800.", explanation: "$200." },
  { id: "chal-y8-bmm-11", prompt: "Annual income $60000 with $52000 of expenses. Find the annual surplus ($).", latex: "60000-52000", answer: "8000", acceptedAnswers: [], hint: "Income − expenses.", explanation: "$8000." },
  { id: "chal-y8-bmm-12", prompt: "Saving $50 per week for 1 year (52 weeks). Find the total ($).", latex: "50\\times52", answer: "2600", acceptedAnswers: [], hint: "× 52.", explanation: "$2600." },
];

// ── Financial: credit and debit ───────────────────────────────────────────────────────────────
export const creditDebitChallenge: PracticeQuestion[] = [
  { id: "chal-y8-cd-1", prompt: "A credit card balance of $2000 is charged 18% per year. Find one year's interest ($).", latex: "0.18\\times2000", answer: "360", acceptedAnswers: [], hint: "18% of 2000.", explanation: "$360." },
  { id: "chal-y8-cd-2", prompt: "You owe $500 and pay $120 per month for 4 months. Find the amount still owing ($).", latex: "500-480", answer: "20", acceptedAnswers: [], hint: "500 − 4×120.", explanation: "$20." },
  { id: "chal-y8-cd-3", prompt: "A debit (withdrawal) of $80 is made on a $300 balance. Find the new balance ($).", latex: "300-80", answer: "220", acceptedAnswers: [], hint: "Subtract.", explanation: "$220." },
  { id: "chal-y8-cd-4", prompt: "A $1500 credit balance is charged 1.5% per month. Find one month's interest ($).", latex: "0.015\\times1500", answer: "22.5", acceptedAnswers: [], hint: "1.5% of 1500.", explanation: "$22.50." },
  { id: "chal-y8-cd-5", prompt: "The minimum payment is 3% of a $4000 balance. Find the minimum payment ($).", latex: "0.03\\times4000", answer: "120", acceptedAnswers: [], hint: "3% of 4000.", explanation: "$120." },
  { id: "chal-y8-cd-6", prompt: "Starting at $0: a $250 deposit then a $90 withdrawal. Find the balance ($).", latex: "250-90", answer: "160", acceptedAnswers: [], hint: "250 − 90.", explanation: "$160." },
  { id: "chal-y8-cd-7", prompt: "A $6000 loan at 10% simple interest for 2 years. Find the total interest ($).", latex: "6000\\times0.1\\times2", answer: "1200", acceptedAnswers: [], hint: "Prn.", explanation: "$1200." },
  { id: "chal-y8-cd-8", prompt: "An account is overdrawn by $50, then a $200 deposit is made. Find the balance ($).", latex: "-50+200", answer: "150", acceptedAnswers: [], hint: "200 − 50.", explanation: "$150." },
  { id: "chal-y8-cd-9", prompt: "A $3000 credit balance with 2% monthly interest and no repayment. Find the interest after 1 month ($).", latex: "0.02\\times3000", answer: "60", acceptedAnswers: [], hint: "2% of 3000.", explanation: "$60." },
  { id: "chal-y8-cd-10", prompt: "A $1200 purchase is paid interest-free over 12 months. Find the monthly payment ($).", latex: "\\tfrac{1200}{12}", answer: "100", acceptedAnswers: [], hint: "÷ 12.", explanation: "$100." },
  { id: "chal-y8-cd-11", prompt: "An $800 purchase has a 20% deposit paid. Find the amount still owing ($).", latex: "0.8\\times800", answer: "640", acceptedAnswers: [], hint: "80% remains.", explanation: "$640." },
  { id: "chal-y8-cd-12", prompt: "A $30 late fee is added to a $470 balance. Find the new balance ($).", latex: "470+30", answer: "500", acceptedAnswers: [], hint: "Add the fee.", explanation: "$500." },
];

// ── Data investigation: statistical questions ─────────────────────────────────────────────────
export const statisticalQuestionsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-sq-1", prompt: "Is 'What is your favourite colour?' categorical or numerical data? Answer the word.", latex: "\\text{type}", answer: "categorical", acceptedAnswers: [], hint: "A label, not a number.", explanation: "Categorical." },
  { id: "chal-y8-sq-2", prompt: "Is 'How many hours do you sleep?' categorical or numerical data? Answer the word.", latex: "\\text{type}", answer: "numerical", acceptedAnswers: [], hint: "A count.", explanation: "Numerical." },
  { id: "chal-y8-sq-3", prompt: "A statistical question is answered using data that varies. Is 'What is 2 + 2?' a statistical question? Answer yes or no.", latex: "\\text{stat?}", answer: "no", acceptedAnswers: ["n"], hint: "It has one fixed answer.", explanation: "No." },
  { id: "chal-y8-sq-4", prompt: "Is 'How tall are students in our class?' categorical or numerical? Answer the word.", latex: "\\text{type}", answer: "numerical", acceptedAnswers: [], hint: "Measured number.", explanation: "Numerical." },
  { id: "chal-y8-sq-5", prompt: "Is 'Don't you love our great school?' a biased (leading) question? Answer yes or no.", latex: "\\text{biased?}", answer: "yes", acceptedAnswers: ["y"], hint: "It leads the respondent.", explanation: "Yes." },
  { id: "chal-y8-sq-6", prompt: "Surveying 30 of 600 students is a census or a sample? Answer the word.", latex: "\\text{method}", answer: "sample", acceptedAnswers: [], hint: "Not everyone.", explanation: "Sample." },
  { id: "chal-y8-sq-7", prompt: "Is 'sport played' categorical or numerical data? Answer the word.", latex: "\\text{type}", answer: "categorical", acceptedAnswers: [], hint: "A label.", explanation: "Categorical." },
  { id: "chal-y8-sq-8", prompt: "Is 'favourite subject' categorical or numerical? Answer the word.", latex: "\\text{type}", answer: "categorical", acceptedAnswers: [], hint: "A label.", explanation: "Categorical." },
  { id: "chal-y8-sq-9", prompt: "Surveying all 600 students in a school is a census or a sample? Answer the word.", latex: "\\text{method}", answer: "census", acceptedAnswers: [], hint: "Everyone is included.", explanation: "Census." },
  { id: "chal-y8-sq-10", prompt: "Does measuring 'what proportion walk to school' use categorical data? Answer yes or no.", latex: "\\text{type}", answer: "yes", acceptedAnswers: ["y"], hint: "Walk / don't walk are categories.", explanation: "Yes." },
  { id: "chal-y8-sq-11", prompt: "Is 'number of siblings' discrete or continuous? Answer the word.", latex: "\\text{type}", answer: "discrete", acceptedAnswers: [], hint: "Whole numbers.", explanation: "Discrete." },
  { id: "chal-y8-sq-12", prompt: "Is 'reaction time in seconds' discrete or continuous? Answer the word.", latex: "\\text{type}", answer: "continuous", acceptedAnswers: [], hint: "Any value in a range.", explanation: "Continuous." },
];

// ── Data investigation: data collection ───────────────────────────────────────────────────────
export const dataCollectionChallenge: PracticeQuestion[] = [
  { id: "chal-y8-dc-1", prompt: "A sample of 50 from 1000 is what fraction (as a decimal)?", latex: "\\tfrac{50}{1000}", answer: "0.05", acceptedAnswers: ["1/20"], hint: "50/1000.", explanation: "0.05." },
  { id: "chal-y8-dc-2", prompt: "Does random sampling help reduce bias? Answer yes or no.", latex: "\\text{random}", answer: "yes", acceptedAnswers: ["y"], hint: "Everyone has equal chance.", explanation: "Yes." },
  { id: "chal-y8-dc-3", prompt: "200 surveys sent, 150 returned. Find the response rate (%).", latex: "\\tfrac{150}{200}", answer: "75", acceptedAnswers: [], hint: "150/200.", explanation: "75%." },
  { id: "chal-y8-dc-4", prompt: "To take a 10% sample of 1200 students, how many should you survey?", latex: "0.1\\times1200", answer: "120", acceptedAnswers: [], hint: "10% of 1200.", explanation: "120." },
  { id: "chal-y8-dc-5", prompt: "Is surveying only your friends a biased method? Answer yes or no.", latex: "\\text{biased?}", answer: "yes", acceptedAnswers: ["y"], hint: "Not representative.", explanation: "Yes." },
  { id: "chal-y8-dc-6", prompt: "A stratified 10% sample of 400 boys and 600 girls takes how many girls?", latex: "0.1\\times600", answer: "60", acceptedAnswers: [], hint: "10% of the girls.", explanation: "60." },
  { id: "chal-y8-dc-7", prompt: "In a sample of 80, 20 said yes. Find the proportion (as a decimal).", latex: "\\tfrac{20}{80}", answer: "0.25", acceptedAnswers: ["1/4"], hint: "20/80.", explanation: "0.25." },
  { id: "chal-y8-dc-8", prompt: "Measuring the heights of all Olympic athletes is a census or a sample? Answer the word.", latex: "\\text{method}", answer: "census", acceptedAnswers: [], hint: "All of them.", explanation: "Census." },
  { id: "chal-y8-dc-9", prompt: "Does a larger sample generally give more reliable results? Answer yes or no.", latex: "\\text{reliable}", answer: "yes", acceptedAnswers: ["y"], hint: "More data, less variability.", explanation: "Yes." },
  { id: "chal-y8-dc-10", prompt: "A 2% sample of 5000 people is how many people?", latex: "0.02\\times5000", answer: "100", acceptedAnswers: [], hint: "2% of 5000.", explanation: "100." },
  { id: "chal-y8-dc-11", prompt: "Of 300 responses, 240 are valid. Find the valid rate (%).", latex: "\\tfrac{240}{300}", answer: "80", acceptedAnswers: [], hint: "240/300.", explanation: "80%." },
  { id: "chal-y8-dc-12", prompt: "Systematic sampling picks every 10th person from 500. How many are picked?", latex: "\\tfrac{500}{10}", answer: "50", acceptedAnswers: [], hint: "500/10.", explanation: "50." },
];

// ── Data investigation: statistical analysis ──────────────────────────────────────────────────
export const statisticalAnalysisChallenge: PracticeQuestion[] = [
  { id: "chal-y8-sa-1", prompt: "Find the mean of 12, 15, 18, 15.", latex: "\\bar{x}", answer: "15", acceptedAnswers: [], hint: "Sum ÷ 4.", explanation: "60/4 = 15." },
  { id: "chal-y8-sa-2", prompt: "Find the median of 4, 9, 2, 7, 5.", latex: "\\text{median}", answer: "5", acceptedAnswers: [], hint: "Sort first.", explanation: "2,4,5,7,9 → 5." },
  { id: "chal-y8-sa-3", prompt: "Find the mode of 3, 5, 5, 7, 9.", latex: "\\text{mode}", answer: "5", acceptedAnswers: [], hint: "Most frequent.", explanation: "5." },
  { id: "chal-y8-sa-4", prompt: "Find the range of 22, 8, 30, 15.", latex: "30-8", answer: "22", acceptedAnswers: [], hint: "Max − min.", explanation: "22." },
  { id: "chal-y8-sa-5", prompt: "The mean of 5 values is 20. After removing a value of 40, find the new mean of the 4 remaining.", latex: "\\tfrac{100-40}{4}", answer: "15", acceptedAnswers: [], hint: "(100 − 40)/4.", explanation: "60/4 = 15." },
  { id: "chal-y8-sa-6", prompt: "Find the IQR if Q1 = 12 and Q3 = 30.", latex: "30-12", answer: "18", acceptedAnswers: [], hint: "Q3 − Q1.", explanation: "18." },
  { id: "chal-y8-sa-7", prompt: "Find the mean of 100, 200, 300.", latex: "\\bar{x}", answer: "200", acceptedAnswers: [], hint: "Sum ÷ 3.", explanation: "200." },
  { id: "chal-y8-sa-8", prompt: "A dataset has mean 50 and median 45. Which way is it skewed? Answer left or right.", latex: "\\bar{x}>\\text{median}", answer: "right", acceptedAnswers: [], hint: "Mean above median.", explanation: "Right." },
  { id: "chal-y8-sa-9", prompt: "Add 10 to every value of a set with mean 25. Find the new mean.", latex: "25+10", answer: "35", acceptedAnswers: [], hint: "The mean shifts by 10.", explanation: "35." },
  { id: "chal-y8-sa-10", prompt: "Find the median of 2, 4, 6, 8, 10, 12.", latex: "\\tfrac{6+8}{2}", answer: "7", acceptedAnswers: [], hint: "Average the middle two.", explanation: "7." },
  { id: "chal-y8-sa-11", prompt: "The range is 40 and the minimum is 15. Find the maximum.", latex: "15+40", answer: "55", acceptedAnswers: [], hint: "Min + range.", explanation: "55." },
  { id: "chal-y8-sa-12", prompt: "The mean of 7 values is 8. Find their total.", latex: "8\\times7", answer: "56", acceptedAnswers: [], hint: "Mean × count.", explanation: "56." },
];

// ── Data investigation: communicating findings ────────────────────────────────────────────────
export const communicatingFindingsChallenge: PracticeQuestion[] = [
  { id: "chal-y8-cf-1", prompt: "A graph shows sales rising every month. Is the trend increasing or decreasing? Answer the word.", latex: "\\text{trend}", answer: "increasing", acceptedAnswers: [], hint: "Rising.", explanation: "Increasing." },
  { id: "chal-y8-cf-2", prompt: "60% of 200 surveyed prefer option A. How many people is that?", latex: "0.6\\times200", answer: "120", acceptedAnswers: [], hint: "60% of 200.", explanation: "120." },
  { id: "chal-y8-cf-3", prompt: "A pie-chart sector of 25% represents what angle (degrees)?", latex: "0.25\\times360", answer: "90", acceptedAnswers: [], hint: "25% of 360°.", explanation: "90°." },
  { id: "chal-y8-cf-4", prompt: "If the median wage is $60000, half of people earn less than what amount ($)?", latex: "\\text{median}", answer: "60000", acceptedAnswers: [], hint: "The median splits the data in half.", explanation: "$60000." },
  { id: "chal-y8-cf-5", prompt: "A claim that 'most students walk' needs over 50%. Does 45% support it? Answer yes or no.", latex: "45\\%<50\\%", answer: "no", acceptedAnswers: ["n"], hint: "Under half.", explanation: "No." },
  { id: "chal-y8-cf-6", prompt: "In a survey, 'yes' = 80 and 'no' = 20. Find the percentage who said yes.", latex: "\\tfrac{80}{100}", answer: "80", acceptedAnswers: ["80%"], hint: "80 of 100.", explanation: "80%." },
  { id: "chal-y8-cf-7", prompt: "Can a truncated (cut-off) vertical axis make differences look bigger than they are? Answer yes or no.", latex: "\\text{misleading?}", answer: "yes", acceptedAnswers: ["y"], hint: "It exaggerates.", explanation: "Yes." },
  { id: "chal-y8-cf-8", prompt: "Mean income $90000 but median $50000. Which better represents a typical person? Answer mean or median.", latex: "\\text{typical}", answer: "median", acceptedAnswers: [], hint: "The mean is skewed by high earners.", explanation: "Median." },
  { id: "chal-y8-cf-9", prompt: "A survey of 500 finds a proportion of 0.2 satisfied. How many people is that?", latex: "0.2\\times500", answer: "100", acceptedAnswers: [], hint: "0.2 × 500.", explanation: "100." },
  { id: "chal-y8-cf-10", prompt: "A trend line gives 50 at x = 10 and rises 5 per unit. Find the value at x = 12.", latex: "50+2(5)", answer: "60", acceptedAnswers: [], hint: "Two more units.", explanation: "50 + 10 = 60." },
  { id: "chal-y8-cf-11", prompt: "A sample proportion of 0.3 is applied to a population of 2000. Estimate the count.", latex: "0.3\\times2000", answer: "600", acceptedAnswers: [], hint: "0.3 × 2000.", explanation: "600." },
  { id: "chal-y8-cf-12", prompt: "Two groups have medians 70 and 55. Find the difference.", latex: "70-55", answer: "15", acceptedAnswers: [], hint: "Subtract.", explanation: "15." },
];
