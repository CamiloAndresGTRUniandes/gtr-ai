# SPIKE-ADR-04: Selective context and lexical retrieval

Status: Accepted — design principle only



## Decision
Use exact dedup, explicit scope/status and lexical search baseline.

## Evidence
FTS5 and synthetic byte reduction tests passed.

## Alternatives
Vector-only search; full context injection

## Consequences and residual risks
No real token savings or semantic retrieval quality measured.

## Validation
See corresponding spike reports; repeat on target platforms and actual dependencies before production adoption.

## Archive disposition — 2026-11-25
Human approval recorded in the GTR-AI conversation: seven principles accepted; native SQLite and daemon retained as candidates.

Filter by authorized project and active status before retrieval; evaluate ranking interference, real embeddings and actual token counts.

Implementation validation remains open. Historical original is preserved in archive/source-verify.zip.
