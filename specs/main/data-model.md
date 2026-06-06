# Data Model: Multi-Fee Support

## Entity: Class (Updated)
| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `monthlyFee` | Number | Monthly tuition for the class | Required, default: 0 |

## Entity: Course (Verified)
| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `monthlyFee` | Number | Monthly tuition for the course | Required, default: 0 |

## Entity: User (Parent/Student)
N/A - This change only affects the management of course/class definitions.
