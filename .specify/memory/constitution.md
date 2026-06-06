<!--
Sync Impact Report
- Version change: 1.0.0 → 1.1.0
- List of modified principles:
    - [PRINCIPLE_1_NAME] → I. Spec-Driven Development (SDD)
    - [PRINCIPLE_2_NAME] → II. Strict Type Safety
    - [PRINCIPLE_3_NAME] → III. Mandatory Verification Gate
    - [PRINCIPLE_4_NAME] → IV. Library-First Architecture
    - [PRINCIPLE_5_NAME] → V. Simplicity & YAGNI
    - [PRINCIPLE_6_NAME] → VI. Real-time & Proactive Communication
- Added sections: Quality Standards, Development Workflow
- Templates requiring updates:
    - ✅ updated: .specify/templates/plan-template.md
    - ✅ updated: .specify/templates/tasks-template.md
    - ✅ updated: .gemini/commands/sp.implement.toml
    - ✅ updated: .gemini/commands/sp.git.commit_pr.toml
    - ✅ updated: README.md
- Follow-up TODOs: None
-->

# MIFL Constitution

## Core Principles

### I. Spec-Driven Development (SDD)
All features MUST start with a specification in `/specs/`. Implementation MUST follow the Plan -> Tasks -> Implement flow to ensure alignment with user intent and architectural integrity.

### II. Strict Type Safety
All code MUST be written in TypeScript with strict mode enabled. The use of `any` is strictly prohibited unless explicitly justified in code comments and documented in the implementation plan. Interfaces and types MUST be used for all data structures.

### III. Mandatory Verification Gate
After the implementation of any task or set of tasks, the `npx tsc` command MUST be executed to check for type errors. Changes MUST NOT be committed or pushed to the GitHub `main` branch if any errors are found.

### IV. Library-First Architecture
Business logic MUST be encapsulated in standalone services or shared libraries rather than within controllers. Controllers SHOULD only handle request parsing and response orchestration.

### V. Simplicity & YAGNI
Favor the simplest viable solution that satisfies the current specification. Do not implement features or architectural complexity for hypothetical future needs.

### VI. Real-time & Proactive Communication
The system SHOULD leverage Socket.IO for real-time updates and the Email Notification System for persistent user engagement. Proactive communication is a first-class citizen of the user experience.

## Quality Standards
All API responses MUST follow a standard JSON structure. Frontend components MUST be reusable, modular, and free of inline JavaScript to comply with strict Content Security Policies (CSP).

## Development Workflow
The standard development cycle is: Research -> Strategy -> Execution (Plan-Act-Validate). Every task completion MUST be recorded in a Prompt History Record (PHR) to maintain a transparent and audit-able history.

## Governance
This constitution supersedes all other development practices at MIFL. Amendments to this document require a MINOR version bump and must be propagated to all dependent templates. Violations of Principle III (Mandatory Verification Gate) require immediate remediation.

**Version**: 1.1.0 | **Ratified**: 2026-06-06 | **Last Amended**: 2026-06-06
