# Feature Specification: Parent Management

**Feature Branch**: `070-parent-management`  
**Created**: 2026-05-30  
**Status**: Draft  
**Input**: User description: "Make a plan that admin can make parent accounts of students and link by selecting student."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create Parent Account (Priority: P1)

As an admin, I want to create a new parent account with basic information (name, email, phone) so they can eventually access the portal.

**Why this priority**: Fundamental requirement for the feature.

**Independent Test**: Can be tested by creating a user with the 'parent' role and verifying it exists in the database.

**Acceptance Scenarios**:

1. **Given** I am logged in as an admin, **When** I submit a "Create Parent" form with valid details, **Then** a new user with role 'parent' is created.
2. **Given** I am logged in as an admin, **When** I submit the form with an existing email, **Then** I see an error message.

---

### User Story 2 - Link Parent to Students (Priority: P1)

As an admin, I want to link a parent account to one or more student accounts by selecting students from a list.

**Why this priority**: The core purpose of parent accounts is to be linked to students.

**Independent Test**: Can be tested by assigning a parent ID to a student's `parent` field and verifying the link in both directions if applicable (though currently student stores parent).

**Acceptance Scenarios**:

1. **Given** a parent account and a student account, **When** I select the student for that parent, **Then** the student's `parent` field is updated with the parent's ID.
2. **Given** a parent account, **When** I view the parent's details, **Then** I see a list of linked students.

---

### User Story 3 - Manage Parents UI (Priority: P2)

As an admin, I want a dedicated UI to view, edit, and delete parent accounts.

**Why this priority**: Necessary for ongoing management of parent accounts.

**Independent Test**: Can be tested by navigating to the "Parents" section in the admin dashboard and performing CRUD operations.

**Acceptance Scenarios**:

1. **Given** existing parent accounts, **When** I navigate to the Parents page, **Then** I see a list of all parents.
2. **Given** a parent account, **When** I click "Delete", **Then** the parent account is removed and linked students have their `parent` field unset.

---

### Edge Cases

- What happens if a parent is deleted? Linked students should have their `parent` field cleared.
- What if a student is assigned a new parent? The `parent` field should be updated.
- Can a student have multiple parents? Current schema suggests only one (`parent: Schema.Types.ObjectId`).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Admin MUST be able to create a user with role 'parent'.
- **FR-002**: Admin MUST be able to search/filter students to link to a parent.
- **FR-003**: System MUST update the student's `parent` field when linked.
- **FR-004**: System MUST update the student's `parentName` and `parentContact` fields for redundancy/quick access (as seen in schema).
- **FR-005**: Admin MUST be able to view all parents and their linked students.

### Key Entities *(include if feature involves data)*

- **Parent (User)**: A user with `role: 'parent'`.
- **Student (User)**: A user with `role: 'student'`, linked to a Parent via `parent` field.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Admins can create and link a parent to a student in under 1 minute.
- **SC-002**: All created parents are correctly listed in the admin panel.
- **SC-003**: Linked students correctly show their parent's information.
