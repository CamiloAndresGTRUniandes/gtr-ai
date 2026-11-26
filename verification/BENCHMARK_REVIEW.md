# Benchmark reproduction

Units: milliseconds unless specified. Original and rerun use the same prototype scripts; not independent hardware or implementation.

| Metric | n per run | Apply p95 | Verify p95 |
|---|---:|---:|---:|
| ipcRoundTrip | 200 | 0.713594 | 0.690179 |
| fts5Selective10k | 1000 | 0.046300 | 0.049091 |
| fts5Broad10k | 200 | 7.383983 | 7.563086 |
| routingFourAccounts | 10000 | 0.001536 | 0.001394 |
| routing100Accounts | 10000 | 0.006012 | 0.009775 |
| emptyNodeStartup | 30 | 45.893434 | 27.951918 |
| toyHybridFusion | 1000 | 0.058287 | 0.075078 |

Exact dedup reproduced 21,751 to 4,351 serialized bytes (79.996% reduction, artificial 80% duplicate corpus). No actual LLM tokens measured. Minimal IPC RSS reproduced 25,149,440 bytes (24 MiB), not full daemon. Routing 100 accounts remains below 10 ms hypothesis only for synthetic local filtering. FTS5 timings do not validate RAG target. No meaningful parallel speedup inference from single worktree measurement. No raw timing samples exist in original scripts, only summaries; p95 cannot be independently recalculated from those summaries. Startup script uses lower middle value rather than averaged median. No confidence intervals or regression threshold claimed.
