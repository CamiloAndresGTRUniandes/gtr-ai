# Repository Audit — Hygiene and Evidence Reconciliation

| Field | Value |
| --- | --- |
| Repository | `CamiloAndresGTRUniandes/gtr-ai` |
| Audited baseline | `7f8eb6437232988e88caf1a5da51dc99ccc73a4a` |
| Remediation branch | `chore/repository-hygiene` |
| Scope | Repository hygiene, evidence preservation, documentation reconciliation |
| Out of scope | Production implementation, new experiments, paid provider usage |

## Status legend

- **Remediated** — fixed on the remediation branch and verified.
- **Open** — confirmed problem that still needs work.
- **Needs evidence** — cannot be confirmed or closed without new, committed raw evidence.

## Summary

| ID | Finding | Status |
| --- | --- | --- |
| AUD-001 | Tracked `node_modules` | Remediated |
| AUD-002 | Unresolved Pi runtime timeout | Open |
| AUD-003 | Missing successful raw execution logs | Needs evidence |
| AUD-004 | Multiple `better-sqlite3` versions | Open |
| AUD-005 | Missing cross-platform CI matrix | Open |
| AUD-006 | Outdated risk register | Remediated |
| AUD-007 | Inconsistent spike classifications | Remediated |
| AUD-008 | Outdated continuity documentation | Remediated |
| AUD-009 | Experimental workspace on mounted Windows filesystem | Open (partially mitigated) |
| AUD-010 | Historical checksum provenance | Open (documented, not concealed) |

Spike classification after reconciliation: **Fully validated: 0 · Partial evidence: 7 ·
Blocked: 13**. Partial spikes: 001, 004, 006, 007, 009, 014, 017. All other spikes
remain blocked.

## Findings

### AUD-001 — Tracked `node_modules` (Remediated)

**Observation.** The baseline tracked 23,088 files, of which 22,962 were
`node_modules` files, all under `.spike-workspaces/linux-x64/node_modules/`. No
root `.gitignore` existed. Two generated SQLite databases (`approve.db`,
`reject.db`, 0 bytes) were also tracked.

**Remediation.** Added a root `.gitignore` (dependencies, experimental workspaces,
build outputs, native binaries, caches, credentials, local databases, logs outside
approved evidence directories, downloaded models). Removed `.spike-workspaces/`
from the index with `git rm -r --cached`; the local installation was not deleted.
Reviewed evidence was first copied to
`evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/` (AUD-003 context).
The dependency manifest and lockfile are retained there.

**Residual.** Files remain in Git history at the baseline; history was not
rewritten by design.

### AUD-002 — Unresolved Pi runtime timeout (Open)

**Observation.** `evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/pi.log`
records `ETIMEDOUT`, exit 1. SPK-002 documents `spawnSync /usr/bin/node` timing
out with no output; the root cause is unknown.

**Action.** SPK-002 stays blocked. Diagnose the timeout (spawn arguments, stdin
handling, network or provider initialisation) in a separate, approved Apply phase
without paid model calls.

### AUD-003 — Missing successful raw execution logs (Needs evidence)

**Observation.** The documentation reports successful executions of the corrected
SQLite-vector and LangGraph scripts. The only committed raw evidence for run
`877d9948-…` shows `sqlite-vector` FAIL (exit 1), `langgraph-start-approve` and
`langgraph-start-reject` FAIL (exit 1), and both resume steps BLOCKED
(`results.json`). No raw log of the reported successes is committed. In addition,
`BOOTSTRAP_SHA256SUMS` no longer matches `spikes/unblock/langgraph.mjs` and
`spikes/unblock/sqlite-vector.test.mjs`, consistent with the scripts being
corrected after that manifest was generated.

**Action taken.** The successes are now labelled in all reconciled documents as
**reported but not independently reproduced from committed raw evidence**. No log
was fabricated or reconstructed.

**Required evidence.** Re-run the corrected scripts and commit the raw logs,
`results.json`, environment metadata and exit codes under a new
`evidence/unblock/<platform>/<run-id>/` directory with a manifest and checksums.

### AUD-004 — Multiple `better-sqlite3` versions (Open)

**Observation.** The retained lockfile resolves `better-sqlite3` `13.2.0` (direct
dependency) and `12.11.1` (nested, required by
`@langchain/langgraph-checkpoint-sqlite` as `^12.10.0`). Two native bindings are
built and installed; `installation.log` shows install scripts for both outside an
`allowScripts` policy. `spikes/unblock/run.mjs` installs packages without a
version and pins them afterwards with `--save-exact`.

**Risk.** Divergent SQLite builds in one process, duplicated native compilation,
and a larger supply-chain surface. It also limits what SPK-001/SPK-007 can claim
about a single shared SQLite.

**Action.** Decide whether to align on the version the checkpoint saver supports
or to isolate the saver; record the decision as part of SPIKE-ADR-01 evaluation
(still a candidate).

### AUD-005 — Missing cross-platform CI matrix (Open)

