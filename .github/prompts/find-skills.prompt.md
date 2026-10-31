---
description: Find and install agent skills from the skills.sh ecosystem
argument-hint: What do you need a skill for? (e.g. react testing)
agent: agent
---
Help the user discover agent skills for: ${input:query}

1. Check https://skills.sh/ for a well-known skill matching the need.
2. If none fits, run `npx.cmd skills find ${input:query}`.
3. Verify quality before recommending: prefer 1K+ installs, reputable sources (`vercel-labs`, `anthropics`, `microsoft`), and repositories with 100+ GitHub stars.
4. Present the skill name, what it does, install count, source, the install command (`npx.cmd skills add <owner/repo@skill>`), and a skills.sh link.
5. Only install (`-g -y`) if the user confirms.
6. If nothing is found, say so and offer to help directly, or suggest `npx.cmd skills init <name>`.
