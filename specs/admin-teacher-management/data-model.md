# Data Model: Admin Teacher Management

## UI State
- `allTeachers`: Array of teacher objects fetched from `/api/admin/users?role=teacher`.
- `filteredTeachers`: Computed array based on search, status, and verification filters.

## Form Mappings (Add Teacher)
- `name`: String
- `email`: String
- `password`: String
- `phoneNumber`: String
- `gender`: Enum ('male', 'female', 'other')
- `address`: String
- `isEmailVerified`: Boolean (Checkbox)

## Form Mappings (Edit Teacher)
- `id`: Hidden ID
- `name`: String
- `staffId`: String (Unique Employee ID)
- `password`: String (Optional Reset)
- `phoneNumber`: String
- `status`: Enum ('active', 'inactive', 'suspended')
- `department`: ObjectId (Reference to Department)
- `designation`: String
- `address`: String
