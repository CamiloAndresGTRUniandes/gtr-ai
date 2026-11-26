# SPIKE-ADR-03: Deterministic routing policy layer

Status: Accepted — design principle only



## Decision
Keep authorization, capability filtering and paid opt-in deterministic.

## Evidence
Synthetic routing tests and latency benchmarks passed.

## Alternatives
Third-party-only router; model classifier

## Consequences and residual risks
Real provider credentials, quota behavior and candidate quality are unverified.

## Validation
See corresponding spike reports; repeat on target platforms and actual dependencies before production adoption.

## Archive disposition — 2026-11-25
Human approval recorded in the GTR-AI conversation: seven principles accepted; native SQLite and daemon retained as candidates.

Enforce authorization and capabilities first; subscription preference before automatic paid affinity; explicit authorized pins may override preference. Test actual providers and quota races.

Implementation validation remains open. Historical original is preserved in archive/source-verify.zip.
