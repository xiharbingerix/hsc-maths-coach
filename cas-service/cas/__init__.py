"""Nova Maths CAS equivalence service.

Tier-1 symbolic answer marking. The public entry point is `cas.equivalence.mark`,
which decides whether a student's answer is mathematically equivalent to the
stored answer. It is only ever called after the TypeScript fast-path
(`lib/answerMarking.ts`) has already returned "not a match", so its job is to
*upgrade* a local "wrong" to "right" when — and only when — it is confident.
"""

from .equivalence import mark

__all__ = ["mark"]
