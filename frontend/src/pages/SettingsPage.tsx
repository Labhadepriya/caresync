import { useState } from "react";
import { Bell, Check, LockKeyhole, Palette, UserRound } from "lucide-react";

type SettingsSection = "profile" | "preferences" | "security";

function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");
  const [fullName, setFullName] = useState("CareSync User");
  const [email, setEmail] = useState("user@caresync.demo");
  const [role, setRole] = useState("Administrator");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [appearance, setAppearance] = useState("Light");
  const [saved, setSaved] = useState(false);

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  function updateSection(section: SettingsSection) {
    setActiveSection(section);
    setSaved(false);
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage your profile and application preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav
          aria-label="Settings sections"
          className="h-fit space-y-1 rounded-xl border border-neutral-200 bg-white p-3"
        >
          <SectionButton
            active={activeSection === "profile"}
            icon={<UserRound size={18} />}
            label="Profile"
            onClick={() => updateSection("profile")}
          />
          <SectionButton
            active={activeSection === "preferences"}
            icon={<Bell size={18} />}
            label="Preferences"
            onClick={() => updateSection("preferences")}
          />
          <SectionButton
            active={activeSection === "security"}
            icon={<LockKeyhole size={18} />}
            label="Security"
            onClick={() => updateSection("security")}
          />
        </nav>

        <div className="min-w-0 space-y-6">
          {activeSection === "profile" && (
            <form
              onSubmit={handleSave}
              className="space-y-5 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
            >
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Profile information
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Update the details displayed for your demo account.
                </p>
              </div>

              <div className="flex items-center gap-4 border-b border-neutral-100 pb-5">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
                  {getInitials(fullName)}
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{fullName}</p>
                  <p className="text-sm text-neutral-500">{role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Full name">
                  <input
                    required
                    value={fullName}
                    onChange={(event) => {
                      setFullName(event.target.value);
                      setSaved(false);
                    }}
                    className={inputClass}
                    placeholder="Enter full name"
                  />
                </FormField>

                <FormField label="Email address">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setSaved(false);
                    }}
                    className={inputClass}
                    placeholder="Enter email address"
                  />
                </FormField>

                <FormField label="Role">
                  <select
                    value={role}
                    onChange={(event) => {
                      setRole(event.target.value);
                      setSaved(false);
                    }}
                    className={inputClass}
                  >
                    <option>Administrator</option>
                    <option>Doctor</option>
                    <option>Nurse</option>
                    <option>Receptionist</option>
                    <option>Lab Technician</option>
                  </select>
                </FormField>
              </div>

              <SaveButton saved={saved} />
            </form>
          )}

          {activeSection === "preferences" && (
            <form
              onSubmit={handleSave}
              className="space-y-5 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6"
            >
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  Application preferences
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Choose how you prefer to use CareSync.
                </p>
              </div>

              <div className="divide-y divide-neutral-100">
                <PreferenceRow
                  title="Email notifications"
                  description="Receive updates about your account."
                  checked={emailNotifications}
                  onChange={(checked) => {
                    setEmailNotifications(checked);
                    setSaved(false);
                  }}
                />
                <PreferenceRow
                  title="Appointment reminders"
                  description="Enable reminders for upcoming appointments."
                  checked={appointmentReminders}
                  onChange={(checked) => {
                    setAppointmentReminders(checked);
                    setSaved(false);
                  }}
                />
              </div>

              <div className="max-w-sm">
                <FormField label="Appearance">
                  <div className="relative">
                    <Palette
                      size={17}
                      className="absolute left-3 top-3 text-neutral-400"
                    />
                    <select
                      value={appearance}
                      onChange={(event) => {
                        setAppearance(event.target.value);
                        setSaved(false);
                      }}
                      className={`${inputClass} pl-10`}
                    >
                      <option>Light</option>
                      <option>System default</option>
                    </select>
                  </div>
                </FormField>
                <p className="mt-2 text-xs text-neutral-500">
                  Appearance is a saved demo preference; it does not change the
                  app theme yet.
                </p>
              </div>

              <SaveButton saved={saved} />
            </form>
          )}

          {activeSection === "security" && (
            <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                  <LockKeyhole size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-neutral-900">
                    Security
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500">
                    Account security controls will be connected when
                    authentication is implemented.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-medium text-amber-900">
                  Authentication is not connected
                </p>
                <p className="mt-1 text-sm text-amber-800">
                  Password changes, active sessions, and two-factor
                  authentication are not available in this demo.
                </p>
              </div>
            </div>
          )}

          <p className="text-xs text-neutral-500">
            Demo only: profile and preference changes remain in page state and
            are not saved to a server or retained after leaving this page.
          </p>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
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

function SectionButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-blue-50 text-blue-700"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-medium text-neutral-900">{title}</p>
        <p className="mt-1 text-sm text-neutral-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-neutral-300"
        }`}
      >
        <span
          className={`inline-block size-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SaveButton({ saved }: { saved: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3 border-t border-neutral-100 pt-4">
      {saved && (
        <p
          role="status"
          className="mr-auto flex items-center gap-2 text-sm text-emerald-700"
        >
          <Check size={16} />
          Changes applied in this demo.
        </p>
      )}
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        Save changes
      </button>
    </div>
  );
}

export default SettingsPage;
