
export type DiagnosticStatus =
  | "Requested"
  | "Sample Collected"
  | "In Progress"
  | "Completed"
  | "Cancelled";

export type DiagnosticPriority = "Routine" | "Urgent" | "Emergency";

export interface Diagnostic {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  department: string;
  requestedBy: string;
  requestedDate: string;
  priority: DiagnosticPriority;
  status: DiagnosticStatus;
}

// Fictional sample diagnostic records for frontend development only.
export const mockDiagnostics: Diagnostic[] = [
  {
    id: "DIA-3001",
    patientId: "PAT-1001",
    patientName: "Aarav Sharma",
    testName: "Complete Blood Count (CBC)",
    department: "Hematology",
    requestedBy: "Dr. Neha Desai",
    requestedDate: "2026-10-21",
    priority: "Routine",
    status: "Completed",
  },
  {
    id: "DIA-3002",
    patientId: "PAT-1002",
    patientName: "Ananya Patel",
    testName: "Blood Glucose",
    department: "Biochemistry",
    requestedBy: "Dr. Amit Kulkarni",
    requestedDate: "2026-10-21",
    priority: "Urgent",
    status: "In Progress",
  },
  {
    id: "DIA-3003",
    patientId: "PAT-1003",
    patientName: "Rohan Deshmukh",
    testName: "X-Ray Knee",
    department: "Radiology",
    requestedBy: "Dr. Priya Shah",
    requestedDate: "2026-10-20",
    priority: "Routine",
    status: "Sample Collected",
  },
  {
    id: "DIA-3004",
    patientId: "PAT-1004",
    patientName: "Priya Kulkarni",
    testName: "Lipid Profile",
    department: "Biochemistry",
    requestedBy: "Dr. Neha Desai",
    requestedDate: "2026-10-22",
    priority: "Routine",
    status: "Requested",
  },
  {
    id: "DIA-3005",
    patientId: "PAT-1005",
    patientName: "Ishaan Joshi",
    testName: "Electrocardiogram (ECG)",
    department: "Cardiology",
    requestedBy: "Dr. Rahul Patil",
    requestedDate: "2026-10-19",
    priority: "Emergency",
    status: "Completed",
  },
  {
    id: "DIA-3006",
    patientId: "PAT-1006",
    patientName: "Meera Shah",
    testName: "Thyroid Function Test",
    department: "Endocrinology",
    requestedBy: "Dr. Amit Kulkarni",
    requestedDate: "2026-10-23",
    priority: "Routine",
    status: "Requested",
  },
];
