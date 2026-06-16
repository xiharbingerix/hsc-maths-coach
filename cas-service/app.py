"""HTTP wrapper around the CAS equivalence kernel.

A single stateless endpoint the Next.js app calls when its TypeScript fast-path
can't resolve a typed answer. Auth is a shared secret in the `X-CAS-Secret`
header, compared to the `CAS_SHARED_SECRET` env var. If that env var is unset
(local dev) auth is skipped.

Run locally:
    uvicorn app:app --reload --port 8000

Marking call:
    curl -s localhost:8000/equiv -H 'content-type: application/json' \
         -d '{"student":"2(x+3)","expected":"2x+6"}'
"""

from __future__ import annotations

import os

from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel

from cas import mark

app = FastAPI(title="Nova Maths CAS", version="0.1.0")

_SECRET = os.environ.get("CAS_SHARED_SECRET")


class EquivRequest(BaseModel):
    student: str
    expected: str
    kind: str | None = None  # expression|antiderivative|equation|set|inequality|interval


def _check_auth(provided: str | None) -> None:
    if _SECRET and provided != _SECRET:
        raise HTTPException(status_code=401, detail="bad or missing X-CAS-Secret")


@app.get("/health")
def health() -> dict:
    return {"ok": True}


@app.post("/equiv")
def equiv(
    body: EquivRequest,
    x_cas_secret: str | None = Header(default=None),
) -> dict:
    _check_auth(x_cas_secret)
    return mark(body.student, body.expected, body.kind)
