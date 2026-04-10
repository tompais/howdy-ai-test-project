# GitHub Copilot — Repository Instructions

This file configures GitHub Copilot's behavior in the **howdy-ai-test-project** repository.
It is the Copilot-equivalent of `CLAUDE.md` and follows the same engineering standards.

> **Source of truth**: `CLAUDE.md` at the repo root is authoritative for all shared conventions.
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

---

## Architecture

Strict layered architecture: **Controller → Service → Domain → Repository**

```
src/
  controllers/   # routing, input validation, HTTP response shaping — NO business logic
  services/      # use-case orchestration, calls repositories
  domain/        # core entities and business rules — NO framework dependencies
  repositories/  # all data access (DB queries, external API calls)
```

### Rules

- **Thin controllers**: validation + routing + response mapping only.
- **Services** own use-case flows and call repositories.
- **Domain** must be framework-free — pure business logic.
- **Repositories** are the only layer touching databases or external APIs.
- **Constructor-based dependency injection** — never instantiate dependencies with `new` inside a class body.
- No reverse imports: a lower layer must never import from a layer above it.

### Supporting artifacts

- `/docs` — structured Markdown documentation; always keep updated.
- `/diagrams` — Mermaid (`.mmd`) architecture diagrams.
- OpenAPI/Swagger spec for every API endpoint.

---

## Core Engineering Principles

SOLID · DRY · KISS · YAGNI · Clean Code · Clean Architecture

- **Simplicity over cleverness** — readable, declarative code beats concise tricks.
- **Small, focused functions** with a single responsibility.
- **Avoid large conditionals** — prefer design patterns (Strategy, Guard Clauses, etc.).
- **Constants** over magic strings; **enums** for finite value sets.
- Every public module must have a clear contract (interface or documented API).

---

## Code Generation Guidelines

When generating or completing code:

1. **Follow the layer** — place code in the correct layer based on its responsibility.
2. **Match existing style** — indentation, naming conventions, file structure.
3. **Inject, don't instantiate** — all dependencies via constructor parameters.
4. **No business logic in controllers** — if you're tempted, it belongs in a service.
5. **Prefer composition over inheritance**.
6. **Avoid `any` types** (TypeScript) — use explicit types or generics.
7. **No hardcoded secrets or credentials** — use environment variables.

---

## Validation & Error Handling

- Input validation happens at the **controller level**.
- Return correct HTTP status codes: `400` bad input, `404` not found, `409` conflict, `500` internal error.
- Use **named custom exceptions** (e.g., `UserNotFoundException`, `OrderAlreadyExistsError`) — self-contained, minimal constructor parameters.
- Implement a **global error handler** — no stack traces or sensitive information in responses.
- Never swallow errors silently — log or re-throw.

---

## Git Workflow

### Branch naming

| Prefix | Use for |
|--------|---------|
| `feature/*` | New features |
| `fix/*` | Bug fixes |
| `refactor/*` | Code restructuring without behavior change |
| `chore/*` | Tooling, dependencies, CI/CD |
| `hotfix/*` | Urgent production fixes |
| `wording/*` | Documentation / copy changes |

- Never commit directly to `main`.
- Branch from the relevant base branch (usually `main`, or a feature branch if dependent).

### Commits

- Atomic and descriptive — one logical change per commit.
- Use imperative mood: `Add user validation`, not `Added user validation`.

### Pull Requests

- **Title prefix required**: `[FTR]`, `[FIX]`, `[RFT]`, `[CHR]`, `[WRD]`
- **Description must include**: what was done + why + key decisions made.
- Chain PRs when work is dependent.
- Suggest GitHub labels where applicable.

---

## CI/CD Responsibilities

Copilot is the primary agent for CI/CD pipeline work:

- Maintain `.github/workflows/ci.yml` (Lint → Test → Coverage upload).
- Add new workflow jobs following the existing pattern (checkout → setup-node → npm ci → step).
- Keep `actions/checkout`, `actions/setup-node`, `actions/upload-artifact` pinned to latest stable major versions.
- Never store secrets in workflow files — use `${{ secrets.NAME }}`.
- Add workflow triggers deliberately — avoid overly broad `push: branches: ['**']` when a narrower trigger is sufficient.

---

## Documentation Responsibilities

- Update `README.md` when adding features, commands, or changing project structure.
- Keep `/docs` Markdown files in sync with code changes.
- Keep `/diagrams` Mermaid diagrams updated when architecture changes.
- Generate or update OpenAPI/Swagger specs when adding/modifying API endpoints.

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
