"""Decide whether two maths answers are equivalent.

Design rules (in priority order):

* **Never produce a false positive cheaply.** This marker only runs after the
  TS fast-path said "wrong", so its only power is to upgrade wrong -> right.
  A wrong upgrade mis-marks a student in the worst direction, so every positive
  is confirmed two independent ways where possible: a symbolic test
  (`simplify(...) == 0`) *and* a numeric spot-check at many random points.
* **Degrade to `defer`, never to a guess.** On a parse failure, a timeout, or an
  unsupported form, we return `equivalent=False, method="defer"`, and the caller
  keeps the fast-path's "wrong". The service can therefore never make marking
  worse than it is today — only better.
"""

from __future__ import annotations

import random
import re
import threading
from dataclasses import dataclass

import sympy
from sympy import expand, simplify, trigsimp

from .preprocess import ParseError, clean, normalise_unicode, to_expr

_INEQ_RE = re.compile(r"(<=|>=|<|>)")

# Constants of integration / arbitrary constants to ignore when picking the
# variable of an antiderivative.
_CONSTANT_NAMES = {"c", "k", "C", "K"}

_NUMERIC_POINTS = 24      # random points to attempt
_NUMERIC_MIN_AGREE = 8    # successful evaluations required to trust a result
_NUMERIC_TOL = 1e-9
_TIMEOUT_SECS = 3.0


@dataclass
class Result:
    equivalent: bool
    method: str
    confidence: str = "high"
    error: str | None = None

    def as_dict(self) -> dict:
        return {
            "equivalent": self.equivalent,
            "method": self.method,
            "confidence": self.confidence,
            "error": self.error,
        }


def _run_with_timeout(fn, timeout=_TIMEOUT_SECS):
    """Run `fn` in a daemon thread; raise TimeoutError if it overruns.

    SymPy's `simplify` has no interrupt and can run away on pathological input.
    A daemon thread keeps the request responsive; the orphaned thread dies with
    the (short-lived, stateless) worker. Production should additionally cap
    worker lifetime at the process level.
    """
    box: dict = {}

    def target():
        try:
            box["value"] = fn()
        except Exception as exc:  # noqa: BLE001
            box["error"] = exc

    t = threading.Thread(target=target, daemon=True)
    t.start()
    t.join(timeout)
    if t.is_alive():
        raise TimeoutError("symbolic computation timed out")
    if "error" in box:
        raise box["error"]
    return box.get("value")


# ── Kind detection ───────────────────────────────────────────────────────────

def detect_kind(expected: str, student: str) -> str:
    raw = [normalise_unicode(expected), normalise_unicode(student)]
    if any(_INEQ_RE.search(t) for t in raw):
        return "inequality"
    if any(t.lstrip().startswith(("(", "[")) and "," in t and
           ("oo" in t or "inf" in t) for t in raw):
        return "interval"
    # A set/list of solutions: "x=2, x=3" or "{2, 3}" or "2, 3".
    if any(("," in t and t.count("=") >= 2) for t in raw) or \
       any(t.strip().startswith("{") for t in raw):
        return "set"
    if any("=" in t for t in raw):
        return "equation"
    # Antiderivative: a trailing "+ C" arbitrary constant.
    if re.search(r"\+\s*[cCkK]\b", expected) or re.search(r"\+\s*[cCkK]\b", student):
        return "antiderivative"
    return "expression"


# ── Numeric confirmation ─────────────────────────────────────────────────────

def _numeric_equal(a, b) -> bool:
    free = sorted(a.free_symbols | b.free_symbols, key=str)
    rng = random.Random(20240617)  # deterministic across runs
    if not free:
        try:
            va = complex(a.evalf())
            vb = complex(b.evalf())
        except Exception:  # noqa: BLE001
            return False
        return abs(va - vb) <= _NUMERIC_TOL * max(1.0, abs(va), abs(vb))

    agreed = 0
    for _ in range(_NUMERIC_POINTS * 4):
        if agreed >= _NUMERIC_MIN_AGREE:
            break
        subs = {s: sympy.Rational(rng.randint(-700, 700), 100) for s in free}
        try:
            va = complex(a.subs(subs).evalf())
            vb = complex(b.subs(subs).evalf())
        except Exception:  # noqa: BLE001
            continue
        if not (_finite(va) and _finite(vb)):
            continue
        scale = max(1.0, abs(va), abs(vb))
        if abs(va - vb) > _NUMERIC_TOL * scale:
            return False
        agreed += 1
    return agreed >= _NUMERIC_MIN_AGREE


def _finite(z: complex) -> bool:
    return all(map(lambda x: x == x and abs(x) != float("inf"), (z.real, z.imag)))


def _symbolic_zero(diff_expr) -> bool:
    for transform in (simplify, lambda e: expand(e), trigsimp):
        try:
            if transform(diff_expr) == 0:
                return True
        except Exception:  # noqa: BLE001
            continue
    return False


# ── Per-kind comparisons ─────────────────────────────────────────────────────

def _equiv_expression(expected: str, student: str) -> Result:
    a, b = to_expr(expected), to_expr(student)
    diff_expr = a - b
    if _run_with_timeout(lambda: _symbolic_zero(diff_expr)):
        return Result(True, "symbolic")
    if _run_with_timeout(lambda: _numeric_equal(a, b)):
        return Result(True, "numeric")
    return Result(False, "expression")


