# SPIKE-ADR-05: Git worktree isolation

Status: Accepted — design principle only



## Decision
Keep worktrees for concurrent code tasks.

## Evidence
Real independent merge and conflict; dirty original preserved.

## Alternatives
Sequential edits; separate clones

## Consequences and residual risks
Cross-platform recovery and sandbox boundaries remain unverified.

## Validation
See corresponding spike reports; repeat on target platforms and actual dependencies before production adoption.

## Archive disposition — 2026-11-25
Human approval recorded in the GTR-AI conversation: seven principles accepted; native SQLite and daemon retained as candidates.

Isolate concurrent writes by baseline and task ownership; never equate worktrees with a sandbox. Validate Windows/macOS and integration conflicts.

Implementation validation remains open. Historical original is preserved in archive/source-verify.zip.
