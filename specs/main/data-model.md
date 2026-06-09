# Data Model & Contracts

No changes to the data model or API contracts are necessary for this task. The existing models (`IExam`, `IGrade`) and API routes (`/api/teacher/exams`, `/api/teacher/grades`) fully support the requested functionality.

## API Usage for Results View

- **Fetch Exams**: `GET /api/teacher/results`
- **Fetch Exam Students**: `GET /api/teacher/exams/:id/students` (supports course and class-level filtering)
- **Submit Grade**: `POST /api/teacher/grades`
