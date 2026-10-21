import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ClipboardList,
  Clock3,
  Plus,
  Search,
  TestTube2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  mockDiagnostics,
  type Diagnostic,
  type DiagnosticPriority,
  type DiagnosticStatus,
} from "@/data/mockDiagnostics";
import { mockPatients } from "@/data/mockPatients";

const statuses: Array<"All" | DiagnosticStatus> = [
  "All",
  "Requested",
  "Sample Collected",
  "In Progress",
  "Completed",
  "Cancelled",
];

const priorities: DiagnosticPriority[] = ["Routine", "Urgent", "Emergency"];

const statusStyles: Record<DiagnosticStatus, string> = {
  Requested: "bg-blue-50 text-blue-700",
  "Sample Collected": "bg-violet-50 text-violet-700",
  "In Progress": "bg-amber-50 text-amber-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-neutral-100 text-neutral-600",
};

const priorityStyles: Record<DiagnosticPriority, string> = {
  Routine: "bg-neutral-100 text-neutral-700",
  Urgent: "bg-amber-50 text-amber-700",
  Emergency: "bg-red-50 text-red-700",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function DiagnosticsPage() {
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>(mockDiagnostics);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | DiagnosticStatus>(
    "All",
  );
  const [showForm, setShowForm] = useState(false);
  const [patientId, setPatientId] = useState(mockPatients[0]?.id ?? "");
  const [testName, setTestName] = useState("");
  const [department, setDepartment] = useState("Biochemistry");
  const [requestedBy, setRequestedBy] = useState("");
  const [requestedDate, setRequestedDate] = useState(
    new Date().toLocaleDateString("en-CA"),
  );
  const [priority, setPriority] = useState<DiagnosticPriority>("Routine");

  const counts = useMemo(
    () => ({
      total: diagnostics.length,
      pending: diagnostics.filter(
        (item) =>
          item.status === "Requested" ||
          item.status === "Sample Collected" ||
          item.status === "In Progress",
      ).length,
      completed: diagnostics.filter((item) => item.status === "Completed")
        .length,
      urgent: diagnostics.filter(
        (item) => item.priority === "Urgent" || item.priority === "Emergency",
      ).length,
    }),
    [diagnostics],
  );

  const filteredDiagnostics = useMemo(() => {
    const query = search.trim().toLowerCase();

    return diagnostics.filter((item) => {
      const matchesSearch =
        !query ||
        [
          item.id,
          item.patientName,
          item.testName,
          item.department,
          item.requestedBy,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [diagnostics, search, statusFilter]);

  function handleAddDiagnostic(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const patient = mockPatients.find((item) => item.id === patientId);
    if (!patient || !testName.trim() || !requestedBy.trim()) return;

    const newDiagnostic: Diagnostic = {
      id: `DIA-${Date.now().toString().slice(-6)}`,
      patientId: patient.id,
      patientName: patient.name,
      testName: testName.trim(),
      department,
      requestedBy: requestedBy.trim(),
      requestedDate,
      priority,
      status: "Requested",
    };

    setDiagnostics((current) => [newDiagnostic, ...current]);
    setSearch("");
    setStatusFilter("All");
    setShowForm(false);
    setTestName("");
    setRequestedBy("");
    setPriority("Routine");
  }

  function updateStatus(id: string, status: DiagnosticStatus) {
    setDiagnostics((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Diagnostics</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage diagnostic test requests and track their progress.
          </p>
        </div>
        <Button onClick={() => setShowForm((current) => !current)}>
          <Plus className="mr-2 h-4 w-4" />
          {showForm ? "Close form" : "New test request"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total tests"
          value={counts.total}
          icon={<ClipboardList className="h-5 w-5" />}
          iconStyle="bg-blue-50 text-blue-600"
        />
        <SummaryCard
          label="Pending tests"
          value={counts.pending}
          icon={<Clock3 className="h-5 w-5" />}
          iconStyle="bg-amber-50 text-amber-600"
        />
        <SummaryCard
          label="Completed"
          value={counts.completed}
          icon={<Activity className="h-5 w-5" />}
          iconStyle="bg-emerald-50 text-emerald-600"
        />
        <SummaryCard
          label="Urgent / emergency"
          value={counts.urgent}
          icon={<AlertTriangle className="h-5 w-5" />}
          iconStyle="bg-red-50 text-red-600"
        />
      </div>

      {showForm && (
        <form
          onSubmit={handleAddDiagnostic}
          className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5"
        >
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              New diagnostic request
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Enter the test details. This request will be added to local mock
              data only.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <FormField label="Patient">
              <select
                required
                value={patientId}
                onChange={(event) => setPatientId(event.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                {mockPatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} ({patient.id})
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Test name">
              <input
                required
                value={testName}
                onChange={(event) => setTestName(event.target.value)}
                placeholder="e.g. Complete Blood Count"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </FormField>

            <FormField label="Department">
              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                {[
                  "Biochemistry",
                  "Hematology",
                  "Microbiology",
                  "Radiology",
                  "Cardiology",
                  "Endocrinology",
                  "Pathology",
                ].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Requested by">
              <input
                required
                value={requestedBy}
                onChange={(event) => setRequestedBy(event.target.value)}
                placeholder="e.g. Dr. Neha Desai"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </FormField>

            <FormField label="Requested date">
              <input
                required
                type="date"
                value={requestedDate}
                onChange={(event) => setRequestedDate(event.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
            </FormField>

            <FormField label="Priority">
              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as DiagnosticPriority)
                }
                className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                {priorities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create request</Button>
          </div>
        </form>
      )}

      <section className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
        <div className="space-y-4 border-b border-neutral-100 p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search patient, test, department, or ID..."
              className="w-full rounded-lg border border-neutral-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
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
                <th className="px-5 py-3 font-semibold">Test / ID</th>
                <th className="px-5 py-3 font-semibold">Patient</th>
                <th className="px-5 py-3 font-semibold">Department</th>
                <th className="px-5 py-3 font-semibold">Requested by</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Priority</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Update status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredDiagnostics.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-50/70">
                  <td className="px-5 py-4">
                    <p className="font-medium text-neutral-900">
                      {item.testName}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">{item.id}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-neutral-800">
                      {item.patientName}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {item.patientId}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-neutral-600">
                    {item.department}
                  </td>
                  <td className="px-5 py-4 text-neutral-600">
                    {item.requestedBy}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-neutral-600">
                    {formatDate(item.requestedDate)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${priorityStyles[item.priority]}`}
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {item.status === "Completed" ||
                    item.status === "Cancelled" ? (
                      <span className="text-xs text-neutral-400">
                        No further updates
                      </span>
                    ) : (
                      <select
                        aria-label={`Update status for ${item.id}`}
                        value={item.status}
                        onChange={(event) =>
                          updateStatus(
                            item.id,
                            event.target.value as DiagnosticStatus,
                          )
                        }
                        className="rounded-lg border border-neutral-200 bg-white px-2 py-1.5 text-xs outline-none focus:border-blue-500"
                      >
                        {statuses
                          .filter((status) => status !== "All")
                          .map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}

              {filteredDiagnostics.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm text-neutral-500"
                  >
                    <TestTube2 className="mx-auto mb-2 h-8 w-8 text-neutral-300" />
                    No diagnostic requests match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-neutral-100 px-5 py-3 text-xs text-neutral-500">
          Showing {filteredDiagnostics.length} of {diagnostics.length}{" "}
          diagnostic requests · Mock data only
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  iconStyle,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconStyle: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-500">{label}</p>
        <div className={`rounded-lg p-2 ${iconStyle}`}>{icon}</div>
      </div>
      <p className="mt-3 text-2xl font-bold text-neutral-900">{value}</p>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

export default DiagnosticsPage;
