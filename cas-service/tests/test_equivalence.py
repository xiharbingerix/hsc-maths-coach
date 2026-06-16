"""Equivalence regression suite.

The EQUIVALENT cases are drawn directly from the catalog audit's P2 list
(`docs/NOVA_MATHS_FULL_CATALOG_AUDIT_2026-06-16.md`) — the exact forms students
type today and get wrongly rejected — plus standard algebra/calculus/trig forms.

The NOT_EQUIVALENT cases are the guardrail: they must stay wrong. A false
positive here mis-marks a student in the worst direction, so this block matters
more than the first.
"""

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from cas import mark  # noqa: E402

# (student, expected) pairs that MUST be marked equivalent.
EQUIVALENT = [
    # --- audit P2: pi glyph / macro vs ascii ---
    ("200pi", "200\\pi"),
    ("200 pi", "200π"),
    # --- audit P2: reordered / factored / expanded algebra ---
    ("4x^3+8x", "8x+4x^3"),
    ("2x+6", "2(x+3)"),
    ("x^2-4", "(x-2)(x+2)"),
    ("(x+1)^2", "x^2+2x+1"),
    # --- numeric forms ---
    ("1/2", "0.5"),
    ("0.5", "1/2"),
    ("3/6", "1/2"),
    # --- surds ---
    ("2sqrt(2)", "\\sqrt{8}"),
    ("sqrt(8)", "2\\sqrt 2"),
    # --- audit P2: antiderivatives (+C) ---
    ("-cos(x)+C", "-\\cos x + C"),
    ("1/4 sin(4x)+C", "\\frac{1}{4}\\sin 4x + C"),
    ("x^2/2 + C", "0.5x^2 + K"),
    # --- trig identities ---
    ("sin(2x)", "2 sin(x) cos(x)"),
    ("1-sin(x)^2", "cos(x)^2"),
    # --- audit P2: inequalities (<= vs unicode) ---
    ("x<=4", "x \\le 4"),
    ("x <= 4", "x ≤ 4"),
    ("x<=4", "(-oo, 4]"),
    # --- equations: scalar multiple / rearranged ---
    ("x=6", "2x+9=21"),
    ("2x-12=0", "x=6"),
    # --- solution sets (order independent) ---
    ("x=2, x=3", "x=3, x=2"),
    ("{2, 3}", "{3, 2}"),
    # --- audit P2: trivially reordered linear forms ---
    ("7+2x", "2x+7"),
    ("pi/2", "\\frac{\\pi}{2}"),
    # --- algebraic fractions: factored vs expanded denominator ---
    ("x/((x-2)(x+2))", "x/(x^2-4)"),
    ("1/4*sin(4x)+C", "\\frac{1}{4}\\sin(4x)+C"),
    # --- exponential: e^x must bridge to exp ---
    ("e^(2x)", "exp(2x)"),
]

# (student, expected) pairs that MUST stay marked wrong.
NOT_EQUIVALENT = [
    ("2x+5", "2x+6"),
    ("x^2+4", "x^2-4"),
    ("3", "3.1"),
    ("sin(x)", "cos(x)"),
    ("2 ln(x)", "ln(2x)"),
    ("x<4", "x<=4"),          # strictness matters
    ("x=5", "2x+9=21"),       # wrong root (expected x=6)
    ("x=2, x=4", "x=2, x=3"),  # wrong member
    ("2sqrt(3)", "\\sqrt{8}"),
    ("x+1", "x-1"),
    ("1/(x+2)", "1/(x-2)"),
    ("e^(2x)", "exp(3x)"),
]


@pytest.mark.parametrize("student,expected", EQUIVALENT)
def test_equivalent(student, expected):
    result = mark(student, expected)
    assert result["equivalent"] is True, (
        f"expected EQUIVALENT but got {result} for "
        f"student={student!r} expected={expected!r}"
    )


@pytest.mark.parametrize("student,expected", NOT_EQUIVALENT)
def test_not_equivalent(student, expected):
    result = mark(student, expected)
    assert result["equivalent"] is False, (
        f"expected NOT equivalent but got {result} for "
        f"student={student!r} expected={expected!r}"
    )


def test_garbage_defers():
    result = mark(")(*&^", "x+1")
    assert result["equivalent"] is False
    assert result["method"] == "defer"
