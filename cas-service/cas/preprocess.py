r"""Turn the messy strings students type (and the LaTeX we store) into SymPy.

Two concerns live here:

1. `normalise_unicode` — fold the Unicode glyphs the web app emits (π, ≤,
   ², fancy minus signs) into ASCII. Mirrors the bridges already in
   `lib/answerMarking.ts::normaliseText` so both markers agree.

2. `delatex` — convert the limited LaTeX vocabulary our stored answers use
   (\frac, \sqrt, \sin, \pi, ^{...}, \le ...) into plain infix maths. We do NOT
   pull in a full LaTeX grammar (antlr/lark): the stored answers use a small,
   known macro set, and a targeted converter is far more robust for it than a
   general parser that throws on the first unexpected token.

`to_expr` then parses the cleaned string with SymPy's implicit-multiplication
parser so that "2(x+3)", "4x^3" and "1/4 sin(4x)" all parse the way a student
means them.
"""

from __future__ import annotations

import re
import unicodedata

from sympy import E, I, oo, pi
from sympy.parsing.sympy_parser import (
    convert_xor,
    implicit_multiplication_application,
    parse_expr,
    standard_transformations,
)


class ParseError(Exception):
    """Raised when a string cannot be turned into a SymPy expression."""


# Functions that may appear bare (e.g. "\sin x" meaning sin(x)). `sqrt` is
# handled structurally in delatex and is intentionally excluded here.
_FUNC_MACROS = {
    "sin", "cos", "tan", "csc", "sec", "cot",
    "sinh", "cosh", "tanh",
    "arcsin", "arccos", "arctan",
    "ln", "log", "exp",
}
# Bare names that resolve to constants/operators rather than symbols.
_CONST_MACROS = {
    "pi": "pi", "theta": "theta", "alpha": "alpha", "beta": "beta",
    "gamma": "gamma", "lambda": "lamda", "mu": "mu",
    "infty": "oo", "infinity": "oo",
    "cdot": "*", "times": "*", "div": "/",
}
# Stop characters when greedily reading a bare function argument like "\sin 4x".
_FUNC_ARG_STOPS = set("+-=<>\\,") | {")", "]", "}"}

_PARSE_LOCALS = {"e": E, "pi": pi, "oo": oo, "I": I}
_TRANSFORMS = standard_transformations + (
    convert_xor,
    implicit_multiplication_application,
)


