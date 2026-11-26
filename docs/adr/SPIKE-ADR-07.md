# SPIKE-ADR-07 — Revision-bound phase approvals

Status: Accepted — design principle only



Context: A host may replay or submit an outdated approval after an artifact changes.

Decision: Bind approvals to workflow identity, phase, revision and approved artifact digest. Commit the state transition atomically with a compare-and-set condition; reject stale and replayed requests. Production approval identity and authorization must also be recorded.

Alternatives: Unconditional state transition; in-memory deduplication. Neither provides durable stale-approval protection.

Evidence: `spikes/followup.mjs`, first test; `evidence/followup.tap`. A local SQL update rejects stale artifact identity and repeated revision, and a separate process sees the committed state.

Consequences: Additional version tracking; explicit reapproval after artifact changes. Prototype does not implement LangGraph replay, user identity, signatures or multi-host concurrency.

Validation: Verify actual LangGraph checkpoint integration, concurrent approval attempts, phase binding, authenticated users and crash windows on supported platforms.

## Archive disposition — 2026-11-25
Human approval recorded in the GTR-AI conversation: seven principles accepted; native SQLite and daemon retained as candidates.

Bind approval to authenticated human, workflow, phase, revision and immutable artifact digest; atomic CAS. Actual LangGraph replay and crash windows remain open.

Implementation validation remains open. Historical original is preserved in archive/source-verify.zip.
