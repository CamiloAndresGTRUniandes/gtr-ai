# GTR-AI Architecture Spikes — Archive

Start with [Archive report](docs/ARCHIVE_REPORT.md), [ADR registry](docs/ADR_REGISTRY.md), [Provisional architecture](docs/ARCHITECTURE_PROVISIONAL.md), [Risk register](docs/ARCHITECTURE_RISK_REGISTER.md) and [Unblock plan](docs/UNBLOCK_PLAN.md).

No production code is included. Before merging an archive into `D:\GTR-AI`, extract it into a separate staging directory and review diffs before overwriting files. If reproducing historical experiments, follow the [reproduction instructions](verification/REPRODUCE.md) in a disposable copy: the scripts overwrite benchmark JSON. No experiments were rerun during Archive.

## Verify retained experimental evidence

From the repository root on Linux or WSL, run:

```bash
(cd evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f && sha256sum -c SHA256SUMS)
```

Each listed file should report `OK`. The [retained WSL2 run manifest](evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/MANIFEST.md) explains the provenance, results and limitations. Checksums verify file integrity, not whether the experiments succeeded or were independently reproduced.

## Historical archive checksums

[`archive/SHA256SUMS`](archive/SHA256SUMS) and [`BOOTSTRAP_SHA256SUMS`](BOOTSTRAP_SHA256SUMS) describe earlier snapshots. They are not expected to match subsequently edited living documents, including this README and the spike reports. Check a historical manifest against its corresponding snapshot, not against the current checkout. The README covered by those manifests is retained in Git at `7ce49011e543970c51d3590689ea774149c49f86`.

The original ZIPs and historical checksum manifests are preserved unchanged. Do not regenerate the historical manifests to match current files. See the [recorded historical checksum checks](docs/audits/evidence/historical-checksum-check.txt) for mismatches that predate this update.
