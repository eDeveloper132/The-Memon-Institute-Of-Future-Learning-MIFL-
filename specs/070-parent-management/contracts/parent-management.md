# API Contract: Parent Management

## Endpoints

### 1. Create Parent
- **Method**: `POST`
- **URL**: `/api/admin/users`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "parent",
    "phoneNumber": "1234567890",
    "address": "123 Parent St"
  }
  ```
- **Response** (201):
  ```json
  {
    "message": "User created successfully",
    "user": { ... }
  }
  ```

### 2. Link Parent to Students
- **Method**: `POST`
- **URL**: `/api/admin/parents/link`
- **Auth**: Admin only
- **Body**:
  ```json
  {
    "parentId": "60d...123",
    "studentIds": ["60d...456", "60d...789"]
  }
  ```
- **Success Response** (200):
  ```json
  {
    "message": "Students successfully linked to parent",
    "updatedCount": 2
  }
  ```
- **Error Response** (404): Parent not found.
- **Error Response** (400): Invalid student IDs.

### 3. Get All Parents
- **Method**: `GET`
- **URL**: `/api/admin/users?role=parent`
- **Response** (200):
  ```json
  {
    "users": [
      {
        "_id": "...",
        "name": "...",
        "email": "...",
        "role": "parent",
        "linkedStudents": [ ... ] 
      }
    ]
  }
  ```
  *(Note: Backend should ideally populate linked students or they can be fetched separately)*
