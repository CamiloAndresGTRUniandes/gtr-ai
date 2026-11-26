# GTR-AI Architecture Spikes — Archive

Start with [Archive report](docs/ARCHIVE_REPORT.md), [ADR registry](docs/ADR_REGISTRY.md), [Provisional architecture](docs/ARCHITECTURE_PROVISIONAL.md), [Risk register](docs/ARCHITECTURE_RISK_REGISTER.md) and [Unblock plan](docs/UNBLOCK_PLAN.md).

Extract into a separate staging directory before merging into D:\GTR-AI. Do not overwrite existing project files without reviewing diffs. Historical reports and original ZIPs are retained; only the nine working ADRs and README have been updated from Verify. Reproduction instructions: verification/REPRODUCE.md. Run experiments in a disposable copy because they overwrite benchmark JSON. No production code is included.

Integrity: from archive root, `sha256sum -c archive/SHA256SUMS` (Linux/WSL). The manifest excludes itself. No experiments rerun during Archive.
