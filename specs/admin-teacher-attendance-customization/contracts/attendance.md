# API Contracts: Admin Teacher Attendance

## Get Faculty Attendance
- **Method**: `GET /api/admin/attendance`
- **Query Params**: `role=teacher`, `date=YYYY-MM-DD`
- **Response**: List of attendance records including `checkIn` and `checkOut` times.

## Record Attendance (Manual/Custom)
- **Method**: `POST /api/admin/attendance`
- **Auth**: Admin
- **Body**:
  ```json
  {
    "userId": "...",
    "status": "present",
    "checkIn": "ISO Date String",
    "checkOut": "ISO Date String (Optional)",
    "remarks": "..."
  }
  ```
- **Response**: `201 Created`
