# CareSync — Centralized Hospital Management System

CareSync is a collaborative learning project to build a centralized hospital and healthcare practice management platform.

The project aims to support hospitals, clinics, independent doctors, staff, and patients through organization management, patient records, appointments, diagnostic workflows, and secure real-time communication.

## Project Goals

- Support multiple hospitals, clinics, and independent practices.
- Enforce organization-level data isolation and role-based permissions.
- Manage patients and appointments.
- Coordinate diagnostic orders, results, and reports.
- Provide authenticated real-time chat.
- Maintain automated tests and technical documentation.
- Build a maintainable application that demonstrates practical software engineering skills.

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS or another agreed styling solution
- Vitest and React Testing Library
- Playwright for selected end-to-end tests

### Backend

- Python
- Django
- Django REST Framework
- PostgreSQL
- Django Channels and WebSockets
- Redis-backed Channels layer when needed

### Development

- Git and GitHub
- Environment-based configuration
- Automated testing and GitHub Actions
- Documented API contracts and permission rules

## Repository Structure

```text
caresync/
├── frontend/                 # React application (to be initialized)
├── backend/                  # Django application (to be initialized)
├── docs/
│   ├── API_CONTRACTS.md
│   ├── ROLE_PERMISSION_MATRIX.md
│   ├── SPRINT_PLAN.md
│   └── PROJECT_STATUS.md
├── .env.example
├── .gitignore
└── README.md
```

## Team Responsibilities

- **Frontend Lead:** React, TypeScript, UI, routing, API integration, accessibility, and frontend testing.
- **Backend Lead:** Django, REST APIs, PostgreSQL, authentication, authorization, Channels, and backend testing.
- **Shared:** Architecture, API contracts, security, integration, code reviews, and sprint planning.

## Development Status

Repository initialization is in progress. Frontend and backend applications have not yet been initialized.

## Security Principles

- Use fictional patient and diagnostic data during development.
- Enforce authorization on the backend.
- Prevent unauthorized cross-organization access.
- Keep credentials and local environment files out of Git.
- Protect diagnostic reports and WebSocket conversations.
- Test both permitted and forbidden access.
- Do not claim healthcare regulatory compliance without a proper assessment.

## Getting Started

Setup instructions will be added after the frontend and backend development environments are established.

## License

No license has been selected yet.
