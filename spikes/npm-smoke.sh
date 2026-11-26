#!/usr/bin/env bash
set -euo pipefail
base=$(cd "$(dirname "$0")" && pwd)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
(cd "$base/npm-smoke" && npm pack --offline --pack-destination "$tmp")
npm install -g --offline --ignore-scripts --no-audit --no-fund --prefix "$tmp/prefix" "$tmp/gtr-ai-spike-local-smoke-0.0.1.tgz"
"$tmp/prefix/bin/gtr-spike-smoke"
npm uninstall -g --offline --prefix "$tmp/prefix" gtr-ai-spike-local-smoke
