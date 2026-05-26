# API Contracts: Admin User Management

## Update User
- **Method**: `PATCH /api/admin/users/:id`
- **Goal**: Support password updates with hashing.
- **Body**: Partial `IUser` fields.

## Get All Users (with population)
- **Method**: `GET /api/admin/users`
- **Query Params**: 
  - `role`: Filter by role (e.g., `student`).
  - `populate`: (Optional) Boolean to trigger full population.
- **Response**: List of users with `currentClass` and `parent` populated for students.
