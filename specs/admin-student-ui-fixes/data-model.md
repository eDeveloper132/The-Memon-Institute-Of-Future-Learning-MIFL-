# Data Model: Admin Student UI Fixes

## UI State
- `allStudents`: Array of student objects fetched from `/api/admin/users?role=student`.
- `filteredStudents`: Computed array based on search and status filters.

## Form Mappings (Add Student)
- `name`: String
- `email`: String
- `password`: String
- `phoneNumber`: String
- `gender`: Enum ('male', 'female', 'other')
- `address`: String
- `isEmailVerified`: Boolean (Checkbox)

## Form Mappings (Edit Student)
- `id`: Hidden ID
- `name`: String
- `studentId`: String
- `password`: String (Optional)
- `phoneNumber`: String
- `status`: Enum ('active', 'inactive', 'suspended')
- `address`: String
