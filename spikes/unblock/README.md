# Core dependency unblock kit

Extract into the repository root (D:\GTR-AI). Node 24 LTS and npm must already be installed separately in Windows and WSL2. Review dependencies before execution: npm runs third-party installation scripts. No provider inference or authentication is requested by these tests. No global package installation is performed.

Windows: `powershell -NoProfile -ExecutionPolicy Bypass -File .\spikes\unblock\run-windows.ps1`

WSL2: `bash /mnt/d/GTR-AI/spikes/unblock/run-wsl.sh`

Results are written under `.spike-workspaces/<platform>-<arch>/evidence/<UUID>/`. Keep the directory out of Git. Send the evidence directory and lockfile after reviewing logs for private registry URLs or secrets; never send node_modules or authentication files. Each platform resolves its own initial lockfile; compare versions before interpreting results. Subsequent runs use npm ci. Do not run two instances on the same platform workspace concurrently.

Scope: SPK-001 installation; SPK-007 real vector extension with synthetic vectors; SPK-002 import and session manager only; SPK-004 cross-process interrupt and approve/reject. No full spike is automatically closed. No embeddings, model execution, concurrent approval enforcement or full walking skeleton is validated. Native SQLite tests run before registry access. Dependency tests are unverified until executed with installed packages. The author environment is Linux Node 22.16.0 and registry DNS is blocked. PowerShell is unavailable there.
