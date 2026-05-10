# Schemas and Models

This directory holds the data structure definitions for the application using Mongoose and TypeScript.

## Models (`models/`)

### User Model (`user.model.mts`)
A comprehensive schema for application users (Students, Teachers, Admins).

**Required Fields:**
- `name`: Full name of the user.
- `email`: Unique email address (validated).
- `password`: Hashed password (automatically handled via pre-save hook).
- `phoneNumber`: Contact number.
- `address`: Physical address.
- `role`: One of `student`, `teacher`, or `admin`.

**Optional Fields:**
- `classCode`: Specific code for a class or section.
- `teacherName`: Name of the assigned teacher.
- `courseName`: Name of the enrolled course.
- `courseObjId`: MongoDB ObjectID reference to a Course.
- `teacherObjId`: MongoDB ObjectID reference to another User (Teacher).

**Features:**
- **Password Hashing:** Uses `bcrypt` for secure storage.
- **Timestamps:** Automatically tracks `createdAt` and `updatedAt`.
- **Validation:** Includes email format and password length checks.
- **Instance Methods:** Includes `comparePassword` for easy authentication checks.

## Types (`types/`)
- TypeScript interfaces specifically related to data structures.
