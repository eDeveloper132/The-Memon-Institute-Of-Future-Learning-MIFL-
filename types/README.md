# Type Definitions

This directory contains global TypeScript type definitions, interfaces, and enums used throughout the project that are not tied to a specific database model.

## Contents

- **Global Utility Types:** Common types used across multiple modules (e.g., standard API response formats, custom error types).
- **Express Extensions:** Type augmentations for Express `Request` objects (e.g., adding the `user` property after authentication).
- **Environment Types:** Definitions for `process.env` to ensure type safety for environment variables.

## Comparison with `schemas/types/`

- **`types/` (here):** Global infrastructure, utility types, and environment definitions.
- **`schemas/types/`:** Strictly definitions that mirror the MongoDB/Mongoose database structure.

## Best Practices

- Use PascalCase for Interfaces and Types (e.g., `IUserRequest`).
- Keep these files focused on structure and avoid including implementation logic.
- Export everything clearly to be easily imported in other modules.
