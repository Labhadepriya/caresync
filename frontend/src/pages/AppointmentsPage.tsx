import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Plus,
  Search,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockPatients } from "@/data/mockPatients";
import {
  mockAppointments,
  type Appointment,
  type AppointmentStatus,
  type AppointmentType,
} from "@/data/mockAppointments";

type StatusFilter = "All" | AppointmentStatus;

interface AppointmentForm {
  patientId: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: AppointmentType;
  reason: string;
}

const emptyForm: AppointmentForm = {
  patientId: "",
  doctor: "",
  department: "General Medicine",
  date: "",
  time: "",
  type: "Consultation",
  reason: "",
};

const statusOptions: AppointmentStatus[] = [
  "Scheduled",
  "Completed",
  "Cancelled",
  "No-show",
];

function formatDate(date: string) {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function AppointmentsPage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(mockAppointments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState<"All" | AppointmentType>("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<AppointmentForm>(emptyForm);

  const scheduledCount = appointments.filter(
    (appointment) => appointment.status === "Scheduled",
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  const departments = [
    ...new Set(mockAppointments.map((appointment) => appointment.department)),
  ].sort();

  const appointmentTypes = [
    ...new Set(mockAppointments.map((appointment) => appointment.type)),
  ].sort();

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return appointments
      .filter((appointment) => {
        const matchesSearch = [
          appointment.id,
          appointment.patientName,
          appointment.doctor,
          appointment.department,
          appointment.reason,
        ].some((value) => value.toLowerCase().includes(query));

        const matchesStatus =
          statusFilter === "All" || appointment.status === statusFilter;

        const matchesDepartment =
          departmentFilter === "All" ||
          appointment.department === departmentFilter;

        const matchesType =
          typeFilter === "All" || appointment.type === typeFilter;

        return (
          matchesSearch && matchesStatus && matchesDepartment && matchesType
        );
      })
      .sort((a, b) =>
        `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
      );
  }, [appointments, search, statusFilter, departmentFilter, typeFilter]);

  function handleAddAppointment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const patient = mockPatients.find((item) => item.id === form.patientId);

    if (!patient) return;

    const newAppointment: Appointment = {
      id: `APT-${Date.now().toString().slice(-6)}`,
      patientId: patient.id,
      patientName: patient.name,
      doctor: form.doctor.trim(),
      department: form.department,
      date: form.date,
      time: form.time,
      type: form.type,
      status: "Scheduled",
      reason: form.reason.trim(),
    };

    setAppointments((current) => [...current, newAppointment]);
    setSearch("");
    setStatusFilter("All");
    setForm(emptyForm);
    setShowForm(false);
  }

  function updateStatus(id: string, status: AppointmentStatus) {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Appointments</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Schedule visits and manage patient appointments.
          </p>
        </div>

        <Button onClick={() => setShowForm((current) => !current)}>
          {showForm ? <X size={17} /> : <Plus size={17} />}
          {showForm ? "Cancel" : "Schedule Appointment"}
        </Button>
      </div>

      <section
        aria-label="Appointment summary"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              Total Appointments
            </p>
            <CalendarDays size={20} className="text-blue-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-neutral-900">
            {appointments.length}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Records in this session
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">Scheduled</p>
            <Clock3 size={20} className="text-amber-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-neutral-900">
            {scheduledCount}
          </p>
          <p className="mt-1 text-xs text-neutral-500">Awaiting appointment</p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">Completed</p>
            <Stethoscope size={20} className="text-emerald-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-neutral-900">
            {completedCount}
          </p>
          <p className="mt-1 text-xs text-neutral-500">Visits completed</p>
        </div>
      </section>

      {showForm && (
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Schedule an appointment
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Choose a patient and enter the appointment details. This is
            temporary sample data and will not be saved to a server.
          </p>

          <form
            onSubmit={handleAddAppointment}
            className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Patient *
              <select
                required
                value={form.patientId}
                onChange={(event) =>
                  setForm({ ...form, patientId: event.target.value })
                }
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select a patient</option>
                {mockPatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} ({patient.id})
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Doctor *
              <input
                required
                maxLength={100}
                value={form.doctor}
                onChange={(event) =>
                  setForm({ ...form, doctor: event.target.value })
                }
                placeholder="Dr. Full Name"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Department *
              <select
                required
                value={form.department}
                onChange={(event) =>
                  setForm({ ...form, department: event.target.value })
                }
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {[
                  "General Medicine",
                  "Cardiology",
                  "Orthopedics",
                  "Pediatrics",
                  "Dermatology",
                  "Neurology",
                  "Emergency",
                ].map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Date *
              <input
                required
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={form.date}
                onChange={(event) =>
                  setForm({ ...form, date: event.target.value })
                }
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Time *
              <input
                required
                type="time"
                value={form.time}
                onChange={(event) =>
                  setForm({ ...form, time: event.target.value })
                }
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Appointment type *
              <select
                required
                value={form.type}
                onChange={(event) =>
                  setForm({
                    ...form,
                    type: event.target.value as AppointmentType,
                  })
                }
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {(
                  [
                    "Consultation",
                    "Follow-up",
                    "Check-up",
                    "Emergency",
                  ] as const
                ).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5 text-sm font-medium text-neutral-700 sm:col-span-2 lg:col-span-3">
              Reason for visit *
              <input
                required
                maxLength={250}
                value={form.reason}
                onChange={(event) =>
                  setForm({ ...form, reason: event.target.value })
                }
                placeholder="Brief reason for the appointment"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-3">
              <Button type="submit">
                <Plus size={16} />
                Save Appointment
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </section>
      )}

      <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-neutral-200 p-4 md:flex-row md:items-center md:justify-between">
          <label className="flex items-center gap-2 rounded-lg border border-neutral-300 px-3 py-2 md:w-80">
            <Search size={17} className="shrink-0 text-neutral-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search appointments..."
              aria-label="Search appointments"
              className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <select
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
              aria-label="Filter by department"
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm"
            >
              <option value="All">All Departments</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value as "All" | AppointmentType)
              }
              aria-label="Filter by appointment type"
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm"
            >
              <option value="All">All Types</option>
              {appointmentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Filter by status">
            {(["All", ...statusOptions] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                aria-pressed={statusFilter === status}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">
                  Appointment
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Patient
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Doctor / Department
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Date &amp; Time
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Type
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Status
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Update status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-neutral-50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-neutral-900">
                      {appointment.id}
                    </p>
                    <p className="mt-1 max-w-44 text-xs text-neutral-500">
                      {appointment.reason}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-neutral-900">
                      {appointment.patientName}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {appointment.patientId}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-neutral-800">
                      {appointment.doctor}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {appointment.department}
                    </p>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap text-neutral-700">
                    <p>{formatDate(appointment.date)}</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {new Date(
                        `2000-01-01T${appointment.time}:00`,
                      ).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-neutral-700">
                    {appointment.type}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        appointment.status === "Scheduled"
                          ? "bg-blue-50 text-blue-700"
                          : appointment.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700"
                            : appointment.status === "Cancelled"
                              ? "bg-red-50 text-red-700"
                              : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <select
                      aria-label={`Update status for ${appointment.id}`}
                      value={appointment.status}
                      onChange={(event) =>
                        updateStatus(
                          appointment.id,
                          event.target.value as AppointmentStatus,
                        )
                      }
                      className="rounded-lg border border-neutral-300 bg-white px-2 py-1.5 text-xs outline-none focus:border-blue-500"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}

              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <Users
                      size={28}
                      className="mx-auto mb-3 text-neutral-300"
                    />
                    <p className="font-medium text-neutral-700">
                      No appointments found
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      Try another search term or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-neutral-200 px-5 py-3 text-xs text-neutral-500">
          Showing {filteredAppointments.length} of {appointments.length}{" "}
          appointments
          <span className="ml-2">· Sample data only</span>
        </div>
      </section>
    </div>
  );
}

export default AppointmentsPage;
