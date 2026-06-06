# Research: Course Modal Updates

## Decision: Use `step="0.1"` for Credits
We will update the `credits` input in `courses.html` to include `step="0.1"`.

## Rationale
- HTML5 `type="number"` inputs default to a step of `1`. Adding `step="0.1"` allows for one decimal place precision (e.g. 1.5, 3.5), which covers the user requirement. `step="any"` is also an option but `0.1` is more controlled for academic credits.

## Findings

### 1. Form Data Casting
The `courseForm.onsubmit` currently uses:
```javascript
const data = Object.fromEntries(new FormData(courseForm));
```
`FormData` values are always strings. When sent to the backend via `fetch` with `JSON.stringify(data)`, they remain strings.

Mongoose's `Number` type casting in `Course.create(req.body)` and `findByIdAndUpdate` handles numeric strings correctly, including decimals.

### 2. UI Consistency
The modal already switches between "Register New Course" and "Edit Course" based on the `isEdit` flag. I will ensure that the "Credits" field is accurately displayed in the `renderCourses` cards as well.

### 3. Error Handling
I will add more specific error logging and user feedback (via existing `showToast`) if the API call fails.

## Alternatives Considered

### Server-side Validation for Integers
- **Rejected because**: The requirement explicitly asks for decimal form.

### Floating point precision issues
- **Decision**: For values like 1.5 or 3.5, standard floating point `Number` in JavaScript/MongoDB is sufficient and won't suffer from common precision issues like 0.1 + 0.2.
