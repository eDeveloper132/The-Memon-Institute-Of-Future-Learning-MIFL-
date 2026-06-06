# Data Layer (Schemas & Models)

MIFL uses **Mongoose** with strict **TypeScript** interfaces to ensure data integrity and high performance through optimized MongoDB indexing.

## 🗄 Core Entities

- **`User`**: Centralized account model with role-based attributes (Student, Teacher, Parent, Admin).
- **`Class`**: Represents a physical or virtual grade-level grouping.
- **`Course`**: Academic subjects containing multiple batches.
- **`Assignment`**: Trackable tasks with submissions and grading.
- **`Attendance`**: Daily records indexed by student and date.
- **`Notification`**: Persistent alerts used for dashboard and bell feeds.
- **`Notice`**: Targeted announcements for specific audiences or classes.
- **`Message`**: Real-time chat history records.

## 🔗 Key Relationships

- **Parent ↔ Student**: Linked via a `parent` field in the User model or `children` array.
- **Teacher ↔ Class**: Linked via `classTeacher` for oversight.
- **Course ↔ Batch**: One course contains multiple batches, which in turn contain student references.

## ⚡️ Performance Indexing

MIFL implements several critical indexes for real-time responsiveness:
- **Notifications**: Indexed by `recipient` and `readAt` for instant alert counts.
- **Notices**: Indexed by `audience` and `expiryDate` for efficient dashboard filtering.
- **Attendance**: Compound index on `student` and `date`.

## 🛡 Type Safety

Each model in `models/` has a corresponding interface in `types/`.
> **MANDATORY:** Never use `any` when defining schema fields or method parameters. Always reference the appropriate `IEntity` interface.
