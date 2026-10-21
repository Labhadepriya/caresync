
export type PatientStatus = "Active" | "Inactive";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male" | "Other";
  phone: string;
  email: string;
  bloodGroup: string;
  lastVisit: string;
  status: PatientStatus;
}

// Fictional sample records for frontend development only.
export const mockPatients: Patient[] = [
  {
    id: "PAT-1001",
    name: "Aarav Sharma",
    age: 34,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "aarav.sharma@example.com",
    bloodGroup: "O+",
    lastVisit: "2026-10-18",
    status: "Active",
  },
  {
    id: "PAT-1002",
    name: "Ananya Patel",
    age: 28,
    gender: "Female",
    phone: "+91 98765 43211",
    email: "ananya.patel@example.com",
    bloodGroup: "B+",
    lastVisit: "2026-10-16",
    status: "Active",
  },
  {
    id: "PAT-1003",
    name: "Rohan Deshmukh",
    age: 45,
    gender: "Male",
    phone: "+91 98765 43212",
    email: "rohan.deshmukh@example.com",
    bloodGroup: "A+",
    lastVisit: "2026-10-12",
    status: "Inactive",
  },
  {
    id: "PAT-1004",
    name: "Priya Kulkarni",
    age: 31,
    gender: "Female",
    phone: "+91 98765 43213",
    email: "priya.kulkarni@example.com",
    bloodGroup: "AB+",
    lastVisit: "2026-10-10",
    status: "Active",
  },
  {
    id: "PAT-1005",
    name: "Ishaan Joshi",
    age: 52,
    gender: "Male",
    phone: "+91 98765 43214",
    email: "ishaan.joshi@example.com",
    bloodGroup: "O-",
    lastVisit: "2026-10-05",
    status: "Inactive",
  },
  {
    id: "PAT-1006",
    name: "Meera Shah",
    age: 23,
    gender: "Female",
    phone: "+91 98765 43215",
    email: "meera.shah@example.com",
    bloodGroup: "B-",
    lastVisit: "2026-10-02",
    status: "Active",
  },
];
