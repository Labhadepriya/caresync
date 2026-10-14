import { Activity, CalendarDays, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/StatCard";
const summaryCards = [
  {
    title: "Total Patients",
    value: "—",
    description: "Patient records will appear here",
    icon: Users,
  },
  {
    title: "Appointments",
    value: "—",
    description: "Appointment data will appear here",
    icon: CalendarDays,
  },
  {
    title: "Diagnostics",
    value: "—",
    description: "Diagnostic records will appear here",
    icon: Activity,
  },
];

function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            Hospital Overview
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Your CareSync workspace at a glance.
          </p>
        </div>

        <Button onClick={() => alert("Dashboard action will be added later.")}>
          Quick Action
        </Button>
      </div>

      <section
        aria-label="Hospital summary"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {summaryCards.map(({ title, value, description, icon }) => (
          <StatCard
            key={title}
            title={title}
            value={value}
            description={description}
            icon={icon}
          />
        ))}
      </section>
      <section className="rounded-xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-neutral-900">
          Getting started
        </h2>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          Your hospital dashboard is being prepared. Patient records,
          appointments, and diagnostics will be connected when the relevant
          features and backend APIs are ready.
        </p>
      </section>
    </div>
  );
}

export default DashboardPage;
