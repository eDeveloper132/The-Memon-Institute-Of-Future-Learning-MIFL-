# Research: Trigger Audit for Email Notifications

## Decision: Targeted Integration Points
We will integrate `NotificationService.send()` at the exact moment an entity is created or a status changes in the controllers.

## Rationale
- **Context Availability**: Controllers have immediate access to the ID of the created entity and the authenticated user.
- **Reliability**: Triggering after a successful database `save()` or `create()` ensures notifications are only sent for real events.

## Trigger Mapping

| Category | Controller | Method | Recipient | Title Template |
|----------|------------|--------|-----------|----------------|
| **Academic** | Teacher | `postAssignment` | All Students in Class | New Assignment: {{title}} |
| **Academic** | Teacher | `gradeAssignment` | Student | Assignment Graded: {{title}} |
| **Academic** | Teacher | `postMaterial` | All Students in Class | New Study Material: {{title}} |
| **Academic** | Teacher | `createQuiz` | All Students in Class | New Quiz Available: {{title}} |
| **Academic** | Teacher | `createExam` | All Students in Class | Exam Scheduled: {{title}} |
| **Attendance**| Admin | `markAttendance` | Parents of Absentees | Absence Alert: {{childName}} |
| **Finance** | Admin | `generateFee` | Student (and Parent) | Fee Voucher Generated |
| **Admin** | Student | `enrollCourse` | Admins | New Enrollment Request |
| **Messaging** | Chat | `sendMessage` | Recipient (if offline) | New Message from {{sender}} |

## Findings

### 1. Template Strategy
Templates will be defined in `services/emailTemplates.ts` as functions returning HTML strings.
Example: `getAssignmentEmail(assignmentTitle, dueDate)`.

### 2. Batch Notifications
For events like "New Assignment" (sent to 30+ students), `NotificationService.send` should be called in a `Promise.all` or a loop.
- **Recommendation**: Background these calls using `setImmediate` or similar to avoid delaying the API response to the teacher.

### 3. Parent Notifications
Parents currently lack a direct "recipient" field in many academic entities. We will need to fetch the student's parent ID before sending.

## Alternatives Considered

### Mongoose Middleware (`post('save')`)
- **Rejected because**: It's harder to get the context of *who* performed the action and often leads to circular dependency issues with services.

### Event Emitter (Pub/Sub)
- **Rejected because**: For the current scale, direct service calls in controllers are more readable and easier to debug.
