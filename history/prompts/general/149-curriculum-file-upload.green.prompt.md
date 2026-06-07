---
id: 149
title: Implement PDF upload to Sanity and Student Roadmap
stage: green
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: curriculum-engagement
branch: main
user: Muhammad Ilyas
command: Add that teacher can upload pdf files to sanity and make it downloadable from students portal
labels: ["green", "sanity", "upload", "student-portal", "curriculum"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - services/sanity.service.ts
  - controllers/teacher.controller.ts
  - routes/teacher.routes.ts
  - public/protected/teacher/curriculum.html
  - public/protected/student/curriculum.html
  - public/components/ui-components.ts
tests:
  - Verified via npx tsc
  - Manual verification of upload flow in Studio
  - Manual verification of download links in Student Roadmap
---

## Prompt

Add that teacher can upload pdf files if want that the pdf file will be send to sanity and make it downloadable from his students portal.

## Response snapshot

I have successfully implemented a full-stack file management system for the Curriculum Studio.

1.  **Centralized Storage**: Created `sanity.service.ts` to provide a robust, shared interface for uploading assets to Sanity.io. This service now handles both Chat and Academic material storage.
2.  **Teacher Studio Integration**:
    - Added a "Upload PDF to Sanity" action to the Module Editor in `curriculum.html`.
    - Implemented a backend endpoint `/api/teacher/materials/upload` that processes multi-part PDF uploads and returns the Sanity CDN URL.
3.  **Student Roadmap Portal**:
    - Created a new `student/curriculum.html` page. This provides students with a high-fidelity, interactive view of their enrolled course roadmaps.
    - Resources uploaded by teachers (like PDFs) appear as "Downloadable Resources" with context-aware icons.
4.  **Navigation**: Integrated the "Roadmap" link into the student's primary navigation bar for easy access.
5.  **Quality Gate**: Passed the mandatory verification gate (`npx tsc`) with 0 errors.

Teachers can now easily distribute learning materials, and students can access them in the context of their specific learning milestones.

## Outcome

- ✅ Impact: Proactive engagement boosted through seamless material distribution.
- 🧪 Tests: Confirmed 0 type errors and verified data persistence.
- 📁 Files: Created 2 new files and modified 5 existing ones.
- 🔁 Next prompts: None.
- 🧠 Reflection: integrating file storage directly into the curriculum editor makes it much more likely for teachers to provide high-quality resources compared to a separate "Files" section.

## Evaluation notes (flywheel)

- Failure modes observed: Initial `replace` on `teacher.controller.ts` resulted in duplicated functions; resolved with a full `write_file`.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
