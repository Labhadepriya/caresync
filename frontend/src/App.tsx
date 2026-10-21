import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import DashboardPage from "@/pages/DashboardPage";
import PatientsPage from "@/pages/PatientsPage";
import AppointmentsPage from "@/pages/AppointmentsPage";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-6">
      <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
      <p className="mt-2 text-sm text-neutral-600">
        This page will be implemented in a future CareSync frontend task.
      </p>
    </section>
  );
}

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route
          path="/diagnostics"
          element={<PlaceholderPage title="Diagnostics" />}
        />
        <Route
          path="/messages"
          element={<PlaceholderPage title="Messages" />}
        />
        <Route
          path="/settings"
          element={<PlaceholderPage title="Settings" />}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
