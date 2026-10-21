


export type AppointmentStatus =
  | "Scheduled"
  | "Completed"
  | "Cancelled"
  | "No-show";

export type AppointmentType =
  | "Consultation"
  | "Follow-up"
  | "Check-up"
  | "Emergency";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
}

// Fictional sample appointments for frontend development only.
export const mockAppointments: Appointment[] = [
  {
    id: "APT-2001",
    patientId: "PAT-1001",
    patientName: "Aarav Sharma",
    doctor: "Dr. Neha Desai",
    department: "Cardiology",
    date: "2026-10-21",
    time: "09:00",
    type: "Consultation",
    status: "Scheduled",
    reason: "Routine cardiac consultation",
  },
  {
    id: "APT-2002",
    patientId: "PAT-1002",
    patientName: "Ananya Patel",
    doctor: "Dr. Amit Kulkarni",
    department: "General Medicine",
    date: "2026-10-21",
    time: "10:30",
    type: "Follow-up",
    status: "Scheduled",
    reason: "Follow-up visit",
  },
  {
    id: "APT-2003",
    patientId: "PAT-1003",
    patientName: "Rohan Deshmukh",
    doctor: "Dr. Priya Shah",
    department: "Orthopedics",
    date: "2026-10-20",
    time: "11:00",
    type: "Check-up",
    status: "Completed",
    reason: "Joint pain assessment",
  },
  {
    id: "APT-2004",
    patientId: "PAT-1004",
    patientName: "Priya Kulkarni",
    doctor: "Dr. Neha Desai",
    department: "Cardiology",
    date: "2026-10-22",
    time: "12:00",
    type: "Follow-up",
    status: "Scheduled",
    reason: "Review previous consultation",
  },
  {
    id: "APT-2005",
    patientId: "PAT-1005",
    patientName: "Ishaan Joshi",
    doctor: "Dr. Rahul Patil",
    department: "Emergency",
    date: "2026-10-19",
    time: "14:00",
    type: "Emergency",
    status: "Completed",
    reason: "Urgent medical assessment",
  },
  {
    id: "APT-2006",
    patientId: "PAT-1006",
    patientName: "Meera Shah",
    doctor: "Dr. Amit Kulkarni",
    department: "General Medicine",
    date: "2026-10-23",
    time: "15:30",
    type: "Consultation",
    status: "Scheduled",
    reason: "General health consultation",
  },
];
