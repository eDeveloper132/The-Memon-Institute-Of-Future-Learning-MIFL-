# Schemas and Models

This directory defines the data architecture of the application using Mongoose schemas and TypeScript interfaces.

## Structure

- `models/`: Contains the Mongoose models which are used to interact with the MongoDB database.
- `types/`: Contains TypeScript interfaces that correspond to the database schemas, ensuring type safety throughout the application.

## Models (`models/`)

### 1. User Model (`user.model.ts`)
The core model for all users (Students, Teachers, Admins, Parents, Staff).
- **Key Fields:** `name`, `email`, `password` (hashed), `phoneNumber`, `role` (enum), `status`.
- **Features:** Automated password hashing, email verification status, and pending email management.

### 2. Attendance Model (`attendance.model.ts`)
Tracks the attendance of students in classes.
- **Key Fields:** `student` (ref), `class` (ref), `course` (ref), `date`, `status` (present, absent, late, excused).

### 3. Class Model (`class.model.ts`)
Represents a physical or virtual classroom group.
- **Key Fields:** `name`, `gradeLevel`, `section`, `classTeacher` (ref), `students` (array of refs), `academicYear`.

### 4. Course Model (`course.model.ts`)
Represents an academic course offered.
- **Key Fields:** `title`, `code` (unique), `department` (ref), `teacher` (ref), `credits`.

### 5. Department Model (`department.model.ts`)
Groups courses and staff by academic department.
- **Key Fields:** `name`, `code` (unique), `headOfDepartment` (ref).

### 6. Exam & Grade Models (`exam.model.ts`)
Handles assessment tracking, including marks and feedback.

### 7. Fee Model (`fee.model.ts`)
Manages financial transactions, tuition, and payment statuses.

## TypeScript Types (`types/`)

Each model has a corresponding interface in the `types/` directory (e.g., `user.type.ts`, `class.type.ts`) to ensure strict typing across the services and controllers.
