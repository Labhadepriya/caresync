import { useState, type ReactNode } from "react";
import { mockPatients } from "@/data/mockPatients";
import { PatientsContext } from "@/contexts/PatientsContext";

interface PatientsProviderProps {
  children: ReactNode;
}

export function PatientsProvider({ children }: PatientsProviderProps) {
  const [patients, setPatients] =
    useState<(typeof mockPatients)[number][]>(mockPatients);

  function addPatient(patient: (typeof mockPatients)[number]) {
    setPatients((currentPatients: (typeof mockPatients)[number][]) => [
      patient,
      ...currentPatients,
    ]);
  }

  return (
    <PatientsContext.Provider value={{ patients, addPatient }}>
      {children}
    </PatientsContext.Provider>
  );
}
