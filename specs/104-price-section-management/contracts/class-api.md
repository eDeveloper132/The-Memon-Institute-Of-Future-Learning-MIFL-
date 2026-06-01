# API Contract: Class Management

## POST /api/admin/classes
Creates a new academic class.

### Request Body
```json
{
  "name": "String (Required)",
  "gradeLevel": "Number (Required)",
  "section": "String (Required)",
  "academicYear": "String (Required)",
  "classTeacher": "ObjectId (Required)",
  "enrollmentFee": "Number (Optional, Default: 0)"
}
```

## PATCH /api/admin/classes/:id
Updates an existing class.

### Request Body
```json
{
  "name": "String",
  "gradeLevel": "Number",
  "section": "String",
  "academicYear": "String",
  "classTeacher": "ObjectId",
  "enrollmentFee": "Number"
}
```

## PATCH /api/admin/classes/:id/fee
Updates only the enrollment fee.

### Request Body
```json
{
  "enrollmentFee": "Number (Required)"
}
```
