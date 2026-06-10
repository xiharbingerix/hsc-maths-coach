# Feedback and Hints Standard

Standard for `hint`, `explanation`, and `commonMistakes` in Nova Maths lesson questions.

---

## Quick checklist

- [ ] Explanation shows key working steps (not just the answer)
- [ ] Explanation reaches and states the correct answer clearly
- [ ] Explanation is ≥ 40 characters and specific to this question
- [ ] Hint reveals one useful next step — not the full solution
- [ ] Hint does not give away the answer
- [ ] Common mistake names the specific misconception, not a vague category
- [ ] Common mistake fix tells the student what to do instead
- [ ] No "try again", "check your work", or "be careful"
- [ ] No draft/self-correction language (Wait, Hmm, recalculate, on second thought, actually that)
- [ ] No contradiction between prompt, answer, and explanation
- [ ] Explanation ≠ the generic seed fallback string (see below)

---

## Explanation standards

### What an explanation must do

1. Show the key working steps (arithmetic or algebra)
2. Reach the correct answer
3. State the answer clearly at the end

### What an explanation must not do

- Repeat the question prompt verbatim
- Use generic fallback: "Review the worked method and compare each step with the expected answer." ← validator flags this exact string
- Use draft language ("Wait", "Hmm", "recalculate", "on second thought", "actually that", "let me check", "I made a mistake")
- Contradict the `answer` field numerically or logically
- Explain a different method than the one in the worked examples for guided questions

---

## Bad vs good explanations

### Bad — too short

```
"The answer is 7."
```
No working shown. A student who got it wrong gains nothing.

---

### Bad — draft language

```
"Hmm, let me recalculate. 2x + 1 = 15, so 2x = 14, therefore x = 7. Actually that's correct."
```
Contains "Hmm" and "Actually that" — validator ERROR.

---

### Bad — generic fallback

```
"Review the worked method and compare each step with the expected answer."
```
Exact string match — validator ERROR. Write the actual worked solution.

---

### Good — typed answer

```
"2x + 1 = 15. Subtract 1 from both sides: 2x = 14. Divide by 2: x = 7."
```

---

### Good — with LaTeX (JSON batch)

```
"$2x + 1 = 15 \\Rightarrow 2x = 14 \\Rightarrow x = 7$. The solution is $x = 7$."
```

---

### Good — contextual (financial)

```
"Use I = PRT/100. Substitute P = 800, R = 5, T = 3: I = (800 × 5 × 3) / 100 = 12000 / 100 = 120. The interest is $120."
```

---

## Multi-step explanation format

For more complex questions, structure as:

1. State the method or formula
2. Substitute or set up the equation
3. Simplify or solve
4. State the answer with units or context where appropriate

---

## Hint standards

A hint reveals **one useful next step** — nothing more.

### Rules

- One to two sentences maximum
- Points toward the method without revealing the answer
- For typed answers: suggest what to substitute, what rule applies, or what to identify first
- For MCQ: suggest the category of rule or what to look for — do not name the correct choice
- Never say "the answer is…" or "substitute and you'll get X"
- Never say "try again" or "think carefully"

### Bad hints

```
"Substitute into the formula and you'll get 120."
```
Gives away the answer.

```
"Think carefully about this question."
```
No specific guidance at all.

```
"Remember to use the right formula."
```
Too vague — which formula?

### Good hints

```
"Substitute P = 800, R = 5, T = 3 into I = PRT/100."
```

```
"Identify the rise and run between the two points, then divide."
```

```
"Check which angle relationship fits the Z-shape: alternate, co-interior, or corresponding."
```

```
"Factor out the common term first."
```

```
"Write the equation for each condition and solve simultaneously."
```

---

## Common mistakes standards

Each lesson has a `commonMistakes` array. Standard: **4 mistakes per lesson**.

```typescript
type CommonMistake = {
  mistake: string;  // What the student does wrong
  fix:     string;  // What to do instead
};
```

### Rules

- `mistake`: name the specific wrong action, not a category ("uses gradient = run ÷ rise" not "makes sign errors")
- `fix`: give a specific correction ("gradient = rise ÷ run — vertical divided by horizontal")
- Should cover the 4 most likely errors for this exact topic, not generic maths errors
- Written from the student's perspective

### Bad common mistake

```json
{
  "mistake": "Making arithmetic errors.",
  "fix": "Check your work carefully."
}
```
Vague misconception, vague fix. Could apply to any question in maths.

### Good common mistakes

```json
{
  "mistake": "Calculating gradient as run ÷ rise instead of rise ÷ run.",
  "fix": "Rise is the vertical change and run is the horizontal change. Gradient = rise ÷ run."
}
```

```json
{
  "mistake": "Forgetting to include a negative sign when the line falls from left to right.",
  "fix": "If the line falls, the rise is a negative number. A falling line has a negative gradient."
}
```

```json
{
  "mistake": "Using 360° as the angle sum of a triangle instead of 180°.",
  "fix": "A triangle has three angles summing to 180°. Quadrilaterals sum to 360°."
}
```

```json
{
  "mistake": "Substituting the x-value as y and vice versa when plotting a point.",
  "fix": "A point (x, y) has x as the horizontal position and y as the vertical position."
}
```

---

## Standards by section

### Guided practice

- Hints: **generous** — can point directly at the formula, substitution, or first step
- Explanation: full working, clearly annotated
- Echo the worked example structure where appropriate

### Independent practice

- Hints: **less direct** — suggest the method or rule, not the full setup
- Explanation: full working, same detail as guided

### Mastery quiz

- Hints: **minimal** — one strategic nudge only (or no hint at all)
- Explanation: **must be particularly clear** — mastery quiz is the primary review stage
- Explanation should be clear enough for a student who got it wrong to fully understand their error

---

## Feedback language tone

| Do | Don't |
|---|---|
| Direct and neutral | Praise ("Great job!", "Well done!") |
| Method-focused | Discouragement ("That was tricky!") |
| Exam-aware, practical | Motivational filler ("Keep it up!") |
| Specific to this question | Generic advice ("Review your notes") |
| Active voice | Passive voice for key steps |
