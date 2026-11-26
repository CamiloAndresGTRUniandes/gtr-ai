# SPIKE-ADR-06: External side effects

Status: Accepted — design principle only



## Decision
Persist intent, reconcile uncertain outcomes, fail closed.

## Evidence
Mock duplicate suppression and unknown-outcome refusal.

## Alternatives
Blind retries

## Consequences and residual risks
Real API idempotency and durable journal not tested.

## Validation
See corresponding spike reports; repeat on target platforms and actual dependencies before production adoption.

## Archive disposition — 2026-11-25
Human approval recorded in the GTR-AI conversation: seven principles accepted; native SQLite and daemon retained as candidates.

Persist operation intent and stable ID; reconcile unknown outcomes before retry; suspend if unknown. Current remote fixture shares DB; independent failure-domain tests required.

Implementation validation remains open. Historical original is preserved in archive/source-verify.zip.
