# Implementation Plan: Vercel-Compatible Chat System

**Branch**: `049-vercel-compatible-chat` | **Date**: 2026-05-28 | **Spec**: [specs/049-vercel-compatible-chat/spec.md]
**Input**: Feature specification from `/specs/049-vercel-compatible-chat/spec.md`

## Summary
Migrate the existing Socket.IO real-time implementation to a Vercel-compatible serverless architecture using Adaptive HTTP Short Polling. This ensures messages and notifications sync in near real-time without requiring persistent WebSockets, effectively resolving the 404 deployment errors on Vercel.

## Technical Context

**Language/Version**: TypeScript / Node.js
**Primary Dependencies**: `express`, `mongoose` (Removing `socket.io`)
**Storage**: MongoDB
**Testing**: Jest
**Target Platform**: Vercel (Serverless Functions)
**Project Type**: Web application
**Performance Goals**: Low latency sync endpoint (< 100ms processing time)
**Constraints**: Vercel Serverless environment (max execution timeouts, no WebSockets)
**Scale/Scope**: System-wide messaging and notifications

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] TDD Mandatory: Contract tests for the new `/sync` endpoint.
- [x] Simplicity: Short polling is the simplest approach requiring 0 external third-party services.
- [x] Performance: Must limit delta sync payload and index timestamp columns.

## Project Structure

### Documentation (this feature)

```text
specs/049-vercel-compatible-chat/
├── plan.md              
├── research.md          
├── data-model.md        
├── quickstart.md        
├── contracts/
│   └── chat-sync-api.md
└── tasks.md             
```

### Source Code (repository root)

```text
controllers/
└── chat.controller.ts    # Add syncData endpoint

routes/
└── chat.routes.ts        # Add GET /sync

public/
├── components/
│   └── ui-components.ts  # Replace initSocket with startSyncEngine
└── protected/
    ├── messages.html     # Switch to polling dispatch events
    └── index.html        # Call startSyncEngine instead of initSocket

socket.ts                 # To be DELETED
```

**Structure Decision**: Retaining the existing Web Application structure but swapping out the real-time transport layer.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Polling | WebSockets blocked on Vercel | SSE rejected due to serverless timeouts; Pusher rejected to keep MVP self-contained |
