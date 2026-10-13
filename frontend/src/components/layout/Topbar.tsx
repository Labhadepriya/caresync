import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900">Dashboard</h2>
        <p className="text-xs text-neutral-500">Welcome to CareSync</p>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2">
          <Search size={17} className="text-neutral-500" />
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className="w-36 bg-transparent text-sm outline-none placeholder:text-neutral-400"
          />
        </label>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
        >
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3 border-l border-neutral-200 pl-4">
          <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            CS
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-neutral-900">
              CareSync User
            </p>
            <p className="text-xs text-neutral-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
