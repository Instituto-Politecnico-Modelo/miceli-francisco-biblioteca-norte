---
name: spec-driven-development
description: Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. Use when drafting a PRD or requirements document with objectives and scope, or when requirements are unclear, ambiguous, or only exist as a vague idea.
---

# Spec-Driven Development

## Overview

Write a structured specification before writing any code. The spec is the shared source of truth between you and the human engineer — it defines what we're building, why, and how we'll know it's done. Code without a spec is guessing.

## When to Use

- Starting a new project or feature
- Requirements are ambiguous or incomplete
- The change touches multiple files or modules
- You're about to make an architectural decision
- The task would take more than 30 minutes to implement

**When NOT to use:** Single-line fixes, typo corrections, or changes where requirements are unambiguous and self-contained.

## The Gated Workflow

Four phases. Do not advance until the current one is validated by the human.

```
SPECIFY ──→ PLAN ──→ TASKS ──→ IMPLEMENT
  │          │        │          │
  ▼          ▼        ▼          ▼
Human      Human    Human      Human
reviews    reviews  reviews    reviews
```

### Phase 1: Specify

Ask clarifying questions until requirements are concrete. Surface assumptions immediately before writing spec content:

```
ASSUMPTIONS I'M MAKING:
1. ...
2. ...
→ Correct me now or I'll proceed with these.
```

Write a spec covering six core areas:

1. **Objective** — what we're building, why, who the user is, what success looks like
2. **Commands** — full executable build/test/lint/dev commands
3. **Project Structure** — where source, tests, docs live
4. **Code Style** — one real code snippet beats three paragraphs of description
5. **Testing Strategy** — framework, test locations, coverage expectations
6. **Boundaries** — three-tier system: Always do / Ask first / Never do

Spec template:

```markdown
# Spec: [Project/Feature Name]

## Objective
## Tech Stack
## Commands
## Project Structure
## Code Style
## Testing Strategy
## Boundaries
- Always: [...]
- Ask first: [...]
- Never: [...]

## Success Criteria
## Open Questions
```

### Phase 2: Plan

With the validated spec, generate a technical implementation plan: major components and dependencies, build order, risks/mitigations, what can be parallelized, verification checkpoints. Save to `tasks/plan.md`.

### Phase 3: Tasks

Break the plan into discrete tasks, each completable in one session, with acceptance criteria and a verification step. No task should touch more than ~5 files.

```markdown
- [ ] Task: [Description]
  - Acceptance: [What must be true when done]
  - Verify: [Test command, build, manual check]
  - Files: [Which files will be touched]
```

### Phase 4: Implement

Execute tasks one at a time, smallest verifiable slice first. Run tests/build after each task.

## Keeping the Spec Alive

- Update the spec when decisions or scope change, before implementing
- Commit the spec alongside the code
- Reference the spec section implemented in each change

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This is simple, I don't need a spec" | Simple tasks still need acceptance criteria — a two-line spec is fine. |
| "I'll write the spec after I code it" | That's documentation, not specification. |
| "Requirements will change anyway" | The spec is a living document; update it as things change. |

## Red Flags

- Writing code without any written requirements
- Implementing features not mentioned in any spec or task list
- Making architectural decisions without documenting them

## Verification

Before implementing:
- [ ] Spec covers all six core areas
- [ ] Human has reviewed and approved the spec
- [ ] Success criteria are specific and testable
- [ ] Boundaries (Always/Ask first/Never) are defined
- [ ] Spec is saved to a file in the repository
