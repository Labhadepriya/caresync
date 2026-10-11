# CareSync — Role and Permission Matrix

## 1. Purpose

This document defines the initial permission design for CareSync.

These rules are proposed for discussion and must be reviewed by both team members before implementation. The backend is responsible for enforcing authorization.

## 2. Core Principles

- Every request must be authenticated when the resource requires it.
- Users can access only organizations where they have appropriate membership or another explicitly approved access relationship.
- A user's role in one organization does not automatically grant the same role in another.
- Organization IDs, user IDs, and role values supplied by the frontend must not be trusted without server-side validation.
- Object-level permissions must be checked for individual records.
- Patient data must not become globally visible merely because a user is a doctor or administrator.
- Privileged actions should be auditable.
- Access to diagnostic reports and conversations must be restricted to authorized participants.

## 3. Proposed Roles

| Role                       | Intended responsibility                                                     |
| -------------------------- | --------------------------------------------------------------------------- |
| Platform administrator     | Platform-level administration, with narrowly defined privileges             |
| Organization owner         | Manage an organization and its authorized administrators                    |
| Organization administrator | Manage permitted organization settings, staff, and workflows                |
| Doctor                     | Access assigned clinical workflows and authorized patient records           |
| Receptionist               | Manage permitted registration and appointment workflows                     |
| Nurse                      | Access assigned patient-care workflows                                      |
| Laboratory technician      | Process assigned laboratory orders and results                              |
| Imaging technician         | Process assigned imaging orders and results                                 |
| Patient                    | Access their own explicitly released information and permitted appointments |

A platform administrator must not automatically receive unrestricted clinical-record access. Any exceptional access must be explicitly designed, authorized, and audited.

## 4. Preliminary Permission Matrix

Legend:

- **Proposed:** Expected permission, subject to detailed rules.
- **Restricted:** Only assigned records, departments, or explicitly permitted actions.
- **No default access:** Permission is not granted unless a separate rule authorizes it.
- **TBD:** Requires team discussion.

| Action                      | Owner      | Org Admin  | Doctor            | Receptionist      | Nurse             | Lab Tech               | Imaging Tech           | Patient                    |
| --------------------------- | ---------- | ---------- | ----------------- | ----------------- | ----------------- | ---------------------- | ---------------------- | -------------------------- |
| Manage organization profile | Proposed   | Proposed   | No default access | No default access | No default access | No default access      | No default access      | No default access          |
| Manage departments          | Proposed   | Proposed   | TBD               | No default access | No default access | No default access      | No default access      | No default access          |
| Invite and manage staff     | Proposed   | Proposed   | No default access | No default access | No default access | No default access      | No default access      | No default access          |
| Register patients           | Proposed   | Proposed   | Restricted        | Proposed          | Restricted        | No default access      | No default access      | Self-registration TBD      |
| View patient records        | Restricted | Restricted | Restricted        | Minimum necessary | Restricted        | Assigned workflow only | Assigned workflow only | Own permitted records      |
| Update patient demographics | Restricted | Restricted | Restricted        | Restricted        | Restricted        | No default access      | No default access      | Own profile fields TBD     |
| Create diagnostic orders    | Restricted | Restricted | Proposed          | No default access | TBD               | No default access      | No default access      | No default access          |
| Process lab orders          | Restricted | Restricted | Restricted        | No default access | TBD               | Assigned orders        | No default access      | No default access          |
| Process imaging orders      | Restricted | Restricted | Restricted        | No default access | TBD               | No default access      | Assigned orders        | No default access          |
| Review and release results  | Restricted | Restricted | Proposed          | No default access | TBD               | No default access      | No default access      | View released results only |
| Manage appointments         | Restricted | Restricted | Restricted        | Proposed          | Restricted        | No default access      | No default access      | Own permitted appointments |
| Use one-to-one chat         | Restricted | Restricted | Restricted        | Restricted        | Restricted        | Restricted             | Restricted             | Restricted                 |
| View audit logs             | Proposed   | Restricted | No default access | No default access | No default access | No default access      | No default access      | No default access          |

## 5. Organization Membership

A user may belong to multiple organizations with different roles.

Authorization must consider:

1. The authenticated user.
2. The organization or practice.
3. The user's active membership.
4. The requested action.
5. The target record's organization and ownership.
6. Any department, assignment, or relationship restrictions.
7. Explicit patient-sharing rules, if implemented.

Do not infer access from a record ID alone.

## 6. Patient Data Sharing

Cross-organization access is denied by default.

Before supporting shared care, define how a patient authorizes sharing, which records are shared, who may access them, how access is revoked, and how the access is audited.

## 7. Diagnostic Workflow

- Doctors may create orders only for patients and organizations they are authorized to access.
- Technicians may process only appropriately assigned orders.
- Technicians must not automatically receive unrestricted clinical-record access.
- Result review and release must follow the approved workflow.
- Patients may view only results explicitly released to them.

## 8. Chat Authorization

- Every WebSocket connection must be authenticated.
- Conversation membership must be checked on connection and when processing messages.
- Clients must not be able to impersonate senders.
- Organization membership alone must not grant access to every conversation.
- Message history must be authorized independently of frontend visibility.

## 9. Audit and Testing

The backend should record important security-sensitive actions, including relevant staff and membership changes, diagnostic-result changes, privileged access, and sensitive record access where appropriate.

Tests must cover both allowed and forbidden access, including attempts to access another organization's records.

## 10. Decisions Required Before Implementation

- Final role definitions and role-specific permissions.
- Custom user model and membership design.
- Whether platform administration is part of the MVP.
- Department-level restrictions.
- Patient self-registration and identity verification.
- Patient-sharing and consent rules.
- Diagnostic review and release requirements.
- Audit event scope and retention.
- Whether each staff role can participate in particular chat types.
