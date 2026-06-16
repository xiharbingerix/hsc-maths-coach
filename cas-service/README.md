# Nova Maths CAS service

Tier-1 **symbolic answer marking** for Nova Maths. This is the "as good as
Wolfram/Symbolab" equivalence layer described in the CAS marking plan: it decides
whether a student's typed answer is *mathematically equivalent* to the stored
answer, even when written in a different but correct form (`2(x+3)` = `2x+6`,
`√8` = `2√2`, `-cos x + C` = `-\cos x + C`).

It is a **separate Python service** because the Next.js app owns its own `/api`
routes (App Router). The web app calls this over HTTPS only as a fallback.

## Where it sits in the marking pipeline

```
markAnswer(student, expected, accepted[])
  ├─ Tier 0  lib/answerMarking.ts (TypeScript)   ~0ms, offline
  │          exact · accepted-list · normalised · numeric/coord/ratio/clock
  │          └─ correct? → ✅ done   (most numeric answers stop here)
  │
  ├─ Tier 1  THIS SERVICE (SymPy)                 ~50–400ms
  │          only runs when Tier 0 said "no match"
  │          └─ equivalent? → ✅ upgrade to correct
  │
  └─ Tier 2  (future) Claude judge — un-parseable / natural-language answers
```

**Safety contract:** this service can only ever *upgrade* a Tier-0 "wrong" to
"right", and only when confident. On any parse failure, timeout, or unsupported
form it returns `{"equivalent": false, "method": "defer"}`, and the caller keeps
the Tier-0 result. It therefore cannot make marking worse than today — only
better. Positives are confirmed both symbolically (`simplify(...) == 0`) and by a
numeric spot-check at many random points, so a wrong answer is very unlikely to
be accepted.

## What it handles

| Kind | Detected by | Method |
|---|---|---|
| Expression | default | `simplify(a-b)==0`, `expand`, `trigsimp`, + numeric check |
| Antiderivative | trailing `+ C` | derivatives equal (`+C` cancels automatically) |
| Equation | contains `=` | identical or non-zero scalar multiple; solution-set fallback |
| Solution set | `{…}` / commas with `=` | order-independent set compare |
| Inequality | `< > <= >=` | `Relational.as_set()` compare |
| Interval | `(-∞, 4]` style | parsed to `Interval`, compared to inequality set |

Input cleanup (`cas/preprocess.py`) folds the Unicode the web app emits
(`π ≤ ² ×`) and a limited LaTeX vocabulary (`\frac \sqrt \sin \pi ^{} \le`) into
SymPy — mirroring `lib/answerMarking.ts::normaliseText` so both markers agree.

### Known conventions / limits
- `e` always parses as Euler's number (so `e^x` bridges to `exp(x)`). A question
  whose answer is literally the *variable* `e` is not supported (none exist today).
- `ln` and `log` both map to natural log; equivalence is consistent because both
  sides parse the same way. Log-law forms that differ by domain (e.g.
  `2 ln x` vs `ln x²`) are intentionally **not** treated as equal (conservative).
- Full LaTeX is not parsed — only the macro set our stored answers use. Anything
  outside it `defer`s rather than guessing.

## Develop

```bash
cd cas-service
pip install -r requirements-dev.txt   # runtime + pytest/httpx
python -m pytest tests/ -q            # 41 cases (audit P2 forms + guardrails)
uvicorn app:app --reload --port 8000
```

```bash
curl -s localhost:8000/equiv -H 'content-type: application/json' \
     -d '{"student":"2(x+3)","expected":"2x+6"}'
# {"equivalent":true,"method":"symbolic","confidence":"high","error":null}
```

## Deploy (Fly.io)

Stateless service; `Dockerfile` + `fly.toml` are provided. `fly.toml` keeps one
machine always warm so the ~1–2s SymPy import never lands on a student's marking
call.

```bash
cd cas-service
fly launch --no-deploy        # first time only; keep the provided fly.toml when prompted
fly secrets set CAS_SHARED_SECRET="$(openssl rand -hex 24)"   # note this value
fly deploy
fly status                    # confirm 1 machine running
curl https://<app>.fly.dev/health      # -> {"ok":true}
```

Then point the Next.js app at it (Vercel env vars — see the repo's
`DEPLOYMENT.md`):

- `CAS_SERVICE_URL = https://<app>.fly.dev`
- `CAS_SHARED_SECRET = <the same value set above>`

**Region:** `fly.toml` defaults to `iad` to match Vercel's default function
region — the latency-critical hop is Vercel function → this service, not
user → service. If you pin Vercel functions to Sydney, set `primary_region = "syd"`.

**Rollout:** the marker already falls back to local marking on any timeout/error,
so a bad deploy can't break grading. Start with `CAS_SERVICE_URL` set, watch the
worksheet/lesson logs for `matchedBy: "cas"` upgrades, and use
`CAS_MARKING_ENABLED=false` as an instant kill switch without redeploying.

### Other hosts
Any Python host works (Render Starter, Cloud Run with `min-instances=1`, a
separate Vercel Python project). Prefer always-warm; cold starts add ~1–2s to the
first call. Always keep the client/server timeout + Tier-0 fallback.

## Tests

`tests/test_equivalence.py` — the EQUIVALENT block is seeded from the catalog
audit's P2 list (the exact forms students get wrongly rejected today); the
NOT_EQUIVALENT block is the false-positive guardrail and matters most.
