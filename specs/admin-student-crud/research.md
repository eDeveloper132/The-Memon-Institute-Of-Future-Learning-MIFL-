# Research: Admin Student CRUD Fixes

## Technical Unknowns

### 1. Password Hashing on Update
- **Decision**: Use `User.findById(id)` followed by `Object.assign(user, updates)` and `user.save()`.
- **Rationale**: `findByIdAndUpdate` bypasses Mongoose `pre('save')` hooks. Using `.save()` ensures that if a password is changed, the hashing hook in `user.model.ts` is triggered.
- **Alternatives Considered**: 
  - Using a custom hashing utility in the controller (Rejected: breaks DRY principle; model should own hashing).
  - Using `pre('findOneAndUpdate')` hook (Rejected: more complex to implement correctly for password changes).

### 2. Population Strategy
- **Decision**: Conditionally populate `currentClass` and `parent` only when the `role` is 'student' or if requested via query param.
- **Rationale**: Keeps the general `getAllUsers` response lean for non-student roles while providing necessary context for students.

### 3. Student ID Generation
- **Decision**: For now, expect Admin to provide it. In a future iteration, we can add auto-generation.
- **Rationale**: Smallest viable change.

## Best Practices
- **Atomic Operations**: When updating roles or linking classes, ensure data integrity across models (though current architecture seems single-collection focused for users).
