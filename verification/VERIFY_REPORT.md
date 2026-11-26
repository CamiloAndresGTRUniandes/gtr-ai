# GTR-AI — Verify phase report

**Disposition:** Local Apply evidence reproduced; production architecture not ready. Archive requires human approval. This is a separate review pass by the same assistant, not an externally independent auditor. No production code changed, no paid or subscription calls made. Target repository D:\GTR-AI was not accessed.

## Reproduction
Input: Apply V2 package, SHA-256 in evidence/input.sha256. Original source files were copied unchanged. Original benchmark JSON is preserved in verification/evidence; rerun JSON is in docs/benchmarks/raw-results. Node 22.16.0, Linux x64, SQLite 3.49.1. Both original test suites passed (11 + 7), additional script succeeded and offline npm pack/install/run/uninstall succeeded. Four additional review tests passed: three reproduce limitations, one validates competing approval CAS. These are not 22 production acceptance tests. See TAP and logs. Registry probe still failed with EAI_AGAIN. No Windows/macOS or actual external dependency execution.

## Findings
| ID | Severity | Evidence | Required follow-up |
|---|---|---|---|
| V-01 | High | experiments.mjs validateGraph rejects explicit approval:false but accepts missing metadata and empty graph; review.mjs reproduces. This is not itself a demonstrated workflow bypass. | Compiler must enforce approval gates independent of metadata; reject empty graphs, validate schema and transitions, test actual LangGraph. |
| V-02 | Medium | route prefers paid affinity over eligible subscription if paid is authorized; review.mjs reproduces. No unauthorized paid fallback shown. | Define precedence explicitly; prefer subscription unless explicit pinned paid session policy applies; test quota races and provider authorization. |
| V-03 | High | allowedPath realpath throws on nonexistent target; checks only existing paths, cannot prevent time-of-check/time-of-use races or shell bypass. | Enforce actual filesystem/command boundaries; handle new files and symlinks; test OS isolation. |
| V-04 | High | IPC duplicate set is volatile, unbounded and same-process; separate cross-process test only returns ready. No durable ownership or restart proof. | Bound frames, timeouts and dedup; authenticate IPC across processes; persist ownership and test restart/Windows. |
| V-05 | High | simulated_remote and journal share one local database; not a real external service or independent failure domain. | Test remote uncertain outcomes with independent mock server and real authorized sandbox API; durable operation IDs and reconciliation. |
| V-06 | Medium | context byte cap ignores serialization, metadata, tokenizer, provider framing and output reserve; exact dedup retains provenance only in followup fixture. | Budget actual provider requests; enforce source authorization before dedup; test mandatory constraints and multilingual tokenizer. |
| V-07 | Medium | RRF toy uses hand-authored scores, no cosine or embedding inference; FTS rank uses shared corpus statistics even with filtered results. | Evaluate scoped retrieval and ranking interference, actual embeddings and sqlite-vec, Recall@K/MRR. |
| V-08 | Medium | p95 measurements use single-run aggregate data; startup sample n=30 and no per-observation raw values retained. Startup is empty Node, IPC is same process, worktree time is one sample. | Persist individual samples; repeat independent processes and target hardware; measure cold/warm and baseline/optimized quality. |
| V-09 | Medium | npm smoke uses tiny local package, offline and ignore-scripts; no managed dependencies or upgrades. | Test real distribution/provisioning, integrity, failure recovery and three OS targets. |
| V-10 | Medium | mock workflow saves one checkpoint and mock walking skeleton stores pre-approval states only; no final durable completion proof or actual agent execution. | Validate real checkpoint lifecycle, replay, cancellation, final commit and independent verification. |

## Positive evidence
Two child processes competing for the same SQLite approval revision produce exactly one update and final revision 2. This adds local concurrency evidence for ADR-07, not authenticated approval or LangGraph integration. Git worktree preservation, rollback, FTS5, and crash recovery reproduced. SQLite remains experimental on this Node version (runtime warning).

## Gate
Retain five spikes with partial favorable evidence (006,007,009,014,017), fifteen blocked against full original acceptance, zero complete. The review findings do not invalidate those narrow results but limit their interpretation. No architecture-wide readiness approval recommended. Proceed to Archive only to preserve evidence and accepted design principles; keep blocked experiments open. Production implementation requiring Pi, LangGraph, vector RAG, provider routing, host adapters and managed distribution must wait for actual integration evidence.
