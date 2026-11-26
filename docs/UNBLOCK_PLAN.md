# Remaining spike execution plan

B = blocked against original criteria; P = favorable partial evidence. Fully validated: 0 / Partial evidence: 7 / Blocked: 13 / Partial spikes: 001, 004, 006, 007, 009, 014, 017. All other spikes remain blocked. The dependency column is a proposed scheduling aid, not a validated DAG; SPK-001 may be closed in stages so downstream dependency experiments can run without circular gating.

| Spike | Area | State | Prerequisite | Closure experiment | Depends on |
|---|---|---|---|---|---|
| SPK-001 | Platform foundation | P | Network-enabled Node target, npm/pnpm, CI | Install pinned actual dependency set on three OS targets; log versions and licenses | — |
| SPK-002 | Pi runtime | B | Actual Pi SDK/RPC | Delegate, restrict tools, stream, cancel, resume and validate structured output | 001 |
| SPK-003 | TUI | B | Pi runtime and real terminals | Banner/sidebar resize, extension compatibility and startup measurements | 002 |
| SPK-004 | LangGraph | P | Actual LangGraph and checkpoint binding | Persist approval, crash/replay, bounded rework, cancellation and final completion | 001,007 |
| SPK-005 | Declarative workflows | B | Actual YAML and LangGraph | Reject invalid/empty graph; mandatory approval gates cannot be removed | 004 |
| SPK-006 | Daemon / IPC | P | Target OS, independent clients | Compare CLI; durable ownership, auth, bounded requests, idle shutdown and restart | 001 |
| SPK-007 | SQLite | P | Target Node and actual vector/checkpoint dependencies | Compare bindings, WAL/migrations/crash and extensions on matrix | 001 |
| SPK-008 | Hybrid RAG | B | sqlite-vec, ONNX, embedding model | Real multilingual corpus, precision/recall/MRR, latency, isolation | 007 |
| SPK-009 | Decision management | P | Real retrieval and decision lifecycle | Scope-aware conflict candidates, human supersession and provenance | 008 |
| SPK-010 | Provider authentication | B | Authorized accounts / official mechanisms | Multi-account isolation, refresh, entitlements, redaction and paid opt-in | 001,002 |
| SPK-011 | Copilot Fusion | B | Pinned extension and authorized Copilot entitlement | Auto/Fusion capability detection, bounded calls, affinity and quota evidence | 002,010 |
| SPK-012 | Adaptive routing | B | Actual router candidates and authorized models | Matched task success, token/latency/rework comparison and policy precedence | 002,010,011 |
| SPK-013 | Ponytail | B | Pinned upstream skill, license, authorized model | Embed and run baseline/full/selective A/B with quality checks | 002,010 |
| SPK-014 | Context engineering | P | Provider tokenizer and actual agent tasks | Full request accounting, raw samples, provenance and quality-preserving token comparison | 008,012,013 |
| SPK-015 | RTK | B | Actual platform binaries | Single execution raw/filtered fidelity, exit status, error preservation, benchmark | 001,002 |
| SPK-016 | Graphify | B | Actual Python package/runtime | Managed install, C#/TS/Python graph query, privacy and refresh | 001 |
| SPK-017 | Git worktrees | P | Target OS and scheduler | Crash recovery, task ownership, dependency order, conflict and cleanup tests | 001 |
| SPK-018 | Host integrations | B | Installed VS Code, Claude Code, Codex and authorized mechanisms | Capability matrix, MCP approvals, Codex App Server/SDK/exec comparison | 002,004,006,010 |
| SPK-019 | Azure DevOps / security / distribution | B | Sandbox API, OS controls and package registry | Independent remote failure, authorization, actual provisioning, SBOM and target OS installs | 001,006,010,015,016,017,018 |
| SPK-020 | Walking skeleton | B | All required actual integration evidence | Real vertical SDD with approval, worktree, memory, recovery and durable completion | 002–019 |

## Execution waves
1. npm connectivity was restored on WSL2, but cross-platform installation and supply-chain validation remain outstanding. Verify registry/artifact access on remaining native targets, upstream packages, licenses, integrity and install scripts; establish the target Node baseline and Windows/Linux/macOS CI matrix. Do not bypass corporate proxies or disable TLS verification.
2. Real core: diagnose the unresolved Pi timeout (`ETIMEDOUT`, exit 1; SPK-002 remains blocked), SQLite binding, LangGraph, local IPC, worktrees, Graphify provisioning. Reproduce corrected SQLite-vector/LangGraph successes with committed raw logs: they are reported but not independently reproduced from committed raw evidence. Resolve direct `better-sqlite3` 13.2.0 versus nested 12.11.1 (`@langchain/langgraph-checkpoint-sqlite` requires `^12.10.0`). Resolve V-01/V-03/V-04/V-10 in affected prototypes.
3. Real memory and provider integration: embeddings, decision lifecycle, provider auth, Copilot, adaptive router; Ponytail, TUI, RTK, declarative workflows and hosts as dependencies permit.
4. Context and quality benchmarks; security, distribution, Azure DevOps independent-failure tests; Windows/Linux/macOS matrix.
5. Real walking skeleton; independent verification pass; human approval and superseding archive.

## Local preflight (PowerShell)
Run from an existing or newly created repository directory; these commands do not install packages or send model requests.
```powershell
Set-Location D:\GTR-AI
node --version
npm --version
git --version
python --version
npm config get registry
npm ping --fetch-retries=0 --fetch-timeout=10000
```
If npm is inaccessible, check approved network/proxy configuration with the administrator. Avoid publishing proxy credentials or raw authentication logs. Once registry access is available, resolve actual package names and versions from official upstream sources and record exact lockfiles before installation. Use an isolated experimental worktree or disposable repo and inspect scripts before running them.

## Authorization and gates
No paid or subscription-consuming calls, no external writes, no remote access activation without explicit authorization. Use synthetic repositories and fixtures first. Native Windows and macOS require actual runners; WSL does not count as native Windows. Close each spike only with executable evidence and report status; record raw timings and source versions. Do not run all dependencies blindly in parallel. New work packages require approved phase boundaries. Archive approval does not approve production implementation.
