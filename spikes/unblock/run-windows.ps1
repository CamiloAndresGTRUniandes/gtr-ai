$ErrorActionPreference = 'Stop'
& node (Join-Path $PSScriptRoot 'run.mjs')
exit $LASTEXITCODE
