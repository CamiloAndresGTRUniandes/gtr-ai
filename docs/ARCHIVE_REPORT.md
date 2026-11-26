# Archive report — 2026-11-25

Research, Apply, Verify and Archive were human-approved for the current unblock iteration. This report consolidates the WSL2 evidence and preserves the distinction between partial integration evidence and spike closure. No production implementation is authorized.

## Current disposition

- **SPK-001 — Platform foundation:** OPEN, partial. Linux x64 dependency installation succeeded on Node 24.22.3/npm 11.19.1. TypeScript execution, pnpm workspaces, licenses/supply chain, and native Windows/macOS validation remain open.
- **SPK-002 — Pi runtime:** BLOCKED. Pi 1.6.1 installation was recorded, but the smoke test timed out in `spawnSync`; no session lifecycle or effective-tool evidence was obtained. Pi was not rerun during Verify.
- **SPK-004 — LangGraph:** OPEN, partial. LangGraph 1.7.5 with SQLite saver 1.1.1 persisted synthetic interrupt/resume across processes for approve and reject after bounded script corrections — reported but not independently reproduced from committed raw evidence. Crash/replay, cancellation, recovery, bounded rework and revision-bound approval remain open.
- **SPK-007 — SQLite persistence:** OPEN, partial. `node:sqlite` and `better-sqlite3` 13.2.0 loaded sqlite-vec 0.1.9, passed FTS5 and synthetic nearest-neighbor checks — reported but not independently reproduced from committed raw evidence. Migrations, backup/restore, disk concurrency, shared checkpoint binding and cross-platform compatibility remain open.

No prioritized spike satisfies its complete original acceptance criteria. Fully validated: 0 / Partial evidence: 7 / Blocked: 13 / Partial spikes: 001, 004, 006, 007, 009, 014, 017. All other spikes remain blocked.

## Evidence

Primary Apply evidence:

- [Retained evidence manifest](../evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/MANIFEST.md)
- Node `v24.22.3`, Linux x64, npm registry reachable.
- Pinned installation and dependency tree passed.
- Original results are retained unchanged: SQLite-vector FAIL exit 1; LangGraph start-approve/start-reject FAIL exit 1, with resumes BLOCKED; Pi FAIL exit 1 (`ETIMEDOUT`).

Corrected experimental scripts:

- `spikes/unblock/sqlite-vector.test.mjs`: integer-compatible vector row IDs.
- `spikes/unblock/langgraph.mjs`: distinct state-channel and node names, including updated assertions.
- `spikes/unblock/pi.test.mjs`: unchanged because the timeout cause was not established.

Verify was reported to reproduce the corrected SQLite and LangGraph flows without installing packages, using network, rerunning Pi, or modifying historical evidence. These successes are reported but not independently reproduced from committed raw evidence. The reported SQLite warm p95 was approximately 0.0116 ms over a synthetic 1,000-sample query; no committed raw success or timing log supports this observation, and it is not a representative workload.

## Provenance and limitations

The evidence is WSL2 Linux x64 only. It does not validate native Windows, macOS, or a separate native Linux runner. The original report recorded no usable revision baseline (`HEAD` and tracked-file state were unavailable). Repository-hygiene remediation now anchors the retained evidence to audited baseline `7f8eb6437232988e88caf1a5da51dc99ccc73a4a`; this does not reconstruct a revision range for the reported corrected runs. Historical reports and archived packages remain preserved and are not overwritten. No credentials, model calls, paid APIs, external writes, pushes or merges were used.

The reported corrected checks cover only the narrow behaviors described; successful raw execution evidence remains missing. They do not promote candidate technologies to production selections, close ADR-01, or validate the complete architecture. Pi, native platform support, full LangGraph recovery, durable approvals, realistic SQLite workloads and all downstream integrations remain blockers.

## Next work package

Resume in a network-enabled, revision-controlled environment with native OS runners. Prioritize diagnosis of the Pi timeout, full platform/license review, crash/replay and approval-boundary tests, SQLite migration/backup/concurrency tests, and independent reproduction. Obtain fresh phase approval before any new Apply package. Production implementation remains prohibited by the current readiness gate.
