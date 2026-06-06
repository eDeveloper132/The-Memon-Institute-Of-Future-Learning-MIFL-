---
id: 125
title: Update constitution with verification gate
stage: constitution
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: none
branch: main
user: Muhammad Ilyas
command: /sp.constitution make a comprehensive rule that after implementation of tasks each time firstly run tsc command to check errors if no error found than commit changes and push to github main branch.
labels: ["constitution", "tsc", "quality-gate", "governance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - .specify/templates/plan-template.md
  - .specify/templates/tasks-template.md
  - .gemini/commands/sp.implement.toml
  - .gemini/commands/sp.git.commit_pr.toml
  - README.md
tests:
  - N/A (Constitution update)
---

## Prompt

/sp.constitution make a comprehensive rule that after implementation of tasks each time firstly run tsc command to check errors if no error found than commit changes and push to github main branch.

## Response snapshot

I have updated the MIFL Constitution and synchronized all dependent templates to enforce a mandatory `tsc` verification gate.

1.  **Constitution**: Added Principle III: Mandatory Verification Gate, which requires running `npx tsc` after every task. Commits/pushes are forbidden if errors exist.
2.  **Plan Template**: Updated the "Constitution Check" to include the verification gate.
3.  **Tasks Template**: Added a mandatory `tsc` check task to the Polish phase and updated the "Notes" section with strict enforcement language.
4.  **Command Sync**: Updated `/sp.implement` and `/sp.git.commit_pr` to include the `tsc` check as a hard validation requirement.
5.  **Documentation**: Updated `README.md` to list `npx tsc` as a mandatory development script.

The project now has a formalized, enforced type-safety gate.

## Outcome

- ✅ Impact: Formalized quality assurance process for TypeScript development.
- 🧪 Tests: Ensured all relevant templates and commands are in sync with the new principle.
- 📁 Files: Modified 6 files across memory, templates, commands, and docs.
- 🔁 Next prompts: None.
- 🧠 Reflection: Hard-coding verification steps into command prompts (SOPs) is the most effective way to ensure compliance with constitutional principles.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
