# CareSync — API Contracts

## 1. Purpose

This document defines the agreed interface between the React frontend and Django REST Framework backend.

The frontend and backend owners must agree on an endpoint contract before implementing the corresponding integrated feature.

## 2. Architecture

- Frontend: React + TypeScript + Vite.
- Backend: Django REST Framework.
- Communication: HTTP APIs using JSON unless a file upload or download requires another format.
- Real-time communication: authenticated WebSockets through Django Channels.
- Database: PostgreSQL, accessed through the Django ORM.

## 3. Contract Requirements

Each endpoint contract must document:

1. Feature and endpoint name.
2. HTTP method and URL.
3. Authentication requirements.
4. Required role and permissions.
5. Organization or resource scope.
6. Request fields, types, and required values.
7. Successful response fields and types.
8. Validation and error response formats.
9. Expected HTTP status codes.
10. Pagination and filtering behavior.
11. Security considerations.
12. Acceptance criteria and example requests.

## 4. API Conventions

- Use nouns for resource paths.
- Use HTTP methods according to their intended semantics.
- Use JSON for ordinary API requests and responses.
- Validate all untrusted input on the backend.
- Never trust organization IDs, role values, or ownership claims supplied by the client.
- Apply authorization to individual records, not only to endpoints.
- Document pagination and filtering consistently.
- Avoid exposing sensitive information in errors.
- Notify both owners before changing an agreed contract.

## 5. Proposed Error Format

The following is a proposed example, not an implemented backend response:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields.",
    "fields": {
      "example_field": ["This field is required."]
    }
  }
}
```

The final error format must be agreed upon before API implementation.

## 6. Authentication

Authentication has not yet been finalized.

The team will evaluate Django session authentication with secure cookies and appropriate CSRF protection before building protected workflows.

Endpoint contracts must state whether authentication is required and what happens when a session expires or access is denied.

## 7. Pagination

The pagination format has not yet been finalized.

Before implementing list endpoints, agree on:

- Page-number or cursor-based pagination.
- Page size and maximum allowed size.
- Response metadata.
- Filtering and ordering parameters.

## 8. Endpoint Register

No endpoints have been implemented or verified yet.

Record an endpoint here only after its contract is agreed upon.

| Feature        | Method    | Endpoint | Status       |
| -------------- | --------- | -------- | ------------ |
| Authentication | TBD       | TBD      | Not designed |
| Organizations  | TBD       | TBD      | Not designed |
| Departments    | TBD       | TBD      | Not designed |
| Invitations    | TBD       | TBD      | Not designed |
| Patients       | TBD       | TBD      | Not designed |
| Appointments   | TBD       | TBD      | Not designed |
| Diagnostics    | TBD       | TBD      | Not designed |
| Chat           | WebSocket | TBD      | Not designed |

## 9. Change Management

When a contract changes:

1. Update this document.
2. Notify the other team member.
3. Review the impact on existing frontend and backend code.
4. Update relevant tests and examples.
5. Include the change in the pull request.

Do not describe an endpoint as implemented until its existence and behavior have been verified.
