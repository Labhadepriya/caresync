import {
  Activity,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Patients", icon: Users },
  { label: "Appointments", icon: CalendarDays },
  { label: "Diagnostics", icon: ClipboardList },
  { label: "Messages", icon: MessageSquare },
  { label: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-neutral-200 bg-white">
      <div className="flex h-16 items-center gap-3 border-b border-neutral-200 px-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Activity size={21} />
        </div>

        <div>
          <h1 className="text-lg font-bold text-neutral-900">CareSync</h1>
          <p className="text-xs text-neutral-500">Hospital Management</p>
        </div>
      </div>

      <nav aria-label="Main navigation" className="flex-1 space-y-1 p-4">
        {navigationItems.map(({ label, icon: Icon }, index) => (
          <button
            key={label}
            type="button"
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              index === 0
                ? "bg-blue-50 text-blue-700"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            }`}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-neutral-200 p-4">
        <p className="text-xs text-neutral-500">CareSync · Initial UI</p>
      </div>
    </aside>
  );
}

export default Sidebar;
