# Reproduce Verify
Run in a disposable copy on Linux with Node 22.16+, Git, npm and Bash. Original scripts overwrite their benchmark JSON, so preserve evidence first.

```bash
node --test spikes/experiments.mjs
node --test spikes/followup.mjs
node spikes/additional.mjs
bash spikes/npm-smoke.sh
node --test verification/review.mjs
```

The review script intentionally asserts observed limitations; passing such a test means a finding was reproduced, not fixed. No external provider needed. The npm registry diagnostic is optional and not part of the offline test suite.
