# Specification: Price Section Management (PKR)

## Problem Statement
Administrators need to set and view enrollment fees for courses and academic classes in PKR (Pakistani Rupee). Currently, the system lacks a price field during the creation process and uses USD ($) for display.

## Goals
- Add an `enrollmentFee` field to the "Register New Course" and "New Academic Class" creation modals.
- Update all administrative displays to show prices in PKR (Rs.) instead of USD ($).
- Ensure fees can be updated easily from the course/class management interface.

## User Stories
- As an **Admin**, I want to specify the enrollment fee in PKR when registering a new course.
- As an **Admin**, I want to specify the enrollment fee in PKR when creating a new academic class.
- As an **Admin**, I want to see all fees displayed in PKR (Rs.) on the management dashboard cards.

## Technical Constraints
- Must use the existing `enrollmentFee` field in the database.
- Must not break existing course/class registration logic.
- Must ensure that only non-negative numbers can be entered for fees.
