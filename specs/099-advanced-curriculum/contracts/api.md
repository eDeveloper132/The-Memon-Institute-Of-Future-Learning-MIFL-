# API Contract: Advanced University-Level Curriculum

## Endpoints

### 1. Update Course Curriculum (Advanced)
- **Method**: `PATCH`
- **URL**: `/api/teacher/courses/:id/curriculum`
- **Body**:
  ```json
  {
    "outline": "Introduction to Quantum Mechanics...",
    "curriculum": [
      {
        "title": "Wave-Particle Duality",
        "description": "Exploration of photons and electrons...",
        "duration": "Week 1",
        "learningObjectives": ["Explain double-slit experiment", "Calculate de Broglie wavelength"],
        "resources": [
          { "title": "Reference Text", "url": "https://example.com/phys-101" }
        ],
        "order": 1
      }
    ]
  }
  ```

### 2. Update Class Curriculum (Advanced)
- **Method**: `PATCH`
- **URL**: `/api/teacher/classes/:id/curriculum`
- **Body**: Similar to above, but targeting `classOutline` and `classCurriculum` fields.

### 3. Student View (Public Syllabus)
- **Method**: `GET`
- **URL**: `/api/student/courses/:id/syllabus` (New Endpoint)
- **Response**: Returns formatted curriculum data for the student portal.
