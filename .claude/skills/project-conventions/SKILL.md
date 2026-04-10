---
name: project-conventions
description: This skill should be used when needing to recall or apply this project's engineering standards — such as "what layer does this belong in?", "what's the PR format?", "what branch naming should I use?", "how should DI work here?", "what are the error handling rules?", or when reviewing code for compliance with SOLID, Clean Architecture, or team conventions. Load before any architecture decision, code review, or PR preparation.
user-invocable: false
---

> **Source of truth**: `CLAUDE.md` at the repo root is the canonical reference for all conventions below.
> This skill is a Claude-optimized distillation for fast in-context access.
> If this skill and `CLAUDE.md` ever diverge, `CLAUDE.md` takes precedence.

## Architecture

Layered architecture: **Controller → Service → Domain → Repository**

- Controllers: routing, validation, HTTP response only — no business logic
- Services: orchestrate use cases, call repositories
- Domain: core entities and business rules — no framework dependencies
- Repository: all data access (DB queries, external APIs)
- Constructor-based dependency injection only — no `new Dependency()` inside classes
- No reverse imports (repository must not import service, etc.)

Maintain `/docs` (Markdown) and `/diagrams` (Mermaid `.mmd`).
Implement OpenAPI/Swagger for all APIs.

## Engineering Principles

SOLID · DRY · KISS · YAGNI · Clean Code · Clean Architecture

- Favor simplicity over cleverness
- Small, focused, single-responsibility functions
- Avoid large conditionals — apply design patterns
- Constants over string literals; enums for finite values

## Validation & Error Handling

- Validate at controller level; return correct HTTP status codes
- Custom exceptions: explicit names (`UserNotFoundException`), self-contained messages, minimal parameters
- Global error handler: clear responses, no stack traces exposed

## Git Workflow

Branches: `feature/*` · `fix/*` · `refactor/*` · `chore/*` · `hotfix/*` · `wording/*`

Never commit to `main`. Atomic, descriptive commits.

PR title prefixes: `[FTR]` · `[FIX]` · `[RFT]` · `[CHR]` · `[WRD]`

PR description must include: what was done + why + key decisions.

## Development Workflow

Always plan before implementing:
1. `superpowers:brainstorming` — explore the idea
2. `superpowers:writing-plans` — structured design
3. `superpowers:executing-plans` — implementation
4. `superpowers:finishing-a-development-branch` — wrap up

Do NOT jump to code without defining approach first.

## AI Collaboration

- Claude is primary: architecture, planning, quality, documentation
- GitHub Copilot is secondary: boilerplate, CI/CD, `.gitignore`
- Challenge over-engineering proactively
- Periodically suggest new skills or refine existing ones
