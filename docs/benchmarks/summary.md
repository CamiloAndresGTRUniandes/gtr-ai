# Local benchmark results

Environment: Linux x64, Xeon Platinum 8573C, 5 logical CPUs, 6,236,844,032 bytes visible RAM, Node 22.16.0, SQLite 3.49.1. Shared environment; no dedicated CPU isolation. Raw metrics in `raw-results/`.

| Experiment | Samples | Median ms | p95 ms |
|---|---:|---:|---:|
| Deterministic routing, 4 mock accounts | 10000 | 0.000770 | 0.001536 |
| Deterministic routing, 100 mock accounts | 10000 | 0.004015 | 0.006012 |
| FTS5 selective, 10,004 rows | 1000 | 0.028431 | 0.046300 |
| FTS5 broad, 10,004 rows | 200 | 6.384519 | 7.383983 |
| Unix socket round trip, same process | 200 | 0.232365 | 0.713594 |
| Empty Node subprocess startup | 30 | 24.746537 | 45.893434 |

Nearest-rank p95; first four experiments warm up 100 calls. Startup uses only 30 samples and is indicative. All timings include harness overhead. FTS5 runs in memory with scope and status filtering; no semantic retrieval. Router uses synthetic account metadata, not real provider access. IPC latency excludes cross-process benchmark (connectivity separately confirmed). Minimal cross-process IPC server RSS at startup: 25,149,440 bytes (not idle GTR-AI). Test process RSS at completion: 44,068,864 bytes (not peak). Parallel worktree write sample: 56.762 ms, single observation, not a concurrency speedup benchmark.

Exact deduplication of 100 synthetic strings with 20 unique strings: serialized JSON 21,751 to 4,351 bytes (~80% reduction). This is a byte metric on deliberately duplicated input, not a model token or task-success benchmark. No token saving, quality, provider caching, TUI startup or full RAG performance claim is justified.

No external model calls. No paid usage. No live provider metrics.

## Iteration 2

Toy RRF fusion (four records, 1000 samples): median 0.024879 ms, p95 0.058287 ms. See `raw-results/followup.json` and `../APPLY_ITERATION_2.md` for scope; no actual embedding or vector search measured.
