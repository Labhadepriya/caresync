import { useMemo, useState } from "react";
import { CalendarDays, Mail, Plus, Search, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockPatients } from "@/data/mockPatients";
import type { Patient, PatientStatus } from "@/data/mockPatients";

type StatusFilter = "All" | PatientStatus;

interface PatientForm {
  name: string;
  age: string;
  gender: Patient["gender"];
  phone: string;
  email: string;
  bloodGroup: string;
}

const emptyForm: PatientForm = {
  name: "",
  age: "",
  gender: "Female",
  phone: "",
  email: "",
  bloodGroup: "",
};

function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<PatientForm>(emptyForm);

  const activeCount = patients.filter(
    (patient) => patient.status === "Active",
  ).length;

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch = [
        patient.id,
        patient.name,
        patient.email,
        patient.phone,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, search, statusFilter]);

  function handleAddPatient(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newPatient: Patient = {
      id: `PAT-${Date.now().toString().slice(-6)}`,
      name: form.name.trim(),
      age: Number(form.age),
      gender: form.gender,
      phone: form.phone.trim(),
      email: form.email.trim(),
      bloodGroup: form.bloodGroup || "Not provided",
      lastVisit: "",
      status: "Active",
    };

    setPatients((current) => [newPatient, ...current]);
    setSearch("");
    setStatusFilter("All");
    setForm(emptyForm);
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Patients</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage patient records and contact information.
          </p>
        </div>

        <Button onClick={() => setShowForm((current) => !current)}>
          {showForm ? <X size={17} /> : <Plus size={17} />}
          {showForm ? "Cancel" : "Add Patient"}
        </Button>
      </div>

      <section
        aria-label="Patient summary"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              Total Patients
            </p>
            <Users size={20} className="text-blue-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-neutral-900">
            {patients.length}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Patient records in this session
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              Active Patients
            </p>
            <span className="size-3 rounded-full bg-emerald-500" />
          </div>
          <p className="mt-3 text-3xl font-bold text-neutral-900">
            {activeCount}
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Currently marked as active
          </p>
        </div>
      </section>

      {showForm && (
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            Add a patient
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Enter the patient's details. This record will only be stored in the
            current page session.
          </p>

          <form
            onSubmit={handleAddPatient}
            className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Full name *
              <input
                required
                maxLength={100}
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Enter full name"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Age *
              <input
                required
                type="number"
                min="0"
                max="125"
                value={form.age}
                onChange={(event) =>
                  setForm({ ...form, age: event.target.value })
                }
                placeholder="Age"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Gender *
              <select
                required
                value={form.gender}
                onChange={(event) =>
                  setForm({
                    ...form,
                    gender: event.target.value as Patient["gender"],
                  })
                }
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Phone *
              <input
                required
                type="tel"
                maxLength={20}
                value={form.phone}
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
                placeholder="Contact number"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Email *
              <input
                required
                type="email"
                maxLength={254}
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                placeholder="name@example.com"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="space-y-1.5 text-sm font-medium text-neutral-700">
              Blood group
              <select
                value={form.bloodGroup}
                onChange={(event) =>
                  setForm({ ...form, bloodGroup: event.target.value })
                }
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Not provided</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ),
                )}
              </select>
            </label>

            <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-3">
              <Button type="submit">
                <Plus size={16} />
                Save Patient
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
              placeholder="Search patients..."
              aria-label="Search patients by name, ID, email, or phone"
              className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </label>

          <div className="flex flex-wrap gap-2" aria-label="Filter by status">
            {(["All", "Active", "Inactive"] as const).map((status) => (
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
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">
                  Patient
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Contact
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Age / Gender
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Blood Group
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Last Visit
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-neutral-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-700">
                        {patient.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">
                          {patient.name}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          {patient.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="flex items-center gap-2 text-neutral-700">
                      <Mail size={14} className="shrink-0 text-neutral-400" />
                      {patient.email}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {patient.phone}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-neutral-700">
                    {patient.age} years
                    <p className="mt-1 text-xs text-neutral-500">
                      {patient.gender}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-neutral-700">
                    {patient.bloodGroup}
                  </td>

                  <td className="px-5 py-4 text-neutral-600">
                    {patient.lastVisit ? (
                      <span className="flex items-center gap-2">
                        <CalendarDays
                          size={14}
                          className="shrink-0 text-neutral-400"
                        />
                        {new Date(
                          `${patient.lastVisit}T00:00:00`,
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    ) : (
                      "No visits yet"
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        patient.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredPatients.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-neutral-500"
                  >
                    <Users
                      size={28}
                      className="mx-auto mb-3 text-neutral-300"
                    />
                    <p className="font-medium text-neutral-700">
                      No patients found
                    </p>
                    <p className="mt-1 text-sm">
                      Try another search term or change the status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-neutral-200 px-5 py-3 text-xs text-neutral-500">
          Showing {filteredPatients.length} of {patients.length} patients
          <span className="ml-2">· Sample data only</span>
        </div>
      </section>
    </div>
  );
}

export default PatientsPage;
