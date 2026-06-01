# API Contract: Course Management

## POST /api/admin/courses
Creates a new course.

### Request Body
```json
{
  "title": "String (Required)",
  "code": "String (Required, Unique)",
  "credits": "Number (Required, Default: 0)",
  "department": "ObjectId (Required)",
  "teacher": "ObjectId (Required)",
  "enrollmentFee": "Number (Optional, Default: 0)"
}
```

## PATCH /api/admin/courses/:id
Updates an existing course.

### Request Body
```json
{
  "title": "String",
  "code": "String",
  "credits": "Number",
  "department": "ObjectId",
  "teacher": "ObjectId",
  "enrollmentFee": "Number"
}
```

## PATCH /api/admin/courses/:id/fee
Updates only the enrollment fee.

### Request Body
```json
{
  "enrollmentFee": "Number (Required)"
}
```
