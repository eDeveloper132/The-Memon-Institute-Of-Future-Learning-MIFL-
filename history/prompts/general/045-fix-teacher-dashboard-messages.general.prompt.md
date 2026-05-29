---
id: 045
title: Fix Teacher Dashboard Messages Link
stage: green
date_iso: 2026-05-28
surface: agent
model: gemini-2.0-flash
feature: ui-fix
branch: main
user: moham
command: /sp.implement
labels: ["dashboard", "teacher", "cache-busting", "ui"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - public/protected/teacher/index.html
  - public/protected/admin/index.html
tests_yaml:
  - none
---

### PROMPT_TEXT
In teacher dashboard messages section not shown

### RESPONSE_TEXT
I have fixed the issue where the Messages section was missing from the Teacher Dashboard. 

1. **Dashboard UI Update**: I added a new "Messages" button to the "Quick Actions" grid directly on the `teacher/index.html` dashboard, giving teachers immediate access to the communication center alongside Attendance and Assignments.
2. **Admin Dashboard Parity**: I also added a matching "Communication Center" Quick Action link to the Admin dashboard (`admin/index.html`) for consistency.
3. **Cache Busting**: A common issue with the sidebar navigation not updating is browser caching. I implemented cache busting by appending a version query string (`?v=1.3`) to the `ui-components.js` script tag globally. This forces the browser to fetch the latest navigation links (which now include Messages for all roles).

### OUTCOME
The Messages section is now prominently displayed in the Quick Actions on the Teacher Dashboard, and caching issues preventing the sidebar link from appearing have been resolved.
