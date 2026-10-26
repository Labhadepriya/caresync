import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Mail, Phone, UserRound } from "lucide-react";
import { usePatients } from "@/contexts/usePatients";

function PatientDetailsPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const { patients } = usePatients();
  const patient = patients.find((item) => item.id === patientId);

  return (
    <div className="space-y-6">
      <Link
        to="/patients"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={16} />
        Back to Patients
      </Link>

      {!patient ? (
        <section className="rounded-xl border border-neutral-200 bg-white p-8 text-center">
          <UserRound size={32} className="mx-auto mb-3 text-neutral-400" />
          <h1 className="text-xl font-semibold text-neutral-900">
            Patient not found
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            This patient record could not be found in the sample data.
          </p>
        </section>
      ) : (
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-blue-50 text-xl font-bold text-blue-700">
              {patient.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-neutral-900">
                {patient.name}
              </h1>
              <p className="mt-1 text-sm text-neutral-500">{patient.id}</p>
              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  patient.status === "Active"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-neutral-100 text-neutral-600"
                }`}
              >
                {patient.status}
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-neutral-50 p-4">
              <p className="text-sm text-neutral-500">Age</p>
              <p className="mt-1 font-semibold text-neutral-900">
                {patient.age} years
              </p>
            </div>

            <div className="rounded-lg bg-neutral-50 p-4">
              <p className="text-sm text-neutral-500">Gender</p>
              <p className="mt-1 font-semibold text-neutral-900">
                {patient.gender}
              </p>
            </div>

            <div className="rounded-lg bg-neutral-50 p-4">
              <p className="text-sm text-neutral-500">Blood Group</p>
              <p className="mt-1 font-semibold text-neutral-900">
                {patient.bloodGroup || "Not provided"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              Contact Information
            </h2>

            <div className="mt-3 space-y-3">
              <p className="flex items-center gap-3 text-sm text-neutral-700">
                <Mail size={17} className="text-neutral-400" />
                {patient.email}
              </p>
              <p className="flex items-center gap-3 text-sm text-neutral-700">
                <Phone size={17} className="text-neutral-400" />
                {patient.phone}
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-neutral-200 pt-5">
            <h2 className="text-lg font-semibold text-neutral-900">
              Visit Information
            </h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-neutral-700">
              <CalendarDays size={17} className="text-neutral-400" />
              {patient.lastVisit
                ? new Date(`${patient.lastVisit}T00:00:00`).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )
                : "No visits yet"}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default PatientDetailsPage;
