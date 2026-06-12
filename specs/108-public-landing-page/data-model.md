# Data Model: Public Landing Page

## Existing Entities Leveraged

### SystemInfo (Virtual)
- `name`: "MIFL - Memon Institute Of Future Learning"
- `motto`: "Empowering the future through knowledge and skills."
- `contact`: { email, phone, address }

### Course (Schema: Course)
- `title`: Displayed in "Our Courses" section.
- `enrollmentFee`, `monthlyFee`: Publicly visible.
- `syllabus`, `outline`: Linked for detailed view.

### Department (Schema: Department)
- `name`, `description`: Used for categorization.
