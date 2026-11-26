# Architecture risk register

All risks are open. Owners below are proposed responsibility areas, not assigned individuals. Severity is an archive prioritization judgment; no remediation has been executed.

| ID | Severity | Status | Risk | Spikes | Closure evidence | Owner area |
|---|---|---|---|---|---|---|
| R-01 | Critical | Open | Registry DNS EAI_AGAIN / no external packages | 001–020 | Restore approved network access; pin and install actual dependencies; retain command logs | Foundation |
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
