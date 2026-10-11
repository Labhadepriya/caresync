# CareSync — Project Status

## 1. Project Overview

CareSync is a collaborative hospital and healthcare practice management learning project. The goal is to develop a maintainable application with organization-level data isolation, role-based permissions, patient management, appointments, diagnostics, and secure real-time chat.

## 2. Confirmed Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Agreed styling solution to be finalized
- Vitest and React Testing Library
- Playwright for selected end-to-end tests

### Backend

- Python
- Django
- Django REST Framework
- PostgreSQL
- Django Channels
- WebSockets
- Redis-backed Channels layer when required

### Collaboration

- Git and GitHub
- Feature branches and pull requests
- Shared API contracts and permission documentation
- Automated testing planned

## 3. Current Sprint

Sprint 0 — Repository and architecture.

Target duration: approximately one week. Actual dates and progress will be updated as work proceeds.

## 4. Verified Completed Work

- Confirmed that the GitHub repository was reported empty at the beginning of setup.
- Cloned the repository into the local CareSync directory.
- Verified that the current local branch is `main`.
- Created the `docs/` directory.
- Created `.gitignore`.
- Created `.env.example` containing placeholder values.
- Created `README.md`.
- Created `docs/API_CONTRACTS.md`.
- Created `docs/ROLE_PERMISSION_MATRIX.md`.
- Created `docs/SPRINT_PLAN.md`.
- Created this project status document.
- Verified that Git ignores a file named `.env`.
- Verified that the new files appear as untracked files before the initial commit.

## 5. In Progress

- Populate and review the root documentation.
- Define initial architecture and authentication decisions.
- Establish the initial shared commit.
- Prepare frontend and backend development environments.

## 6. Blocked or Not Yet Verified

- Backend application has not been initialized.
- Frontend application has not been initialized.
- Python, PostgreSQL, Node.js, and npm availability have not yet been verified in this project session.
- Database connectivity has not been tested.
- Authentication strategy has not been finalized.
- Custom user model decision has not been finalized.
- No API endpoints have been implemented or verified.
- No database models or migrations have been implemented or verified.
- No automated tests have been run.
- No feature branches or pull requests have been verified.
- No deployment has been configured.

## 7. Branch and Commit Information

- Intended stable branch: `main`.
- Last verified local branch: `main`.
- Initial commit: not yet created.
- Latest commit hash: not yet available.
- Remote push status: not yet verified.

Update this section after each relevant Git operation.

## 8. Current Repository Structure

```text
caresync/
├── docs/
│   ├── API_CONTRACTS.md
│   ├── PROJECT_STATUS.md
│   ├── ROLE_PERMISSION_MATRIX.md
│   └── SPRINT_PLAN.md
├── .env.example
├── .gitignore
└── README.md
```

The frontend and backend directories have not yet been created.

## 9. Tests and Verification

- `git status`: verified that the repository started with no commits and later showed the expected untracked files.
- `git branch --show-current`: returned `main`.
- `git check-ignore .env`: confirmed that `.env` is ignored.
- README diff: reviewed the new README content.
- Application tests: not run; neither application exists yet.

## 10. Next Tasks

### [FRONTEND]

- Finish reviewing the root repository files.
- Verify Node.js and npm availability before initializing Vite.
- Prepare a separate frontend feature branch when instructed.

### [BACKEND]

- Verify Python, pip, and PostgreSQL availability.
- Review the proposed backend architecture.
- Prepare a separate backend feature branch when instructed.

### [SHARED]

- Complete `API_CONTRACTS.md`, `ROLE_PERMISSION_MATRIX.md`, and `SPRINT_PLAN.md`.
- Decide the custom user model before the first Django migration.
- Agree on authentication and CSRF strategy.
- Review `.gitignore` and `.env.example`.
- Inspect the final diff before committing.
- Ensure both team members can clone and access the shared repository.

## 11. Risks and Decisions Needed

- Authentication approach and frontend/backend deployment origins.
- Organization membership and permission rules.
- Patient record sharing boundaries.
- Appointment conflict rules.
- Diagnostic result review and release workflow.
- WebSocket authentication and conversation membership enforcement.
- Local and production environment configuration.

## 12. Security Reminder

Use fictional patient data. Never commit real credentials, patient information, private reports, or local environment files. All authorization must be enforced by the backend.
