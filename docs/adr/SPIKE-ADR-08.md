# SPIKE-ADR-08 — Preserve interrupted worktrees

Status: Accepted — design principle only



Decision: Retain dirty worktrees after cancellation or crashes. Record baseline and task ownership; reconcile before cleanup. Never force-remove user changes by default.

Alternatives: Automatic forced cleanup; immediate reset. These risk losing partial work.

Evidence: `spikes/followup.mjs` SPK-017; real Git and SIGKILL on Linux. Dirty removal rejected, original repository unchanged.

Consequences: Disk retention and explicit recovery policy required. Git worktrees are not security sandboxes.

Validation: Windows locking, macOS, orphan handling, scheduler crash and cleanup ownership.

## Archive disposition — 2026-11-25
Human approval recorded in the GTR-AI conversation: seven principles accepted; native SQLite and daemon retained as candidates.

Preserve dirty interrupted worktrees and reconcile ownership before cleanup; no forced deletion by default.

Implementation validation remains open. Historical original is preserved in archive/source-verify.zip.
