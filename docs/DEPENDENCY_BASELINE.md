# Dependency baseline — provisional

The current experimental baseline is the retained WSL2 installation below. It is not a production dependency baseline.

## Historical environment observations

The earlier Linux environment used Node.js `22.16.0`, npm `10.9.2`, native SQLite `3.49.1` (experimental Node API), Git `2.47.3` and Python `3.13.5`. pnpm, Pi, Codex, RTK and Graphify were not found. npm registry DNS resolution failed (`EAI_AGAIN`); no external dependencies were installed or pinned in that environment. See the [historical environment log](../evidence/environment.log) and [SQLite version record](../verification/evidence/local.json).

## Current WSL2 experimental baseline

The [retained run](../evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/MANIFEST.md) ran on WSL2 (`linux` / `x64`) with Node.js `24.22.3` and npm `11.19.1` (see [SPK-001](spikes/SPK-001.md)). Registry access, package metadata resolution, installation and the dependency-tree check passed (exit `0`). The exact direct pins in the [package manifest](../evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/package.json) match the versions in the [lockfile](../evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/package-lock.json) and the [recorded dependency tree](../evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/dependency-tree.log).

| Direct npm dependency | Installed version |
| --- | --- |
| `@earendil-works/pi-coding-agent` | `1.6.1` |
| `@langchain/core` | `1.5.1` |
| `@langchain/langgraph` | `1.7.5` |
| `@langchain/langgraph-checkpoint-sqlite` | `1.1.1` |
| `@types/node` | `26.6.10` |
| `better-sqlite3` | `13.2.0` |
| `sqlite-vec` | `0.1.9` |
| `typescript` | `7.0.2` |
| `zod` | `4.6.7` |

The lockfile and dependency tree also show a second `better-sqlite3` installation: `12.11.1`, nested under `@langchain/langgraph-checkpoint-sqlite` to satisfy `^12.10.0`. The run did not establish a single shared SQLite binding.

## Verified behavior and limits

The bundled `node:sqlite` (SQLite `3.54.1`, not an npm dependency) passed a limited [FTS5 and rollback smoke test](../evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/sqlite-native.log). The [retained results](../evidence/unblock/wsl2/877d9948-73be-4cf5-a07b-018fa0a62e5f/results.json) record Pi, SQLite-vector and both LangGraph start cases failing (exit `1`), with both LangGraph resume cases blocked. Corrected SQLite-vector and LangGraph successes are reported, not independently reproduced from committed raw evidence. Installation alone does not validate an integration.

## Production approval

No version listed here is approved for production. Node.js 24 LTS remains a candidate. Other proposals, including Transformers.js/ONNX, Graphify and extensions, are outside this installation baseline. TypeScript execution and typechecking, pnpm workspaces, native Windows/Linux/macOS installation, and full license, integrity and install-script review remain open.
