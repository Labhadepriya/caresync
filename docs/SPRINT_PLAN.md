# CareSync — Sprint Plan

## Project Goal

Build a working, maintainable hospital management MVP through small, testable increments while both developers learn their respective technologies.

**Planning estimate:** 12–14 weeks, assuming approximately 15–20 hours per developer per week. This is an estimate, not a guaranteed deadline.

**Current status:** Sprint 0 — Repository and architecture.

## Workflow

Issue statuses:

- Backlog
- Ready
- In Progress
- Blocked
- In Review
- Done

Every task should have an owner, sprint, scope label, dependencies, acceptance criteria, and linked pull request when applicable.

Labels:

- `frontend`
- `backend`
- `shared`
- `security`
- `testing`
- `documentation`

A task is Done only when its acceptance criteria are met. An integrated feature also requires relevant integration checks.

## Sprint 0 — Repository and Architecture

**Target duration:** 1 week.

### [FRONTEND]

- Verify Node.js and npm.
- Initialize React, TypeScript, and Vite.
- Confirm the frontend runs locally.
- Agree on a feature-oriented folder structure.

### [BACKEND]

- Verify Python, pip, and PostgreSQL.
- Create a Python virtual environment.
- Initialize Django and Django REST Framework.
- Decide on the custom user model before the first migration.

### [SHARED]

- Complete and review the initial repository files.
- Agree on authentication and CSRF strategy.
- Define initial API conventions and permission rules.
- Create GitHub Issues and a project board if available.

### Acceptance criteria

- Both applications run locally.
- Both developers can work with the shared repository.
- Secrets are excluded from Git.
- Initial architecture decisions are documented.

## Sprint 1 — Authentication Foundation

**Target duration:** 2 weeks.

### [FRONTEND]

- Login and registration screens.
- Form validation and error states.
- Authentication-aware navigation.
- Initial API client.

### [BACKEND]

- User model and authentication endpoints.
- Approved session or alternative authentication strategy.
- Backend authorization and tests.

### [SHARED]

- Integrate login, logout, and protected endpoints.
- Verify CSRF and cookie behavior if sessions are used.

### Acceptance criteria

- Authentication follows the agreed contract.
- Unauthorized requests are rejected.
- Frontend and backend authentication behavior is verified.

## Sprint 2 — Organizations, Departments, and Invitations

**Target duration:** 2 weeks.

### [FRONTEND]

- Organization and department screens.
- Staff invitation form.
- Invitation status and acceptance screens.

### [BACKEND]

- Organization, membership, and department models.
- Role and permission checks.
- Secure invitation creation, acceptance, expiry, and revocation.

### [SHARED]

- Test organization isolation and invitation lifecycle.

### Acceptance criteria

- Membership and role assignments are enforced server-side.
- Expired, revoked, and reused invitation tokens are rejected.
- Cross-organization access is denied by default.

## Sprint 3 — Patients and Appointments

**Target duration:** 2 weeks.

### [FRONTEND]

- Patient registration, list, search, and detail screens.
- Appointment creation and scheduling screens.
- Appointment status display.

### [BACKEND]

- Patient and appointment models and APIs.
- Validation and appointment status transitions.
- Scheduling conflict protection.

### [SHARED]

- Test patient permissions, invalid requests, and scheduling conflicts.

### Acceptance criteria

- Authorized users can complete the agreed patient and appointment workflows.
- Unrelated organization records cannot be accessed.
- Invalid appointment transitions are rejected.

## Sprint 4 — Diagnostic Workflows

**Target duration:** 2 weeks.

### [FRONTEND]

- Diagnostic order creation and tracking.
- Technician work queue.
- Result and report screens.

### [BACKEND]

- Diagnostic orders, assignments, and results.
- Secure file storage and retrieval.
- Result review and release permissions.

### [SHARED]

- Test the order-to-result workflow and file access controls.

### Acceptance criteria

- Authorized users can create and process orders.
- Reports are protected against unauthorized retrieval.
- Result release follows the agreed workflow.

## Sprint 5 — Real-Time Chat

**Target duration:** 2 weeks.

### [FRONTEND]

- Conversation list and message interface.
- WebSocket connection and reconnection states.
- Conversation history and pagination.

### [BACKEND]

- Django Channels configuration.
- Authenticated WebSocket consumers.
- Conversation membership and persistent messages.

### [SHARED]

- Test authorized messaging, persistence, and forbidden access.

### Acceptance criteria

- Authorized users can exchange messages in real time.
- Messages persist in PostgreSQL.
- Unauthorized users cannot join or read conversations.

Group chat is conditional on one-to-one chat being stable.

## Sprint 6 — Integration, Testing, and Portfolio Readiness

**Target duration:** 2 weeks.

### [FRONTEND]

- Responsive layout and accessibility.
- Loading, empty, and error states.
- Frontend and end-to-end tests.

### [BACKEND]

- API validation and security review.
- Query optimization where needed.
- Backend tests and API documentation.

### [SHARED]

- End-to-end integration checks.
- GitHub Actions.
- README and setup instructions.
- Architecture and database diagrams.
- Screenshots using fictional data.
- Deployment preparation.

### Acceptance criteria

- Core agreed workflows run end to end.
- Critical authorization tests pass.
- Setup instructions work in a clean environment.
- Known limitations are documented.
- No secrets or real patient information are committed.

## Risks and Schedule Adjustments

The schedule may change based on actual progress, dependency availability, learning needs, and integration issues.

Prioritize authentication, authorization, data isolation, and core workflows over adding optional features.

## Post-MVP Candidates

- Notifications.
- Patient portal improvements.
- Billing and pharmacy workflows.
- Analytics.
- Deployment hardening.
- Carefully reviewed AI-assisted workflows.
