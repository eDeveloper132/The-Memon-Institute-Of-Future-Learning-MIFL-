# Student Enrollment API Contracts

## Student Endpoints

### GET `/api/enrollment/available`
- **Description**: Returns all classes and courses available for enrollment, including the student's current application status for each.
- **Success (200)**:
  ```json
  {
    "classes": [
        { "_id": "...", "name": "...", "enrollmentFee": 100, "status": "none" },
        { "_id": "...", "name": "...", "enrollmentFee": 150, "status": "pending" }
    ],
    "courses": [...]
  }
  ```

### POST `/api/enrollment/apply`
- **Body**: `{ "targetType": "Class" | "Course", "targetId": "..." }`
- **Success (201)**: `{ "message": "Application submitted", "request": EnrollmentRequest }`
- **Error (400)**: `{ "message": "Already enrolled in a class" }`

### PATCH `/api/enrollment/requests/:id/cancel`
- **Description**: Student cancels their own pending request.
- **Success (200)**: `{ "message": "Request cancelled" }`

## Admin Endpoints

### GET `/api/admin/enrollment/requests`
- **Description**: Get all pending enrollment requests.
- **Success (200)**: `{ "requests": [EnrollmentRequest] }`

### PATCH `/api/admin/enrollment/requests/:id`
- **Body**: `{ "status": "approved" | "denied" }`
- **Success (200)**: `{ "message": "Request processed", "request": EnrollmentRequest }`

### PATCH `/api/admin/classes/:id/fee`
- **Body**: `{ "enrollmentFee": 100 }`

### PATCH `/api/admin/courses/:id/fee`
- **Body**: `{ "enrollmentFee": 50 }`
