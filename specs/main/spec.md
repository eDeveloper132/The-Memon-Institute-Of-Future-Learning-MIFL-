# Specification: Standalone Material Uploads via Sanity

## Background
Currently, teachers can upload PDFs within the Curriculum Studio, tying resources strictly to specific curriculum modules. However, teachers also need a general "Resource Hub" where they can upload standalone files (PDFs, DOCX) directly to a specified Class or Course, completely independent of the daily curriculum milestones. The user has specifically requested this functionality to be built into `http://localhost:2000/protected/staff/index.html`.

## User Stories
- **As a Teacher**, I want a dedicated Resource Hub (`/protected/staff/index.html`) where I can upload standalone PDF and DOCX files.
- **As a Teacher**, I want to link these uploaded files to a specific Course or a specific Class.
- **As a Student**, I want to see these uploaded standalone materials in my `course-files.html` dashboard, properly filtering based on my current Class and my enrolled Courses.

## Requirements

### Functional
- **File Upload to Sanity**: The upload must use the existing Sanity backend integration (`uploadMaterialAsset`).
- **Target Selection**: The UI must allow the teacher to toggle between targeting a "Course" or a "Class" and then select the specific entity from a dropdown.
- **Student Visibility**: Students must be able to view and download these materials. If a material is linked to a class, all students in that class see it. If it is linked to a course, all enrolled students see it.
- **UI Integration**: Repurpose the existing placeholder at `public/protected/staff/index.html` to be the "Resource & Material Hub" for staff/teachers.

### Technical
- **Data Model Update**: 
    - Modify the existing `Material` model in `schemas/models/material.model.ts`. 
    - Make `course` optional.
    - Add an optional `class` reference.
    - Add validation to ensure at least one (course or class) is provided.
- **API Updates**:
    - `student.controller.ts` -> `getMyMaterials`: Must query materials where `course` is in the student's enrolled courses OR `class` is the student's `currentClass`.
- **Teacher View**: Build a form in `staff/index.html` that handles file selection, uploads to Sanity to get a URL, and then saves the `Material` record to MongoDB.
- **Student View**: Ensure `student/course-files.html` renders both Course-level and Class-level materials accurately.

## Acceptance Criteria
- [ ] Teacher can navigate to `/protected/staff/index.html` and see a material upload form.
- [ ] Teacher can upload a PDF and target it to a specific Class.
- [ ] Student in that Class can see the PDF in their `course-files.html` dashboard and download it.
- [ ] Data persists accurately in MongoDB with the `fileUrl` pointing to Sanity CDN.
- [ ] Application compiles with zero TypeScript errors.
