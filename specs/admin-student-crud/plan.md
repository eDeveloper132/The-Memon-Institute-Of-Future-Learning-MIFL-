# Implementation Plan: Admin Student CRUD Fixes

**Branch**: `admin-student-crud` | **Date**: 2026-05-26 | **Spec**: [specs/admin-student-crud/spec.md](spec.md)
**Input**: Feature specification from `/specs/admin-student-crud/spec.md`

## Summary
Fix password hashing issues in the admin user update logic and enhance student listing with necessary data population (`currentClass`, `parent`).

## Technical Context
**Language/Version**: Node.js (TypeScript)
**Primary Dependencies**: Express, Mongoose, bcryptjs
**Storage**: MongoDB
**Testing**: Integration tests for password hashing and population.

## Constitution Check

- [x] **Test-First**: I will add tests to verify password hashing after an admin update.
- [x] **Simplicity**: Modifying existing `updateUser` and `getAllUsers` instead of creating redundant endpoints.
- [x] **Library-First**: Model-level hashing ensures all features benefit.

## Project Structure

### Source Code
```text
controllers/
└── admin.controller.ts  # Refactor updateUser and getAllUsers
schemas/models/
└── user.model.ts        # Ensure pre-save hook is reliable
```

## Complexity Tracking
- **Risk**: Changing `findByIdAndUpdate` to `.save()` might impact other logic if not handled carefully (e.g. partial updates). 
- **Mitigation**: Use `Object.assign` to merge changes and verify all fields are preserved.
