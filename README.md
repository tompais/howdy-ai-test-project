# howdy-ai-test-project

[![CI](https://github.com/tompais/howdy-ai-test-project/actions/workflows/ci.yml/badge.svg)](https://github.com/tompais/howdy-ai-test-project/actions/workflows/ci.yml)

A Node.js project using CommonJS modules, built following Clean Architecture principles in a collaborative AI-driven development environment.

## Getting Started

```bash
npm install       # install dependencies
npm run lint      # run ESLint
npm test          # run tests
```

## Architecture

Layered architecture: **Controller → Service → Domain → Repository**

- Controllers handle routing, validation, and response mapping — no business logic.
- Business logic lives in services and the domain layer.
- Constructor-based dependency injection is used throughout.

## Documentation

- [`/docs`](./docs) — structured project documentation
- [`/diagrams`](./diagrams) — Mermaid architecture diagrams

## CI/CD

GitHub Actions workflows are located in [`.github/workflows/`](./.github/workflows/):

| Workflow | Trigger | Jobs |
|----------|---------|------|
| `ci.yml` | push / pull_request | Lint → Test |

## Engineering Principles

SOLID · DRY · KISS · YAGNI · Clean Code · Clean Architecture
