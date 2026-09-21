---
name: code-review-and-quality
description: Conducts multi-axis code review. Use before merging any change, or when reviewing code written by yourself, another agent, or a human.
---

# Code Review and Quality

## Overview

Multi-dimensional code review with quality gates. Every change gets reviewed before merge. Review covers five axes: correctness, readability, architecture, security, and performance.

**Approval standard:** approve a change when it definitely improves overall code health, even if imperfect. Don't block a change because it isn't exactly how you'd have written it.

## When to Use

- Before merging any PR or change
- After completing a feature implementation
- When another agent or model produced code you need to evaluate
- After any bug fix (review both the fix and the regression test)

## The Five-Axis Review

### 1. Correctness
- Matches spec/task requirements
- Edge cases handled (null, empty, boundary values)
- Error paths handled, not just the happy path
- Tests actually test the right things

### 2. Readability & Simplicity
- Names descriptive and consistent with project conventions
- Control flow straightforward (avoid nested ternaries, deep callbacks)
- Could this be done in fewer lines?
- Abstractions earn their complexity (don't generalize until the third use case)

### 3. Architecture
- Follows existing patterns or justifies a new one
- No unjustified duplication
- Dependencies flow in the right direction, no cycles
- A "refactor" should reduce complexity, not just relocate it

### 4. Security
- User input validated and sanitized
- Secrets kept out of code, logs, and version control
- Auth checked where needed
- Queries parameterized, outputs encoded to prevent XSS
- External data treated as untrusted at the boundary

### 5. Performance
- No N+1 query patterns
- No unbounded loops or unconstrained fetching
- No unnecessary sync operations that should be async
- Pagination present on list endpoints

## Change Sizing

```
~100 lines changed   → Good, reviewable in one sitting
~300 lines changed   → Acceptable if a single logical change
~1000 lines changed  → Too large, split it
```

Separate refactoring from feature work — submit as different changes.

## Review Process

1. **Understand context** — what is this trying to accomplish, what spec/task does it implement
2. **Review tests first** — do they exist, do they cover edge cases, would they catch a regression
3. **Review implementation** — walk through with the five axes in mind
4. **Categorize findings** by severity:

| Prefix | Meaning | Author Action |
|---|---|---|
| *(no prefix)* | Required change | Must address before merge |
| **Critical:** | Blocks merge | Security vulnerability, data loss, broken functionality |
| **Nit:** | Minor, optional | Author may ignore |
| **Optional:** / **Consider:** | Suggestion | Worth considering, not required |
| **FYI** | Informational | No action needed |

5. **Verify the verification** — what tests were run, did the build pass, manual testing done

## Honesty in Review

- Don't rubber-stamp — "LGTM" without evidence helps no one
- Don't soften real issues
- Quantify problems when possible ("this N+1 query adds ~50ms per item")
- Push back on approaches with clear problems and propose alternatives

## Dead Code Hygiene

After refactoring, list orphaned code explicitly and ask before deleting:

```
DEAD CODE IDENTIFIED:
- oldFunction() in src/... — replaced by newFunction()
→ Safe to remove these?
```

## Review Checklist

```markdown
## Review: [PR/Change title]

### Correctness
- [ ] Matches spec/task requirements
- [ ] Edge cases handled
- [ ] Tests cover the change adequately

### Readability
- [ ] Names are clear and consistent
- [ ] No unnecessary complexity

### Architecture
- [ ] Follows existing patterns
- [ ] No unnecessary coupling

### Security
- [ ] No secrets in code
- [ ] Input validated at boundaries
- [ ] No injection vulnerabilities

### Performance
- [ ] No N+1 patterns
- [ ] Pagination on list endpoints

### Verification
- [ ] Tests pass
- [ ] Build succeeds

### Verdict
- [ ] Approve
- [ ] Request changes
```

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "It works, that's good enough" | Unreadable/insecure/wrong architecture creates debt that compounds. |
| "We'll clean it up later" | Later never comes — require cleanup before merge. |
| "AI-generated code is probably fine" | AI code needs more scrutiny, not less. |
| "The tests pass, so it's good" | Tests don't catch architecture, security, or readability issues. |

## Red Flags

- PRs merged without any review
- "LGTM" without evidence of actual review
- Security-sensitive changes without security-focused review
- No regression tests with bug fix PRs
- Review comments without severity labels

## Verification

- [ ] All Critical issues resolved
- [ ] All Required changes resolved or explicitly deferred with justification
- [ ] Tests pass, build succeeds
- [ ] Verification story documented
