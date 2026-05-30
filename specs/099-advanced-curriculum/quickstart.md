# Quickstart: Advanced University-Level Curriculum

## Development Setup
1. Ensure `schemas/models/course.model.ts` and `class.model.ts` are updated with the new fields.
2. Verify that `teacher.controller.ts` logic can handle the new array-of-objects structure.

## Verification Scenarios

### Scenario 1: Comprehensive Syllabus Entry
1. Select a Course.
2. Add a module.
3. Fill in "Learning Objectives" and "Resources".
4. Save and click "Preview as Student".
5. Verify the preview modal shows a structured, university-style syllabus.

### Scenario 2: Locking Workflow
1. As Admin, lock a Course's curriculum.
2. As Teacher, try to add a new module.
3. Verify the "Save" button is hidden and modules are read-only.
