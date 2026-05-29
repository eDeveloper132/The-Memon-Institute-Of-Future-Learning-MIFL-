# Implementation Plan: Comprehensive Centralized Chat System

**Branch**: `039-comprehensive-chat` | **Date**: 2026-05-28 | **Spec**: [specs/039-comprehensive-chat/spec.md]
**Input**: Feature specification from `/specs/039-comprehensive-chat/spec.md`

## Summary
Build a comprehensive centralized chat messaging system that supports role-scoped Direct Messages (DMs) and class/batch-scoped Group Chats.

## Technical Context

**Language/Version**: TypeScript / Node.js
**Primary Dependencies**: `socket.io`, `mongoose`, `express`
**Storage**: MongoDB (Mongoose models for `Message` and new `ChatGroup`)
**Testing**: Jest
**Target Platform**: Vercel / Node.js
**Project Type**: Web application
**Performance Goals**: Fast message delivery and efficient querying for contact resolution
**Constraints**: Complex permission logic requiring aggregation or multiple lookups
**Scale/Scope**: System-wide messaging for all users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] TDD Mandatory: Contract tests for scoping endpoints.
- [x] Simplicity: Start with unified UI logic before branching out.
- [x] Performance: Add indexes to `ChatGroup` and `Message`.

## Project Structure

### Documentation (this feature)

```text
specs/039-comprehensive-chat/
├── plan.md              
├── research.md          
├── data-model.md        
├── quickstart.md        
├── contracts/chat-api.md
└── tasks.md             
```

### Source Code (repository root)

```text
schemas/
├── models/
│   ├── chatGroup.model.ts    # New group model
│   └── message.model.ts      # Update to add group reference

routes/
└── chat.routes.ts            # New unified routes

controllers/
└── chat.controller.ts        # Scoping logic, history, group CRUD

public/
└── protected/
    └── messages.html         # Unified chat view accessible by all
```

**Structure Decision**: A unified backend module (`chat.controller.ts` & `chat.routes.ts`) handles all logic to centralize security and scoping, serving a unified frontend view (`messages.html`).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multiple Lookups | Scope resolution (e.g. parent to teacher) requires joining User -> Class -> User | Denormalizing class details on User leads to data inconsistency |
