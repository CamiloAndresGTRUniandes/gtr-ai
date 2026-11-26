# GTR-AI repository instructions

## Current assignment
Continue the approved Archive unblock plan, not production implementation. Read `docs/CONTINUITY.md` first. Inspect the repository and environment before changing anything. Communicate in Spanish; write code, reports, ADRs and test evidence in English.

## Sources of truth
- `docs/ARCHITECTURE_PROVISIONAL.md`, `docs/ADR_REGISTRY.md`: accepted principles and candidates.
- `docs/UNBLOCK_PLAN.md`, `docs/ARCHITECTURE_RISK_REGISTER.md`: execution order and unresolved risks.
- `prompts/00-master-project-prompt.md`, `prompts/01-architecture-spikes.md`: reconstructed working briefs; defer to approved ADRs and explicit human instructions.
- `docs/spikes/`, `verification/`, `archive/`: historical evidence; do not overwrite.

## Rules
- Research → Apply → Verify → Archive, with explicit human approval at every phase boundary. Archive approval from the previous iteration is not approval for a new Apply phase.
- Prioritize SPK-001, 002, 004 and 007. Keep experiments isolated; no speculative production modules.
- Read relevant files only; reuse existing evidence; deterministic tooling before LLM calls. Apply SOLID, DRY, KISS, YAGNI and Ponytail pragmatically.
- Orchestrator delegates code changes in the eventual product; this local Codex development session may implement approved spike prototypes.
- No paid or subscription-consuming model calls from experimental scripts, credential extraction, external writes, pushes, merges, destructive cleanup or global configuration changes without explicit permission. Request network permissions where required; never disable TLS verification.
- Keep Windows and WSL dependencies separate; do not share node_modules or run concurrent installs in the same workspace. Never treat worktrees as a security sandbox.
- Preserve mandatory context, provenance, revision-bound approvals, operation reconciliation and interrupted worktrees. Do not silently promote candidates to accepted decisions.
- Record exact versions, lockfiles, commands, exit codes, raw measurements, failures and environment. Distinguish real integration, simulation and documented capability. No fabricated results.
- Do not commit credentials, private registry logs, databases, model downloads or node_modules. Inspect logs before sharing. Use a disposable copy to reproduce archived scripts that overwrite benchmark results.

## First action
Read `docs/CONTINUITY.md` and `prompts/02-local-codex-start.md`. Report current repository status, tool versions, registry reachability, scope and budget. Request approval before dependency installation or experimental modifications in the new Apply phase.