def normalise_unicode(text: str) -> str:
    text = unicodedata.normalize("NFKC", text)
    replacements = {
        "−": "-", "–": "-", "—": "-",  # minus / dashes
        "⁄": "/",                                  # fraction slash
        "×": "*", "·": "*", "⋅": "*",   # times / middle dot
        "÷": "/",                                  # division sign
        "≤": "<=", "≥": ">=",                # inequalities
        "∞": "oo",                                 # infinity
        "²": "^2", "³": "^3",               # superscript 2/3
        "π": "pi", "Θ": "theta", "θ": "theta",
        "°": "",                                   # degree (units stripped)
        " ": " ",                                  # nbsp
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    # Currency / stray markers the symbolic layer should ignore.
    text = text.replace("$", "").replace("\\,", "").replace("\\!", "")
    return text


def _read_group(s: str, i: int) -> tuple[str, int]:
    """`s[i]` is '{'. Return (inner_text, index_after_matching_brace)."""
    depth = 0
    j = i
    while j < len(s):
        if s[j] == "{":
            depth += 1
        elif s[j] == "}":
            depth -= 1
            if depth == 0:
                return s[i + 1:j], j + 1
        j += 1
    return s[i + 1:], len(s)  # unbalanced: take the rest


def _read_arg(s: str, i: int) -> tuple[str, int]:
    """Read one argument: a {group}, a (group), a \\macro, or a single char.

    Parenthesised groups matter for caret exponents the way students type them
    (e.g. ``e^(2x)`` rather than the LaTeX ``e^{2x}``).
    """
    while i < len(s) and s[i] == " ":
        i += 1
    if i >= len(s):
        return "", i
    if s[i] == "{":
        return _read_group(s, i)
    if s[i] == "(":
        return _read_group_paren(s, i)
    if s[i] == "\\":
        m = re.match(r"\\[a-zA-Z]+", s[i:])
        if m:
            return s[i:i + m.end()], i + m.end()
    return s[i], i + 1


def _read_func_arg(s: str, i: int) -> tuple[str, int]:
    """Read the argument of a bare function such as `\\sin 4x` or `\\cos(2x)`."""
    while i < len(s) and s[i] == " ":
        i += 1
    if i < len(s) and s[i] == "(":
        return _read_group_paren(s, i)
    # Greedily read a product-run up to a low-precedence boundary.
    j = i
    depth = 0
    while j < len(s):
        c = s[j]
        if c in "([{":
            depth += 1
        elif c in ")]}":
            if depth == 0:
                break
            depth -= 1
        elif depth == 0 and c in _FUNC_ARG_STOPS:
            break
        j += 1
    return s[i:j], j


def _read_group_paren(s: str, i: int) -> tuple[str, int]:
    """`s[i]` is '('. Return ('(...)' including parens, index_after_close)."""
    depth = 0
    j = i
    while j < len(s):
        if s[j] == "(":
            depth += 1
        elif s[j] == ")":
            depth -= 1
            if depth == 0:
                return s[i:j + 1], j + 1
        j += 1
    return s[i:], len(s)


def delatex(s: str) -> str:
    """Convert our limited stored-answer LaTeX vocabulary to infix maths."""
    out: list[str] = []
    i, n = 0, len(s)
    while i < n:
        c = s[i]
        if c == "\\":
            m = re.match(r"\\([a-zA-Z]+)", s[i:])
            if not m:
                # Spacing macros like "\," or "\;" — drop backslash + next char.
                i += 1
                if i < n and s[i] in ",!;: ":
                    i += 1
                continue
            name = m.group(1)
            i += 1 + len(name)
            if name == "frac":
                num, i = _read_arg(s, i)
                den, i = _read_arg(s, i)
                out.append(f"(({delatex(num)})/({delatex(den)}))")
            elif name == "sqrt":
                if i < n and s[i] == "[":
                    end = s.find("]", i)
                    root = s[i + 1:end] if end != -1 else "2"
                    i = end + 1 if end != -1 else n
                    arg, i = _read_arg(s, i)
                    out.append(f"(({delatex(arg)})**(1/({delatex(root)})))")
                else:
                    arg, i = _read_arg(s, i)
                    out.append(f"sqrt({delatex(arg)})")
            elif name in _FUNC_MACROS:
                # Optional power notation: \sin^2 x  ->  (sin(x))**(2)
                k = i
                while k < n and s[k] == " ":
                    k += 1
                if k < n and s[k] == "^":
                    exp, k = _read_arg(s, k + 1)
                    arg, i = _read_func_arg(s, k)
                    out.append(f"(({name}({delatex(arg)}))**({delatex(exp)}))")
                else:
                    arg, i = _read_func_arg(s, i)
                    out.append(f"{name}({delatex(arg)})")
            elif name in _CONST_MACROS:
                out.append(_CONST_MACROS[name])
            elif name in ("left", "right"):
                pass
            elif name in ("le", "leq"):
                out.append("<=")
            elif name in ("ge", "geq"):
                out.append(">=")
            elif name in ("lt",):
                out.append("<")
            elif name in ("gt",):
                out.append(">")
            else:
                out.append(name)  # unknown macro -> treat as a symbol
        elif c == "^":
            exp, i = _read_arg(s, i + 1)
            out.append(f"**({delatex(exp)})")
        elif c == "_":
            _, i = _read_arg(s, i + 1)  # drop subscripts
        elif c == "{":
            inner, i = _read_group(s, i)
            out.append(f"({delatex(inner)})")
        elif c == "}":
            i += 1  # stray brace
        else:
            out.append(c)
            i += 1
    return "".join(out)


def clean(text: str) -> str:
    """Full string cleanup: Unicode fold + LaTeX expansion."""
    return delatex(normalise_unicode(text)).strip()


def to_expr(text: str):
    """Parse a cleaned answer string into a SymPy expression."""
    cleaned = clean(text)
    if not cleaned:
        raise ParseError("empty expression")
    try:
        return parse_expr(
            cleaned,
            local_dict=_PARSE_LOCALS,
            transformations=_TRANSFORMS,
            evaluate=True,
        )
    except Exception as exc:  # noqa: BLE001 - any parse failure becomes ParseError
        raise ParseError(f"could not parse {text!r} (as {cleaned!r}): {exc}") from exc
