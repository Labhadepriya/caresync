import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/DashboardPage";
import PatientsPage from "@/pages/PatientsPage";
import AppointmentsPage from "@/pages/AppointmentsPage";
import DiagnosticsPage from "@/pages/DiagnosticsPage";
import MessagesPage from "@/pages/MessagesPage";
import SettingsPage from "@/pages/SettingsPage";
import PatientDetailsPage from "@/pages/PatientDetailsPage";
function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/patients/:patientId" element={<PatientDetailsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/diagnostics" element={<DiagnosticsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
