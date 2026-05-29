# Feature Specification: Comprehensive Centralized Chat Messaging System

## Overview
Implement a multi-role chat system supporting direct messages and group chats with scoped permissions based on class batches and user roles.

## User Stories

### Teacher
- As a teacher, I want to create chat groups for selected students in my class batches.
- As a teacher, I want to have direct conversations with Admin, other teachers, students in my class batches, and parents of those students.

### Student
- As a student, I want to see and participate in group chats created by my teachers.
- As a student, I want to exchange direct messages with other students in my enrolled batches.
- As a student, I want to exchange direct messages with my teachers and admin.

### Parent
- As a parent, I want to see and participate in group chats created by my children's teachers.
- As a parent, I want to exchange direct messages with my children's teachers.

### Admin
- As an admin, I want to monitor all group messages.
- As an admin, I want to participate in any group or direct chat.
- As an admin, I want to perform CRUD operations on all chat groups.

## Functional Requirements
1. **Group Management**:
   - Create groups (Teacher, Admin).
   - Add/Remove members (Teacher, Admin).
   - Scope student/parent selection to the teacher's assigned class batches.
2. **Direct Messaging (DM)**:
   - DM permission scoping:
     - Teacher <-> (Admin, Teachers, Assigned Students, Assigned Parents).
     - Student <-> (Teachers, Admin, Enrolled Batch Students).
     - Parent <-> (Children's Teachers, Admin).
3. **Real-time Updates**:
   - Instant message delivery via Socket.IO.
   - Unread message indicators and notifications.
4. **Data Persistence**:
   - Store all messages and group metadata in MongoDB.

## Acceptance Criteria
- Teachers can only create groups for students in their own classes.
- Students cannot DM students outside their own batches.
- Parents can only DM teachers who teach their children.
- Admin has global visibility and management rights.
- Messages appear in real-time without page reload.
