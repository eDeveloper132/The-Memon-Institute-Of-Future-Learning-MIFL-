# Data Model: User Profile Updates

## Entity: User (Updated Usage)
No schema structural changes are required. We are simply exposing existing fields to the user for editing.

| Field | Type | Exposure Context |
|-------|------|------------------|
| `name` | String | All Roles |
| `phoneNumber`| String | All Roles |
| `address` | String | All Roles |
| `profilePicture`| String | All Roles (Sanity CDN URL) |
| `gender` | String | All Roles |
| `dateOfBirth`| Date | All Roles |
| `bloodGroup` | String | All Roles |
| `emergencyContact`| Object | Student Only |
| `qualification` | Array<String> | Teacher Only |

**Security Note**: 
The `role`, `status`, `studentId`, `staffId`, and `email` fields MUST NOT be updatable through this generic profile endpoint. Changing email requires the specific email verification flow already implemented.
