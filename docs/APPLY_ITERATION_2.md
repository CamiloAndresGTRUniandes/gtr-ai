# Apply iteration 2 — supplemental evidence

Research approved. Apply only; independent Verify and Archive are not approved or performed. Original iteration evidence is retained unchanged. No external model calls, credentials, or paid requests were used. No production code was created.

## Results

Seven additional Node test-runner tests passed (see `evidence/followup.tap`). Together with the previous 11 tests, the accumulated local test count is 18, not 18 validated spikes.

| Spike | Additional evidence | Limits |
|---|---|---|
| 004/020 | Atomic approval update checks revision, status and artifact identity; replay/stale requests rejected; separate process reads committed state | Local SQL prototype, not LangGraph or a complete workflow |
| 019 | Real process SIGKILL after intent and simulated remote record; reconciliation and refusal to retry unknown intent | Remote is a table in same database, not an external API; no distributed failure proof |
| 007 | Foreign key violation rejected, migration and schema version rolled back, VACUUM INTO snapshot integrity verified | Linux Node SQLite only; not native extension loading or LangGraph |
| 008/009 | RRF ranking over four records, lexical plus manually specified vector scores, project and status filtering | No embedding model, vector extension, multilingual quality or real RAG benchmark |
| 014 | Exact hash dedup preserves source references and mandatory flag; mandatory context overflow fails closed | Byte budget, not actual token counting |
| 017 | Real worker SIGKILL after file write; baseline and partial change preserved; Git rejects dirty removal; main tree unchanged | No Windows/macOS or distributed scheduler test |
| 012 | Mock subscription exhaustion does not authorize API fallback; tool and provider eligibility checks | No real account, router package, or quality evaluation |

## Benchmark

`docs/benchmarks/raw-results/followup.json` contains 1,000 timings of the toy hybrid ranking after 100 warmup calls. Median 0.024879 ms; p95 0.058287 ms; maximum 0.925982 ms. Corpus: four manually constructed entries, in-memory SQLite, Node 22.16 Linux x64. Includes FTS lookup, metadata query, sorting hand-authored scores and RRF. Excludes embedding, vector indexing, disk access and provider calls. Not comparable to the full RAG performance target.

## Blockers

The npm lookup was retried and returned EAI_AGAIN. See `evidence/followup-environment.log`. No Pi, Codex, Claude Code, VS Code, RTK or Graphify executable was found on PATH. No Windows or macOS environment was available. No local access to D:\\GTR-AI. The original 20-spike readiness classification remains unchanged: five with limitations, fifteen blocked. No full spike has passed all original acceptance criteria.

## Recommendations

Use revision-bound approvals; preserve interrupted dirty worktrees; fail closed when mandatory context exceeds budget; keep provenance during deduplication; enforce authorization before fallback. These are proposals, not approved architecture decisions. Proceed to independent Verify only after the human approves the available Apply evidence and explicitly acknowledges blocked experiments remain open.