**Observation.** All committed unblock evidence comes from WSL2 (`linux`/`x64`).
`spikes/unblock/run-windows.ps1` exists but no committed Windows or macOS run
exists, and there is no CI workflow.

**Action.** Add a CI matrix (Windows, Linux, macOS; supported Node versions) that
runs the spike harness without paid providers and publishes raw logs as artifacts.
This requires a separate approval (delivery/CI change).

### AUD-006 — Outdated risk register (Remediated)

**Observation.** `docs/ARCHITECTURE_RISK_REGISTER.md` still listed
"Registry DNS `EAI_AGAIN` / no external packages" as a current global risk and did
not record the Pi timeout, the missing raw logs, the duplicated native dependency,
the missing CI matrix, the mounted-filesystem workspace or checksum provenance.

**Remediation.** Registry risk marked mitigated on WSL2 only (npm connectivity
restored); cross-platform installation and supply-chain validation remain open.
Missing risks added with references to this audit.

### AUD-007 — Inconsistent spike classifications (Remediated)

**Observation.** `docs/ARCHIVE_REPORT.md` and `docs/CONTINUITY.md` stated 5 partial
/ 15 blocked; `docs/UNBLOCK_PLAN.md` still marked SPK-001 and SPK-004 blocked;
`docs/SPIKE_SUMMARY.md` implied 0 / 7 / 13.

**Remediation.** All reconciled documents now state Fully validated 0, Partial
evidence 7 (001, 004, 006, 007, 009, 014, 017), Blocked 13. No spike was promoted
to validated.

### AUD-008 — Outdated continuity documentation (Remediated)

**Observation.** `docs/CONTINUITY.md` used the old counts, presented completed
unblock work as future work, did not record the Pi timeout and referenced the
local `.spike-workspaces/` evidence path.

**Remediation.** Updated counts, current state, next steps and canonical evidence
locations; documented that `.spike-workspaces/` is local and git-ignored and that
reviewed evidence must be copied to `evidence/unblock/<platform>/<run-id>/` with a
manifest and `SHA256SUMS`.

### AUD-009 — Experimental workspace on mounted Windows filesystem (Open, partially mitigated)

**Observation.** The WSL2 workspace lives under `/mnt/c/tst-lab/GTR-AI`, a mounted
Windows (drvfs) filesystem. This causes slow Git and npm operations (simple
`git status` exceeded 60 s during this audit), mixed file permissions
(`rwxrwxrwx`), and a risk of sharing native `node_modules` between Windows and
Linux, which `AGENTS.md` forbids.

**Mitigation.** The workspace is now git-ignored and its evidence is copied out.

**Action.** Run WSL2 experiments from the Linux filesystem (e.g. `~/…`) and keep
Windows and Linux installations in separate workspaces.

### AUD-010 — Historical checksum provenance (Open, documented)

**Observation.** At the baseline, before any edit on this branch,
`sha256sum -c archive/SHA256SUMS` fails for 7 documents
(`docs/ARCHIVE_REPORT.md`, `docs/IMPLEMENTATION_READINESS.md`,
`docs/SPIKE_SUMMARY.md`, `docs/spikes/SPK-001.md`, `SPK-002.md`, `SPK-004.md`,
`SPK-007.md`) and `sha256sum -c BOOTSTRAP_SHA256SUMS` fails for the same 7 plus
`spikes/unblock/langgraph.mjs` and `spikes/unblock/sqlite-vector.test.mjs`. Both
archive ZIPs still match. Raw output:
[`docs/audits/evidence/historical-checksum-check.txt`](evidence/historical-checksum-check.txt).

**Decision.** The historical manifests, checksums and ZIPs are preserved
unchanged. They were **not** regenerated, because regeneration would conceal the
later modifications. This remediation modifies further documents covered by those
manifests; the mismatches are expected and are explained here. New evidence uses
its own manifest and `SHA256SUMS`
(`evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/`).

**Action.** Adopt a policy that a checksum manifest covers only immutable evidence,
not living documents, and that each manifest records the commit it was generated
from.

## Evidence preservation strategy

1. Copy reviewed evidence byte-for-byte to
   `evidence/unblock/<platform>/<run-id>/`; compare each file against the baseline
   blob.
2. Review logs for secrets before inclusion; never redact silently.
3. Exclude generated databases, credentials and `node_modules`; reference them by
   baseline commit, path and blob id in the evidence manifest.
4. Write `MANIFEST.md` (provenance, categories, original exit codes, limitations)
   and `SHA256SUMS` for the retained set.
5. Leave historical archives and their manifests untouched.

## Verification limitations

- No dedicated secret scanner (gitleaks, trufflehog, detect-secrets) was
  available; a regular-expression scan and manual review were used.
- No experiment was re-executed; this audit relies on committed evidence only.
- Successful corrected SQLite-vector and LangGraph executions could not be
  verified (AUD-003).
- Windows and macOS were not examined (AUD-005).
