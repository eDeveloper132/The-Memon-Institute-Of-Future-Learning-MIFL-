# Global TypeScript Definitions

This directory and the `schemas/types/` directory define the structure and contract for all data within the MIFL ecosystem.

## 🏛 Structure

- **`types/` (Global)**: Contains definitions that span multiple modules or represent external service shapes (e.g. `Express.User` expansion).
- **`schemas/types/` (Domain)**: Strictly tied to Mongoose entities. Every model in `schemas/models/` must have a corresponding interface here (e.g., `user.type.ts`).

## ⚖️ Strict Type Policy

- **No `any`**: In compliance with the **MIFL Constitution (v1.2.0)**, the use of `any` is strictly prohibited.
- **Interfaces over Classes**: Prefer TypeScript `interface` or `type` for defining data contracts to ensure lightweight, performant type checking.
- **Optionality**: Use optional properties (`field?: type`) only when a field is truly non-essential in all contexts.

## 🛠 Compilation Gate

Before any commit, run:
```bash
npx tsc
```
This command must return **zero errors**. The system is configured with `strict: true` and `noImplicitAny: true` to prevent technical debt.
