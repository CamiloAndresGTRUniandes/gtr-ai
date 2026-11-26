# Evidence manifest — WSL2 unblock run 877d9948-73be-4cf5-a07b-018fa0a62e5f

## Provenance

| Field | Value |
| --- | --- |
| Run identifier | `877d9948-73be-4cf5-a07b-018fa0a62e5f` |
| Platform | WSL2, `linux` / `x64`, Node `v24.22.3`, `execPath` `/usr/bin/node` (from `environment.json`) |
| Run timestamp (as recorded) | `2026-11-25T22:20:26.348Z` |
| Producer | `spikes/unblock/run-wsl.sh` → `spikes/unblock/run.mjs` |
| Original location | `.spike-workspaces/linux-x64/evidence/877d9948-73be-4cf5-a07b-018fa0a62e5f/` (and `.spike-workspaces/linux-x64/package.json`) |
| Source commit | `7f8eb6437232988e88caf1a5da51dc99ccc73a4a` (audited baseline) |
| Relocated by | `chore/repository-hygiene` remediation |

Every retained file was copied byte-for-byte. Its SHA-256 was compared against the
blob at the audited baseline (`git show <baseline>:<original path> | sha256sum`);
all 21 files are **identical** to the baseline. No file was edited, redacted or
regenerated. Integrity of the retained set is recorded in `SHA256SUMS`
(verify with `sha256sum -c SHA256SUMS` from this directory).

## Retained files

| File | Category | Recorded exit / status (from `results.json`) |
| --- | --- | --- |
| `environment.json` | Environment metadata | n/a |
| `registry-ping.log` | npm registry connectivity (`registry.npmjs.org`) | PASS, exit 0 |
| `installation.log` | Installation log | PASS, exit 0 |
| `dependency-tree.log` | Dependency resolution (`npm ls`-style tree) | PASS, exit 0 |
| `package.json` | Package manifest (workspace root, exact pins) | n/a |
| `package-lock.json` | Dependency lockfile | n/a |
| `metadata-typescript.log` | Package metadata | PASS, exit 0 |
| `metadata-zod.log` | Package metadata | PASS, exit 0 |
| `metadata-_types_node.log` | Package metadata | PASS, exit 0 |
| `metadata-_earendil-works_pi-coding-agent.log` | Package metadata | PASS, exit 0 |
| `metadata-_langchain_core.log` | Package metadata | PASS, exit 0 |
| `metadata-_langchain_langgraph.log` | Package metadata | PASS, exit 0 |
| `metadata-_langchain_langgraph-checkpoint-sqlite.log` | Package metadata | PASS, exit 0 |
| `metadata-better-sqlite3.log` | Package metadata | PASS, exit 0 |
| `metadata-sqlite-vec.log` | Package metadata | PASS, exit 0 |
| `sqlite-native.log` | Test result (SQLite native, FTS5, rollback) | PASS, exit 0 |
| `sqlite-vector.log` | Failure log (sqlite-vec: vector IDs must be integers) | FAIL, exit 1 |
| `pi.log` | Failure log (Pi runtime `ETIMEDOUT`) | FAIL, exit 1 |
| `langgraph-start-approve.log` | Failure log (state attribute / node name `research` collision) | FAIL, exit 1 |
| `langgraph-start-reject.log` | Failure log (same failure as approve) | FAIL, exit 1 |
| `results.json` | Aggregated results and original exit codes | — |

`results.json` additionally records `langgraph-approve` and `langgraph-reject`
(resume steps) as `BLOCKED` with no exit code, because their start steps failed.

Benchmark observations: this run recorded no timing benchmarks beyond the registry
ping latency in `registry-ping.log` and the installation duration in
`installation.log`. Historical benchmark data remains in `docs/benchmarks/`.

## What this evidence does and does not show

- The committed raw evidence of this run shows **SQLite vector, LangGraph and Pi
  failing** (exit 1). It does not contain any successful SQLite-vector or LangGraph
  execution log.
- Successful executions of the corrected SQLite-vector and LangGraph scripts are
  described in `docs/ARCHIVE_REPORT.md` and related documents. They are
  **reported but not independently reproduced from committed raw evidence**. No
  success log has been fabricated or reconstructed here. See
  `docs/audits/REPOSITORY_AUDIT.md` (AUD-003).
- The lockfile contains two `better-sqlite3` versions: `13.2.0` (direct) and
  `12.11.1` (nested, required by `@langchain/langgraph-checkpoint-sqlite` as
  `^12.10.0`). See AUD-004.

## Excluded artifacts

| Artifact | Reason | Baseline reference |
| --- | --- | --- |
| `approve.db` | Generated local database (0 bytes) | `7f8eb6437232988e88caf1a5da51dc99ccc73a4a:.spike-workspaces/linux-x64/evidence/877d9948-73be-4cf5-a07b-018fa0a62e5f/approve.db`, blob `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391`, size 0 |
| `reject.db` | Generated local database (0 bytes) | same path with `reject.db`, blob `e69de29bb2d1d6434b8b29ae775ad8c2e48c5391`, size 0 |
| `.spike-workspaces/linux-x64/node_modules/` | Installed dependencies (22,962 tracked files at baseline); reproducible from `package-lock.json` | `7f8eb6437232988e88caf1a5da51dc99ccc73a4a:.spike-workspaces/linux-x64/node_modules/` |
| `.spike-workspaces/linux-x64/package-lock.json` | Byte-identical duplicate of the retained `package-lock.json` | baseline path as named |
| `.spike-workspaces/linux-x64/{langgraph.mjs,pi.test.mjs,sqlite-native.test.mjs,sqlite-vector.test.mjs}` | Byte-identical to the canonical sources in `spikes/unblock/` at the baseline | baseline paths as named |

Excluded artifacts remain retrievable from Git history at the baseline commit;
history was not rewritten.

## Secret review

All retained text files were reviewed before inclusion: the small logs were read
in full; `package-lock.json` and `dependency-tree.log` were scanned with regular
expressions for tokens, auth headers, private keys, cloud keys and credentials.
Matches were limited to package names (`@aws-sdk/token-providers`,
`js-tiktoken`). All 209 `resolved` URLs point to the public
`https://registry.npmjs.org`. No home-directory paths or usernames were found; the
failure logs contain the repository path `/mnt/c/tst-lab/GTR-AI/...`, retained
unchanged. Dedicated secret scanners (gitleaks, trufflehog, detect-secrets) were
not available in the environment.
