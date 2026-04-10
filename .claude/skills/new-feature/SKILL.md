---
name: new-feature
description: This skill should be used when the user asks to "start a new feature", "build a new feature", "add a feature", "implement X", or begins describing new functionality to develop. Orchestrates the full feature development workflow — brainstorming, planning, branching, implementation with architecture review, and PR preparation.
disable-model-invocation: true
---

# New Feature Workflow

Execute these steps in order.

## 1. Brainstorm
Invoke `superpowers:brainstorming` to explore the feature idea, edge cases, and technical options.

## 2. Plan
Invoke `superpowers:writing-plans` to produce a structured design covering:
- Layers involved (Controller / Service / Domain / Repository)
- New files and their responsibilities
- Dependencies and injection points
- Error cases and HTTP status codes
- Any new custom exceptions needed

## 3. Confirm branch name
Propose a branch name following the convention `feature/<short-descriptive-name>` and wait for user confirmation before proceeding.

## 4. Implement
Invoke `superpowers:executing-plans` to implement the plan step by step.

After completing each layer, invoke the `architecture-reviewer` agent to verify compliance before moving to the next layer.

## 5. Finish
Invoke `superpowers:finishing-a-development-branch` to:
- Confirm tests pass
- Verify `/docs` and `/diagrams` are updated if applicable
- Prepare PR with prefix `[FTR]` and description covering: what was done + why + key decisions
