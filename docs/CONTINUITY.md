# Local agent handoff

Previous Research, Apply (with limitations), Verify and Archive were approved. Seven experimental ADRs are accepted as design principles (03–09); native SQLite and local IPC daemon remain candidates (01–02). No full spike passed: five have favorable partial evidence and fifteen are blocked. Historical evidence: 18 original and four verification tests, including tests demonstrating defects; not 22 successful integrations. Ten findings remain open. No production implementation has started.

Local target: `D:\GTR-AI`; WSL2 equivalent `/mnt/d/GTR-AI`. Node 24 LTS is a candidate. Native Windows and WSL must be checked separately; macOS needs a real runner. The prior Linux author environment had npm DNS failures. Do not assume the local machine has the same failure.

## Next work package
1. Read the accepted ADRs and the unblock plan. Inspect Git state, Node/npm/Git and registry access without modifying the project. Inspect the unblock scripts and current official dependency metadata; do not assume old package names/API signatures are correct.
2. Present Research findings and ask for Apply approval. On approval, run the core kit, fixing only demonstrated integration issues, and collect separate logs and lockfiles for each platform. The kit is a smoke test, not full spike closure.
3. Extend real integration tests against the original criteria: Pi runtime lifecycle and effective tools, LangGraph crash/replay and approval enforcement, SQLite bindings/vector/checkpoint compatibility. Resolve findings V-01/V-03/V-04/V-10 where applicable. No live provider calls without specific approval.
4. Verify independently of implementation pass, reproduce tests, review security and benchmarks; ask approval before Archive. Update ADRs only on explicit approval. Keep remaining spikes open.

## Existing commands (after approval)
Windows from repository root: `powershell -NoProfile -ExecutionPolicy Bypass -File .\spikes\unblock\run-windows.ps1`
WSL2 from `/mnt/d/GTR-AI`: `bash spikes/unblock/run-wsl.sh`
Evidence: `.spike-workspaces/<platform>-<arch>/evidence/<UUID>/`. See `spikes/unblock/README.md`.

## Provenance
The Archive and Unblock Kit were merged without changing their original files. The historical root README is retained for checksum integrity. New project briefs are reconstructed from the conversation, not verbatim copies of the earlier long writing blocks. They complement, not supersede, the archived architecture and approved decisions. The bootstrap does not validate external dependencies or run tests on the user's machine.
