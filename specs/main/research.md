# Research: Material Targeting Logic

## Decision: Dual-Targeting Schema
We will update the `Material` schema to support an XOR-like relationship where a material can be linked to either a `course` or a `class`.

## Rationale
- **Flexibility**: Teachers often have general resources for an entire Course (e.g., "Syllabus Overview") that all batches should see, but they also have specific resources for a single Class (e.g., "Class 10A Field Trip Permission Slip").
- **Database Efficiency**: A single `Material` collection with dual optional references is highly indexable and avoids table duplication.

## Findings

### 1. Data Schema Detail
The `IMaterial` should be updated as:
```typescript
{
    // ...
    course?: Types.ObjectId; // Make optional
    class?: Types.ObjectId;  // Add optional
    // ...
}
```

### 2. UI/UX: The Upload Hub (`staff/index.html`)
- **Target Selection**: The UI will use radio buttons to select the target type ("Course" or "Class"). Based on the selection, a dynamic dropdown will populate with the teacher's authorized courses or classes.
- **Upload Flow**: 
    1. Select file.
    2. Upload to Sanity (`POST /api/teacher/materials/upload`).
    3. Receive CDN URL.
    4. Submit full form (`POST /api/teacher/materials`) with title, description, URL, and target ID.

### 3. Student Retrieval Logic
The `getMyMaterials` function in `student.controller.ts` must query materials using an `$or` condition:
```javascript
const materials = await Material.find({
    $or: [
        { course: { $in: courseIds } },
        { class: user.currentClass }
    ]
});
```

## Alternatives Considered

### Dedicated `ClassMaterial` Model
- **Rejected because**: It would require creating parallel APIs for uploading, fetching, deleting, and updating, leading to massive code duplication for exactly the same functionality.

### Forcing all materials to Course level
- **Rejected because**: A primary user request is the ability to send materials to a "specified class", implying a need for class-level granularity that course-level targeting cannot satisfy.
