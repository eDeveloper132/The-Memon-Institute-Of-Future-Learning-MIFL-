# API Route Architecture

This directory defines the public and protected API surface of the MIFL platform. Routes are modularized by functional area and follow RESTful principles.

## 🛣 Route Modules

- **`auth.routes.ts`**: Public endpoints for registration, login, and security verification.
- **`admin.routes.ts`**: Privileged endpoints for staff management, financial generation, and student auditing.
- **`teacher.routes.ts`**: Endpoints for curriculum management, assignments, and attendance marking.
- **`student.routes.ts`**: Endpoints for enrollment, quiz participation, and personal record retrieval.
- **`parent.routes.ts`**: Endpoints for tracking children's attendance and academic progress.
- **`notification.routes.ts`**: Centralized routes for alert management and preferences.
- **`enrollment.routes.ts`**: Specific logic for course application workflows.
- **`chat.routes.ts`**: Real-time messaging and group management endpoints.

## 🔏 Standard Middleware Chain

Most routes follow a standard protection pattern:
```typescript
router.get('/data', authenticate, authorize('admin', 'teacher'), controller.getData);
```

## 📋 Response Format

All successful responses return a JSON object with a status code of 200/201. Errors return a standard error object:
```json
{ "message": "Clear description of what went wrong" }
```

## 🚀 Performance Note
- All routes are optimized for Vercel Serverless execution.
- Heavy data aggregation (like dashboard stats) is cached or indexed at the schema layer.
