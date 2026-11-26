# SPIKE-ADR-02: Local IPC daemon candidate

Status: Candidate — selection deferred



## Decision
Continue with an on-demand daemon candidate using local IPC.

## Evidence
Unix sockets worked within and across processes.

## Alternatives
Independent processes; authenticated loopback

## Consequences and residual risks
Windows named pipes, ownership, authentication and lifecycle unverified.

## Validation
See corresponding spike reports; repeat on target platforms and actual dependencies before production adoption.

## Archive disposition — 2026-11-25
Human approval recorded in the GTR-AI conversation: seven principles accepted; native SQLite and daemon retained as candidates.

Compare independent CLI and daemon; durable ownership, authenticated IPC, idle shutdown and Windows named pipes.

Implementation validation remains open. Historical original is preserved in archive/source-verify.zip.
