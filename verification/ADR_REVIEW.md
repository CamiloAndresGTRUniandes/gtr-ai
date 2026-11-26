# Independent-pass ADR review

Recommendations are not human approvals. All nine source ADRs remain Proposed.

| ADR | Recommendation | Evidence and conditions |
|---|---|---|
| 01 | Retain candidate | Native SQLite WAL, crash recovery, backup and migration reproduced; actual sqlite-vec, LangGraph and target Node/platform tests required. |
| 02 | Retain candidate | Unix IPC viable; compare independent process model, durable ownership, auth, idle lifecycle and named pipes before selection (V-04). |
| 03 | Accept principle with clarification | Deterministic eligibility and paid opt-in demonstrated on fixtures. Resolve paid affinity precedence (V-02); no adaptive routing choice yet. |
| 04 | Accept principle | Exact dedup and lexical baseline reproduced; ranking isolation and real token/semantic quality pending (V-06, V-07). |
| 05 | Accept principle | Real Git conflict and dirty original preservation reproduced. Worktrees not sandbox; target OS and ownership pending. |
| 06 | Accept principle; implementation blocked | Simulated reconciliation only; revise original evidence to acknowledge followup durable local journal but shared database (V-05). |
| 07 | Accept principle | Stale/replayed revision rejected and competing processes yield one update. Bind phase explicitly, hash actual immutable artifact, authorize human identity, integrate actual LangGraph transaction semantics. |
| 08 | Accept principle | Interrupted dirty worktree survives; normal removal refused. Add ownership, orphan retention and authorized cleanup. |
| 09 | Accept principle | Mandatory bytes fail closed, provenance preserved in fixture. Real tokenizer, framing and source authorization pending (V-06). |

Accept principle means suitable for human approval as a design constraint, not verified production implementation. ADR 01 and 02 remain technology candidates. No source ADR status was changed.
