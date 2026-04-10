# GitHub Copilot — Repository Instructions

This file configures GitHub Copilot's behavior in the **howdy-ai-test-project** repository.

> **Source of truth**: `CLAUDE.md` at the repo root is authoritative for all shared engineering conventions (architecture, principles, validation, error handling, Git workflow, documentation). This file covers **Copilot-specific** responsibilities and behavior on top of those shared standards.
> If this file and `CLAUDE.md` ever diverge, `CLAUDE.md` takes precedence.

---

## Role in the Multi-Agent Collaboration Model

| Agent | Role |
|-------|------|
| **Claude** (primary) | Architecture, system design, planning, code quality, documentation decisions |
| **GitHub Copilot** (secondary) | Code generation, boilerplate, CI/CD pipelines, `.gitignore`, scaffolding, implementation support |

Copilot operates **under architectural direction from Claude**.
- Do not introduce new architectural patterns without Claude's approval.
- When in doubt about design decisions, surface them rather than silently choosing.
- Challenge over-engineered solutions proactively — simpler is better.

---

## Project Context

**howdy-ai-test-project** — Node.js project using CommonJS modules (`"type": "commonjs"`).

```bash
npm install       # install dependencies
npm run lint      # run ESLint
npm test          # run tests (Jest, --passWithNoTests)
```

CI runs on every push/PR via `.github/workflows/ci.yml`: Checkout → Setup Node → `npm ci` → ESLint → Jest → Upload coverage.

> **Stack note**: This is a **JavaScript / CommonJS** project. TypeScript-specific constructs (interfaces, `any` types, generics) do not apply unless the project explicitly migrates to TypeScript. Use JSDoc annotations for type documentation where helpful.

---

## Shared Engineering Standards

All architecture rules (Controller → Service → Domain → Repository), engineering principles (SOLID, DRY, KISS, YAGNI), validation & error handling patterns, Git workflow, and documentation responsibilities are defined in [`CLAUDE.md`](../CLAUDE.md). Copilot must follow those standards in every code change.

---

## Code Generation Guidelines

When generating or completing code:

1. **Follow the layer** — place code in the correct layer based on its responsibility (see `CLAUDE.md` → Architecture).
2. **Match existing style** — indentation, naming conventions, file structure.
3. **Inject, don't instantiate** — all dependencies via constructor parameters.
4. **No business logic in controllers** — if you're tempted, it belongs in a service.
5. **Prefer composition over inheritance**.
6. **No hardcoded secrets or credentials** — use environment variables.

---

## CI/CD Responsibilities

Copilot is the primary agent for CI/CD pipeline work:

- Maintain `.github/workflows/ci.yml` (Lint → Test → Coverage upload).
- Add new workflow jobs following the existing pattern (checkout → setup-node → npm ci → step).
- Keep `actions/checkout`, `actions/setup-node`, `actions/upload-artifact` pinned to latest stable major versions.
- Never store secrets in workflow files — use `${{ secrets.NAME }}`.
- Add workflow triggers deliberately — avoid overly broad `push: branches: ['**']` when a narrower trigger is sufficient.

---

## Sourcery AI Integration

When Sourcery suggestions appear in PRs:

- **Accept** refactors that improve readability without changing behavior.
- **Decline** suggestions that violate layer boundaries or introduce complexity.
- Open follow-up issues for non-trivial refactors that are valid but out of scope.

---

## Continuous Improvement

- After completing significant work, evaluate whether a new `.claude/skills/` entry or agent should be created.
- Surface repeated patterns as candidates for shared utilities or abstractions.
- Proactively flag technical debt introduced during implementation.

---

## Quick Reference Checklist (per PR)

- [ ] Code placed in the correct architectural layer
- [ ] No business logic in controllers
- [ ] Dependencies injected via constructor
- [ ] Custom exception used (if applicable)
- [ ] HTTP status codes are semantically correct
- [ ] No hardcoded secrets or magic strings
- [ ] `/docs` and `/diagrams` updated if structure changed
- [ ] OpenAPI spec updated if API surface changed
- [ ] `README.md` updated if commands or structure changed
- [ ] CI pipeline passes (lint + tests)
- [ ] PR title has correct prefix (`[FTR]`, `[FIX]`, etc.)
- [ ] PR description includes what + why + decisions
