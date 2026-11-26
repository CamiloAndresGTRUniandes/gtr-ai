# Architecture decision registry

Archive decision date: 2026-11-25. Scope: experimental ADRs only; this does not supersede earlier product ADR identifiers.

| ID | Decision | Status | Conditions |
|---|---|---|---|
| SPIKE-ADR-01 | Native SQLite | Candidate — selection deferred | Compare actual sqlite-vec and LangGraph checkpoint compatibility on target Node and all three OS targets. |
| SPIKE-ADR-02 | Local IPC daemon | Candidate — selection deferred | Compare independent CLI and daemon; durable ownership, authenticated IPC, idle shutdown and Windows named pipes. |
| SPIKE-ADR-03 | Deterministic routing | Accepted — design principle only | Enforce authorization and capabilities first; subscription preference before automatic paid affinity; explicit authorized pins may override preference. Test actual providers and quota races. |
| SPIKE-ADR-04 | Selective context and lexical retrieval | Accepted — design principle only | Filter by authorized project and active status before retrieval; evaluate ranking interference, real embeddings and actual token counts. |
| SPIKE-ADR-05 | Git worktree isolation | Accepted — design principle only | Isolate concurrent writes by baseline and task ownership; never equate worktrees with a sandbox. Validate Windows/macOS and integration conflicts. |
| SPIKE-ADR-06 | External operation reconciliation | Accepted — design principle only | Persist operation intent and stable ID; reconcile unknown outcomes before retry; suspend if unknown. Current remote fixture shares DB; independent failure-domain tests required. |
| SPIKE-ADR-07 | Revision-bound approvals | Accepted — design principle only | Bind approval to authenticated human, workflow, phase, revision and immutable artifact digest; atomic CAS. Actual LangGraph replay and crash windows remain open. |
| SPIKE-ADR-08 | Preserve interrupted worktrees | Accepted — design principle only | Preserve dirty interrupted worktrees and reconcile ownership before cleanup; no forced deletion by default. |
| SPIKE-ADR-09 | Mandatory context and provenance | Accepted — design principle only | Preserve authorized provenance and mandatory constraints through dedup; fail closed when full provider-aware budget is insufficient. Byte fixture is not a tokenizer. |
