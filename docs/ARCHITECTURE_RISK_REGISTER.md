# Architecture risk register

Risks remain open except for the WSL2 connectivity mitigation recorded in R-01. Owners below are proposed responsibility areas, not assigned individuals. Severity is an archive prioritization judgment, not production acceptance.

Last reviewed: repository-hygiene remediation against audited baseline `7f8eb6437232988e88caf1a5da51dc99ccc73a4a`. See the [repository audit](audits/REPOSITORY_AUDIT.md) (AUD-001..AUD-010) and [retained WSL2 evidence manifest](../evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/MANIFEST.md).

| ID | Severity | Status | Risk | Spikes | Closure evidence | Owner area |
|---|---|---|---|---|---|---|
| R-01 | Critical | Mitigated on WSL2 only; other targets open | Historical registry DNS EAI_AGAIN: npm connectivity was restored on WSL2, but cross-platform installation and supply-chain validation remain outstanding | 001–020 | Retained WSL2 registry/install logs; verify approved access and pinned installation on Windows/macOS and complete supply-chain review | Foundation |
| R-02 | High | Open | Target Windows and macOS untested | 001,003,006,007,017,019 | CI on Windows x64, Linux x64, macOS ARM64; native smoke and recovery tests | Release |
| R-03 | High | Open | V-01: empty graph / missing approval metadata accepted | 004,005 | Reject invalid graphs; central gate injection; actual replay tests | Workflow |
| R-04 | Medium | Open | V-02: paid affinity precedes subscription preference | 010,012 | Policy precedence tests including explicit paid pins and quota races | Router |
| R-05 | High | Open | V-03: path checks are not sandbox; new files and TOCTOU | 002,017,019 | Effective OS boundaries or fail closed for unsupported capabilities; adversarial path/command tests | Security |
| R-06 | High | Open | V-04: volatile IPC dedup and ownership | 006 | Durable ownership and request identity; bounded frames; authenticated restart tests | Core |
| R-07 | High | Open | V-05: remote fixture shares local DB | 019 | Independent mock service and failure injection; authorized sandbox reconciliation | Integration |
| R-08 | Medium | Open | V-06: byte budget incomplete | 014 | Real provider tokenizer/framing/output reserve; mandatory context and provenance tests | Context |
| R-09 | Medium | Open | V-07: synthetic vectors and shared FTS ranking | 008,009 | Actual embedding corpus and scoped retrieval evaluation; isolation tests | Memory |
| R-10 | Medium | Open | V-08: aggregate-only samples and limited repetitions | All | Raw samples, repeated runs, cold/warm split and comparable quality baselines | Performance |
| R-11 | Medium | Open | V-09: tiny offline npm package only | 019 | Real managed provisioning and upgrade/interruption tests | Distribution |
| R-12 | Medium | Open | V-10: mock workflow not durable end-to-end | 004,020 | Actual agent/checkpoint integration, replay, final persisted completion | Workflow |
| R-13 | High | Open | Provider entitlements, terms and billing not verified | 010,011,012,018 | Authorized account matrix; no unauthorized fallback; live calls only after consent | Provider |
| R-14 | High | Open | Redistribution licenses and supply chain unverified | 001,011,013,015,016,019 | Review exact versions and licenses, integrity verification and SBOM | Distribution |
| R-15 | High | Open | Pi TUI / host capability constraints | 002,003,018 | Native SDK/RPC and host-specific capability tests; document unsupported enforcement | Runtime |
| R-16 | Medium | Open | No measured quality-adjusted token savings | 012,013,014,015,020 | Matched A/B tasks with real usage and independent verification | Performance |
| R-17 | High | Open | Graphify Python provisioning and privacy unknown | 016 | Verify managed runtime, query API, stale graph handling and network policy | Knowledge |
| R-18 | High | Open | SQLite binding and checkpoint compatibility uncertain | 007,008,004 | Compare single binding strategy and target platforms before selection | Memory |
| R-19 | High | Open | Unresolved Pi runtime timeout: committed `pi.log` records `ETIMEDOUT`, exit 1 | 002 | Diagnose stalled import/session initialization; retain successful lifecycle and effective-tool raw logs | Runtime |
| R-20 | High | Needs further evidence | Successful corrected SQLite-vector/LangGraph executions are reported but not independently reproduced from committed raw evidence; retained SQLite-vector and both LangGraph starts FAIL exit 1, resumes BLOCKED | 004,007 | Independently reproduce corrected flows and commit raw logs, exit codes, manifest and checksums; do not fabricate missing logs | Verification |
| R-21 | High | Open | Two `better-sqlite3` versions: 13.2.0 direct and 12.11.1 nested via `@langchain/langgraph-checkpoint-sqlite` requiring `^12.10.0` | 001,004,007 | Resolve duplication and demonstrate vector/checkpoint compatibility before selecting a shared binding | Memory |
| R-22 | High | Open | No cross-platform CI matrix | 001,003,004,007,017,019 | Run reproducible installation, native smoke and recovery jobs on Windows x64, native Linux x64 and macOS ARM64 with separate lockfiles/logs | Release |
| R-23 | Medium | Open | Experimental workspace is on mounted Windows filesystem (`/mnt/c/tst-lab/GTR-AI`); WSL2 results do not establish native filesystem behavior | 001,007,017 | Compare native filesystem runs for locking, paths, permissions and performance; retain environment metadata | Foundation |
| R-24 | Medium | Open — historical provenance limitation | `archive/SHA256SUMS` and `BOOTSTRAP_SHA256SUMS` already fail for documents modified after generation at the audited baseline (7 and 9 mismatches respectively, including two scripts in the latter) | All | Preserve historical manifests and ZIPs; see [baseline checksum output](audits/evidence/historical-checksum-check.txt); document later changes with new scoped manifests, never silently regenerate old checksums | Archive |
