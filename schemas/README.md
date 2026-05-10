# Schemas and Models

This directory defines the data architecture of the application using Mongoose schemas and TypeScript interfaces.

## Structure

- `models/`: Contains the Mongoose models which are used to interact with the MongoDB database.
- `types/`: Contains TypeScript interfaces that correspond to the database schemas, ensuring type safety throughout the application.

## Models (`models/`)

### 1. User Model (`user.model.mts`)
The core model for all users (Students, Teachers, Admins).
- **Key Fields:** `name`, `email`, `password` (hashed), `phoneNumber`, `role` (enum).
- **Features:** Automated password hashing, JWT compatibility, and role-based structure.

### 2. Attendance Model (`attendance.model.mts`)
Tracks the attendance of students in classes.
- **Key Fields:** `student` (ref), `class` (ref), `course` (ref), `date`, `status` (present, absent, late, excused).
- **Purpose:** Monitor student participation and generate attendance reports.

### 3. Class Model (`class.model.mts`)
Represents a physical or virtual classroom group.
- **Key Fields:** `name`, `gradeLevel`, `section`, `classTeacher` (ref), `students` (array of refs), `academicYear`.
- **Constraint:** Unique class names per academic year.

### 4. Course Model (`course.model.mts`)
Represents an academic course offered.
- **Key Fields:** `title`, `code` (unique), `department` (ref), `teacher` (ref), `credits`.
- **Purpose:** Manage curriculum and teacher assignments.

### 5. Department Model (`department.model.mts`)
Groups courses and staff by academic department.
- **Key Fields:** `name`, `code` (unique), `headOfDepartment` (ref).

### 6. Exam & Grade Models (`exam.model.mts`)
Handles the assessment and performance tracking.
- **Exam:** Defines an assessment (midterm, final, quiz, etc.) with `maxMarks` and `weightage`.
- **Grade:** Records a student's performance on a specific exam, including marks and feedback.

### 7. Fee Model (`fee.model.mts`)
Manages financial transactions and tuition tracking.
- **Key Fields:** `student` (ref), `amount`, `type`, `dueDate`, `status` (paid, unpaid, overdue).

## TypeScript Types (`types/`)

Each model has a corresponding interface in the `types/` directory:
- `user.type.mts`: `IUser` interface.
- `attendance.type.mts`: `IAttendance` interface.
- `class.type.mts`: `IClass` interface.
- `course.type.mts`: `ICourse` interface.
- `department.type.mts`: `IDepartment` interface.
- `exam.type.mts`: `IExam` and `IGrade` interfaces.
- `fee.type.mts`: `IFee` interface.
- `assignment.type.mts` & `notice.type.mts`: Interfaces for future or specialized features.
