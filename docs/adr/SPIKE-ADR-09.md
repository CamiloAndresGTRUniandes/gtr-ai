# SPIKE-ADR-09 — Mandatory context and provenance

Status: Accepted — design principle only



Decision: Deduplicate exact content while retaining all source references and mandatory flags. If mandatory context exceeds the budget, suspend or request a larger budget instead of silently dropping it.

Alternatives: Truncate indiscriminately; summarize mandatory constraints automatically.

Evidence: `spikes/followup.mjs` SPK-014; deterministic byte-budget fixture passed.

Consequences: Requires explicit mandatory metadata and model-aware token accounting. No model quality or token savings proven.

Validation: Real provider tokenizers, prompt caching, source authorization, conflicting metadata and task-success evaluation.

## Archive disposition — 2026-11-25
Human approval recorded in the GTR-AI conversation: seven principles accepted; native SQLite and daemon retained as candidates.

Preserve authorized provenance and mandatory constraints through dedup; fail closed when full provider-aware budget is insufficient. Byte fixture is not a tokenizer.

Implementation validation remains open. Historical original is preserved in archive/source-verify.zip.
