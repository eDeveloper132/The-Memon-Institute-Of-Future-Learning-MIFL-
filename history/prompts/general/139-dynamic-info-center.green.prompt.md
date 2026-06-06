---
id: 139
title: Make Information Center table dynamic and interactive
stage: green
date: 2026-06-06
surface: agent
model: Gemini 1.5 Pro
feature: information-center
branch: main
user: Muhammad Ilyas
command: make information center's table dynamic
labels: ["ui", "public", "information-center", "dynamic-table", "search"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - controllers/public.controller.ts
  - public/unprotected/information_center/information-center.html
tests:
  - Verified via npx tsc
  - Manual verification of tab switching and search logic
---

## Prompt

make information center's table dynamic

## Response snapshot

I have transformed the static Information Center into a fully dynamic and interactive portal.

1.  **Backend Enrichment**: Updated `public.controller.ts` to fetch and return academic `Class` data alongside existing course and department data.
2.  **Tabbed Interface**: Refactored the UI to include a modern toggle for switching between the **Course Catalog** and **Academic Classes**.
3.  **Real-time Search**: Implemented a live search filter that instantly narrows down results in the table as the user types, covering both names and codes.
4.  **Context-Aware Tables**: The table structure now dynamically reconfigures its headers and columns based on the active tab (e.g., showing academic years for classes vs credits for courses).
5.  **Pricing Parity**: Integrated the dual-fee structure (Enrollment + Monthly) for both entities, ensuring prospective users see the full financial picture.

The Public Information Center is now a robust tool for exploring the institute's current academic offerings.

## Outcome

- ✅ Impact: Prospective users can now interactively search and explore all academic offerings.
- 🧪 Tests: Clean `npx tsc` run and logic verified.
- 📁 Files: Modified 2 core files.
- 🔁 Next prompts: None.
- 🧠 Reflection: Providing search and tabbed navigation significantly reduces the effort required for a user to find specific information in growing catalogs.

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): N/A.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): N/A.
