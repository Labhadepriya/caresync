
import { createContext } from "react";
import type { Patient } from "@/data/mockPatients";

export interface PatientsContextValue {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
}

export const PatientsContext = createContext<
  PatientsContextValue | undefined
>(undefined);
