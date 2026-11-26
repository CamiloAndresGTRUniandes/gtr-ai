# Apply and Verify spike summary — current archive status

This summary includes the current WSL2 Apply/Verify iteration. Historical reports remain preserved. No production implementation is authorized.

Fully validated: 0 / Partial evidence: 7 / Blocked: 13 / Partial spikes: 001, 004, 006, 007, 009, 014, 017. All other spikes remain blocked.

The [retained evidence manifest](../evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/MANIFEST.md) records SQLite-vector FAIL exit 1 and LangGraph start-approve/start-reject FAIL exit 1, with resumes BLOCKED. Corrected successes below are reported but not independently reproduced from committed raw evidence. npm connectivity was restored on WSL2, but cross-platform installation and supply-chain validation remain outstanding.

| ID | Component | Current status | Current evidence / limitation |
|---|---|---|---|
| SPK-001 | Platform foundation | OPEN — partial | Node 24.22.3/npm 11.19.1, registry, metadata, installation and dependency tree passed on WSL2 Linux x64. Native Windows/macOS, pnpm, TypeScript execution and full supply-chain review remain open. |
| SPK-002 | Pi runtime | BLOCKED | Pi 1.6.1 installation recorded; smoke test timed out in child `spawnSync` (`ETIMEDOUT`, exit 1). No lifecycle or effective-tool validation. |
| SPK-003 | TUI | BLOCKED | Pi and native terminal matrix remain unavailable. |
| SPK-004 | LangGraph | OPEN — partial | LangGraph 1.7.5 plus SQLite saver 1.1.1 persisted synthetic interrupt/resume for approve/reject across processes — reported but not independently reproduced from committed raw evidence. Crash/replay, cancellation, recovery and revision-bound approvals remain open. |
| SPK-005 | Declarative workflow | BLOCKED | No actual YAML/compiler integration. |
| SPK-006 | Daemon and IPC | OPEN — partial | Historical local Unix-socket evidence only; durable cross-process ownership remains open. |
| SPK-007 | SQLite persistence | OPEN — partial | Both bindings loaded sqlite-vec 0.1.9 and passed synthetic FTS5/vector checks — reported but not independently reproduced from committed raw evidence. Migrations, backup/restore, disk concurrency, shared checkpoint binding and OS matrix remain open. |
| SPK-008 | Hybrid RAG | BLOCKED | No actual embedding corpus or quality evaluation. |
| SPK-009 | Decision management | OPEN — partial | Historical scoped lexical evidence only. |
| SPK-010 | Provider authentication | BLOCKED | No authorized real provider matrix. |
| SPK-011 | Copilot Fusion | BLOCKED | No authorized host/entitlement evidence. |
| SPK-012 | Adaptive routing | BLOCKED | Mock policy evidence only. |
| SPK-013 | Ponytail | BLOCKED | No upstream execution or quality benchmark. |
| SPK-014 | Context engineering | OPEN — partial | Synthetic byte/dedup evidence only. |
| SPK-015 | RTK | BLOCKED | No platform binary evidence. |
| SPK-016 | Graphify | BLOCKED | No managed runtime evidence. |
| SPK-017 | Git worktrees | OPEN — partial | Historical Linux worktree evidence only. |
| SPK-018 | Host integrations | BLOCKED | No complete host capability matrix. |
| SPK-019 | Azure DevOps/security/distribution | BLOCKED | Mock/offline evidence only. |
| SPK-020 | Walking skeleton | BLOCKED | No real agent-integrated vertical flow. |

**Archive decision:** preserve this evidence, keep all incomplete spikes open, and do not approve production architecture or implementation from these results.
