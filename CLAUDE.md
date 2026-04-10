# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**howdy-ai-test-project** — a Node.js project using CommonJS modules (`"type": "commonjs"`).

## Commands

```bash
npm install       # install dependencies
npm test          # run tests (currently unspecified — update when a test framework is added)
```

---

## Multi-Agent Collaboration

Claude (primary) is responsible for architecture, system design, planning, code quality, and documentation.

GitHub Copilot (secondary) handles code generation, boilerplate, `.gitignore`, and CI/CD pipeline changes.

Both agents follow the same engineering standards defined here.

---

## Development Workflow

- **Always start in plan mode** — use structured thinking before implementation.
- Validate plans before executing.
- When tasks are independent, suggest batch execution.

Use superpowers modes appropriately:
- `brainstorming` → idea exploration
- `writing-plans` → structured design
- `executing-plans` → implementation

Do NOT jump directly into code unless explicitly asked. Define the approach first.

---

## Architecture

Follow layered architecture: **Controller → Service → Domain → Repository**

- **Thin controllers**: only routing, validation, and response shaping — no business logic.
- Business logic belongs in services/domain layers.
- Use **constructor-based dependency injection**.

Maintain:
- `/docs` — structured Markdown documentation (reference from README.md)
- `/diagrams` — Mermaid (`.mmd`) diagrams

Implement OpenAPI/Swagger documentation when building APIs.

---

## Core Engineering Principles

SOLID · DRY · KISS · YAGNI · Clean Code · Clean Architecture

- Favor simplicity, readability, and maintainability over complexity.
- Write human-readable, declarative code with small focused functions.
- Avoid large conditionals — suggest design patterns where applicable.
- Replace string literals with constants; use enums for finite values.

---

## Validation & Error Handling

- Validate inputs at the controller level; return proper HTTP status codes (e.g., 400 for invalid input).
- Use custom exceptions with explicit naming (e.g., `UserNotFoundException`) that are self-contained and accept only required parameters.
- Implement global error handling: clear responses, no stack traces or sensitive info exposed.

---

## Git Workflow

Branch naming:
- `feature/*`, `fix/*`, `refactor/*`, `chore/*`, `hotfix/*`, `wording/*`

Never commit directly to `main`. Use descriptive branch names. If work depends on another branch, branch from it.

### Commits & PRs

- Atomic, descriptive commits.
- PR title prefixes: `[FTR]`, `[FIX]`, `[RFT]`, `[CHR]`, `[WRD]`
- PR descriptions must include: what + why + decisions made.
- Chain PRs when dependent. Suggest GitHub labels when applicable.

---

## AI Collaboration Rules

- Challenge over-engineered solutions proactively.
- Act as a technical partner, not just a code generator.
- Periodically evaluate whether new skills should be created or existing ones refined using `skill-creator`, `skill-development`, or `claude-automation-recommender`.
