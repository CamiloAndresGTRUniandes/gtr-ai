# SPIKE-ADR-01: Native SQLite first

Status: Candidate — selection deferred



## Decision
Evaluate node:sqlite before adding a binding.

## Evidence
WAL, rollback and crash recovery passed on Node 22.16; FTS5 is enabled.

## Alternatives
better-sqlite3; separate persistence adapters

## Consequences and residual risks
sqlite-vec and LangGraph integration, target Node 24 and platform validation outstanding.

## Validation
See corresponding spike reports; repeat on target platforms and actual dependencies before production adoption.

## Archive disposition — 2026-11-25
Human approval recorded in the GTR-AI conversation: seven principles accepted; native SQLite and daemon retained as candidates.

Compare actual sqlite-vec and LangGraph checkpoint compatibility on target Node and all three OS targets.

Implementation validation remains open. Historical original is preserved in archive/source-verify.zip.