def _equiv_antiderivative(expected: str, student: str) -> Result:
    a, b = to_expr(expected), to_expr(student)
    free = sorted(
        (a.free_symbols | b.free_symbols),
        key=str,
    )
    var_syms = [s for s in free if str(s) not in _CONSTANT_NAMES]
    if not var_syms:
        # No variable (e.g. both constants) — fall back to plain equivalence.
        return _equiv_expression(expected, student)

    def check() -> bool:
        for var in var_syms:
            d = sympy.diff(a, var) - sympy.diff(b, var)
            if _symbolic_zero(d):
                return True
        return False

    if _run_with_timeout(check):
        return Result(True, "antiderivative")
    return Result(False, "antiderivative")


def _split_eq(text: str):
    cleaned = clean(text)
    if "=" not in cleaned:
        return to_expr(text)
    lhs, rhs = cleaned.split("=", 1)
    return to_expr(lhs) - to_expr(rhs)


def _equiv_equation(expected: str, student: str) -> Result:
    ea, eb = _split_eq(expected), _split_eq(student)

    def check() -> bool:
        if _symbolic_zero(ea - eb):
            return True
        # Same equation up to a non-zero constant multiple (e.g. 2x-12 vs x-6).
        if eb != 0:
            ratio = simplify(ea / eb)
            if ratio != 0 and not ratio.free_symbols:
                return True
        return False

    try:
        if _run_with_timeout(check):
            return Result(True, "equation")
    except (ParseError, ZeroDivisionError):
        pass
    # Fall back to comparing solution sets for harder equations.
    return _equiv_solution_sets(expected, student)


def _equiv_solution_sets(expected: str, student: str) -> Result:
    def values(text: str) -> set:
        # Strip set braces BEFORE delatex (which rewrites { } into parens), then
        # let to_expr() handle any LaTeX inside each individual member.
        cleaned = normalise_unicode(text).strip()
        cleaned = cleaned.replace("\\{", "").replace("\\}", "").strip("{} ")
        pieces = re.split(r"[,;]|\bor\b", cleaned)
        vals = set()
        for piece in pieces:
            piece = piece.strip()
            if not piece:
                continue
            if "=" in piece:
                piece = piece.split("=", 1)[1].strip()
            vals.add(sympy.nsimplify(to_expr(piece)))
        return vals

    try:
        if _run_with_timeout(lambda: values(expected) == values(student)):
            return Result(True, "set")
    except ParseError:
        pass
    return Result(False, "set")


def _to_set(text: str):
    """Convert an inequality or interval string to a SymPy Set."""
    cleaned = clean(text).strip()
    if cleaned.startswith(("(", "[")) and cleaned.endswith((")", "]")):
        inner = cleaned[1:-1]
        left_open = cleaned[0] == "("
        right_open = cleaned[-1] == ")"
        lo_s, hi_s = inner.split(",", 1)
        lo = sympy.S.NegativeInfinity if "oo" in lo_s or "inf" in lo_s else to_expr(lo_s)
        hi = sympy.S.Infinity if "oo" in hi_s or "inf" in hi_s else to_expr(hi_s)
        return sympy.Interval(lo, hi, left_open, right_open)
    # Relational such as "x <= 4".
    expr = sympy.sympify(cleaned, locals={"oo": sympy.oo})
    if isinstance(expr, sympy.core.relational.Relational):
        return expr.as_set()
    raise ParseError(f"not an inequality/interval: {text!r}")


def _equiv_inequality(expected: str, student: str) -> Result:
    try:
        if _run_with_timeout(lambda: _to_set(expected) == _to_set(student)):
            return Result(True, "inequality")
    except (ParseError, Exception):  # noqa: BLE001
        return Result(False, "defer")
    return Result(False, "inequality")


# ── Public entry point ───────────────────────────────────────────────────────

def mark(student: str, expected: str, kind: str | None = None) -> dict:
    """Return an equivalence verdict for `student` vs the stored `expected`.

    Always returns a dict (see `Result.as_dict`). `equivalent` is True only when
    confident; any failure yields `method="defer"` so the caller keeps the
    fast-path result.
    """
    if student is None or expected is None:
        return Result(False, "defer", "low", "missing input").as_dict()
    if not str(student).strip() or not str(expected).strip():
        return Result(False, "defer", "low", "empty input").as_dict()

    kind = kind or detect_kind(expected, student)
    handlers = {
        "expression": _equiv_expression,
        "antiderivative": _equiv_antiderivative,
        "equation": _equiv_equation,
        "set": _equiv_solution_sets,
        "interval": _equiv_inequality,
        "inequality": _equiv_inequality,
    }
    handler = handlers.get(kind, _equiv_expression)
    try:
        return handler(expected, student).as_dict()
    except ParseError as exc:
        return Result(False, "defer", "low", str(exc)).as_dict()
    except TimeoutError as exc:
        return Result(False, "defer", "low", str(exc)).as_dict()
    except Exception as exc:  # noqa: BLE001 - never 500 on a marking call
        return Result(False, "defer", "low", f"{type(exc).__name__}: {exc}").as_dict()
