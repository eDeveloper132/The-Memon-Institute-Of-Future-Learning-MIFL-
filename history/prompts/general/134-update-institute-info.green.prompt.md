---
id: 134
title: Update Institute Info and Fee Structure
stage: green
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: information-center
branch: main
user: Muhammad Ilyas
command: set enrollment fee 500 and monthly fee should be defined fee from database...
labels: ["database", "schema", "ui", "pricing"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - schemas/types/course.type.ts
  - schemas/models/course.model.ts
  - controllers/public.controller.ts
  - public/unprotected/information_center/information-center.html
tests:
  - Verified via npx tsc
---

## Prompt

set enrollment fee 500 and monthly fee should be defined fee from database. Establised in 2026. Contact +923062924538 email: the.memon.learning.official@gmail.com . Location: Sonara Heights khoja st nawabad lyari south karahi.

## Response snapshot

I have updated the Institute information and refined the fee structure in the Information Center.

1.  **Schema Update**: Added a `monthlyFee` field to both the `ICourse` interface and the Mongoose `Course` model. This allows tuition fees to be managed dynamically per course.
2.  **Public API**: Updated `getInformationCenterData` in `public.controller.ts` with the new establishment date (2026), contact details, and ensured it selects the `monthlyFee` from the database.
3.  **UI Differentiator**: Modified `information-center.html` to clearly separate the one-time **Enrollment Fee** (fixed at PKR 500 per your request) and the dynamic **Monthly Fee** fetched from the database.
4.  **Content Refresh**: Updated all footers and contact cards with the new location and contact details.

The Information Center now accurately reflects the business model and current contact information of the institute.

## Outcome

- ✅ Impact: Correct pricing and contact info now visible to prospective students.
- 🧪 Tests: Confirmed 0 type errors via `npx tsc`.
- 📁 Files: Modified 4 files across schemas, controllers, and public UI.
- 🔁 Next prompts: None.
- 🧠 Reflection: Separating fixed operational fees (Enrollment) from dynamic academic fees (Monthly) provides better clarity for users.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
